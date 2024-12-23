'use client'

import { Menu } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { Input } from './input'
import { MobileNav } from './mobileNav'
import Image from 'next/image'

function Navbar() {
    const pathname = usePathname()
    const [isMobileNavOpen, setIsMobileNavOpen] = useState(false)

    const isActive = (path) => {
        if (path === '/') {
            return pathname === '/';
        }
        return pathname.startsWith(path) && pathname !== '/';
    };

    const menuItems = [
        { name: 'Home', path: '/' },
        { name: 'Calories Calculator', path: '/calories-calculator' },
        { name: 'Dashboard', path: '/dashboard' },
        { name: 'Profile', path: '/profile' },
        { name: 'Login', path: '/login' },
        { name: 'Register', path: '/register' },
    ]

    return (
        <>
            <nav className="flex items-center justify-between p-4 border-b">
                <div className="flex items-center gap-2">
                    <Image src="/images/logo.svg" width={40} height={40} alt="logo" />
                    <span className="font-semibold">FitFuel</span>
                </div>
                <div className="hidden md:flex items-center gap-6">
                    {menuItems.map((item) => (
                        <Link href={item.path} key={item.name} className={`text-sm hover:text-green-500 ${isActive(item.path) ? 'text-green-500' : ''}`}>
                            {item.name}
                        </Link>
                    ))}
                    <div className="w-64">
                        <Input
                            type="search"
                            placeholder="Search in site"
                            className="w-full"
                        />
                    </div>
                </div>
                <button className="md:hidden" onClick={() => setIsMobileNavOpen(true)}>
                    <Menu size={24} />
                </button>
            </nav>

            <MobileNav isOpen={isMobileNavOpen} setIsOpen={setIsMobileNavOpen} />
        </>
    )
}

export default Navbar;