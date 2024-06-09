import { useState } from "react";
import { motion } from "framer-motion";
import { EllipsisHorizontalCircleIcon } from "@heroicons/react/24/solid";
import { checkboxRemoveStyle } from "@/app/[lang]/(hooks)/mixin";
import { TimeHelper } from "@/services/TimeHelper";
import { flexCenter } from "@/app/[lang]/(hooks)/mixin";
import Button from "@/components/Button";
import Modal from "@/components/Modal";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  deleteIdFromRemoveArray,
  addIdToRemoveArray,
} from "@/redux/shiftSlice";
import AddEditShiftForm from "./AddEditShiftForm";
import CheckOrX from "@/components/CheckOrX";
import { Shift } from "@/types/types";
import MotionArrow from "@/components/MotionArrow";

const shiftPropertyContainer = "w-full";
const slideDownDiv = {
  // when using this -> add to motion.div className 'overflow-hidden'
  initial: {
    height: 0,
    opacity: 0,
  },
  animate: {
    opacity: 1,
    height: "auto",
    transition: {
      duration: 1,
    },
  },
  exit: {
    opacity: 0,
    height: 0,
  },
};

interface ShiftCardProps {
  shift: Shift;
  removeButtons: boolean;
  shiftStackDict: any
}
export default function ShiftCard({ removeButtons, shift, shiftStackDict }: ShiftCardProps) {
  const dispatch = useAppDispatch();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [removalModal, setRemovalModal] = useState<boolean>(false);
  const [shiftOptionsMenu, setShiftOptionsMenu] = useState<boolean>(false);
  const [editMode, setEditMode] = useState<boolean>(false);
  const removeShiftsIdArray = useAppSelector(
    (state) => state.shiftSlice.removeShiftsIdArray,
  );
  // shiftData is holds the shift info after manipulation in order to show to the user
  const shiftData = {
    shiftDate: TimeHelper.ddmmyyyyDate(shift.shiftStart as Date),
    shiftStart: TimeHelper.extractHourFromDate(shift.shiftStart as Date),
    shiftEnd: TimeHelper.extractHourFromDate(shift.shiftEnd as Date),
    shiftDuration: TimeHelper.calculateTimeTwoDates(
      shift.shiftStart as Date,
      shift.shiftEnd as Date,
    ),
    breakStart: TimeHelper.extractHourFromDate(shift.breakStart as Date),
    breakEnd: TimeHelper.extractHourFromDate(shift.breakEnd as Date),
    breakDuration: TimeHelper.calculateTimeTwoDates(
      shift.breakStart as Date,
      shift.breakEnd as Date,
    ),
  };
  function handleCheckBoxClick(shiftId: string) {
    if (removeShiftsIdArray.includes(shiftId)) {
      dispatch(deleteIdFromRemoveArray(shiftId));
    } else {
      dispatch(addIdToRemoveArray(shiftId));
    }
  }

  return (
    <div
      className={`w-full flex justify-between flex-col rounded-lg py-1 cursor-pointer relative`}
    >
      {removeButtons && (
        <input
          data-key={shift.id}
          type="checkbox"
          checked={removeShiftsIdArray.includes(shift.id!)}
          onClick={(e) => e.stopPropagation()}
          onChange={(e) => {
            handleCheckBoxClick(e.target.dataset.key as string);
          }}
          className={checkboxRemoveStyle}
        />
      )}
      <div
        className={`w-full grid grid-cols-7 grid-flow-col rounded-lg px-2 py-1 
                ${isOpen && "bg-gray-200"}
                border border-black hover:bg-sky-100
                lg:grid-cols-3 lg:text-sm
                `}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <span className={`w-full order-8`}>
          <MotionArrow isOpen={isOpen} />
        </span>
        <span className={`col-start-1 col-end-2 w-full`}>
          {shiftData.shiftDate}
        </span>
        <span
          className={`col-start-2 col-end-3 w-full lg:flex lg:justify-center`}
        >
          {shiftData.shiftStart}
        </span>
        <span
          className={`col-start-3 col-end-4 w-full lg:flex lg:justify-center`}
        >
          {shiftData.shiftEnd}
        </span>
        <span className={`col-start-4 col-end-5 w-full lg:hidden`}>
          {shiftData.shiftDuration}
        </span>
        <span className={`col-start-5 col-end-6 w-full lg:hidden`}>
          {shiftData.breakDuration}
        </span>
        <span className={`col-start-6 col-end-7 w-full lg:hidden`}>
          <CheckOrX itemToCheck={shift.iWorkedOn} />
        </span>
        <span className={`col-start-7 col-end-8 w-full lg:hidden`}>
          <CheckOrX itemToCheck={shift.notes} />
        </span>
      </div>
      {isOpen && (
        <motion.article
          variants={slideDownDiv}
          initial="initial"
          animate="animate"
          exit="exit"
          className={`w-full min-h-max shadow-md rounded-lg px-2 py-1 overflow-hidden cursor-default`}
        >
          {editMode ? (
            <AddEditShiftForm
              addOrEdit="edit"
              onClose={() => setEditMode(false)}
              shift={shift}
              shiftStackDict={shiftStackDict}
            />
          ) : (
            <div className="p-8 flex gap-4 relative md:flex-col md:p-2">
              <div className="w-2/6 flex flex-col gap-2 lg:w-full">
                <div className={`${shiftPropertyContainer}`}>
                  <span className="font-semibold">{shiftStackDict.shiftS}: </span>
                  <span>{shiftData.shiftStart}</span>
                </div>
                <div className={`${shiftPropertyContainer}`}>
                  <span className="font-semibold">{shiftStackDict.shiftE}: </span>
                  <span>{shiftData.shiftEnd}</span>
                </div>
                <div className={`${shiftPropertyContainer}`}>
                  <span className="font-semibold">{shiftStackDict.shiftD}: </span>
                  <span>{shiftData.shiftDuration}</span>
                </div>
                <div className={`${shiftPropertyContainer}`}>
                  <span className="font-semibold">{shiftStackDict.wph}: </span>
                  <span>{`${shift.wagePerHour} ₪`}</span>
                </div>
                <div className={`${shiftPropertyContainer}`}>
                  <span className="font-semibold">{shiftStackDict.tipBonus}: </span>
                  <span>{`${shift.tipBonus} ₪`}</span>
                </div>
                <div className={`${shiftPropertyContainer}`}>
                  <span className="font-semibold">{shiftStackDict.BreakD}: </span>
                  <span>{shiftData.breakDuration}</span>
                </div>
                {shiftData.breakDuration !== "0" && (
                  <>
                    <div className={`${shiftPropertyContainer}`}>
                      <span className="font-semibold">{shiftStackDict.BreakS}: </span>
                      <span>{shiftData.breakStart}</span>
                    </div>
                    <div className={`${shiftPropertyContainer}`}>
                      <span className="font-semibold">{shiftStackDict.BreakE}: </span>
                      <span>{shiftData.breakEnd}</span>
                    </div>
                  </>
                )}
                <div className={`${shiftPropertyContainer}`}>
                  <span className="font-semibold">{shiftStackDict.paidOnBreak}: </span>
                  <span>{shift.isBreakPaid ? "Yes" : "No"}</span>
                </div>
              </div>
              <div className={"w-4/6 flex flex-col gap-2 lg:w-full"}>
                <div className="flex flex-col">
                  <div className="font-semibold">{shiftStackDict.iWorkedOn}:</div>
                  {shift.iWorkedOn}
                </div>
                <div className="flex flex-col">
                  <div className="font-semibold">{shiftStackDict.notes}:</div>
                  {shift.notes}
                </div>
              </div>
              <div className="absolute right-4 top-4 cursor-pointer">
                <EllipsisHorizontalCircleIcon
                  onClick={() => setShiftOptionsMenu((prev) => !prev)}
                  className="w-5 relative"
                />
                {shiftOptionsMenu && (
                  <div className="flex items-end flex-col gap-2 bg-light shadow-xl p-4 rounded-lg absolute right-0 top-10">
                    <Button
                      theme="full"
                      onClick={() => {
                        setEditMode(true);
                        setShiftOptionsMenu(false);
                      }}
                      className="text-xs px-7"
                      text="Edit"
                      type="button"
                    />
                    <Button
                      theme="full"
                      onClick={() => {
                        setRemovalModal(true);
                        setShiftOptionsMenu(false);
                      }}
                      className="text-xs"
                      text="Remove"
                      type="button"
                    />
                  </div>
                )}
              </div>
            </div>
          )}
        </motion.article>
      )}
      {removalModal && (
        <Modal onClose={() => setRemovalModal(false)} className="">
          <div className="flex flex-col gap-8 px-8 py-4">
            Are you sure you want to remove this shift?
            <div className={`${flexCenter} gap-4 `}>
              <Button
                theme="blank"
                onClick={() => setRemovalModal(false)}
                className=""
                text="No"
                type="button"
              />
              <Button
                theme="full"
                onClick={() => {
                  setIsOpen(false);
                  setRemovalModal(false);
                }}
                className=""
                text="Yes"
                type="button"
              />
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
