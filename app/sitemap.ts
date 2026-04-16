import { MetadataRoute } from 'next';
import { getAllBlogPosts } from "@/lib/blog-data";

const BASE_URL = 'https://flowcore.in';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date('2026-04-16'),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/products`,
      lastModified: new Date('2026-04-16'),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/applications`,
      lastModified: new Date('2026-04-16'),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/berlington-pumps-bangalore`,
      lastModified: new Date('2026-04-16'),
      changeFrequency: 'weekly',
      priority: 0.95,
    },
    {
      url: `${BASE_URL}/industrial-pumps-bangalore`,
      lastModified: new Date('2026-04-16'),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/fire-fighting-pumps-bangalore`,
      lastModified: new Date('2026-04-16'),
      changeFrequency: 'monthly',
      priority: 0.82,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: new Date('2026-04-16'),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: new Date('2026-04-16'),
      changeFrequency: 'yearly',
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/blog`,
      lastModified: new Date('2026-04-16'),
      changeFrequency: 'weekly',
      priority: 0.85,
    },
  ];

  const blogRoutes: MetadataRoute.Sitemap = getAllBlogPosts().map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.updatedAt),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [...staticRoutes, ...blogRoutes];
}
