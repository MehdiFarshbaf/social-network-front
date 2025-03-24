import {ICategory} from "@/interfaces/categoryInterfaces";
import {showPersianDate} from "@/utils/functions";
import EditCategoryModal from "@/components/category/EditCategoryModal";
import {useState} from "react";

interface IProps {
    category: ICategory,
    index:number,
}

const CategoryRow = ({category, index}: IProps) => {

    const [showEditModal,setShowEditModal]=useState<boolean>(false)

    return (
        <tr key={category._id} className="py-2 my-2 border-t">
            <th>{index + 1}</th>
            <th>{category.title}</th>
            <th>{category?.admin?.fullname}</th>
            <th className="!--font-vazir">{showPersianDate(category.createdAt)}</th>
            <th>
                <button className="px-3  my-1 rounded h-7 bg-blue-400 text-white ml-2" onClick={() => {
                    setShowEditModal(true)
                }}>ویرایش
                </button>
                <button className="px-3  my-1 rounded h-7 bg-red-500 text-white">حذف</button>
            </th>
            {/*modals*/}
            <EditCategoryModal category={category?category:{}} opened={showEditModal} handleClose={()=>setShowEditModal(false)}/>
        </tr>
    )
}
export default CategoryRow