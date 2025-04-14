"use client"
import TextInput from "@/components/inputs/TextInput";
import { useLoginUserMutation } from "@/data/services/Auth";
import { showSuccessMessage } from "@/utils/notifications";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from 'react-hook-form'
import * as Yup from 'yup'
import Cookie from 'js-cookie';
import { useDispatch } from "react-redux";
import { setProfile } from "@/data/slice/User";
import SpinnerButton from "@/components/loaders/SpinnerButton";

const Login = () => {

    // services
    const [loginUser, resultLoginUser] = useLoginUserMutation()

    const router = useRouter()
    const dispatch = useDispatch()

    type FormValues = {
        email: string,
        password: string,
    }
    const schema = Yup.object().shape({
        email: Yup.string().email("ایمیل وارد شده معتبر نمی باشد.").required("ایمیل الزامی است."),
        password: Yup.string().required("گذرواژه الزامی است.")
    });

    const { handleSubmit, control, formState: { errors }, getValues, setValue, reset } = useForm<FormValues>({
        resolver: yupResolver(schema),
        defaultValues: {}
    })

    const handleLogin = (data) => {
        loginUser(data)
    }

    useEffect(() => {
        if (resultLoginUser.data?.success === true) {
            showSuccessMessage(resultLoginUser.data.message)
            Cookie.set("token",resultLoginUser.data.data.token, { expires: 365 })
            dispatch(setProfile(resultLoginUser.data.data.profile))
            router.push("/")
        }
    }, [resultLoginUser])

    return (
        <main className="">
            <section className="w-full flex text-white min-h-svh main-container">
                <div className="w-2/5 flex-center">
                    <form onSubmit={handleSubmit(handleLogin)} className="rounded-xl p-8 bg-neutral-800 w-full flex flex-col gap-3">
                        <h1 className="text-center font-semibold text-2xl">ورود به حساب کاربری</h1>
                        <TextInput name="email" control={control} type="email" errors={errors} label="ایمیل" placeholder="ایمیل شما" />
                        <TextInput name="password" control={control} type="password" errors={errors} label="گذرواژه شما" placeholder="گذرواژه شما" />
                        <button type="submit" disabled={resultLoginUser.isLoading} className="btn bg-green-700 text-base font-medium sm:w-full">
                            {resultLoginUser.isLoading ?<SpinnerButton/> :"ورود"}
                        </button>


                        <Link href="/forget-password">رمز عبورت رو فراموش کردی؟</Link>
                    </form>
                </div>
                <div className="w-3/5 flex-center flex-col text-center text-background ">
                    <h1 className="text-center mb-6 font-bold text-5xl">خوش اومدی به خونه</h1>
                    <h3 className="text-center font-medium text-2xl">ی بلاگ مهمونمون کن</h3>
                </div>
            </section>
        </main>
    )
}
export default Login