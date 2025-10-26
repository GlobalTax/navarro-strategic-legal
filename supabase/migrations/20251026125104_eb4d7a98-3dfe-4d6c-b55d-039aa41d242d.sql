-- Phase 1: Create User Roles System
CREATE TYPE public.app_role AS ENUM ('admin', 'marketing', 'editor', 'viewer');

CREATE TABLE public.user_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    role app_role NOT NULL,
    created_at TIMESTAMPTZ DEFAULT now(),
    UNIQUE (user_id, role)
);

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

CREATE POLICY "Users can view their own roles"
  ON public.user_roles FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Admins can manage all roles"
  ON public.user_roles FOR ALL
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- Phase 2: Create Blog Database Schema
CREATE TABLE public.blog_posts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    
    -- Spanish content
    title_es TEXT NOT NULL,
    slug_es TEXT NOT NULL UNIQUE,
    content_es TEXT,
    excerpt_es TEXT,
    seo_title_es TEXT,
    seo_description_es TEXT,
    
    -- English content
    title_en TEXT,
    slug_en TEXT UNIQUE,
    content_en TEXT,
    excerpt_en TEXT,
    seo_title_en TEXT,
    seo_description_en TEXT,
    
    -- Metadata
    category TEXT,
    tags TEXT[] DEFAULT '{}',
    featured_image TEXT,
    
    -- Status & scheduling
    status TEXT NOT NULL DEFAULT 'draft',
    scheduled_at TIMESTAMPTZ,
    published_at TIMESTAMPTZ,
    
    -- Authorship
    author_id UUID REFERENCES auth.users(id) NOT NULL,
    
    -- Analytics
    read_time INTEGER,
    view_count INTEGER DEFAULT 0,
    
    -- Timestamps
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now(),
    
    -- Constraints
    CHECK (status IN ('draft', 'in_review', 'scheduled', 'published', 'archived'))
);

CREATE TABLE public.blog_post_state_changes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    post_id UUID REFERENCES public.blog_posts(id) ON DELETE CASCADE NOT NULL,
    from_status TEXT,
    to_status TEXT NOT NULL,
    changed_by UUID REFERENCES auth.users(id) NOT NULL,
    changed_at TIMESTAMPTZ DEFAULT now(),
    notes TEXT
);

-- Create indexes
CREATE INDEX idx_blog_posts_status ON public.blog_posts(status);
CREATE INDEX idx_blog_posts_author ON public.blog_posts(author_id);
CREATE INDEX idx_blog_posts_published_at ON public.blog_posts(published_at DESC);
CREATE INDEX idx_blog_posts_slug_es ON public.blog_posts(slug_es);
CREATE INDEX idx_blog_posts_slug_en ON public.blog_posts(slug_en);
CREATE INDEX idx_blog_post_state_changes_post ON public.blog_post_state_changes(post_id);

-- Create triggers
CREATE TRIGGER update_blog_posts_updated_at
    BEFORE UPDATE ON public.blog_posts
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE OR REPLACE FUNCTION log_blog_post_state_change()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
    IF (TG_OP = 'UPDATE' AND OLD.status != NEW.status) THEN
        INSERT INTO blog_post_state_changes (post_id, from_status, to_status, changed_by)
        VALUES (NEW.id, OLD.status, NEW.status, auth.uid());
    END IF;
    RETURN NEW;
END;
$$;

CREATE TRIGGER blog_post_status_change
    AFTER UPDATE ON public.blog_posts
    FOR EACH ROW
    WHEN (OLD.status IS DISTINCT FROM NEW.status)
    EXECUTE FUNCTION log_blog_post_state_change();

CREATE OR REPLACE FUNCTION public.publish_scheduled_posts()
RETURNS INTEGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  published_count INTEGER;
BEGIN
  WITH updated AS (
    UPDATE blog_posts
    SET 
        status = 'published',
        published_at = now()
    WHERE 
        status = 'scheduled' 
        AND scheduled_at <= now()
        AND scheduled_at IS NOT NULL
    RETURNING id
  )
  SELECT COUNT(*) INTO published_count FROM updated;
  
  RETURN published_count;
END;
$$;

-- Phase 3: Blog RLS Policies
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_post_state_changes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view published posts"
  ON public.blog_posts FOR SELECT
  USING (status = 'published');

CREATE POLICY "Authenticated users can view all posts"
  ON public.blog_posts FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Editors can create posts"
  ON public.blog_posts FOR INSERT
  TO authenticated
  WITH CHECK (
    public.has_role(auth.uid(), 'admin') OR 
    public.has_role(auth.uid(), 'marketing') OR 
    public.has_role(auth.uid(), 'editor')
  );

CREATE POLICY "Authors and admins can update their posts"
  ON public.blog_posts FOR UPDATE
  TO authenticated
  USING (
    author_id = auth.uid() OR
    public.has_role(auth.uid(), 'admin') OR 
    public.has_role(auth.uid(), 'marketing')
  );

CREATE POLICY "Admins can delete posts"
  ON public.blog_posts FOR DELETE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Authenticated users can view state changes"
  ON public.blog_post_state_changes FOR SELECT
  TO authenticated
  USING (true);

-- Phase 4: Storage Bucket for Blog Media
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'blog-media',
  'blog-media',
  true,
  5242880,
  ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif']
)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Anyone can view blog media"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'blog-media');

CREATE POLICY "Authenticated users can upload blog media"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (
    bucket_id = 'blog-media' AND
    (public.has_role(auth.uid(), 'admin') OR 
     public.has_role(auth.uid(), 'marketing') OR 
     public.has_role(auth.uid(), 'editor'))
  );

CREATE POLICY "Authors can update their uploaded media"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING (
    bucket_id = 'blog-media' AND
    (owner = auth.uid() OR public.has_role(auth.uid(), 'admin'))
  );

CREATE POLICY "Admins can delete blog media"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (
    bucket_id = 'blog-media' AND
    public.has_role(auth.uid(), 'admin')
  );

-- Phase 5: Migrate existing users to user_roles
INSERT INTO public.user_roles (user_id, role)
SELECT id, role::app_role
FROM public.profiles
WHERE role IN ('admin', 'marketing', 'editor', 'viewer')
ON CONFLICT (user_id, role) DO NOTHING;