import { Post } from "@prisma/client";
import { auth } from "../../lib/auth";
import LoginButton from "@/components/loginButton";
export const dynamic = "force-dynamic";


export default async function Home() {
  const session = await auth();

  const posts = await getPosts();

  return (
    <div className="p-8 max-w-2xl mx-auto">
    <h1>My blog</h1>
    {!session && <LoginButton />}
    {posts.map(post => ( 
      post.published && (
      <article key={post.id}>
        <a href={`/posts/${post.id}`}>
          <h2 className="text-4xl font-bold mb-4">{post.title}</h2>
        </a>
        <p className="text-gray-600 mb-6">{post.content}</p>
        <small>{new Date(post.createdAt).toLocaleDateString('ru-RU')}</small>
        
      </article>
      )))
    }
    </div>
  );
}

async function getPosts() {
	const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/posts`, {
    cache: 'no-store',
  });
		return response.json() as Promise<Post[]>;
}