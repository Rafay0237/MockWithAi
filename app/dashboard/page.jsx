import AddNewInterview from "./Components/AddNewInterview"
import InterviewList from "./Components/InterviewList"
import { auth } from "@/auth"


const DashBoard = async() => {
  const session=await auth()
  return (
    <div className="flex flex-col gap-2 mt-5">
      <p className="text-xl font-semibold">Dashboard</p>
      <p className="text-lg text-gray-500">Create and Start your Mockup Interview</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  my-5">
        <AddNewInterview user={session?.user}/>
      </div>

      <InterviewList user={session?.user}/>
    </div>
  )
}

export default DashBoard
