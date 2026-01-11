import { useState, useEffect } from "react";
import { AiTwotoneDelete } from "react-icons/ai";
import { MdOutlineModeEditOutline } from "react-icons/md"

const LayoutManager = ({ title, storageKey }) => {
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [editId, setEditId] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

 useEffect(() => {
    const storedData = localStorage.getItem(storageKey);
    if (storedData) {
      setItems(JSON.parse(storedData));
    }
  }, [storageKey]);


  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(items));
  }, [items, storageKey]);
  
// const storedData= JSON.parse(localStorage.getItem("storageKey"));



  const handleSubmit = (e) => {
    e.preventDefault();

    if (editId) {
      setItems(
        items.map((item) =>
          item.id === editId ? { ...item, name, email } : item
        )
      );
    } else {
      setItems([...items, { id: Date.now(), name, email }]);
    }

    closePopup();
  };

  const handleEdit = (item) => {
    setEditId(item.id);
    setName(item.name);
    setEmail(item.email);
    setShowPopup(true);
  };

  const handleDelete = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const closePopup = () => {
    setShowPopup(false);
    setEditId(null);
    setName("");
    setEmail("");
  };

  const filteredItems = items.filter(
    (item) =>
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="mb-10 relative">
      <h1 className="text-2xl font-bold mb-4">{title}</h1>

   
      <div className="flex gap-3 mb-5">
        <input
          type="text"
          placeholder="Search..."
          className="border p-2 rounded w-full"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <button
          onClick={() => setShowPopup(true)}
          className="bg-black text-orange-700 px-8 rounded"
        >
          Add
        </button>
      </div>

     
      <div className="bg-white rounded shadow overflow-x-auto">
        <table className="w-full border-collapse">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2">#</th>
              <th className="border p-2">Name</th>
              <th className="border p-2">Email</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredItems.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center p-4">
                  No data found 
                </td>
              </tr>
            ) : (
              filteredItems.map((item, index) => (
                <tr key={item.id} className="text-center bg-slate-200">
                  <td className="border p-2">{index + 1}</td>
                  <td className="border p-2">{item.name}</td>
                  <td className="border p-2">{item.email}</td>
                  <td className="border p-2 space-x-2">
                    <button
                      onClick={() => handleEdit(item)}
                      className="bg- px-3 py-1 rounded text-black"
                    >
                      <MdOutlineModeEditOutline />
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="bg-primary px-3 py-1 rounded text-black"
                    >
                     <AiTwotoneDelete />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>


       {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-5 rounded shadow w-[350px] h-50vh">
      
       <div className="flex justify-between items-center mb-4">
      <h2 className="font-bold text-black">
        {editId ? "Edit " : "Add"}
      </h2>
      <button
        onClick={closePopup} 
        className="text-orange-700 font-bold text-lg hover:text-red-500"
      >
        x
      </button>
    </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <input
                type="text"
                placeholder="Name"
                className="border p-2 rounded"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />

              <input
                type="email"
                placeholder="Email"
                className="border p-2 rounded"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <div className="flex justify-end gap-2 mt-3">
                <button
                  type="button"
                  onClick={closePopup}
                  className="px-3 py-1  rounded bg-white text-orange-700"
                >
                  Cancel
                </button>

                <button className="bg-white text-orange-700 px-4 py-1 rounded">
                  {editId ? "Save" : "Add"}
                </button>
              </div>
            </form>
          </div>
        </div>
    )}
    </div>
  );
};

export default LayoutManager;



// import { useState } from "react";
// import { IoMdAdd } from "react-icons/io";
// import { FiDelete } from "react-icons/fi";

// const LayoutManager = ({ title }) => {
//   const [items, setItems] = useState([]);
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [editId, setEditId] = useState(null);


//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (editId) {
//       setItems(
//         items.map((item) =>
//           item.id === editId ? { ...item, name, email } : item
//         )
//       );
//       setEditId(null);
//     } else {
//       setItems([
//         ...items,
//         { id: Date.now(), name, email },
//       ]);
//     }

//     setName("");
//     setEmail("");
//   };

//   const handleEdit = (item) => {
//     setEditId(item.id);
//     setName(item.name);
//     setEmail(item.email);
//     setShowPopup(true)
//   };

//   const handleDelete = (id) => {
//     setItems(items.filter((item) => item.id !== id));
//   };

//   return (
//     <div className="mb-10">
//       <h1 className="text-2xl font-bold mb-4">{title}</h1>

//       <form
//         onSubmit={handleSubmit}
//         className="bg-white p-4 rounded shadow mb-6 flex gap-3"
//       >
//         <input
//           type="text"
//           placeholder="Name"
//           className="border p-2 rounded w-1/3"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//           required
//         />

//         <input
//           type="email"
//           placeholder="Email"
//           className="border p-2 rounded w-1/3"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           required
//         />

//         <button className="bg-cyan-500 text-white px-4 rounded"  >
          
//           {editId ? "Update" : <IoMdAdd />}
//         </button>
//       </form>

//       <div className="bg-white rounded shadow overflow-x-auto">
//         <table className="w-full border-collapse">
//           <thead className="bg-gray-100">
//             <tr>
//               <th className="border p-2">#</th>
//               <th className="border p-2">Name</th>
//               <th className="border p-2">Email</th>
//               <th className="border p-2">Actions</th>
//             </tr>
//           </thead>

//           <tbody>
//             {items.length === 0 ? (
//               <tr>
//                 <td colSpan="4" className="text-center p-4">
//                   No data found
//                 </td>
//               </tr>
//             ) : (
//               items.map((item, index) => (
//                 <tr key={item.id} className="text-center bg-slate-200">
//                   <td className="border p-2">{index + 1}</td>
//                   <td className="border p-2">{item.name}</td>
//                   <td className="border p-2">{item.email}</td>
//                   <td className="border p-2 space-x-2">
//                     <button
//                       onClick={() => handleEdit(item)}
//                       className="bg-yellow-400 px-3 py-1 rounded text-white"
//                     >
//                       Edit
//                     </button>
//                     <button
//                       onClick={() => handleDelete(item.id)}
//                       className="bg-black px-3 py-1 rounded text-cyan-400"
//                     >
//                       <FiDelete />
//                     </button>
//                   </td>
//                 </tr>
//               ))
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default LayoutManager;
























// import { Outlet, NavLink, Link, Router, useNavigate } from "react-router-dom";
// import { FaUserDoctor } from "react-icons/fa6"
// import { TbNurse } from "react-icons/tb"
// import { LuPill } from "react-icons/lu";
// import { RxDashboard } from "react-icons/rx"
// import { FaHospital } from "react-icons/fa";
// import { FiLogOut } from "react-icons/fi";
// import { useState, useEffect } from "react";
// import { IoChevronBack, IoChevronForward } from "react-icons/io5";
// import { FaUserCircle } from "react-icons/fa";


// function DashboardLayout({ children }) {

//   const routes = [
//     {
//       title: "Dashboard",
//       icon: <RxDashboard />,
//       path: "/dashboard"
//     },
//     {
//       title: "Doctors",
//       icon: <FaUserDoctor />,
//       path: "/doctors"
//     },
//     {
//       title: "Nurses",
//       icon: <TbNurse />,
//       path: "/nurses"
//     },
//     {
//       title: "Patients",
//       icon: <LuPill />,
//       path: "/patients"
//     },

//   ]
//   const [collapsed, setCollapsed] = useState(false);
//   const [open, setOpen] = useState(false);
//   const [user, setUser] = useState(null)
//   const navigate = useNavigate()

//   // const storedUser = JSON.parse(localStorage.getItem("loggedUser"));
  
//   //   useEffect(() => {
//   //     console.log("ddd", storedUser)
//   //     if (!storedUser) {
//   //       navigate("/")
//   //     }
//   //   }, [])


//   // if (!storedUser) {
//   //   return
//   // }    

// // const storedUser = JSON.parse(localStorage.getItem("loggeduser"));

// // useEffect(()=>{
// //   if(!storedUser){
// //     navigate("/")
// //   }
// // },[])

// // if (!storedUser){
// //   return
// // }

// const storedUser =JSON.parse(localStorage.getItem("loggedUser"));
// useEffect (()=>{
//   if(!storedUser){
//     navigate("/")
//   }
//   else {
//     setUser(storedUser);
//   }
// },[])
// if (!storedUser){
//   return 
// }

//   const handleLogout = () => {
//         localStorage.clear();
//     navigate("/")
//   }

//   return (
//     <div className="flex h-screen">
//       {/* todo */}
//       {/* <Sidbar /> */}
//       <div
//         className={`bg-[#f3f4f6] flex flex-col transition-all duration-300
//         ${collapsed ? "w-[70px]" : "w-[17%]"} p-4`}
//       >


//         <div className="flex items-center justify-between mb-4">
//           {!collapsed && (
//             <h1 className="font-bold text-lg flex items-center gap-2">
//               <FaHospital />
//               Care Health
//             </h1>
//           )}

//           <button
//             onClick={() => setCollapsed(!collapsed)}
//             className="text-xl m-auto"
//           >
//             {collapsed ? <IoChevronForward /> : <IoChevronBack />}
//           </button>
//         </div>

//         {/* Routes */}
//         <div className="flex flex-col gap-2">
//           {routes.map((item, idx) => (
//             <NavLink
//               key={idx}
//               to={item.path}
//               className={({ isActive }) =>
//                 `flex items-center gap-3 p-3 rounded-md transition-all
//                 ${isActive
//                   ? "bg-primary text-white"
//                   : "hover:text-orange-700"}`
//               }
//             >
//               <span className="text-lg">{item.icon}</span>
//               {!collapsed && <span>{item.title}</span>}
//             </NavLink>
//           ))}
//         </div>

//         <button className="mt-auto flex items-center gap-3 p-3 hover:text-orange-700 rounded-md" onClick={handleLogout}>
//           <FiLogOut />
//           {!collapsed && "Logout"}
//         </button>

//       </div>
//       {/* todo */}
//       {/* <Content /> */}
//       <div className=" w-full p-5 overflow-auto relative">
//         <div className="border-b-2 border-e-black h-[30px] relative">

//           <div className="fixed top-4 right-6 z-50 ">
//             <FaUserCircle
//               size={25}
//               className="cursor-pointer text-gray-700 hover:text-primary"
//               onClick={() => setOpen(!open)}
//             />
//             {open && (<div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-md border ">
//               <ul className="text-sm">
//                 <li className="px-4 py-2 hover:text-primary">
//                   {user.name}
//                 </li>
//                 <li className="px-4 py-2 hover:text-primary">
//                   {user.email}
//                 </li>
//               </ul>
//             </div>
//             )}

//           </div>

//         </div>
//         {children}
//       </div>
//     </div>
//   );
// }

// export default DashboardLayout;





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