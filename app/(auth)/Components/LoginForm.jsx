"use client"
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { FormFailure, FormSuccess } from "../validation";
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { submitData } from "@/app/ApiCalls";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../validation";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { doCredentialsLogin } from "@/app/actions";



const LoginForm = () => {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const router=useRouter()
  const {toast}=useToast()

  const methods = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = methods;

  const onSubmit = async (data,e) => {
    e.preventDefault()
    setLoading(true)
    submitData("users/login","POST",data).then((res)=>{
      if(!res.success){
        setErrorMessage(res.message)
      }else{
        setSuccessMessage(res.message)
        let success=saveToNextAuth(res.user)
        if(!success) return null;

        router.push("/dashboard")
      }
    }).finally(() => {
      setLoading(false); 
    });
  };

  const saveToNextAuth=async(user)=>{
    setErrorMessage(null)
    const response =await doCredentialsLogin(user)
    toast({
      title:"Welcome back!",
      description:"Logged in Successfully!"
    })
    if(response){
      return true
    }else{
      return false
    }
  }

  return (
    <FormProvider {...methods}>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-3 text-[14px]"
            >
              <div className="flex flex-col gap-1">
                <FormField
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          {...register("email")}
                          type="email"
                          placeholder="John@gmail.com"
                        />
                      </FormControl>
                      <FormMessage>{errors.email?.message}</FormMessage>
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex flex-col gap-1">
                <FormField
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          {...register("password")}
                          type="password"
                          placeholder="******"
                        />
                      </FormControl>
                      <FormMessage>{errors.password?.message}</FormMessage>
                    </FormItem>
                  )}
                />
              </div>

              <FormSuccess message={successMessage}/>
              <FormFailure message={errorMessage} />
              
              <Button className="w-full mt-2" type="submit" disabled={loading}>
               {loading ? <>
              Loading
              <Loader2 className="ml-1 h-6 w-6 animate-spin"/>
              </> : "Login"}
              </Button>
            </form>
          </FormProvider>
  )
}

export default LoginForm
