'use client';
import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import WorkPlaceComponent from './WorkPlace';
import { useAppSelector, useAppDispatch } from '../../redux/hooks';
import AddNewWorkPlaceForm from './AddWorkPlaceForm';
import { checkboxAll, removeWorkPlaces, setWorkPlaceCheckbox, setCurrentWorkPlace } from '@/redux/placesSlice';
import AddRemoveEditButtons from '../(components)/AddRemoveEditButtons';
import FramerSpringRotate from '../(components)/FramerSpringRotate';
import AddEditShift from './workPlaceStats/AddEditShiftForm';
import Modal from '../(components)/Modal';
import { pageHeader } from '../(hooks)/mixin';
import Redirect from '../(components)/Redirect';
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
const singleArticle = {
    initial: {
        opacity: 0,
        y: 50,
    },
    animate: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 1
        },
    }
}
const Dashboard = () => {
    
    const user = useAppSelector(state => state.userSlice.user)
    if (!user) {
        <Redirect to='/' />
    }
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

    return (
        <main className={`w-full flex justify-center items-center relative`}>
            <div className={`w-10/12 flex justify-center items-start flex-col py-2 gap-4`}>
                <h1 className={`${pageHeader}`}>Dashboard</h1>
                <div className={`flex w-full`}>
                    <h1 className={`text-xl w-full md:text-base`}>Hello, {user ? user.firstName+' '+ user.lastName : ''}</h1>
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
                    {workPlaces.map((place) => {
                        return <motion.article 
                            key={place.placeId}
                            className={`col-span-2 w-full relative rounded-br-2xl rounded-3xl p-6
                                border border-solid dark:border-light
                                bg-light shadow-2xl 
                                lg:col-span-4
                            `}
                            variants={singleArticle}
                        >
                            <WorkPlaceComponent
                                workPlace={place}
                                removeButtons={removeButtons}
                                handleCheckBoxClick={handleCheckBoxClick}
                                handleWorkPlaceClick={handleWorkPlaceClick}
                                setAddEditShiftForm={setAddEditShiftForm}
                                />
                        </motion.article>
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