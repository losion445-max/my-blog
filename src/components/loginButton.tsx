"use client";

import { signIn } from "next-auth/react";
import { Button } from "./ui/button";

export default function LoginButton() {
  return (
    <Button
      onClick={async () => {
        signIn("google");
      }}
      className="ml-auto border rounded-md border-primary/30 text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-600"
    >
      Войти через гугл
    </Button>
  );
}
