"use client";
import { useAppSelector, useAppDispatch } from "../../../redux/hooks";
import { signOutUser } from "@/redux/userSlice";
import Button from "../../../components/Button";
import { flexCenter } from "@/app/[lang]/(hooks)/mixin";
import { signOut } from "next-auth/react";
interface SignOutProps {
  onClose: () => void;
  dict: any
}
const SignOut = ({ onClose, dict }: SignOutProps) => {
  const user = useAppSelector((state) => state.userSlice.user);
  const dispatch = useAppDispatch();

  function handleSignOut() {
    dispatch(signOutUser());
    signOut();
    onClose();
  }
  return (
    <main className={`w-full ${flexCenter} flex-col gap-8 p-4`}>
      <h1 className={`text-2xl px-10 lg:text-lg md:text-sm md:px-0`}>
        {dict.signedInAs} {user?.name}
      </h1>
      <div className={`${flexCenter} gap-4`}>
        <Button
          type="button"
          text={dict.goBack}
          onClick={onClose}
          theme="blank"
          className="px-8"
        />
        <Button
          type="button"
          text={dict.signOut}
          onClick={handleSignOut}
          theme="full"
          className=""
        />
      </div>
    </main>
  );
};

export default SignOut;
