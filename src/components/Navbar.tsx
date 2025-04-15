import Link from "next/link"
import ThemeToggle from "./ThemeToggle"
import { Github } from "lucide-react"
import { Button } from "./ui/button"
import Image from "next/image"

const Navbar = () => {
  return (
    <nav className="w-full flex justify-between items-center p-4 border-b">
      <div className="relative h-8 w-8 sm:h-10 sm:w-10">
        <Image
          src="/logo.png"
          alt="Dream Decoder Logo"
          fill
          className="object-contain"
          priority
        />
      </div>
      <h1 className="text-2xl font-bold tracking-tight">Dream Decoder</h1>
      <div className="flex items-center gap-2">
        <ThemeToggle />
        <Button
          asChild
          variant="outline"
          className="flex items-center gap-2"
        >
          <Link
            href="https://github.com/harsh-dev0/dream-decoder"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Github className="w-4 h-4" />
          </Link>
        </Button>
      </div>
    </nav>
  )
}

export default Navbar
