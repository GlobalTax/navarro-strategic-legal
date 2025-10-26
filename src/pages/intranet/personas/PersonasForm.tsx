import { useState } from "react";
import { IntranetLayout } from "@/components/intranet/IntranetLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { ChevronLeft, ChevronRight, Check, Upload } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

const AREAS = ["Legal", "Fiscal", "Laboral", "Mercantil", "M&A", "Administración", "IT", "Recursos Humanos"];
const OFICINAS = ["Barcelona", "Madrid", "Valencia", "Sevilla"];

export default function PersonasForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = !!id;

  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    rol: "",
    area: "",
    oficina: "",
    fecha_alta: new Date().toISOString().split('T')[0],
    nif: "",
  });
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [firmaFile, setFirmaFile] = useState<File | null>(null);
  const [contratoFile, setContratoFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [areaOpen, setAreaOpen] = useState(false);
  const [oficinaOpen, setOficinaOpen] = useState(false);

  // Load existing data if editing
  useQuery({
    queryKey: ['empleado', id],
    queryFn: async () => {
      if (!id) return null;
      const { data, error } = await supabase
        .from('empleados')
        .select('*')
        .eq('id', id)
        .single();
      
      if (error) throw error;
      
      if (data) {
        setFormData({
          nombre: data.nombre || "",
          email: data.email || "",
          rol: data.rol || "",
          area: data.area || "",
          oficina: data.oficina || "",
          fecha_alta: data.fecha_alta || new Date().toISOString().split('T')[0],
          nif: data.nif || "",
        });
      }
      
      return data;
    },
    enabled: isEdit,
  });

  const handleNext = () => {
    if (currentStep === 1) {
      if (!formData.nombre || !formData.email || !formData.rol) {
        toast.error("Por favor completa todos los campos obligatorios");
        return;
      }
    }
    if (currentStep === 2) {
      if (!formData.area || !formData.oficina) {
        toast.error("Por favor selecciona área y oficina");
        return;
      }
    }
    setCurrentStep(currentStep + 1);
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      let avatarUrl = null;
      let firmaUrl = null;
      let contratoUrl = null;

      // Upload files if provided
      if (avatarFile) {
        const fileName = `avatar_${Date.now()}_${avatarFile.name}`;
        const { error: uploadError } = await supabase.storage
          .from('intranet-media' as any)
          .upload(fileName, avatarFile);
        
        if (!uploadError) {
          const { data: { publicUrl } } = supabase.storage
            .from('intranet-media' as any)
            .getPublicUrl(fileName);
          avatarUrl = publicUrl;
        }
      }

      if (firmaFile) {
        const fileName = `firma_${Date.now()}_${firmaFile.name}`;
        const { error: uploadError } = await supabase.storage
          .from('intranet-media' as any)
          .upload(fileName, firmaFile);
        
        if (!uploadError) {
          const { data: { publicUrl } } = supabase.storage
            .from('intranet-media' as any)
            .getPublicUrl(fileName);
          firmaUrl = publicUrl;
        }
      }

      if (contratoFile) {
        const fileName = `contrato_${Date.now()}_${contratoFile.name}`;
        const { error: uploadError } = await supabase.storage
          .from('intranet-media' as any)
          .upload(fileName, contratoFile);
        
        if (!uploadError) {
          const { data: { publicUrl } } = supabase.storage
            .from('intranet-media' as any)
            .getPublicUrl(fileName);
          contratoUrl = publicUrl;
        }
      }

      const employeeData = {
        nombre: formData.nombre,
        email: formData.email,
        rol: formData.rol,
        area: formData.area,
        oficina: formData.oficina,
        fecha_alta: formData.fecha_alta,
        nif: formData.nif,
        activo: true,
        ...(avatarUrl && { avatar_url: avatarUrl }),
        ...(firmaUrl && { firma_url: firmaUrl }),
        ...(contratoUrl && { contrato_url: contratoUrl }),
      };

      if (isEdit) {
        const { error } = await supabase
          .from('empleados')
          .update(employeeData)
          .eq('id', id);
        
        if (error) throw error;
        toast.success("Empleado actualizado correctamente");
      } else {
        const { error } = await supabase
          .from('empleados')
          .insert([employeeData]);
        
        if (error) throw error;
        toast.success("Empleado dado de alta correctamente");
      }

      navigate('/intranet/personas');
    } catch (error: any) {
      toast.error(error.message || "Error al guardar");
    } finally {
      setLoading(false);
    }
  };

  const steps = [
    { number: 1, title: "Datos Básicos" },
    { number: 2, title: "Área y Oficina" },
    { number: 3, title: "Documentos" },
  ];

  return (
    <IntranetLayout>
      <div className="container-custom max-w-4xl py-8">
        <Button
          variant="ghost"
          onClick={() => navigate('/intranet/personas')}
          className="mb-6"
        >
          <ChevronLeft className="mr-2 h-4 w-4" />
          Volver
        </Button>

        <div className="mb-8">
          <h1 className="text-4xl font-serif font-bold mb-2">
            {isEdit ? 'Editar Empleado' : 'Acta de Alta'}
          </h1>
          <p className="text-muted-foreground">
            {isEdit ? 'Modifica los datos del empleado' : 'Completa los datos en 3 pasos'}
          </p>
        </div>

        {/* Steps Indicator */}
        <div className="flex items-center justify-center mb-8">
          {steps.map((step, index) => (
            <div key={step.number} className="flex items-center">
              <div className="flex flex-col items-center">
                <div
                  className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center font-medium transition-colors",
                    currentStep >= step.number
                      ? "bg-accent text-accent-foreground"
                      : "bg-muted text-muted-foreground"
                  )}
                >
                  {currentStep > step.number ? (
                    <Check className="h-5 w-5" />
                  ) : (
                    step.number
                  )}
                </div>
                <span className="text-xs mt-2 text-muted-foreground">
                  {step.title}
                </span>
              </div>
              {index < steps.length - 1 && (
                <div
                  className={cn(
                    "w-24 h-0.5 mx-4 transition-colors",
                    currentStep > step.number ? "bg-accent" : "bg-muted"
                  )}
                />
              )}
            </div>
          ))}
        </div>

        <Card className="p-8">
          {/* Step 1: Datos Básicos */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold mb-6">Datos Básicos</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="nombre">Nombre completo*</Label>
                  <Input
                    id="nombre"
                    value={formData.nombre}
                    onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                    placeholder="María García López"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="email">Email corporativo*</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="maria@navarrolegal.es"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="rol">Rol / Puesto*</Label>
                  <Input
                    id="rol"
                    value={formData.rol}
                    onChange={(e) => setFormData({ ...formData, rol: e.target.value })}
                    placeholder="Abogada Senior"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="nif">NIF</Label>
                  <Input
                    id="nif"
                    value={formData.nif}
                    onChange={(e) => setFormData({ ...formData, nif: e.target.value })}
                    placeholder="12345678A"
                  />
                </div>

                <div>
                  <Label htmlFor="fecha_alta">Fecha de inicio</Label>
                  <Input
                    id="fecha_alta"
                    type="date"
                    value={formData.fecha_alta}
                    onChange={(e) => setFormData({ ...formData, fecha_alta: e.target.value })}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Área y Oficina */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold mb-6">Área y Oficina</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label>Área*</Label>
                  <Popover open={areaOpen} onOpenChange={setAreaOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        role="combobox"
                        className="w-full justify-between"
                      >
                        {formData.area || "Seleccionar área..."}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-full p-0">
                      <Command>
                        <CommandInput placeholder="Buscar área..." />
                        <CommandEmpty>No se encontró el área.</CommandEmpty>
                        <CommandGroup>
                          {AREAS.map((area) => (
                            <CommandItem
                              key={area}
                              onSelect={() => {
                                setFormData({ ...formData, area });
                                setAreaOpen(false);
                              }}
                            >
                              {area}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </Command>
                    </PopoverContent>
                  </Popover>
                </div>

                <div>
                  <Label>Oficina*</Label>
                  <Popover open={oficinaOpen} onOpenChange={setOficinaOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        role="combobox"
                        className="w-full justify-between"
                      >
                        {formData.oficina || "Seleccionar oficina..."}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-full p-0">
                      <Command>
                        <CommandInput placeholder="Buscar oficina..." />
                        <CommandEmpty>No se encontró la oficina.</CommandEmpty>
                        <CommandGroup>
                          {OFICINAS.map((oficina) => (
                            <CommandItem
                              key={oficina}
                              onSelect={() => {
                                setFormData({ ...formData, oficina });
                                setOficinaOpen(false);
                              }}
                            >
                              {oficina}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </Command>
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Documentos */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold mb-6">Documentos</h2>
              
              <div className="space-y-4">
                <div>
                  <Label>Avatar / Foto de perfil</Label>
                  <div className="mt-2">
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={(e) => setAvatarFile(e.target.files?.[0] || null)}
                    />
                  </div>
                </div>

                <div>
                  <Label>Firma digital</Label>
                  <div className="mt-2">
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={(e) => setFirmaFile(e.target.files?.[0] || null)}
                    />
                  </div>
                </div>

                <div>
                  <Label>Contrato</Label>
                  <div className="mt-2">
                    <Input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={(e) => setContratoFile(e.target.files?.[0] || null)}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8 pt-6 border-t">
            {currentStep > 1 && (
              <Button
                variant="outline"
                onClick={() => setCurrentStep(currentStep - 1)}
              >
                <ChevronLeft className="mr-2 h-4 w-4" />
                Anterior
              </Button>
            )}

            {currentStep < 3 ? (
              <Button onClick={handleNext} className="ml-auto">
                Siguiente
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            ) : (
              <Button onClick={handleSubmit} disabled={loading} className="ml-auto">
                {loading ? "Guardando..." : isEdit ? "Actualizar" : "Confirmar Alta"}
              </Button>
            )}
          </div>
        </Card>
      </div>
    </IntranetLayout>
  );
}
