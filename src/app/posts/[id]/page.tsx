import { notFound } from "next/navigation";
import { DeleteButton } from "../../../components/DeleteButton";
import { auth } from "../../../../lib/auth";
import { getPostWithAuthor } from "../../../../lib/posts";
import EditButton from "../../../components/features/EditButton";
import { Markdown } from "@/components/features/Markdown";

export default async function PostPage({ params }: { params: { id: string } }) {
  const { id } = await params;
  const session = await auth();

  const post = await getPostWithAuthor(id);
  if (!post || !(session?.user?.id === post.authorId) && !post.published) {
    notFound();
  }

  return (
    <article className="max-w-4xl mx-auto px-4 w-full">
      <header className="text-4xl">
        <h1 className="text-4xl">{post.title}</h1>
      </header>
      <div className="mb-12 leading-relaxed"><Markdown content={post.content}/></div>
      <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-border">
        <div className="">
          <p>{post.author?.name}</p>
          <p className="text-sm text-muted-foreground">Автор</p>
        </div>
        <time className="text-sm text-muted-foreground whitespace-nowrap">
          {new Date(post.createdAt).toLocaleDateString("ru-RU")}
        </time>
        {session?.user?.id === post.author?.id && (
          <div>
            <DeleteButton postId={post.id} /> <EditButton postId={post.id} />
          </div>
        )}
      </div>
    </article>
  );
}
