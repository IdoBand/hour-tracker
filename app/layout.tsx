import './globals.css'
import { Inter } from 'next/font/google'
import Navbar from './(components)/Navbar'
import Footer from './(components)/Footer'
import { scrollBar } from './(hooks)/mixin'
const inter = Inter({ subsets: ['latin'] })
import { Providers } from "@/redux/provider";
import SessionProvider from './(providers)/SessionProvider'
import { getServerSession } from 'next-auth'
import { authOptions } from './api/auth/[...nextauth]/route'
export const metadata = {
  title: 'Hour Tracker',
  description: 'Generated by create next app',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions)
  return (
    <html lang="en">
      <Providers>
        <SessionProvider session={session}>
          <body className={`${inter.className} bg-light text-dark ${scrollBar}`}>
            <Navbar />
            <div className='min-h-[90vh]'>
              {children}
            </div>
            <Footer />
            <div id="portal" />
          </body>
        </SessionProvider>
      </Providers>
    </html>
  )
}
