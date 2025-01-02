'use client'

import { Menu } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { useAuth } from '@/contexts/AuthContext' // Import AuthContext
import { Input } from './input'
import { MobileNav } from './mobileNav'
import Image from 'next/image'

function Navbar() {
    const pathname = usePathname()
    const [isMobileNavOpen, setIsMobileNavOpen] = useState(false)
    const { isLoggedIn, logout } = useAuth(); // Ambil status login dari AuthContext

    const isActive = (path) => {
        if (path === '/') {
            return pathname === '/';
        }
        return pathname.startsWith(path) && pathname !== '/';
    };

    const menuItems = isLoggedIn
        ? [
            { name: 'Timeline', path: '/timeline' },
            { name: 'Calories Calculator', path: '/calories-calculator' },
            { name: 'Dashboard', path: '/dashboard' },
            { name: 'Profile', path: '/profile' },
            { name: 'Logout', path: '/logout' },
        ]
        : [
            { name: 'Home', path: '/' },
            { name: 'Login', path: '/login' },
            { name: 'Register', path: '/register' },
        ];

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
            window.location.href = '/login'; // Redirect ke halaman login
        }
    };






    return (
        <>
            <nav className="flex items-center justify-between p-4 border-b">
                <div className="flex items-center gap-2">
                    <Link href={isLoggedIn ? '/timeline' : '/'} className="flex items-center space-x-2">
                        <Image src="/images/logo.svg" width={40} height={40} alt="logo"/>
                        <span className="font-semibold">FitFuel</span>
                    </Link>
                </div>
                <div className="hidden md:flex items-center gap-6">
                    {menuItems.map((item) =>
                        item.name === 'Logout' ? (
                            <Link
                                key={item.name}
                                href="/logout" // Arahkan ke halaman konfirmasi logout
                                className="text-sm hover:text-red-500 text-red-600"
                            >
                                {item.name}
                            </Link>
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
                    <Menu size={24}/>
                </button>
            </nav>

            <MobileNav isOpen={isMobileNavOpen} setIsOpen={setIsMobileNavOpen}/>
        </>
    );
}

export default Navbar;
