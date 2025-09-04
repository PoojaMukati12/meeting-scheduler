import React from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import Image from 'next/image'

function Hero() {
  return (
    <div className='flex  flex-col justify-center items-center my-20'>
    <div className='text-center max-w-2xl'>
      <h2 className='font-bold text-[60px] text-slate-700'>Easy Scheduling ahead</h2>
      <h2 className='text-xl mt-5 text-slate-500'>scheduly is your scheduling automation platform for eliminating the back-and-forth emails to find the perfect time--and so much more.</h2>
      <div className='flex gap-4 flex-col mt-5'>
        <h3 className='text-sm'>Sign Up free with Google</h3>
        <div className='flex justify-center gap-8'>
            <Button className='p-7 flex gap-4'>
                <Image src='/google.png' alt='google' width={40} height={40}/>
                Sign up with Google</Button>
        </div>  
        <hr ></hr>
        <h2><Link href='' className='text-[#0069ff]'>Sign up free with Email.</Link>No Credit Card required </h2>
      </div>
    </div>
    </div>
  )
}

export default Hero