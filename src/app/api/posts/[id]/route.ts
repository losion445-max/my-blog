import { prisma } from "../../../../../lib/prisma";

import { NextRequest } from "next/server";

export async function GET(
	request: NextRequest,
	{ params }: { params: Promise<{ id: string }> }
) {
	const { id } = await params;

	// check if is valid
	const post = await prisma.post.findFirst(
		{
			where: {id: parseInt(id)}
		},
	);

	if (!post) {
		return Response.json(
			{   error: "Not found",
				status: 404
			});
	}

	return Response.json(post);
}

export async function PUT(
	request: NextRequest,
{ params }: { params: Promise<{ id: string }> }
) {
	const { id } = await  params;
	const { title, content, published } = await request.json();
	
	const updatePost = await prisma.post.update({
		where: {id: parseInt(id)},
		data: {title, content, published}
	});
	return Response.json(updatePost);
}

export async function DELETE(
	request: NextRequest,
	{ params }: { params: Promise<{ id: string }> }
) {
	const { id } = await params;

	await prisma.post.delete({
		where: {id: parseInt(id)}
	});

	return Response.json({
		message: "Post deleted"
	});
}