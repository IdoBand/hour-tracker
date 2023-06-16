import { useState } from 'react'
interface AddRemoveEditButtonsProps {
  handleAddClick: any
  handleSelectAll: any
  handleRemoveClick: any
  handleRemovePermanentlyClick: any
}
const AddRemoveEditButtons = ({handleAddClick, handleSelectAll, handleRemoveClick, handleRemovePermanentlyClick}: AddRemoveEditButtonsProps) => {
    const [removeButtons, setRemoveButtons] = useState<boolean>(false)

  return (
    <nav className={`flex border-b border-solid border-l-grayBorder`}>
        <button className={`relative mx-3 hover:text-secondary`}onClick={handleAddClick}>+ Add</button>
        <button className={`relative ml-3 hover:text-secondary`} onClick={() => {handleRemoveClick() ; setRemoveButtons(prev => !prev)}}>- Remove</button>
        {removeButtons &&
        <>
        <button className={`relative ml-3 text-danger`} onClick={handleSelectAll}>Select All</button>
        <button className={`relative ml-3 text-danger`} onClick={handleRemovePermanentlyClick}>Remove Permanently</button>
        </>
        }
    </nav>
  )
}

export default AddRemoveEditButtons