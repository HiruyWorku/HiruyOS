import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Link from "next/link";

const BLOG_DIR = path.join(process.cwd(), "content/blog");

export default function BlogPage() {
  const files = fs.readdirSync(BLOG_DIR);
  
  const posts = files
    .filter(filename => filename.endsWith('.md'))
    .map(filename => {
      const slug = filename.replace('.md', '');
      const filePath = path.join(BLOG_DIR, filename);
      const fileContents = fs.readFileSync(filePath, "utf8");
      const { data } = matter(fileContents);
      
      return {
        slug,
        title: data.title,
        date: data.date,
      };
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <main className="mx-auto max-w-2xl px-6 py-12">
      <h1 className="mb-8 text-4xl font-bold">Blog Posts</h1>
      
      <div className="space-y-6">
        {posts.map(post => (
          <Link 
            key={post.slug} 
            href={`/blog/${post.slug}`}
            className="block p-4 hover:bg-neutral-800 rounded-lg transition"
          >
            <h2 className="text-2xl font-semibold mb-2">{post.title}</h2>
            <p className="text-sm text-neutral-400">{post.date}</p>
          </Link>
        ))}
      </div>
    </main>
  );
}
