import { auth } from '@/auth';
import { redirect } from 'next/navigation';

 const Home=async()=> {
  const session= await auth()
  if(session?.user){
    redirect("/dashboard")
  }else{
    redirect("/sign-in")
  }
}

export default Home
