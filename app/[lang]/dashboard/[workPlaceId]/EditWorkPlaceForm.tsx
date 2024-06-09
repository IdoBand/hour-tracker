import { useForm } from "react-hook-form";
import { WorkPlace } from "@/types/types";
import { useState } from "react";
import Button from "@/components/Button";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useCalendarRow } from "@/app/[lang]/(hooks)/useCalendarRow";
import { TimeHelper } from "@/services/TimeHelper";
import { fetchEditWorkPlace } from "@/util/workPlaceFetchers";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { setIsFetching } from "@/redux/windowSlice";
import { setCurrentWorkPlace } from "@/redux/workPlaceSlice";
interface EditWorkPlaceFormProps {
  workPlace: WorkPlace;
  onClose: () => void;
  workPlaceDict: any
}
const formSectionContainer = "flex w-full justify-between gap-3 xs:flex-col";
const EditWorkPlaceForm = ({ workPlace, onClose, workPlaceDict }: EditWorkPlaceFormProps) => {
  const router = useRouter();
  const currentWorkPlace = useAppSelector(
    (state) => state.workPlaceSlice.currentWorkPlace,
  );
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setError,
    clearErrors,
    setValue,
    reset,
  } = useForm();
  const dispatch = useAppDispatch();
  const { toast } = useToast();
  const { calendarRow, selectedDate } = useCalendarRow(
    TimeHelper.deserializeDate(workPlace.employmentStartDate as string),
    "right",
  );

  async function extractFormData(data: WorkPlace) {
    const updatedInfo: WorkPlace = {
      id: currentWorkPlace!.id,
      userId: currentWorkPlace!.userId,
      name: data.name,
      employmentStartDate: selectedDate,
      employmentEndDate: null,
      isCurrent: data.isCurrent,
      wagePerHour: +data.wagePerHour,
      isBreakPaid: data.isBreakPaid,
      lastShift: null,
    };
    dispatch(setIsFetching());
    try {
      const response = await fetchEditWorkPlace(updatedInfo);
      if (response.success) {
        router.refresh();
        toast({
          title: "Success",
          description: "Work Place was edited successfully",
          variant: "info",
        });
        const { employmentStartDate, employmentEndDate, lastShift } =
          TimeHelper.serializeWorkPlaceDates(
            updatedInfo.employmentStartDate as Date,
            updatedInfo.employmentEndDate as null,
            updatedInfo.lastShift as null,
          );
        dispatch(
          setCurrentWorkPlace({
            ...updatedInfo,
            employmentStartDate: employmentStartDate as string,
            employmentEndDate: employmentEndDate,
            lastShift: lastShift,
          }),
        );
        onClose();
      }
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to edit Work Place",
        variant: "destructive",
      });
    } finally {
      dispatch(setIsFetching());
    }
  }
  return (
    <form
      onSubmit={handleSubmit((data) => extractFormData(data as WorkPlace))}
      className="relative flex flex-col gap-4"
    >
      <div className={`${formSectionContainer} mt-7`}>
        <label className="font-semibold">{workPlaceDict.wPName}:</label>
        <input
          type="text"
          {...register("name")}
          defaultValue={currentWorkPlace!.name}
        />
      </div>
      <div className={`${formSectionContainer}`}>
        <label className="font-semibold">{workPlaceDict.currentlyEmployed}</label>
        <input
          type="checkbox"
          defaultChecked={currentWorkPlace?.isCurrent}
          {...register("isCurrent")}
        />
      </div>
      <div className={`${formSectionContainer}`}>
        <label className="font-semibold">{workPlaceDict.paidOnBreak}</label>
        <input
          type="checkbox"
          defaultChecked={currentWorkPlace?.isBreakPaid}
          {...register("isBreakPaid")}
        />
      </div>
      <div className={`${formSectionContainer}`}>
        <label className="font-semibold">{workPlaceDict.startDate}:</label>
        {calendarRow}
      </div>
      <div className={`${formSectionContainer} mb-7`}>
        <span className="flex items-center gap-5 xs:flex-col xs:gap-0 mb-5">
          <span className="font-semibold">{workPlaceDict.wph}: </span>
          <span>
            <input
              {...register("wagePerHour", { required: true })}
              type="number"
              min={0}
              defaultValue={workPlace.wagePerHour}
              className="w-14 appearance-none outline-none p-[2px] rounded-md"
            />
            {`₪`}
          </span>
        </span>
      </div>
      <Button
        theme="full"
        type="submit"
        className="absolute right-0 bottom-0 text-xs mt-2 px-0 py-[3px] sm:mt-1"
        text="Save"
      />
    </form>
  );
};

export default EditWorkPlaceForm;
