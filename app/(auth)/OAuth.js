import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { doSocialLogin } from "../actions";


const OAuth = () => {
  return (
    <div className="w-full">
     <form className="flex gap-3 w-full" action={doSocialLogin}>
        <Button  className="w-1/2" variant="outline" name="action" value="google">
            <FcGoogle className="h-5 w-5" />
        </Button>
        <Button className="w-1/2" variant="outline" name="action" value="github">
            <FaGithub className="h-5 w-5" />
        </Button>
     </form>
    </div>
  );
};

export default OAuth;
