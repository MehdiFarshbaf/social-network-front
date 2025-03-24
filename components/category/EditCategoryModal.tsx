'use client'

import {Modal} from '@mantine/core';
import {ICategory} from "@/interfaces/categoryInterfaces";
import {CallbackFunction} from "@/interfaces/publlicInterfaces";
import {useEditCategoryMutation} from "@/data/services/Category";
import * as Yup from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {useEffect} from "react";
import {showSuccessMessage} from "@/utils/notifications";
import TextInput from "@/components/inputs/TextInput";

interface IProps {
    category: ICategory,
    opened: boolean,
    handleClose: CallbackFunction,
}

const EditCategoryModal = ({category, opened, handleClose}: IProps) => {

    type FormValues = {
        title: string;
    };
    const [editCategory, resultEditCategory] = useEditCategoryMutation();

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
        defaultValues: {title: category.title,_id:category._id},
    });

    const handleEditCategory = (data) => {
        editCategory(data);
    };

    useEffect(() => {
        if (resultEditCategory.data?.success === true) {
            showSuccessMessage(resultEditCategory.data.message);
            reset({title: ""});
            handleClose()
        }
    }, [resultEditCategory]);


    return (
        <Modal opened={opened} onClose={handleClose} title="ویرایش دسته بندی" centered>
            <form onSubmit={handleSubmit(handleEditCategory)} className="w-full ">
                <TextInput name="title" control={control} type="text" errors={errors} placeholder="دسته بندی جدید"/>
                <button type="submit" className="btn bg-blue-500 text-white mt-4 text-base font-medium sm:w-full"> ویرایش
                    دسته بندی
                </button>
            </form>
        </Modal>
    )
}
export default EditCategoryModal