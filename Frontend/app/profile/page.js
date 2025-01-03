'use client'

import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation' // Untuk mengambil query string
import Navbar from '@/components/ui/navbar'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function Profile() {
    const [profile, setProfile] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const searchParams = useSearchParams()
    const queryUsername = searchParams.get('username') // Ambil username dari query string

    useEffect(() => {
        const fetchProfile = async () => {
            const token = localStorage.getItem('token') // Ambil token dari localStorage
            const storedUsername = localStorage.getItem('username') // Ambil username dari localStorage
            const username = queryUsername || storedUsername

            if (!token && !username) {
                setError('Token atau username tidak ditemukan. Silakan login kembali.')
                setLoading(false)
                return
            }

            try {
                const response = await fetch(`http://localhost:8080/api/pengguna/profil`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}` // Tambahkan token ke header
                    },
                })

                if (response.ok) {
                    const data = await response.json()
                    setProfile(data)
                } else {
                    const errorData = await response.text()
                    setError(errorData || 'Failed to fetch profile data.')
                }
            } catch (err) {
                console.error('Error fetching profile:', err)
                setError('An unexpected error occurred.')
            } finally {
                setLoading(false)
            }
        }

        fetchProfile()
    }, [queryUsername])

    if (loading) {
        return <div>Loading...</div>
    }

    if (error) {
        return <div className="text-red-500">{error}</div>
    }

    return (
        <div className="min-h-screen flex flex-col max-w-screen overflow-hidden">
            {/* Navigation */}
            <Navbar />

            {/* User Header */}
            <header className="bg-green-400 p-4">
                <div className="container mx-auto flex justify-between items-center">
                    <div className="flex items-center gap-4">
                        <Avatar className="h-12 w-12">
                            <AvatarImage src={profile?.avatarUrl || "https://github.com/shadcn.png"} alt={profile?.username || "User"} />
                            <AvatarFallback>{profile?.username?.charAt(0).toUpperCase()}</AvatarFallback>
                        </Avatar>
                        <h1 className="text-xl font-semibold text-white">Hello, {profile?.name || "User"}!</h1>
                    </div>
                </div>
            </header>

            {/* Content */}
            <main className="flex-1 bg-gray-50 py-6 px-4">
                <div className="max-w-full mx-auto space-y-4">
                    {/* Profile Items */}
                    {[{
                        label: "Jenis Akun",
                        value: profile?.accountType || "Bebas"
                    },
                        {
                            label: "Email",
                            value: profile?.email || "Tidak ada email"
                        },
                        {
                            label: "Nama Anggota",
                            value: profile?.displayName || "Publik",
                            subValue: `@${profile?.username}`
                        },
                        {
                            label: "Nama Depan",
//                            inputName: "",
                            value: profile?.firstName || "Pribadi",
                            subValue: profile?.firstName
                        }].map((item, idx) => (
                        <div
                            key={idx}
                            className="bg-green-400 text-white rounded-lg shadow p-4 flex justify-between items-center"
                        >
                            <div>
                                <p className="font-semibold">{item.label}</p>
                                <input className="text-black form-control" name="label" value={item.value} />
                                {item.subValue && (
                                    <p className="text-sm mt-1">{item.subValue}</p>
                                )}
                            </div>
                        </div>
                    ))}

                    {/* Delete Account */}
                    <button className="bg-red-500 text-white rounded-lg shadow p-4 w-full">
                        Hapus Akun
                    </button>
                </div>
            </main>

            {/* Footer */}
            <footer className="bg-black text-white py-4 mt-auto">
                <div className="container mx-auto px-4 flex justify-between items-center">
                    <p className="text-sm">© 2024 FitFuel. Seluruh hak cipta dilindungi undang-undang.</p>
                </div>
            </footer>
        </div>
    )
}
