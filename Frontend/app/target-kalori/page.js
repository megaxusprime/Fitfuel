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
        <div className="min-h-screen flex flex-col">
            {/* Navigation */}
            <Navbar />

            {/* Hero Section */}
            <section className="bg-blue-400 text-center py-12">
                <h1 className="text-3xl font-bold mb-2">Set Your Daily Calorie Target</h1>
                <p className="text-gray-800 mb-6">Enter your target calorie intake to track your progress.</p>
            </section>

            {/* Main Content */}
            <div className="flex-1 grid md:grid-cols-2">
                <div className="p-8 flex flex-col justify-center max-w-md mx-auto w-full">
                    <h2 className="text-2xl font-bold mb-6">Target Kalori</h2>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(handleSubmitForm)} className="space-y-4">
                            <FormField
                                control={form.control}
                                name="targetKalori"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Target Kalori</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                placeholder="Masukkan target kalori harian"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button type="submit" className="w-full bg-black hover:bg-black/90">
                                Simpan Target
                            </Button>
                        </form>
                    </Form>

                    {/* Displaying the results */}
                    {currentKalori !== null && (
                        <div className="mt-6">
                            <p>Jumlah kalori sekarang: {currentKalori}</p>
                            <p>Target kalori: {targetKalori}</p>
                            <p>{statusMessage}</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Footer */}
            <footer className="bg-black text-white py-6">
                <div className="container mx-auto px-4 flex justify-between items-center">
                    <p className="text-sm">© 2024 FitFuel. Seluruh hak cipta dilindungi undang-undang.</p>
                </div>
            </footer>
        </div>
    )
}
