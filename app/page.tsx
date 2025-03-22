import PostList from "@/components/home/PostList"
import SideBar from "@/components/home/SideBar"

const HomePage=()=>{
  return(
    <main className="main-container flex gap-8 mt-20">
      <article className="w-2/3">
      <PostList/>
      </article>
      <SideBar/>
    </main>
  )
}
export default HomePage