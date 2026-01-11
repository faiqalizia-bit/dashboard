import { FaUserCircle } from "react-icons/fa";
import UserMenu from "./UserMenu";

function TopBar({ user, open, setOpen }) {
  return (
    <div className="border-b-2 h-[30px] relative mb-4">
      <div className="fixed top-4 right-6 z-50">
        <FaUserCircle
          size={25}
          className="cursor-pointer text-gray-700 hover:text-primary"
          onClick={() => setOpen(!open)}
        />

        {open && <UserMenu user={user} />}
      </div>
    </div>
  );
}

export default TopBar;
