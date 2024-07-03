"use client"

import { useRouter} from "next/navigation";
import { useEffect } from "react";

export default function Home() {
 const router=useRouter()
  useEffect(()=>{
  router.push("/dashboard")
  },[])

  return (
    <div className="h-[70vh] w-full flex justify-center items-center font-semibold text-3xl text-gray-500">
   hello
    </div>
  );
}
