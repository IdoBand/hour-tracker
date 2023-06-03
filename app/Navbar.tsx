'use client';
import { useState } from 'react'
import Link from 'next/link'
import { flexCenter } from '@/util/mixin';
import Modal from './(components)/Modal';
import SignIn from './(components)/SignIn';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { LogoSVG } from '@/util/icons';
import SignOut from './(components)/SignOut';
const Navbar = () => {
  const [signIn, setSignIn] = useState<boolean>(false)
  const [signOut, setSignOut] = useState<boolean>(false)
  const user = useAppSelector(state => state.userSlice.user)
  const dispatch = useAppDispatch()
  return (
    <>
    <header className={`w-full ${flexCenter}  border-b border-solid border-grayBorder`}>
      <main className={`flex justify-between relative w-10/12 items-center py-2`}>
        <Link href={'/'} className={`${flexCenter} gap-1`}>
        <LogoSVG className={``} height='28'/>
        <h1 className={`${flexCenter} font-bold`}>Hour Tracker</h1>
        </Link>
        <nav className={`${flexCenter} gap-4`}>
          {user ? 
          <>
            <Link href={'/dashboard'} >Dashboard</Link>
            <Link href={'/'} onClick={(e) => {e.preventDefault(); setSignOut(prev=> !prev)}}>Sign Out</Link>
          </>
          :
            <Link href={'/'} onClick={(e) => {e.preventDefault(); setSignIn(prev=> !prev)}}>Sign In</Link>
          }
          <Link href={'/'} onClick={(e) => e.preventDefault()}>About</Link>
          
        </nav>
      </main>
    </header>
    {signIn && <Modal onClose={() => (setSignIn(false))}><SignIn actionOnSubmit={() => (setSignIn(false))}/></Modal>}
    {signOut && <Modal onClose={() => (setSignOut(false))}><SignOut actionOnSubmit={() => (setSignOut(false))}/></Modal>}
    </>
  )
}

export default Navbar