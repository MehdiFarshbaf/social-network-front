"use client";

import { useGetPopularPostQuery } from "@/data/services/Post";
import { useGetPopularUsersQuery } from "@/data/services/User";
import { IPost } from "@/interfaces/postInterfaces";
import { IUser } from "@/interfaces/userInterfaces";
import Link from "next/link";
import { useEffect, useState } from "react";

const SideBar = () => {
  const { data: dataPosts, isLoading: loadingPosts } = useGetPopularPostQuery();
  const { data: dataUsers, isLoading: loadingUsers } =
    useGetPopularUsersQuery();
  const [posts, setPosts] = useState<IPost[]>([]);
  const [users, setUsers] = useState<IUser[]>([]);

  useEffect(() => {
    if (dataPosts?.success == true) {
      setPosts(dataPosts.data);
    }
  }, [dataPosts]);
  
  useEffect(() => {
    if (dataUsers?.success == true) {
      setUsers(dataUsers.data);
    }
  }, [dataUsers]);

  return (
    <aside className="w-1/3  h-min flex flex-col gap-8">
      <div className="bg-gray-100/40 rounded-xl p-8">
        <p className="text-lg font-medium mb-4">پست های محبوب</p>
        <div className="flex flex-col gap-4 w-full">
          {posts.map((post) => (
            <div
              className="w-full flex justify-between items-center hover:bg-white p-1 transition-all duration-300"
              key={post._id}
            >
              <div className="flex items-center gap-2">
                <img
                  src={post.image}
                  className="w-[50px] h-[50px] object-cover"
                  alt="post image"
                />
                <p className="text-base font-normal">{post.title}</p>
              </div>
              <Link
                href={`/post/${post._id}`}
                className="h-10 border flex-center rounded px-3 text-black text-xs"
              >
                مشاهده
              </Link>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-gray-100/40 rounded-xl p-8">
        <p className="text-lg font-medium mb-4">محبوب ترین کاربران</p>
        <div className="flex flex-col gap-4 w-full">
          {users.map((user) => (
            <div
              className="w-full flex justify-between items-center hover:bg-white p-1 transition-all duration-300"
              key={user._id}
            >
              <div className="flex items-center gap-2">
                <img
                  src={user.profilePhoto}
                  className="w-[50px] h-[50px] object-cover"
                  alt="post image"
                />
                <p className="text-base font-normal">{user.fullname}</p>
              </div>
              <Link
                href={`/profile/${user._id}`}
                className="h-10 border flex-center rounded px-3 text-black text-xs"
              >
                مشاهده
              </Link>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
};
export default SideBar;
