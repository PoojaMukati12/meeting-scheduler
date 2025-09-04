"use client"
import React from "react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";

interface TimeDateSelectionProps {
  date: Date | undefined;
  handleChange: (d: Date | undefined) => void;
  timeslots: string[];
  setSelectedTime: (time: string) => void;
  enableTimeSlot: boolean;
  selectedTime: string | null;
   prevBooking: any[];
}

function TimeDateSelection({
  date,
  handleChange,
  timeslots,
  setSelectedTime,
  enableTimeSlot,
  selectedTime,
  prevBooking
}: TimeDateSelectionProps) {

    const checkTimeSlot =(time:string)=>{
        return (prevBooking.filter(item=>item.selectedTime ==time)).length>0;
    }
  return (
    <div className="md:col-span-2 flex p-4 gap-4">
      <div className="flex flex-col">
        <h2 className="font-bold text-lg">Select Date & Time</h2>
        <Calendar
          mode="single"
          selected={date}
          onSelect={handleChange} // ✅ pass selected date
          className="rounded-lg border mt-5"
          disabled={(d) => d <= new Date()}
        />
      </div>

      <div
        className="flex flex-col w-full overflow-auto gap-4 p-5"
        style={{ maxHeight: "400px" }}
      >
        {timeslots.map((time, index) => (
          <Button
            key={index}
            variant="outline"
            disabled={!enableTimeSlot || checkTimeSlot(time)}
            onClick={() => setSelectedTime(time)}
            className={`border-[#0067ff] text-[#0067ff] ${
              time === selectedTime ? "bg-[#0067ff] text-white" : ""
            }`}
          >
            {time}
          </Button>
        ))}
      </div>
    </div>
  );
}

export default TimeDateSelection;
