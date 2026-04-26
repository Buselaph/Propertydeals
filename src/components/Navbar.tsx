"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, Home, ChevronDown, LogOut, User } from "lucide-react";
import { signOut } from "@/app/actions/auth";

type NavUser = { name: string; email: string } | null;

const links = [
  { href: "/properties?type=sale", label: "Buy" },
  { href: "/properties?type=rent", label: "Rent" },
  { href: "/agents", label: "Agents" },
  { href: "/calculator", label: "Calculator" },
  { href: "/pricing", label: "Pricing" },
  { href: "/contact", label: "Contact" },
];

function Avatar({ name }: { name: string }) {
  const initials = name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
  return (
    <div className="w-8 h-8 rounded-full bg-amber-500 flex items-center justify-center text-white text-xs font-bold shrink-0">
      {initials || <User className="w-4 h-4" />}
    </div>
  );
}

function UserMenu({ user }: { user: NavUser }) {
  const [open, setOpen] = useState(false);

  if (!user) {
    return (
      <div className="hidden md:flex items-center gap-3">
        <Link href="/login" className="text-sm font-medium text-slate-600 hover:text-slate-900 px-3 py-2 rounded-lg hover:bg-slate-100 transition-all">
          Sign In
        </Link>
        <Link href="/list-property" className="text-sm font-semibold bg-amber-500 hover:bg-amber-400 text-white px-4 py-2 rounded-lg transition-all shadow-sm">
          List Property
        </Link>
      </div>
    );
  }

  return (
    <div className="hidden md:flex items-center gap-3 relative">
      <Link href="/list-property" className="text-sm font-semibold bg-amber-500 hover:bg-amber-400 text-white px-4 py-2 rounded-lg transition-all shadow-sm">
        List Property
      </Link>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-2 py-1.5 rounded-xl hover:bg-slate-100 transition-all"
      >
        <Avatar name={user.name} />
        <span className="text-sm font-medium text-slate-700 max-w-[120px] truncate">{user.name.split(" ")[0]}</span>
        <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-100 z-50 py-2 overflow-hidden">
            <div className="px-4 py-3 border-b border-slate-100">
              <p className="text-sm font-semibold text-slate-900 truncate">{user.name}</p>
              <p className="text-xs text-slate-400 truncate">{user.email}</p>
            </div>
            <Link href="/dashboard" onClick={() => setOpen(false)} className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 transition-colors">
              <User className="w-4 h-4 text-slate-400" /> My Dashboard
            </Link>
            <form action={signOut}>
              <button type="submit" className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-colors">
                <LogOut className="w-4 h-4" /> Sign Out
              </button>
            </form>
          </div>
        </>
      )}
    </div>
  );
}

export default function Navbar({ user }: { user: NavUser }) {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center shadow-md">
              <Home className="w-4 h-4 text-white" />
            </div>
            <div className="leading-none">
              <span className="text-slate-900 font-bold text-base tracking-tight">PROPERTY</span>
              <span className="text-amber-500 font-bold text-base tracking-tight ml-1">DEALS</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {links.map((l) => (
              <Link key={l.href} href={l.href} className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-all">
                {l.label}
              </Link>
            ))}
          </nav>

          <UserMenu user={user} />

          {/* Mobile Menu Button */}
          <button className="md:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100 transition-all" onClick={() => setOpen(!open)}>
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden border-t border-slate-200 bg-white">
          <div className="px-4 py-3 space-y-1">
            {links.map((l) => (
              <Link key={l.href} href={l.href} onClick={() => setOpen(false)} className="block px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-100 rounded-lg">
                {l.label}
              </Link>
            ))}
            <div className="pt-2 border-t border-slate-100 mt-2 flex flex-col gap-2">
              {user ? (
                <>
                  <div className="flex items-center gap-2 px-3 py-2">
                    <Avatar name={user.name} />
                    <span className="text-sm font-medium text-slate-700 truncate">{user.name}</span>
                  </div>
                  <form action={signOut}>
                    <button type="submit" className="w-full flex items-center gap-2 px-3 py-2.5 text-sm font-medium text-red-500 hover:bg-red-50 rounded-lg">
                      <LogOut className="w-4 h-4" /> Sign Out
                    </button>
                  </form>
                </>
              ) : (
                <>
                  <Link href="/login" onClick={() => setOpen(false)} className="block px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-100 rounded-lg">
                    Sign In
                  </Link>
                  <Link href="/signup" onClick={() => setOpen(false)} className="block px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-100 rounded-lg">
                    Create Account
                  </Link>
                </>
              )}
              <Link href="/list-property" onClick={() => setOpen(false)} className="block px-3 py-2.5 text-sm font-semibold bg-amber-500 text-white rounded-lg text-center">
                List Property
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
