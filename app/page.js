import { auth } from '@/auth';
import { redirect } from 'next/navigation';

 const Home=async()=> {
  const session= await auth()
  if(session?.user) redirect("/sign-in")
    
  return (
    <div className="h-[70vh] w-full flex justify-center items-center font-semibold text-3xl text-gray-500">
   hello
    </div>
  );
}

export default Home
