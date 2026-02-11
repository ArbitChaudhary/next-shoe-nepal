"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ShoppingBag, Menu, X } from "lucide-react";
// import { useCart } from "@/context/CartContext";
import { useState } from "react";
import Link from "next/link";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "Shop", path: "/shop" },
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" },
];

const Navbar = () => {
  const navRef = useRef<HTMLElement>(null);
  //   const { totalItems } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".nav-item", {
        y: -20,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out",
      });
    }, navRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <nav
        ref={navRef}
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-6 bg-background/80 backdrop-blur-lg border-b border-border/50"
      >
        <Link href="/" className="nav-item">
          <h1 className="text-2xl md:text-3xl font-display tracking-wider text-gradient">
            STRIDE
          </h1>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.path}
              className="nav-item text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-300 uppercase tracking-wide"
            >
              {link.name}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <Link
            href="/cart"
            className="nav-item relative p-2 hover:bg-secondary rounded-full transition-colors"
          >
            <ShoppingBag className="w-5 h-5" />
            {/* {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-primary rounded-full text-xs font-bold flex items-center justify-center text-primary-foreground">
                {totalItems}
              </span>
            )} */}
          </Link>
          <button
            className="nav-item md:hidden p-2 hover:bg-secondary rounded-full transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-background/95 backdrop-blur-lg pt-24 px-6 md:hidden">
          <div className="flex flex-col gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className="text-3xl font-display tracking-wide hover:text-primary transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
