"use client";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { userAnswer } from "@/utils/schema";
import { useState, useEffect } from "react";
import { db } from "@/utils/db";
import { eq } from "drizzle-orm";
import {ArrowDownCircle, Loader2} from "lucide-react";

const page = ({ params }) => {
  const [loading, setLoading] = useState(false);
  const [feedbackList, setFeedbackList] = useState(null);
  const [overallRating, setOverallRating] = useState(null);

  useEffect(() => {
    getFeedbackData()
  }, []);

  useEffect(() => {
    if(feedbackList && feedbackList.length>0){
      setOverallRating(feedbackList?.reduce((sum, feedback) => sum + parseInt(feedback.rating), 0) / feedbackList?.length)
    }
  },[feedbackList])

  const getFeedbackData = async () => {
    setLoading(true);
    const result = await db
      .select()
      .from(userAnswer)
      .where(eq(userAnswer.mockId, params.interviewId));
    setFeedbackList(result);
    setLoading(false);
  };

    if(loading){
      return (
        <div className='flex h-[80vh] w-full justify-center items-center'>
        <Loader2 className='h-16 w-16'/>
      </div>
    )
  }

  if(feedbackList?.length===0){
    return (
    <div className="flex flex-col  mt-16 w-full md:w-1/2  ">
        <h2 className="text-2xl font-bold text-red-700 mb-2">
          Interview was not Completed!
        </h2>
        <h2 className="text-lg font-[500] ">
          Complete your interview to have a feedback.
          You can use the same Interview card from Interview list on your Dashboard.
        </h2>
      </div>
    )
  }

  return feedbackList&& (
    <div className="my-10 mb-16">
      <div className="flex flex-col  my-5 ">
        <h2 className="text-2xl font-bold text-green-700 mb-2">
          Interview Completed!
        </h2>
        <h2 className="text-xl font-semibold ">
          Here is your interview Feedback
        </h2>
        {overallRating&& 
        <h2 className={"font-[500] "+overallRating&&  overallRating>5? "text-green-600" :"text-red-700"}>Overall Rating: {overallRating}/10</h2>}
      </div>

        <div className="flex flex-col gap-4 w-full md:w-2/3 ">
          {feedbackList && feedbackList.map((feedback,index) => (
            <div  key={index} >
            <Collapsible>
              <CollapsibleTrigger className="flex bg-slate-100 text-left rounded-md p-2">
              <h2><strong>Q{index+1}:</strong> {feedback?.question}</h2>

              <div className="flex flex-col items-end gap-2 text-sm  w-52 ">
            
              <h2 className={"text-end text-[10px] sm:text-sm  "+(feedback.rating ==5 ?"text-yellow-400" :(feedback.rating>5?"text-green-700": "text-red-700" ))}>
                <strong>Rating: {feedback?.rating}</strong> </h2>
              <h2 ><ArrowDownCircle/></h2>
              </div>
              </CollapsibleTrigger>

               <div className="flex flex-col gap-4 text-sm mt-4" >

              <CollapsibleContent className="bg-purple-100 text-left rounded-md p-2">
              <strong>Your Answer:</strong> {feedback?.userAns}
              </CollapsibleContent>

              <CollapsibleContent className="bg-green-200 text-left rounded-md p-2">
              <strong>Correct Answer:</strong> {feedback?.correctAns}
              </CollapsibleContent>

              <CollapsibleContent className="bg-yellow-50 text-left rounded-md p-2">
              <strong>Feedback:</strong> {feedback?.feedback}
              </CollapsibleContent>
               </div>
            </Collapsible>
            </div>
          ))}
        </div>

    </div>
  );
};

export default page;
