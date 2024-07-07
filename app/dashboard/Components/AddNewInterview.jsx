"use client"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogClose,
    DialogTrigger
  } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { chatSession } from "@/utils/AI"
import { mockInterview } from "@/utils/schema"
import { LoaderCircle } from "lucide-react"
import { useState } from "react"
import {v4 as uuidv4} from "uuid"
import { useSelector } from "react-redux"
import moment from "moment"
import { db } from "@/utils/db"
import { useRouter } from "next/navigation"

  

const AddNewInterview = () => {
    const [formData,setFormData]=useState({})
    const [loading,setLoading]=useState(false)
    const {user}=useSelector((state)=>state.currentUser)
    const router=useRouter()

  const handleSubmit=async(e)=>{
  setLoading(true)
  e.preventDefault()

  const prompt= "job position: "+formData.jobPosition+"job description: "+formData.jobDesc+"years of experience: "+ formData.jobExperience+". Based on this data give me "+process.env.NEXT_PUBLIC_NU_OF_QUESTIONS+" interview questions in json format. i want json format only. "
  const res= await chatSession.sendMessage(prompt)
  const mockQuestions=res.response.text().replace("```json","").replace("```","")
  
  if(!mockQuestions){
  console.log("Some error occured: ",mockQuestions)
  return
  }
  const saveRes= await saveToDb(mockQuestions)
  
  if(saveRes.length!==0){
  router.push("dashboard/interview/"+saveRes[0].mockId)
  }else{
    console.log("Some error occured")
  }
  setLoading(false)
  }

  const saveToDb=async(mockQuestions)=>{
   const saveRes= await db.insert(mockInterview).values({
      mockId:uuidv4(),
      jsonMockResp:mockQuestions,
      jobDesc:formData.jobDesc,
      jobPosition:formData.jobPosition,
      jobExperience:formData.jobExperience,
      createdAt:moment().format("DD-MM-yyyy"),
      createdBy:user?.email
    }).returning({mockId:mockInterview.mockId})
    return saveRes
  }

  const handleChange = (e) => {
    const { id, value, type } = e.target;
    const parsedValue = type === "number" ? parseInt(value, 0) : value;
    setFormData({ ...formData, [id]: parsedValue });
  };

  return (
  <div > 
        <Dialog >
        <DialogTrigger asChild>
        <div className='p-10 border-2 rounded-lg cursor-pointer hover:bg-gray-50'>
        <p className='font-semibold text-lg text-center'>+ Add Interview</p>
    </div>
      </DialogTrigger>
    <DialogContent>
    <form onSubmit={handleSubmit}>
        <DialogHeader>
        <DialogTitle >
            <div>
        <p className="text-xl">Tell us more about your job role.</p>
            </div>
        </DialogTitle>
        <DialogDescription>
            <div>
                <p>Add Details more about your job role/position and description.</p>

                <div className="flex flex-col gap-3 mt-5">
                <label className="text-black">Job Role, Position</label>
                <Input placeholder="Ex. Doctor, Engineer, Manager"
                id="jobPosition" onChange={handleChange} required maxLength={60}/>

                <label className="text-black">Job Description/ Skills</label>
                <Textarea placeholder="Ex. Web Developer,Dentist tell exact technology or feild."
                id="jobDesc" onChange={handleChange} required maxLength={160}/>

                <label className="text-black">Years of Experience</label>
                <Input type="number" placeholder="Ex. 3" max="40"
                id="jobExperience" onChange={handleChange} required/>
                </div>
            </div>
        </DialogDescription>
        </DialogHeader>
        <div className="flex gap-5 justify-end mt-5">
        <DialogClose asChild>
        <Button variant="ghost" className="border p-5" type="button"
          >Cancel</Button>
        </DialogClose>

            <Button type="submit" disabled={loading}>
              {loading?
              <>
              <LoaderCircle className="animate-spin"/>
              Generating
              </> :
              "Start Interview"}
              </Button>
        </div>
    </form>
    </DialogContent>
    </Dialog>
    </div>
  )
}

export default AddNewInterview
