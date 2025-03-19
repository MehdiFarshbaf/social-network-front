"use client"
import TextInput from "@/components/inputs/TextInput";
import { useRegisterUserMutation } from "@/data/services/Auth";
import { showSuccessMessage } from "@/utils/notifications";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from 'react-hook-form'
import * as Yup from 'yup'

const Register = () => {

    // services
    const [registerUser, resultRegisterUser] = useRegisterUserMutation()

    const router = useRouter()

    type FormValues = {
        firstName: string
        lastName: string,
        email: string,
        password: string,
    }
    const schema = Yup.object().shape({
        firstName: Yup.string().required("نام الزامی است.").min(3, "نام حداقل باید سه کاراکتر باشد."),
        lastName: Yup.string().required("نام خانوادگی الزامی است."),
        email: Yup.string().email("ایمیل وارد شده معتبر نمی باشد.").required("ایمیل الزامی است."),
        password: Yup.string().required("گذرواژه الزامی است.")
    });

    const { handleSubmit, control, formState: { errors }, getValues, setValue, reset } = useForm<FormValues>({
        resolver: yupResolver(schema),
        defaultValues: {}
    })

    const handleRegister = (data: FormValues) => {
        registerUser(data)
    }

    useEffect(() => {
        if (resultRegisterUser.data?.success === true) {
            showSuccessMessage(resultRegisterUser.data.message)
            router.push("/login")
        }
    }, [resultRegisterUser])

    return (
        <main className="">
            <section className="w-full flex text-white min-h-svh main-container">
                <div className="w-2/5 flex-center">
                    <form onSubmit={handleSubmit(handleRegister)} className="rounded-xl p-8 bg-neutral-800 w-full flex flex-col gap-3">
                        <h1 className="text-center font-semibold text-2xl">ثبت نام کنید</h1>
                        <TextInput name="firstName" control={control} errors={errors} label="نام" placeholder="نام شما" />
                        <TextInput name="lastName" control={control} errors={errors} label="نام خانوادگی" placeholder="نام خانوادگی شما" />
                        <TextInput name="email" control={control} type="email" errors={errors} label="ایمیل" placeholder="ایمیل شما" />
                        <TextInput name="password" control={control} type="password" errors={errors} label="گذرواژه شما" placeholder="گذرواژه شما" />
                        <button type="submit" className="btn bg-green-700 text-base font-medium sm:w-full">ثبت نام</button>
                    </form>
                </div>
                <div className="w-3/5 flex-center flex-col text-center ">
                    <h1 className="text-center mb-6 font-bold text-5xl">به جامعه بزرگ ما خوش آمدید</h1>
                    <h3 className="text-center font-medium text-2xl">ثبت نام کنید</h3>
                </div>
            </section>
        </main>
    )
}
export default Register