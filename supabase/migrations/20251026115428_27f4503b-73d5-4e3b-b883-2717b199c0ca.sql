-- Enhance empleados table for Personas module
ALTER TABLE public.empleados 
  ADD COLUMN IF NOT EXISTS rol TEXT,
  ADD COLUMN IF NOT EXISTS area TEXT,
  ADD COLUMN IF NOT EXISTS oficina TEXT,
  ADD COLUMN IF NOT EXISTS avatar_url TEXT,
  ADD COLUMN IF NOT EXISTS firma_url TEXT,
  ADD COLUMN IF NOT EXISTS contrato_url TEXT,
  ADD COLUMN IF NOT EXISTS email TEXT;

-- Create index for common filter queries
CREATE INDEX IF NOT EXISTS idx_empleados_area ON empleados(area);
CREATE INDEX IF NOT EXISTS idx_empleados_oficina ON empleados(oficina);
CREATE INDEX IF NOT EXISTS idx_empleados_activo ON empleados(activo);

-- Create function to track employee movements
CREATE OR REPLACE FUNCTION log_employee_movement()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Log changes to empleados
  IF TG_OP = 'INSERT' THEN
    INSERT INTO audit_logs (entity, entity_id, action, actor, data)
    VALUES ('empleados', NEW.id, 'ALTA', auth.uid()::text, 
            jsonb_build_object('nombre', NEW.nombre, 'area', NEW.area, 'oficina', NEW.oficina));
  ELSIF TG_OP = 'UPDATE' THEN
    -- Log offboarding
    IF OLD.activo = true AND NEW.activo = false THEN
      INSERT INTO audit_logs (entity, entity_id, action, actor, data)
      VALUES ('empleados', NEW.id, 'BAJA', auth.uid()::text,
              jsonb_build_object('nombre', NEW.nombre, 'fecha_baja', NEW.fecha_baja));
    -- Log area/oficina changes
    ELSIF OLD.area != NEW.area OR OLD.oficina != NEW.oficina THEN
      INSERT INTO audit_logs (entity, entity_id, action, actor, data)
      VALUES ('empleados', NEW.id, 'MOVIMIENTO', auth.uid()::text,
              jsonb_build_object('area_anterior', OLD.area, 'area_nueva', NEW.area,
                                'oficina_anterior', OLD.oficina, 'oficina_nueva', NEW.oficina));
    END IF;
  END IF;
  RETURN NEW;
END;
$$;

-- Create trigger for employee movements
DROP TRIGGER IF EXISTS employee_movement_trigger ON empleados;
CREATE TRIGGER employee_movement_trigger
  AFTER INSERT OR UPDATE ON empleados
  FOR EACH ROW
  EXECUTE FUNCTION log_employee_movement();