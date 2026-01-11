import { FaHospital } from "react-icons/fa";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import SidebarRoutes from "./SidebarRoutes";
import { FiLogOut } from "react-icons/fi";

function Sidebar({ collapsed, setCollapsed, onLogout }) {
  return (
    <div
      className={`bg-[#f3f4f6] flex flex-col transition-all duration-300
      ${collapsed ? "w-[70px]" : "w-[17%]"} p-4`}
    >
      <div className="flex items-center justify-between mb-4">
        {!collapsed && (
          <h1 className="font-bold text-lg flex items-center gap-2">
            <FaHospital /> Care Health
          </h1>
        )}

        <button
          onClick={() => setCollapsed(!collapsed)}
          className="text-xl m-auto"
        >
          {collapsed ? <IoChevronForward /> : <IoChevronBack />}
        </button>
      </div>

      <SidebarRoutes collapsed={collapsed} />

      <button
        onClick={onLogout}
        className="mt-auto flex items-center gap-3 p-3 hover:text-orange-700 rounded-md"
      >
        <FiLogOut />
        {!collapsed && "Logout"}
      </button>
    </div>
  );
}

export default Sidebar;