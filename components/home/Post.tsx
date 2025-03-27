"use client";

import { IPost } from "@/interfaces/postInterfaces";
import { showPersianDate } from "@/utils/functions";

import { IoEyeOutline } from "react-icons/io5";
import { BiLike, BiDislike } from "react-icons/bi";
import Link from "next/link";
import { useDislikePostMutation, useLikePostMutation } from "@/data/services/Post";
import { useEffect } from "react";
import { showErrorMessage, showSuccessMessage } from "@/utils/notifications";

interface IProps {
  post: IPost;
}

const Post = ({ post }: IProps) => {

  // services
  const [likePost,resultLikePost] = useLikePostMutation()
  const [dislikePost,resultDisLikePost] = useDislikePostMutation()

  useEffect(()=>{
    if(resultLikePost.data?.success === true){
      showSuccessMessage(resultLikePost.data.message)
    }else if (resultLikePost.data?.success === false){
      showErrorMessage(resultLikePost.data.message)
    }
  },[resultLikePost])

  useEffect(()=>{
    if(resultDisLikePost.data?.success === true){
      showSuccessMessage(resultDisLikePost.data.message)
    }else if (resultDisLikePost.data?.success === false){
      showErrorMessage(resultDisLikePost.data.message)
    }
  },[resultDisLikePost])

  return (
    <div className="text-black bg-white w-full rounded-xl p-6 flex gap-4">
      <img
        src={post.user.profilePhoto}
        alt="user image"
        className="w-16 h-16 rounded-full"
      />
      <div className="flex-1">
        <div className="w-full flex justify-between items-center">
          <p className="font-medium text-sm">{post.user.fullname}</p>
          <p className="font-medium text-sm">
            {showPersianDate(post.createdAt, "YYYY/MM/DD")}
          </p>
        </div>
        <Link href={`/post/${post._id}`}><img
          src={post.image}
          alt="post image"
          className="w-[180px] h-[180px] mt-10 rounded-lg border "
        /></Link>
        <Link href={`/post/${post._id}`}><p className="text-base mt-2 font-normal">{post.title}</p></Link>
        <div className="w-full flex justify-between items-center mt-3">
          <div className="flex gap-2 items-center">
            <IoEyeOutline />
            <p className="text-xs">
              {post.numberViews == 0 ? "بدون بازدید" : post.numberViews}
            </p>
          </div>
          <div className="flex gap-2 items-center">
            <BiDislike onClick={()=>dislikePost({_id:post._id})} className="text-rose-500 cursor-pointer"/>
            <span className="text-xs text-rose-500">{post.disLikes.length}</span>
            <BiLike onClick={()=>likePost({_id:post._id})} className="text-green-600 cursor-pointer"/>
            <span className="text-xs text-green-600">{post.likes.length}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Post;
