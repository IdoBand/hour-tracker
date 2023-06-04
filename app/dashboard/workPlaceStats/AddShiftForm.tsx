import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useCalendar } from '../../(hooks)/useCalender';
import Button from '@/app/(components)/Button';
import { useHourPicker }from '@/app/(hooks)/useHourPicker';
import { format } from 'date-fns'
import { Shift } from './Shift';
import { ArrowDownCircleIcon } from '@heroicons/react/24/solid'
import { TimeHelper } from '@/app/(hooks)/TimeHelper';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { addShiftToCurrentWorkPlace, editShift } from '@/redux/placesSlice';

interface AddEditShiftProps {
  addOrEdit: 'add' | 'edit'
  startDate?: string
  endDate?: string
  breakStart?: string,
  breakEnd?: string
  iWorkedOn?: string
  notes?: string
  onClose: () => void
  shiftId?: string
}

const AddShift = ({addOrEdit, startDate, endDate, breakStart, breakEnd, iWorkedOn, notes, onClose, shiftId }: AddEditShiftProps) => {

  const [formIssues, setFormIssues] = useState<string[]>([])
  const currentWorkPlaceId = useAppSelector(state => state.placesSlice.currentWorkPlace?.placeId)
  const dispatch = useAppDispatch()
  
  const { register, handleSubmit, watch, formState: { errors }, setError, clearErrors, setValue, reset } = useForm();
  const { visualCalendar: shiftStartCalender, selectedDay: shiftStartDay } = useCalendar(false, [], undefined, addOrEdit === 'add' ? undefined : new Date(startDate as string));
  const { visualCalendar: shiftEndCalender, selectedDay: shiftEndDay } = useCalendar(false, [], undefined, addOrEdit === 'add' ? undefined : new Date(endDate as string));
  const { visualCalendar: breakStartCalender, selectedDay: breakStartDay } = useCalendar(false, [], undefined, addOrEdit === 'add' ? undefined : new Date(breakStart as string));
  const { visualCalendar: breakEndCalender, selectedDay: breakEndDay } = useCalendar(false, [], undefined, addOrEdit === 'add' ? undefined : new Date(breakEnd as string));

  const { visualHourPicker: shiftStartHourPicker, selectedHour: shiftStartHour } = useHourPicker(startDate ? startDate!.slice(11,16) : '');
  const { visualHourPicker: shiftEndHourPicker, selectedHour: shiftEndHour } = useHourPicker(endDate ? endDate!.slice(11,16) : '');
  const { visualHourPicker: breakStartHourPicker, selectedHour: breakStartHour } = useHourPicker(breakStart ? breakStart!.slice(11,16) : '');
  const { visualHourPicker: breakEndHourPicker, selectedHour: breakEndHour } = useHourPicker(breakEnd ? breakEnd!.slice(11,16) : '');

  interface HourInputProps {

    label: string
    calender: any
    selectedDay: any
    children: any
  }
  const HourInput = useCallback(
      ({ label, calender , children , selectedDay}: HourInputProps) => {
        const [isCalender, setIsCalender] = useState<boolean>(false)
    
        return (
          <div className={`mb-9 w-full flex justify-between items-center z-50`}>
            <label>{label}</label>
            <div className='relative flex items-center'>
              <label 
                className='w-max px-2 flex gap-1 py-1 cursor-pointer md:w-full rounded-md bg-white'
                onClick={() => setIsCalender(prev => !prev)}
              >
                {format(selectedDay, 'dd-MM-yyyy')}
                <ArrowDownCircleIcon className='w-5' />
              </label>
              
              {isCalender && 
                <div 
                  className='absolute top-6 z-20 shadow-lg bg-light w-max py-2 rounded-xl'
                  >
                  {calender}
                  <div className='w-10/12 flex justify-end'>
                    <Button type='submit' theme='full' text='OK' className='text-xs' onClick={() => setIsCalender(false)}/>
                  </div>
                  
                </div>
              }
            </div>
            {children}
          </div>
        )
      }
    , [])

  function extractData(data: any) {

    const shiftStartDate = format(shiftStartDay, 'yyyy-MM-dd')+'T'+shiftStartHour
    const shiftEndDate = format(shiftEndDay, 'yyyy-MM-dd')+'T'+shiftEndHour
    const breakStartDate = format(breakStartDay, 'yyyy-MM-dd')+'T'+breakStartHour
    const breakEndDate = format(breakEndDay, 'yyyy-MM-dd')+'T'+breakEndHour
    const validation = TimeHelper.validateShiftTimes(shiftStartDate, shiftEndDate, breakStartDate, breakEndDate)

    if (validation.isDataValid) {
      const newShift: Shift = {
        shiftId: addOrEdit === 'add' ? Date.now().toString() : shiftId as string,
        placeId: currentWorkPlaceId as string,
        shiftStart: shiftStartDate,
        shiftEnd: shiftEndDate,
        breakStart: breakStartDate,
        breakEnd: breakEndDate,
        iWorkedOn: data.iWorkedOn,
        notes: data.notes,
        checked: false
      }
      if (addOrEdit === 'add') {
        dispatch(addShiftToCurrentWorkPlace(newShift))
      } else if (addOrEdit == 'edit') {
        console.log('should edit');
        
        dispatch(editShift(newShift))
      }
      setFormIssues([])
      onClose()
    } else {
      setFormIssues(validation.issues)
    }
  }

  return (
    <form onSubmit={handleSubmit(data => {
      extractData(data);
    })}
      className={`w-full flex flex-col rounded-br-2xl rounded-3xl p-8
      border border-solid border-dark dark:border-light
      bg-light shadow-2xl
      lg:flex-col lg:p-8 xs:rounded-2xl xs:rounded-br-3xl xs:p-4`}
    >
      <h1 className={`w-full`}>Add a Shift</h1>
      <div className={`flex w-full`}>
        <div className='w-1/2 pb-16 pt-8'>
          <HourInput label='Shift Start' children={shiftStartHourPicker} calender={shiftStartCalender} selectedDay={shiftStartDay}/>
          <HourInput label='Shift End' children={shiftEndHourPicker} calender={shiftEndCalender} selectedDay={shiftEndDay}/>
          <HourInput label='Break Start' children={breakStartHourPicker} calender={breakStartCalender} selectedDay={breakStartDay}/>
          <HourInput label='Break End' children={breakEndHourPicker} calender={breakEndCalender} selectedDay={breakEndDay}/>
        </div>
        <div className='w-1/2 flex justify-start items-center flex-col pt-4'>
          <label className='w-11/12 mb-1'>I Worked On:</label>
          <textarea defaultValue={iWorkedOn}
            className={`w-11/12 outline-none p-1 mb-10`}
            {...register('iWorkedOn', {required: false})}
          />
          <label className='w-11/12 mb-1'>Notes:</label>
          <textarea defaultValue={notes}
            className={`w-11/12 outline-none p-1 mb-10`}
            {...register('notes', {required: false})}
          />

        </div>

      </div>
      {formIssues.length > 0 &&
        <div className='w-full'>
          <div className='font-semibold'>
            Looks like we got some issues with the timing:
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

export default AddShift;