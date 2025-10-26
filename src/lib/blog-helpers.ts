export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove accents
    .replace(/[^a-z0-9\s-]/g, '') // Remove special chars
    .trim()
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-'); // Remove consecutive hyphens
}

export function calculateReadTime(html: string): number {
  const text = html.replace(/<[^>]*>/g, '');
  const words = text.trim().split(/\s+/).length;
  return Math.ceil(words / 200); // Average reading speed: 200 words per minute
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength).trim() + '...';
}

export const BLOG_CATEGORIES = [
  'Fiscal',
  'Mercantil',
  'Laboral',
  'Empresa Familiar',
  'M&A',
  'General',
] as const;

export type BlogCategory = (typeof BLOG_CATEGORIES)[number];

export type BlogStatus = 'draft' | 'in_review' | 'scheduled' | 'published' | 'archived';

export interface BlogStatusConfig {
  label: string;
  color: string;
  bgColor: string;
}

export const BLOG_STATUS_CONFIG: Record<BlogStatus, BlogStatusConfig> = {
  draft: {
    label: 'Borrador',
    color: 'text-muted-foreground',
    bgColor: 'bg-muted',
  },
  in_review: {
    label: 'En Revisión',
    color: 'text-yellow-700',
    bgColor: 'bg-yellow-100',
  },
  scheduled: {
    label: 'Programado',
    color: 'text-blue-700',
    bgColor: 'bg-blue-100',
  },
  published: {
    label: 'Publicado',
    color: 'text-green-700',
    bgColor: 'bg-green-100',
  },
  archived: {
    label: 'Archivado',
    color: 'text-red-700',
    bgColor: 'bg-red-100',
  },
};

export function canTransitionStatus(
  currentStatus: BlogStatus,
  newStatus: BlogStatus,
  userRole: string,
  isAuthor: boolean
): boolean {
  const transitions: Record<BlogStatus, BlogStatus[]> = {
    draft: ['in_review', 'scheduled', 'published'],
    in_review: ['draft', 'scheduled', 'published'],
    scheduled: ['draft', 'published'],
    published: ['archived', 'draft'],
    archived: ['draft'],
  };

  if (!transitions[currentStatus]?.includes(newStatus)) {
    return false;
  }

  // Role-based permissions
  if (userRole === 'admin') return true;
  if (userRole === 'marketing') return true;
  if (userRole === 'editor' && isAuthor) {
    // Editors can only submit to review or schedule their own posts
    return newStatus === 'in_review' || newStatus === 'scheduled';
  }

  return false;
}
