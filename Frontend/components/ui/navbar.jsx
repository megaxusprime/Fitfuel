'use client';

import { Menu } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext'; // Tetap gunakan AuthContext
import { MobileNav } from './mobileNav';
import Image from 'next/image';

function Navbar() {
    const pathname = usePathname();
    const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
    const { isLoggedIn, logout } = useAuth(); // Gunakan isLoggedIn dan logout dari AuthContext

    const [localIsLoggedIn, setLocalIsLoggedIn] = useState(false); // Status lokal untuk login

    const isActive = (path) => {
        if (path === '/') {
            return pathname === '/';
        }
        return pathname.startsWith(path) && pathname !== '/';
    };

    // Memastikan status login tetap tersimpan setelah refresh
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setLocalIsLoggedIn(true); // Set pengguna sebagai sudah login jika token ada
        } else {
            setLocalIsLoggedIn(false); // Set pengguna sebagai belum login jika token tidak ada
        }
    }, []);

    const handleLogout = async () => {
        try {
            const token = localStorage.getItem('token');

            if (token) {
                // Kirim permintaan logout hanya jika token ada
                const response = await fetch('http://localhost:8080/api/pengguna/logout', {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });

                if (response.ok) {
                    console.log("Logout berhasil di backend");
                } else {
                    const errorData = await response.json();
                    console.error("Logout gagal di backend:", errorData);
                }
            } else {
                console.warn("Token tidak ada. Mengabaikan permintaan logout ke backend.");
            }
        } catch (error) {
            console.error("Terjadi kesalahan saat logout:", error);
        } finally {
            // Selalu bersihkan token dan status lokal
            localStorage.removeItem('token');
            logout(); // Perbarui status login global
            setLocalIsLoggedIn(false); // Perbarui status login lokal
            window.location.href = '/login'; // Redirect ke halaman login
        }
    };

    const menuItems = localIsLoggedIn
        ? [
            { name: 'Timeline', path: '/timeline' },
            { name: 'Calories Calculator', path: '/calories-calculator' },
            { name: 'Target Kalori', path: '/target-kalori' }, // Tambahan
            { name: 'Dashboard', path: '/dashboard' },
            { name: 'Profile', path: '/profile' },
            { name: 'Logout', path: '#' }, // Logout sebagai tombol
        ]
        : [
            { name: 'Home', path: '/' },
            { name: 'Login', path: '/login' },
            { name: 'Register', path: '/register' },
        ];

    return (
        <>
            <nav className="flex items-center justify-between p-4 border-b">
                <div className="flex items-center gap-2">
                    <Link href={localIsLoggedIn ? '/timeline' : '/'} className="flex items-center space-x-2">
                        <Image src="/images/logo.svg" width={40} height={40} alt="logo" />
                        <span className="font-semibold">FitFuel</span>
                    </Link>
                </div>
                <div className="hidden md:flex items-center gap-6">
                    {menuItems.map((item) =>
                        item.name === 'Logout' ? (
                            <button
                                key={item.name}
                                onClick={handleLogout}
                                className="text-sm hover:text-red-500 text-red-600"
                            >
                                {item.name}
                            </button>
                        ) : (
                            <Link
                                href={item.path}
                                key={item.name}
                                className={`text-sm hover:text-green-500 ${
                                    isActive(item.path) ? 'text-green-500' : ''
                                }`}
                            >
                                {item.name}
                            </Link>
                        )
                    )}
                </div>

                <button className="md:hidden" onClick={() => setIsMobileNavOpen(true)}>
                    <Menu size={24} />
                </button>
            </nav>

            <MobileNav isOpen={isMobileNavOpen} setIsOpen={setIsMobileNavOpen} />
        </>
    );
}

export default Navbar;
