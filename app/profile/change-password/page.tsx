'use client'
import TextInput from "@/components/inputs/TextInput";
import { useUpdatePasswordMutation } from "@/data/services/User";
import { showSuccessMessage } from "@/utils/notifications";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import * as Yup from "yup";
const ChangeUserPassword = () => {
  type FormValues = {
    password: string;
  };
  const [updatePassword,resultUpdatePassword]=useUpdatePasswordMutation()

  const schema = Yup.object().shape({
    password: Yup.string().required("گذرواژه الزامی است."),
  });

  const router = useRouter()

  const {
    handleSubmit,
    control,
    formState: { errors },
    getValues,
    setValue,
    reset,
  } = useForm<any>({
    resolver: yupResolver(schema),
  });

  const handleSendEmail: SubmitHandler<FormValues> = async (values) => {
    updatePassword(values);
  };

  useEffect(() => {
    if (resultUpdatePassword.data?.success === true) {
      showSuccessMessage(resultUpdatePassword.data.message);
      router.push("/");
    }
  }, [resultUpdatePassword]);
  return (
    <main className="main-container mt-20 flex-center">
      <section className="w-full flex-center text-white min-h-svh main-container">
        <div className="w-2/5 flex-center">
          <form
            onSubmit={handleSubmit(handleSendEmail)}
            className="rounded-xl p-8 bg-neutral-800 w-full flex flex-col gap-3"
          >
            <h1 className="text-center font-semibold text-2xl">تغییر پسورد</h1>
            <TextInput
              name="password"
              control={control}
              type="password"
              errors={errors}
              label="گذرواژه شما"
              placeholder="گذرواژه شما"
            />
            <button
              type="submit"
              //   disabled={resultLoginUser.isLoading}
              className="btn bg-green-700 text-base font-medium sm:w-full"
            >
              ذخیره
              {/* {resultLoginUser.isLoading ? <SpinnerButton /> : "ورود"} */}
            </button>
          </form>
        </div>
      </section>
    </main>
  );
};
export default ChangeUserPassword;
