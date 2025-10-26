import { prisma } from "./prisma";

export async function getPostWithAuthor(postId: string) {
  // @ts-ignore
  return await prisma.post.findUnique({
    where: { id: parseInt(postId) },
    include: { author: true },  
  });
}

export async function getPublishedPostsWithAuthors() {
  return await prisma.post.findMany({
    where: {published: true},
    include: { author: true },  
  });
}

export async function getPostsByUserId(userId: string | undefined) {
  return await prisma.post.findMany({
    where: {
      authorId: userId,
    },
    include: { author: true },  
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function getPublishedPosts() {
  return await prisma.post.findMany({
    where: {
      published: true
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}


