import { prisma } from "../../../../lib/prisma";

import { notFound } from "next/navigation";

export default async function Post({params}: {params: {id: string}}) {
	const post = await prisma.post.findUnique({
		where: {id: parseInt(params.id)}
	});

	if (!post || !post.published) {
		notFound();
	}

	return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
      <p className="text-gray-600 mb-6">
        {post.createdAt.toLocaleDateString()}
      </p>
      <div className="prose">{post.content}</div>
    </div>
  );
}