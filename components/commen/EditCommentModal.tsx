"use client";

import { Modal } from "@mantine/core";
import { CallbackFunction } from "@/interfaces/publlicInterfaces";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { showSuccessMessage } from "@/utils/notifications";
import { IComment } from "@/interfaces/commentInterfaces";
import { useEditCommentMutation } from "@/data/services/Post";
import TextAreaInput from "../inputs/TextAreaInput";

interface IProps {
  comment: IComment;
  opened: boolean;
  handleClose: CallbackFunction;
}

const EditCommentModal = ({ comment, opened, handleClose }: IProps) => {
  type FormValues = {
    message: string;
    commentId: string;
  };
  const [editComment, resultEditComment] = useEditCommentMutation();

  const schema = Yup.object().shape({
    message: Yup.string()
      .required("عنوان دسته بندی الزامی است.")
      .min(3, "دسته بندی حداقل باید 3 کاراکتر باشد."),
      commentId: Yup.string().required()
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
    getValues,
    setValue,
    reset,
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
    defaultValues: { message: comment.message, commentId: comment._id },
  });

  const handleEditCategory = (data: any) => {
    editComment(data);
  };

  useEffect(() => {
    if (resultEditComment.data?.success === true) {
      showSuccessMessage(resultEditComment.data.message);
      reset({ message: "" });
      handleClose();
    }
  }, [resultEditComment]);

  return (
    <Modal
      opened={opened}
      onClose={handleClose}
      title="ویرایش نظر"
      centered
    >
      <form onSubmit={handleSubmit(handleEditCategory)} className="w-full ">
      <TextAreaInput name="message" classNames={{classLabel:"text-white"}} control={control} errors={errors} label="نظر شما"
                                       placeholder="نظر خودتو بنویس"/>
        <button
          type="submit"
          className="btn bg-blue-500 text-white mt-4 text-base font-medium sm:w-full"
        >
          {" "}
          ویرایش نظر
        </button>
      </form>
    </Modal>
  );
};
export default EditCommentModal;
