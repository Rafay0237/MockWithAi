"use client";
import {  useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { loginSchema } from "../../validation";
import { FormFailure, FormSuccess } from "../../validation";
import Link from "next/link";
import { loginSuccess } from "@/redux/user/userSlice";
import { useDispatch } from "react-redux";
import { submitData } from "@/app/ApiCalls";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import OAuth from "../../OAuth";

const Page = () => {
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
  
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const dispatch=useDispatch()
  const {toast}=useToast()
  const router=useRouter()

  const onSubmit = async (data,e) => {
    e.preventDefault()
    setLoading(true)
    submitData("users/login","POST",data).then((res)=>{
      if(!res.success){
        setErrorMessage(res.message)
      }else{
        setErrorMessage(null)
        setSuccessMessage(res.message)
        dispatch(loginSuccess({token:res.token,user:res.user}))
        toast({
          title:"Welcome back!",
          description:"Logged in Successfully!"
        })
        router.push("/dashboard")
      }
    }).finally(() => {
      setLoading(false); 
    });
  };

  return (
    <div className="flex h-[100vh] w-full justify-center items-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-yellow-200 to-orange-500">
      <Card className="w-[400px] lg:w-[450px]">
        <CardHeader className="items-center">
          <CardTitle>Mock-With-Ai</CardTitle>
          <CardDescription>Welcome back</CardDescription>
        </CardHeader>
        <CardContent>
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

              {successMessage && <FormSuccess message={successMessage}/>}
              {errorMessage && <FormFailure message={errorMessage} />}
              
              <Button className="w-full mt-2" type="submit" disabled={loading}>
               {loading ? <>
              Loading
              <Loader2 className="ml-1 h-6 w-6 animate-spin"/>
              </> : "Login"}
              </Button>
            </form>
          </FormProvider>
        </CardContent>
        <CardFooter className="flex flex-col gap-5">
          
          <OAuth/>

          <div className="flex gap-2 text-sm text-gray-700 font-semibold">
            <p>Don't have an account?</p>
            <Link href={"/sign-up"}>
            <h2 className="text-gray-900 hover:cursor-pointer">SignUp</h2>
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Page;

