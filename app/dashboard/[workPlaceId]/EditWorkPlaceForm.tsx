import { useForm } from 'react-hook-form'
import { WorkPlace } from '@/types/types';
import { useState } from 'react';
import Button from '@/app/(components)/Button';
import { useAppDispatch } from '@/redux/hooks';

interface EditWorkPlaceFormProps {
    workPlace: WorkPlace
    onClose: () => void
}

interface EditWorkPlaceFormData {
    wagePerHour: string
}

const yesOrNoButtonsStyle = 'flex items-center font-semibold px-1 rounded-lg'
const yesOrNoButtonsSelectedStyle = 'text-secondary'

const EditWorkPlaceForm = ({workPlace, onClose}: EditWorkPlaceFormProps) => {
    const { register, handleSubmit, watch, formState: { errors }, setError, clearErrors, setValue, reset } = useForm();
    const [yesOrNo, setYesOrNo] = useState<boolean>(workPlace.isCurrent)
    const dispatch = useAppDispatch()

    function extractFormData(data: EditWorkPlaceFormData) {
        // dispatch(editAWorkPlace({
        //     ...workPlace,
        //     wagePerHour: +data.wagePerHour,
        //     isCurrent: yesOrNo
        // }))
        onClose()
    }
  return (
    <form onSubmit={handleSubmit(data => extractFormData(data as EditWorkPlaceFormData))} 
        className='relative'
    >
        <span className='flex xs:flex-col'>
            {`Currently Employed? `}
            <div className='flex ml-3 gap-5 xs:py-2 '>
                <button type='button' className={`${yesOrNoButtonsStyle} ${yesOrNo &&  yesOrNoButtonsSelectedStyle}`} onClick={() => setYesOrNo(true)}>Yes</button>
                <button type='button' className={`${yesOrNoButtonsStyle} ${!yesOrNo && yesOrNoButtonsSelectedStyle}`} onClick={() => setYesOrNo(false)}>No</button>
            </div>
        </span>
        <span className='flex justify-between'>
            <span className='flex items-center gap-5 xs:flex-col xs:gap-0'>
            {`Wage Per Hour: `}
                <span className='font-semibold'><input {...register('wagePerHour', {required: false})} type='number' min={0} defaultValue={workPlace.wagePerHour} className='w-14 appearance-none outline-none p-[2px] rounded-md'/>{`₪`}</span>
            </span>
        </span>
        <Button theme='full' type='submit' className='absolute right-0 bottom-0 text-xs mt-2 px-0 py-[3px] sm:mt-1' text='Save' />
    </form>
  )
}

export default EditWorkPlaceForm