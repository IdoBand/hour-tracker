"use client";
import { useForm } from "react-hook-form";
import { formHeader } from "@/app/[lang]/(hooks)/mixin";
import Button from "../../../components/Button";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { WorkPlace } from "@/types/types";
import { fetchAddWorkPlace } from "@/util/workPlaceFetchers";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { setIsFetching } from "@/redux/windowSlice";
import { useCalendarRow } from "../../[lang]/(hooks)/useCalendarRow";
export interface FormProps {
  onClose: () => void;
  dict: any
}
const addNewWorkPlaceFormSection =
  "flex justify-between w-full mb-6 md:flex-col";

export interface TextLineInputProps {
  name: string;
  label: string;
  type?: "text" | "number";
  isRequired: boolean;
  autoComplete?: string;
  value?: string | number;
}

const AddNewWorkPlaceForm = ({ onClose, dict: dashboardDict}: FormProps) => {
  const router = useRouter();
  const user = useAppSelector((state) => state.userSlice.user);
  const dispatch = useAppDispatch();
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
  const { calendarRow, selectedDate } = useCalendarRow();
  const { toast } = useToast();
  const TextLineInput = ({
    name,
    label,
    type = "text",
    isRequired,
    autoComplete,
    value,
  }: TextLineInputProps) => {
    return (
      <div className={`flex flex-col mb-6 w-full`}>
        <div className={`flex justify-between w-full md:flex-col`}>
          <label>{label}</label>
          <input
            {...register(`${name}`, { required: isRequired })}
            type={type}
            className={`outline-none rounded-md w-2/5 px-1 md:w-full`}
            value={value}
          />
        </div>
        <span
          className={`${errors[name] ? "text-red-500" : "text-light"} pointer-events-none w-max-content block md:text-xs`}
        >
          {errors[name] && `${label} is required`}
        </span>
      </div>
    );
  };
  const NumberLineInput = ({
    name,
    label,
    type = "text",
    isRequired,
    autoComplete,
  }: TextLineInputProps) => {
    return (
      <div className={`flex flex-col mb-6`}>
        <div className={`flex justify-between w-full md:flex-col`}>
          <label>{label}</label>
          <input
            {...register(`${name}`, { required: isRequired })}
            type={type}
            className={`outline-none rounded-md w-2/5 px-1 md:w-full`}
            min={0}
          />
        </div>
        <span
          className={`${errors[name] ? "text-red-500" : "text-light"} pointer-events-none w-max-content block md:text-xs`}
        >
          {errors[name] && `${label} is required`}
        </span>
      </div>
    );
  };
  const CheckBoxInput = (name: string, label: string) => {
    return (
      <>
        <label>{label}</label>
        <input
          type="checkbox"
          defaultChecked
          {...register(name, { required: false })}
        />
      </>
    );
  };
  async function extractData(data: any) {
    dispatch(setIsFetching());
    const response = await fetchAddWorkPlace({
      userId: user!.email,
      name: data.workPlaceName,
      employmentStartDate: selectedDate,
      employmentEndDate: null,
      isCurrent: data.isCurrent,
      wagePerHour: data.wagePerHour,
      isBreakPaid: data.isBreakPaid,
      lastShift: null,
    });

    if (response.success) {
      router.refresh();
      toast({
        title: "Success",
        description: "Work Place added successfully",
        variant: "info",
      });
      onClose();
      dispatch(setIsFetching());
    } else {
      toast({
        title: "Error",
        description: "Failed to add Work Place",
        variant: "destructive",
      });
    }
  }
  return (
    <>
      <form
        onSubmit={handleSubmit((data) => {
          extractData(data);
        })}
        className={`w-full flex-col rounded-br-2xl rounded-3xl p-8
        bg-light shadow-2xl
        lg:flex-col lg:p-8 xs:rounded-2xl xs:rounded-br-3xl xs:p-4`}
      >
        <h1 className={`${formHeader}`}>{dashboardDict.addWP}</h1>
        <div className="w-full flex md:flex-col">
          <div className={`w-1/2 flex mt-4 flex-col md:w-full mr-16`}>
            <TextLineInput
              label={dashboardDict.wPName}
              name="workPlaceName"
              type="text"
              isRequired={true}
            />
            <NumberLineInput
              label={dashboardDict.wph}
              name="wagePerHour"
              type="number"
              isRequired={true}
            />
            <div className={`${addNewWorkPlaceFormSection}`}>
              <label>{dashboardDict.startDate}</label>
              {calendarRow}
            </div>
          </div>
          <div className="w-1/2  md:w-full">
            <div className={`w-full text-center mb-6 font-semibold`}>
            {dashboardDict.checkV}
            </div>
            <div className={`${addNewWorkPlaceFormSection}`}>
              {CheckBoxInput("isCurrent", `${dashboardDict.currentlyEmployed}`)}
            </div>
            <div className={`${addNewWorkPlaceFormSection}`}>
              {CheckBoxInput("isBreakPaid", `${dashboardDict.paidOnBreak}`)}
            </div>
          </div>
        </div>
        <div className={`w-full flex justify-end gap-4`}>
          <Button
            type="button"
            theme="blank"
            text={dashboardDict.discard} 
            onClick={() => {
              onClose();
              reset();
            }}
            className=""
          />
          <Button type="submit" theme="full" text={dashboardDict.addButton} className="" />
        </div>
      </form>
    </>
  );
};

export default AddNewWorkPlaceForm;
