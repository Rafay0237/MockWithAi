import Header from "./Components/Header";
import PrivateRoute from "../PrivateRoute";

const DashBoardLayout = ({ children }) => {
  return (
    <div>
      <Header />
      <div className="mx-5 md:mx-10 lg:mx-20 ">
        <PrivateRoute>{children}</PrivateRoute>
      </div>
    </div>
  );
};

export default DashBoardLayout;
