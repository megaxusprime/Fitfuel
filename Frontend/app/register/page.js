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
        message: "Username harus minimal 3 karakter.",
    }),
    namaPengguna: z.string().min(1, {
        message: "Nama Pengguna tidak boleh kosong.",
    }),
    email: z.string().email({
        message: "Alamat email tidak valid.",
    }),
    password: z.string().min(8, {
        message: "Password harus minimal 8 karakter.",
    }),
})

export default function Register() {
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
            namaPengguna: "",
            email: "",
            password: "",
        },
    })

    const handleRegister = async (values) => {
        try {
            const response = await fetch('http://localhost:8080/api/pengguna/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: values.username,
                    namaPengguna: values.namaPengguna,
                    email: values.email,
                    password: values.password,
                }),
            })

            if (response.ok) {
                const data = await response.json()
                console.log('Registration successful:', data)

                // Simpan token dan username ke localStorage jika diperlukan
                localStorage.setItem('token', data.token)
                localStorage.setItem('username', data.username)

                // Redirect atau tampilkan pesan sukses
                alert('Registrasi berhasil! Anda dapat login sekarang.')
            } else {
                const errorData = await response.json()

                // Tampilkan error untuk setiap field yang sesuai
                if (errorData.errors) {
                    for (const key in errorData.errors) {
                        form.setError(key, { message: errorData.errors[key] })
                    }
                } else {
                    form.setError('username', { message: errorData.message || 'Registrasi gagal.' })
                }
            }
        } catch (err) {
            console.error('Error during registration:', err)
            form.setError('username', { message: 'Terjadi kesalahan tak terduga. Silakan coba lagi.' })
        }
    }

    return (
        <div className="min-h-screen flex flex-col">
            {/* Navigation */}
            <Navbar />

            {/* Hero Section */}
            <section className="bg-green-400 text-center py-12">
                <h1 className="text-3xl font-bold mb-2">Join <span className="text-[#169F04]">FitFuel</span> Today!</h1>
                <p className="text-gray-800 mb-6">Create your account to start tracking your daily calorie intake.</p>
            </section>

            {/* Main Content */}
            <div className="flex-1 grid md:grid-cols-2">
                <div className="relative h-[400px] md:h-full">
                    <Image
                        src="/images/register_illustration.svg"
                        alt="Healthy Food Plate"
                        fill
                        className="object-cover"
                    />
                </div>
                <div className="p-8 flex flex-col justify-center max-w-md mx-auto w-full">
                    <h2 className="text-2xl font-bold mb-6">Register</h2>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(handleRegister)} className="space-y-4">
                            <FormField
                                control={form.control}
                                name="username"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Username</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Masukkan username Anda" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="namaPengguna"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Nama Pengguna</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Masukkan nama Anda" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input type="email" placeholder="Masukkan email Anda" {...field} />
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
                                            <Input type="password" placeholder="Masukkan password Anda" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button type="submit" className="w-full bg-black hover:bg-black/90">
                                Daftar
                            </Button>
                        </form>
                    </Form>
                </div>
            </div>
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