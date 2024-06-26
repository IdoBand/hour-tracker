import { Menu, Transition } from "@headlessui/react";
import { Fragment, useMemo, useState, useRef } from "react";
import {
  add,
  eachDayOfInterval,
  endOfMonth,
  format,
  formatISO,
  getDay,
  getYear,
  isEqual,
  isSameDay,
  isSameMonth,
  isToday,
  parse,
  parseISO,
  startOfToday,
} from "date-fns";
import Button from "../../../components/Button";
import { flexCenter } from "@/app/[lang]/(hooks)/mixin";
import CustomButton from "@/components/CustomButton";
const chosenYearDateValue =
  "rounded-md border border-solid border-black text-sky-500";
const yearsAndMonthsMenuContainer =
  "flex flex-col rounded-md overflow-auto scrollbar-thin scrollbar-thumb-gray-200";
import { TimeHelper } from "@/services/TimeHelper";
const COL_START_CLASSES = [
  "",
  "col-start-2",
  "col-start-3",
  "col-start-4",
  "col-start-5",
  "col-start-6",
  "col-start-7",
];
const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}
interface useCalendarProps {
  isSideBar: boolean;
  events: any[];
  onDateButtonClick: any;
  preChosenDay?: Date | undefined;
}

function handleDateButtonClick(day: Date, onDateClick: any) {
  if (onDateClick) {
    onDateClick(day);
  }
}
export function useCalendar(
  isSideBar: boolean,
  events: any[],
  onDateClick?: any,
  preChosenDay?: Date | undefined,
) {
  const today = startOfToday();
  const [selectedDay, setSelectedDay] = useState<Date>(
    preChosenDay ? preChosenDay : today,
  );
  // ***current*** Month / Year is what displayed in calender itself after approving. default value is today for first render.
  // ***chosen*** Month / Year is what displayed when you pick a year/month from the menu before approving.
  const [currentMonth, setCurrentMonth] = useState<string>(
    format(today, "MMMM"),
  );
  const [currentYear, setCurrentYear] = useState<string>(format(today, "yyyy"));
  const [chosenYear, setChosenYear] = useState<string>(format(today, "yyyy"));
  const [chosenMonth, setChosenMonth] = useState<string>(format(today, "MMMM"));
  const firstDayCurrentMonth = parse(
    `${currentMonth}-${currentYear}`,
    "MMMM-yyyy",
    new Date(),
  );
  const [sideBar, setSideBar] = useState<boolean>(isSideBar);
  const yearsAndMonthsOptionsRef = useRef<boolean>(false);
  const [yearsAndMonthsOptions, setYearsAndMonthsOptions] = useState<boolean>(
    yearsAndMonthsOptionsRef.current,
  );

  const days = eachDayOfInterval({
    start: firstDayCurrentMonth,
    end: endOfMonth(firstDayCurrentMonth),
  });

  function previousMonth() {
    const firstDayNextMonth = add(firstDayCurrentMonth, { months: -1 });
    setCurrentYear(format(firstDayNextMonth, "yyyy"));
    setCurrentMonth(format(firstDayNextMonth, "MMMM"));
  }

  function nextMonth() {
    const firstDayNextMonth = add(firstDayCurrentMonth, { months: 1 });
    setCurrentYear(format(firstDayNextMonth, "yyyy"));
    setCurrentMonth(format(firstDayNextMonth, "MMMM"));
  }

  const selectedDayEvents = events.filter((event: any) =>
    isSameDay(event.shiftStart, selectedDay),
  );

  const years = useMemo(() => {
    const currentYear = format(today, "yyyy");
    const result = [];
    for (let i = +currentYear; i > +currentYear - 21; i--) {
      result.push(i);
    }
    return result;
  }, []);

  function handleMonthClick(month: string) {
    setChosenMonth(month);
  }
  function handleYearClick(year: string) {
    setChosenYear(year);
  }
  function handleOkClick() {
    setSelectedDay(
      parse(`${chosenMonth}-${chosenYear}`, "MMMM-yyyy", new Date()),
    );
    setCurrentMonth(chosenMonth);
    setCurrentYear(chosenYear);
    setYearsAndMonthsOptions(false);
  }

  const SelectMonthAndYearMenu = () => {
    return (
      <div className="flex flex-col absolute top-3 rounded-lg p-4 bg-light shadow-2xl">
        <div className="flex  w-full px-6">
          <h2 className="text-left w-1/2 text-lg font-semibold">Year</h2>
          <h2 className="text-center w-1/2 text-lg font-semibold">Month</h2>
        </div>
        <div className=" top-10 left-0 h-52 flex gap-4">
          <div className={`${yearsAndMonthsMenuContainer}`}>
            {years.map((year, idx) => {
              return (
                <div
                  key={year}
                  className={`mx-2 px-3 cursor-pointer ${+chosenYear === year && chosenYearDateValue}`}
                  onClick={() => {
                    handleYearClick(year.toString());
                  }}
                >
                  {year}
                </div>
              );
            })}
          </div>
          <div className={`${yearsAndMonthsMenuContainer}`}>
            {MONTHS.map((month, idx) => {
              return (
                <div
                  key={month}
                  className={`mx-2 px-3 cursor-pointer ${chosenMonth === month && chosenYearDateValue}`}
                  onClick={() => handleMonthClick(month.toString())}
                >
                  {month}
                </div>
              );
            })}
          </div>
        </div>
        <div
          className={`w-full ${flexCenter} bg-inherit mt-4 rounded-b-lg gap-4`}
        >
          <Button
            theme="blank"
            text="Cancel"
            onClick={() => setYearsAndMonthsOptions(false)}
            className="text-sm"
            type="button"
          />
          <Button
            theme="full"
            text="OK"
            onClick={handleOkClick}
            className="bottom-[-20]  text-sm"
            type="button"
          />
        </div>
      </div>
    );
  };
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////

  const visualCalendar = (
    <div className="w-full relative">
      <div
        className={`max-w-full flex justify-center items-start px-4 sm:px-7 md:max-w-4xl md:px-6 lg:justify-center`}
      >
        <div className="flex md:flex-col gap-4 lg:justify-center md:divide-y divide-gray-200">
          <div className="min-w-[180px] flex flex-col items-center justify-between">
            <div className="w-full flex items-center justify-between">
              <CustomButton
                hoverText="Choose Date"
                where="down"
                className=" font-semibold text-gray-900"
                type="button"
                onClick={() => {
                  setYearsAndMonthsOptions(true);
                  yearsAndMonthsOptionsRef.current = true;
                }}
              >
                {format(firstDayCurrentMonth, "MMMM yyyy")}
              </CustomButton>
              {yearsAndMonthsOptions && <SelectMonthAndYearMenu />}
              <div className="flex gap-2 justify-between rtl:flex-row-reverse">
                <CustomButton
                  hoverText="Previous Month"
                  where="down"
                  type="button"
                  className="-my-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
                  onClick={previousMonth}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                    />
                  </svg>
                </CustomButton>
                <CustomButton
                  hoverText="Next Month"
                  where="down"
                  type="button"
                  className="-my-1.5 -mr-1.5 ml-2 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
                  onClick={nextMonth}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                    />
                  </svg>
                </CustomButton>
              </div>
            </div>
            <div className="w-full grid grid-cols-7 mt-5 text-xs leading-6 text-center text-gray-500">
              <div>S</div>
              <div>M</div>
              <div>T</div>
              <div>W</div>
              <div>T</div>
              <div>F</div>
              <div>S</div>
            </div>
            <div className="grid grid-cols-7 mt-2 text-sm">
              {days.map((day, dayIdx) => (
                <div
                  key={day.toString()}
                  className={classNames(
                    dayIdx === 0 && COL_START_CLASSES[getDay(day)],
                    "py-1.5",
                  )}
                >
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedDay(day);
                      handleDateButtonClick(day, onDateClick);
                    }}
                    className={classNames(
                      isSameDay(day, selectedDay) && "text-white",
                      !isSameDay(day, selectedDay) &&
                        isToday(day) &&
                        "text-blue-500",
                      !isSameDay(day, selectedDay) &&
                        !isToday(day) &&
                        isSameMonth(day, firstDayCurrentMonth) &&
                        "text-gray-900",
                      !isSameDay(day, selectedDay) &&
                        !isToday(day) &&
                        !isSameMonth(day, firstDayCurrentMonth) &&
                        "text-gray-400",
                      isSameDay(day, selectedDay) &&
                        isToday(day) &&
                        "bg-sky-500",
                      isSameDay(day, selectedDay) &&
                        !isToday(day) &&
                        "bg-gray-900",
                      !isSameDay(day, selectedDay) && "hover:bg-gray-200",
                      (isSameDay(day, selectedDay) || isToday(day)) &&
                        "font-semibold",
                      "mx-auto flex h-8 w-8 items-center justify-center rounded-full",
                    )}
                  >
                    <time dateTime={format(day, "yyyy-MM-dd")}>
                      {format(day, "d")}
                    </time>
                  </button>

                  <div className="w-1 h-1 mx-auto mt-1">
                    {events.some((event: any) =>
                      isSameDay(event.shiftStart, day),
                    ) && (
                      <div className="w-1 h-1 rounded-full bg-sky-500"></div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
          {sideBar && (
            <section className="mt-16 mb-0 md:mb-6 md:mt-0 text-center">
              <h2 className="font-semibold text-gray-900 w-full pt-2">
                Details for{" "}
                <time dateTime={format(selectedDay, "yyyy-MM-dd")}>
                  {format(selectedDay, "MMM dd, yyy")}
                </time>
              </h2>
              <ol className="mt-4 space-y-1 text-sm leading-6 text-gray-500">
                {selectedDayEvents.length > 0 ? (
                  selectedDayEvents.map((event: any, idx: number) => (
                    <EventTag event={event} key={idx} />
                  ))
                ) : (
                  <p className="mx-auto">No details for today.</p>
                )}
              </ol>
            </section>
          )}
        </div>
      </div>
    </div>
  );
  return {
    visualCalendar,
    selectedDay,
  };
}

function EventTag(event: any, key: number) {
  const startDateTime = event.event.shiftStart;
  const endDateTime = event.event.shiftEnd;

  return (
    <li
      key={key}
      className="flex items-start px-4 py-2 space-x-4 group rounded-xl focus-within:bg-gray-100 hover:bg-gray-100"
    >
      {/* <img
        src={event.event.imageUrl}
        alt=""
        className="flex-none w-10 h-10 rounded-full"
      /> */}
      <div className="flex-auto">
        <p className="text-gray-900">{event.event.name}</p>
        <p className="mt-0.5">
          <time dateTime={event.event.shiftStart}>
            {TimeHelper.extractHourFromDate(startDateTime)}
          </time>{" "}
          -{" "}
          <time dateTime={event.event.shiftEnd}>
            {TimeHelper.extractHourFromDate(endDateTime)}
          </time>
        </p>
      </div>
      <Menu
        as="div"
        className="relative opacity-0 focus-within:opacity-100 group-hover:opacity-100"
      >
        <div>
          <Menu.Button className="-m-2 flex items-center rounded-full p-1.5 text-gray-500 hover:text-gray-600">
            <span className="sr-only">Open options</span>
          </Menu.Button>
        </div>

        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 z-10 mt-2 origin-top-right bg-white rounded-md shadow-lg w-36 ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="py-1">
              <Menu.Item>
                {({ active }) => (
                  <a
                    href="#"
                    className={classNames(
                      active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                      "block px-4 py-2 text-sm",
                    )}
                  >
                    Edit
                  </a>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <a
                    href="#"
                    className={classNames(
                      active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                      "block px-4 py-2 text-sm",
                    )}
                  >
                    Cancel
                  </a>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </li>
  );
}
