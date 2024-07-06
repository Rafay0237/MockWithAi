import { z } from "zod"
import { TiTick } from "react-icons/ti";
import { HiOutlineExclamation } from "react-icons/hi";

export const signUpSchema = z.object({
    email: z.string().email({ message: "Invalid email address" }),
    userName: z.string().min(4, {
      message: "Username must be at least 4 characters.",
    }),
    password: z.string().min(8, {
      message: "Password must be at least 8 characters.",
    }),
  })

export const loginSchema = z.object({
    email: z.string().email({ message: "Invalid email address" }),
    password: z.string().min(8, {
      message: "Password must be at least 8 characters.",
    }),
  })


export const FormFailure=({message})=>{
    if(!message) return null
return (
    <div className="bg-destructive/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive">
     <HiOutlineExclamation className="h-5 w-5"/>
     <h2>{message}</h2>
    </div>
)
}

export const FormSuccess=({message})=>{
    if(!message) return null
return (
    <div className="bg-emerald-500/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-emerald-500">
     <TiTick className="h-5 w-5"/>
     <h2>{message}</h2>
    </div>
)
}