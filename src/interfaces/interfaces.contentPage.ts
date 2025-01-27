type IStatus = 'published' | 'draft' | 'archived';

export interface IContentPage {
  title: string;
  slug: string;
  content: string;
  metaTitle?: string;
  metaDescription?: string;
  keywords?: string[];
  status: IStatus;
  createdAt: Date;
  updatedAt: Date;
}