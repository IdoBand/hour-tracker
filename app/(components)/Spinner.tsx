import { RingLoader } from 'react-spinners'


export default function Spinner () {


  return (
    <span className={`w-full py-8 flex justify-center items-center`}>
        <RingLoader color={'rgb(125 211 252)'} />
    </span>
  )
}
