import { User } from "next-auth";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "../ui/card";
import Link from "next/link";

export interface PostWithAuthor {
  id: number;
  title: string;
  content: string;
  createdAt: Date;
  
  author: Author | null;
}

interface Author {
  id: number;
  name: string | null;
  email: string | null;
  image: string | null;
}

export default function PostCard({ post }: { post: PostWithAuthor }) {
  return (
    <Link className="block" href={`/posts/${post.id}`}>
      <Card className="hover:shadow-md hover:bg-accent/100 hover:-translate-y-0.5 transition-all duration-200">
        <CardHeader className="text-3xl">{post.title}</CardHeader>
        <CardContent className="text-1xl">
          <h2>{post.content}</h2>
        </CardContent>
        <CardDescription className="text-1xl text-right text-sm w-full -ml-15">
          {"Автор" + " " + post.author?.name + " "}
          {new Date(post.createdAt).toLocaleDateString("ru-RU")} 
        </CardDescription>
      </Card>
    </Link>
  );
}
