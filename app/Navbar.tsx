'use client';
import { useState } from 'react'
import Link from 'next/link'
import { flexCenter } from '@/app/(hooks)/mixin';
import Modal from './(components)/Modal';
import SignIn from './SignIn';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { LogoSVG } from '@/util/icons';
import SignOut from './SignOut';
import { Bars3Icon } from '@heroicons/react/24/solid'
import About from './About';
const navbarLinkClassName = 'hover:text-sky-400 hover:scale-110 z-10'

const Navbar = () => {
  const [signIn, setSignIn] = useState<boolean>(false)
  const [signOut, setSignOut] = useState<boolean>(false)
  const [mobileMenu, setMobileMenu] = useState<boolean>(false)
  const [about, setAbout] = useState<boolean>(false)
  const user = useAppSelector(state => state.userSlice.user)
  const dispatch = useAppDispatch()

  const navbarLinks = (className: string) => {
    return (
      <nav className={`${flexCenter} ${className}`}>
        <Link href={'/'} className={`${navbarLinkClassName}`} onClick={() => mobileMenu && setMobileMenu(false)} >Home</Link>
        {user ? 
        <>
          <Link href={'/dashboard'} className={`${navbarLinkClassName}`} onClick={() => mobileMenu && setMobileMenu(false)} >Dashboard</Link>
          <Link href={'/'} className={`${navbarLinkClassName}`} onClick={(e) => {e.preventDefault(); setSignOut(true); mobileMenu && setMobileMenu(false)}}>Sign Out</Link>
        </>
        :
          <Link href={''} className={`${navbarLinkClassName}`} onClick={(e) => {e.preventDefault(); setSignIn(true); mobileMenu && setMobileMenu(false)}}>Sign In</Link>
        }
        <Link href={''} className={`${navbarLinkClassName}`} onClick={(e) => {e.preventDefault(); mobileMenu && setMobileMenu(false) ; setAbout(true)}}>About</Link>
      </nav>
    )
  }

  return (
    <>
    <header className={`w-full ${flexCenter}  border-b border-solid border-grayBorder z-20 bg-light`}>
      <main className={`flex justify-between relative w-10/12 items-center py-2 md:w-11/12`}>
        <Link href={'/'} className={`${flexCenter} gap-1`}>
        <LogoSVG className={``} height='28'/>
        <h1 className={`${flexCenter} font-bold`}>Hour Tracker</h1>
        </Link>
        <div className='md:hidden'>
          {navbarLinks( 'gap-4 ')}
        </div>
        <div className='hidden md:block'>
          <button className={`${flexCenter} group`} onClick={() => setMobileMenu((prev) => !prev)}>
            <Bars3Icon className='w-8 group-hover:fill-sky-400' />
          </button>
        </div>
        
      </main>
    </header>
    {signIn && <Modal onClose={() => setSignIn(false)}>
                  <SignIn onClose={() => (setSignIn(false))}/>
              </Modal>
    }
    {signOut && <Modal onClose={() => setSignOut(false)}>
                  <SignOut onClose={() => setSignOut(false)}/>
                </Modal>
    }
    {mobileMenu && <Modal onClose={() => setMobileMenu(false)}>
                <div className='relative overflow-hidden'>
                  <LogoSVG className='absolute -bottom-8 -left-5 opacity-40 sm:opacity-10' width='200' height='200' />
                  {navbarLinks('flex-col gap-6 py-8')}
                </div>
                </Modal>
    }
    {about && <Modal onClose={() => setAbout(false)}>
                <About />
                </Modal>
    }
    </>
  )
}

export default Navbar