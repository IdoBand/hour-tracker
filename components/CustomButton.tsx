import React from 'react';

interface CustomButtonProps {
  children: React.ReactNode;
  className: string;
  hoverText: string;
  onClick?: any;
  type?: 'button' | 'submit'
  where: 'left' | 'right' | 'down' | 'rightUp'
}

const position = {
    left: 'right-0',
    right: 'left-0',
    down: '-bottom-6 left-1/2 transform -translate-x-1/2',
    rightUp: ''
}

const CustomButton = ({children, className, hoverText, onClick, where, type}: CustomButtonProps) => {
    const validClassName = (className: string) => {
        const arr = className.split(' ')
        const idx = arr.indexOf('absolute')
        if (idx < 0) {
            arr.push('relative')
        }
        return arr.join(' ')
    }
  return (
    <button
      onClick={onClick}
      className={`group ${validClassName(className)}`}
      type={type}
    >
      {children}
      <span onClick={(e) => e.stopPropagation()}
      className={`absolute opacity-0 w-max group-hover:opacity-100 bg-sky-400 text-light text-xs p-1 cursor-default
      rounded-lg transition-opacity duration-400
      ${position[where]}
      `}>
        {hoverText}
        </span>
    </button>
  );
};

export default CustomButton;
