import {
  useDeleteCommentMutation,
  useEditCommentMutation,
} from "@/data/services/Post";
import { IComment } from "@/interfaces/commentInterfaces";
import { showSuccessMessage } from "@/utils/notifications";
import { useEffect, useState } from "react";

// icons
import { FaTrash } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import ConfirmModal from "../confirmModal/ConfirmModal";
import EditCommentModal from "./EditCommentModal";

interface IProps {
  comment: IComment;
}

const Comment = ({ comment }: IProps) => {
  // services
  const [deleteComment, resultDeleteComment] = useDeleteCommentMutation();
  const [showEditModal, setShowEditModal] = useState<boolean>(false);

  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    if (resultDeleteComment.data?.success === true) {
      showSuccessMessage(resultDeleteComment.data.message);
    }
  }, [resultDeleteComment]);

  return (
    <div className="w-full p-5 rounded bg-white flex items-start gap-2.5">
      <p className="text-black flex-1">{comment.message}</p>
      <div className="flex gap-3">
        <FaTrash
          className="text-rose-400 cursor-pointer"
          onClick={() => setShowDeleteModal(true)}
        />
        <FiEdit className="text-green-400 cursor-pointer" onClick={()=>setShowEditModal(true)} />
      </div>
      <EditCommentModal comment={comment} handleClose={()=>setShowEditModal(false)} opened={showEditModal}  />
      <ConfirmModal
        title="حذف نظر"
        question="آیا از حذف این نظر اطمینان دارید؟"
        handleClose={() => setShowDeleteModal(false)}
        opened={showDeleteModal}
        handleConfirm={() => deleteComment({ commentId: comment._id })}
        isLoading={resultDeleteComment.isLoading}
      />
    </div>
  );
};
export default Comment;
