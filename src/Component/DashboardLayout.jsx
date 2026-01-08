import { Outlet, NavLink } from "react-router-dom";
import { FaUserDoctor } from "react-icons/fa6"
import { TbNurse } from "react-icons/tb"
import { LuPill } from "react-icons/lu";
import { RxDashboard } from "react-icons/rx"
import { FaHospital } from "react-icons/fa";

function DashboardLayout({ children }) {

  const routes = [
    {
      title: "Dashboard",
      icon: <RxDashboard />,
      path: "/dashboard"
    },
    {
      title: "Doctors",
      icon:<FaUserDoctor />,
      path:"/doctors"
    },
    {
      title: "Nurses",
      icon:<TbNurse />,
      path:"/nurses"
    },
    {
      title: "Patients",
      icon: <LuPill />,
      path:"/patients"
    }

  ]

  return (
    <div className="flex h-screen">

      <div className="bg-[#f3f4f6] w-[17%] p-5  flex flex-col gap-5">
        <h1 className="font-bold text-lg py-0"><div className="flex gap-[4px] items-center"><FaHospital/>Care Health</div></h1>
        {routes.map((item, idx) => (

          <NavLink to={item.path} className={({ isActive }) =>
            ` ${isActive ? "bg-primary text-white rounded-md p-3" : "hover:text-orange-700"
            }`
          } key={idx}>
            <div className="flex gap-[4px] items-center pl-[8px]">
              {item.icon} {item.title}
            </div>

          </NavLink>
        ))}

      
      </div>

      <div className=" w-full p-5 overflow-auto">
        <div className="border-b-2 border-e-black h-[30px]">


        </div>
        {/* <Outlet /> */}
        {children}
      </div>
    </div>
  );
}

export default DashboardLayout;





  {/* <NavLink to="/Doctors" className={({ isActive }) =>
          ` ${isActive ? "bg-primary text-nuteral rounded-sm p-[4px]" : "hover:text-orange-700"
          }`
        }>
          <div className="flex gap-[4px] items-center">
            <FaUserDoctor /> Doctors</div>
        </NavLink>
        <NavLink to="/Nurses" className={({ isActive }) =>
          ` ${isActive ? "bg-primary text-nuteral rounded-sm p-[4px] " : "hover:text-orange-700"
          }`
        }>
          <div className="flex gap-[4px] items-center">
            <TbNurse />Nurses</div>
        </NavLink>
        <NavLink to="/Patients" className={({ isActive }) =>
          ` ${isActive ? "bg-primary text-nuteral rounded-sm p-[4px]" : "hover:text-orange-700"
          }`
        }>
          <div className="flex gap-[4px] items-center">
            <LuPill />Patients</div>
        </NavLink> */}

        {/* <NavLink to="/Hospital"   className={({ isActive }) =>
            ` ${
              isActive ? " text-cyan-400" : "hover:text-cyan-400"
            }`
          }>
          Hospital
        </NavLink> */}
