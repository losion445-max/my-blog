import { NextRequest } from "next/server";
import { prisma } from "../../../../lib/prisma";

export async function GET() {
	try {
	const posts = await prisma.post.findMany({
		orderBy: {createdAt: "desc"},
	});

	return Response.json(posts);
	} catch (error) {
		return Response.json({
			error: error,
			status: 500
		});
	}
}

export async function POST(request: NextRequest) {
	try {
	const {title, content, published = false} = await request.json();
	if (!title || !content) {
		return Response.json({
			error: "Title or content required",
			status: 400
		});
	}

	const post = await prisma.post.create({
		data: 
			{ title,
		  	  content,
		 	  published },
			});
	return Response.json(
		post, { status: 201 }
	);
	} catch (error) {
		return Response.json({
			error: error,
			status: 500
		});
	}
}
