/**
 * Define os possíveis estados de publicação de uma página.
 */
export type IStatus = 'published' | 'draft' | 'archived'

/**
 * Representa uma página de conteúdo, incluindo metadados para SEO e um status de publicação.
 */
export interface IContentPage {
  /** Título principal da página. */
  title: string

  /** Identificador único para a rota ou slug da página, ex.: 'sobre-nos'. */
  slug: string

  /** Conteúdo (HTML/Markdown) da página. */
  content: string

  /** Metadado de título para SEO (opcional). */
  metaTitle?: string

  /** Metadado de descrição para SEO (opcional). */
  metaDescription?: string

  /** Palavras-chave para SEO, ex.: ['turismo', 'viagem'] (opcional). */
  keywords?: string[]

  /** Estado de publicação da página: 'published', 'draft' ou 'archived'. */
  status: IStatus

  /** Data de criação da página. */
  createdAt: Date

  /** Data da última atualização da página. */
  updatedAt: Date
}
