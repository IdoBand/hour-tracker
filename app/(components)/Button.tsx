interface ButtonProps{
    onClick?: any
    theme: 'full' | 'blank'
    text: string
    className: string
    type: 'submit' | 'button'
}
const buttonThemes = {
    full: 'bg-dark text-light rounded-lg border-solid border hover:bg-light hover:text-dark hover:border-dark',
    blank: 'bg-light text-dark rounded-lg border-solid border-dark border hover:bg-dark hover:text-light hover:border-dark'
}
const Button = ({onClick, theme, text, className, type}: ButtonProps) => {
  return (
    <button 
        onClick={onClick}
        className={`${buttonThemes[theme]} py-2 px-4 ${className}`}
        type={type}
        >
        {text}
    </button>
  )
}

export default Button