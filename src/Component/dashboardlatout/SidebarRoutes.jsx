import { NavLink } from "react-router-dom";
import { RxDashboard } from "react-icons/rx";
import { FaUserDoctor } from "react-icons/fa6";
import { TbNurse } from "react-icons/tb";
import { LuPill } from "react-icons/lu";

const routes = [
  { title: "Dashboard", icon: <RxDashboard />, path: "/dashboard" },
  { title: "Doctors", icon: <FaUserDoctor />, path: "/doctors" },
  { title: "Nurses", icon: <TbNurse />, path: "/nurses" },
  { title: "Patients", icon: <LuPill />, path: "/patients" },
];

function SidebarRoutes({ collapsed }) {
  return (
    <div className="flex flex-col gap-2">
      {routes.map((item, idx) => (
        <NavLink
          key={idx}
          to={item.path}
          className={({ isActive }) =>
            `flex items-center gap-3 p-3 rounded-md transition-all
            ${isActive ? "bg-primary text-white" : "hover:text-orange-700"}`
          }
        >
          <span className="text-lg">{item.icon}</span>
          {!collapsed && <span>{item.title}</span>}
        </NavLink>
      ))}
    </div>
  );
}

export default SidebarRoutes;