"use client"
import React, { useState } from 'react'
import MeetingForm from './_components/MeetingForm'
import PreviewMeeting from './_components/PreviewMeeting'

function CreateMeeting() {


  type FormValue = {
  eventname: string
  duration: number
  locationturl: string
  locationtype: string
  themecolor: string
}
    const [formValue, setFormValue] = useState<FormValue>({
    eventname: '',
    duration: 30,
    locationturl: '',
    locationtype: '',
    themecolor: ''
  })
  return (
    <div className='grid grid-cols-1 md:grid-cols-3'>
      {/* Meetingsection */}
      <div className='shadow-md border h-screen'>
       <MeetingForm setFormValue={setFormValue}/>
      </div>
      {/* {Previewsection} */}
      <div className='md:col-span-2'>
      <PreviewMeeting formValue={formValue}/>
      </div>
    </div>
  )
}

export default CreateMeeting
