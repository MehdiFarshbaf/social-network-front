import { IUser } from "@/interfaces/userInterfaces";
import Link from "next/link";

interface IProps {
  usersList: IUser[];
}

const UsersList = ({ usersList }: IProps) => {
  return (
    <div className="w-full flex flex-col gap-4 px-2">
      {usersList.map((user) => (
        <Link
          key={user._id}
          href={`/profile/${user._id}`}
          className="w-full p-6 rounded-[10px] box-shadow-user flex justify-between items-center"
        >
          <div className="flex gap-3 items-center">
            <div className="w-12 h-12 rounded-full">
              <img
                src={user.profilePhoto}
                className="w-full h-full object-fill"
                alt="user image"
              />
            </div>
            <div>
              <p className="font-medium text-lg">{user.fullname}</p>
              <p className="font-normal text-md">{user.email}</p>
            </div>
          </div>
          <div className="flex gap-2">
            <p className="font-normal text-sm">دنبال کننده : <span className="text-sm">{user.followers.length}</span></p>
            <p className="font-normal text-sm">دنبال شونده : <span className="text-sm">{user.following.length}</span></p>
          </div>
        </Link>
      ))}
    </div>
  );
};
export default UsersList;
