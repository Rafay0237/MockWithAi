import StartInterview from "@/app/dashboard/Components/StartInterview"
import { auth } from "@/auth"

const page = async({params}) => {
  const session=await auth()

  return (
    <div>
      <StartInterview user={session?.user} interviewId={params.interviewId}/>
    </div>
  )
}

export default page
