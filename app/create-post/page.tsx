'use client'

import * as Yup from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {useCreatePostMutation} from "@/data/services/Post";
import {useRouter} from "next/navigation";
import {useEffect, useState} from "react";
import {showErrorMessage, showSuccessMessage} from "@/utils/notifications";
import {useGetAllCategoryQuery} from "@/data/services/Category";
import {OptionSelect} from "@/interfaces/publlicInterfaces";
import {ICategory} from "@/interfaces/categoryInterfaces";
import TextInput from "@/components/inputs/TextInput";
import SelectInput from "@/components/inputs/SelectInput";
import TextAreaInput from "@/components/inputs/TextAreaInput";
import ImageUploader from "@/components/inputs/ImageUploader";
import SpinnerButton from "@/components/loaders/SpinnerButton";

const CreatePost = () => {

    // services
    const [createPost, resultCreatePost] = useCreatePostMutation()
    const {data: categoryData, isLoading: isLoadingCategory} = useGetAllCategoryQuery();

    // options
    const [categoryOption, setCategoryOptions] = useState<OptionSelect[]>([])

    const router = useRouter()

    type FormValues = {
        title: string,
        description: string,
        category_id: string
    }

    const schema = Yup.object().shape({
        title: Yup.string().required("وارد کردن عنوان الزامی است."),
        description: Yup.string().required("وارد کردن توضیحات الزامی است."),
        category_id: Yup.string().required("انتخاب دسته بندی الزالمی است.")
    });

    const {handleSubmit, control, formState: {errors}, getValues, setValue, reset} = useForm<FormValues>({
        resolver: yupResolver(schema),
        defaultValues: {}
    })

    const handleCreatePost = (data:any) => {
        if (data.image === undefined) {
            showErrorMessage("انتخاب ویدیو الزامی است.")
            return
        }
        createPost(data)
    }

    useEffect(() => {
        if (resultCreatePost?.data?.success === true) {
            showSuccessMessage(resultCreatePost?.data?.message)
            router.push("/")
        }
    }, [resultCreatePost]);

    useEffect(() => {
        if (categoryData?.success === true) {
            const newList = categoryData?.data.map((item: ICategory) => {
                return {
                    label: item.title,
                    value: item._id
                }
            })
            setCategoryOptions(newList)
        }
    }, [categoryData])

    return (
        <main className="main-container  text-white ">
            <h1 className="mt-20 text-center font-bold mb-20">ایجاد پست جدید</h1>
            <form onSubmit={handleSubmit(handleCreatePost)} className="">
                <div className="w-full flex-col md:flex-row flex gap-8">
                    <div className="flex flex-col gap-4 w-full sm:w-1/2">
                        <TextInput name="title" control={control} type="text" errors={errors} label="عنوان"
                                   placeholder="عنوان پست"/>
                        <TextAreaInput name="description" control={control} errors={errors} label="توضیحات پست"
                                       placeholder="توضیحات پست"/>
                    </div>
                    <div className="flex flex-col gap-4 w-full sm:w-1/2">
                        <SelectInput list={categoryOption} name="category_id"
                                     classNames={{classContainer: "w-full"}}
                                     control={control} errors={errors} label="انتخاب دسته بندی"
                                     isLoading={isLoadingCategory} placeholder="انتخاب دسته بندی"/>
                        <ImageUploader name="image" control={control} errors={errors} text="یک تصویر انتخاب کنید"/>
                    </div>
                </div>
                <div className="flex-center mt-4">
                    <button type="submit" disabled={resultCreatePost.isLoading} className="btn bg-green-700 text-base w-full flex-center sm:w-auto font-medium ">{resultCreatePost.isLoading ? <SpinnerButton/>: "ایجاد پست"}</button>

                </div>
            </form>
        </main>
    )
}
export default CreatePost