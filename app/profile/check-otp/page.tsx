"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { PinInput } from "@mantine/core";
import InputOTP from "@/components/inputs/InputOTP";
import { useEffect } from "react";
import { showSuccessMessage } from "@/utils/notifications";
import { useRouter } from "next/navigation";
import { useCheckOTPMutation } from "@/data/services/User";

const CheckOTP = () => {
  type FormValues = {
    otpCode: string;
  };

  const schema = Yup.object().shape({
    otpCode: Yup.string().required("وارد کردن کد الزامی است.").length(6),
  });

  const router = useRouter();

  const [checkOTP, resultCheckOTP] = useCheckOTPMutation();

  const {
    handleSubmit,
    control,
    formState: { errors },
    getValues,
    setValue,
    reset,
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
    defaultValues: {},
  });

  const handleSendEmail: SubmitHandler<any> = async (values) => {
    checkOTP(values);
  };

  useEffect(() => {
    if (resultCheckOTP.data?.success) {
      showSuccessMessage(resultCheckOTP.data.message);
      router.push("/");
    }
  }, [resultCheckOTP]);

  return (
    <main className="main-container mt-20">
      <section className="w-full flex-center text-white min-h-svh main-container">
        <div className="w-2/5 flex-center">
          <form
            onSubmit={handleSubmit(handleSendEmail)}
            className="rounded-xl p-8 bg-neutral-800 w-full flex flex-col gap-3"
          >
            <h1 className="text-center font-semibold text-2xl">
              کد ارسال شده به ایمیلتان رو وارد کنید.
            </h1>
            <InputOTP
              name="otpCode"
              control={control}
              errors={errors}
              setValue={setValue}
            />
            <button
              type="submit"
              //   disabled={resultLoginUser.isLoading}
              className="btn bg-green-700 text-base font-medium sm:w-full"
            >
              تایید
              {/* {resultLoginUser.isLoading ? <SpinnerButton /> : "ورود"} */}
            </button>
          </form>
        </div>
      </section>
    </main>
  );
};
export default CheckOTP;
