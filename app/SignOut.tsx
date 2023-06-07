'use client';
import { useAppSelector, useAppDispatch } from '../redux/hooks';
import { signOutUser } from '@/redux/userSlice';
import Button from './(components)/Button';
import { flexCenter } from '@/app/(hooks)/mixin';
import Link from 'next/link';
import { setWorkPlaces } from '@/redux/placesSlice';
interface SignOutProps {
  onClose: () => void
}
const SignOut = ({ onClose }: SignOutProps) => {
  const user = useAppSelector(state => state.userSlice.user)
  const dispatch = useAppDispatch()
  
  function handleSignOut() {
    dispatch(signOutUser())
    dispatch(setWorkPlaces([]))
    onClose()
  }
  return (
    <main className={`w-full ${flexCenter} flex-col gap-8 p-4`}>
        <h1 className={`text-2xl px-10`}>
            You are signed in as {user?.firstName} {user?.lastName}
        </h1>
        <div className={`${flexCenter} gap-4`}>
          <Button type='button' text='Ok' onClick={() => onClose()} theme='blank' className='px-8' />
          <Link href='/'>
            <Button type='button' text='Sign Out' onClick={handleSignOut} theme='full' className='' />
          </Link>
          
        </div>
    </main>
  )
}

export default SignOut