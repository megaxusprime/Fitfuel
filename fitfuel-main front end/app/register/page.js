'use client'

import React from 'react'
import Image from "next/image"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
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
  username: z.string().min(3, {
    message: "Username must be at least 3 characters.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
})

export default function Register() {
  // Initialize the form
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
      confirmPassword: "",
    },
  })

  // Handle form submission
  function onSubmit(values) {
    console.log(values)
    // Here you would typically send the data to your backend
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation */}
      <Navbar />

      {/* Hero Section */}
      <section className="bg-green-400 text-center py-12">
        <h1 className="text-3xl font-bold mb-2">Join <span className="text-[#169F04]">FitFuel</span> Today!</h1>
        <p className="text-gray-800 mb-6">Create your account to start tracking your daily calorie intake.</p>
        <Input
          type="email"
          placeholder="Email"
          className="max-w-xs mx-auto mb-4 bg-white"
        />
        <Button className="bg-black hover:bg-black/90">Sign Up</Button>
      </section>

      {/* Main Content */}
      <div className="flex-1 grid md:grid-cols-2">
        {/* Left Side - Image */}
        <div className="relative h-[400px] md:h-full">
          <Image
            src="/images/register_illustration.svg"
            alt="Healthy Food Plate"
            fill
            className="object-cover"
          />
        </div>

        {/* Right Side - Register Form */}
        <div className="p-8 flex flex-col justify-center max-w-md mx-auto w-full">
          <h2 className="text-2xl font-bold mb-6">Register</h2>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your username" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="Enter your password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="Confirm your password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full bg-black hover:bg-black/90">
                Sign Up
              </Button>
            </form>
          </Form>
        </div>
      </div>

      {/* Welcome Section */}
      <section className="bg-green-400 py-12">
        <div className="container mx-auto md:px-12 flex items-center md:justify-start justify-center md:flex-row flex-col gap-6">
          <div className="bg-[#D9D9D9] rounded-full p-4">
            <Image src="/images/person.svg" width={80} height={80} alt="logo" />
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-2 flex md:justify-start justify-center">Welcome to FitFuel!</h2>
            <div className="flex gap-2 mb-2 md:justify-start justify-center">
              <span className="text-sm bg-[#D9D9D9] px-2 py-1 rounded">Healthy Living</span>
              <span className="text-sm bg-[#D9D9D9] px-2 py-1 rounded">Fitness Goals</span>
            </div>
            <p className="text-gray-800 flex md:justify-start justify-center">Start your journey to a healthier you.</p>
          </div>
        </div>
      </section>

      {/* Sign In Section */}
      <section className="py-12 text-center">
        <h2 className="text-2xl font-bold mb-1">Already have an account?</h2>
        <p className="text-2xl font-bold mb-4">Sign here!</p>
        <Button variant="outline" className="bg-black text-white hover:bg-black/90">
          Sign in
        </Button>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-6">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <p className="text-sm">© 2024 FitFuel. Seluruh hak cipta dilindungi undang-undang.</p>
          <div className="flex items-center gap-2">
            <span className="text-sm md:flex hidden">Indonesia</span>
            <Image
              src="/images/indonesia.svg"
              alt="Indonesia flag"
              width={50}
              height={50}
            />
          </div>
        </div>
      </footer>
    </div>
  )
}

