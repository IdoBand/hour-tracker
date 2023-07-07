'use client';
import { useEffect, useState, } from 'react'
import Link from 'next/link'
import { flexCenter } from '@/app/(hooks)/mixin';
import Modal from './Modal';
import SignIn from '../(modalComponents)/SignIn';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { LogoSVG } from '@/util/icons';
import SignOut from '../(modalComponents)/SignOut';
import { Bars3Icon } from '@heroicons/react/24/solid'
import About from '../(modalComponents)/About';
import { usePathname } from 'next/navigation';
////////////////////////////////////////////////////////////////////////
import { useSession } from 'next-auth/react'
import { signInUser } from '@/redux/userSlice';
import { User } from '@/redux/dummyUser'
import { fetchSignIn } from '@/util/userFetchers';
////////////////////////////////////////////////////////////////////////
const navbarLinkClassName = 'h-[45px] group relative flex items-center'
const navbarLinkBeforeClassName = 'before:absolute before:w-full before:h-[2px] before:bg-sky-400 before:bottom-0 before:rounded-xl'
const navbarLinkTextClassName = `group-hover:text-sky-400 group-hover:scale-110 z-10 transition-all duration-300`
const navbarDivTextClassName = `hover:text-sky-400 hover:scale-110 z-10 transition-all duration-300 cursor-pointer`

const Navbar = () => {
  const [signIn, setSignIn] = useState<boolean>(false)
  const [signOut, setSignOut] = useState<boolean>(false)
  const [mobileMenu, setMobileMenu] = useState<boolean>(false)
  const [about, setAbout] = useState<boolean>(false)
  const dispatch = useAppDispatch()
  const pathName = usePathname()
  const { data: session } = useSession()
  const user = useAppSelector(state => state.userSlice.user)

  useEffect(() => {
    async function handleSignIn() {
      await fetchSignIn(session!.user)
    }

    if (session) {
      handleSignIn()
      dispatch(signInUser(session!.user! as User))
    }
  }, [session])
  
  const navbarLinks = (className: string) => {
    return (
      <nav className={`${flexCenter} ${className}`}>
        <Link href={'/'} className={`${navbarLinkClassName} ${pathName === '/' && navbarLinkBeforeClassName}`} onClick={() => mobileMenu && setMobileMenu(false)} >
          <div className={`${navbarLinkTextClassName}`}>
            Home
          </div>
        </Link>

        {user ? 
        <>
          <Link href={'/dashboard'} className={`${navbarLinkClassName} ${pathName.includes('/dashboard') && navbarLinkBeforeClassName}`} onClick={() => mobileMenu && setMobileMenu(false)} >
            <div className={`${navbarLinkTextClassName}`}>
            Dashboard
            </div>
          </Link>
          <div className={`${navbarDivTextClassName}`} onClick={(e) => {setSignOut(true); mobileMenu && setMobileMenu(false)}}>Sign Out</div>
        </>
        :
          <div className={`${navbarDivTextClassName}`} onClick={(e) => {setSignIn(true); mobileMenu && setMobileMenu(false)}}>Sign In</div>
        }
        <div  className={`${navbarDivTextClassName}`} onClick={(e) => {mobileMenu && setMobileMenu(false) ; setAbout(true)}}>About</div>
      </nav>
    )
  }

  return (
    <>
    <header className={`w-full ${flexCenter}  border-b border-solid border-grayBorder z-20 bg-light`}>
      <main className={`flex justify-between relative w-10/12 items-center md:w-11/12`}>
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