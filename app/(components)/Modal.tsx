'use client'
import ReactDom from 'react-dom'
import { flexCenter } from '@/app/(hooks)/mixin'
import { motion } from 'framer-motion'
interface ModalProps {
    children?: React.ReactNode
    onClose: () => void
    className?: string
}
const modalMotion = {
    initial: {scale: 0, opacity: 1},
    animate: {scale: 1, opacity: 1}
}
export default function Modal({onClose, children, className}: ModalProps) {
    return ReactDom.createPortal(
        <>
                    <div className={`fixed bottom-0 top-0 left-0 right-0 bg-dark/75 ${flexCenter} overflow-auto`} onClick={onClose}>
                        <motion.div 
                        variants={modalMotion}
                        initial="initial"
                        animate="animate"
                        className={`w-max-content bg-light text-dark relative rounded-lg 
                        lg:w-10/12 pt-8
                        ${className}`}
                        onClick={(e) => e.stopPropagation()}
                        >
                            <button className={`absolute top-2 left-2 text-dark hover:cursor-pointer hover:text-red-700`} 
                            onClick={onClose}>X</button>
                            {children}
                        </motion.div>
                    </div>  
                </>,
        document.getElementById('portal') as HTMLBodyElement
    )
}

