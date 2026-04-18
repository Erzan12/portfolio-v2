export type Post = {
  id: string | number;
  slug: string;
  createdAt: string | Date;
  content: string;
  title: string;
  excerpt: string | null;
};