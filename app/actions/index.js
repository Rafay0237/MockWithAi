"use server"

import { signIn ,signOut} from "@/auth"

export async function  doSocialLogin (formData){
    const action=formData.get("action")
    await signIn(action,{redirectTo:"/dashboard"})

}

export async function  doSocialLogout(){
  await signOut({redirectTo:"/sign-in"})
}

export async function doCredentialsLogin(user){
  try{
    const response= await signIn("credentials",{
      email:user.email,
      password:user.password,
      image:user.profilePicture,
      redirect:false
    })
    return response;
  }catch(error){
    throw new Error(error)
  }
}