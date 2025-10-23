import { NextRequest } from "next/server";
import { prisma } from "../../../../lib/prisma";
import { withCors } from "./[id]/route";
import { auth } from "../../../../lib/auth";

export async function GET() {

	try {
	const posts = await prisma.post.findMany({
		orderBy: {createdAt: "desc"},
		where: {published: true}
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
	const session = await auth();

	if (!session?.user?.id) {
		return new Response("Unathorized", { status: 401 });
	}

	try {
	const {title, content, published = false} = await request.json();
	if (!title || !content) {
		return withCors(Response.json({
			error: "Title or content required",
			status: 400
		}));
	}

	const post = await prisma.post.create({
		data: 
			{ title,
		  	  content,
		 	  published, 
			  author: { connect: { id: session.user.id } }
			},
		});
	return withCors (Response.json(
		post, { status: 201 }
	));
	} catch (error) {
		return withCors(Response.json({
			error: error,
			status: 500
		}));
	}
}

