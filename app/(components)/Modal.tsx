'use client'
import React from 'react'
import ReactDom from 'react-dom'
import { flexCenter } from '@/util/mixin'
interface ModalProps {
    children?: React.ReactNode
    onClose: () => void
    className?: string
}

export default function Modal({onClose, children, className}: ModalProps) {
    return ReactDom.createPortal(
        <>
                    <div className={`fixed bottom-0 top-0 left-0 right-0 bg-dark/75 ${flexCenter} overflow-auto`} onClick={onClose}>
                        <div className={`w-max-content px-8 pt-8 pb-4 bg-light text-dark relative rounded-lg 
                        lg:w-10/12
                        ${className}`}
                        onClick={(e) => e.stopPropagation()}
                        >
                            <button className={`absolute top-2 left-2 text-dark hover:cursor-pointer hover:text-red-700`} 
                            onClick={onClose}>X</button>
                            {children}
                        </div>
                    </div>  
                </>,
        document.getElementById('portal') as HTMLBodyElement
    )
}

