"use client";
import { useState, useEffect } from "react";
import { useAppSelector } from "@/redux/hooks";
import Modal from "../../components/Modal";
import SignIn from "./(modalComponents)/SignIn";
import { redirect } from "next/navigation";
import { flexCenter } from "./(hooks)/mixin";
import Button from "@/components/Button";
import { StarIcon } from "lucide-react";
import useCurrentLocale from "./(hooks)/useCurrentLocale";
type StartTrackingProps = {
  homeDict: any
  navigationDict: any
}
const StartTracking = ({homeDict, navigationDict}: StartTrackingProps) => {

  const [signIn, setSignIn] = useState<boolean>(false);
  const [shouldRedirect, setShouldRedirect] = useState<boolean>(false);
  const user = useAppSelector((state) => state.userSlice.user);
  const { locale } = useCurrentLocale()
  if (shouldRedirect) {
    redirect(`${locale}/dashboard`);
  }
  function handleStartTracking() {
    if (user) {
      setShouldRedirect(true);
    } else {
      setSignIn(true);
    }
  }
  return (
    <>
      <div className={`${flexCenter} gap-4 md:flex-col group`}>
        <Button
          text={homeDict.startTracking}
          theme="full"
          type="button"
          className=""
          onClick={handleStartTracking}
        />
        <div className={`${flexCenter} flex-col`}>
          <h3 className="text-gray-400">+41.5K Users</h3>
          <div className="flex">
            {Array.from({ length: 5 }, (_, index) => (
              <StarIcon
                key={index}
                className="w-5 group-hover:fill-sky-400 transition-all duration-300"
              />
            ))}
          </div>
        </div>
      </div>
      {signIn && (
        <Modal onClose={() => setSignIn(false)}>
          <SignIn onClose={() => setSignIn(false)} dict={navigationDict.userNavigation} />
        </Modal>
      )}
    </>
  );
};

export default StartTracking;
