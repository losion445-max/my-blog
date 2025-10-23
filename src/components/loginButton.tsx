"use client"

import { signIn } from "next-auth/react";


export default function LoginButton() {
	return (
		<button
		 onClick={async () => {
			signIn("google")}
		}
		 className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition">
			Войти через гугл
		</button>
	)
}