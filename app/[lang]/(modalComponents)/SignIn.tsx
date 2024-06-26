"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Button from "../../../components/Button";
import { flexCenter } from "@/app/[lang]/(hooks)/mixin";
import { useAppSelector, useAppDispatch } from "../../../redux/hooks";
import { dummyUser } from "@/redux/dummyUser";
import { signIn } from "next-auth/react";
import { GoogleIcon } from "@/util/icons";
interface TextLineInputProps {
  name: string;
  label: string;
  type?: "text" | "password";
  isRequired: boolean;
  autoComplete?: string;
}

interface SignInProps {
  onClose: () => void
  dict: any
}

const SignIn = ({ onClose, dict }: SignInProps) => {
  
  const [signUp, setSignUp] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setError,
    clearErrors,
    setValue,
    reset,
  } = useForm();

  function validateEmailRegex(email: string): boolean {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      setError("email", {
        type: "manual",
        message: "Email is incorrect",
      });
    }
    return emailRegex.test(email);
  }

  const TextLineInput = ({
    name,
    label,
    type = "text",
    isRequired,
    autoComplete,
  }: TextLineInputProps) => {
    return (
      <div className="w-full relative py-2">
        <input
          {...register(`${name}`, { required: isRequired })}
          type={type}
          className={`peer w-full rounded-md p-3 border border-solid border-black outline-none text-lg `}
          autoComplete={autoComplete}
        />
        <span
          className={`
                        absolute left-0 p-3 pointer-events-none rounded-lg w-max-content
                        peer-focus:translate-x-2 peer-focus:-translate-y-3 peer-focus:bg-light
                        peer-focus:pl-1 peer-focus:pr-1 peer-focus:pt-0 peer-focus:pb-0
                        peer-valid:translate-x-2 peer-valid:-translate-y-3 peer-valid:bg-light
                        peer-valid:pl-1 peer-valid:pr-1 peer-valid:pt-0 peer-valid:pb-0 
                        `}
        >
          {label}
        </span>
        <span
          className={`${errors[name] ? "text-red-500" : "text-light"} pointer-events-none w-max-content block`}
        >
          {errors[name]
            ? `${name.charAt(0).toUpperCase() + name.slice(1)} is required`
            : "."}
        </span>
        <button
          type="button"
          className={`absolute right-2 top-7 text-xs bg-slate-200 px-1 rounded-full`}
          onClick={() => setValue(name, "")}
        >
          X
        </button>
      </div>
    );
  };
  function extractFormData(data: any) {
    if (0) {
      onClose();
    }
    alert("Please sign in as a Dummy user or continue with Google :)");
  }
  async function handleGoogle() {
    await signIn("google");
  }
  async function handleDummyUser() {
    const res = await signIn("credentials", dummyUser);
    return;
  }
  return (
    <main className="px-8 pb-8 pt-2 md:px-2">
      <div className={`w-full ${flexCenter} gap-6 mb-10`}>
        <button
          className={`${signUp ? "underline" : ""}`}
          onClick={() => setSignUp((prev) => !prev)}
        >
          {dict.register}
        </button>
        <button
          className={`${signUp ? "" : "underline"}`}
          onClick={() => setSignUp((prev) => !prev)}
        >
          {dict.signIn}
        </button>
      </div>
      <form
        className="w-full"
        onSubmit={handleSubmit((data) => extractFormData(data))}
      >
        {!signUp && (
          <>
            <div className={`w-full ${flexCenter} flex-col gap-2`}>
              <TextLineInput
                name="email"
                label={dict.email}
                isRequired={true}
                autoComplete="user-name"
              />
              <TextLineInput
                name="password"
                label={dict.password}
                type="password"
                isRequired={true}
                autoComplete="current-password"
              />
            </div>
            <button type="button" className="underline text-blue-500 mt-2 mb-8">
            {dict.iForgotMyPassword}
            </button>
            <div className={`${flexCenter} flex-col w-full gap-3 `}>
              <Button
                onClick={(e: React.MouseEvent) => {
                  e.preventDefault();
                  handleDummyUser();
                }}
                type="button"
                theme="full"
                className=""
                text={dict.signInDummy}
              />
              <div className={`${flexCenter} w-full gap-4 md:gap-2`}>
                <Button
                  onClick={reset}
                  type="button"
                  theme="blank"
                  className="px-6"
                  text={dict.clear}
                />
                <Button
                  onClick={handleSubmit}
                  type="submit"
                  theme="full"
                  className="px-6"
                  text={dict.signIn}
                />
              </div>
            </div>
            <div className={`flex flex-col my-4 relative gap-5`}>
              <div
                className={`w-full ${flexCenter} gap-4 text-center text-gray-500
                before:absolute-content before:grow before:bg-grayBorder before:h-[1px] before:rounded-lg
                after:absolute-content after:grow after:bg-grayBorder after:h-[1px] after:rounded-lg
            `}
              >
                {dict.orContinueWith}
              </div>
              <div className={`${flexCenter}`}>
                <button
                  type="button"
                  onClick={handleGoogle}
                  className="flex items-center gap-2 hover:text-secondary"
                >
                  <GoogleIcon width="24" height="24" className="" /> Google
                </button>
              </div>
            </div>
          </>
        )}
        {signUp && (
          <>
            <div className={`w-full ${flexCenter} flex-col gap-2 py-2`}>
              <TextLineInput
                name="firstName"
                label="First Name"
                isRequired={true}
                autoComplete="first-name"
              />
              <TextLineInput
                name="lastName"
                label="Last Name"
                isRequired={true}
                autoComplete="last-name"
              />
              <TextLineInput
                name="email"
                label="Email"
                isRequired={true}
                autoComplete="email"
              />
              <TextLineInput
                name="repeatEmail"
                label="Repeat Email"
                isRequired={true}
                autoComplete="repeat-email"
              />
              <span className="px-0 py-2 lg:px-0">
                Your password is personal and should not be shared
              </span>
              <TextLineInput
                name="password"
                label="Password"
                type="password"
                isRequired={true}
                autoComplete="password"
              />
              <TextLineInput
                name="repeatPassword"
                label="Repeat Password"
                type="password"
                isRequired={true}
                autoComplete="repeat-password"
              />
            </div>
            <div className={`${flexCenter} w-full gap-4 mt-4`}>
              <Button
                onClick={reset}
                type="button"
                theme="blank"
                className=""
                text="Clear"
              />
              <Button
                onClick={handleSubmit}
                type="submit"
                theme="full"
                className=""
                text="Create Account"
              />
            </div>
          </>
        )}
      </form>
    </main>
  );
};

export default SignIn;
