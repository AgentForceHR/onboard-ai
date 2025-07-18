import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b bg-background/80 backdrop-blur-md">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link to="/" className="flex items-center gap-2">
            <span className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              agentforcehr.com
            </span>
          </Link>
          <nav className="hidden md:flex gap-6">
            <Link to="/features" className="text-sm font-medium hover:text-primary transition-colors">
              Features
            </Link>
            <Link to="/#hr-token" className="text-sm font-medium hover:text-primary transition-colors">
              HR Token
            </Link>
            <Link to="/employee" className="text-sm font-medium hover:text-primary transition-colors">
              Employee Dashboard
            </Link>
            <Link to="/about" className="text-sm font-medium hover:text-primary transition-colors">
              About
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" asChild>
            <Link to="/login">Log in</Link>
          </Button>
          <Button variant="default" size="sm" asChild>
            <Link to="/admin">Admin Dashboard</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}