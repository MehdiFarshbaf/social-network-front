import { useAddCommentMutation } from "@/data/services/Post";
import { showSuccessMessage } from "@/utils/notifications";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import TextAreaInput from "../inputs/TextAreaInput";
import SpinnerButton from "../loaders/SpinnerButton";

interface IProps {
  postId: string;
}

const AddComment = ({ postId }: IProps) => {
  type FormValues = {
    message: string;
    postId: string;
  };

  const schema = Yup.object().shape({
    message: Yup.string()
      .required("پیام نظر الزامی است.")
      .min(3, "حداقل باید 3 کاراکتر باشد."),
    postId: Yup.string().required(),
  });

  // services
  const [addComment, resultAddComment] = useAddCommentMutation();

  const {
    handleSubmit,
    control,
    formState: { errors },
    getValues,
    setValue,
    reset,
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
    defaultValues: { message: "", postId },
  });

  const handleAddComment = (data: FormValues) => {
    addComment(data);
  };

  useEffect(() => {
    if (resultAddComment.data?.success === true) {
      showSuccessMessage(resultAddComment.data.message);
      reset()
    }
  }, [resultAddComment]);

  return (
    <section className="mt-10">
       <form onSubmit={handleSubmit(handleAddComment)} className="">
                    <div className="flex flex-col gap-4 w-full sm:w-1/2">
                        <TextAreaInput name="message" classNames={{classLabel:"text-white"}} control={control} errors={errors} label="نظر شما"
                                       placeholder="نظر خودتو بنویس"/>
                    </div>
                    
                <div className="flex mt-4">
                    <button type="submit" disabled={resultAddComment.isLoading} className="btn text-white bg-blue-400 text-base w-full flex-center sm:w-auto font-medium ">{resultAddComment.isLoading ? <SpinnerButton/>: "ارسال"}</button>

                </div>
            </form>
    </section>
  );
};
export default AddComment;
