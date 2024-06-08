import { shiftService } from "@/services/ShiftService";
import { pageHeader } from "@/app/[lang]/(hooks)/mixin";
import MainOverview from "./MainOverview";
import MonthlyShiftsStack from "./MonthlyShiftsStack";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { getDictionary } from "@/lib/dictionary";
import { Locale } from "@/i18n.config";
interface OverviewProps {
  params: {
    lang: Locale
    workPlaceId: string;
  };
}

export default async function Overview ({ params }: OverviewProps) {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect(`${params.lang}/`);
  }
  const { page } = await getDictionary(params.lang);
  const { overview: overviewDict } = page;
  const workPlaceId = params.workPlaceId;
  const shifts = await shiftService.getAllShifts(workPlaceId);

  return (
    <main className={`w-full flex justify-center items-center flex-col `}>
      <div
        className={`w-10/12 flex justify-center items-start flex-col py-2 gap-4 md:w-[95%]`}
      >
        <div className={`${pageHeader} my-3 flex flex-col`}>{overviewDict.overview}</div>
        <MainOverview shifts={shifts ? shifts : []} overviewDict={overviewDict} />
        <MonthlyShiftsStack shifts={shifts ? shifts : []} overviewDict={overviewDict.shiftStackDict} />
      </div>
    </main>
  );
};

