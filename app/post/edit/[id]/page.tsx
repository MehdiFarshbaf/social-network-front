"use client";

import ImageUploader from "@/components/inputs/ImageUploader";
import SelectInput from "@/components/inputs/SelectInput";
import TextAreaInput from "@/components/inputs/TextAreaInput";
import TextInput from "@/components/inputs/TextInput";
import Loading from "@/components/loaders/Loading";
import SpinnerButton from "@/components/loaders/SpinnerButton";
import { useGetAllCategoryQuery } from "@/data/services/Category";
import { useEditPostMutation, useGetPostQuery } from "@/data/services/Post";
import { ICategory } from "@/interfaces/categoryInterfaces";
import { OptionSelect } from "@/interfaces/publlicInterfaces";
import {  showSuccessMessage } from "@/utils/notifications";
import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";

const EditPost = () => {
  const params = useParams<{ id: string }>();
  const [editPost, resultEditPost] = useEditPostMutation();
  const { data, isLoading } = useGetPostQuery({
    _id: params.id ? params.id : "",
  });
  const { data: categoryData, isLoading: isLoadingCategory } =
    useGetAllCategoryQuery();

  // options
  const [categoryOption, setCategoryOptions] = useState<OptionSelect[]>([]);

  const router = useRouter();

  type FormValues = {
    title: string;
    description: string;
    category_id: string;
    _id: string;
  };

  const schema = Yup.object().shape({
    _id: Yup.string().required(),
    title: Yup.string().required("وارد کردن عنوان الزامی است."),
    description: Yup.string().required("وارد کردن توضیحات الزامی است."),
    category_id: Yup.string().required("انتخاب دسته بندی الزالمی است."),
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
    defaultValues: {},
  });

  const handleEditPost = (data: any) => {
    editPost(data);
  };

  useEffect(() => {
    if (categoryData?.success === true) {
      const newList = categoryData?.data.map((item: ICategory) => {
        return {
          label: item.title,
          value: item._id,
        };
      });
      setCategoryOptions(newList);
    }
  }, [categoryData]);

  useEffect(() => {
    if (data?.success === true) {
      reset({
        category_id: data.data.category_id,
        description: data.data.description,
        title: data.data.title,
        _id: data.data._id,
      });
    }
  }, [data]);

  useEffect(() => {
    if (resultEditPost.data?.success === true) {
      showSuccessMessage(resultEditPost.data.message);
      router.push(`/post/${resultEditPost.data.data._id}`);
    }
  }, [resultEditPost]);
  return (
    <main className="mt-20 main-container text-white">
      <h1 className="text-center font-bold mb-20">ویرایش پست</h1>
      {isLoading ? <Loading/>:<form onSubmit={handleSubmit(handleEditPost)} className="">
        <div className="w-full flex-col md:flex-row flex gap-8">
          <div className="flex flex-col gap-4 w-full sm:w-1/2">
            <TextInput
              name="title"
              control={control}
              type="text"
              errors={errors}
              label="عنوان"
              placeholder="عنوان پست"
            />
            <TextAreaInput
              name="description"
              control={control}
              errors={errors}
              label="توضیحات پست"
              placeholder="توضیحات پست"
            />
          </div>
          <div className="flex flex-col gap-4 w-full sm:w-1/2">
            <SelectInput
              list={categoryOption}
              name="category_id"
              classNames={{ classContainer: "w-full" }}
              control={control}
              errors={errors}
              label="انتخاب دسته بندی"
              isLoading={isLoadingCategory}
              placeholder="انتخاب دسته بندی"
            />
            <ImageUploader
              srcImage={data?.data.image}
              name="image"
              control={control}
              errors={errors}
              text="یک تصویر انتخاب کنید"
            />
          </div>
        </div>
        <div className="flex-center gap-4 mt-4">
          <Link className="btn bg-blue-600 text-base w-full flex-center sm:w-auto font-medium " href={`/post/${params.id}`}>انصراف</Link>
          <button
            type="submit"
            disabled={resultEditPost.isLoading}
            className="btn bg-green-700 text-base w-full flex-center sm:w-auto font-medium "
          >
            {resultEditPost.isLoading ? <SpinnerButton /> : "ویرایش پست"}
          </button>
        </div>
      </form>}
    </main>
  );
};
export default EditPost;
