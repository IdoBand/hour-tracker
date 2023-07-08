import React from 'react'
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/solid'
interface CheckOrXProps {
    itemToCheck: string | boolean
    className?: string
}
const CheckOrX = ({itemToCheck, className}: CheckOrXProps) => {

    return itemToCheck ?  <CheckCircleIcon className='w-5 fill-green-500 sm:w-4' /> : <XCircleIcon className='w-5 fill-red-400 sm:w-4'/>
}

export default CheckOrX