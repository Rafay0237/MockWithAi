import Header from "./Components/Header"

const DashBoardLayout = ({children}) => {
  return (
    <div>
      <Header/>
      <div className="mx-5 md:mx-10 lg:mx-20 ">
      {children}
      </div>
    </div>
  )
}

export default DashBoardLayout
