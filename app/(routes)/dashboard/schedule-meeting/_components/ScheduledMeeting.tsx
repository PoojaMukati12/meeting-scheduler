"use client"
import React from "react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { CalendarCheck, Clock, Timer } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

interface Meeting {
  id: string
  formatDate: string
  formatedTimeStamp: string | number
  duration?: number
  selectedTime?: string
  locationUrl?: string
}

function ScheduledMeeting({ meetingList }: { meetingList: Meeting[] }) {
  if (!meetingList || meetingList.length === 0) {
    return <p className="text-gray-500">No meetings found.</p>
  }

  return (
    <div className="flex flex-col gap-4">
      {meetingList.map((meeting, index) => (
        <Accordion type="single" collapsible key={meeting.id ?? index}>
          <AccordionItem value={`item-${index}`}>
            <AccordionTrigger>{meeting.formatDate}</AccordionTrigger>
            <AccordionContent>
              <div className="mt-3 flex flex-col gap-2">
                <h2 className="flex gap-2 items-center">
                  <Clock /> Duration: {meeting?.duration ?? 0} Min
                </h2>
                <h2 className="flex gap-2 items-center">
                  <CalendarCheck /> Date: {meeting.formatDate}
                </h2>
                {meeting.selectedTime && (
                  <h2 className="flex gap-2 items-center">
                    <Timer /> Time: {meeting.selectedTime}
                  </h2>
                )}
                <Link
                  href={meeting?.locationUrl ?? "#"}
                  target="_blank"
                  className="text-[#0067ff] underline"
                >
                  {meeting?.locationUrl ?? "No link available"}
                </Link>
              </div>
              <Link href={meeting?.locationUrl ?? "#"}><Button className="mt-5 cursor-pointer" >Join Now</Button></Link>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      ))}
    </div>
  )
}

export default ScheduledMeeting
