-- ============================================
-- PHASE 1: ENHANCE AUDIT LOGS SYSTEM
-- ============================================

-- Add indexes for performance
CREATE INDEX IF NOT EXISTS idx_audit_logs_entity ON public.audit_logs(entity);
CREATE INDEX IF NOT EXISTS idx_audit_logs_entity_id ON public.audit_logs(entity_id);
CREATE INDEX IF NOT EXISTS idx_audit_logs_actor ON public.audit_logs(actor);
CREATE INDEX IF NOT EXISTS idx_audit_logs_action ON public.audit_logs(action);
CREATE INDEX IF NOT EXISTS idx_audit_logs_created_at ON public.audit_logs(created_at DESC);

-- Update RLS policy for audit logs
DROP POLICY IF EXISTS "Admins can read audit logs" ON public.audit_logs;
CREATE POLICY "Admins can read audit logs" 
  ON public.audit_logs FOR SELECT 
  USING (public.has_role(auth.uid(), 'admin'::app_role));

-- Create logging function for generic entities
CREATE OR REPLACE FUNCTION public.log_entity_change()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  old_data jsonb;
  new_data jsonb;
  changed_fields jsonb;
BEGIN
  IF TG_OP = 'INSERT' THEN
    INSERT INTO audit_logs (entity, entity_id, action, actor, data)
    VALUES (
      TG_TABLE_NAME,
      NEW.id,
      'CREATE',
      COALESCE(auth.uid()::text, 'system'),
      to_jsonb(NEW)
    );
  ELSIF TG_OP = 'UPDATE' THEN
    -- Calculate diff between old and new
    old_data := to_jsonb(OLD);
    new_data := to_jsonb(NEW);
    
    -- Store both old and new for comparison
    changed_fields := jsonb_build_object(
      'before', old_data,
      'after', new_data
    );
    
    INSERT INTO audit_logs (entity, entity_id, action, actor, data)
    VALUES (
      TG_TABLE_NAME,
      NEW.id,
      'UPDATE',
      COALESCE(auth.uid()::text, 'system'),
      changed_fields
    );
  ELSIF TG_OP = 'DELETE' THEN
    INSERT INTO audit_logs (entity, entity_id, action, actor, data)
    VALUES (
      TG_TABLE_NAME,
      OLD.id,
      'DELETE',
      COALESCE(auth.uid()::text, 'system'),
      to_jsonb(OLD)
    );
  END IF;
  
  RETURN COALESCE(NEW, OLD);
END;
$$;

-- Apply triggers to relevant tables
CREATE TRIGGER audit_blog_posts
  AFTER INSERT OR UPDATE OR DELETE ON public.blog_posts
  FOR EACH ROW EXECUTE FUNCTION public.log_entity_change();

CREATE TRIGGER audit_user_roles
  AFTER INSERT OR UPDATE OR DELETE ON public.user_roles
  FOR EACH ROW EXECUTE FUNCTION public.log_entity_change();

CREATE TRIGGER audit_media_files_changes
  AFTER INSERT OR UPDATE OR DELETE ON public.media_files
  FOR EACH ROW EXECUTE FUNCTION public.log_entity_change();

-- ============================================
-- PHASE 2: NOTIFICATION SYSTEM
-- ============================================

CREATE TABLE public.notifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    
    -- Content
    title TEXT NOT NULL,
    message TEXT NOT NULL,
    
    -- Type and priority
    type TEXT NOT NULL CHECK (type IN ('info', 'success', 'warning', 'error')),
    category TEXT,
    
    -- Links
    action_url TEXT,
    entity_type TEXT,
    entity_id UUID,
    
    -- Status
    read BOOLEAN DEFAULT false,
    read_at TIMESTAMPTZ,
    
    -- Metadata
    created_at TIMESTAMPTZ DEFAULT now(),
    expires_at TIMESTAMPTZ
);

-- Indexes for notifications
CREATE INDEX idx_notifications_user ON public.notifications(user_id);
CREATE INDEX idx_notifications_read ON public.notifications(read);
CREATE INDEX idx_notifications_created_at ON public.notifications(created_at DESC);

-- Enable RLS on notifications
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

-- RLS Policies for notifications
CREATE POLICY "Users can view their own notifications"
  ON public.notifications FOR SELECT
  USING (user_id = auth.uid());

CREATE POLICY "Users can update their own notifications"
  ON public.notifications FOR UPDATE
  USING (user_id = auth.uid());

CREATE POLICY "System can create notifications"
  ON public.notifications FOR INSERT
  WITH CHECK (true);

-- Enable realtime for notifications
ALTER PUBLICATION supabase_realtime ADD TABLE public.notifications;

-- ============================================
-- PHASE 3: AUTOMATION TRIGGERS
-- ============================================

-- Trigger for employee onboarding
CREATE OR REPLACE FUNCTION public.trigger_employee_onboarding()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF (TG_OP = 'INSERT' AND NEW.activo = true) OR 
     (TG_OP = 'UPDATE' AND OLD.activo = false AND NEW.activo = true) THEN
    PERFORM net.http_post(
      url := 'https://zntotcpagkunvkwpubqu.supabase.co/functions/v1/send-welcome-email',
      headers := jsonb_build_object('Content-Type', 'application/json', 'Authorization', 'Bearer ' || current_setting('request.jwt.claims', true)::json->>'sub'),
      body := jsonb_build_object('employee_id', NEW.id)
    );
  END IF;
  RETURN NEW;
END;
$$;

CREATE TRIGGER employee_onboarding_trigger
  AFTER INSERT OR UPDATE OF activo ON public.empleados
  FOR EACH ROW
  WHEN (NEW.activo = true)
  EXECUTE FUNCTION public.trigger_employee_onboarding();

-- Trigger for employee offboarding
CREATE OR REPLACE FUNCTION public.trigger_employee_offboarding()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF TG_OP = 'UPDATE' AND OLD.activo = true AND NEW.activo = false THEN
    PERFORM net.http_post(
      url := 'https://zntotcpagkunvkwpubqu.supabase.co/functions/v1/send-offboarding-alert',
      headers := jsonb_build_object('Content-Type', 'application/json', 'Authorization', 'Bearer ' || current_setting('request.jwt.claims', true)::json->>'sub'),
      body := jsonb_build_object('employee_id', NEW.id)
    );
  END IF;
  RETURN NEW;
END;
$$;

CREATE TRIGGER employee_offboarding_trigger
  AFTER UPDATE OF activo ON public.empleados
  FOR EACH ROW
  WHEN (OLD.activo = true AND NEW.activo = false)
  EXECUTE FUNCTION public.trigger_employee_offboarding();

-- Trigger for blog post published
CREATE OR REPLACE FUNCTION public.trigger_blog_published()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF TG_OP = 'UPDATE' AND OLD.status != 'published' AND NEW.status = 'published' THEN
    PERFORM net.http_post(
      url := 'https://zntotcpagkunvkwpubqu.supabase.co/functions/v1/trigger-site-rebuild',
      headers := jsonb_build_object('Content-Type', 'application/json'),
      body := jsonb_build_object('entity_type', 'blog_post', 'entity_id', NEW.id)
    );
  END IF;
  RETURN NEW;
END;
$$;

CREATE TRIGGER blog_published_trigger
  AFTER UPDATE OF status ON public.blog_posts
  FOR EACH ROW
  WHEN (NEW.status = 'published')
  EXECUTE FUNCTION public.trigger_blog_published();