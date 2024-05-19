"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { signInUser } from "@/redux/userSlice";
import { User } from "@/redux/dummyUser";
import { fetchSignIn } from "@/util/userFetchers";
import FullScreenSpinner from "./FullScreenSpinner";
import SignIn from "../app/[lang]/(modalComponents)/SignIn";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { usePathname } from "next/navigation";
import Modal from "./Modal";
import SignOut from "@/app/[lang]/(modalComponents)/SignOut";
import {
  navbarDivTextClassName,
  navbarLinkBeforeClassName,
  navbarLinkClassName,
  navbarLinkTextClassName,
} from "@/app/[lang]/(hooks)/mixin";
import useCurrentLocale from "@/app/[lang]/(hooks)/useCurrentLocale";

type UserNavigationProps = {
  dict: any
}
export default function UserNavigation({dict}: UserNavigationProps) {
  
  const [signIn, setSignIn] = useState<boolean>(false);
  const [signOut, setSignOut] = useState<boolean>(false);
  const [mobileMenu, setMobileMenu] = useState<boolean>(false);
  const user = useAppSelector((state) => state.userSlice.user);
  const dispatch = useAppDispatch();
  const { locale } = useCurrentLocale();

  const pathName = usePathname();
  const { data: session } = useSession();
  const isFetching = useAppSelector((state) => state.windowSlice.isFetching);
  useEffect(() => {
    async function handleSignIn() {
      await fetchSignIn(session!.user);
    }
    if (session) {
      handleSignIn();
      dispatch(signInUser(session!.user! as User));
    }
  }, [session]);
  return (
    <>
      {user ? (
        <>
          <div
            className={`${navbarDivTextClassName}`}
            onClick={(e) => {
              setSignOut(true);
              mobileMenu && setMobileMenu(false);
            }}
          >
            {dict.signOut}
          </div>
        </>
      ) : (
        <div
          className={`${navbarDivTextClassName}`}
          onClick={(e) => {
            setSignIn(true);
            mobileMenu && setMobileMenu(false);
          }}
        >{`${dict.signIn}`}</div>
      )}
      {signIn && (
        <Modal onClose={() => setSignIn(false)}>
          <SignIn onClose={() => setSignIn(false)} dict={dict} />
        </Modal>
      )}
      {signOut && (
        <Modal onClose={() => setSignOut(false)}>
          <SignOut onClose={() => setSignOut(false)} dict={dict} />
        </Modal>
      )}
      {isFetching && <FullScreenSpinner />}
    </>
  );
}
