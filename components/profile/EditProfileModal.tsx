"use client";

import {Modal} from "@mantine/core";
import {CallbackFunction} from "@/interfaces/publlicInterfaces";
import * as Yup from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {useEffect} from "react";
import {showSuccessMessage} from "@/utils/notifications";
import TextInput from "@/components/inputs/TextInput";
import {IUser} from "@/interfaces/userInterfaces";
import {useEditProfileMutation} from "@/data/services/User";
import SpinnerButton from "@/components/loaders/SpinnerButton";
import TextAreaInput from "@/components/inputs/TextAreaInput";

interface IProps {
    profile: IUser;
    opened: boolean;
    handleClose: CallbackFunction;
}

const EditProfileModal = ({profile, opened, handleClose}: IProps) => {
    type FormValues = {
        firstName: string;
        lastName: string;
        bio: string;
        userId: string;
    };
    const [editProfile, resultEditProfile] = useEditProfileMutation();

    const schema = Yup.object().shape({
        firstName: Yup.string()
            .required("نام الزامی است.")
            .min(3, "نام حداقل باید سه کاراکتر باشد."),
        lastName: Yup.string().required("نام خانوادگی الزامی است.").min(3, "نام خانوادگی حداقل باید سه کاراکتر باشد."),
        bio: Yup.string().required("بیوگرافی الزامی است."),
        userId: Yup.string().required("شناسه کاربر الزامی است."),
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
        defaultValues: {firstName: profile.firstName, lastName: profile.lastName, bio: profile.bio,userId:profile._id},
    });

    const handleEditProfile = (data: any) => {
        editProfile(data);
    };

    useEffect(() => {
        if (resultEditProfile.data?.success === true) {
            showSuccessMessage(resultEditProfile.data.message);
            reset({
                userId:profile._id,
                bio:profile.bio,
                lastName:profile.lastName,
                firstName:profile.firstName
            });
            handleClose();
        }
    }, [resultEditProfile]);
    useEffect(() => {
        reset({
            userId:profile._id,
            bio:profile.bio,
            lastName:profile.lastName,
            firstName:profile.firstName
        });
    }, [opened]);

    return (
        <Modal
            opened={opened}
            onClose={handleClose}
            title="ویرایش پروفایل"
            centered
        >
            <form onSubmit={handleSubmit(handleEditProfile)} className="w-full ">
                <TextInput
                    name="firstName"
                    control={control}
                    type="text"
                    errors={errors}
                    placeholder="نام"
                    label="نام"
                />
                <TextInput
                    name="lastName"
                    control={control}
                    type="text"
                    errors={errors}
                    placeholder="نام خانوادگی"
                    label="نام خانوادگی"
                />
                <TextAreaInput name="bio" errors={errors} label="بیوگرافی" control={control} placeholder="بیوگرافی"/>
                <button type="submit" className="btn bg-blue-500 text-white mt-4 text-base font-medium sm:w-full">
                    {resultEditProfile.isLoading ? <SpinnerButton/> : "ویرایش پروفایل"}
                </button>
            </form>
        </Modal>
    );
};
export default EditProfileModal;
