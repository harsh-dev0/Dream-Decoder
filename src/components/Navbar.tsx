import AuthButtons from "./AuthButtons"
import ThemeToggle from "./ThemeToggle"
import { Button } from "./ui/button"

const Navbar = () => {
  return (
    <nav className="w-full flex justify-between items-center p-4 border-b">
      <h1 className="text-2xl font-bold tracking-tight">Dream Decoder</h1>
      <div className="flex items-center gap-2">
        <ThemeToggle />
        {/* <Button variant="outline">Logout</Button> */}
        <AuthButtons />
      </div>
    </nav>
  )
}

export default Navbar
