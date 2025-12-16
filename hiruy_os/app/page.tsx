import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Link from "next/link";

const BLOG_DIR = path.join(process.cwd(), "content/blog");

export default function BlogPage() {
  const files = fs.readdirSync(BLOG_DIR);

  const posts = files.map((filename) => {
    const filePath = path.join(BLOG_DIR, filename);
    const fileContents = fs.readFileSync(filePath, "utf8");

    const { data } = matter(fileContents);

    return {
      slug: filename.replace(".md", ""),
      title: data.title,
      date: data.date,
    };
  });

  posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <main className="mx-auto max-w-2xl px-6 py-12">
      <h1 className="mb-8 text-3xl font-semibold">Blog</h1>

      <ul className="space-y-4">
        {posts.map((post) => (
          <li key={post.slug}>
            <Link
              href={`/blog/${post.slug}`}
              className="block rounded-lg border border-neutral-800 p-4 hover:bg-neutral-900"
            >
              <h2 className="text-lg font-medium">{post.title}</h2>
              <p className="text-sm text-neutral-400">{post.date}</p>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
