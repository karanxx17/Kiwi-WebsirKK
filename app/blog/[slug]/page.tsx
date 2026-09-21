// app/blog/[slug]/page.tsx

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BlogReader from "./BlogReader";

const API_BASE = "http://localhost:5100/api/blogs";

interface Blog {
  _id: string;
  title: string;
  description: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  slug: string;
  createdAt: string;
}

async function getBlogBySlug(slug: string): Promise<Blog | null> {
  try {
    const res = await fetch(
      `${API_BASE}/get-blog-by-slug/${slug}`,
      { next: { revalidate: 60 } }
    );

    if (!res.ok) return null;

    const data = await res.json();
    return data.blog || data.data || data || null;
  } catch (err) {
    return null;
  }
}

async function getAllBlogs(): Promise<Blog[]> {
  try {
    const res = await fetch(
      `${API_BASE}/get-all-blogs`,
      { next: { revalidate: 60 } }
    );

    const data = await res.json();
    return Array.isArray(data)
      ? data
      : data.blogs || data.data || [];
  } catch (err) {
    return [];
  }
}

// ── SEO Metadata ─────────────────────────────
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const blog = await getBlogBySlug(params.slug);

  if (!blog) {
    return {
      title: "Blog Not Found | Kiwi Connect Digital",
    };
  }

  // ✅ SAFE TEXT (no crash)
  const sourceText = blog.excerpt || blog.content || "";
  const plainText = sourceText
    .replace(/<[^>]+>/g, "")
    .slice(0, 160);

  const photoUrl = `${API_BASE}/get-blog-photo/${blog._id}`;

  return {
    title: `${blog.title} | Kiwi Connect Digital`,
    description: plainText || blog.title,

    openGraph: {
      title: blog.title,
      description: plainText || blog.title,
      images: [
        {
          url: photoUrl,
          width: 1200,
          height: 630,
          alt: blog.title,
        },
      ],
      type: "article",
      publishedTime: blog.createdAt,
      authors: [blog.author],
      tags: [blog.category],
    },

    twitter: {
      card: "summary_large_image",
      title: blog.title,
      description: plainText || blog.title,
      images: [photoUrl],
    },

    alternates: {
      canonical: `/blog/${blog.slug}`,
    },
  };
}

// ── Static Params (optional SEO boost) ───────
export async function generateStaticParams() {
  const blogs = await getAllBlogs();

  return blogs.map((b) => ({
    slug: b.slug,
  }));
}

// ── Page ─────────────────────────────────────
export default async function BlogPage({
  params,
}: {
  params: { slug: string };
}) {
  const [blog, allBlogs] = await Promise.all([
    getBlogBySlug(params.slug),
    getAllBlogs(),
  ]);

  if (!blog) return notFound();

  const related = allBlogs
    .filter(
      (b) =>
        b._id !== blog._id &&
        b.category === blog.category
    )
    .slice(0, 3);

  return (
    <BlogReader
      blog={blog}
      related={related}
      apiBase={API_BASE}
    />
  );
}