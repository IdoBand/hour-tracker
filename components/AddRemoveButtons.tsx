import { useState } from 'react'
import { PlusCircleIcon, MinusCircleIcon, XCircleIcon } from '@heroicons/react/24/solid';
import CustomButton from './CustomButton';
interface AddRemoveButtonsProps {
  handleAddClick: any
  handleSelectAll: any
  handleRemoveClick: any
  handleRemovePermanentlyClick: any
  addHoverText: string
  removeHoverText: string
}
const responsive = 'md:text-base sm:text-sm xs:text-xs'
const AddRemoveButtons = ({handleAddClick, handleSelectAll, handleRemoveClick, handleRemovePermanentlyClick, addHoverText, removeHoverText}: AddRemoveButtonsProps) => {
    const [removeButtons, setRemoveButtons] = useState<boolean>(false)

  return (
    <nav className={`flex border-b border-solid border-l-grayBorder`}>
      <CustomButton hoverText={addHoverText} onClick={handleAddClick} className='mx-3 z-50' where='down'>
        <PlusCircleIcon className='w-6' />
      </CustomButton>
      <CustomButton hoverText={removeButtons ? 'Exit Remove' : removeHoverText} onClick={() => {handleRemoveClick() ; setRemoveButtons(prev => !prev)}} className='ml-3 z-50' where='left'>
        {
          removeButtons ?
          <XCircleIcon className='w-6' />
          :
          <MinusCircleIcon className='w-6' />
        }
      </CustomButton>
        {removeButtons &&
        <>
        <button className={`relative ml-3 text-danger ${responsive}`} onClick={handleSelectAll}>Select All</button>
        <button className={`relative ml-3 text-danger ${responsive}`} onClick={handleRemovePermanentlyClick}>Remove Permanently</button>
        </>
        }
    </nav>
  )
}

export default AddRemoveButtons