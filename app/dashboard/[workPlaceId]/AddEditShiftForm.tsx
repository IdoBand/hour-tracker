'use client'
import { ReactNode, useState } from 'react';
import { useForm } from 'react-hook-form';
import Button from '@/components/Button';
import { Shift } from '@/types/types';
import { TimeHelper } from '@/services/TimeHelper';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { formHeader } from '@/app/(hooks)/mixin';
import { WorkPlace } from '@/types/types';
import { TextLineInputProps } from '../AddWorkPlaceForm';
import { useFullDate } from '@/app/(hooks)/useFullDate';
import startOfToday from 'date-fns/startOfToday';
import { fetchAddShift, fetchEditShift } from '@/util/shiftFetchers';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useToast } from '@/components/ui/use-toast';
import { setIsFetching } from '@/redux/windowSlice';
interface AddEditShiftProps {
  addOrEdit: 'add' | 'edit'
  onClose: () => void
  shift?: Shift
}
interface FullDateInputProps {
  label: string
  fullDatePicker: ReactNode
}
interface ShiftFormData {
  iWorkedOn: string
  notes: string,
  wagePerHour: number
  tipBonus: number
  isBreakPaid: boolean
}
const FullDateInput = ({label, fullDatePicker}: FullDateInputProps) => {
  return (
    <div className={`mb-9 w-full flex justify-between items-center flex-wrap lg:flex-col relative`}>
            <label>{label}</label>
            {fullDatePicker}
    </div>
  )
}

const AddEditShift = ({addOrEdit, onClose, shift }: AddEditShiftProps) => {
  const session = useSession()
  const [formIssues, setFormIssues] = useState<string[]>([])
  const currentWorkPlace: WorkPlace = useAppSelector(state => state.workPlaceSlice.currentWorkPlace as WorkPlace)
  const { register, handleSubmit, watch, formState: { errors }, setError, clearErrors, setValue, reset } = useForm();
  const dispatch = useAppDispatch()
  const router = useRouter()
  const { toast } = useToast()

  const NumberLineInput = ({name, label, type='text', isRequired, value, autoComplete}: TextLineInputProps) => {
    return (
        <div className={`flex flex-col mb-6 w-[80%]`}>
            <div className={`flex justify-between w-full flex-col`}>
                <label>{label}</label>
                <input
                    {...register(`${name}`,{ required: isRequired })} 
                    type={type} 
                    className={`outline-none rounded-md w-2/5 px-1 md:w-full`}
                    min={0}
                    defaultValue={value}
                    />
            </div>
            <span className={`${errors[name] ? 'text-red-500' : 'text-light'} pointer-events-none w-max-content block md:text-xs`}>{errors[name] && `${label} is required`}</span>
        </div>
        )
  }


  const { visualFullDate: shiftStartVD, selectedFullDate: shiftStartFD } = useFullDate(
    addOrEdit === 'add' ? undefined : shift!.shiftStart as Date,
    shift ? TimeHelper.extractHourFromDate(shift!.shiftStart) : '')
  const { visualFullDate: shiftEndVD, selectedFullDate: shiftEndFD } = useFullDate(
    addOrEdit === 'add' ? undefined : shift!.shiftEnd as Date,
    shift ? TimeHelper.extractHourFromDate(shift!.shiftEnd) : '')
  const { visualFullDate: breakStartVD, selectedFullDate: breakStartFD } = useFullDate(
    addOrEdit === 'add' ? undefined : shift!.breakStart as Date,
    shift ? TimeHelper.extractHourFromDate(shift!.breakStart as Date) : '')
  const { visualFullDate: breakEndVD, selectedFullDate: breakEndFD } = useFullDate(
    addOrEdit === 'add' ? undefined : shift!.breakEnd as Date,
    shift ? TimeHelper.extractHourFromDate(shift!.breakEnd as Date) : '')

  async function extractData(data: ShiftFormData) {

    const shiftStartDate = shiftStartFD
    const shiftEndDate = shiftEndFD
    const breakStartDate = breakStartFD
    const breakEndDate = breakEndFD
    const validation = TimeHelper.validateShiftTimes(shiftStartDate, shiftEndDate, breakStartDate, breakEndDate)
    
    if (validation.isDataValid) {
      dispatch(setIsFetching())
      const newShift: Shift = {
        userId: session.data?.user?.email as string,
        workPlaceId: currentWorkPlace.id as string,
        shiftStart: shiftStartDate,
        shiftEnd: shiftEndDate,
        breakStart: breakStartDate,
        breakEnd: breakEndDate,
        iWorkedOn: data.iWorkedOn,
        notes: data.notes,
        wagePerHour: data.wagePerHour,
        tipBonus: data.tipBonus,
        isBreakPaid: data.isBreakPaid,
      }

      try {
        let result;
        const toastObject = {
          title: "Success",
          description: '',
          variant: "info" as "info"
        }
        if (addOrEdit === 'add') {
          result = await fetchAddShift(newShift as Shift)
          toastObject.description = 'Shift was added successfully'
        } else if (addOrEdit == 'edit') {
          newShift.id = shift!.id
          result = await fetchEditShift(newShift as Shift)
          toastObject.description = 'Shift was updated successfully'
        }
        if (result.success) {
          router.refresh()
          toast(toastObject)
        } else {
            throw new Error('')
        }
      } catch (err) {
        toast({
          title: "Error",
          description: "Failed to complete shift request",
          variant: 'destructive'
        })
      } finally {
        dispatch(setIsFetching())
        setFormIssues([])
        onClose()
      }
    } else {
      setFormIssues(validation.issues)
    }
  }
  return (
    <form onSubmit={handleSubmit(data => {
      extractData(data as ShiftFormData);
    })}
      className={`min-w-[45rem] max-w-full flex flex-col rounded-br-2xl rounded-3xl p-8 bg-light lg:p-2 md:min-w-[5rem]`}
    >
      <h1 className={formHeader}>Add a Shift to {useAppSelector(state => state.workPlaceSlice.currentWorkPlace?.name)}</h1>
      <div className={`flex w-full lg:flex-col lg:justify-center lg:items-center`}>
        <div className={`w-1/3 pb-16 pt-8 lg:w-full lg:pb-0`}>
          <FullDateInput label="Shift Start" fullDatePicker={shiftStartVD} />
          <FullDateInput label="Shift End" fullDatePicker={shiftEndVD} />
          <FullDateInput label="Break Start" fullDatePicker={breakStartVD} />
          <FullDateInput label="Break End" fullDatePicker={breakEndVD} />
        </div>
        <div className={`w-2/3 flex justify-start items-center flex-col pt-8
            lg:w-full lg:pt-0 lg:items-center
        `}>
          <div className={`w-full flex flex-col justify-center items-center`}>
            <label className='w-[80%] mb-1'>I Worked On:</label>
            <textarea defaultValue={addOrEdit === 'edit' ? shift!.iWorkedOn : ''}
              className={`w-[80%] outline-none p-1 mb-10`}
              {...register('iWorkedOn', {required: false})}
            />
          </div>
          <div className={`w-full flex flex-col justify-center items-center`}>
            <label className='w-[80%] mb-1'>Notes:</label>
            <textarea defaultValue={addOrEdit === 'edit' ? shift!.notes : ''}
              className={`w-[80%] outline-none p-1 mb-10`}
              {...register('notes', {required: false})}
            />
          </div>
          <NumberLineInput name='wagePerHour' label='Wage Per Hour' type='number' isRequired={true} value={addOrEdit === 'add' ? currentWorkPlace.wagePerHour.toString() : shift!.wagePerHour} />
          <NumberLineInput name='tipBonus' label='Tip / Bonus' type='number' isRequired={true} value={addOrEdit === 'add' ? 0 : shift!.tipBonus} />
          <div className={`flex flex-col mb-6 w-[80%]`}>
            <div className={`flex justify-between w-1/2`}>
              <label htmlFor="isBreakPaid">Are You paid On Break?</label>
              <input 
                {...register('isBreakPaid', {required: false})}
                type="checkBox"
                className='' 
                name="isBreakPaid" 
                defaultChecked={addOrEdit === 'edit' ? shift!.isBreakPaid : currentWorkPlace.isBreakPaid} />
            </div>
        </div>
          
          
        </div>

      </div>
      {formIssues.length > 0 &&
        <div className='w-full'>
          <div className='font-semibold'>
            Looks like we have got some issues with the timing:
          </div>
          {formIssues.map((issue, idx) => {
            return <div key={idx} className='w-full text-danger'>{issue}</div>
          })}
      </div>}
      <div className={`w-full flex justify-end gap-4`}>
        <Button type='button' theme='blank' text='Discard' onClick={onClose} className='' />
        <Button type='submit' theme='full' text={addOrEdit === 'add' ? 'Add' : 'Save Changes'} className='' />
      </div>
    </form>
  )
}

export default AddEditShift;