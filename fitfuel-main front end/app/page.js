'use client'

import React from 'react'
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Navbar from '@/components/ui/navbar'

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation */}
      <Navbar />

      {/* Hero Section */}
      <section className="bg-green-400 text-center py-16">
        <h1 className="text-3xl font-bold text-white mb-4">Welcome to FitFuel</h1>
        <p className="text-white mb-8">Track and manage your daily calorie intake effortlessly</p>
        <Button variant="default" className="bg-black hover:bg-black/90">Get Started</Button>
      </section>

      {/* Popular Food Items */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto md:px-12 px-4">
          <h2 className="text-2xl font-bold text-center mb-12">Popular Food Items</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardContent className="p-4">
                <Image
                  src="/images/salmon_salad.svg"
                  alt="Salmon Salad"
                  width={300}
                  height={200}
                  className="rounded-lg mb-4"
                />
                <h3 className="font-semibold">Salmon Salad</h3>
                <p className="text-sm text-gray-600">Calories: 300</p>
                <Badge className="mt-2 rounded-xl">High Protein</Badge>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <Image
                  src="/images/avocado_toast.svg"
                  alt="Avocado Toast"
                  width={300}
                  height={200}
                  className="rounded-lg mb-4"
                />
                <h3 className="font-semibold">Avocado Toast</h3>
                <p className="text-sm text-gray-600">Calories: 250</p>
                <Badge className="mt-2 rounded-xl">Healty Fat</Badge>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <Image
                  src="/images/greek_yogurt.svg"
                  alt="Greek Yogurt Parfait"
                  width={300}
                  height={200}
                  className="rounded-lg mb-4"
                />
                <h3 className="font-semibold">Greek Yogurt Parfait</h3>
                <p className="text-sm text-gray-600">Calories: 200</p>
                <Badge className="mt-2 rounded-xl">Calcium Rich</Badge>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Daily Calorie Tracker */}
      <section className="py-16">
        <div className="container mx-auto md:px-12 px-4">
          <div className="flex items-center gap-4 mb-8">
            <div className="bg-green-100 p-3 rounded-full">
              <Image src="/images/logo.svg" width={100} height={100} alt="logo" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">Daily Calorie Tracker</h2>
              <p className="text-gray-600">Log your meals and monitor your calorie goals</p>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 grid-cols-1 gap-6">
            {['Breakfast', 'Lunch', 'Dinner'].map((meal) => (
              <div key={meal} className="flex items-center gap-4 p-4 border rounded-lg">
                <Image
                  src={`/images/${meal}.svg`}
                  alt={meal}
                  width={80}
                  height={80}
                  className="rounded-lg"
                />
                <div>
                  <h3 className="font-semibold">{meal}</h3>
                  <h3 className="font-normal">{meal === 'Breakfast' ? 'Oatmeal with fruits and a cup of coffee' : meal === 'Lunch' ? 'Grilled chicken with quinoa and veggies' : 'Salmon with sweet potato and kale salad'}</h3>
                  <Badge>Calories: {meal === 'Breakfast' ? '300' : meal === 'Lunch' ? '450' : '400'}</Badge>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto md:px-12 px-4">
          <h2 className="text-2xl font-bold text-center mb-4">User Testimonials</h2>
          <p className="text-center text-gray-600 mb-12">See what our users have to say</p>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: 'Jonathan',
                text: 'FitFuel helped me stay on track with my weight loss journey'
              },
              {
                name: 'Ali',
                text: 'Easy to use and informative for planning my meals'
              },
              {
                name: 'Anil',
                text: 'I love the variety of food options provided'
              }
            ].map((testimonial, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="h-8 w-8 bg-gray-200 rounded-full" />
                    <span className="font-semibold">{testimonial.name}</span>
                  </div>
                  <p className="text-gray-600">{testimonial.text}</p>
                  <div className="flex gap-1 mt-4">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-yellow-400">★</span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Sign Up Form */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-md">
          <h2 className="text-2xl font-bold text-center mb-4">Join FitFuel Today</h2>
          <p className="text-center text-gray-600 mb-8">Sign up to start tracking your calories</p>
          
          <form className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <Input type="email" placeholder="Enter your email" />
              <p className="text-xs text-gray-500 mt-1">We'll never share your email with anyone</p>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Password</label>
              <Input type="password" placeholder="Enter your password" />
              <p className="text-xs text-gray-500 mt-1">Minimum 8 characters</p>
            </div>

            <Button variant="outline" className="w-full">Log In</Button>
            <Button className="w-full bg-black hover:bg-black/90">Sign Up</Button>
          </form>
        </div>
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
