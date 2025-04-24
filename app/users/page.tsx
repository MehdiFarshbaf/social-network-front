"use client";
import {
  useBlockUserMutation,
  useGetUsersQuery,
  useUnblockUserMutation,
} from "@/data/services/User";
import { IUser } from "@/interfaces/userInterfaces";
import { useEffect, useState } from "react";
import { Table } from "@mantine/core";
import Loading from "@/components/loaders/Loading";
import Link from "next/link";
import { showSuccessMessage } from "@/utils/notifications";
import SpinnerButton from "@/components/loaders/SpinnerButton";

const UsersPage = () => {
  const { data: dataUsers, isLoading } = useGetUsersQuery();
  const [blockUser, resultBlockUser] = useBlockUserMutation();
  const [unblockUser, resultUnblockUser] = useUnblockUserMutation();

  const [users, setUsers] = useState<IUser[]>([]);

  useEffect(() => {
    if (dataUsers?.success) {
      setUsers(dataUsers.data);
    }
  }, [dataUsers]);

  useEffect(() => {
    if (resultBlockUser.data?.success) {
      showSuccessMessage(resultBlockUser.data.message);
    }
  }, [resultBlockUser]);
  useEffect(() => {
    if (resultUnblockUser.data?.success) {
      showSuccessMessage(resultUnblockUser.data.message);
    }
  }, [resultUnblockUser]);

  return (
    <main className="main-container mt-20">
      <h2 className="text-center font-semibold text-2xl mb-8">لیست کاربران</h2>

      {isLoading ? (
        <Loading />
      ) : (
        <Table
          verticalSpacing="md"
          striped
          highlightOnHover
          withTableBorder
          classNames={{ table: "!rounded" }}
        >
          <Table.Thead>
            <Table.Tr>
              <Table.Th>ردیف</Table.Th>
              <Table.Th>نام</Table.Th>
              <Table.Th>ایمیل</Table.Th>
              <Table.Th>طرفداری</Table.Th>
              <Table.Th>ارسال پیام</Table.Th>
              <Table.Th>بررسی</Table.Th>
              <Table.Th>وضعیت</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {users.map((user, index) => (
              <Table.Tr key={index}>
                <Table.Td>{index + 1}</Table.Td>
                <Table.Td>{user.fullname}</Table.Td>
                <Table.Td>{user.email}</Table.Td>
                <Table.Td>{user.followers.length}</Table.Td>
                <Table.Td>
                  <Link
                    href={{
                      pathname: `/profile/send-email`,
                      query: {
                        to: user.email,
                      },
                    }}
                    className="text-white py-2  px-3 rounded bg-blue-600 text-base"
                  >
                    ارسال پیام
                  </Link>
                </Table.Td>
                <Table.Td>
                  <Link
                    href={`/profile/${user._id}`}
                    className="text-white py-2  px-3 rounded bg-green-600 text-base"
                  >
                    مشاهده
                  </Link>
                </Table.Td>
                <Table.Td>
                  {user.isBlocked ? (
                    <button
                      onClick={() => unblockUser({ user_id: user._id })}
                      disabled={resultUnblockUser.isLoading}
                      className="text-white py-2  px-3 rounded bg-black text-base"
                    >
                      {resultUnblockUser.isLoading ? <SpinnerButton/>:"رفع انسداد کاربر"}
                    </button>
                  ) : (
                    <button
                      onClick={() => blockUser({ user_id: user._id })}
                      disabled={resultBlockUser.isLoading}
                      className="text-white py-2  px-3 rounded bg-rose-600 text-base"
                    >
                      {resultBlockUser.isLoading ? (
                        <SpinnerButton />
                      ) : (
                        " بلاک کردن"
                      )}
                    </button>
                  )}
                </Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
      )}
    </main>
  );
};
export default UsersPage;
