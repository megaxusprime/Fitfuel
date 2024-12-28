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

// Circular Progress component
const CircularProgress = ({ value, size = 200, strokeWidth = 20, label, sublabel }) => {
  const radius = (size - strokeWidth) / 2
  const circumference = radius * 2 * Math.PI
  const offset = circumference - (value / 100) * circumference

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width={size} height={size} className="transform -rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="none"
          className="text-green-200"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="text-white transition-all duration-500 ease-in-out"
        />
      </svg>
      <div className="absolute text-center">
        <div className="text-2xl font-bold text-white">{label}</div>
        <div className="text-sm text-white/90">{sublabel}</div>
      </div>
    </div>
  )
}

// Nutrition Row component
const NutritionRow = ({ label, total, goal, unit = 'g' }) => {
  const percentage = (total / goal) * 100

  return (
    <div className="bg-white rounded-full p-4 mb-2">
      <div className="flex justify-between items-center mb-2">
        <span className="font-medium">{label}</span>
        <div className="flex gap-8">
          <span>{total}</span>
          <span>{goal}</span>
          <span>{goal - total}{unit}</span>
        </div>
      </div>
      <Progress value={percentage} className="h-1" />
    </div>
  )
}

export default function CaloriesCalculator() {
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

      {/* Main Content */}
      <main className="flex-1 bg-green-400">
        <div className="container mx-auto p-4">
          {/* Date Navigation */}
          <div className="flex items-center justify-center mb-6 text-white">
            <ChevronLeft size={24} />
            <h2 className="text-2xl font-bold">Today</h2>
          </div>

          {/* Calories Card */}
          <Card className="bg-green-500 p-6 mb-4">
            <h3 className="text-3xl font-bold text-white mb-4">Calories</h3>
            <div className="flex items-center justify-between md:flex-row flex-col gap-y-6">
              <CircularProgress 
                value={0} 
                label="2,800" 
                sublabel="Remaining" 
              />
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-white">
                  <Flag size={24} />
                  <div>
                    <div className="font-semibold">Base Goal</div>
                    <div>2,800</div>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-white">
                  <Utensils size={24} />
                  <div>
                    <div className="font-semibold">Food</div>
                    <div>0</div>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Nutrition Card */}
          <Card className="bg-green-500 p-6 mb-4">
            <h3 className="text-3xl font-bold text-white mb-4">Nutrition</h3>
            <div className="flex items-center justify-between md:flex-row flex-col gap-y-6">
              <CircularProgress 
                value={0} 
                label="0%" 
                sublabel="" 
              />
              <div className="space-y-2 text-white">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-red-500 rounded" />
                  <span>Carbohydrates</span>
                  <span className="ml-auto">0%</span>
                  <span className="text-green-300">25%</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-blue-500 rounded" />
                  <span>Fat</span>
                  <span className="ml-auto">0%</span>
                  <span className="text-green-300">35%</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-yellow-500 rounded" />
                  <span>Protein</span>
                  <span className="ml-auto">0%</span>
                  <span className="text-green-300">40%</span>
                </div>
              </div>
            </div>
          </Card>

          {/* Detailed Nutrition */}
          <Card className="bg-green-500 p-6">
            <div className="space-y-2">
              <NutritionRow label="Protein" total={0} goal={280} />
              <NutritionRow label="Carbohydrates" total={0} goal={175} />
              <NutritionRow label="Fiber" total={0} goal={38} />
              <NutritionRow label="Sugar" total={0} goal={65} />
              <NutritionRow label="Fat" total={0} goal={109} />
              <NutritionRow label="Saturated Fat" total={0} goal={19} />
              <NutritionRow label="Polyunsaturated Fat" total={0} goal={0} />
              <NutritionRow label="Monounsaturated Fat" total={0} goal={0} />
            </div>
          </Card>
        </div>
      </main>

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
