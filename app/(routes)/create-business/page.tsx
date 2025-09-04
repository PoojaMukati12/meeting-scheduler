"use client"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { app } from '@/config/FirebaseConfig'
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs'
import { doc, getFirestore, setDoc } from 'firebase/firestore' // <-- This is the corrected line
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { toast } from 'sonner'

function CreateBusiness() {
  const db = getFirestore(app);
  const [BusinessName, setBusinessName] = useState('');
  const { user } = useKindeBrowserClient();

   const router = useRouter();
  const onCreateBusiness = async () => {
     if (!user || !user.email) {
      console.error("User or user email is not logged in");
      return;
    }
    console.log("btn clicked");
    try {
      await setDoc(doc(db, 'Business', user.email), {
        businessName: BusinessName,
        email: user.email,
        userName: user.given_name + " " + user.family_name
      });
      console.log("Document saved");
      toast('New Business Created!');
      router.replace('/dashboard')
    } catch (error) {
      console.error("Error saving document:", error);
    }
  };

  return (
    <div className='p-14 items-center flex flex-col gap-20 my-10'>
      <Image src='/logo.svg' height={200} width={200} alt='logo' />
      <div className='flex flex-col items-center gap-4 max-w-3xl'>
        <h2 className='text-4xl font-bold'>What should we call your business?</h2>
        <p className='text-slate-500'>You can always change this later from settings</p>
        <div className='w-full'>
          <label className='text-slate-400'>Team Name</label>
          <Input placeholder='Enter Name...' className='mt-2' onChange={(event) => setBusinessName(event.target.value)} />
        </div>
        <Button className='w-full' disabled={!BusinessName} onClick={onCreateBusiness}>Create Business</Button>
      </div>
    </div>
  );
}

export default CreateBusiness;