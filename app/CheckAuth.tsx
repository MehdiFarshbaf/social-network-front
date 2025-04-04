"use client";

import {FC, Fragment, ReactNode, useEffect, useState} from "react";
import {usePathname, useRouter} from "next/navigation";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@/data/store";
import Cookie from "js-cookie";
import {useGetProfileQuery} from "@/data/services/User";
import {skip} from "node:test";
import {setProfile} from "@/data/slice/User";

interface IProps {
    children: ReactNode;
}

const CheckAuth = ({children}: IProps) => {
    const [checked, setChecked] = useState<boolean>(false);

    // services
    const {data: profileData,
        isLoading: isLoadingProfile,
        refetch,
    } = useGetProfileQuery({skip: !checked});

    const pathname = usePathname();
    const router = useRouter();
    const dispatch = useDispatch();

    //   redux data
    const {profile, login} = useSelector((state: RootState) => state.userData);

    const checkToken = async () => {
        await setChecked(true);
    };

    const checkPath = () => {
    };

    useEffect(() => {
        console.log("path is : ", pathname);

        if (!login) {
            const token = Cookie.get("token");
            console.log("token is : ", token);
            if (token) {
                checkToken();
            } else {
            }
        }
    }, [pathname]);

    useEffect(() => {
        if (profileData?.success === true && checked) {
            dispatch(setProfile(profileData.data));
        }
    }, [profileData]);

    return <Fragment>{children}</Fragment>;
};

export default CheckAuth;
