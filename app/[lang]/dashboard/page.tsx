import WorkPlaceCard from "./WorkPlaceCard";
import { pageHeader } from "../(hooks)/mixin";
import { redirect } from "next/navigation";
import DashBoardOptions from "./DashboardOptions";
import { WorkPlace } from "@/types/types";
import { getServerSession } from "next-auth";
import { authOptions } from "../../api/auth/[...nextauth]/route";
import { shiftService } from "@/services/ShiftService";
import { WorkPlaceService } from "@/services/WorkPlaceService";
import { TimeHelper } from "../../../services/TimeHelper";
import startOfTomorrow from "date-fns/startOfToday";
import { getDictionary } from "@/lib/dictionary";
import { Locale } from "@/i18n.config";
const workPlaceService = new WorkPlaceService();

export default async function Dashboard({ params: { lang }}: {params: { lang: Locale };}) {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect(`/${lang}`);
  }
  const { page } = await getDictionary(lang);
  const { dashboard: dashboardDict, shiftStackDict } = page;
  const workPlaces = await workPlaceService.getAllWorkPlacesById(
    session.user?.email as string,
  );
  function test(workPlace: WorkPlace) {
    const start = workPlace.employmentStartDate;
    const end = workPlace.employmentEndDate
      ? workPlace.employmentEndDate
      : startOfTomorrow();
    const yearsAndDays = TimeHelper.generateYearlyDurationObject(start as Date, end as Date)
    if (!yearsAndDays.years) {
      return `${yearsAndDays.days} ${dashboardDict.days}`
    } else if (!yearsAndDays.days) {
      return `${yearsAndDays.years} ${dashboardDict.years}`
    } else {
      return `${yearsAndDays.years} ${dashboardDict.years} ${dashboardDict.and} ${yearsAndDays.days} ${dashboardDict.days}` 
    }
  }
  let totals: any[];
  let employmentDurations: string[];
  if (workPlaces && workPlaces.length > 0) {
    
    const workPlacesIds = workPlaces.map((workPlace) => {
      return workPlace.id;
    });
    totals = await shiftService.getSumOfHours(workPlacesIds, "shift");
    employmentDurations = workPlaces.map((workPlace) => {
      return test(workPlace as WorkPlace);
    });
  }

  return (
    <main className={`w-full flex justify-center items-center`}>
      <div
        className={`w-10/12 flex justify-center items-start flex-col py-2 gap-4`}
      >
        <h1 className={`${pageHeader}`}>{dashboardDict.dashboard}</h1>
        <div>
        <h1 className={`text-xl w-full md:text-base`}>
          {dashboardDict.hello}{session.user ? session.user.name : ""}
        </h1>
        </div>
        <DashBoardOptions dashboardDict={dashboardDict} shiftStackDict={shiftStackDict} />
        <div className="w-full grid grid-cols-4 gap-10 mb-28">
          {workPlaces && workPlaces.length > 0 ? (
            workPlaces.map((workPlace, idx) => {
              return (
                <article
                  key={workPlace.id}
                  className={`col-span-2 w-full rounded-br-2xl rounded-3xl p-6
                                border border-solid 
                                bg-light shadow-2xl 
                                lg:col-span-4 animate-fade-in
                            `}
                >
                  <WorkPlaceCard
                    workPlace={workPlace as WorkPlace}
                    totalHours={totals[idx].total}
                    hoursPastWeek={totals[idx].totalPastWeek}
                    hoursPastMonth={totals[idx].totalPastMonth}
                    employmentDuration={employmentDurations[idx]}
                    dashboardDict={dashboardDict}
                    shiftStackDict={shiftStackDict}
                  />
                </article>
              );
            })
          ) : (
            <article
              className={`col-span-4 w-full relative rounded-br-2xl rounded-3xl p-6
                        border border-solid 
                        bg-light shadow-2xl text-center
                        animate-fade-in
                    `}
            >
          {dashboardDict.add}
            </article>
          )}
        </div>
      </div>
    </main>
  );
};