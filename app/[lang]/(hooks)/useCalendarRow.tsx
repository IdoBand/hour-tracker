import { parseISO } from "date-fns";
import { useCalendar } from "./useCalendar";
import format from "date-fns/format";
import { ArrowDownCircleIcon } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import Button from "@/components/Button";

const SCREEN_POSITION = {
  right: "right-0",
};

export const useCalendarRow = (date?: Date, screenPosition?: "right") => {
  const [isCalendar, setIsCalendar] = useState<boolean>(false);
  const { visualCalendar, selectedDay } = useCalendar(
    false,
    [],
    undefined,
    date ? date : undefined,
  );
  const selectedDate: Date = parseISO(format(selectedDay, "yyyy-MM-dd"));
  const calendarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        calendarRef.current &&
        !calendarRef.current.contains(event.target as Node)
      ) {
        setIsCalendar(false);
      }
    };

    if (isCalendar) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isCalendar]);

  const calendarRow = (
    <div className="relative flex items-center gap-2 xs:flex-col">
      <label
        className="w-max px-2 flex gap-1 py-1 cursor-pointer md:w-full rounded-md bg-white"
        onClick={() => setIsCalendar((prev) => !prev)}
      >
        {format(selectedDay, "dd-MM-yyyy")}
        <ArrowDownCircleIcon className="w-5" />
      </label>

      {isCalendar && (
        <div
          ref={calendarRef}
          className={`absolute top-10 shadow-lg bg-light w-max py-2 rounded-xl z-10 ${
            screenPosition ? SCREEN_POSITION[screenPosition] : ""
          }`}
        >
          {visualCalendar}
          <div className="w-11/12 flex justify-end">
            <Button
              type="button"
              theme="full"
              text="OK"
              className="text-xs"
              onClick={() => setIsCalendar(false)}
            />
          </div>
        </div>
      )}
    </div>
  );

  return { calendarRow, selectedDate };
};
