'use client';
import { HomeImage } from "@/util/icons"
import { flexCenter } from "./(hooks)/mixin"
import Button from "./(components)/Button";
import { StarIcon, CubeIcon } from '@heroicons/react/24/solid'
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useAppSelector } from "@/redux/hooks";
import Redirect from "./(components)/Redirect";
import Modal from "./(components)/Modal";
import SignIn from "./(modalComponents)/SignIn";
import { redirect } from "next/navigation";
////////////////////////////////////////////////////////////////////////////////////////
interface BulletProps {
  header: string
  text: string
}
const Bullet = ({header, text}: BulletProps) => {
  return (
    <div className={`flex flex-col w-[25%] lg:w-11/12 lg:my-4 lg:text-sm group`}>
      <div className="flex gap-3 w-full">
        <CubeIcon className="w-5 group-hover:rotate-180 group-hover:fill-sky-400 transition-all duration-300"/>
        <h2 className="text-lg font-medium">{header}</h2>
      </div>
        {text}
    </div>
  )
}


////////////////////////////////////////////////////////////////////////////////////////

interface SentenceProps {
  text: string
}
const Sentence = ({text}: SentenceProps) => {
  return (<div className="flex gap-2">
    <CubeIcon className="w-3"/>
    {text}
  </div>)
}
const sentences = [
  <Sentence key={0} text="Tired of endless Excel sheets?" />,
  <Sentence key={1} text="Don't trust your boss with keeping track of your work hours?" />,
  <Sentence key={2} text="Trying to remember what you worked on last week?" />
]
const motionContainer = {
  initial: {},
  animate: {
      transition: {
          staggerChildren: 0.08
      },
  }
}
const motionChild = {
  initial: {
      opacity: 0,
      x: 200,
  },
  animate: {
      opacity: 1,
      x: 0,
      transition: {
          duration: 1,
          staggerChildren: 0.08
      },
  }
}
////////////////////////////////////////////////////////////////////////////////////////


export default function Home() {
  
  const [isMobile, setIsMobile] = useState<boolean>(false)
  const [signIn, setSignIn] = useState<boolean>(false)
  const [shouldRedirect, setShouldRedirect] = useState<boolean>(false)
  const user = useAppSelector(state => state.userSlice.user)
  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 800px)')
    const handleScreenChange = (event: MediaQueryListEvent) => {
        setIsMobile(event.matches);
      }
      mediaQuery.addEventListener('change',handleScreenChange);
      return () => {
        mediaQuery.removeEventListener('change',handleScreenChange);
      };
  }, [])
  if (shouldRedirect) {
    redirect('/dashboard')
  }

  function handleStartTracking() {
    if (user) {
      setShouldRedirect(true)
    } else {
      setSignIn(true)
    }
  }
  return (
    <main className={`flex justify-center items-start w-full min-h-screen relative overflow-x-hidden
    before:absolute before:left-10 before:top-3 before:w-96 before:h-96 before:rounded-full before:bg-sky-200 before:animate-up-down-top
    after:absolute after:left-1/2 after:-top-9 after:w-36 after:h-36 after:rounded-full after:bg-sky-200 after:-z-10 after:animate-up-down-top
    `}>

      <div className="w-10/12 h-full flex flex-col z-10 lg:w-[95%]">
        <div className={`w-full flex mb-10 lg:flex-col lg:justify-center lg:items-center`}>
          
          <div className={`w-1/2 min-h-full flex justify-end items-center flex-col gap-8
            lg:w-full lg:items-center lg:mt-5
            `}>
            <motion.h1 
              initial={{opacity: 0, scale:0}} 
              animate={{opacity: 1, scale:1, transition: {duration: 1}}} 
              className="text-4xl font-semibold lg:text-2xl md:text-lg">Track Your Work.</motion.h1>
            <motion.div 
              variants={motionContainer}
              initial="initial"
              animate="animate"
              className="text-lg font-sans lg:text-base md:text-sm">
              {sentences.map((sentence, idx) => {
                return <motion.div
                key={idx}
                variants={motionChild}
                >
                  {sentence}
                </motion.div>
              })}
              <p className="mt-3 ml-5 font-medium">You are in the right place.</p>
            </motion.div>

            <div className={`${flexCenter} gap-4 md:flex-col group`}>
              <Button text="Start Tracking" theme="full" type="button" className="" onClick={handleStartTracking} />
                <div className={`${flexCenter} flex-col`}>
                  <h3 className="text-gray-400">+41.5K Users</h3>
                  <div className="flex">
                    <StarIcon className="w-5 group-hover:fill-sky-400 transition-all duration-300"/>
                    <StarIcon className="w-5 group-hover:fill-sky-400 transition-all duration-300"/>
                    <StarIcon className="w-5 group-hover:fill-sky-400 transition-all duration-300"/>
                    <StarIcon className="w-5 group-hover:fill-sky-400 transition-all duration-300"/>
                    <StarIcon className="w-5 group-hover:fill-sky-400 transition-all duration-300"/>
                  </div>
                </div>
            </div> 
          </div>
          <div className={`w-1/2 flex justify-center relative
            before:absolute before:-left-20 before:bottom-0 before:w-36 before:h-36 before:rounded-full before:bg-sky-200 before:-z-10 before:animate-up-down-bottom
            after:absolute after:-right-12 after:top-3 after:w-72 after:h-72 after:rounded-full after:bg-sky-200 after:animate-up-down-top
            lg:w-full
          `}>
            <HomeImage width={isMobile ? '200' : '400'} height={isMobile ? '200' : '400'} className="z-10"/>
          </div>
        </div>
        <div className={`flex w-full z-10 mt-16 justify-between lg:justify-center lg:items-center lg:flex-col lg:mt-0 mt-
        `}>
          <Bullet header='Calculate Salary' text="Whether you're paid hourly or globally, you can add it all up." />
          <Bullet header='Handle Multiple Work Places' text="If you work as a freelancer or have more than 1 work place - it's not a problem." />
          <Bullet header='Organize Tasks' text="staying on top of your tasks made easy." />
        </div>
        
      </div>
      {signIn && <Modal onClose={() => setSignIn(false)}>
                  <SignIn onClose={() => (setSignIn(false))}/>
              </Modal>
    }
    </main>
  );
}
