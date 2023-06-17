import { useState } from 'react'
interface AddRemoveEditButtonsProps {
  handleAddClick: any
  handleSelectAll: any
  handleRemoveClick: any
  handleRemovePermanentlyClick: any
}
const responsive = 'md:text-base sm:text-sm xs:text-xs'
const AddRemoveEditButtons = ({handleAddClick, handleSelectAll, handleRemoveClick, handleRemovePermanentlyClick}: AddRemoveEditButtonsProps) => {
    const [removeButtons, setRemoveButtons] = useState<boolean>(false)

  return (
    <nav className={`flex border-b border-solid border-l-grayBorder`}>
        <button className={`relative mx-3 hover:text-secondary ${responsive}`}onClick={handleAddClick}>+ Add</button>
        <button className={`relative ml-3 hover:text-secondary ${responsive} ${removeButtons && 'border-b border-b-secondary'}`} onClick={() => {handleRemoveClick() ; setRemoveButtons(prev => !prev)}}>- Remove</button>
        {removeButtons &&
        <>
        <button className={`relative ml-3 text-danger ${responsive}`} onClick={handleSelectAll}>Select All</button>
        <button className={`relative ml-3 text-danger ${responsive}`} onClick={handleRemovePermanentlyClick}>Remove Permanently</button>
        </>
        }
    </nav>
  )
}

export default AddRemoveEditButtons