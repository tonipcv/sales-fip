"use client";

import Image from "next/image";
import Link from "next/link";

export default function TesteSistema() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Logo */}
        <div className="flex justify-center mb-12">
          <Image
            src="/logo.jpg"
            alt="Logo"
            width={120}
            height={120}
            className="rounded-xl"
            priority
          />
        </div>

        {/* System Selection */}
        <div className="text-center">
          <h2 className="text-2xl md:text-3xl font-medium mb-8 bg-gradient-to-r from-white via-neutral-200 to-white bg-clip-text text-transparent">
            Qual seu sistema operacional?
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/teste-sistema/android"
              className="px-8 py-4 bg-green-600 hover:bg-green-500 rounded-xl text-white font-medium transition-all duration-200 transform hover:scale-105"
            >
              Android
            </Link>
            <Link
              href="/teste-sistema/iphone"
              className="px-8 py-4 bg-blue-600 hover:bg-blue-500 rounded-xl text-white font-medium transition-all duration-200 transform hover:scale-105"
            >
              iPhone
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 