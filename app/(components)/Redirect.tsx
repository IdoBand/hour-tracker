'use client';
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
interface RedirectProps {
    to: string
}
const Redirect = ({to}: RedirectProps) => {
    const router = useRouter()
    useEffect(() => {
        router.push(to)
    }, [to])

  return null
}

export default Redirect