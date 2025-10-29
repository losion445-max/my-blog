"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "../ui/card";
import Link from "next/link";
import { Markdown } from "./Markdown";

interface Author {
    id: string;
    createdAt: Date;
    name: string | null;
    email: string | null;
    emailVerified: Date | null;
    image: string | null;
    updatedAt: Date;
}
export interface PostWithAuthor {
    id: number;
    title: string;
    content: string;
    published: boolean;
    createdAt: Date;
    authorId: string | null;
    author: Author | null
}

export default function PostCard({ post }: { post: PostWithAuthor }) {
  return (
    <Link className="block" href={`/posts/${post.id}`}>
      <Card className="hover:shadow-md hover:bg-accent/100 hover:-translate-y-0.5 transition-all duration-200">
        <CardHeader className="text-3xl">{post.title}</CardHeader>
        <CardContent className="fade-out-mask">
          <Markdown  content={post.content.substring(0, 1000)}/>
        </CardContent>
        <CardDescription className="text-1xl text-right text-sm w-full -ml-15 ">
          {"Автор" + " " + post.author?.name + " "}
          {new Date(post.createdAt).toLocaleDateString("ru-RU")} 
        </CardDescription>
      </Card>
    </Link>
  );
}
