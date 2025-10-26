import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const { file_path, uploaded_by, file_name, mime_type, file_size } = await req.json();

    // For PDFs, just create the database record without resizing
    if (mime_type === 'application/pdf') {
      const getPublicUrl = (path: string) => {
        return supabase.storage.from('media-library').getPublicUrl(path).data.publicUrl;
      };

      const { data: mediaFile, error: dbError } = await supabase
        .from('media_files')
        .insert({
          file_name,
          original_name: file_name,
          file_type: 'pdf',
          mime_type,
          file_size,
          original_path: file_path,
          original_url: getPublicUrl(file_path),
          uploaded_by
        })
        .select()
        .single();

      if (dbError) throw dbError;

      return new Response(
        JSON.stringify({ success: true, media_file: mediaFile }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // For images, use browser-based resizing on client side
    // This edge function just creates the database record for images uploaded with pre-resized versions
    const getPublicUrl = (path: string) => {
      return supabase.storage.from('media-library').getPublicUrl(path).data.publicUrl;
    };

    const { data: mediaFile, error: dbError } = await supabase
      .from('media_files')
      .insert({
        file_name,
        original_name: file_name,
        file_type: 'image',
        mime_type,
        file_size,
        original_path: file_path,
        original_url: getPublicUrl(file_path),
        uploaded_by
      })
      .select()
      .single();

    if (dbError) throw dbError;

    return new Response(
      JSON.stringify({ success: true, media_file: mediaFile }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error: any) {
    console.error('Error processing media:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
