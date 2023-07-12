import WorkPlaceCard from './WorkPlaceCard';
import { pageHeader } from '../(hooks)/mixin';
import { redirect } from 'next/navigation';
import DashBoardOptions from './DashboardOptions';
import { WorkPlace } from '@/types/types';
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/route';
import { shiftService } from '@/services/ShiftService';
import { WorkPlaceService } from '@/services/WorkPlaceService';
import { TimeHelper } from '../../services/TimeHelper';
import startOfTomorrow from 'date-fns/startOfToday';
const workPlaceService = new WorkPlaceService()

function generateEmploymentDurationString(workPlace: WorkPlace): string {    
    if (!workPlace.employmentEndDate && !workPlace.lastShift) {
        return '0'
    }
    const start = workPlace.employmentStartDate
    const end = workPlace.employmentEndDate ? workPlace.employmentEndDate : startOfTomorrow()
    return TimeHelper.generateYearlyDurationString(start as Date, end as Date)
}

const Dashboard = async () => {
    const session = await getServerSession(authOptions)
    if (!session) {
        redirect('/')
    }

    const workPlaces = await workPlaceService.getAllWorkPlacesById(session.user?.email as string)
    let totals: any[]
    let employmentDurations: string[]

    if (workPlaces && workPlaces.length > 0) {
        const workPlacesIds = workPlaces.map(workPlace => {return workPlace.id})
        totals = await shiftService.getSumOfHours(workPlacesIds,  'shift')
        employmentDurations = workPlaces.map(workPlace => {
        return generateEmploymentDurationString(workPlace as WorkPlace)
    }) 
    }

    return (
        <main className={`w-full flex justify-center items-center relative`}>
            <div className={`w-10/12 flex justify-center items-start flex-col py-2 gap-4`}>
                <h1 className={`${pageHeader}`}>Dashboard</h1>
                <DashBoardOptions />
                <div className='w-full grid grid-cols-4 gap-10'>
                    {workPlaces && workPlaces.length > 0 ? 
                        workPlaces.map((workPlace, idx) => {
                            return <article key={workPlace.id}
                                className={`col-span-2 w-full relative rounded-br-2xl rounded-3xl p-6
                                border border-solid dark:border-light
                                bg-light shadow-2xl 
                                lg:col-span-4 animate-fade-in
                            `}>
                                <WorkPlaceCard 
                                    workPlace={workPlace as WorkPlace} 
                                    totalHours={totals[idx].total}
                                    hoursPastWeek={totals[idx].totalPastWeek}
                                    hoursPastMonth={totals[idx].totalPastMonth}
                                    employmentDuration={employmentDurations[idx]}
                                    />
                            </article>
                        })
                    :
                    <article 
                        className={`col-span-4 w-full relative rounded-br-2xl rounded-3xl p-6
                        border border-solid dark:border-light
                        bg-light shadow-2xl text-center
                        animate-fade-in
                    `}>
                        Add a Work Place In Order To Start Tracking :)
                    </article>
                    }
                    
                </div>
            </div>
        </main>
  )
}

export default Dashboard