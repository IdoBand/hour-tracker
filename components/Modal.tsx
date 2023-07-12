'use client'
import ReactDom from 'react-dom'
import { flexCenter } from '@/app/(hooks)/mixin'
import { motion } from 'framer-motion'
import { scrollBar } from '@/app/(hooks)/mixin'
interface ModalProps {
    children?: React.ReactNode
    onClose?: () => void
    className?: string
}
const modalMotion = {
    initial: {scale: 0, opacity: 0, x: -1000},
    animate: {scale: 1, opacity: 1, x: 0, transition: {duration: 0.4}},
    exit: {scale: 0, opacity: 0, x: 1000}
}
export default function Modal({onClose, children, className}: ModalProps) {
    return ReactDom.createPortal(
        <>
                    <div className={`fixed bottom-0 top-0 left-0 right-0 bg-dark/75 ${flexCenter} z-[999]`} onClick={onClose}>
                        <motion.div 
                        variants={modalMotion}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        className={`w-max bg-light text-dark relative rounded-lg max-h-[90%] overflow-auto ${scrollBar}
                        lg:w-11/12 pt-1
                        ${className}`}
                        onClick={(e) => e.stopPropagation()}
                        >
                            <button className={`absolute top-2 right-2 text-dark hover:cursor-pointer hover:text-red-700 z-10`} 
                            onClick={onClose}>X</button>
                            {children}
                        </motion.div>
                    </div>  
                </>,
        document.getElementById('portal') as HTMLBodyElement
    )
}

