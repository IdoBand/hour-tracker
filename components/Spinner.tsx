import { RingLoader } from 'react-spinners'

interface SpinnerProps {
  size?: number | string
  className?: string
}
export default function Spinner ({size, className}: SpinnerProps) {
  return (
    <span className={`w-full py-8 flex justify-center items-center ${className}`}>
        <RingLoader color={'rgb(125 211 252)'} size={size}/>
    </span>
  )
}
