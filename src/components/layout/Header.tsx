"use client";

import { useSession } from "next-auth/react";
import LoginButton from "../loginButton";
import Link from "next/link";
import MainMenu from "./MainMenu";
import { FilePlus } from "lucide-react";
import { Button } from "../ui/button";

export default function Header() {
  const { data: session, status } = useSession();
  const isLoading = status === "loading";

  return (
    <header className="w-full h-16 flex items-center px-4 border gap-6">
      <Link  href={"/"}>
        <h1 className="inline text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-600">
          My-blog
        </h1>
      </Link>
        {status === "authenticated" && (<Link href={"/posts/create"}>
        <Button
         className="mr-auto border rounded-md border-green-500/30 text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-500 to-green-700 hover:scale-105 hover:bg-transparent transition-transform">
          <FilePlus className="inline text-green-600  "></FilePlus>Создать </Button>
        </Link>)}
      {isLoading ? (
        <div className="h-6 w-16 bg-transparent" />
      ) : status === "authenticated" ? (<MainMenu user={session.user}/>) : (
        <LoginButton/>
      )}
    </header>
  );
}
