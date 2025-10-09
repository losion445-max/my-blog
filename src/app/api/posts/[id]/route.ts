import { prisma } from "../../../../../lib/prisma";

import { NextRequest } from "next/server";

export async function GET(
	request: NextRequest,
	{ params }: { params: { id: string }}
) {
	const { id } = params;

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
}

export async function PUT(
	request: NextRequest,
	{ params }: { params: { id: string }} 
) {
	const { id } = params;
	const { title, content, published } = await request.json();
	
	const updatePost = await prisma.post.update({
		where: {id: parseInt(id)},
		ize: {title, content, published}
	});
}