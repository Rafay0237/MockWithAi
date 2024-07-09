"use client"
import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { signUpSchema } from "../validation";
import { FormFailure, FormSuccess } from "../validation";
import { submitData } from "@/app/ApiCalls";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

const SignUpForm = () => {
    const methods = useForm({
        resolver: zodResolver(signUpSchema),
        defaultValues: {
          userName: "",
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
      const router = useRouter();
      const { toast } = useToast();
    
      const onSubmit = async (data, e) => {
        e.preventDefault();
        setLoading(true);
        submitData("users/sign-up", "POST", data)
          .then((res) => {
            if (!res.success) {
              setErrorMessage(res.message);
            } else {
              setErrorMessage(null);
              setSuccessMessage(res.message);
              toast({
                title: "Account Created",
                description: "Kindly, Login to continue.",
              });
              router.push("/sign-in");
            }
          })
          .finally(() => {
            setLoading(false);
          });
      };
    
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
          name="userName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  {...register("userName")}
                  placeholder="John Jones"
                />
              </FormControl>
              <FormMessage>{errors.userName?.message}</FormMessage>
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

      <FormSuccess message={successMessage} />
      <FormFailure message={errorMessage} />

      <Button className="w-full mt-2" type="submit" disabled={loading}>
        {loading ? (
          <>
            Loading
            <Loader2 className="ml-1 h-6 w-6 animate-spin" />
          </>
        ) : (
          "Create new Account"
        )}
      </Button>
    </form>
  </FormProvider>
  )
}

export default SignUpForm
