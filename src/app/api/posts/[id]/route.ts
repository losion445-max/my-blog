import { prisma } from "../../../../../lib/prisma";
import { auth } from "../../../../../lib/auth";
import { NextRequest } from "next/server";

export async function GET(
	request: NextRequest,
	{ params }: { params: Promise<{ id: string }> }
) {
	const session = await auth();

	const { id } = await params;

	// check if is valid
	const post = await prisma.post.findFirst(
		{
			where: {id: parseInt(id)}
		},
	);

	if (!post) {
		return withCors(Response.json(
			{   error: "Not found",
				status: 404
			}));
	}

	if (!post.published && post.authorId !== session?.user?.id) {
		return new Response("Not found", {status: 404});
	}
	return withCors(Response.json(post));
}

export async function PUT(
	request: NextRequest,
{ params }: { params: Promise<{ id: string }> }
) {
	const session = await auth();
	if (!session?.user?.id) {
		return new Response("Unathorised", { status: 401 });
	}
	const { id } = await  params;
	const { title, content, published } = await request.json();

	const post = await prisma.post.findUnique({
		where: { id: parseInt(id)},
		select: { authorId: true}
	});
	if (post?.authorId !== session.user.id) {
		return new Response("Forbriden", { status: 401});
	}
	const updatePost = await prisma.post.update({
		where: {id: parseInt(id)},
		data: {title, content, published}
	});
	return withCors(Response.json(updatePost));
}

export async function DELETE(
	request: NextRequest,
	{ params }: { params: Promise<{ id: string }> }
) {
	const session = await auth();
	const { id } = await params;
	
	const post = await prisma.post.findUnique({
		where: { id: parseInt(id)},
		select: { authorId: true}
	});

	if (post?.authorId !== session?.user?.id) {
		return new Response("Forbriden", { status: 401});
	}
		
	await prisma.post.delete({
		where: {id: parseInt(id)}
	});

	return withCors(Response.json({
		message: "Post deleted"
	}));
}


export function withCors(response: Response): Response {
  const headers = new Headers(response.headers);
  headers.set("Access-Control-Allow-Origin", "*"); // или укажите ваш фронтенд: "https://your-site.com"
  headers.set("Access-Control-Allow-Methods", "GET, PUT, DELETE, OPTIONS");
  headers.set("Access-Control-Allow-Headers", "Content-Type");

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}

export async function OPTIONS() {
  return withCors(new Response(null, { status: 204 }));
}
