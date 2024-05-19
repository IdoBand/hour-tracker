import { useState } from "react";
import {
  PlusCircleIcon,
  MinusCircleIcon,
  XCircleIcon,
} from "@heroicons/react/24/solid";
import CustomButton from "./CustomButton";
import Modal from "./Modal";
import { flexCenter, pageHeader } from "@/app/[lang]/(hooks)/mixin";
import Button from "./Button";
import { useAppSelector } from "@/redux/hooks";
interface AddRemoveButtonsProps {
  handleAddClick: any;
  handleSelectAll: any;
  handleRemovePermanentlyClick: any;
  addHoverText: string;
  removeHoverText: string;
  removeButtons: any;
  setRemoveButtons: any;
  className?: string;
}
const responsive = "md:text-base sm:text-sm xs:text-xs";
const AddRemoveButtons = ({
  handleAddClick,
  handleSelectAll,
  handleRemovePermanentlyClick,
  addHoverText,
  removeHoverText,
  className,
  removeButtons,
  setRemoveButtons,
}: AddRemoveButtonsProps) => {
  const [areYouSure, setAreYouSure] = useState<boolean>(false);
  async function RemovePermanentlyProcess() {
    await handleRemovePermanentlyClick();
    setAreYouSure(false);
    setRemoveButtons(false);
  }

  return (
    <nav className={`flex border-b border-solid border-l-grayBorder`}>
      <CustomButton
        hoverText={addHoverText}
        onClick={handleAddClick}
        className={`mx-3 ${className}`}
        where="down"
      >
        <PlusCircleIcon className="w-6" />
      </CustomButton>
      <CustomButton
        hoverText={removeButtons ? "Exit Remove" : removeHoverText}
        onClick={() => {
          setRemoveButtons();
        }}
        className={`ml-3 ${className}`}
        where="left"
      >
        {removeButtons ? (
          <XCircleIcon className="w-6" />
        ) : (
          <MinusCircleIcon className="w-6" />
        )}
      </CustomButton>
      {removeButtons && (
        <>
          {/* <button className={`relative ml-3 text-danger ${responsive}`} onClick={handleSelectAll}>Select All</button> */}
          <button
            className={`relative ml-3 text-danger ${responsive}`}
            onClick={() => setAreYouSure(true)}
          >
            Remove Permanently
          </button>
        </>
      )}
      {areYouSure && (
        <Modal onClose={() => setAreYouSure(false)}>
          <div className="w-full flex flex-col justify-center px-8 py-6">
            <div className={`${pageHeader} pb-6`}>Are You Sure?</div>
            This action can not be undone.
            <div className={`w-full ${flexCenter} gap-4 mt-3`}>
              <Button
                className=""
                text="Go Back"
                theme="full"
                type="button"
                onClick={() => setAreYouSure(false)}
              />
              <Button
                className="bg-danger hover:bg-danger/75"
                text="Remove"
                theme="full"
                type="button"
                onClick={RemovePermanentlyProcess}
              />
            </div>
          </div>
        </Modal>
      )}
    </nav>
  );
};

export default AddRemoveButtons;
