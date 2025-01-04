'use client'

import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Navbar from '@/components/ui/navbar'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'

export default function TargetKalori() {
    const form = useForm({
        defaultValues: {
            targetKalori: 0,
        },
    })

    // State untuk menyimpan data kalori dan status
    const [currentKalori, setCurrentKalori] = useState(null)
    const [targetKalori, setTargetKalori] = useState(0)
    const [statusMessage, setStatusMessage] = useState('')

    const handleSubmitForm = async (values) => {
        const token = await localStorage.getItem('token')
        if (!token) throw new Error('Token tidak ditemukan. Silakan login kembali.')

        try {
            // Mengambil data kalori saat ini dari API
            const response = await fetch('http://localhost:8080/api/target-kalori/sum/kalori', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            })

            if (response.ok) {
                const data = await response.json()
                const currentKalori = data.kalori // Asumsikan `data.kalor` adalah hasil kalori yang dihitung

                // Set target kalori dan kalori saat ini
                setTargetKalori(values.targetKalori)
                setCurrentKalori(currentKalori)

                // Cek apakah kalori sudah melebihi target
                if (currentKalori > values.targetKalori) {
                    setStatusMessage('Kalori anda sudah melebihi target.')
                } else if (currentKalori < values.targetKalori) {
                    setStatusMessage('Kalori anda masih dibawah target.')
                } else {
                    setStatusMessage('Kalori anda tepat dengan target.')
                }
            } else {
                const errorData = await response.json()
                form.setError('targetKalori', { message: errorData.message || 'Gagal mengambil data.' })
            }
        } catch (err) {
            console.error('Error during target kalori submission:', err)
            form.setError('targetKalori', { message: 'Terjadi kesalahan tak terduga. Silakan coba lagi.' })
        }
    }

    return (
            <div className="min-h-screen flex flex-col bg-gray-100">
                {/* Navigation */}
                <Navbar />

                {/* Hero Section */}
                <section className="bg-green-500 text-center py-10 rounded-b-lg shadow-md">
                    <h1 className="text-4xl font-bold text-white mb-2">Daily Calorie Target</h1>
                    <p className="text-gray-200 text-lg">
                        Set your daily calorie goal and track your progress effectively.
                    </p>
                </section>

                {/* Main Content */}
                <div className="flex-1 grid md:grid-cols-2 gap-6 mt-8 px-4 md:px-12">
                    {/* Form Section */}
                    <div className="p-6 bg-white rounded-lg shadow-md">
                        <h2 className="text-2xl font-semibold mb-4 text-green-600">Set Your Target</h2>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(handleSubmitForm)} className="space-y-6">
                                <FormField
                                    control={form.control}
                                    name="targetKalori"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-gray-700 font-semibold">
                                                Target Kalori
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="number"
                                                    placeholder="Masukkan target kalori harian"
                                                    {...field}
                                                    className="border-gray-300 focus:border-green-500 focus:ring-green-500 rounded-md"
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <Button
                                    type="submit"
                                    className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 rounded-lg"
                                >
                                    Save Target
                                </Button>
                            </form>
                        </Form>
                    </div>

                    {/* Result Section */}
                    <div className="p-6 bg-green-50 rounded-lg shadow-md">
                        {currentKalori !== null ? (
                            <div>
                                <h3 className="text-xl font-bold text-green-600 mb-4">Your Progress</h3>
                                <p className="text-gray-700 text-lg">
                                    <strong>Current Calorie:</strong> {currentKalori}
                                </p>
                                <p className="text-gray-700 text-lg">
                                    <strong>Target Calorie:</strong> {targetKalori}
                                </p>
                                <p
                                    className={`mt-4 text-lg font-semibold ${
                                        statusMessage.includes('melebihi')
                                            ? 'text-red-500'
                                            : statusMessage.includes('di bawah')
                                            ? 'text-yellow-500'
                                            : 'text-green-500'
                                    }`}
                                >
                                    {statusMessage}
                                </p>
                            </div>
                        ) : (
                            <div className="text-center">
                                <h3 className="text-lg font-bold text-gray-700">No Data Available</h3>
                                <p className="text-gray-600">Enter a target to start tracking your progress.</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Footer */}
                <footer className="bg-gray-800 text-white py-6 mt-8">
                    <div className="container mx-auto px-4 text-center">
                        <p className="text-sm">
                            © 2024 FitFuel. All rights reserved.
                        </p>
                    </div>
                </footer>
            </div>
        );
    }