"use client";
import { useEffect, useState } from "react";
import { db } from "@/utils/db";
import { mockInterview } from "@/utils/schema";
import { eq } from "drizzle-orm";
import { CameraIcon, Ghost, Lightbulb, TargetIcon } from "lucide-react";
import { WebcamIcon} from "lucide-react";
import Webcam from "react-webcam";
import Link from "next/link"
import { Button } from "@/components/ui/button";

const page = ({ params }) => {
  // 4f2ce74e-4a3b-4f99-97ff-d4d795d12656
  const [interviewData, setInterviewData] = useState(null);
  const [webCamEnabled, setWebCamEnabled] = useState(false);

  useEffect(() => {
    getInterviewData();
  }, []);

  const getInterviewData = async () => {
    const result = await db
      .select()
      .from(mockInterview)
      .where(eq(mockInterview.mockId, params.interviewId));

    setInterviewData(result[0]);
  };

  return (
    <div>
      <div className="flex justify-center items-center">
        <h2 className="my-5 text-2xl font-semibold"> Lets get Started</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 rounded-md">

        <div className="flex flex-col gap-5">
        <div className="flex flex-col border p-5 gap-2 rounded-md">
          <h2 className="text-[16px]">
            <strong>Job Position: </strong> {interviewData?.jobPosition}
          </h2>
          <h2 className="text-[16px]">
            <strong>Job Role: </strong> {interviewData?.jobDesc}
          </h2>
          <h2 className="text-[16px]">
            <strong>Job Experience: </strong> {interviewData?.jobExperience}
          </h2>
        </div>

        <div className="flex flex-col border p-5  gap-5 bg-yellow-50  rounded-md">
           <h2 className="flex gap-3"> <Lightbulb/> <strong>Information</strong></h2> 
           <h2 className="text-sm">{process.env.NEXT_PUBLIC_PRIVACY_INFO}<strong> Note: </strong> we never record your video.</h2>
        </div>

        </div>


        <div >
        <div className="flex flex-col border p-5 gap-5 rounded-md">
         <div className="pt-2 bg-slate-50">
        {  webCamEnabled?
         <Webcam 
         className="h-64 w-full "
         onUserMedia={()=>setWebCamEnabled(true)}
         onUserMediaError={()=>setWebCamEnabled(false)}
         />
         :
         <WebcamIcon className="h-64 w-full"/>}
         </div>
        </div>

        <div className="flex justify-center">
        <Button onClick={()=>setWebCamEnabled(!webCamEnabled)}
        variant={Ghost}
        className={"w-full sm:w-[70%] mx-auto mt-4 bg-gray-100 hover:bg-gray-200 "+(webCamEnabled && "bg-red-600 hover:bg-red-600 hover:opacity-95")}
        >{webCamEnabled?
        <div className="flex gap-2 items-center">
        <TargetIcon/> Stop Recording</div>
        :<div className="flex gap-2 items-center">
        <CameraIcon/> Enable Web Cam</div>
        }</Button>
        </div>
        <div className="flex justify-center mt-5">
        <Link href={"/dashboard/interview/"+params.interviewId+"/start"}>
        <Button className="bg-green-700 hover:bg-green-700 hover:opacity-95"
        >Start Interview</Button>
        </Link>
        </div>
         </div>

      </div>

    </div>
  );
};

export default page;
