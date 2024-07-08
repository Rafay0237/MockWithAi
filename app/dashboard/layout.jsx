import Header from "./Components/Header";
import { auth } from "@/auth";
import { redirect } from 'next/navigation';

const DashBoardLayout = async({ children }) => {
  const session=await auth()
  if(!session?.user) redirect("/sign-in")

  return (
    <div>
      <Header user={session?.user} />
      <div className="mx-5 md:mx-10 lg:mx-20 ">
          {children}
      </div>
    </div>
  );
};

export default DashBoardLayout;
