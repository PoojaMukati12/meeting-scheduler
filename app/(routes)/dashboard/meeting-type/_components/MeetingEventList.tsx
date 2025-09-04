
"use client";
import { Button } from "@/components/ui/button";
import { app } from "@/config/FirebaseConfig";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import {
  collection,
  getDocs,
  getFirestore,
  query,
  where,
  deleteDoc,
  doc,
  getDoc,
  // orderBy,  // only if you have createdAt field
} from "firebase/firestore";
import { Clock, Copy, MapPin, Pen, Settings, Trash } from "lucide-react";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type MeetingEvent = {
  id: string;
  eventname: string;
  duration: number;
  locationturl: string;
  locationtype: string;
  themecolor: string;
  createdBy: string;
};

type BusinessInfo = {
  businessName: string;
  email: string;
  userName: string;
};

function MeetingEventList() {
  const db = getFirestore(app);
  const { user } = useKindeBrowserClient();

  const [eventList, setEventList] = useState<MeetingEvent[]>([]);
  const [loading, setLoading] = useState(true);

const [businessInfo, setBusinessInfo] = useState<BusinessInfo | null>(null);

  useEffect(() => {
    if (user?.email) {
      getEventList();
      BusinessInfo();
    }
  }, [user]);

  const getEventList = async () => {
    setLoading(true);
    try {
      const q = query(
        collection(db, "MeetingEvent"),
        where("createdBy", "==", user?.email)
        // orderBy("createdAt", "desc") // ✅ use only if you added createdAt field
      );

      const snapshot = await getDocs(q);

      const events: MeetingEvent[] = snapshot.docs.map((docSnap) => ({
        id: docSnap.id,
        ...(docSnap.data() as Omit<MeetingEvent, "id">),
      }));

      setEventList(events);
    } catch (error) {
      console.error("Error fetching events:", error);
    } finally {
      setLoading(false);
    }
  };

  const onDeleteMeeting = async (event: MeetingEvent) => {
    await deleteDoc(doc(db, "MeetingEvent", event.id)).then(() => {
      toast("Meeting Event Deleted Successfully!");
      getEventList();
    });
  };

const BusinessInfo = async () => {
 if (!user?.email) return;

    const docRef = doc(db, "Business", user.email);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Business Info:", docSnap.data());
      setBusinessInfo(docSnap.data() as BusinessInfo); // ✅ correct setter
    } else {
      console.log("No Business Info found");
    }
};

const onCopyHandler = (item: MeetingEvent) => {
  if (!businessInfo?.businessName) {
    toast.error("Business name not found");
    return;
  }

  const base =
    process.env.NEXT_PUBLIC_BASE_URL || (typeof window !== "undefined" ? window.location.origin : "");
  const slug = businessInfo.businessName.trim().toLowerCase().replace(/\s+/g, "-");

  const meetingEventUrl = `${base}/${slug}/${item.id}`;

  navigator.clipboard.writeText(meetingEventUrl);
  toast.success("Copied to Clipboard");
};

  if (loading) return <h2>Loading...</h2>;
  if (!eventList.length) return <h2>No Events Found</h2>;

  return (
    <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
      {eventList.map((event) => (
        <div
          key={event.id}
          className="border shadow-md border-t-8 rounded-lg p-5 flex flex-col gap-3"
          style={{ borderTopColor: event.themecolor }}
        >
          <div className="flex justify-end">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Settings className="cursor-pointer" />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem className="flex gap-2">
                  <Pen />
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="flex gap-2"
                  onClick={() => onDeleteMeeting(event)}
                >
                  <Trash />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <h2 className="font-medium text-xl ">{event.eventname}</h2>
          <div className="flex justify-between">
            <h2 className="flex gap-2 text-gray-500">
              <Clock /> {event.duration} Min
            </h2>
            <h2 className="flex gap-2 text-gray-500">
              <MapPin /> {event.locationtype} Meeting
            </h2>
          </div>
          <hr />

          <div className="flex justify-between">
            <h2
              className="flex gap-2 text-sm text-[#0067ff] items-center cursor-pointer"
              onClick={() => onCopyHandler(event)}
            >
              <Copy className="h-4 w-4" />
              Copy Link
            </h2>
            <Button
              className="border-[#0067ff] rounded-full text-[#0067ff]"
              variant="outline"
            >
              Share
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default MeetingEventList;
