"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import Cookie from "js-cookie";
import { Menu } from "@mantine/core";

// icons
import { MdCloudUpload } from "react-icons/md";

// modals
import ConfirmModal from "@/components/confirmModal/ConfirmModal";

// redux
import { RootState } from "@/data/store";
import { logoutUser } from "@/data/slice/User";
import { useDispatch, useSelector } from "react-redux";

const Header = () => {
  // redux and data
  const { profile, login } = useSelector((state: RootState) => state.userData);
  const dispatch = useDispatch();

  const router = useRouter();

  // variables
  const [showExitModal, setShowExitModal] = useState<boolean>(false);

  // functions
  const handleLogout = async () => {
    dispatch(logoutUser());
    Cookie.remove("token");
    router.push("/login");
  };

  return (
    <header className="w-full py-4 fixed top-0 shadow-lg bg-background z-10">
      <nav className="main-container flex justify-between items-center">
        {!login ? (
          <div className="flex justify-start items-center gap-4">
            <Link href="/register" className="text-white hover:text-[#74af72]">
              ثبت نام
            </Link>
            <Link href="/login" className="text-white hover:text-[#74af72]">
              ورود
            </Link>
          </div>
        ) : (
          <div className="flex justify-start items-center gap-4">
            <Menu trigger="click-hover" shadow="md" width={200}>
              <Menu.Target>
                <img
                  src={profile?.profilePhoto}
                  className="w-10 h-10 rounded-full"
                  alt="profile image"
                />
              </Menu.Target>
              <Menu.Dropdown>
                <Menu.Item component={Link} href={`/profile/${profile?._id}`}>
                  پروفایل
                </Menu.Item>
                <Menu.Item component={Link} href={`/profile/change-password`}>
                  تغییر پسورد
                </Menu.Item>
                <Menu.Item onClick={() => setShowExitModal(true)}>
                  خروج
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
            <Link href="/" className="text-white hover:text-[#74af72]">
              خانه
            </Link>
            <Link href="/category" className="text-white hover:text-[#74af72]">
              ایجاد دسته بندی
            </Link>
            {profile?.isAdmin && (
              <Link href="/users" className="text-white hover:text-[#74af72]">
                کاربران
              </Link>
            )}
            <p
              onClick={() => setShowExitModal(true)}
              className="text-white hover:text-[#74af72] cursor-pointer"
            >
              خروج
            </p>
          </div>
        )}
        <div className="flex gap-5 items-center">
          {login && (
            <Link
              href="/create-post"
              className="flex-center gap-2 bg-rose-400 px-3 h-10 rounded-lg"
            >
              <p className="text-white">ایجاد پست</p>
              <MdCloudUpload color="white" />
            </Link>
          )}
          <Link href="/" className="text-white hover:text-[#74af72]">
            Home
          </Link>
        </div>
      </nav>
      {/*modals*/}
      <ConfirmModal
        opened={showExitModal}
        handleClose={() => setShowExitModal(false)}
        handleConfirm={() => handleLogout()}
        title="خروج از حساب کاربری"
        question="آیا میخواهید از حساب کاربری خود خارج شوید؟"
      />
    </header>
  );
};
export default Header;
