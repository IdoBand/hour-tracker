import { pageHeader } from "../(hooks)/mixin";
import DashBoardOptions from "./DashboardOptions";
import { Skeleton } from "@/components/ui/Skeleton";
const loading = () => {
  return (
    <main className={`w-full flex justify-center items-center relative`}>
      <div
        className={`w-10/12 flex justify-center items-start flex-col py-2 gap-4`}
      >
        <h1 className={`${pageHeader}`}>Dashboard</h1>
        <div className="w-full grid grid-cols-4 gap-10">
          {Array.from({ length: 4 }, (_, i) => i + 1).map((i) => {
            return (
              <div
                key={i}
                className={`col-span-2 w-full relative rounded-br-2xl rounded-3xl p-6
                    border border-solid dark:border-light
                    bg-light shadow-2xl
                    lg:col-span-4
                    `}
              >
                <div className="flex justify-between w-full">
                  <div className={`flex flex-col w-5/6`}>
                    <Skeleton className="bg-skeletonLoading w-[100px] h-[30px] mb-4" />
                    <Skeleton className="bg-skeletonLoading w-4/6 h-[15px] mb-3" />
                    <Skeleton className="bg-skeletonLoading w-4/6 h-[15px] mb-3" />
                    <Skeleton className="bg-skeletonLoading w-4/6 h-[15px] mb-3" />
                    <Skeleton className="bg-skeletonLoading w-4/6 h-[15px] " />
                  </div>
                  <div
                    className={`flex justify-center items-end flex-col gap-4`}
                  >
                    <Skeleton className="shadow-xl rounded-full p-2 ml-4 mt-3group w-10 h-10 bg-skeletonLoading" />
                    <Skeleton className="shadow-xl rounded-full p-2 ml-4 mt-3group w-10 h-10 bg-skeletonLoading" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
};

export default loading;
