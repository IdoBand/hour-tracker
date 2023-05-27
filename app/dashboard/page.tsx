'use client';
import React, { useState, useRef } from 'react'
import Link from 'next/link'
import { WorkPlace } from './interface'
import { PLACES_OF_WORK } from './interface'
import { VercelSVG } from '@/util/icons'
import { checkBoxStyle } from '@/util/mixin';
import { useAppSelector } from '@/redux/hooks';


const workPlace = (key: number ,removeButtons: boolean, handleCheckBoxClick: (placeId: string) => void, {placeId, name, employmentStartDate, employmentEndDate, employmentDuration, isCurrent, hoursPastWeek, hoursPastMonth, totalHours, link, checked}: WorkPlace): React.ReactNode => {
    return (
        <article 
            key={key}
            className={`w-full flex items-center justify-between relative rounded-br-2xl rounded-3xl p-8 cursor-pointer
                border border-solid border-dark dark:border-light
                bg-light shadow-2xl
                lg:flex-col lg:p-8 xs:rounded-2xl xs:rounded-br-3xl xs:p-4
            `}>
            {removeButtons && <input 
                                data-key={placeId}
                                type='checkbox' 
                                checked={checked} 
                                onClick={(e) => e.stopPropagation()} 
                                onChange={(e) => {handleCheckBoxClick(e.target.dataset.key as string)}}
                                className={`${checkBoxStyle}`}/>}
            <div className='absolute top-0 -right-3 -z-10 w-[101%] h-[103%] rounded-[2.5rem] 
                    bg-dark dark:bg-light rounded-br-3xl
                    xs:-right-2 sm:h-[102%] xs:w-full xs:rounded-[1.5rem] checked:before:LE
            ' />

            <div className='w-1/2 flex flex-col items-start justify-between
                lg:w-full lg:pl-0 lg:pt-3
            '>
                <div className={`${isCurrent ? 'text-secondary' : 'DARK'} font-medium text-2xl xs:text-base`}>{name}</div>
                    <div className={`flex flex-col`}>
                    <span className=''>Total Hours: {totalHours}</span>
                    <span className=''>Hours Past Week: {totalHours}</span>
                    <span className=''>Hours Past Month: {totalHours}</span>
                    </div>
                
            </div>
            <Link href={link} 
                    target='_blank' 
                    className='w-4/12 cursor-pointer overflow-hidden rounded-lg
                    lg:w-full
                    '>
                <VercelSVG className='' height='24'/>
            </Link>
        </article>
    )
}
const Dashboard = () => {
    const [places, setPlaces] = useState<WorkPlace[]>(PLACES_OF_WORK)
    const [removeButtons, setRemoveButtons] = useState<boolean>(false)
    const [addNewWorkingPlace, setAddNewWorkingPlace] = useState<boolean>(false)
    const firstSelectAllClick = useRef<boolean>(false)
    const user = useAppSelector(state => state.userSlice.user)
    
    function handleRemoveButtons() {
        setRemoveButtons(prev => !prev)
    }
    function handleCheckBoxClick(placeId: string) {
        firstSelectAllClick.current = false
        const newPlaces = places.map((place: WorkPlace) => {
            if (place.placeId === placeId) {place.checked = !place.checked}
            return place
        })
        setPlaces(newPlaces)
    }
    function selectAll() {
        let newPlaces: WorkPlace[]
        if (firstSelectAllClick.current) {
            newPlaces = places.map(place => {
                place.checked = !place.checked
                return place
            })
        } else {
            newPlaces = places.map(place => {
                place.checked = true
                return place
            })
            firstSelectAllClick.current = true
        }
        setPlaces(newPlaces)
    }

    return (
        <main className={`w-full flex justify-center items-center relative`}>
            <div className={`w-10/12 flex justify-center items-center flex-col py-2 gap-4`}>
                <h1 className={`text-2xl`}>Dashboard</h1>
                <div className={`flex w-full`}>
                    <h1 className={`text-xl w-full`}>Hello, {user ? user.firstName : 'John Doe'}</h1>
                    <nav className={`flex border-b border-solid border-l-grayBorder`}>
                        <button className={`relative mx-3`}>+ Add</button>
                        <button className={`relative ml-3`} onClick={handleRemoveButtons}>- Remove</button>
                        {removeButtons &&
                        <>
                        <button className={`relative ml-3 text-danger`} onClick={selectAll}>Select All</button>
                        <button className={`relative ml-3 text-danger`} onClick={handleRemoveButtons}>Remove Permanently</button>
                        </>
                        }
                    </nav>
                </div>
                {places.map((place, idx) => {
                    return workPlace(idx, removeButtons, handleCheckBoxClick,place) 
                })}
            </div>
        </main>
  )
}

export default Dashboard