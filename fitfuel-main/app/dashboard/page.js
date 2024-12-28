'use client'

import React from 'react'
import Image from "next/image"
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
            <Button variant="outline" className="bg-transparent hover:bg-white text-white hover:text-black w-full">Log Out</Button>
            <Button className="bg-black hover:bg-black/90 w-full">Edit Profile</Button>
          </div>
        </div>
      </section>

      <main className="container mx-auto py-8 px-8 space-y-12">
        {/* Add Food Form */}
        <section>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
                <h2 className="text-2xl font-bold mb-6">Add Food to Diary</h2>
                <p className="text-gray-600 mb-6">Enter the details of the food you consumed today</p>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Food Name</label>
                <Input type="text" placeholder="E.g. Chicken Salad" />
                <p className="text-xs text-gray-500 mt-1">Enter the name of the food</p>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Calories</label>
                <Input type="number" placeholder="E.g. 300" />
                <p className="text-xs text-gray-500 mt-1">Enter the number of calories</p>
              </div>
              <div className="flex gap-4">
                <Button variant="outline" className="flex-1">Clear</Button>
                <Button className="flex-1 bg-black hover:bg-black/90">Add Food</Button>
              </div>
            </div>
          </div>
        </section>

        {/* Recommended Foods */}
        <section>
          <div className="flex md:flex-row flex-col-reverse justify-between md:items-center mb-6">
            <div>
              <h2 className="text-2xl font-bold">Recommended Foods</h2>
              <p className="text-gray-600 mt-4">Explore healthy food options to meet your daily calorie goals.</p>
              <div className="flex gap-4 w-full mt-4">
                <Button variant="outline" className="w-full">Add to Diary</Button>
                <Button className="bg-black hover:bg-black/90 w-full">View All</Button>
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
                image: '/images/apple.svg'
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

        {/* Calorie Summary */}
        <section>
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold">Calorie Intake Summary</h2>
            <p className="text-gray-600 mt-2">Monitor your daily calorie intake and stay within your target range.</p>
            <Button className="mt-4 md:w-[15%]">View Trends</Button>
          </div>

          <div className="h-[300px] mb-8">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <XAxis dataKey="date" />
                <YAxis />
                <Area type="monotone" dataKey="value" stroke="#000" fill="#4ade80" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="flex justify-between items-center gap-4 md:flex-row flex-col">
            <div className="border border-solid border-gray-300 rounded-md shadow-md p-4 w-full">
              <p className="text-sm text-gray-600">Calories Consumed</p>
              <p className="text-3xl font-bold">1,200</p>
              <p className="text-sm text-green-500">+200 from yesterday</p>
            </div>
            <div className="border border-solid border-gray-300 rounded-md shadow-md p-4 w-full">
              <p className="text-sm text-gray-600">Calories Burned</p>
              <p className="text-3xl font-bold">800</p>
              <p className="text-sm text-red-500">-100 from yesterday</p>
            </div>
          </div>
        </section>

        {/* User Reviews */}
        <section>
          <div className="flex md:flex-row flex-col items-center gap-4">
            <Image src="/images/reviews.svg" width={500} height={400} alt='review' />
            <div>
              <div className="flex flex-col gap-4 mb-6">
                <h2 className="text-2xl font-bold">User Reviews</h2>
                <p className="text-gray-600">See what others are saying about using FitFuel to track their calorie intake.</p>
                <div className="flex gap-4">
                  <Button variant="outline" className="md:w-1/4">Read More</Button>
                  <Button className="bg-black hover:bg-black/90 md:w-1/4">Write Review</Button>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {[
                  {
                    name: 'Rakha',
                    rating: 5,
                    comment: 'Great app for managing my diet and staying healthy!'
                  },
                  {
                    name: 'Uli',
                    rating: 5,
                    comment: 'Easy to use and helpful for tracking my daily meals.'
                  }
                ].map((review, index) => (
                  <Card key={index}>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-4 mb-4">
                        <Avatar>
                          <AvatarImage src="/placeholder.svg?height=40&width=40" alt={review.name} width={40} height={40} />
                          <AvatarFallback></AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-semibold">{review.name}</p>
                          <div className="flex">
                            {[...Array(review.rating)].map((_, i) => (
                              <span key={i} className="text-yellow-400">★</span>
                            ))}
                          </div>
                        </div>
                      </div>
                      <p className="text-gray-600">{review.comment}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
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

