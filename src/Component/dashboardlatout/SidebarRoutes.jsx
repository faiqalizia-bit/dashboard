import { NavLink } from "react-router-dom";
// import { RxDashboard } from "react-icons/rx";
import { RiDashboardFill } from "react-icons/ri";
// import { FaUserDoctor } from "react-icons/fa6";
import { MdMedicalServices } from "react-icons/md";
// import { TbNurse } from "react-icons/tb";
import { FaUserNurse } from "react-icons/fa";
// import { LuPill } from "react-icons/lu";
import { MdPersonalInjury } from "react-icons/md";
// import { SiBitwarden } from "react-icons/si";
import { FaPeopleCarry } from "react-icons/fa";
// import { FcDepartment } from "react-icons/fc";
import { MdApartment } from "react-icons/md";
// import { GiGuardedTower } from "react-icons/gi";
import { MdSecurity } from "react-icons/md";

const routes = [
  { title: "Dashboard", icon: <RiDashboardFill />, path: "/dashboard" },
  { title: "Doctors", icon: <MdSecurity />, path: "/doctors" },
  { title: "Nurses", icon: <FaUserNurse />, path: "/nurses" },
  { title: "Patients", icon: <MdPersonalInjury />, path: "/patients" },
  { title: "Ward Boys", icon: < FaPeopleCarry />, path: "/wardboys" },
  { title: "Departments", icon: <MdApartment />, path: "/department" },
  { title: "Guards", icon: <MdSecurity   />, path: "/guards" },

];

function SidebarRoutes({ collapsed }) {
  return (
    <div className="flex flex-col gap-2">
      {routes.map((item, idx) => (
        <NavLink
          key={idx}
          to={item.path}
          className={({ isActive }) =>
            `flex items-center gap-3 p-3 rounded-md transition-all tracking-[1px]
            ${isActive ? "bg-primary text-white" : "  hover:text-orange-700"}`
          }
        >
          <span className="text-lg font-bold">{item.icon}</span>
          {!collapsed && <span>{item.title}</span>}
        </NavLink>
      ))}
    </div>
  );
}

export default SidebarRoutes;