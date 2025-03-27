"use client";

import ListCategory from "@/components/category/ListCategory";
import TextInput from "@/components/inputs/TextInput";
import {useCreateCategoryMutation} from "@/data/services/Category";
import {showSuccessMessage} from "@/utils/notifications";
import {yupResolver} from "@hookform/resolvers/yup";
import {useEffect} from "react";
import {useForm} from "react-hook-form";
import {BiCategory} from "react-icons/bi";

import * as Yup from "yup";

const Category = () => {
    type FormValues = {
        title: string;
    };

    //   services
    const [createCategory, resultCreateCategory] = useCreateCategoryMutation();

    const schema = Yup.object().shape({
        title: Yup.string()
            .required("عنوان دسته بندی الزامی است.")
            .min(3, "دسته بندی حداقل باید 3 کاراکتر باشد."),
    });

    const {
        handleSubmit,
        control,
        formState: {errors},
        getValues,
        setValue,
        reset,
    } = useForm<FormValues>({
        resolver: yupResolver(schema),
        defaultValues: {title: ""},
    });

    const handleCreatePost = (data:any) => {
        createCategory(data);
    };

    useEffect(() => {
        if (resultCreateCategory.data?.success === true) {
            showSuccessMessage(resultCreateCategory.data.message);
            reset({title: ""});
        }
    }, [resultCreateCategory]);

    return (
        <main className="flex-center flex-col min-h-svh w-full main-container">
            <BiCategory color="white" size={35}/>
            <form
                onSubmit={handleSubmit(handleCreatePost)}
                className="w-full sm:w-2/3"
            >
                <TextInput
                    name="title"
                    control={control}
                    type="text"
                    errors={errors}
                    placeholder="دسته بندی جدید"
                />
                <button
                    type="submit"
                    className="btn bg-blue-500 text-white mt-4 text-base font-medium sm:w-full"
                >
                    ایجاد دسته بندی
                </button>
            </form>
            <ListCategory/>
        </main>
    );
};
export default Category;
