import { Outlet, NavLink, Link } from "react-router-dom";
import { FaUserDoctor } from "react-icons/fa6"
import { TbNurse } from "react-icons/tb"
import { LuPill } from "react-icons/lu";
import { RxDashboard } from "react-icons/rx"
import { FaHospital } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { useState, useEffect } from "react";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import { FaUserCircle } from "react-icons/fa";


function DashboardLayout({ children }) {

  const routes = [
    {
      title: "Dashboard",
      icon: <RxDashboard />,
      path: "/dashboard"
    },
    {
      title: "Doctors",
      icon: <FaUserDoctor />,
      path: "/doctors"
    },
    {
      title: "Nurses",
      icon: <TbNurse />,
      path: "/nurses"
    },
    {
      title: "Patients",
      icon: <LuPill />,
      path: "/patients"
    },

  ]
  const [collapsed, setCollapsed] = useState(false);
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState("")
 useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("loggedUser"));
    if (storedUser) {
      setUser(storedUser);
    }
  }, [])


  return (
    <div className="flex h-screen">

      <div
        className={`bg-[#f3f4f6] flex flex-col transition-all duration-300
        ${collapsed ? "w-[70px]" : "w-[17%]"} p-4`}
      >


        <div className="flex items-center justify-between mb-4">
          {!collapsed && (
            <h1 className="font-bold text-lg flex items-center gap-2">
              <FaHospital />
              Care Health
            </h1>
          )}

          <button
            onClick={() => setCollapsed(!collapsed)}
            className="text-xl m-auto"
          >
            {collapsed ? <IoChevronForward /> : <IoChevronBack />}
          </button>
        </div>

        {/* Routes */}
        <div className="flex flex-col gap-2">
          {routes.map((item, idx) => (
            <NavLink
              key={idx}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 p-3 rounded-md transition-all
                ${isActive
                  ? "bg-primary text-white"
                  : "hover:text-orange-700"}`
              }
            >
              <span className="text-lg">{item.icon}</span>
              {!collapsed && <span>{item.title}</span>}
            </NavLink>
          ))}
        </div>

        <Link to="/" className="mt-auto flex items-center gap-3 p-3 hover:text-orange-700 rounded-md">
            <FiLogOut />
          {!collapsed && "Logout"}
        </Link>

      </div>

      <div className=" w-full p-5 overflow-auto relative">
        <div className="border-b-2 border-e-black h-[30px] relative">
        
         <div className="fixed top-4 right-6 z-50 ">
          <FaUserCircle
            size={25}
            className="cursor-pointer text-gray-700 hover:text-primary"
            onClick={() => setOpen(!open)}
          />
         {open && ( <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-md border ">
              <ul className="text-sm">
                <li className="px-4 py-2 hover:text-primary">
                {user.name}
                </li>
                <li className="px-4 py-2 hover:text-primary">
                  {user.email}
                </li>
              </ul>
            </div>
            )}

          </div>

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
