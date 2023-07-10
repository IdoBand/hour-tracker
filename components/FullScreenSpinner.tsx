'use client'
import ReactDom from 'react-dom'
import { flexCenter } from '@/app/(hooks)/mixin'
import { motion } from 'framer-motion'
import Spinner from './Spinner'
interface FullScreenSpinnerProps {
    children?: React.ReactNode
    onClose?: () => void
    className?: string
}
const modalMotion = {
    initial: {scale: 0, opacity: 0, x: -1000},
    animate: {scale: 1, opacity: 1, x: 0, transition: {duration: 0.4}},
    exit: {scale: 0, opacity: 0, x: 1000}
}
export default function FullScreenSpinner({onClose, children, className}: FullScreenSpinnerProps) {
    return ReactDom.createPortal(
        <>
                    <div className={`fixed bottom-0 top-0 left-0 right-0 bg-dark/75 ${flexCenter} z-50`} onClick={onClose}>
                        <motion.div 
                        variants={modalMotion}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        onClick={(e) => e.stopPropagation()}
                        >
                            <Spinner />
                        </motion.div>
                    </div>  
                </>,
        document.getElementById('portal') as HTMLBodyElement
    )
}

