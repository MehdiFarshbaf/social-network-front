import {IUser} from "@/interfaces/userInterfaces";

interface IProps {
    listUsers: IUser[]
}

const LastVisits = ({listUsers}: IProps) => {
    return (
        <aside className="w-1/3 ">
            <h1 className="mb-5">بازدیده های اخیر این پروفایل</h1>
            <div className="flex flex-col gap-3">
                {listUsers.length === 0 ?
                    <h2 className="text-center">بازدیدی از این پروفایل نشده است.</h2>
                    : listUsers.map((user, index) => (
                    <div className="w-full flex items-center gap-4  border rounded p-4" key={user._id}>
                        <img
                            src={user.profilePhoto}
                            alt="user image"
                            className="w-12 h-12 rounded-full"
                        />
                        <p>{user.fullname}</p>
                    </div>
                ))}
            </div>
        </aside>
    )
}
export default LastVisits