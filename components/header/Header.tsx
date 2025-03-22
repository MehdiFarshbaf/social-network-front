"use client";

import { RootState } from "@/data/store";

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
        <div className="flex justify-start items-center gap-4">
          <Link href="/register" className="text-white hover:text-[#74af72]">
            ثبت نام
          </Link>
          <Link href="/login" className="text-white hover:text-[#74af72]">
            ورود
          </Link>
        </div>
        <div className="flex gap-5 items-center">
          {login && (
            <Link href="/create-post" className="flex-center gap-2 bg-rose-400 px-3 h-10 rounded-lg">
              <p className="text-white">ایجاد پست</p>
              <MdCloudUpload  color="white" />
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
