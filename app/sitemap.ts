import { MetadataRoute } from "next";

// Replace with your API or DB calls
async function getBlogs() {
  const res = await fetch("https://kiwiconnectdigital.com/api/blogs", {
    cache: "no-store",
  });
  return res.json();
}

async function getServices() {
  const res = await fetch("https://kiwiconnectdigital.com/api/services", {
    cache: "no-store",
  });
  return res.json();
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const blogs = await getBlogs();
  const services = await getServices();

  const blogUrls = blogs.map((blog: any) => ({
    url: `https://kiwiconnectdigital.com/blog/${blog.slug}`,
    lastModified: blog.updatedAt || new Date(),
    priority: 0.7,
  }));

  const serviceUrls = services.map((service: any) => ({
    url: `https://kiwiconnectdigital.com/services/${service.slug}`,
    lastModified: service.updatedAt || new Date(),
    priority: 0.7,
  }));

  return [
    {
      url: "https://kiwiconnectdigital.com/",
      lastModified: new Date(),
      priority: 1,
    },
    {
      url: "https://kiwiconnectdigital.com/services",
      lastModified: new Date(),
      priority: 0.8,
    },
    {
      url: "https://kiwiconnectdigital.com/about",
      lastModified: new Date(),
      priority: 0.8,
    },
    {
      url: "https://kiwiconnectdigital.com/contact",
      lastModified: new Date(),
      priority: 0.8,
    },
    {
      url: "https://kiwiconnectdigital.com/blog",
      lastModified: new Date(),
      priority: 0.8,
    },

    ...blogUrls,
    ...serviceUrls,
  ];
}