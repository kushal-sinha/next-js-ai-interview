"use client"
import { UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

function Header() {
    const router = useRouter();
    function HowitWorks() {
        router.push('/dashboard/howitworks'); // Use lowercase 'howitworks'
    }

    const handleDashboardClick = () => {
        router.push('/dashboard'); // Redirects to the dashboard page
    };
    const handleQuestionsClick = () => {
        router.push('/dashboard/Questions'); // Redirects to the Questions page
    };
    const path = usePathname()
    useEffect(() => {
        console.log(path)
    }, [])
    return (
        <div className='flex p-4 items-center  justify-between bg-secondary shadow-sm'>
            <Image src={'/logo.svg'} alt='logo' width={160} height={100} />
            <ul className=' hidden md:flex gap-6'>
                <li onClick={handleDashboardClick} className={`hover:text-primary hover:font-bold transition-all cursor-pointer ${path === '/dashboard' && 'text-primary font-bold'}`}>Dashboard</li>
                <li onClick={handleQuestionsClick} className={`hover:text-primary hover:font-bold transition-all cursor-pointer ${path === '/dashboard/Questions' && 'text-primary font-bold'}`}>Questions</li>
                <li onClick={HowitWorks} className={`hover:text-primary hover:font-bold transition-all cursor-pointer ${path === '/dashboard/How it Works' && 'text-primary font-bold'}`}>How it Works?</li>
            </ul>
            <UserButton />
        </div>
    )
}

export default Header