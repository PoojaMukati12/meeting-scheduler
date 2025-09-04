"use client"
import React, { useEffect, useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ScheduledMeeting from "./_components/ScheduledMeeting"
import { collection, getDocs, getFirestore, query, where } from "firebase/firestore"
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs"
import { app } from "@/config/FirebaseConfig"

function ScheduledMEeting() {
  const db = getFirestore(app)
  const { user } = useKindeBrowserClient()
  const [meetingList, setMeetingList] = useState<any[]>([])

  const getScheduledMeeting = async () => {
    if (!user?.email) return
    console.log("📡 Fetching meetings for:", user.email)

    try {
      const q = query(
        collection(db, "ScheduleMeetings"), // ✅ Corrected collection name
        where("businessEmail", "==", user.email)
      )

      const querySnapshot = await getDocs(q)
      console.log("📊 Query snapshot size:", querySnapshot.size)

      const meetings: any[] = []
      querySnapshot.forEach((doc) => {
        const data = doc.data()
        console.log("✅ Meeting found:", data)
        meetings.push(data)
      })

      setMeetingList(meetings)
    } catch (error) {
      console.error("❌ Error fetching meetings:", error)
    }
  }

  const filterMeetingList = (type: string) => {
    const now = Date.now() // current time in ms

    if (type === "upcoming") {
      return meetingList.filter(
        (item) => Number(item.formatedTimeStamp) * 1000 >= now
      )
    } else if (type === "expired") {
      return meetingList.filter(
        (item) => Number(item.formatedTimeStamp) * 1000 < now
      )
    }
    return []
  }

  useEffect(() => {
    if (user?.email) {
      getScheduledMeeting()
    }
  }, [user])

  return (
    <div className="p-5">
      <h2 className="font-bold text-2xl">Scheduled Meetings</h2>
      <hr className="my-5" />
      <Tabs defaultValue="upcoming" className="w-[400px]">
        <TabsList>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="expired">Expired</TabsTrigger>
        </TabsList>

        {/* Upcoming Meetings */}
        <TabsContent value="upcoming">
          <ScheduledMeeting meetingList={filterMeetingList("upcoming")} />
        </TabsContent>

        {/* Expired Meetings */}
        <TabsContent value="expired">
          <ScheduledMeeting meetingList={filterMeetingList("expired")} />
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default ScheduledMEeting
