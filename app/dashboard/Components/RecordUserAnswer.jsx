"use client"

import { Ghost, Loader2, Mic, WebcamIcon } from 'lucide-react';
import Webcam from 'react-webcam';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useState,useEffect } from 'react';
import useSpeechToText from 'react-hook-speech-to-text';
import { chatSession } from "@/utils/AI"
import { useToast } from "@/components/ui/use-toast"
import { userAnswer } from '@/utils/schema';
// import { useUser } from '@clerk/nextjs';
import { db } from '@/utils/db';
import moment from 'moment';
import { useRouter } from "next/navigation"

const RecordUserAnswer = ({setCurrentIndex,question,currentIndex,mockId}) => {
// get mock id 
    const [answer, setAnswer] = useState("");
    const [loading, setLoading] = useState(false);
    const {toast}=useToast()
    // const {user}=useUser()
    const router=useRouter()
    
    const {
        error,
        isRecording,
        results,
        startSpeechToText,
        stopSpeechToText,
      } = useSpeechToText({
        continuous: true,
        useLegacyResults: false
      });

      useEffect(()=>{
        results.map((result)=>(
          setAnswer((prev)=>prev+result?.transcript)
        ))

      },[results])
  
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
            const feedback=JSON.parse(res.response.text().replace("```json","").replace("```",""))
            if(feedback){
            const savedRes= await saveToDb(feedback)
            console.log(savedRes)
            if(savedRes){
                toast({
                    description:"Answer saved successfully"
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
          //  userEmail:user?.primaryEmailAddress?.emailAddress,
           createdAt:moment().format("DD-MM-yyyy"),
         }).returning({mockId:userAnswer.mockId})
         return saveRes
       }

      const saveSpeech=async()=>{
      if(isRecording){
        stopSpeechToText
        if(answer.length<10){
          toast({
            title: "Too Short Answer!",
            description: "Answer should be more than 5 words, Record again",
          })
          setAnswer("")
        }
      }else{
        startSpeechToText
      }
      }

  return (
    <div className='flex flex-col border rounder-md p-5 gap-3 relative'>
        {error ?<>
       <h2 className='text-red-600'> Speech to text is not supported on your browser.</h2>
       <h2 >Type your answer:</h2>

       <div className='flex flex-col justify-center gap-3  h-full'>
       <label className="text-black text-sm ">Your Answer: </label>
        <Textarea className="text-sm" rows={5}
        placeholder="Write a breif answer, max 200 words."
        value={answer}
        required maxLength={200}
        onChange={(e)=>setAnswer(e.target.value)}/>

        
        </div>

        </>:<>
        <WebcamIcon className='h-64 w-[90%] absolute '/>
        <Webcam className='h-72 w-full  '
        mirrored={true}
        />
        
      <div className='flex justify-center'>
        <Button className="gap-2 bg-slate-100 hover:bg-slate-200 w-40 border "
        variant={Ghost}
        onClick={saveSpeech}>
        <Mic/>
        {isRecording ? 'Stop Recording' : 'Record Answer'}</Button>
      
          </div>
          </>}
          <div className='flex justify-end'>
        <Button className="w-40 "
        disabled={loading}
        onClick={handleSubmit}>{loading? <Loader2 className='animate-spin'/> :currentIndex===4?"End Interview":"Save & Continue"}</Button>
        </div>
        </div>
  )
}

export default RecordUserAnswer
