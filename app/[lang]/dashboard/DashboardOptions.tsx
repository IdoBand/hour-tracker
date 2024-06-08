"use client";
import AddRemoveButtons from "../../../components/AddRemoveButtons";
import AddNewWorkPlaceForm from "./AddWorkPlaceForm";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import FramerSpringRotate from "../../../components/FramerSpringRotate";
import {
  setCheckboxAll,
  setWorkPlaceRemoveButtons,
  clearIdToRemoveArray,
} from "@/redux/workPlaceSlice";
import { fetchRemoveWorkPlaces } from "@/util/workPlaceFetchers";
import { setIsFetching } from "@/redux/windowSlice";
import { useToast } from "@/components/ui/use-toast";
type DashBoardOptionsProps = {
  dashboardDict: any
}
export default function DashBoardOptions ({ dashboardDict }: DashBoardOptionsProps) {
  
  const router = useRouter();
  const idsToRemove = useAppSelector(
    (state) => state.workPlaceSlice.removePlacesIdArray,
  );
  const removeButtons = useAppSelector(
    (state) => state.workPlaceSlice.workPlaceRemoveButtons,
  );
  const dispatch = useAppDispatch();
  const { toast } = useToast();
  const [addWorkPlaceForm, setAddWorkPlaceForm] = useState<boolean>(false);
  async function removeWorkPlacesPermanently() {
    if (idsToRemove.length > 0) {
      try {
        dispatch(setIsFetching());
        const result = await fetchRemoveWorkPlaces(idsToRemove);
        if (result.success) {
          router.refresh();
          toast({
            title: "Success",
            description: "Work Places removed successfully",
            variant: "info",
          });
          dispatch(clearIdToRemoveArray());
        }
      } catch {
        toast({
          title: "Error",
          description: "Failed to remove Work Places",
          variant: "destructive",
        });
      } finally {
        dispatch(setIsFetching());
      }
    }
  }

  return (
    <div className="w-full relative z-10">
      <div className={`flex w-full`}>
        <AddRemoveButtons
          handleAddClick={() => setAddWorkPlaceForm(true)}
          removeButtons={removeButtons}
          setRemoveButtons={() => dispatch(setWorkPlaceRemoveButtons())}
          handleSelectAll={() => dispatch(setCheckboxAll())}
          handleRemovePermanentlyClick={removeWorkPlacesPermanently}
          addHoverText={dashboardDict.addWP}
          removeHoverText={dashboardDict.removeWP}
          className="z-10"
        />
      </div>
      {addWorkPlaceForm && (
        <FramerSpringRotate>
          <AddNewWorkPlaceForm onClose={() => setAddWorkPlaceForm(false)} dict={dashboardDict} />
        </FramerSpringRotate>
      )}
    </div>
  );
};
