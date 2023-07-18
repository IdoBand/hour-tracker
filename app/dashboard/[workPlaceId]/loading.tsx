import React from 'react'
import { Skeleton } from '@/components/ui/Skeleton'
import Spinner from '@/components/Spinner'
import { dashBoardWorkPlaceHeader, pageHeader } from "@/app/(hooks)/mixin"
import { ArrowUpCircleIcon, EllipsisHorizontalCircleIcon, PlusCircleIcon, MinusCircleIcon, XCircleIcon } from '@heroicons/react/24/solid'
const skel = 'bg-skeletonLoading w-40 h-5'
const loading = () => {
  return (
    <main className={`w-full flex justify-center items-center flex-col `}>
      <div className={`w-10/12 flex justify-center items-start flex-col py-2 gap-4 md:w-[95%]`}>
        <div className={`${pageHeader} my-3 flex flex-col`}>Overview</div>
        <>
        <div className={`w-full flex justify-center items-center`}>
          <Skeleton className={`${skel} w-72 h-6`} />
        </div>
        <div className='flex w-full md:flex-col'>
          <div className='w-1/2 p-3 shadow-lg rounded-lg md:w-full flex justify-center'>
            <Spinner size="80px" />
          </div>
          <div className={`flex w-1/2 flex-col shadow-lg rounded-lg p-4 gap-4 md:w-full md:px-2 md:text-sm`}>
            <div className={`p-1 flex w-full flex-col rounded-lg gap-1`}>
              <span className='w-full font-semibold text-lg underline md: text-center'>Monthly Overview</span>
              <span className='font-semibold flex justify-between'>{`Expected Salary: `} <Skeleton className={`${skel}`}></Skeleton></span>
              <span className='font-semibold flex justify-between'>{`Total Time: `}<Skeleton className={`${skel}`}></Skeleton></span>
              <span className='font-semibold flex justify-between'>{`Total Break Time: `}<Skeleton className={`${skel}`}></Skeleton></span>
            </div>
            <div className={`p-1 flex w-full flex-col rounded-lg gap-1 relative`}>
                <span className='w-full font-semibold text-lg underline md: text-center'>Work Place Overview</span>
                <>
                <span className='font-semibold flex justify-between'>{`Currently Employed: `}<Skeleton className='' /></span>
                <span className="font-semibold flex justify-between">{`Wage Per Hour: `} <Skeleton className={`${skel}`}></Skeleton></span>
                <span className="font-semibold flex justify-between">{`Started Working at: `}<Skeleton className={`${skel}`}></Skeleton></span>
                <span className="font-semibold flex justify-between">{`Employment Duration: `}<Skeleton className={`${skel}`}></Skeleton></span>
                <span className="font-semibold flex justify-between">{`Breaks Duration: `}<Skeleton className={`${skel}`}></Skeleton></span>
                </>
                <div 
                  className='absolute top-10 right-1 w-5' 
                >
                  <EllipsisHorizontalCircleIcon className='w-5 cursor-pointer' />
                </div>

            </div>
          </div>
        </div>
        </>
        <div className={`flex justify-between w-full`}>
          <h1 className={`${dashBoardWorkPlaceHeader}`}>Shifts</h1>
          <nav className={`flex border-b border-solid border-l-grayBorder`}>
            <PlusCircleIcon className='w-6 mx-3 cursor-pointer' />
            <MinusCircleIcon className='w-6 cursor-pointer' />
          </nav>
        </div>
        <div className='w-full gap-2'>
          <div className={`w-full bg-sky-300 rounded-lg grid grid-cols-7 grid-flow-col px-2 py-1
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
            { Array.from({length: 4}, (_, i) => i + 1).map((i) => {
              return (<Skeleton key={i} className='w-full h-6 bg-skeletonLoading flex justify-between flex-col rounded-lg my-1 cursor-pointer relative' />)
            })

            }
          </div>
        </div>
      </div>
    </main>
  )
}

export default loading