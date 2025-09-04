"use client"
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { Clock, MapPin } from 'lucide-react'
import Link from 'next/link'
import { Calendar } from '@/components/ui/calendar'
import { Button } from '@/components/ui/button'

type FormValue = {
  eventname: string
  duration: number
  locationturl: string
  locationtype: string
  themecolor: string
}

function PreviewMeeting({ formValue }: { formValue: FormValue }) {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [timeslots, setTimeslots] = useState<string[]>([])

  useEffect(() => {
    if (formValue?.duration) {
      createTimeSlot(formValue.duration)
    }
  }, [formValue])

  const createTimeSlot = (interval: number) => {
    const startTime = 8 * 60
    const endTime = 22 * 60
    const totalSlots = (endTime - startTime) / interval

    const slots = Array.from({ length: totalSlots }, (_, i) => {
      const totalMinutes = startTime + i * interval
      const hours = Math.floor(totalMinutes / 60)
      const minutes = totalMinutes % 60
      const formattedHours = hours > 12 ? hours - 12 : hours
      const period = hours >= 12 ? 'PM' : 'AM'
      return `${String(formattedHours).padStart(2, '0')}:${String(
        minutes
      ).padStart(2, '0')} ${period}`
    })

    setTimeslots(slots)
  }

  return (
    <div className="p-5 py-10 shadow-lg m-5 border-t-8" style={{borderTopColor:formValue?.themecolor}}>
      <Image src="/logo.svg" alt="logo" width={150} height={150} />

      <div className="grid grid-cols-1 md:grid-cols-3 mt-5">
        {/* Left Section */}
        <div className="p-4 border-r">
          <h2>Business Name</h2>
          <h2 className="font-bold text-2xl">
            {formValue?.eventname ? formValue?.eventname : 'Meeting Name'}
          </h2>

          <div className="mt-5 flex flex-col gap-4">
            <h2 className="flex gap-2">
              <Clock /> {formValue.duration} Min
            </h2>
            <h2 className="flex gap-2">
              <MapPin /> {formValue.locationtype} Meeting
            </h2>
            <Link
              href={formValue.locationturl ? formValue.locationturl : '#'}
              className="text-primary"
            >
              {formValue.locationturl}
            </Link>
          </div>
        </div>

        {/* Right Section */}
        <div className="md:col-span-2 flex p-4">
          <div className="flex flex-col">
            <h2 className="font-bold text-lg">Select Date & Time</h2>
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-lg border mt-5"
              disabled={(date)=>date<= new Date()}
            />
          </div>

          <div
            className="flex flex-col w-full overflow-auto gap-4 p-5"
            style={{ maxHeight: '400px' }}
          >
            {timeslots.map((time, index) => (
              <Button
                key={index}
                className="border-[#0067ff] text-[#0067ff]"
                variant="outline"
              >
                {time}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default PreviewMeeting
