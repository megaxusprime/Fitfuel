'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation' // Gunakan routing untuk navigasi
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Navbar from '@/components/ui/navbar'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const router = useRouter() // Router untuk redirect setelah login berhasil

  const handleLogin = async (e) => {
    e.preventDefault()

    // Validasi input kosong
    if (!email || !password) {
      setError('Email and password are required')
      return
    }

    try {
      const response = await fetch('http://localhost:8080/api/pengguna/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })

      if (response.ok) {
        const data = await response.json()
        console.log('Login successful:', data) // Debug token atau respons
        router.push('/dashboard') // Redirect ke halaman dashboard
      } else {
        const errorData = await response.json()
        console.error('Login failed:', errorData) // Debug error
        setError(errorData.message || 'Login failed')
      }
    } catch (error) {
      console.error('Error during login:', error) // Debug error jaringan
      setError('An error occurred while logging in')
    }
  }

  return (
    <div className="min-h-screen flex flex-col md:w-full w-screen overflow-x-hidden">
      {/* Navigation */}
      <Navbar />

      {/* Main Content */}
      <div className="relative min-h-screen flex flex-col lg:flex-row items-center justify-between p-8 gap-8 bg-login">
        {/* Login Form */}
        <div className="w-full max-w-md md:p-8">
          <h2 className="text-4xl font-bold mb-6 text-white">Log In</h2>
          <p className="text-white mb-6">Enter your credentials to access your account</p>
          <form className="space-y-4" onSubmit={handleLogin}>
            <div>
              <label className="block text-sm font-medium mb-2 text-white">Email</label>
              <Input 
                type="email" 
                placeholder="Enter your email"
                className="bg-white"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-white">Password</label>
              <Input 
                type="password" 
                placeholder="Enter your password"
                className="bg-white"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            <div className="flex gap-4">
              <Button variant="outline" className="flex-1" type="submit">Sign In</Button>
              <Button variant="outline" className="flex-1">Sign Up</Button>
            </div>
            <div className="flex justify-between items-center">
              <Link href="/forgot-password" className="text-sm text-blue-500 hover:underline">
                Forgot your password?
              </Link>
            </div>
          </form>
        </div>

        {/* Hero Content */}
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
