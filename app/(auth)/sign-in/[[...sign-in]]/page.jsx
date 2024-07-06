"use client";
import { useState } from "react";
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
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
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
import { loginSuccess } from "@/app/redux/user/userSlice";

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

  const onSubmit = async (data) => {
    console.log(data);
    loginSuccess(data)
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
                Login
              </Button>
            </form>
          </FormProvider>
        </CardContent>
        <CardFooter className="flex flex-col gap-5">
          <div className="flex gap-3 w-full">
            <Button className="w-1/2" variant="outline">
              <FcGoogle className="h-5 w-5" />
            </Button>
            <Button className="w-1/2" variant="outline">
              <FaGithub className="h-5 w-5" />
            </Button>
          </div>
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

