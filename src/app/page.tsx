import { prisma } from '../../lib/prisma';

export const dynamic = "force-dynamic";


export default async function Home() {
  const posts = await prisma.post.findMany({
    where: {published: true},
    orderBy: {createdAt: "desc"}
  });


  return (
    <div className="p-8 max-w-2xl mx-auto">
    <h1>My blog</h1>
    {posts.map(post => (
      <article key={post.id}>
        <a href={`/posts/${post.id}`}>
          <h2 className="text-4xl font-bold mb-4">{post.title}</h2>
        </a>
        <p className="text-gray-600 mb-6">{post.content}</p>
        <small>{post.createdAt.toLocaleDateString()}</small>
      </article>
    ))}
    </div>
  );
}
