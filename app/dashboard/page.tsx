'use client';
import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { workPlace } from './WorkPlace';
import { useAppSelector, useAppDispatch } from '../../redux/hooks';
import AddNewWorkPlaceForm from './AddWorkPlaceForm';
import { checkboxAll, removeWorkPlaces, setWorkPlaceCheckbox, setCurrentWorkPlace } from '@/redux/placesSlice';
import AddRemoveEditButtons from '../(components)/AddRemoveEditButtons';
import FramerSpringRotate from '../(components)/FramerSpringRotate';
import AddEditShift from './workPlaceStats/AddEditShiftForm';
import Modal from '../(components)/Modal';
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
    const [addWorkPlaceForm, setAddWorkPlaceForm] = useState<boolean>(false)
    const firstSelectAllClick = useRef<boolean>(false)
    const [addShiftForm, setAddEditShiftForm] = useState<boolean>(false)

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
    function addShiftClick(){

    }

    return (
        <main className={`w-full flex justify-center items-center relative`}>
            <div className={`w-10/12 flex justify-center items-start flex-col py-2 gap-4`}>
                <h1 className={`text-2xl`}>Dashboard</h1>
                <div className={`flex w-full`}>
                    <h1 className={`text-xl w-full`}>Hello, {user ? user.firstName+' '+ user.lastName : 'John Doe'}</h1>
                    <AddRemoveEditButtons 
                        handleAddClick={() => setAddWorkPlaceForm(true)} 
                        handleRemoveClick={() => setRemoveButtons((prev) => !prev)} 
                        handleSelectAll={selectAll} 
                        handleRemovePermanentlyClick={() => dispatch(removeWorkPlaces())}
                        />
                </div>
                {addWorkPlaceForm && 
                    <FramerSpringRotate>
                        <AddNewWorkPlaceForm onClose={() => setAddWorkPlaceForm(false)} />
                    </FramerSpringRotate>
                }
                {user && workPlaces &&
                    <motion.div 
                        className='w-full grid grid-cols-4 gap-10'
                        variants={articlesContainer}
                        initial="initial"
                        animate="animate"
                        >
                    {workPlaces.map((place, idx) => {
                        return workPlace(idx, removeButtons, handleCheckBoxClick, handleWorkPlaceClick, setAddEditShiftForm, place) 
                    })}
                    </motion.div>
                }
            </div>
            {addShiftForm && 
                <Modal onClose={() => setAddEditShiftForm(false)} className=''>
                    <AddEditShift addOrEdit='add' onClose={() => setAddEditShiftForm(false)}/>
                </Modal>
            }
        </main>
  )
}

export default Dashboard