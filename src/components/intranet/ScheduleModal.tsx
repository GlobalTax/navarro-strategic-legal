import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

interface ScheduleModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSchedule: (date: Date) => void;
}

const ScheduleModal = ({ open, onOpenChange, onSchedule }: ScheduleModalProps) => {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  const handleSchedule = () => {
    if (!date || !time) return;

    const scheduledDate = new Date(`${date}T${time}`);
    if (scheduledDate <= new Date()) {
      alert('La fecha debe ser futura');
      return;
    }

    onSchedule(scheduledDate);
    onOpenChange(false);
    setDate('');
    setTime('');
  };

  const getPreviewText = () => {
    if (!date || !time) return '';
    const scheduledDate = new Date(`${date}T${time}`);
    return `Este post se publicará el ${format(scheduledDate, "d 'de' MMMM 'de' yyyy 'a las' HH:mm", { locale: es })}`;
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Programar Publicación</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div>
            <Label htmlFor="date">Fecha</Label>
            <Input
              id="date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              min={format(new Date(), 'yyyy-MM-dd')}
            />
          </div>

          <div>
            <Label htmlFor="time">Hora</Label>
            <Input
              id="time"
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />
          </div>

          {date && time && (
            <div className="p-3 bg-muted rounded-lg text-sm text-muted-foreground">
              {getPreviewText()}
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button onClick={handleSchedule} disabled={!date || !time}>
            Programar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ScheduleModal;
