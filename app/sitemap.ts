import { MetadataRoute } from 'next';
import { getAllBlogPosts } from "@/lib/blog-data";
import { PUMP_CATALOG } from "@/lib/pump-data";
import { seoKeywords } from "@/lib/seo-keywords";
import { INDUSTRIES } from "@/lib/industry-data";
import { APPLICATIONS } from "@/lib/application-data";
import { PRODUCT_AUTHORITY_PAGES, PROJECT_PAGES, SERVICE_PAGES } from "@/lib/phase3-authority-data";

const BASE_URL = 'https://flowcoresolutions.in';

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/berlington-pumps-bangalore`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/products`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/industrial-pumps-bangalore`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/water-treatment-chemicals-bangalore`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/applications`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/fire-fighting-pumps-bangalore`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.82,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/blog`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.85,
    },
  ];

  const blogRoutes: MetadataRoute.Sitemap = getAllBlogPosts().map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.updatedAt),
    changeFrequency: "monthly",
    priority: 0.85,
  }));

  const productRoutes: MetadataRoute.Sitemap = PUMP_CATALOG.map((pump) => ({
    url: `${BASE_URL}/products/${pump.id}`,
    lastModified,
    changeFrequency: "monthly",
    priority: 0.85,
  }));

  const productAuthorityRoutes: MetadataRoute.Sitemap = PRODUCT_AUTHORITY_PAGES.map((page) => ({
    url: `${BASE_URL}/products/${page.slug}`,
    lastModified: new Date(page.updatedAt),
    changeFrequency: "monthly",
    priority: 0.9,
  }));

  const localRoutes: MetadataRoute.Sitemap = [];
  seoKeywords.localSEO.cities.forEach((city) => {
    seoKeywords.localSEO.targetPages.forEach((service) => {
      localRoutes.push({
        url: `${BASE_URL}/${city}/${service}`,
        lastModified,
        changeFrequency: "monthly",
        priority: 0.75,
      });
    });
  });

  const industryRoutes: MetadataRoute.Sitemap = INDUSTRIES.map((industry) => ({
    url: `${BASE_URL}/industries/${industry.slug}`,
    lastModified,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const applicationRoutes: MetadataRoute.Sitemap = APPLICATIONS.map((app) => ({
    url: `${BASE_URL}/applications/${app.slug}`,
    lastModified,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const serviceRoutes: MetadataRoute.Sitemap = SERVICE_PAGES.map((page) => ({
    url: `${BASE_URL}/services/${page.slug}`,
    lastModified: new Date(page.updatedAt),
    changeFrequency: "monthly",
    priority: 0.78,
  }));

  const projectRoutes: MetadataRoute.Sitemap = PROJECT_PAGES.map((page) => ({
    url: `${BASE_URL}/projects/${page.slug}`,
    lastModified: new Date(page.updatedAt),
    changeFrequency: "monthly",
    priority: 0.76,
  }));

  return [
    ...staticRoutes,
    ...blogRoutes,
    ...productRoutes,
    ...productAuthorityRoutes,
    ...localRoutes,
    ...industryRoutes,
    ...applicationRoutes,
    ...serviceRoutes,
    ...projectRoutes,
  ];
}
