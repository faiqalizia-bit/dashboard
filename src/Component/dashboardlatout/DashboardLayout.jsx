import { Outlet, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import TopBar from "./TopBar";

function DashboardLayout({ children }) {
  const [collapsed, setCollapsed] = useState(false);
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(null)
  const navigate = useNavigate();



  const storedUser = JSON.parse(localStorage.getItem("loggedUser"));
  useEffect(() => {
    if (!storedUser) {
      navigate("/")
    }
    else {
      setUser(storedUser);
    }
  }, [])
  if (!storedUser) {
    return
  }
  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="flex h-screen">
      <Sidebar
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        onLogout={handleLogout}
      />

      <div className="w-full p-5 overflow-auto relative">
        <TopBar user={user} open={open} setOpen={setOpen} />
        {children}
      </div>
    </div>
  );
}

export default DashboardLayout;



