import Link from "next/link"

const Header = () => {
    return (
        <header className="w-full py-4 bg-[#ffffff00]">
            <nav className="main-container flex justify-between items-center">
                <div className="flex justify-start items-center gap-4">
                    <Link href="/register" className="text-white hover:text-[#74af72]">ثبت نام</Link>
                    <Link href="/login" className="text-white hover:text-[#74af72]">ورود</Link>
                </div>
                <div>
                    <Link href="/" className="text-white hover:text-[#74af72]">Home</Link>
                </div>
            </nav>
        </header>
    )
}
export default Header