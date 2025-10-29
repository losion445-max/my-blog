import PostForm from "../../../../components/features/PostForm";
import { notFound } from "next/navigation";
import { getPostWithAuthor } from "../../../../../lib/posts";

const MODE = "edit";

export default async function Edit({ params }: { params: { id: string } }) {
  const post = await getPostWithAuthor(params.id);

  if (!post) {
    notFound();
  }

  return (
    <PostForm
      mode={MODE}
      postId={params.id}
      initialData={{
        title: post.title,
        content: post.content,
        published: post.published,
      }}
     
    ></PostForm>
  );
}
