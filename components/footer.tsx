// components/Footer.tsx
"use client";

import Link from "next/link";
import {
  FacebookIcon,
  TwitterIcon,
  InstagramIcon,
  Linkedin,
  Mail,
  Phone,
} from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 flex-shrink-0">
      <div className="container mx-auto px-2 sm:px-4 py-3 sm:py-6">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-6">
          {/* Company Info */}
          <div className="col-span-2 sm:col-span-1 space-y-2 sm:space-y-3">
            <div className="flex items-center space-x-2">
              <div className="h-5 w-5 sm:h-6 sm:w-6 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-xs">A</span>
              </div>
              <span className="font-bold text-sm sm:text-lg text-white">My AlgoFax</span>
            </div>
            <p className="text-xs hidden sm:block">
              Your trusted partner for algorithmic trading and investment management.
            </p>
            <div className="flex space-x-2 sm:space-x-3">
              <Link href="#" className="hover:text-white transition-colors">
                <FacebookIcon className="h-3 w-3 sm:h-4 sm:w-4" />
              </Link>
              <Link href="#" className="hover:text-white transition-colors">
                <TwitterIcon className="h-3 w-3 sm:h-4 sm:w-4" />
              </Link>
              <Link href="#" className="hover:text-white transition-colors">
                <InstagramIcon className="h-3 w-3 sm:h-4 sm:w-4" />
              </Link>
              <Link href="#" className="hover:text-white transition-colors">
                <Linkedin className="h-3 w-3 sm:h-4 sm:w-4" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-2 sm:space-y-3">
            <h3 className="font-semibold text-white text-xs sm:text-sm">Links</h3>
            <ul className="space-y-1 text-xs">
              <li>
                <Link href="/" className="hover:text-white transition-colors">Home</Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">Contact</Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-2 sm:space-y-3">
            <h3 className="font-semibold text-white text-xs sm:text-sm">Services</h3>
            <ul className="space-y-1 text-xs">
              <li>
                <Link href="#" className="hover:text-white transition-colors">Algo Trading</Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">Portfolio</Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-2 sm:space-y-3">
            <h3 className="font-semibold text-white text-xs sm:text-sm">Contact</h3>
            <div className="space-y-1 text-xs">
              <div className="flex items-center space-x-1 sm:space-x-2">
                <Mail className="h-2 w-2 sm:h-3 sm:w-3" />
                <span className="truncate">support@myalgofax.com</span>
              </div>
              <div className="flex items-center space-x-1 sm:space-x-2">
                <Phone className="h-2 w-2 sm:h-3 sm:w-3" />
                <span>+1 (555) 123-4567</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-3 sm:mt-4 pt-2 sm:pt-4 text-center">
          <p className="text-xs">© 2024 My AlgoFax. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
