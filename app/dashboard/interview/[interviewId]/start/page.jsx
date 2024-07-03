"use client"

import { db } from '@/utils/db';
import { mockInterview } from '@/utils/schema';
import { useState,useEffect } from 'react';
import { eq } from 'drizzle-orm';
import ShowQuestion from '@/app/dashboard/Components/ShowQuestion';
import RecordUserAnswer from '@/app/dashboard/Components/RecordUserAnswer';
import { Loader2 } from 'lucide-react';


const StartInterview = ({params}) => {
 
  
  const [questions, setQuestions] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  

    useEffect(() => {
        getInterviewData();
      }, []);
      
    
      const getInterviewData = async () => {
        setLoading(true)
        const result = await db
          .select()
          .from(mockInterview)
          .where(eq(mockInterview.mockId, params.interviewId));
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
    <div>
      <div className='grid grid-col-1 md:grid-cols-2 my-10 gap-5'>

      <ShowQuestion questions={questions} currentIndex={currentIndex}/>

      <RecordUserAnswer setCurrentIndex={setCurrentIndex} mockId={params.interviewId}
      question={questions[currentIndex]} currentIndex={currentIndex} />

      </div>
      
    </div>
  )
}

export default StartInterview
