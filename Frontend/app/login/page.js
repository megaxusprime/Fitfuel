'use client';

import React, { useState } from 'react';
import Image from "next/image";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Navbar from '@/components/ui/navbar';
import { useAuth } from '@/contexts/AuthContext'; // Import AuthContext untuk autentikasi global

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  const { login } = useAuth(); // Gunakan fungsi login dari AuthContext

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8080/api/pengguna/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Login successful:', data);

        // Simpan token di localStorage
        localStorage.setItem('token', data.token);

        // Update status login melalui AuthContext
        login();
        let token = localStorage.getItem('token');
        console.log(token);

        // Redirect ke halaman profil
        router.push(`/profile`);
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Login failed. Please try again.');
      }
    } catch (err) {
      setError('An error occurred. Please try again later.');
      console.error(err);
    }
  };

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
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="bg-white"
                    required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-white">Password</label>
                <Input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="bg-white"
                    required
                />
              </div>
              {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
              <div className="flex gap-4">
                <Button type="submit" variant="outline" className="flex-1">Sign In</Button>
              </div>
              <div className="flex justify-between items-center">
                <Link href="/forgot-password" className="text-sm text-blue-500 hover:underline">
                  Forgot your password?
                </Link>
              </div>
            </form>
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
  );
}
