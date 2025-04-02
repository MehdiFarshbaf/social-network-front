"use client";

import Loading from "@/components/loaders/Loading";
import { useGetUserProfileQuery } from "@/data/services/User";
// icons
import { RootState } from "@/data/store";
import { IUser } from "@/interfaces/userInterfaces";
import { showPersianDate } from "@/utils/functions";
import { useEffect, useState } from "react";
import {
  BsFillEmojiFrownFill,
  BsFillPeaceFill,
  BsFillPencilFill,
  BsWalletFill,
} from "react-icons/bs";
import { CiHeart } from "react-icons/ci";
import { IoIosWarning } from "react-icons/io";
import { useSelector } from "react-redux";
import PostListUser from "./PostListUser";

const ProfilePage = () => {
  //   redux data

  const { profile, login } = useSelector((state: RootState) => state.userData);

  const { data: profileData, isLoading } = useGetUserProfileQuery(
    { userId: profile ? profile._id : "" },
    { skip: !login || !profile }
  );

  const [profileUser, setProfileUser] = useState<IUser>();

  useEffect(() => {
    if (profileData?.success === true) {
      setProfileUser(profileData.data);
    }
  }, [profileData]);

  return (
    <main className="main-container mt-20">
      {profile?.isAccountVerified !== true && (
        <section className="w-full mb-6 rounded-[8px] bg-rose-400 p-2 flex items-center gap-2">
          <IoIosWarning className="text-yellow-300" />
          <p className="text-yellow-300 font-medium text-base">
            حساب کاربری شما تایید نشده است.
          </p>
          <button className="text-white px-2 h-9 bg-blue-500 rounded cursor-pointer">
            برای تایید حساب کاربری کلیک کنید.
          </button>
        </section>
      )}
      {profileUser?._id ? (
        <>
          <section className="w-full rounded-[8px] bg-white text-black p-8 mb-4">
            {/* user info */}
            <div className="w-full flex gap-3">
              <img
                src={profile?.profilePhoto}
                alt="user image"
                className="w-[130px] h-[130px] rounded-full"
              />
              <div className="flex flex-col">
                <div
                  className={`flex-center px-4 min-w-[250px] mb-4 rounded ${
                    profile?.isAccountVerified == true
                      ? "bg-green-600"
                      : "bg-rose-400"
                  }`}
                >
                  <p className="text-white">
                    {profile?.isAccountVerified === true
                      ? "حساب کاربری تایید شده"
                      : "حساب کاربری تایید نشده"}
                  </p>
                </div>
                <p className="font-medium mb-4">{profile?.fullname}</p>
                {profile && (
                  <p>
                    عضویت از :{" "}
                    {showPersianDate(profile?.createdAt, "DD/MMM/YYYY")}
                  </p>
                )}
                <div className="w-full flex justify-between items-center gap-4">
                  <p>{`پست ها : ${profileUser.posts.length}`}</p>
                  <p className="text-xs text-sky-600 font-normal">{`دنبال کننده ها : ${profileUser.followers.length}`}</p>
                  <p className="text-xs text-sky-600 font-normal">{`دنبال شونده ها : ${profileUser.following.length}`}</p>
                </div>
              </div>

              <div className="flex-1 flex justify-evenly items-end">
                <div className="flex-center gap-4">
                  <button className="flex-center h-9 px-2 gap-1 rounded-[8px] text-white bg-green-400">
                    دنبال کردن <CiHeart />
                  </button>
                  <button className="flex-center h-9 px-2 gap-1 rounded-[8px] text-white bg-red-400">
                    لغو دنبال کردن <BsFillEmojiFrownFill />
                  </button>
                </div>

                <div className="flex-center gap-4">
                  <button className="flex-center h-9 px-2 gap-1 rounded-[8px] text-blue-400  bg-yellow-200">
                    ویرایش پروفایل <BsFillPencilFill />
                  </button>
                  <button className="flex-center h-9 px-2 gap-1 rounded-[8px] text-white bg-blue-500">
                    ارسال پیام <BsWalletFill />
                  </button>
                </div>
              </div>
            </div>
            {profileUser.bio.length > 0 && (
              <p className="mt-5">{`درباره ی من : ${profileUser.bio}`}</p>
            )}
          </section>
          <section className="flex gap-8 mt-20">
            <PostListUser postList={profileUser.posts} />
            <aside className="w-1/3 text-white">
            <h1 className="mb-5">بازدیده های اخیر</h1>
            {profileUser.viewedBy.map((user,index)=>(
              <div className="w-full flex items-center gap-4">
                <img src={user.profilePhoto} alt="user image" className="w-12 h-12 rounded-full" />
                <p>{user.fullname}</p>
              </div>
            ))}
            </aside>
          </section>
        </>
      ) : (
        <Loading />
      )}
    </main>
  );
};
export default ProfilePage;
