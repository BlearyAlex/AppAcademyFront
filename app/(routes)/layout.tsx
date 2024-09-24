import { Navbar } from '@/components/Navbar'
import { Sidebar } from '@/components/Sidebar'
import React from 'react'

export default function LayoutDashboard({ children }: { children: React.ReactElement }) {
    return (
        <div className='flex w-full h-full'>
            <div className='hidden xl:block w-80 h-full xl:fixed'>
                <Sidebar />
            </div>
            <div className='w-full xl:ml-80'>
                <Navbar />
                {children}
            </div>
        </div>
    )
}
