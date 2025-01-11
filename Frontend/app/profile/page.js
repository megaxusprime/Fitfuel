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
                localStorage.removeItem('token');
                window.location.href = '/login';
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
        return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
    }

    if (error) {
        return <div className="text-red-500 text-center mt-4">{error}</div>;
    }

    return (
        <div className="min-h-screen flex flex-col bg-gray-100">
            {/* Navigation */}
            <Navbar />

            {/* User Header */}
            <header className="bg-green-500 p-6">
                <div className="container mx-auto flex justify-between items-center">
                    <div className="flex items-center gap-4">
                        <Avatar className="h-14 w-14 shadow-lg">
                            <AvatarImage src={profile?.avatarUrl || "https://github.com/shadcn.png"} alt={profile?.username || "User"} />
                            <AvatarFallback>{profile?.username?.charAt(0).toUpperCase()}</AvatarFallback>
                        </Avatar>
                        <h1 className="text-2xl font-semibold text-white">Hello, {profile?.name || "User"}!</h1>
                    </div>
                    <button
                        className="bg-red-600 hover:bg-red-700 transition text-white px-5 py-2 rounded-lg shadow-md"
                        onClick={handleDeleteAccount}
                    >
                        Hapus Akun
                    </button>
                </div>
            </header>

            {/* Content */}
            <main className="flex-1 container mx-auto py-8 px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[
                        { label: "Username", value: profile?.username },
                        { label: "Email", value: profile?.email },
                        { label: "Nama Pengguna", value: profile?.name },
                        { label: "ID", value: profile?.id },
                    ].map((item, idx) => (
                        <div
                            key={idx}
                            className="bg-white shadow-lg rounded-lg p-6 flex flex-col gap-2"
                        >
                            <p className="text-lg font-medium text-gray-700">{item.label}</p>
                            <input
                                className="border rounded-lg p-2 text-gray-900 bg-gray-50 shadow-inner"
                                value={item.value}
                                readOnly
                            />
                        </div>
                    ))}
                </div>
            </main>

            {/* Footer */}
            <footer className="bg-gray-800 text-white py-4">
                <div className="container mx-auto text-center text-sm">
                    © 2024 FitFuel. Seluruh hak cipta dilindungi undang-undang.
                </div>
            </footer>
        </div>
    );
}
