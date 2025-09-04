import { Input } from '@/components/ui/input'
import React from 'react'

interface UserForminfoProps {
  setUserName: (name: string) => void;
  setUserEmail: (email: string) => void;
  setUserNote: (note: string) => void;
}

function UserForminfo({setUserEmail,setUserName,setUserNote}: UserForminfoProps) {
  return (
    <div className='p-4 px-8 flex-col gap-3'>
      <h2 className='font-bold text-xl'>Enter Details</h2>
      <div className='mt-2'>
        <h2>Name *</h2>
        <Input onChange={(event)=>setUserName(event.target.value)}/>
      </div>
       <div className='mt-2'>
        <h2>Email *</h2>
        <Input onChange={(event)=>setUserEmail(event.target.value)}/>
      </div>
       <div className='mt-2'>
        <h2>Share any Notes *</h2>
        <Input onChange={(event)=>setUserNote(event.target.value)}/>
      </div>
       <div>
        <h2 className='text-xs text-gray-400 mt-2'> By continuing, you confirm that the information provided is correct and 
          you agree to the meeting terms.</h2>
      
      </div>
    </div>
  )
}

export default UserForminfo
