"use client";

import Loading from "@/components/loaders/Loading";
import {
  useFollowUserMutation,
  useGetUserProfileQuery,
  useUnFollowUserMutation,
} from "@/data/services/User";

import { RootState } from "@/data/store";
import { IUser } from "@/interfaces/userInterfaces";
import { showPersianDate } from "@/utils/functions";
import { Fragment, useEffect, useState } from "react";
import {
  BsFillEmojiFrownFill,
  BsFillPencilFill,
  BsWalletFill,
} from "react-icons/bs";
import { CiHeart } from "react-icons/ci";
import { IoIosWarning } from "react-icons/io";
import { useSelector } from "react-redux";
import PostListUser from "../../../components/profile/PostListUser";
import ProfileImage from "@/components/profile/profileImage";
import EditProfileModal from "@/components/profile/EditProfileModal";
import { useParams } from "next/navigation";
import { showSuccessMessage } from "@/utils/notifications";
import Link from "next/link";
import LastVisits from "@/components/profile/LastVisits";
import { Tabs } from "@mantine/core";
import UsersList from "@/components/profile/UsersList";

const ProfilePage = () => {
  //   redux data

  const { profile, login } = useSelector((state: RootState) => state.userData);
  const params = useParams<{ id: string }>();

  const { data: profileData, isLoading } = useGetUserProfileQuery({
    userId: params.id,
  });

  const [followUser, resultFollow] = useFollowUserMutation();
  const [unFollowUser, resultUnFollow] = useUnFollowUserMutation();

  const [profileUser, setProfileUser] = useState<IUser>();

  const [showModalEditProfile, setShowModalEditProfile] =
    useState<boolean>(false);
  // for check followed
  const [isFollowed, setIsFollowed] = useState<boolean | undefined>(false);
  const [isMyProfile, setIsMyProfile] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string | null>("posts");

  const handleFollowing = async () => {
    if (isFollowed) {
      unFollowUser({ unFollowId: profileUser?._id ? profileUser._id : "" });
    } else {
      followUser({ followId: profileUser?._id ? profileUser._id : "" });
    }
  };

  useEffect(() => {
    if (profileData?.success === true) {
      setProfileUser(profileData.data);
    }
  }, [profileData]);

  useEffect(() => {
    if (profile && profileUser) {
      setIsMyProfile(profile && profile?._id === params.id);
    }
  }, [profileUser]);

  useEffect(() => {
    if (resultFollow.data?.success === true) {
      showSuccessMessage(resultFollow.data.message);
      setProfileUser(resultFollow.data.data);
    }
  }, [resultFollow]);

  useEffect(() => {
    if (resultUnFollow.data?.success === true) {
      showSuccessMessage(resultUnFollow.data.message);
      setProfileUser(resultUnFollow.data.data);
    }
  }, [resultUnFollow]);

  useEffect(() => {
    if (profile && profileUser?._id && profile._id) {
      const isExits = profileUser?.followers.find(
        (item) => item._id.toString() === profile?._id.toString()
      );
      setIsFollowed(isExits ? true : false);
    }
  }, [profile, profileUser]);

  return (
    <main className="main-container mt-20">
      {isMyProfile && profile?.isAccountVerified !== true && (
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
      {profileUser?._id && profile ? (
        <Fragment>
          <section className="w-full rounded-[8px] bg-white text-black p-8 mb-8 box-shadow">
            {/* user info */}
            <div className="w-full flex gap-3">
              <ProfileImage
                profileImage={profileUser.profilePhoto}
                enableEdit={isMyProfile}
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
                <p className="font-medium mb-4">{profileUser?.fullname}</p>
                {profileUser && (
                  <p>
                    عضویت از :{" "}
                    {showPersianDate(profileUser.createdAt, "DD/MMM/YYYY")}
                  </p>
                )}
              </div>

              <div className="flex-1 flex justify-evenly items-end">
                {!isMyProfile && (
                  <div className="flex-center gap-4">
                    {!isFollowed && (
                      <button
                        onClick={() => handleFollowing()}
                        className="flex-center h-9 px-2 gap-1 rounded-[8px] text-white bg-green-400"
                      >
                        دنبال کردن <CiHeart />
                      </button>
                    )}
                    {isFollowed && (
                      <button
                        onClick={() => handleFollowing()}
                        className="flex-center h-9 px-2 gap-1 rounded-[8px] text-white bg-red-400"
                      >
                        لغو دنبال کردن <BsFillEmojiFrownFill />
                      </button>
                    )}
                  </div>
                )}

                <div className="flex-center gap-4">
                  {isMyProfile && (
                    <button
                      onClick={() => setShowModalEditProfile(true)}
                      className="flex-center h-9 px-2 gap-1 rounded-[8px] text-blue-400  bg-yellow-200"
                    >
                      ویرایش پروفایل <BsFillPencilFill />
                    </button>
                  )}
                  {/*{profile && profile?._id !== params.id && <button*/}
                  {!isMyProfile && (
                    <button className="flex-center h-9 px-2 gap-1 rounded-[8px] text-white bg-blue-500">
                      ارسال پیام <BsWalletFill />
                    </button>
                  )}
                </div>
              </div>
            </div>
            {profileUser.bio.length > 0 && (
              <p className="mt-5">{`درباره ی من : ${profileUser.bio}`}</p>
            )}
          </section>

          <Tabs defaultValue="posts" value={activeTab} onChange={setActiveTab}>
            <Tabs.List>
              <Tabs.Tab value="posts">پست ها</Tabs.Tab>
              <Tabs.Tab value="followers">دنبال کننده ها</Tabs.Tab>
              <Tabs.Tab value="following">دنبال شونده ها</Tabs.Tab>
            </Tabs.List>
          </Tabs>
          <section className="flex gap-8 mt-20 ">
            {profileUser && profileUser?.posts?.length > 0 && (
              <div className="w-full flex-1">
                {activeTab === "posts" && (
                  <PostListUser postList={profileUser.posts} />
                )}
                {activeTab === "followers" && (
                  <UsersList usersList={profileUser.followers} />
                )}
                {activeTab === "following" && (
                  <UsersList usersList={profileUser.following} />
                )}
              </div>
            )}
            <LastVisits listUsers={profileUser.viewedBy} />
          </section>
          {/*modals*/}
          <EditProfileModal
            profile={profileUser}
            opened={showModalEditProfile}
            handleClose={() => setShowModalEditProfile(false)}
          />
        </Fragment>
      ) : (
        <Loading />
      )}
    </main>
  );
};
export default ProfilePage;
