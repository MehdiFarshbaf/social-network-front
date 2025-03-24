"use client";

import { RootState } from "@/data/store";
import { Menu, MenuItem } from "@mantine/core";

import Link from "next/link";
import { useSelector } from "react-redux";

// icons
import { MdCloudUpload } from "react-icons/md";

const Header = () => {
  //   redux data
  const { profile, login } = useSelector((state: RootState) => state.userData);

  return (
    <header className="w-full py-4 bg-[#ffffff00] fixed top-0">
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
                <Menu.Item>پروفایل</Menu.Item>
                <Menu.Item>تغییر پسورد</Menu.Item>
                <Menu.Item>خروج</Menu.Item>
              </Menu.Dropdown>
            </Menu>
            <Link href="/" className="text-white hover:text-[#74af72]">
              خانه
            </Link>
            <Link
              href="/category"
              className="text-white hover:text-[#74af72]"
            >
              ایجاد دسته بندی
            </Link>
            <p className="text-white hover:text-[#74af72] cursor-pointer">
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
    </header>
  );
};
export default Header;
