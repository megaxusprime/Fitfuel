'use client'

import React, { useState } from 'react'
import Image from "next/image"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { ArrowLeft, Heart, MessageSquare, BookmarkIcon as BookmarkSimple, MoreHorizontal, ImageIcon } from 'lucide-react'
import Navbar from '@/components/ui/navbar'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

// Define the form schema
const formSchema = z.object({
  verificationcode: z.string().min(3, {
    message: "Verification code must be at least 4 characters.",
  }),
  newpassword: z.string().min(8, {
    message: "New password must be at least 8 characters.",
  }),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
})

export default function ForgotPassword() {
  // Initialize the form
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
        emailaddress: "",
        verificationcode: "",
        newpassword: "",
        confirmPassword: "",
    },
  })
// Handle form submission
function onSubmit(values) {
    console.log(values)
    // Here you would typically send the data to your backend
}
    return (
      <div className="min-h-screen flex flex-col md:w-full w-screen overflow-x-hidden">
        {/* Navigation */}
        <Navbar />
  
        {/* Main Content */}
          <div className="relative min-h-screen flex flex-col lg:flex-row items-center justify-between p-8 gap-8 bg-login">
            {/* Login Form */}
            <div className="w-full max-w-md md:p-8">
                <h2 className="text-4xl font-bold mb-6 text-white">Reset Password</h2>
                <form className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-2 text-white">Email address</label>
                        <Input 
                        type="email" 
                        placeholder="Enter your email address"
                        className="bg-white"
                    />
                    </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-white">Verification code</label>
                  <Input 
                    type="text" 
                    placeholder="Enter your verification code that we sent you"
                    className="bg-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-white">New Password</label>
                  <Input 
                    type="text" 
                    placeholder="Enter your new password"
                    className="bg-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-white">Confirm Password</label>
                  <Input 
                    type="password" 
                    placeholder="Confirm your password"
                    className="bg-white"
                  />
                </div>
                <div className="flex gap-4">
                  <Button type="submit" variant="outline" className="flex-1">Sign In</Button>
                </div>
              </form>
            </div>
  
            {/* Hero Content */}
          </div>
          <div className="md:p-16 p-8 flex md:flex-row flex-col items-center text-black">
            <div className='md:w-3/4 w-full'>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Fuel Your Fitness, Track Your Progress!
              </h1>
              <p className="text-lg mb-8">
                Fitfuel adalah platform yang membantu kamu mencapai tujuan kebugaran dengan mudah. Lacak asupan kalori, berat badan, dan aktivitas fisik secara efisien, serta terhubung dengan komunitas untuk motivasi. Dapatkan kontrol penuh atas perjalanan kesehatanmu bersama Fitfuel!
              </p>
            </div>
            <div className="relative md:w-1/2 w-4/5 h-80 mx-auto lg:mx-0">
              <Image
                src="/images/love_vegetables.svg"
                alt="Vegetable heart"
                fill
                className="object-contain"
              />
            </div>
          </div>
  
        {/* Footer */}
        <footer className="bg-black text-white py-4">
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
    )
  }