import React from 'react'
import { Skeleton } from '@/components/ui/Skeleton'
const loading = () => {
  return (
    <>
        <div>loading...</div>
        <Skeleton className='h-10 w-28 bg-skeletonLoading' />
    </>
  )
}

export default loading