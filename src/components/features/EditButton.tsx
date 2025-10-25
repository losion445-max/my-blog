import { Button } from "../ui/button";
import Link from "next/link";

export default function EditButton({ postId }: { postId: number }) {
  return (
    <Link href={`/posts/${postId}/edit`}>
      <Button className="ml-auto border rounded-md border-green-500/30 text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-500 to-green-700 hover:scale-105 hover:bg-transparent transition-transform">
        Редактировать
      </Button>
    </Link>
  );
}
