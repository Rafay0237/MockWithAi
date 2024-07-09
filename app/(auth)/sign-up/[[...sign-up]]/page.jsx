import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import OAuth from "../../OAuth";
import Link from "next/link";
import SignUpForm from "../../Components/SignUpForm";

const Page = () => {
  return (
    <div className="flex h-[100vh] w-full justify-center items-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-yellow-200 to-orange-500">
      <Card className="w-[400px] lg:w-[450px]">
        <CardHeader className="items-center">
          <CardTitle>Mock-With-Ai</CardTitle>
          <CardDescription>Create an Account</CardDescription>
        </CardHeader>
        <CardContent>

          <SignUpForm/>

        </CardContent>
        <CardFooter className="flex flex-col gap-5">

          <OAuth/>
          
          <div className="flex gap-2 text-sm text-gray-700 font-semibold">
            <p>Already have an account?</p>
            <Link href={"/sign-in"}>
              <h2 className="text-gray-900 hover:cursor-pointer">Login</h2>
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Page;
