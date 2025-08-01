// components/FooterAfterLogin.tsx
"use client";

import Link from "next/link";
import { Mail, Phone } from "lucide-react";

export function FooterAfterLogin() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-6 flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="text-sm text-center sm:text-left">
          <p className="font-semibold text-white">Logged in as: trader@myalgofax.com</p>
          <p className="text-xs mt-1">Need help? Contact support below.</p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3 text-xs">
          <div className="flex items-center gap-1">
            <Mail className="h-3 w-3" />
            <span>support@myalgofax.com</span>
          </div>
          <div className="flex items-center gap-1">
            <Phone className="h-3 w-3" />
            <span>+1 (555) 123-4567</span>
          </div>
          <Link href="/dashboard/settings" className="hover:text-white transition">
            Account Settings
          </Link>
        </div>
      </div>
    </footer>
  );
}
