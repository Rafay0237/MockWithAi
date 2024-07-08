"use client"

import {  Loader2, WebcamIcon } from 'lucide-react';
import Webcam from 'react-webcam';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { chatSession } from "@/utils/AI"
import { useToast } from "@/components/ui/use-toast"
import { userAnswer } from '@/utils/schema';
import { db } from '@/utils/db';
import moment from 'moment';
import { useRouter } from "next/navigation"
import useSpeechToText from 'react-hook-speech-to-text';
import AnswerInText from './AnswerInText';
import SpeechToText from './SpeechToText';


const RecordUserAnswer = ({setCurrentIndex,question,currentIndex,mockId,user}) => {

    const [answer, setAnswer] = useState("");
    const [loading, setLoading] = useState(false);
    const {toast}=useToast()
    const router=useRouter()
    const {error}=useSpeechToText({
      continuous: true,
      useLegacyResults: false
    });
  
      const handleSubmit=async()=>{
        if(answer.length<10){
            toast({
              title: "Too Short Answer!",
              description: "Answer should be more than 5 words.",
            })
            return
          }
        try{
            setLoading(true)
            const prompt= "Question: "+question.question+" Answer: "+ answer+" based on this Answer give me a rating from 10 and a feedback(of 3-5 lines) and correct answer. this three feilds(feedback, rating and correctAnswer) should be in json fromat."
            const res= await chatSession.sendMessage(prompt)
            if(!res){
              toast({
                title: "Cannot process this answer!",
                description: "Kindly, Record again",
              })
              return
            }  
            const feedback=JSON.parse(res.response.text().replace("```json","").replace("```",""))
            if(feedback){
            const savedRes= await saveToDb(feedback)
            if(savedRes){
                toast({
                    title:"Answer saved successfully"
                })
                if(currentIndex===4){
                router.push("/dashboard/interview/"+mockId+"/feedback")
                return
                }
                setCurrentIndex((prev)=>prev+1)
            }else{
                toast({
                    title:"Some error occurred while saving to DB",
                    description:"Try Again later."
                })
            }

            }
            setAnswer("")
            setLoading(false)
        }catch(error){
            console.log(error)
        }
    }

    const saveToDb=async(feedback)=>{
        const saveRes= await db.insert(userAnswer).values({
            mockId:mockId,
            question:question.question,
            correctAns:feedback.correctAnswer,
            userAns:answer,
            feedback:feedback.feedback,
            rating:feedback.rating,
           userEmail:user?.email,
           createdAt:moment().format("DD-MM-yyyy"),
         }).returning({mockId:userAnswer.mockId})
         return saveRes
       }
     

  return (
    <div className='flex flex-col border rounded-md rounder-md p-5 gap-3 relative'>
        {error ? 
        <div className='h-full'>
        <AnswerInText answer={answer}  setAnswer={setAnswer}/>
        </div>
        :<>
        <WebcamIcon className='h-64 w-[90%] absolute '/>
        <Webcam className='h-72 w-full  '
        mirrored={true}
        />
        
      <div className='flex justify-center'>
        <SpeechToText setAnswer={setAnswer} />
          </div>
          </>}
          <div className='flex justify-center  sm:justify-end'>
        <Button className="w-40 "
        disabled={loading}
        onClick={handleSubmit}>{loading? <Loader2 className='animate-spin'/> :currentIndex===4?"End Interview":"Save & Continue"}</Button>
        </div>
        </div>
  )
}

export default RecordUserAnswer
