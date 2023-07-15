'use client';
import React from 'react'
import Link from 'next/link'

const Footer = () => {
  return (
    <footer className={`w-full h-[45px] flex justify-around items-center
      border-t border-solid border-grayBorder`}>
      <div>
        <Link href={'mailto:ido.bandd@gmail.com'}>Contact</Link>
      </div>
      <div>
        &copy; All Rights Reserved
      </div>
    </footer>
  )
}

export default Footer