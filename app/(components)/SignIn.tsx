import { useState, useCallback } from 'react'
import { useForm } from 'react-hook-form'
import Button from './Button';
import { flexCenter } from '@/util/mixin';
import { NextSVG } from '@/util/icons'
import { useAppSelector, useAppDispatch } from '../../redux/hooks';
import { signInUser } from '@/redux/userSlice';

interface TextLineInputProps {
    name: string
    label: string
    type?: 'text' | 'password'
    isRequired: boolean
    autoComplete?: string
}

const SignIn = (actionOnSubmit: any) => {
    const [signUp, setSignUp] = useState<boolean>(false)
    const { register, handleSubmit, watch, formState: { errors }, setError, clearErrors, setValue, reset } = useForm();
    const user = useAppSelector(state => state.userSlice)
    const dispatch = useAppDispatch()
    function validateEmailRegex(email: string): boolean {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(email)) {
            setError("email", {
                type: "manual",
                message: "Email is incorrect"
            });
        }
        return emailRegex.test(email)
    }

    const TextLineInput = 
        ({name, label, type='text', isRequired, autoComplete}: TextLineInputProps) => {
            return(
                <div className='w-full relative py-2'>
                    <input 
                    {...register(`${name}`,{ required: isRequired })}
                    type={type} 
                    className={`peer w-full rounded-md p-3 border border-solid border-black outline-none text-lg `}
                    autoComplete={autoComplete}
                    />
                    <span className={`
                        absolute left-0 p-3 pointer-events-none rounded-lg w-max-content
                        peer-focus:translate-x-2 peer-focus:-translate-y-3 peer-focus:bg-light
                        peer-focus:pl-1 peer-focus:pr-1 peer-focus:pt-0 peer-focus:pb-0
                        peer-valid:translate-x-2 peer-valid:-translate-y-3 peer-valid:bg-light
                        peer-valid:pl-1 peer-valid:pr-1 peer-valid:pt-0 peer-valid:pb-0 
                        `}
                    >{label}</span>
                    <span className={`${errors[name] ? 'text-red-500' : 'text-light'} pointer-events-none w-max-content block`}>{errors[name] ? `${name} is required` : '.'}</span>
                    <button type='button'
                        className={`absolute right-2 top-7 text-xs bg-slate-200 px-1 rounded-full`}
                        onClick={() => setValue(name, '')}
                        >X</button>
                </div>
            )
        } 
    function extractFormData (data: any) {
        console.log(data)
        console.log(validateEmailRegex(data.email))
        dispatch(signInUser({
            userId: data.email,
            email: data.email,
            firstName: 'Ido',
            lastName: 'something',
        }))
        actionOnSubmit()
    }

  return (
    <>
    <div className={`w-full ${flexCenter} gap-6 mb-10`}>
        <button className={`${signUp ? 'underline' : ''}`} onClick={() => setSignUp(prev => !prev)}>Register</button>
        <button className={`${signUp ? '' : 'underline'}`} onClick={() => setSignUp(prev => !prev)}>Sign In</button>
    </div>
    <form className='w-full' onSubmit={handleSubmit(data => extractFormData(data))}>
        
        {!signUp && 
        <>
        <div className={`w-full ${flexCenter} flex-col gap-2`}>
            <TextLineInput name='email' label='Email' isRequired={true}/>
            <TextLineInput name='password' label='Password' type='password' isRequired={true}/>
        </div>
        <button type="button" className='underline text-blue-500 mt-2 mb-8'>I forgot my password</button>
        <div className={`${flexCenter} w-full gap-4 `}>
            <Button onClick={handleSubmit} type='submit' theme='full' className='' text='Sign In' />
            <Button onClick={reset} type='button' theme='blank' className='' text='Clear' />
        </div>
        <div className={`flex flex-col my-4 relative gap-6`}>
        <div className={`w-full ${flexCenter}  text-center text-gray-500
            before:absolute before:left-0 before:w-2/12 before:bg-grayBorder after:h-0.5 before:rounded-lg
            after:absolute after:flex after:right-0 after:w-2/12 after:bg-grayBorder before:h-0.5 after:rounded-lg
            `}
            >Or Continue With</div>
            <div className={`${flexCenter}`}>
                <NextSVG className='w-24'/>
            </div>
        </div>
        </>
        }
        {signUp &&
        <>
            <div className={`w-full ${flexCenter} flex-col gap-2 py-2`}>
                <TextLineInput name='firstName' label='First Name' isRequired={true} />
                <TextLineInput name='lastName' label='Last Name' isRequired={true} />
                <TextLineInput name='email' label='Email' isRequired={true} />
                <TextLineInput name='repeatEmail' label='Repeat Email' isRequired={true} autoComplete='current-password' />
                <span className='px-0 py-2 lg:px-0'>Your password is personal and should not be shared</span>
                <TextLineInput name='password' label='Password' type='password' isRequired={true} />
                <TextLineInput name='repeatPassword' label='Repeat Password' type='password' isRequired={true} />
                <span className='px-8 lg:px-0'>In case of loosing your password</span>
                <TextLineInput name='secondEmail' label='2nd Email' isRequired={false} />
                <TextLineInput name='secondEmail' label='Repeat 2nd Email' isRequired={false} />
            </div>
            <div className={`${flexCenter} w-full gap-4 mt-4`}>
                <Button onClick={handleSubmit} type='submit' theme='full' className='' text='Create Account' />
                <Button onClick={reset} type='button' theme='blank' className='' text='Clear' />
            </div>
        </>
        }
    </form>
    </>
  )
}

export default SignIn