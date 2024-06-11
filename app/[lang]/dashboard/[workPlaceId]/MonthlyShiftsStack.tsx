"use client";
import { useState } from "react";
import ShiftCard from "./ShiftCard";
import { Shift } from "@/types/types";
import AddRemoveButtons from "@/components/AddRemoveButtons";
import FramerSpringRotate from "@/components/FramerSpringRotate";
import AddEditShiftForm from "./AddEditShiftForm";
import {
  ArrowUpCircleIcon,
  EllipsisHorizontalCircleIcon,
  XCircleIcon,
} from "@heroicons/react/24/solid";
import { dashBoardWorkPlaceHeader } from "@/app/[lang]/(hooks)/mixin";
import { TimeHelper } from "@/services/TimeHelper";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { ShiftsManipulator } from "@/app/[lang]/(hooks)/ShiftsManipulator";
import {
  addAllShiftsIdsToRemoveArray,
  setShiftRemoveButtons,
} from "@/redux/shiftSlice";
import { fetchRemoveShifts } from "@/util/shiftFetchers";
import { setIsFetching } from "@/redux/windowSlice";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
interface Props {
  shifts: Shift[];
  overviewDict: any
  shiftStackDict: any
}
const MonthlyShiftsStack = ({ shifts, overviewDict, shiftStackDict }: Props) => {
  const removeButtons = useAppSelector(
    (state) => state.shiftSlice.shiftRemoveButtons,
  );
  const [addShiftForm, setAddEditShiftForm] = useState<boolean>(false);
  const currentDate = useAppSelector(
    (state) => state.workPlaceSlice.currentDate,
  );
  const idsToRemove = useAppSelector(
    (state) => state.shiftSlice.removeShiftsIdArray,
  );
  const currentWorkPlace = useAppSelector(
    (state) => state.workPlaceSlice.currentWorkPlace,
  );
  const currentMonthShifts = ShiftsManipulator.filterShiftsByMonthAndYear(
    shifts,
    TimeHelper.deserializeDate(currentDate),
  );
  const dispatch = useAppDispatch();
  const { toast } = useToast();
  const router = useRouter();
  function handleSelectAllClick() {
    const ids = currentMonthShifts.map((shift: Shift) => {
      return shift.id;
    });
    dispatch(addAllShiftsIdsToRemoveArray(ids as string[]));
  }
  async function handleRemovePermanentlyClick() {
    if (idsToRemove.length) {
      dispatch(setIsFetching());
      const result = await fetchRemoveShifts(
        idsToRemove,
        currentWorkPlace!.id as string,
      );
      if (result.success) {
        router.refresh();
        toast({
          title: "Success",
          description: "Shift removed Successfully",
          variant: "info",
        });
      } else {
        toast({
          title: "Error",
          description: "Failed remove shift",
          variant: "destructive",
        });
      }
      dispatch(setIsFetching());
    }
  }

  return (
    <>
      <div className={`flex justify-between w-full`}>
        <h1 className={`${dashBoardWorkPlaceHeader}`}>{overviewDict.shifts}</h1>
        <AddRemoveButtons
          removeButtons={removeButtons}
          setRemoveButtons={() => dispatch(setShiftRemoveButtons())}
          handleAddClick={() => setAddEditShiftForm(true)}
          handleSelectAll={handleSelectAllClick}
          handleRemovePermanentlyClick={handleRemovePermanentlyClick}
          addHoverText={shiftStackDict.addShift}
          removeHoverText={shiftStackDict.removeShift}
        />
      </div>
      {addShiftForm && (
        <FramerSpringRotate className="shadow-2xl rounded-2xl relative z-20">
          <AddEditShiftForm
            addOrEdit="add"
            onClose={() => setAddEditShiftForm(false)}
            shiftStackDict={shiftStackDict}
          />
        </FramerSpringRotate>
      )}
      <div className="w-full gap-2">
        <div
          className={`w-full bg-sky-200 rounded-lg grid grid-cols-7 grid-flow-col px-2 py-1
            lg:grid-cols-3
          `}
        >
          <span className={`w-full flex order-8 opacity-0`}>
            <ArrowUpCircleIcon className="w-5" />
          </span>
          <span
            className={`col-start-1 col-end-2 w-full lg:flex lg:justify-center`}
          >
            {overviewDict.date}
          </span>
          <span
            className={`col-start-2 col-end-3 w-full lg:flex lg:justify-center`}
          >
            {overviewDict.start}
          </span>
          <span
            className={`col-start-3 col-end-4 w-full lg:flex lg:justify-center`}
          >
            {overviewDict.end}
          </span>
          <span className={`col-start-4 col-end-5 w-full lg:hidden`}>
            {overviewDict.duration}
          </span>
          <span className={`col-start-5 col-end-6 w-full lg:hidden`}>
            {overviewDict.break}
          </span>
          <span className={`col-start-6 col-end-7 w-full lg:hidden`}>
            {overviewDict.iWorkedOn}
          </span>
          <span className={`col-start-7 col-end-8 w-full lg:hidden`}>
            {overviewDict.notes}
          </span>
        </div>
        <div className="w-full gap-2 flex-col mb-36">
          {currentMonthShifts.length > 0 ? (
            currentMonthShifts.map((shift) => {
              return (
                <div key={shift.id} className="w-full">
                  <ShiftCard shift={shift} removeButtons={removeButtons} shiftStackDict={overviewDict} />
                </div>
              );
            })
          ) : (
            <h2 className="w-full text-center my-4">{overviewDict.noShifts}</h2>
          )}
        </div>
      </div>
    </>
  );
};

export default MonthlyShiftsStack;
