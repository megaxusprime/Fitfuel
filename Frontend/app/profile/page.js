'use client';

import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Navbar from '@/components/ui/navbar';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Profile() {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [isClient, setIsClient] = useState(false);
    const searchParams = useSearchParams();

    useEffect(() => {
        setIsClient(true);
    }, []);

    useEffect(() => {
        if (!isClient) return;

        const fetchProfile = async () => {
            const token = localStorage.getItem('token');
            const storedUsername = localStorage.getItem('username');
            const queryUsername = searchParams.get('username');
            const username = queryUsername || storedUsername;

            if (!token && !username) {
                setError('Token atau username tidak ditemukan. Silakan login kembali.');
                setLoading(false);
                return;
            }

            try {
                const response = await fetch(`http://localhost:8080/api/pengguna/profil`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                });

                if (response.ok) {
                    const data = await response.json();

                    // Map API data correctly to profile state
                    setProfile({
                        username: data.username || 'Tidak ada username',
                        email: data.email || 'Tidak ada email',
                        name: data.name || 'Tidak ada nama pengguna',
                        id: data.id || 'Tidak ada ID',
                    });
                } else {
                    const errorData = await response.text();
                    setError(errorData || 'Failed to fetch profile data.');
                }
            } catch (err) {
                console.error('Error fetching profile:', err);
                setError('An unexpected error occurred.');
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, [isClient, searchParams]);

    const handleDeleteAccount = async () => {
        if (!confirm('Apakah Anda yakin ingin menghapus akun Anda?')) return;

        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`http://localhost:8080/api/pengguna/delete`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (response.ok) {
                alert('Akun Anda telah berhasil dihapus.');
                localStorage.removeItem('token'); // Hapus token dari localStorage
                window.location.href = '/login'; // Redirect ke halaman login
            } else {
                const errorData = await response.text();
                alert(errorData || 'Gagal menghapus akun.');
            }
        } catch (err) {
            console.error('Error deleting account:', err);
            alert('Terjadi kesalahan saat menghapus akun.');
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div className="text-red-500">{error}</div>;
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
                    <button
                        className="bg-red-500 text-white px-4 py-2 rounded"
                        onClick={handleDeleteAccount}
                    >
                        Hapus Akun
                    </button>
                </div>
            </header>

            {/* Content */}
            <main className="flex-1 bg-gray-50 py-6 px-4">
                <div className="max-w-full mx-auto space-y-4">
                    {/* Profile Items */}
                    {[
                        {
                            label: "Username",
                            value: profile?.username,
                        },
                        {
                            label: "Email",
                            value: profile?.email,
                        },
                        {
                            label: "Nama Pengguna",
                            value: profile?.name,
                        },
                        {
                            label: "ID",
                            value: profile?.id,
                        },
                    ].map((item, idx) => (
                        <div
                            key={idx}
                            className="bg-green-400 text-white rounded-lg shadow p-4 flex justify-between items-center"
                        >
                            <div>
                                <p className="font-semibold">{item.label}</p>
                                <input
                                    className="text-black form-control"
                                    name={item.label}
                                    value={item.value}
                                    readOnly
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </main>

            {/* Footer */}
            <footer className="bg-black text-white py-4 mt-auto">
                <div className="container mx-auto px-4 flex justify-between items-center">
                    <p className="text-sm">© 2024 FitFuel. Seluruh hak cipta dilindungi undang-undang.</p>
                </div>
            </footer>
        </div>
    );
}
