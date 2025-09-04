"use client"
import React, { useEffect, useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ScheduledMeeting from "../schedule-meeting/_components/ScheduledMeeting"
import { collection, getDocs, getFirestore, query, where } from "firebase/firestore"
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs"
import { app } from "@/config/FirebaseConfig"
import { useRouter } from "next/navigation"

function Dashboard() {
  const db = getFirestore(app)
  const { user } = useKindeBrowserClient()
  const router = useRouter()
  const [meetingList, setMeetingList] = useState<any[]>([])

  // Fetch existing meetings
  const getScheduledMeeting = async () => {
    if (!user?.email) return

    try {
      const q = query(
        collection(db, "ScheduleMeetings"),
        where("businessEmail", "==", user.email)
      )
      const querySnapshot = await getDocs(q)
      const meetings: any[] = []
      querySnapshot.forEach((doc) => {
        meetings.push(doc.data())
      })
      setMeetingList(meetings)
    } catch (error) {
      console.error("❌ Error fetching meetings:", error)
    }
  }

  // Filter meetings
  const filterMeetingList = (type: string) => {
    const now = Date.now()
    if (type === "upcoming") {
      return meetingList.filter((item) => Number(item.formatedTimeStamp) * 1000 >= now)
    } else if (type === "expired") {
      return meetingList.filter((item) => Number(item.formatedTimeStamp) * 1000 < now)
    }
    return []
  }

  // Redirect to new meeting page
  const handleScheduleNewMeeting = () => {
    if (!user?.email) return
    const newEventId = Date.now().toString()
    router.push(`/${user.email}/${newEventId}`)
  }

  useEffect(() => {
    if (user?.email) getScheduledMeeting()
  }, [user])

  return (
    <div className="p-5 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Dashboard</h1>
      
      </div>

      {/* Scheduled Meetings Section */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Scheduled Meetings</h2>
        <Tabs defaultValue="upcoming" className="w-full">
          <TabsList>
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="expired">Expired</TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming">
            {meetingList.length ? (
              <ScheduledMeeting meetingList={filterMeetingList("upcoming")} />
            ) : (
              <p className="text-gray-600">No upcoming meetings</p>
            )}
          </TabsContent>

          <TabsContent value="expired">
            {meetingList.length ? (
              <ScheduledMeeting meetingList={filterMeetingList("expired")} />
            ) : (
              <p className="text-gray-600">No expired meetings</p>
            )}
          </TabsContent>
        </Tabs>
      </div>

      {/* Settings Section (polished) */}
      <div className="mt-10">
        <h2 className="text-xl font-semibold mb-4">Settings</h2>
        <div className="bg-white shadow-md rounded-lg p-6 border border-gray-200">
          <h3 className="text-lg font-medium mb-2">Profile & Preferences</h3>
          <p className="text-gray-600 mb-3">
            This is a placeholder for settings. You can later add profile updates, notification preferences, or other configurations here.
          </p>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            <li>Update Profile Information</li>
            <li>Change Password</li>
            <li>Notification Preferences</li>
            <li>Manage Account</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
