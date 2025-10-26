import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const handler = async (req: Request): Promise<Response> => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { employee_id } = await req.json();

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // Fetch employee data
    const { data: employee, error: empError } = await supabase
      .from('empleados')
      .select('*')
      .eq('id', employee_id)
      .single();

    if (empError || !employee) {
      throw new Error('Employee not found');
    }

    console.log(`Processing welcome email for employee: ${employee.nombre}`);

    // Send welcome email via Brevo
    if (employee.email && Deno.env.get("BREVO_API_KEY")) {
      const emailResponse = await fetch("https://api.brevo.com/v3/smtp/email", {
        method: "POST",
        headers: {
          "api-key": Deno.env.get("BREVO_API_KEY")!,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sender: { email: "rrhh@navarrolegal.es", name: "Recursos Humanos" },
          to: [{ email: employee.email }],
          subject: `¡Bienvenido/a a Navarro, ${employee.nombre}!`,
          htmlContent: `
            <h2>¡Bienvenido/a al equipo!</h2>
            <p>Estimado/a ${employee.nombre},</p>
            <p>Es un placer darte la bienvenida a Navarro Legal.</p>
            <p><strong>Tus datos de acceso:</strong></p>
            <ul>
              <li>Email: ${employee.email}</li>
              <li>Área: ${employee.area || 'Por asignar'}</li>
              <li>Oficina: ${employee.oficina || 'Por asignar'}</li>
              <li>Fecha de inicio: ${employee.fecha_alta || 'Hoy'}</li>
            </ul>
            <p>El equipo de IT se pondrá en contacto contigo para configurar tus accesos.</p>
            <p>¡Bienvenido/a!</p>
          `,
        }),
      });

      if (!emailResponse.ok) {
        console.error('Failed to send welcome email:', await emailResponse.text());
      } else {
        console.log('Welcome email sent successfully');
      }
    }

    // Create in-app notification for IT/admin users
    const { data: adminUsers } = await supabase
      .from('user_roles')
      .select('user_id')
      .eq('role', 'admin');

    if (adminUsers && adminUsers.length > 0) {
      const notifications = adminUsers.map(user => ({
        user_id: user.user_id,
        title: 'Nueva Alta de Empleado',
        message: `${employee.nombre} se ha incorporado al equipo.`,
        type: 'info',
        category: 'employee',
        entity_type: 'empleados',
        entity_id: employee.id,
        action_url: `/intranet/personas/${employee.id}`,
      }));

      await supabase.from('notifications').insert(notifications);
      console.log(`Created ${notifications.length} notifications for admins`);
    }

    return new Response(
      JSON.stringify({ success: true, employee: employee.nombre }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error: any) {
    console.error('Error in send-welcome-email:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
};

serve(handler);
