import PostCard from "@/components/home/PostCard";
import { IPost } from "@/interfaces/postInterfaces";

interface IProps {
    postList: IPost[];
}
const PostListUser = ({ postList }: IProps) => {
  return (
    <div className="w-full flex flex-col gap-4 mb-8 px-2">
      {postList.map((post, index) => (
        <PostCard post={post} key={index} />
      ))}
    </div>
  );
};

export default PostListUser;
