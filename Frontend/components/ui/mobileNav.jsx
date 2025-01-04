import React from 'react'
import { X } from 'lucide-react'
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function MobileNav({ isOpen, setIsOpen }) {
  if (!isOpen) return null

  const pathname = usePathname()
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
    <div
      className={`fixed inset-0 bg-white z-50 transform ${isOpen ? 'translate-x-0' : 'translate-x-full'
        } transition-transform duration-300 ease-in-out`}
    >
      <div className="flex justify-end p-4">
        <button onClick={() => setIsOpen(false)} className="text-gray-500 hover:text-gray-700">
          <X size={24} />
        </button>
      </div>
      <nav className="flex flex-col items-center">
        {menuItems.map((item) => (
          <Link href={item.path} key={item.name} className={`text-lg py-4 hover:text-green-500 ${isActive(item.path) ? 'text-green-500' : ''}`}>
            {item.name}
          </Link>
        ))}
      </nav>
    </div>
  )
}

