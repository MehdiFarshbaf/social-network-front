"use client";

import {useGetAllCategoryQuery} from "@/data/services/Category";
import {ICategory} from "@/interfaces/categoryInterfaces";
import {useEffect, useState} from "react";
import CategoryRow from "@/components/category/CategoryRow";
import Loading from "@/components/loading/Loading";

const ListCategory = () => {
    // services
    const {data: categoryData, isLoading} = useGetAllCategoryQuery();

    const [categoryList, setCategoryList] = useState<ICategory[]>([]);

    useEffect(() => {
        if (categoryData?.success === true) {
            setCategoryList(categoryData.data);
        }
    }, [categoryData]);

    return (
        <section className="w-full mt-5">
            {isLoading ? <Loading /> : <table className="table-auto text-white w-full  rounded-2xl sm:w-2/3 mx-auto">
                <tbody>
                <tr className="pb-1">
                    <th>ردیف</th>
                    <th>نام دسته بندی</th>
                    <th>سازنده</th>
                    <th>تاریخ ایجاد</th>
                    <th>عملیات</th>
                </tr>
                {categoryList.map((category, index) => (
                    <CategoryRow key={category._id} category={category} index={index}/>
                ))}
                </tbody>
            </table>}
        </section>
    );
};

export default ListCategory;
