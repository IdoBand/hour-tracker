import { shiftService } from "@/services/ShiftService"
import { pageHeader } from "@/app/(hooks)/mixin"
import MainOverview from "./MainOverview"
import MonthlyShiftsStack from "./MonthlyShiftsStack"
interface OverviewProps {
    params: {
        workPlaceId: string
    }
}

const Overview = async ({ params }: OverviewProps) => {
    const workPlaceId = params.workPlaceId
    const shifts = await shiftService.getAllShifts(workPlaceId)

  return (
    <main className={`w-full flex justify-center items-center flex-col `}>
      <div className={`w-10/12 flex justify-center items-start flex-col py-2 gap-4 md:w-[95%]`}>
    {shifts && shifts.length > 0 ?
    
    <>YES SHIFTS</>
    :
    <> NO SHIFTS</>
    }
   

    <div className={`${pageHeader} my-3 flex flex-col`}>Overview</div>
    <MainOverview shifts={shifts ? shifts : []}/>
    <MonthlyShiftsStack shifts={shifts ? shifts : []} />
        
{/*     
        <div className={`flex justify-between w-full`}>
          <h1 className={`${dashBoardWorkPlaceHeader}`}>Shifts</h1>
          <AddRemoveEditButtons 
              handleAddClick={() => setAddEditShiftForm(true)} 
              handleRemoveClick={() => setRemoveButtons((prev) => !prev)} 
              handleSelectAll={selectAll} 
              handleRemovePermanentlyClick={handleRemovePermanentlyClick}
              addHoverText='Add a Shift'
              removeHoverText='Remove Shifts'
              />
        </div>
        {addShiftForm &&
          <FramerSpringRotate className='shadow-2xl rounded-2xl relative z-20'>
            <AddEditShift addOrEdit='add' onClose={() => setAddEditShiftForm(false)} />
          </FramerSpringRotate>
        }
        <div className='w-full gap-2'>
          <div className={`w-full bg-sky-200 rounded-lg grid grid-cols-7 grid-flow-col px-2 py-1
            lg:grid-cols-3
          `}
          >
            <span className={`w-full flex order-8 opacity-0`}><ArrowUpCircleIcon className='w-5'/></span>
            <span className={`col-start-1 col-end-2 w-full lg:flex lg:justify-center`}>Date</span>
            <span className={`col-start-2 col-end-3 w-full lg:flex lg:justify-center`}>Start</span>
            <span className={`col-start-3 col-end-4 w-full lg:flex lg:justify-center`}>End</span>
            <span className={`col-start-4 col-end-5 w-full lg:hidden`}>Duration</span>
            <span className={`col-start-5 col-end-6 w-full lg:hidden`}>Break</span>
            <span className={`col-start-6 col-end-7 w-full lg:hidden`}>I Worked On</span>
            <span className={`col-start-7 col-end-8 w-full lg:hidden`}>Notes</span>
          </div>
          <div className='w-full gap-2 flex-col'>
            {shifts.length ? 
            shifts.map((shift) => {
              return <div key={shift.id} className='w-full'>
                <ShiftCard 
                  shift={shift} 
                  removeButtons={removeButtons} 
                  handleCheckBoxClick={handleCheckBoxClick} />
              </div>
            })
            :
            <h2 className='w-full text-center my-4'>No shifts this month :(</h2>
            }
          </div>
        </div> */}


      </div>
    </main>
  )
}

export default Overview