"use client"
import { app } from '@/config/FirebaseConfig'
import { LogoutLink, useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs'
import React, { useEffect, useState } from 'react'
import { getFirestore, doc, getDoc} from 'firebase/firestore'
import { useRouter } from 'next/navigation'
import MeetingType from './meeting-type/page'



function Dashboard() {

 const [loading,setloading]=useState(true)
  const db= getFirestore(app)
  const {user}= useKindeBrowserClient()

  const router = useRouter();
  useEffect(()=>{
    user&&isBusinessRegistered();
  },[user])



  const isBusinessRegistered = async () => {
      if (!user?.email) {
    console.log("User email not available yet");
    return;
  }
    
         const docRef = doc(db, "Business", user.email);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
          console.log("Document data:", docSnap.data());
          setloading(false)
          } else {
  // docSnap.data() will be undefined in this case
         console.log("No such document!");
         router.replace('/create-business')
          setloading(false)
        }
}
  if(loading){
    return <h2>Loading...</h2>
  }
  return (
    <div>
      <MeetingType/>
    </div>
  )
}

export default Dashboard

