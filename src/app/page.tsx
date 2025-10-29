import PostCard from "../components/features/PostCard";
import { getPublishedPosts, getPublishedPostsWithAuthors } from "../../lib/posts";
import { PostWithAuthor } from "../components/features/PostCard";

export const dynamic = "force-dynamic";

// todo include sesion to header
export default async function Home() {
  const posts = await getPublishedPostsWithAuthors();

  return (
    <div className="space-y-6">
      {posts.map((post, i) => (
        <PostCard key={i} post={post as PostWithAuthor} />
      ))} 
    </div>
  );
}
