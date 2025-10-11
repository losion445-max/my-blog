import { Post } from "@prisma/client";

export default async function PostPage() {
	const posts = getPosts();

	return (
		<div>
			<h1></h1>
			<div>
       {(await posts).map((post) => (
          <div key={post.id} className="border p-4 rounded">
            <h2 className="text-xl font-semibold">{post.title}</h2>
            <p className="text-gray-600">{post.content.substring(0, 100)}...</p>
            <span className="text-sm text-gray-500">
              {post.published ? '✅ Опубликован' : '📝 Черновик'}
            </span>
          </div>
        ))}
			</div>
		</div>
	)
}

async function getPosts() {
	const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/posts`, {
    cache: 'no-store',
  });
		return response.json() as Promise<Post[]>;
}