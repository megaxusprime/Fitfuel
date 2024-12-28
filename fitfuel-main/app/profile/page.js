'use client'

import React from 'react'
import Image from "next/image"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Bell, ChevronLeft, Flag, Utensils } from 'lucide-react'
import Navbar from '@/components/ui/navbar'

export default function Settings() {
  return (
    <div className="min-h-screen flex flex-col max-w-screen overflow-hidden">
      {/* Navigation */}
      <Navbar />

      {/* User Header */}
            <header className="bg-green-400 p-4">
              <div className="container mx-auto flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <Avatar className="h-12 w-12">
                      <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                      <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <h1 className="text-xl font-semibold text-white">Hello, User!</h1>
                </div>
                <button className="text-white">
                  <Bell size={24} />
                </button>
              </div>
            </header>

      {/* Content */}
      <main className="flex-1 bg-gray-50 py-6 px-4">
        <div className="max-w-md mx-auto space-y-4">
          {/* Setting Items */}
          {[
            { label: "Jenis Akun", value: "Bebas" },
            { label: "Email", value: "alfriansyach@gmail.com" },
            { label: "Nama Anggota", value: "Publik (Terlihat di komunitas FatFuel)", subValue: "@alfriansyach" },
            { label: "Nama depan", value: "Pribadi (Hanya dilihat oleh anda)", subValue: "Alfi" },
          ].map((item, idx) => (
            <div
              key={idx}
              className="bg-green-400 text-white rounded-lg shadow p-4 flex justify-between items-center"
            >
              <div>
                <p className="font-semibold">{item.label}</p>
                <p className="text-sm opacity-80">{item.value}</p>
                {item.subValue && (
                  <p className="text-sm mt-1">{item.subValue}</p>
                )}
              </div>
              <Link href="#">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Link>
            </div>
          ))}

          {/* Delete Account */}
          <button className="bg-green-400 text-white rounded-lg shadow p-4 w-full">
            Hapus Akun
          </button>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-black text-white py-4 mt-auto">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <p className="text-sm">© 2024 FitFuel. Seluruh hak cipta dilindungi undang-undang.</p>
          <div className="flex items-center gap-2">
            <span className="text-sm">Indonesia</span>
            <Image
              src="/images/indonesia.svg"
              alt="Indonesia flag"
              width={24}
              height={24}
            />
          </div>
        </div>
      </footer>
    </div>
  );
}