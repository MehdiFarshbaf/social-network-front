"use client";

import { useGetAllPostQuery } from "@/data/services/Post";
import { IPost } from "@/interfaces/postInterfaces";
import { useEffect, useState } from "react";
import Post from "./Post";

const PostList = () => {
  const { data: dataPosts, isLoading } = useGetAllPostQuery();
  const [postList, setPostList] = useState<IPost[]>([]);

  useEffect(() => {
    if (dataPosts?.success === true) {
      setPostList(dataPosts.data);
    }
  }, [dataPosts]);

  return (
    <section className="flex flex-col gap-8">
      {postList.map((post, index) => (
        <Post post={post} key={index} />
      ))}
    </section>
  );
};
export default PostList;
