"use client";
import { useForm } from 'react-hook-form'
import { formHeader } from '@/app/(hooks)/mixin';
import Button from '../(components)/Button';
import { useCalendar } from '../(hooks)/useCalender';
import { format } from 'date-fns'
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { WorkPlace } from './WorkPlace';
import { addWorkPlace } from '@/redux/placesSlice';

export interface FormProps {
    onClose: () => void
}
const addNewWorkPlaceFormSection = 'flex justify-between w-full mb-6 md:flex-col'

export interface TextLineInputProps {
    name: string
    label: string
    type?: 'text' | 'number'
    isRequired: boolean
    autoComplete?: string
    value?: string | number
}

const AddNewWorkPlaceForm = ({onClose,}: FormProps) => {
    const user = useAppSelector(state => state.userSlice.user)
    const dispatch = useAppDispatch()
    const { register, handleSubmit, watch, formState: { errors }, setError, clearErrors, setValue, reset } = useForm();
    const { visualCalendar, selectedDay } = useCalendar(false, [])
  
    const TextLineInput = ({name, label, type='text', isRequired, autoComplete, value}: TextLineInputProps) => {
        return (
        <div className={`flex flex-col mb-6`}>
            <div className={`flex justify-between w-full md:flex-col`}>
                <label>{label}</label>
                <input
                {...register(`${name}`,{ required: isRequired })} 
                type={type} 
                className={`outline-none rounded-md w-2/5 px-1 md:w-full`}
                value={value}
                />
            </div>
            <span className={`${errors[name] ? 'text-red-500' : 'text-light'} pointer-events-none w-max-content block md:text-xs`}>{errors[name] && `${label} is required`}</span>
        </div>
        )
    }
    const NumberLineInput = ({name, label, type='text', isRequired, autoComplete}: TextLineInputProps) => {
        return (
            <div className={`flex flex-col mb-6`}>
                <div className={`flex justify-between w-full md:flex-col`}>
                    <label>{label}</label>
                    <input
                        {...register(`${name}`,{ required: isRequired })} 
                        type={type} 
                        className={`outline-none rounded-md w-2/5 px-1 md:w-full`}
                        min={0}
                        />
                </div>
                <span className={`${errors[name] ? 'text-red-500' : 'text-light'} pointer-events-none w-max-content block md:text-xs`}>{errors[name] && `${label} is required`}</span>
            </div>
            )
    }
    const CheckBoxInput = (name: string, label: string) => {
        return (
            <>
                <label>{label}</label>
                <input type='checkbox' defaultChecked {...register(name, {required: false})}/>
            </>
        )
    }
    function extractData(data: any) {
        data.selectedDay = format(selectedDay, 'yyyy-MM-dd')

        const newWorkPlace: WorkPlace = {
            placeId: Date.now().toString(),
            name: data.workPlaceName,
            employmentStartDate: data.selectedDay,
            employmentEndDate: '',
            isCurrent: data.isCurrent,
            wagePerHour: data.wagePerHour,
            isBreakPaid: data.isCurrent,
            link: '',
            checked: false,
            shifts: [],
        }
        dispatch(addWorkPlace(newWorkPlace))
        onClose()
    }
  return (
    <form onSubmit={handleSubmit(data => {
        extractData(data);
      })}
        className={`w-full flex flex-col relative rounded-br-2xl rounded-3xl p-8
        border border-solid border-dark dark:border-light
        bg-light shadow-2xl
        lg:flex-col lg:p-8 xs:rounded-2xl xs:rounded-br-3xl xs:p-4`}
        >
        <h1  className={`${formHeader}`}>Add a New Work Place</h1>
        <div className={`w-full flex justify-center items-start mt-4 md:flex-col`}>
            <div className={`w-1/2 flex flex-col md:w-full`}>
                <TextLineInput label='Work Place Name' name='workPlaceName' type='text' isRequired={true} />
                <NumberLineInput label='Wage Per Hour' name='wagePerHour' type='number' isRequired={true} />
                <div className={`${addNewWorkPlaceFormSection}`}>
                    <label>Starting Date</label>
                    <label className='w-2/5 md:w-full rounded-md bg-white'>{format(selectedDay, 'dd-MM-yyyy')}</label>
                </div>
                <div className={`w-full text-center mb-6 `}>
                    Check V if the answer is yes for the following questions
                </div>
                <div className={`${addNewWorkPlaceFormSection}`}>
                    {CheckBoxInput('isCurrent', 'Currently Employed There?')}
                </div>
                <div className={`${addNewWorkPlaceFormSection}`}>
                    {CheckBoxInput('isBreakPaid', 'Are you payed on break time?')}
                </div>
                <div className={`${addNewWorkPlaceFormSection}`}>
                    <label>Notes</label>
                    <textarea
                        {...register('notes', {required: false})}
                        className='w-2/5 md:w-full' />
                </div>
            </div>
            <div className={`w-1/2 flex justify-center items-start flex-col md:w-full`}>
                {visualCalendar}
            </div>
        </div>
        <div className={`w-full flex justify-end gap-4`}>
            <Button type='button' theme='blank' text='Discard' onClick={() => {onClose(); reset()}} className='' />
            <Button type='submit' theme='full' text='Add' className='' />
        </div>
    </form>
  )
}

export default AddNewWorkPlaceForm