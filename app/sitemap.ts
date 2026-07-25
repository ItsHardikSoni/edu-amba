import { MetadataRoute } from 'next'

export const dynamic = "force-static";
 
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://www.tagorevidyapeeth.com',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1,
    },
    {
      url: 'https://www.tagorevidyapeeth.com/login',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ]
}