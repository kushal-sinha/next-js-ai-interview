import { UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import React from 'react'

function Header() {
    return (
        <div className='flex p-4 items-center  justify-between bg-secondary shadow-sm'>
            <Image src={'/logo.svg'} alt='logo' width={160} height={100} />
            <ul className='flex gap-6'>
                <li>Dashboard</li>
                <li>Questions</li>
                <li>Upgrade</li>
                <li>How it Works?</li>
            </ul>
            <UserButton />
        </div>
    )
}

export default Header