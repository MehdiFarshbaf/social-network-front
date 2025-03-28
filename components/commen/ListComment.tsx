import { IComment } from "@/interfaces/commentInterfaces";
import Comment from "./Comment";

interface IProps {
  comments: IComment[];
}

const ListComment = ({ comments }: IProps) => {
  return (
    <section className="w-full mt-10 flex flex-col gap-4">
      {comments.map((comment) => (
        <Comment key={comment._id} comment={comment} />
      ))}
    </section>
  );
};
export default ListComment;
