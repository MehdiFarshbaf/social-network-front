import Post from "@/components/home/Post";
import { IPost } from "@/interfaces/postInterfaces";

interface IProps {
    postList: IPost[];
}
const PostListUser = ({ postList }: IProps) => {
  return (
    <div className="w-full flex-1 flex flex-col gap-4">
      {postList.map((post, index) => (
        <Post post={post} key={index} />
      ))}
    </div>
  );
};

export default PostListUser;
