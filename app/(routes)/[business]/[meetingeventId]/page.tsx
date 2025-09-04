"use client";
import React, { useEffect, useState } from "react";
import MeetingTimeDate from "../_components/MeetingTimeDate";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { app } from "@/config/FirebaseConfig";

type MeetingPageProps = {
  params: {
    business: string
    meetingeventId: string
  }
}

export default function SharedMeetingEvent({ params }: MeetingPageProps) {
  const db = getFirestore(app);

  const [businessInfo, setBusinessInfo] = useState<any>(null);
  const [eventInfo, setEventInfo] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (params.business && params.meetingeventId) {
      fetchMeetingDetails();
    }
  }, [params.business, params.meetingeventId]);

  const fetchMeetingDetails = async () => {
    setLoading(true);
    try {
      // 🔹 Decode business email from URL
      const businessEmail = decodeURIComponent(params.business);

      // 🔹 Get Business Info directly by doc ID (email)
      const businessDocRef = doc(db, "Business", businessEmail);
      const businessSnap = await getDoc(businessDocRef);

      if (!businessSnap.exists()) {
        console.log("No business found with ID:", businessEmail);
      } else {
        console.log("Business Data:", businessSnap.data());
        setBusinessInfo(businessSnap.data());
      }

      // 🔹 Get Event Info
      const eventDocRef = doc(db, "MeetingEvent", params.meetingeventId);
      const eventSnap = await getDoc(eventDocRef);

      if (!eventSnap.exists()) {
        console.log("No event found with ID:", params.meetingeventId);
      } else {
        console.log("Event Data:", eventSnap.data());
        setEventInfo(eventSnap.data());
      }
    } catch (err) {
      console.error("Error fetching meeting details:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (!businessInfo || !eventInfo) return <p>No meeting details found.</p>;

  return <MeetingTimeDate businessInfo={businessInfo} eventInfo={eventInfo} />;
}

