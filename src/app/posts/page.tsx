import PostCard from "@/components/features/PostCard";
import { Post } from "@prisma/client";
import { auth } from "../../../lib/auth";
import { getPostsByUserId } from "../../../lib/posts";
import { notFound, redirect } from "next/navigation";

export default async function PostPage() {
  const session = await auth();

  if (!session) {
    notFound();
  }

  const posts = getPostsByUserId(session?.user?.id);

  return (
    <div className="space-y-6">
      {(await posts).map((post, i) => (
        <PostCard key={i} post={post}></PostCard>
      ))}
    </div>
  );
}
