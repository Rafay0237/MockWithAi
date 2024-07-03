"use client";
import { db } from "@/utils/db";
import { Ghost, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { eq } from "drizzle-orm";
import { mockInterview } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const InterviewList = () => {
  const { user } = useUser();
  const [interviewList, setInterviewList] = useState(null);
  const [loading, setLoading] = useState(null);

  useEffect(() => {
    getInterviewList();
  }, [user]);

  const getInterviewList = async () => {
    setLoading(true)
    const res = await db
      .select()
      .from(mockInterview)
      .where(
        eq(mockInterview.createdBy, user?.primaryEmailAddress?.emailAddress)
      );
      setInterviewList(res)
      setLoading(false)
  };

  if (loading) {
    return (
      <div className="flex h-[30vh] w-full justify-center items-center">
        <Loader2 className="h-16 w-16 animate-spin" />
      </div>
    );
  }

  return interviewList &&(
    <div>
      <h2 className="text-xl font-semibold mt-3">Interview List</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  my-5 gap-5">
      {interviewList.map((interview)=>(

          <div className="flex flex-col gap-1 border p-3 rounded-md shadow-sm"
          key={interview.id}>
          <h2 className="text-orange-600 font-semibold">{interview.jobPosition}</h2>
          <h2 className="text-sm text-gray-700 font-[500]">{interview.jobExperience} years of exp</h2>
          <h2 className="text-gray-500 text-[12px]">Created At: {interview.createdAt}</h2>
          <div className="flex gap-2 sm:gap-4 mt-1">
            <Link className="w-1/2" href={"/dashboard/interview/"+interview.mockId+"/feedback"}>
            <Button vairiant={Ghost} className="w-full border">Feedback</Button>
            </Link>
            <Link className="w-1/2 " href={"/dashboard/interview/"+interview.mockId+"/start"}>
            <Button className="w-full bg-orange-600 hover:bg-orange-600 hover:opacity-95">Start</Button>
            </Link>
          </div>
        </div>
        ))}

      </div>
    </div>
  );
};

export default InterviewList;
