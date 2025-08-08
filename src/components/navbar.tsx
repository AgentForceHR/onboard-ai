
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

export function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b bg-background/80 backdrop-blur-md">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link to="/" className="flex items-center gap-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                <span className="text-white font-bold text-xs">HR</span>
              </div>
              <span className="text-2xl font-bold tracking-tight bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                AgentForceHR
              </span>
            </div>
          </Link>
          <nav className="hidden md:flex gap-6">
            <Link to="/features" className="text-sm font-medium hover:text-primary transition-colors">
              Features
            </Link>
            <Link to="/enterprise" className="text-sm font-medium hover:text-primary transition-colors">
              Enterprise
            </Link>
            <Link to="/#hr-token" className="text-sm font-medium hover:text-primary transition-colors">
              HR Token
            </Link>
            <Link to="/about" className="text-sm font-medium hover:text-primary transition-colors">
              About
            </Link>
            <Link to="/demo" className="text-sm font-medium hover:text-primary transition-colors">
              Demo
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <ThemeToggle />
          {isAuthenticated ? (
            <>
              <span className="text-sm text-muted-foreground">
                Welcome, {user?.firstName}
              </span>
              {user?.role === 'admin' || user?.role === 'hr' ? (
                <Button variant="default" size="sm" asChild className="bg-primary hover:bg-primary/80">
                  <Link to="/admin">Dashboard</Link>
                </Button>
              ) : (
                <Button variant="default" size="sm" asChild>
                  <Link to="/employee">My Portal</Link>
                </Button>
              )}
              <Button variant="ghost" size="sm" onClick={logout}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button variant="ghost" size="sm" asChild>
                <Link to="/login">Log in</Link>
              </Button>
              <Button variant="default" size="sm" asChild className="bg-primary hover:bg-primary/80">
                <Link to="/login">Get Started</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
