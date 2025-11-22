import { Moon, Sun, User, ShoppingBag, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "./ThemeProvider";
import { Link, useLocation } from "wouter";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [location] = useLocation();

  const isActive = (path: string) => location === path;

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-lg bg-background/80 border-b border-border">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          <Link href="/" data-testid="link-home">
            <div className="flex items-center gap-2 cursor-pointer hover-elevate active-elevate-2 px-3 py-2 rounded-md">
              <Sparkles className="w-6 h-6 text-primary" />
              <span className="text-xl font-bold">ShopAI</span>
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link href="/" data-testid="link-nav-home">
              <span
                className={`text-sm font-medium cursor-pointer hover-elevate active-elevate-2 px-3 py-2 rounded-md ${
                  isActive("/") ? "text-foreground" : "text-muted-foreground"
                }`}
              >
                Home
              </span>
            </Link>
            <Link href="/visualize" data-testid="link-nav-visualize">
              <span
                className={`text-sm font-medium cursor-pointer hover-elevate active-elevate-2 px-3 py-2 rounded-md ${
                  isActive("/visualize") ? "text-foreground" : "text-muted-foreground"
                }`}
              >
                Room Visualizer
              </span>
            </Link>
            <Link href="/about" data-testid="link-nav-about">
              <span
                className={`text-sm font-medium cursor-pointer hover-elevate active-elevate-2 px-3 py-2 rounded-md ${
                  isActive("/about") ? "text-foreground" : "text-muted-foreground"
                }`}
              >
                About
              </span>
            </Link>
            <Link href="/contact" data-testid="link-nav-contact">
              <span
                className={`text-sm font-medium cursor-pointer hover-elevate active-elevate-2 px-3 py-2 rounded-md ${
                  isActive("/contact") ? "text-foreground" : "text-muted-foreground"
                }`}
              >
                Contact
              </span>
            </Link>
          </div>

          <div className="flex items-center gap-2">
            <Button
              size="icon"
              variant="ghost"
              onClick={toggleTheme}
              data-testid="button-theme-toggle"
            >
              {theme === "light" ? (
                <Moon className="w-5 h-5" />
              ) : (
                <Sun className="w-5 h-5" />
              )}
            </Button>

            <Button
              size="icon"
              variant="ghost"
              data-testid="button-cart"
            >
              <ShoppingBag className="w-5 h-5" />
            </Button>

            <Button
              variant="default"
              className="hidden md:flex"
              data-testid="button-login"
            >
              <User className="w-4 h-4 mr-2" />
              Login
            </Button>

            <Avatar className="md:hidden w-8 h-8" data-testid="avatar-user">
              <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                U
              </AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>
    </nav>
  );
}
