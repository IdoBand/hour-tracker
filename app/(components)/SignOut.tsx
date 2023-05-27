import { useAppSelector, useAppDispatch } from '../../redux/hooks';
import { signOutUser } from '@/redux/userSlice';
import Button from './Button';
import { FormProps }  from '../dashboard/interface'
import { flexCenter } from '@/util/mixin';
const SignOut = ({actionOnSubmit}: FormProps) => {
    const user = useAppSelector(state => state.userSlice.user)
    const dispatch = useAppDispatch()
  return (
    <main className={`w-full ${flexCenter} flex-col gap-8`}>
        <h1 className={`text-2xl px-10`}>
            You are signed in as {user?.firstName}
        </h1>
        <Button type='button' text='Sign Out' onClick={() => {dispatch(signOutUser()); actionOnSubmit()}} theme='blank' className=''></Button>
    </main>
  )
}

export default SignOut