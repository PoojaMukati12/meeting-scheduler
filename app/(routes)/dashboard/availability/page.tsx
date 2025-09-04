"use client"
import DaysList from '@/app/_utils/DaysList'
import React, { useEffect, useState } from 'react'
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { doc, getFirestore, updateDoc, getDoc } from 'firebase/firestore'
import { app } from '@/config/FirebaseConfig'
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs'
import { toast } from 'sonner'

function Availability() {
  const [daysAvailable, setdaysAvailable] = useState<{ [key: string]: boolean }>({
    Sunday: false,
    Monday: false,
    Tuesday: false,
    Wednesday: false,
    Thursday: false,
    Friday: false,
    Saturday: false,
  });

  const [starttime, setstarttime] = useState<string>("");
  const [endtime, setendtime] = useState<string>("");

  const db = getFirestore(app);
  const { user } = useKindeBrowserClient();

  const onHandleChange = (day: string, value: boolean) => {
    setdaysAvailable(prev => ({
      ...prev,
      [day]: value,
    }));
  };

  useEffect(() => {
    if (user) {
      getBusinessInfo();
    }
  }, [user]);

  const getBusinessInfo = async () => {
    try {
      const docRef = doc(db, 'Business', user?.email || "");
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const result = docSnap.data();
        setdaysAvailable(result.daysAvailable || daysAvailable);
        setstarttime(result.starttime || "");
        setendtime(result.endtime || "");
      }
    } catch (err) {
      console.error("Error fetching business info:", err);
    }
  };

  const handleSave = async () => {
    if (!user?.email) {
      toast.error("User not logged in");
      return;
    }

    try {
      const docRef = doc(db, "Business", user.email);
      await updateDoc(docRef, {
        daysAvailable,
        starttime,
        endtime,
      });
      toast.success("Data Updated!");
    } catch (err) {
      console.error("Error updating doc:", err);
      toast.error("Failed to update data");
    }
  };

  return (
    <div className="p-10">
      <h2 className="font-bold text-2xl">Availability</h2>
      <hr className="my-7" />

      <div>
        <h2 className="font-bold">Availability Days</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 my-3">
          {DaysList.map((item, index) => (
            <div key={index}>
              <h2>
                <Checkbox
                  checked={!!daysAvailable[item.day]}
                  onCheckedChange={(e) => onHandleChange(item.day, !!e)}
                />
                {item.day}
              </h2>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="font-bold mt-10">Availability Time</h2>
        <div className="flex gap-10">
          <div className="mt-3">
            <h2>Start Time</h2>
            <Input
              type="time"
              value={starttime}
              onChange={(e) => setstarttime(e.target.value)}
            />
          </div>
          <div className="mt-3">
            <h2>End Time</h2>
            <Input
              type="time"
              value={endtime}
              onChange={(e) => setendtime(e.target.value)}
            />
          </div>
        </div>
      </div>

      <Button className="mt-10 cursor-pointer" onClick={handleSave}>
        Save
      </Button>
    </div>
  );
}

export default Availability;
