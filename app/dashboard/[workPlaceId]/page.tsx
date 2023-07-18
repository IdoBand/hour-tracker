import { shiftService } from "@/services/ShiftService"
import { pageHeader } from "@/app/(hooks)/mixin"
import MainOverview from "./MainOverview"
import MonthlyShiftsStack from "./MonthlyShiftsStack"
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { redirect } from "next/navigation"
interface OverviewProps {
    params: {
        workPlaceId: string
    }
}

const Overview = async ({ params }: OverviewProps) => {
  const session = await getServerSession(authOptions)
    if (!session) {
        redirect('/')
    }
    const workPlaceId = params.workPlaceId
    const shifts = await shiftService.getAllShifts(workPlaceId)

  return (
    <main className={`w-full flex justify-center items-center flex-col `}>
      <div className={`w-10/12 flex justify-center items-start flex-col py-2 gap-4 md:w-[95%]`}>
        <div className={`${pageHeader} my-3 flex flex-col`}>Overview</div>
        <MainOverview shifts={shifts ? shifts : []}/>
        <MonthlyShiftsStack shifts={shifts ? shifts : []} />
      </div>
    </main>
  )
}

export default Overview