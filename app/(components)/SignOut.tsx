import { useAppSelector, useAppDispatch } from '../../redux/hooks';
import { signOutUser } from '@/redux/userSlice';
import Button from './Button';
import { flexCenter } from '@/app/(hooks)/mixin';

const SignOut = (actionOnSubmit: any) => {
    const user = useAppSelector(state => state.userSlice.user)
    const dispatch = useAppDispatch()
  return (
    <main className={`w-full ${flexCenter} flex-col gap-8 p-4`}>
        <h1 className={`text-2xl px-10`}>
            You are signed in as {user?.firstName} {user?.lastName}
        </h1>
        <div className={`${flexCenter} gap-4`}>
          <Button type='button' text='Ok' onClick={() => actionOnSubmit()} theme='blank' className='px-8' />
          <Button type='button' text='Sign Out' onClick={() => {dispatch(signOutUser()); actionOnSubmit()}} theme='full' className='' />
        </div>
    </main>
  )
}

export default SignOut