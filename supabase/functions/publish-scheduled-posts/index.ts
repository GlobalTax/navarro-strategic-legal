import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

    const supabase = createClient(supabaseUrl, supabaseKey);

    // Call the publish_scheduled_posts function
    const { data, error } = await supabase.rpc('publish_scheduled_posts');

    if (error) throw error;

    const publishedCount = data || 0;

    console.log(`Published ${publishedCount} scheduled posts`);

    // If posts were published, trigger notifications
    if (publishedCount > 0) {
      // Fetch newly published posts
      const { data: publishedPosts } = await supabase
        .from('blog_posts')
        .select('id')
        .eq('status', 'published')
        .gte('published_at', new Date(Date.now() - 60000).toISOString()); // Last minute

      // Send notifications for each published post
      if (publishedPosts && publishedPosts.length > 0) {
        for (const post of publishedPosts) {
          try {
            await fetch(`${supabaseUrl}/functions/v1/send-blog-notification`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${supabaseKey}`,
              },
              body: JSON.stringify({
                post_id: post.id,
                status: 'published',
              }),
            });
          } catch (notifError) {
            console.error('Error sending notification for post:', post.id, notifError);
          }
        }
      }
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        published_count: publishedCount,
        message: `Successfully published ${publishedCount} posts`
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error: any) {
    console.error("Error publishing scheduled posts:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
};

serve(handler);
