"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export interface PostData {
  title: string;
  content: string;
  published: boolean;
}

export interface PostFormProps {
  mode: "create" | "edit";
  postId?: string;
  initialData?: PostData;
  onSuccess?: () => void;
}

export default function PostForm(props: PostFormProps) {
  const { mode, postId, initialData, onSuccess } = props;

  const router = useRouter();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [published, setPublished] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (mode == "edit" && initialData) {
      setTitle(initialData.title);
      setContent(initialData.content);
      setPublished(initialData.published);
    }
  }, [mode, initialData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsSubmitting(true);

    try {
      const url =
        mode == "edit"
          ? `${process.env.NEXT_PUBLIC_APP_URL}/api/posts/${postId}`
          : `${process.env.NEXT_PUBLIC_APP_URL}/api/posts`;
      const method = mode == "edit" ? "PUT" : "POST";

      const response = await fetch(url, {
        method: method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content, published }),
      });

      if (response.ok) {
        const newPost = await response.json();
        router.push(`${process.env.NEXT_PUBLIC_APP_URL}/posts/${newPost.id}`);
        toast.success(mode == "create" ? "Пост создан!" : "Пост обновлён");

        onSuccess?.();

        if (mode == "create") {
          setTitle("");
          setContent("");
          setPublished(false);
        }
      } else {
        toast.error("Ошибка");
      }
    } catch (err) {
      toast.error("КРИТИЧЕСКАЯ ОШИБКА СЕТИ");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-2xl mx-auto p-4 sm:p-6 space-y-6"
    >
      <div className="space-y-2">
        <Label htmlFor="title" className="text-base font-medium">
          Заголовок
        </Label>
        <Input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Заголовок"
          required
          className="text-base py-2.5 px-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="content" className="text-base font-medium">
          Содержание
        </Label>
        <Textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Текст поста"
          rows={8}
          required
          className="text-base py-2.5 px-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-h-[180px]"
        />
      </div>
      <div className="flex items-center space-x-3">
        <Input
          type="checkbox"
          id="published"
          checked={published}
          onChange={(e) => setPublished(e.target.checked)}
          className="h-5 w-5 rounded text-blue-600 focus:ring-blue-500"
        />
        <Label htmlFor="published" className="text-base">
          Опубликовать сразу
        </Label>
      </div>
      <div className="pt-2">
        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-3 text-base font-medium rounded-lg ml-auto border rounded-md border-blue-500/30 text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-blue-700 hover:scale-105 hover:bg-transparent transition-transform"
        >
          {isSubmitting
            ? "Сохранение..."
            : mode == "create"
              ? "Создать "
              : "Сохранить изменения"}
        </Button>
      </div>
    </form>
  );
}
