import { Outlet, NavLink } from "react-router-dom";

function DashboardLayout({ children }) {
  return (
    <div className="flex h-screen">

      <div className="bg-black w-[25%] p-5 text-white flex flex-col gap-5">
        <h1 className="font-bold text-lg py-5">User Management</h1>

        <NavLink to="/dashboard"   className={({ isActive }) =>
            ` ${
              isActive ? " text-cyan-400" : "hover:text-cyan-400"
            }`
          }>
          Dashboard
        </NavLink>

        {/* <NavLink to="/users"   className={({ isActive }) =>
            ` ${
              isActive ? " text-cyan-400" : "hover:text-cyan-400"
            }`
          }>
          User
        </NavLink> */} 
        <NavLink to="/Doctors"   className={({ isActive }) =>
            ` ${
              isActive ? " text-cyan-400" : "hover:text-cyan-400"
            }`
          }>
          Doctors
        </NavLink>
        <NavLink to="/Nurses"   className={({ isActive }) =>
            ` ${
              isActive ? " text-cyan-400" : "hover:text-cyan-400"
            }`
          }>
          Nurses
        </NavLink>
        <NavLink to="/Patients"   className={({ isActive }) =>
            ` ${
              isActive ? " text-cyan-400" : "hover:text-cyan-400"
            }`
          }>
          Patients
        </NavLink>
        {/* <NavLink to="/Hospital"   className={({ isActive }) =>
            ` ${
              isActive ? " text-cyan-400" : "hover:text-cyan-400"
            }`
          }>
          Hospital
        </NavLink> */}
      </div>

      <div className="bg-gray-100 w-full p-5 overflow-auto">
        {/* <Outlet /> */}
        {children}
      </div>
    </div>
  );
}

export default DashboardLayout;
