// lib/seo.ts
import { Metadata } from 'next'

type MetaInput = {
  title: string
  description?: string
  keywords?: string[]
  image?: string
  url?: string
}

const defaultCompanyName = 'Board Tide'

export const generateMeta = ({ title, description, keywords = [], image = 'https://yourdomain.com/default-og.png', url = 'https://yourdomain.com' }: MetaInput): Metadata => {
  return {
    title: title ? `${title} | ${defaultCompanyName}` : defaultCompanyName,
    description: description || defaultCompanyName,
    keywords,
    openGraph: {
      title,
      description: description || defaultCompanyName,
      url,
      siteName: defaultCompanyName,
      images: [{ url: image }],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: description || defaultCompanyName,
      images: [image],
    },
  }
}
