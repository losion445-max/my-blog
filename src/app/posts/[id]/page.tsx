import { Post } from "@prisma/client";
import { notFound } from "next/navigation";
import { DeleteButton } from "./DeleteButton";
export default async function PostPage(
  { params }: { params: { id: string } }
) {
  const post = await getPost({ params });

	if (!post || !post.published) {
		notFound();
	}

	return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
      <p className="text-gray-600 mb-6">
        {new Date(post.createdAt).toLocaleDateString('ru-RU')}
      </p>
      <div className="prose">{post.content}</div>
      <DeleteButton postId={post.id}/>
    </div>
  );
}


async function getPost({params}: {params: {id: string}}) {
  const { id } = await params;
  const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/posts/${id}`, {
    cache: 'no-store',});
    return await response.json() as Promise<Post>;
}