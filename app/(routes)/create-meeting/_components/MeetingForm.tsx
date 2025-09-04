"use client"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ChevronLeft } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import LocationOption from '@/app/_utils/LocationOption' 
import Image from 'next/image'
import Link from 'next/link'
import ThemeOption from '@/app/_utils/ThemeOption'
import { getFirestore, setDoc,doc } from 'firebase/firestore'
import { app } from '@/config/FirebaseConfig'
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'


// ✅ Define type for form data
export type FormValue = {
  eventname: string
  duration: number
  locationturl: string
  locationtype: string
  themecolor: string
}

// ✅ Define props for MeetingForm
interface MeetingFormProps {
  setFormValue: (value: FormValue) => void
}

function MeetingForm({ setFormValue }: MeetingFormProps) {
  const [themecolor, setthemecolor] = useState('')
  const [eventname, seteventname] = useState('')
  const [duration, setduration] = useState(30)
  const [locationtype, setlocationtype] = useState('')
  const [locationturl, setlocationturl] = useState('')
  const {user}= useKindeBrowserClient()
  const router = useRouter()

  // ✅ Pass actual state values, not empty values
  const db = getFirestore(app)
  useEffect(() => {
    setFormValue({
      eventname,
      duration,
      locationturl,
      locationtype,
      themecolor,
    })
  }, [eventname, duration, locationtype, locationturl, themecolor, setFormValue])

 const onCreateClick = async () => {
  if (!user?.email) {
    toast('User not found!');
    return;
  }

  const id = Date.now().toString();
  try {
    await setDoc(doc(db, 'MeetingEvent', id), {
      id,
      eventname,
      duration,
      locationturl,
      locationtype,
      themecolor,
      businessId: doc(db, 'Business', user.email), // This is correct
      createdBy: user.email,
    });

    toast('New Meeting Event Created!');
    router.replace('/dashboard/meeting-type');
  } catch (error) {
    console.error('Error creating event:', error);
    toast('Failed to create event.');
  }
};
  return (
    <div className='p-8'>
      <Link href={'/dashboard'}>
        <h2 className='flex gap-2'><ChevronLeft /> Cancel</h2>
      </Link>

      <div className='mt-4'>
        <h2 className='font-bold text-2xl my-4'>Create New Event</h2>
        <hr />
      </div>

      <div className='flex flex-col gap-3 my-4'>
        {/* Event Name */}
        <h2 className='font-bold'>Event Name *</h2>
        <Input
          placeholder='Name of your meeting event'
          value={eventname}
          onChange={(event) => seteventname(event.target.value)}
        />

        {/* Duration */}
        <h2 className='font-bold'>Duration *</h2>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='outline' className='max-w-40'>{duration} Min</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => setduration(15)}>15 Min</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setduration(30)}>30 Min</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setduration(45)}>45 Min</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setduration(60)}>60 Min</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Location */}
        <h2 className='font-bold'>Location *</h2>
        <div className='grid grid-cols-4 gap-3'>
          {LocationOption.map((option, index) => (
            <div
              key={index}
              className={`border flex flex-col justify-center items-center p-3 rounded-lg 
              hover:bg-blue-100 hover:border-primary cursor-pointer 
              ${locationtype === option.name && 'bg-blue-100 border-primary'}`}
              onClick={() => setlocationtype(option.name)}
            >
              <Image src={option.icon} width={30} height={30} alt={option.name} />
              <h2>{option.name}</h2>
            </div>
          ))}
        </div>

        {locationtype && (
          <>
            <h2 className="font-bold">Add {locationtype} Url</h2>
            <Input
              placeholder={`Add ${locationtype} Url`}
              value={locationturl}
              onChange={(event) => setlocationturl(event.target.value)}
            />
          </>
        )}

        {/* Theme Color */}
        <h2 className='font-bold'>Select Theme Color</h2>
        <div className='flex gap-9 mt-2 justify-start'>
          {ThemeOption.map((color, index) => (
            <div
              key={index}
              className={`h-7 w-7 rounded-full cursor-pointer 
              ${themecolor === color && 'border-4 border-black'}`}
              style={{ backgroundColor: color }}
              onClick={() => setthemecolor(color)}
            />
          ))}
        </div>
      </div>

      {/* Submit Button */}
      <Button
        className='w-full mt-9'
        disabled={!eventname || !duration || !locationtype || !locationturl}
        onClick={()=>onCreateClick()}
      >
        Create
      </Button>
    </div>
  )
}

export default MeetingForm
