'use client';
import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { workPlace } from './WorkPlace';
import { useAppSelector, useAppDispatch } from '../../redux/hooks';
import AddNewWorkPlaceForm from './AddWorkPlaceForm';
import { checkboxAll, removeWorkPlaces, setWorkPlaceCheckbox, setCurrentWorkPlace } from '@/redux/placesSlice';
import AddRemoveEditButtons from '../(components)/AddRemoveEditButtons';
import FramerSpringRotate from '../(components)/FramerSpringRotate';

const articlesContainer = {
    initial: {
        opacity: 0,
    },
    animate: {
        opacity: 1,
        transition: {
            delay: 0.5,
            staggerChildren: 0.1
        },
    }
}

const Dashboard = () => {
    
    const user = useAppSelector(state => state.userSlice.user)
    const workPlaces = useAppSelector(state => state.placesSlice.places)
    const dispatch = useAppDispatch()
    const [removeButtons, setRemoveButtons] = useState<boolean>(false)
    const [addNewWorkingPlace, setAddNewWorkingPlace] = useState<boolean>(false)
    const firstSelectAllClick = useRef<boolean>(false)
    
    function handleCheckBoxClick(placeId: string) {
        firstSelectAllClick.current = false
        dispatch(setWorkPlaceCheckbox(placeId))
    }
    function selectAll() {
        dispatch(checkboxAll(firstSelectAllClick.current))
        if (!firstSelectAllClick.current) {
            firstSelectAllClick.current = true
        }
    }
    function handleWorkPlaceClick(placeId: string) {
        dispatch(setCurrentWorkPlace(placeId))
    }

    return (
        <main className={`w-full flex justify-center items-center relative`}>
            <div className={`w-10/12 flex justify-center items-start flex-col py-2 gap-4`}>
                <h1 className={`text-2xl`}>Dashboard</h1>
                <div className={`flex w-full`}>
                    <h1 className={`text-xl w-full`}>Hello, {user ? user.firstName+' '+ user.lastName : 'John Doe'}</h1>
                    <AddRemoveEditButtons 
                        handleAddClick={() => setAddNewWorkingPlace(true)} 
                        handleRemoveClick={() => setRemoveButtons(prev => !prev)} 
                        handleSelectAll={selectAll} 
                        handleRemovePermanentlyClick={() => dispatch(removeWorkPlaces())}
                        />
                </div>
                {addNewWorkingPlace && 
                    <FramerSpringRotate
                    >
                        <AddNewWorkPlaceForm onClose={() => setAddNewWorkingPlace(false)} />
                    </FramerSpringRotate>
                }
                {user && workPlaces &&
                    <motion.div 
                        className='flex flex-col-reverse w-full'
                        variants={articlesContainer}
                        initial="initial"
                        animate="animate"
                        >
                    {workPlaces.map((place, idx) => {
                        return workPlace(idx, removeButtons, handleCheckBoxClick, handleWorkPlaceClick, place) 
                    })}
                    </motion.div>
                }
            </div>
        </main>
  )
}

export default Dashboard