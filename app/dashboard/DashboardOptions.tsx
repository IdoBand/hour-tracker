'use client'
import AddRemoveButtons from "../../components/AddRemoveButtons"
import AddNewWorkPlaceForm from "./AddWorkPlaceForm"
import { useState } from 'react'
import { redirect, useRouter } from "next/navigation"
import { useAppSelector, useAppDispatch } from "@/redux/hooks"
import FramerSpringRotate from "../../components/FramerSpringRotate"
import { setCheckboxAll, setRemoveButtons, clearIdToRemoveArray } from "@/redux/workPlaceSlice"
import { fetchRemoveWorkPlaces } from "@/util/workPlaceFetchers"
import { setIsFetching } from "@/redux/windowSlice"
import FullScreenSpinner from "../../components/FullScreenSpinner"
import { useToast } from "@/components/ui/use-toast"
const DashBoardOptions = () => {
    const router = useRouter() 
    const user = useAppSelector(state => state.userSlice.user)
    const idsToRemove = useAppSelector(state => state.workPlaceSlice.removePlacesIdArray)
    // if (!user) {
    //     console.log('redirect');
    //     (redirect('/'))
    // }

    const dispatch = useAppDispatch()
    const { toast } = useToast()
    const [addWorkPlaceForm, setAddWorkPlaceForm] = useState<boolean>(false)
    const [addShiftForm, setAddEditShiftForm] = useState<boolean>(false)
    const isFetching = useAppSelector(state => state.windowSlice.isFetching)
    async function removeWorkPlacesPermanently() {
      if (idsToRemove.length > 0) {
        try {
          dispatch(setIsFetching())
          const result = await fetchRemoveWorkPlaces(idsToRemove)
          router.refresh()
          toast({
            title: "Success",
            description: "Work Place removed successfully",
            variant: 'info'
          })
          dispatch(clearIdToRemoveArray())
        } catch {
          toast({
            title: "Error",
            description: "Failed to remove Work Place",
            variant: 'info'
          })
        } finally {
          dispatch(setIsFetching())
        }
      }
      
    }

  return (
    <>
        <div className={`flex w-full`}>
                        <h1 className={`text-xl w-full md:text-base`}>Hello, {user ? user.name : ''}</h1>
                        <AddRemoveButtons 
                            handleAddClick={() => setAddWorkPlaceForm(true)} 
                            handleRemoveClick={() => dispatch(setRemoveButtons())} 
                            handleSelectAll={() => dispatch(setCheckboxAll())} 
                            handleRemovePermanentlyClick={removeWorkPlacesPermanently}
                            addHoverText='Add a Work Place'
                            removeHoverText='Remove Work Places'
                            />
        </div>
        {addWorkPlaceForm && 
                    <FramerSpringRotate>
                        <AddNewWorkPlaceForm onClose={() => setAddWorkPlaceForm(false)} />
                    </FramerSpringRotate>
                }
    </>
  )
}

export default DashBoardOptions