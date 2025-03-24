import { ICategory } from "@/interfaces/categoryInterfaces";
import { showPersianDate } from "@/utils/functions";
import EditCategoryModal from "@/components/category/EditCategoryModal";
import { useEffect, useState } from "react";
import ConfirmModal from "../confirmModal/ConfirmModal";
import { useDeleteCategoryMutation } from "@/data/services/Category";
import { showSuccessMessage } from "@/utils/notifications";

interface IProps {
  category: ICategory;
  index: number;
}

const CategoryRow = ({ category, index }: IProps) => {
  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [deleteCategory, resultDeleteCategory] = useDeleteCategoryMutation();

  const handleDeleteCategory=()=>{
    deleteCategory({_id:category._id})
  }

  useEffect(() => {
    if (resultDeleteCategory.data?.success === true) {
      showSuccessMessage(resultDeleteCategory.data.message);
      setShowDeleteModal(false)
    }
  }, [resultDeleteCategory]);

  return (
    <tr key={category._id} className="py-2 my-2 border-t">
      <th>{index + 1}</th>
      <th>{category.title}</th>
      <th>{category?.admin?.fullname}</th>
      <th className="!--font-vazir">{showPersianDate(category.createdAt)}</th>
      <th>
        <button
          className="px-3  my-1 rounded h-7 bg-blue-400 text-white ml-2"
          onClick={() => {
            setShowEditModal(true);
          }}
        >
          ویرایش
        </button>
        <button
          className="px-3  my-1 rounded h-7 bg-red-500 text-white"
          onClick={() => setShowDeleteModal(true)}
        >
          حذف
        </button>
      </th>
      {/*modals*/}
      <EditCategoryModal
        category={category}
        opened={showEditModal}
        handleClose={() => setShowEditModal(false)}
      />
      <ConfirmModal
        handleClose={() => setShowDeleteModal(false)}
        handleConfirm={() => handleDeleteCategory()}
        opened={showDeleteModal}
        title="حذف دسته بندی"
        isLoading={resultDeleteCategory.isLoading}
        question={`آیا از حذف دسته بندی ${category.title} اطمینان دارید؟`}
      />
    </tr>
  );
};
export default CategoryRow;
