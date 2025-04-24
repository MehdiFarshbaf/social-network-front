"use client";

import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import TextInput from "@/components/inputs/TextInput";
import TextAreaInput from "@/components/inputs/TextAreaInput";
import { useSelector } from "react-redux";
import { RootState } from "@/data/store";
import { useSearchParams } from "next/navigation";
import { useSendEmailMutation } from "@/data/services/Email";
import { useEffect } from "react";
import { showSuccessMessage } from "@/utils/notifications";
import { useRouter } from "next/navigation";

// export const metadata = {
//   title: "ارسال ایمیل",
// };

const SendEmailPage = () => {
  type FormValues = {
    email: string;
    to?: string | null;
    subject: string;
    message: string;
  };
  const router = useRouter();
  // services
  const [sendEmail, resultSendEmail] = useSendEmailMutation();

  const { profile } = useSelector((state: RootState) => state.userData);

  const searchParams = useSearchParams();

  const to = searchParams.get("to");

  const schema = Yup.object().shape({
    email: Yup.string()
      .email("ایمیل وارد شده معتبر نمی باشد.")
      .required("ایمیل الزامی است."),
    to: Yup.string().email("ایمیل وارد شده معتبر نمی باشد."),
    subject: Yup.string().required("عنوان پیام الزامی است."),
    message: Yup.string().required("پیام الزامی است."),
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
    getValues,
    setValue,
    reset,
  } = useForm<any>({
    resolver: yupResolver(schema),
    defaultValues: {
      email: profile?.email,
      to: to !== undefined ? to : "",
    },
  });

  const handleSendEmail: SubmitHandler<FormValues> = async (values) => {
    sendEmail(values);
  };

  useEffect(() => {
    if (resultSendEmail.data?.success === true) {
      showSuccessMessage(resultSendEmail.data.message);
      router.back();
    }
  }, [resultSendEmail]);

  return (
    <main className="main-container mt-20 flex-center">
      <section className="w-full flex-center text-white min-h-svh main-container">
        <div className="w-2/5 flex-center">
          <form
            onSubmit={handleSubmit(handleSendEmail)}
            className="rounded-xl p-8 bg-neutral-800 w-full flex flex-col gap-3"
          >
            <h1 className="text-center font-semibold text-2xl">ارسال ایمیل</h1>
            <TextInput
              disable={true}
              name="to"
              control={control}
              type="email"
              errors={errors}
              label="ایمیل گیرنده"
              placeholder="ایمیل گیرنده"
            />
            <TextInput
              name="subject"
              control={control}
              type="text"
              errors={errors}
              label="موضوع ایمیل"
              placeholder="موضوع ایمیل"
            />
            <TextAreaInput
              name="message"
              control={control}
              errors={errors}
              label="متن پیام"
              placeholder="متن پیام"
            />
            <button
              type="submit"
              //   disabled={resultLoginUser.isLoading}
              className="btn bg-green-700 text-base font-medium sm:w-full"
            >
              ارسال
              {/* {resultLoginUser.isLoading ? <SpinnerButton /> : "ورود"} */}
            </button>
          </form>
        </div>
      </section>
    </main>
  );
};
export default SendEmailPage;
