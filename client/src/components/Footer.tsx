import { Facebook, Twitter, Instagram, Linkedin, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Link } from "wouter";

export default function Footer() {
  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Newsletter subscription");
  };

  return (
    <footer className="border-t border-border mt-20">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="font-semibold mb-4" data-testid="text-footer-newsletter">Newsletter</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Get the latest deals and product recommendations
            </p>
            <form onSubmit={handleSubscribe} className="flex gap-2">
              <Input
                type="email"
                placeholder="Enter your email"
                className="flex-1"
                data-testid="input-newsletter-email"
              />
              <Button type="submit" data-testid="button-subscribe">
                <Mail className="w-4 h-4" />
              </Button>
            </form>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" data-testid="link-footer-about">
                  <span className="text-sm text-muted-foreground hover:text-foreground cursor-pointer">
                    About Us
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/contact" data-testid="link-footer-contact">
                  <span className="text-sm text-muted-foreground hover:text-foreground cursor-pointer">
                    Contact
                  </span>
                </Link>
              </li>
              <li>
                <span className="text-sm text-muted-foreground hover:text-foreground cursor-pointer">
                  Careers
                </span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Help</h3>
            <ul className="space-y-2">
              <li>
                <span className="text-sm text-muted-foreground hover:text-foreground cursor-pointer">
                  FAQ
                </span>
              </li>
              <li>
                <span className="text-sm text-muted-foreground hover:text-foreground cursor-pointer">
                  Shipping
                </span>
              </li>
              <li>
                <span className="text-sm text-muted-foreground hover:text-foreground cursor-pointer">
                  Returns
                </span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <span className="text-sm text-muted-foreground hover:text-foreground cursor-pointer">
                  Privacy Policy
                </span>
              </li>
              <li>
                <span className="text-sm text-muted-foreground hover:text-foreground cursor-pointer">
                  Terms of Service
                </span>
              </li>
              <li>
                <span className="text-sm text-muted-foreground hover:text-foreground cursor-pointer">
                  Cookie Policy
                </span>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground" data-testid="text-copyright">
            © 2024 ShopAI. All rights reserved.
          </p>
          <div className="flex gap-2">
            <Button size="icon" variant="ghost" data-testid="button-social-facebook">
              <Facebook className="w-5 h-5" />
            </Button>
            <Button size="icon" variant="ghost" data-testid="button-social-twitter">
              <Twitter className="w-5 h-5" />
            </Button>
            <Button size="icon" variant="ghost" data-testid="button-social-instagram">
              <Instagram className="w-5 h-5" />
            </Button>
            <Button size="icon" variant="ghost" data-testid="button-social-linkedin">
              <Linkedin className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
}
