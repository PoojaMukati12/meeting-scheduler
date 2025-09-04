"use client"
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React from 'react'
import { LoginLink, RegisterLink } from '@kinde-oss/kinde-auth-nextjs'

function Header() {
  return (
    <div>
      <div className='flex items-center justify-between p-5 shadow-md' >
        <Image src='/logo.svg' width={90} height={90} alt='logo' className='w-[100px] md:w-[200px]'/>
        <ul className='hidden md:flex gap-14 font-medium text-lg'>
            <li className='hover:text-[#0069ff] transition-all duration-300 cursor-pointer'>Product</li>
            <li className='hover:text-[#0069ff] transition-all duration-300 cursor-pointer'>Pricing</li>
            <li className='hover:text-[#0069ff] transition-all duration-300 cursor-pointer'>Contact Us</li>
            <li className='hover:text-[#0069ff] transition-all duration-300 cursor-pointer'>About Us</li>
        </ul>
        <div className='flex gap-5'>
          <LoginLink><Button variant="ghost" className='hover:bg-[#0069ff] hover:text-white'>Login</Button></LoginLink>  
           <RegisterLink> <Button>Get Started</Button></RegisterLink>
        </div>
      </div>
    </div>
  )
}

export default Header
