-- Create media_files table for unified media management
CREATE TABLE public.media_files (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    
    -- File Information
    file_name TEXT NOT NULL,
    original_name TEXT NOT NULL,
    file_type TEXT NOT NULL CHECK (file_type IN ('image', 'pdf')),
    mime_type TEXT NOT NULL,
    file_size INTEGER NOT NULL,
    
    -- Storage Paths
    original_path TEXT NOT NULL,
    thumbnail_path TEXT,
    card_path TEXT,
    hero_path TEXT,
    
    -- Public URLs
    original_url TEXT NOT NULL,
    thumbnail_url TEXT,
    card_url TEXT,
    hero_url TEXT,
    
    -- Metadata
    title TEXT,
    alt_text TEXT,
    description TEXT,
    tags TEXT[] DEFAULT '{}',
    
    -- Dimensions (for images)
    width INTEGER,
    height INTEGER,
    
    -- Authorship
    uploaded_by UUID REFERENCES auth.users(id) NOT NULL,
    uploaded_at TIMESTAMPTZ DEFAULT now(),
    
    -- Usage Tracking
    usage_count INTEGER DEFAULT 0,
    last_used_at TIMESTAMPTZ,
    
    -- Timestamps
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- Indexes for performance
CREATE INDEX idx_media_files_type ON public.media_files(file_type);
CREATE INDEX idx_media_files_uploaded_by ON public.media_files(uploaded_by);
CREATE INDEX idx_media_files_tags ON public.media_files USING GIN(tags);
CREATE INDEX idx_media_files_created_at ON public.media_files(created_at DESC);

-- Updated_at trigger
CREATE TRIGGER update_media_files_updated_at
    BEFORE UPDATE ON public.media_files
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Create media_usage table to track where files are used
CREATE TABLE public.media_usage (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    media_file_id UUID REFERENCES public.media_files(id) ON DELETE CASCADE NOT NULL,
    entity_type TEXT NOT NULL CHECK (entity_type IN ('blog_post', 'case_study', 'employee')),
    entity_id UUID NOT NULL,
    usage_type TEXT NOT NULL CHECK (usage_type IN ('featured_image', 'content_image', 'avatar', 'document')),
    created_at TIMESTAMPTZ DEFAULT now(),
    UNIQUE(media_file_id, entity_type, entity_id, usage_type)
);

CREATE INDEX idx_media_usage_media ON public.media_usage(media_file_id);
CREATE INDEX idx_media_usage_entity ON public.media_usage(entity_type, entity_id);

-- Function to update usage count
CREATE OR REPLACE FUNCTION update_media_usage_count()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
    IF TG_OP = 'INSERT' THEN
        UPDATE media_files 
        SET 
            usage_count = usage_count + 1,
            last_used_at = now()
        WHERE id = NEW.media_file_id;
    ELSIF TG_OP = 'DELETE' THEN
        UPDATE media_files 
        SET usage_count = GREATEST(usage_count - 1, 0)
        WHERE id = OLD.media_file_id;
    END IF;
    RETURN NULL;
END;
$$;

CREATE TRIGGER media_usage_count_trigger
    AFTER INSERT OR DELETE ON public.media_usage
    FOR EACH ROW
    EXECUTE FUNCTION update_media_usage_count();

-- Enable RLS
ALTER TABLE public.media_files ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.media_usage ENABLE ROW LEVEL SECURITY;

-- Media Files Policies
CREATE POLICY "Authenticated users can view all media"
  ON public.media_files FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Editors, marketing, and admins can upload media"
  ON public.media_files FOR INSERT
  TO authenticated
  WITH CHECK (
    public.has_role(auth.uid(), 'admin') OR 
    public.has_role(auth.uid(), 'marketing') OR 
    public.has_role(auth.uid(), 'editor')
  );

CREATE POLICY "Uploaders and admins can update their media"
  ON public.media_files FOR UPDATE
  TO authenticated
  USING (
    uploaded_by = auth.uid() OR
    public.has_role(auth.uid(), 'admin')
  );

CREATE POLICY "Admins can delete media"
  ON public.media_files FOR DELETE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- Media Usage Policies
CREATE POLICY "Authenticated users can view media usage"
  ON public.media_usage FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "System can manage media usage"
  ON public.media_usage FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Create unified media-library storage bucket
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'media-library',
  'media-library',
  true,
  10485760,
  ARRAY[
    'image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml',
    'application/pdf'
  ]
)
ON CONFLICT (id) DO NOTHING;

-- Storage policies for media-library
CREATE POLICY "Anyone can view media library"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'media-library');

CREATE POLICY "Authenticated users can upload to media library"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (
    bucket_id = 'media-library' AND
    (public.has_role(auth.uid(), 'admin') OR 
     public.has_role(auth.uid(), 'marketing') OR 
     public.has_role(auth.uid(), 'editor'))
  );

CREATE POLICY "Owners and admins can update media library files"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING (
    bucket_id = 'media-library' AND
    (owner = auth.uid() OR public.has_role(auth.uid(), 'admin'))
  );

CREATE POLICY "Admins can delete from media library"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (
    bucket_id = 'media-library' AND
    public.has_role(auth.uid(), 'admin')
  );