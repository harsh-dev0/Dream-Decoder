"use client"

import { signIn, signOut, useSession } from "next-auth/react"
import { Button } from "@/components/ui/button"

export default function AuthButtons() {
  const { data: session } = useSession()

  if (session) {
    return (
      <>
        <p>Signed in as {session.user?.name}</p>
        <Button onClick={() => signOut()}>Sign out</Button>
      </>
    )
  }

  return (
    <Button onClick={() => signIn("twitter")}>Sign in with Twitter</Button>
  )
}
