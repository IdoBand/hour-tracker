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
const DashBoardOptions = () => {
  const router = useRouter();
  const user = useAppSelector((state) => state.userSlice.user);
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
          addHoverText="Add a Work Place"
          removeHoverText="Remove Work Places"
          className="z-10"
        />
      </div>
      {addWorkPlaceForm && (
        <FramerSpringRotate>
          <AddNewWorkPlaceForm onClose={() => setAddWorkPlaceForm(false)} />
        </FramerSpringRotate>
      )}
    </div>
  );
};

export default DashBoardOptions;
