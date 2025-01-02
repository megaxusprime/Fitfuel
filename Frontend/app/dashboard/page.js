'use client'

import React from 'react'
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"


// Import recharts for the graph
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer } from 'recharts'
import Navbar from '@/components/ui/navbar'

const data = [
  { date: '1', value: 1200 },
  { date: '2', value: 1100 },
  { date: '3', value: 800 },
  { date: '4', value: 1400 },
  { date: '5', value: 1600 },
  { date: '6', value: 1200 },
  { date: '7', value: 1300 },
]

export default function Dashboard() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation */}
      <Navbar />

      {/* User Welcome Section */}
      <section className="bg-green-400 md:p-16 p-8">
        <div className="container mx-auto flex justify-between md:items-center md:flex-row flex-col">
          <div className="flex items-center gap-4">
            <Avatar className="h-20 w-20">
                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-2xl font-bold text-white mb-1">Welcome, User!</h1>
              <div className="flex gap-2 mb-2">
                <Badge variant="secondary">Healthy Living</Badge>
                <Badge variant="secondary">Calorie Tracking</Badge>
              </div>
              <p className="text-white/90 text-sm">Track your daily calorie intake and stay on target with your health goals.</p>
            </div>
          </div>
          <div className="flex flex-col gap-2 md:mt-0 mt-6">
            <Link href="/logout">
              <Button variant="outline" className="bg-transparent hover:bg-white text-white hover:text-black w-full">Log Out</Button>
            </Link>
            <Link href="/profile">
              <Button className="bg-black hover:bg-black/90 w-full"><a href="/profile"> Edit Profile </a> </Button>
            </Link>
          </div>
        </div>
      </section>

      <main className="container mx-auto py-8 px-8 space-y-12">

        {/* Recommended Foods */}
        <section>
          <div className="flex md:flex-row flex-col-reverse justify-between md:items-center mb-6">
            <div>
              <h2 className="text-2xl font-bold">Recommended Foods</h2>
              <p className="text-gray-600 mt-4">Explore healthy food options to meet your daily calorie goals.</p>
              <div className="flex gap-4 w-full mt-4">
                <Link href="/calories-calculator">
                  <Button variant="outline" className="w-full">Add to Diary</Button>
                </Link>
                <Link href="/recommended-food" passHref>
                  <Button className="bg-black hover:bg-black/90 w-full">View All</Button>
                </Link>
              </div>
            </div>
            <Image src="/images/recommend_food.svg" width={180} height={180} alt="recommend_food" />
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                name: 'Mixed Green Salad',
                calories: 180,
                tag: 'Vegetarian',
                image: '/images/green_salad.svg'
              },
              {
                name: 'Whey Protein Shake',
                calories: 120,
                tag: 'Low Carb',
                image: '/images/protein_shake.svg'
              },
              {
                name: 'Apple',
                calories: 80,
                tag: 'Fiber Rich',
                image: '/images/apple.jpg'
              }
            ].map((food, index) => (
              <Card key={index}>
                <CardContent className="p-4">
                  <div className="relative h-64 mb-4">
                    <Image
                      src={food.image}
                      alt={food.name}
                      fill
                      className="object-cover rounded-md"
                    />
                  </div>
                  <Badge className="mb-2">{food.tag}</Badge>
                  <h3 className="font-semibold">{food.name}</h3>
                  <p className="text-sm text-gray-600">{food.calories} Calories</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
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
  )
}