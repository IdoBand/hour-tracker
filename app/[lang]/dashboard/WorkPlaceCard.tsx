"use client";
import { Shift, WorkPlace } from "@/types/types";
import {
  dashBoardWorkPlaceHeader,
  checkboxRemoveStyle,
} from "@/app/[lang]/(hooks)/mixin";
import Link from "next/link";
import { TimeHelper } from "../../../services/TimeHelper";
import { ShiftsManipulator } from "../../[lang]/(hooks)/ShiftsManipulator";
import { SquaresPlusIcon, ChartBarIcon } from "@heroicons/react/24/solid";
import CustomButton from "../../../components/CustomButton";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  deleteIdFromRemoveArray,
  addIdToRemoveArray,
  setCurrentWorkPlace,
  setCurrentDate,
} from "@/redux/workPlaceSlice";
import AddEditShift from "./[workPlaceId]/AddEditShiftForm";
import Modal from "../../../components/Modal";
import { useState } from "react";
import { startOfToday } from "date-fns";
import useCurrentLocale from "../(hooks)/useCurrentLocale";
export function prepareShiftsForTotalTimeCalculation(shifts: Shift[]) {
  if (shifts.length) {
    const dates =
      ShiftsManipulator.prepareShiftsDatesForTotalCalculation(shifts);
    return TimeHelper.calculateTimeMultipleDates(dates);
  }
  return "0";
}

interface WorkPlaceCardProps {
  workPlace: WorkPlace;
  totalHours: string | number;
  hoursPastWeek: string | number;
  hoursPastMonth: string | number;
  employmentDuration: string;
  dashboardDict: any
}
export default function WorkPlaceCard({
  workPlace,
  totalHours,
  hoursPastWeek,
  hoursPastMonth,
  employmentDuration,
  dashboardDict
}: WorkPlaceCardProps) {
  const { locale } = useCurrentLocale()
  const removeButtons: boolean = useAppSelector(
    (state) => state.workPlaceSlice.workPlaceRemoveButtons,
  );
  const idsRemoveArray: string[] = useAppSelector(
    (state) => state.workPlaceSlice.removePlacesIdArray,
  );
  const [quickAdd, setQuickAdd] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  function handleCheckBoxClick(workPlaceId: string) {
    if (idsRemoveArray.includes(workPlaceId)) {
      dispatch(deleteIdFromRemoveArray(workPlaceId));
    } else {
      dispatch(addIdToRemoveArray(workPlaceId));
    }
  }

  function handleWorkPlaceClick(workPlace: WorkPlace) {
    // make dates serializable for redux

    if (typeof workPlace.employmentStartDate !== "string")
      workPlace.employmentStartDate = TimeHelper.serializeDate(
        workPlace.employmentStartDate as Date,
      );
    if (
      workPlace.employmentEndDate &&
      typeof workPlace.employmentEndDate !== "string"
    ) {
      workPlace.employmentEndDate = TimeHelper.serializeDate(
        workPlace.employmentEndDate as Date,
      );
    }
    if (workPlace.lastShift && typeof workPlace.lastShift !== "string") {
      workPlace.lastShift = TimeHelper.serializeDate(
        workPlace.lastShift as Date,
      );
    }
    dispatch(setCurrentDate(TimeHelper.serializeDate(startOfToday())));
    dispatch(setCurrentWorkPlace({ ...workPlace, employmentDuration }));
  }

  return (
    <div className="relative">
      {removeButtons && (
        <input
          data-key={workPlace.id}
          type="checkbox"
          checked={idsRemoveArray.includes(workPlace.id as string)}
          onClick={(e) => e.stopPropagation()}
          onChange={() => handleCheckBoxClick(workPlace.id as string)}
          className={checkboxRemoveStyle}
        />
      )}
      <div className="flex justify-between">
        <div className={`flex flex-col`}>
          <div
            className={`${workPlace.isCurrent ? "text-secondary" : "DARK"} ${dashBoardWorkPlaceHeader} w-full mb-4`}
          >
            {workPlace.name}
            {workPlace.isCurrent && (
              <pre className="text-xs text-dark font-light h-full flex items-end">
                {" "}
                {dashboardDict.current}
              </pre>
            )}
          </div>
          <div className="sm:flex xs:flex-col">
            <span className="font-semibold md:text-sm sm:text:xs">
            {dashboardDict.totalH}:{" "}
            </span>
            <span className="md:text-sm sm:text-xs">{totalHours}</span>
          </div>
          <div className="sm:flex xs:flex-col">
            <span className="font-semibold md:text-sm sm:text:xs">
            {dashboardDict.HoursPW}:{" "}
            </span>
            <span className="md:text-sm sm:text-xs">{hoursPastWeek}</span>
          </div>
          <div className="sm:flex xs:flex-col">
            <span className="font-semibold md:text-sm sm:text:xs">
            {dashboardDict.HoursPM}:{" "}
            </span>
            <span className="md:text-sm sm:text-xs">{hoursPastMonth}</span>
          </div>
          <div className="sm:flex xs:flex-col">
            <span className="font-semibold md:text-sm sm:text:xs">
            {dashboardDict.employmentDuration}:{" "}
            </span>
            <span className="md:text-sm sm:text-xs">{employmentDuration}</span>
          </div>
        </div>
        <div className={`flex justify-center items-end flex-col gap-4`}>
          <CustomButton
            className="shadow-xl rounded-full p-2 ml-4 mt-3 w-max group"
            hoverText="Statistics"
            where="down"
            onClick={() => {
              handleWorkPlaceClick(workPlace);
            }}
            type="button"
          >
            <Link href={`/${locale}/dashboard/${workPlace.id}`} className="w-full h-full">
              <ChartBarIcon className="w-6 h-6 group-hover:fill-secondary" />
            </Link>
          </CustomButton>
          <CustomButton
            className="shadow-xl rounded-full p-2 ml-4 mt-3 w-max group"
            hoverText="Quick Add"
            where="down"
            onClick={(e: MouseEvent) => {
              e.preventDefault();
              handleWorkPlaceClick(workPlace);
              setQuickAdd(true);
            }}
            type="button"
          >
            <SquaresPlusIcon className="w-6 group-hover:fill-secondary" />
          </CustomButton>
        </div>
      </div>
      {quickAdd && (
        <Modal onClose={() => setQuickAdd(false)}>
          <AddEditShift addOrEdit="add" onClose={() => setQuickAdd(false)} />
        </Modal>
      )}
    </div>
  );
}
