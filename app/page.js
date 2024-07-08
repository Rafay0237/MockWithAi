import { auth } from '@/auth';
import { redirect } from 'next/navigation';

 const Home=async()=> {
  const session= await auth()
  if(session?.user){
    redirect("/sign-in")
  }else{
    redirect("/dashboard")
  }
}

export default Home
