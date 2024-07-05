import { Dot } from "lucide-react";
import SendMessage from "../Components/SendMessage";

const page = () => {
  return (
    <div className="flex flex-col gap-5 mt-6 ">
      <div>
        <h2 className="text-2xl text-gray-600 mb-1 font-semibold">Let us Know</h2>
        <div className="flex ">
          <Dot />
          <h2 className=" text-gray-700 ">About any issues in the website.</h2>
        </div>
        <div className="flex ">
          <Dot />
          <h2 className="text-gray-700 ">Your Feedback.</h2>
        </div>
      </div>
      <SendMessage />
    </div>
  );
};

export default page;
