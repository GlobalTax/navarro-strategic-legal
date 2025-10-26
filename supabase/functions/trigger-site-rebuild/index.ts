import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const handler = async (req: Request): Promise<Response> => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { entity_type, entity_id } = await req.json();

    const rebuildUrl = Deno.env.get("SITE_REBUILD_WEBHOOK");

    if (!rebuildUrl) {
      console.warn('SITE_REBUILD_WEBHOOK not configured - skipping site rebuild');
      return new Response(
        JSON.stringify({ skipped: true, message: 'Webhook not configured' }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log(`Triggering site rebuild for ${entity_type}:${entity_id}`);

    // Trigger rebuild
    const response = await fetch(rebuildUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        trigger: 'content_update',
        entity_type,
        entity_id,
        timestamp: new Date().toISOString(),
      }),
    });

    if (!response.ok) {
      throw new Error(`Rebuild failed: ${response.statusText}`);
    }

    console.log(`Site rebuild triggered successfully`);

    return new Response(
      JSON.stringify({ success: true, entity_type, entity_id }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error: any) {
    console.error('Error in trigger-site-rebuild:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
};

serve(handler);
