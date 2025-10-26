import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface NotificationRequest {
  post_id: string;
  status: 'in_review' | 'published';
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { post_id, status }: NotificationRequest = await req.json();
    
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const brevoApiKey = Deno.env.get("BREVO_API_KEY");

    if (!brevoApiKey) {
      console.error("BREVO_API_KEY not configured");
      return new Response(
        JSON.stringify({ error: "Email service not configured" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    // Fetch post details
    const { data: post, error: postError } = await supabase
      .from('blog_posts')
      .select('*, author:author_id(email)')
      .eq('id', post_id)
      .single();

    if (postError) throw postError;

    let recipients: { email: string; name: string }[] = [];
    let subject = '';
    let htmlContent = '';

    if (status === 'in_review') {
      // Send to admins and marketing
      const { data: reviewers } = await supabase
        .from('profiles')
        .select('id, email')
        .in('role', ['admin', 'marketing']);

      recipients = reviewers?.map(r => ({ email: r.email, name: r.email.split('@')[0] })) || [];
      
      subject = `✅ Nuevo post para revisar: ${post.title_es}`;
      htmlContent = `
        <h2>Nuevo post para revisión</h2>
        <p><strong>${post.author?.email || 'Un autor'}</strong> ha enviado un nuevo post para revisión:</p>
        <h3>${post.title_es}</h3>
        <p><strong>Categoría:</strong> ${post.blog_category || 'Sin categoría'}</p>
        <p><strong>Extracto:</strong> ${post.excerpt_es || 'Sin extracto'}</p>
        <p><a href="https://app.lovable.dev/projects/..." style="background: #1A1A1A; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block; margin-top: 10px;">Ver y Revisar</a></p>
        <hr style="margin: 20px 0;">
        <p style="color: #666; font-size: 12px;">Navarro Intranet</p>
      `;
    } else if (status === 'published') {
      // Send to author
      recipients = post.author ? [{ email: post.author.email, name: post.author.email.split('@')[0] }] : [];
      
      subject = `🎉 Tu post ha sido publicado: ${post.title_es}`;
      htmlContent = `
        <h2>¡Buenas noticias!</h2>
        <p>Tu post ha sido publicado:</p>
        <h3>${post.title_es}</h3>
        <p><strong>Fecha de publicación:</strong> ${new Date(post.published_at).toLocaleDateString('es-ES')}</p>
        <p><a href="https://navarrolegal.es/insights/${post.slug_es}" style="background: #1A1A1A; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block; margin-top: 10px;">Ver Post Publicado</a></p>
        <hr style="margin: 20px 0;">
        <p style="color: #666; font-size: 12px;">Navarro Intranet</p>
      `;
    }

    if (recipients.length === 0) {
      return new Response(
        JSON.stringify({ message: "No recipients found" }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Send email via Brevo
    const brevoResponse = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "api-key": brevoApiKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        sender: { email: "noreply@navarrolegal.es", name: "Navarro Intranet" },
        to: recipients,
        subject: subject,
        htmlContent: htmlContent,
      }),
    });

    if (!brevoResponse.ok) {
      const errorText = await brevoResponse.text();
      console.error("Brevo API error:", errorText);
      throw new Error(`Brevo API error: ${errorText}`);
    }

    return new Response(
      JSON.stringify({ success: true, message: "Notification sent" }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error: any) {
    console.error("Error sending notification:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
};

serve(handler);
