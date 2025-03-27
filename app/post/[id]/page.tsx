"use client";

import Loading from "@/components/loaders/Loading";
import { useGetPostQuery } from "@/data/services/Post";
import { IPost } from "@/interfaces/postInterfaces";
import { showPersianDate } from "@/utils/functions";
import { Tooltip } from "@mantine/core";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { BsChevronLeft } from "react-icons/bs";
import { BsFillTrash3Fill } from "react-icons/bs";
import { FiEdit } from "react-icons/fi";

const PostDetail = () => {
  const params = useParams<{ id: string }>();
  const { data, isLoading } = useGetPostQuery({
    _id: params.id ? params.id : "",
  });
  const [post, setPost] = useState<IPost>();

  useEffect(() => {
    if (data?.success === true) {
      setPost(data.data);
    }
  }, [data]);

  return (
    <main className="mt-20 main-container">
      {isLoading ? (
        <Loading />
      ) : (
        <section>
          {/* breadcrumb */}
          <div className="flex items-center gap-3 text-white">
            <p className="text-xs">شبکه اجتماعی</p>
            <BsChevronLeft className="text-xs" />
            <p className="text-xs">دسته بندی</p>
            <BsChevronLeft className="text-xs" />
            <p className="text-xs">{post?.category.title}</p>
          </div>
          {/* end breadcrumb */}

          {/* title and date */}
          <div className="mt-5 w-full flex justify-between items-center text-white">
            <h1 className="font-bold  text-[#c2a800]">{post?.title}</h1>
            {post?.createdAt && (
              <strong>{showPersianDate(post?.createdAt, "YYYY/MM/DD")}</strong>
            )}
          </div>
          {/* end title and date */}

          <div className="w-full flex gap-6 mt-8 text-white">
            <div className="info flex-1">
              <div className="w-full flex justify-between items-center mb-5">
                <div className="flex items-center gap-5">
                  <img
                    src={post?.user.profilePhoto}
                    alt="user image"
                    className="rounded-full w-[50px] h-[50px]"
                  />
                  <p>{post?.user.fullname}</p>
                </div>
                <div className="flex gap-4">
                 <Tooltip label="ویرایش این پست"><Link href={`/post/edit/${post?._id}`}><FiEdit className="text-green-600"/></Link></Tooltip>
                  <Tooltip label="حذف پست"><BsFillTrash3Fill className="text-red-600 cursor-pointer" /></Tooltip>
                </div>
              </div>
              <p>{post?.description}</p>
            </div>
            <img src={post?.image} className="w-[350px]" alt="image post" />
          </div>
        </section>
      )}
    </main>
  );
};
export default PostDetail;
