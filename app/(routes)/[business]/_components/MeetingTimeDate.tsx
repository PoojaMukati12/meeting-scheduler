"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Calendar, Clock, MapPin, Timer } from "lucide-react";
import Link from "next/link";
import { format, formatDate } from "date-fns";
import TimeDateSelection from "./TimeDateSelection";
import { Button } from "@/components/ui/button";
import UserForminfo from "./UserForminfo";
import Plunk from "@plunk/node";
import { render } from "@react-email/render";
import { toast } from "sonner";
import {
  getFirestore,
  setDoc,
  doc,
  collection,
  where,
  getDocs,
  query,
} from "firebase/firestore";
import { app } from "@/config/FirebaseConfig";
import Email from "@/emails";
import { useRouter } from "next/navigation";

interface MeetingTimeDateProps {
  eventInfo?: any;
  businessInfo?: any;
}

function MeetingTimeDate({ eventInfo, businessInfo }: MeetingTimeDateProps) {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [step, setStep] = useState<number>(1);
  const [timeslots, setTimeslots] = useState<string[]>([]);
  const [enableTimeSlot, setEnableTimeSlot] = useState<boolean>(false);
  const [userName, setUserName] = useState<string>("");
  const [userEmail, setUserEmail] = useState<string>("");
  const [userNote, setUserNote] = useState<string>("");
  const [prevBooking, setPrevBooking] = useState<any[]>([]);

  const plunk = new Plunk(process.env.NEXT_PUBLIC_PLUNK_API_KEY!);
  const router = useRouter();
  const db = getFirestore(app);

  useEffect(() => {
    if (eventInfo?.duration) createTimeSlots(eventInfo.duration);
  }, [eventInfo]);

  const createTimeSlots = (interval: number) => {
    const startTime = 8 * 60;
    const endTime = 22 * 60;
    const totalSlots = (endTime - startTime) / interval;

    const slots = Array.from({ length: totalSlots }, (_, i) => {
      const totalMinutes = startTime + i * interval;
      const hours = Math.floor(totalMinutes / 60);
      const minutes = totalMinutes % 60;
      const formattedHours = hours > 12 ? hours - 12 : hours;
      const period = hours >= 12 ? "PM" : "AM";
      return `${String(formattedHours).padStart(2, "0")}:${String(
        minutes
      ).padStart(2, "0")} ${period}`;
    });

    setTimeslots(slots);
  };

  const handleChange = (selectedDate: Date | undefined) => {
    if (!selectedDate) return;
    setDate(selectedDate);

    const day = selectedDate.toLocaleDateString("en-US", { weekday: "long" });
    setEnableTimeSlot(!!businessInfo?.daysAvailable?.[day]);

    const formattedDate = selectedDate.toDateString();
    getPrevEventBooking(formattedDate);
  };

  const getPrevEventBooking = async (date_: string) => {
    try {
      const q = query(
        collection(db, "ScheduleMeetings"),
        where("selectedDate", "==", date_),
        where("eventId", "==", eventInfo?.id ?? "")
      );

      const querySnapshot = await getDocs(q);
      const bookings: any[] = [];
      querySnapshot.forEach((doc) => bookings.push(doc.data()));
      setPrevBooking(bookings);
    } catch (err) {
      console.error("Error fetching previous bookings:", err);
    }
  };

  const sendEmail = async () => {
    if (!date || !selectedTime) return;

    const emailHtml :string = await render(
      <Email
        businessName={businessInfo?.businessName ?? ""}
        date={format(date, "PPP").toString()}
        duration={eventInfo?.duration ?? 0}
        meetingTime={selectedTime}
        meetingUrl={eventInfo?.locationturl ?? ""}
        userFirstName={userName}
      />
    );

    try {
      await plunk.emails.send({
        to: userEmail,
        subject: "New Meeting Schedule",
        body:emailHtml,
      });
      toast.success("Email sent successfully!");
      router.replace("/confirmation");
    } catch (err) {
      console.error("Failed to send email:", err);
      toast.error("Failed to send email");
    }
  };

  const handleScheduleEvent = async () => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!userEmail || !regex.test(userEmail)) {
      toast.error("Enter a valid email address");
      return;
    }
    if (!userName) {
      toast.error("Enter your name");
      return;
    }
    if (!selectedTime || !date) {
      toast.error("Select date and time");
      return;
    }

    try {
      const docId = Date.now().toString();
      const docRef = doc(db, "ScheduleMeetings", docId);

      await setDoc(docRef, {
        businessName: businessInfo?.businessName ?? "",
        businessEmail: businessInfo?.email ?? "",
        selectedTime: selectedTime,
        selectedDate: date,
        formatDate:format(date,'PPP'),
        formatedTimeStamp:format(date,'t'),
        duration: eventInfo?.duration ?? 0,
        locationUrl: eventInfo?.locationturl ?? "",
        eventId: eventInfo?.id ?? "",
        id: docId,
        userName,
        userEmail,
        userNote,
      });

      toast.success("Meeting scheduled successfully!");
      await sendEmail();

      setStep(1);
      setUserName("");
      setUserEmail("");
      setUserNote("");
      setSelectedTime(null);
    } catch (err) {
      toast.error("Failed to schedule meeting. Try again.");
      console.error(err);
    }
  };

  return (
    <div
      className="p-5 py-10 shadow-lg m-5 border-t-8 mx-10 md:mx-26 lg:mx-56 my-10"
      style={{ borderTopColor: eventInfo?.themecolor ?? "#ccc" }}
    >
      <Image src="/logo.svg" alt="logo" width={150} height={150} priority />

      <div className="grid grid-cols-1 md:grid-cols-3 mt-5">
        <div className="p-4 border-r">
          <h2 className="font-bold text-2xl">
            {eventInfo?.eventname ?? "Meeting Name"}
          </h2>
          <h2 className="font-bold text-2xl">
            {eventInfo?.duration ?? 0} Min Meeting
          </h2>

          <div className="mt-5 flex flex-col gap-4">
            <h2 className="flex gap-2 items-center">
              <Clock /> {eventInfo?.duration ?? 0} Min
            </h2>
            <h2 className="flex gap-2 items-center">
              <MapPin /> {eventInfo?.locationtype ?? "Unknown"} Meeting
            </h2>
            <h2 className="flex gap-2 items-center">
              <Calendar /> {date ? format(date, "PPP") : "No date selected"}
            </h2>
            <h2 className="flex gap-2 items-center">
              <Timer /> {selectedTime ?? "Not Selected"}
            </h2>
            <Link
              href={eventInfo?.locationturl ?? "#"}
              className="text-[#0067ff] underline"
            >
              {eventInfo?.locationturl ?? "No link available"}
            </Link>
          </div>
        </div>

        {step === 1 ? (
          <TimeDateSelection
            date={date}
            setSelectedTime={setSelectedTime}
            timeslots={timeslots}
            enableTimeSlot={enableTimeSlot}
            handleChange={handleChange}
            selectedTime={selectedTime}
            prevBooking={prevBooking}
          />
        ) : (
          <UserForminfo
            setUserName={setUserName}
            setUserEmail={setUserEmail}
            setUserNote={setUserNote}
          />
        )}
      </div>

      <div className="flex gap-3 justify-end mt-5">
        {step === 2 && (
          <Button variant="outline" onClick={() => setStep(1)}>
            Back
          </Button>
        )}
        {step === 1 ? (
          <Button
            className="mt-10 float-right"
            disabled={!selectedTime || !date}
            onClick={() => setStep(step + 1)}
          >
            Next
          </Button>
        ) : (
          <Button disabled={!userEmail || !userName} onClick={handleScheduleEvent}>
            Schedule
          </Button>
        )}
      </div>
    </div>
  );
}

export default MeetingTimeDate;
