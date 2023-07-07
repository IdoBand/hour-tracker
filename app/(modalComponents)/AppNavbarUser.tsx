'use client'

import { useSession } from 'next-auth/react'
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { signInUser } from '@/redux/userSlice';
import { User } from '@/redux/dummyUser'

const AppNavbarUser = () => {
    const dispatch = useAppDispatch()
    const { data: session } = useSession()
    console.log(session);
    if (session) {
        dispatch(signInUser(session!.user! as User))
    }
  return (<></>)
}

export default AppNavbarUser