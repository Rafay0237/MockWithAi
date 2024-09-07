"use client"

import { db } from '@/utils/db';
import { mockInterview } from '@/utils/schema';
import { useState,useEffect } from 'react';
import { eq } from 'drizzle-orm';
import ShowQuestion from '@/app/dashboard/Components/ShowQuestion';
import RecordUserAnswer from '@/app/dashboard/Components/RecordUserAnswer';
import { Ghost, Loader2 } from 'lucide-react';
import { Button } from "@/components/ui/button";


const StartInterview = ({interviewId , user}) => {

  const [questions, setQuestions] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [useTextInput, setUseTextInput] = useState(false);
  
  

    useEffect(() => {
        getInterviewData();
      }, []);
      
    
      const getInterviewData = async () => {
        setLoading(true)
        const result = await db
          .select()
          .from(mockInterview)
          .where(eq(mockInterview.mockId, interviewId));
        let questions=JSON.parse(result[0].jsonMockResp)
        setQuestions(questions);
        setLoading(false)
      };

      if(loading){
        return (
          <div className='flex h-[80vh] w-full justify-center items-center'>
          <Loader2 className='h-16 w-16'/>
        </div>
      )
    }

  return questions&&(
    <div className='my-10'>
      <div className='flex justify-end mb-5'>
        <Button className="border  bg-slate-100 hover:bg-slate-200"
        onClick={()=>setUseTextInput(!useTextInput)}
        variant={Ghost}>
          {useTextInput ? "Use Microphone" : "Use Text Input"}
        </Button>
      </div>
      <div className='grid grid-col-1 md:grid-cols-2 gap-5'>

      <ShowQuestion questions={questions} currentIndex={currentIndex}/>

      <RecordUserAnswer setCurrentIndex={setCurrentIndex} mockId={interviewId}
      question={questions[currentIndex]} currentIndex={currentIndex} user={user} useTextInput={useTextInput}/>

      </div>
      
    </div>
  )
}

export default StartInterview
