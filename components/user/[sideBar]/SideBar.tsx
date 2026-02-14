"use client";

import Link from 'next/link'
import { useState } from 'react'
import { Home, FileText, BarChart2, Settings } from 'lucide-react'
import { ChevronRightIcon } from '@heroicons/react/24/solid'

import LogoutButton from '../[logOut]/LogOut';

export default function Sidebar() {
    const [active, setActive] = useState('home')

    const menuItems = [
        { name: 'home', label: 'Home', icon: <Home size={20} />, href: '/' },
        { name: 'documents', label: 'Documents', icon: <FileText size={20} />, href: '/documents' },
        { name: 'analytics', label: 'Analytics', icon: <BarChart2 size={20} />, href: '/analytics' },
        { name: 'settings', label: 'Settings', icon: <Settings size={20} />, href: '/settings' },
        { name: 'User', label: 'User Management', icon: <Settings size={20} />, href: '/user/userdata' },
    ]

    return (
        <aside className="w-64 bg-base-200 p-5 flex flex-col min-h-screen shadow-lg">
            <div className="text-2xl font-bold mb-6 flex items-center justify-between">
                MyApp
                <ChevronRightIcon className="h-6 w-6 text-gray-400 cursor-pointer hover:text-gray-600" />
            </div>

            <ul className="menu menu-vertical w-full">
                {menuItems.map((item) => (
                    <li key={item.name} className={active === item.name ? 'active' : ''}>
                        <Link
                            href={item.href}
                            onClick={() => setActive(item.name)}
                            className="flex items-center gap-2"
                        >
                            {item.icon} <span>{item.label}</span>
                        </Link>
                    </li>
                ))}
            </ul>
            <div className="mt-auto">
                <LogoutButton />
            </div>
        </aside>
    )
}
