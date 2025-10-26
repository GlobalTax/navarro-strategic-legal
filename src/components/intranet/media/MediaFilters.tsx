import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Search, X } from 'lucide-react';

interface MediaFiltersProps {
  onFilterChange: (filters: {
    search: string;
    type: string;
    tag: string;
  }) => void;
}

const MediaFilters = ({ onFilterChange }: MediaFiltersProps) => {
  const [search, setSearch] = useState('');
  const [type, setType] = useState('all');
  const [tag, setTag] = useState('all');

  const handleSearchChange = (value: string) => {
    setSearch(value);
    onFilterChange({ search: value, type, tag });
  };

  const handleTypeChange = (value: string) => {
    setType(value);
    onFilterChange({ search, type: value, tag });
  };

  const handleTagChange = (value: string) => {
    setTag(value);
    onFilterChange({ search, type, tag: value });
  };

  const clearFilters = () => {
    setSearch('');
    setType('all');
    setTag('all');
    onFilterChange({ search: '', type: 'all', tag: 'all' });
  };

  const hasFilters = search || type !== 'all' || tag !== 'all';

  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-6">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Buscar por nombre o título..."
          value={search}
          onChange={(e) => handleSearchChange(e.target.value)}
          className="pl-9"
        />
      </div>
      <Select value={type} onValueChange={handleTypeChange}>
        <SelectTrigger className="w-full sm:w-[180px]">
          <SelectValue placeholder="Tipo de archivo" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Todos los tipos</SelectItem>
          <SelectItem value="image">Imágenes</SelectItem>
          <SelectItem value="pdf">PDFs</SelectItem>
        </SelectContent>
      </Select>
      {hasFilters && (
        <Button variant="outline" onClick={clearFilters} size="icon">
          <X className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
};

export default MediaFilters;
