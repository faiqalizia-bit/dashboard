import { useState } from "react";

const LayoutManager = ({ title }) => {
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [editId, setEditId] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  // Add / Save
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

      {/* Search + Add */}
      <div className="flex gap-3 mb-5">
        <input
          type="text"
          placeholder="Search..."
          className="border p-2 rounded w-1/3"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <button
          onClick={() => setShowPopup(true)}
          className="bg-cyan-500 text-white px-4 rounded"
        >
          Add
        </button>
      </div>

      {/* Table */}
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
                      className="bg-yellow-400 px-3 py-1 rounded text-white"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="bg-red-500 px-3 py-1 rounded text-white"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Popup Modal */}
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-5 rounded shadow w-[350px]">
            <h2 className="font-bold mb-4">
              {editId ? "Edit User" : "Add User"}
            </h2>

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
                  className="px-3 py-1 border rounded"
                >
                  Cancel
                </button>

                <button className="bg-cyan-500 text-white px-4 py-1 rounded">
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



 {/* <div className="bg-[#f3f4f6] w-[17%] p-5  flex flex-col gap-5">
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
       <button
          onClick={''}
          className="mt-auto flex items-center gap-2 p-3 hover:text-orange-700 rounded-md"
        >
          <FiLogOut />
          Logout
        </button>
      
      </div> */}
      // ---------------




// import { useEffect, useState } from "react";
// import DashboardLayout from "../Component/DashboardLayout";
// const Users = () => {
//   const [users, setUsers] = useState([]);
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [editId, setEditId] = useState(null);



 
//   const handleSubmit = (e) => {
//     e.preventDefault();

    

//     if (editId) {
//       setUsers(
//         users.map((user) =>
//           user.id === editId ? { ...user, name, email } : user
//         )
//       );
//       setEditId(null);
//     } else {
//       setUsers([
//         ...users,
//         {
//           id: Date.now(),
//           name,
//           email,
//         },
//       ]);
//     }

//     setName("");
//     setEmail("");
//   };

  
//   const handleEdit = (user) => {
//     setEditId(user.id);
//     setName(user.name);
//     setEmail(user.email);
//   };


//   const handleDelete = (id) => {
//       setUsers(users.filter((user) => user.id !== id));
    
//   };

//   return (
//     <DashboardLayout>
//     <div>
//       <h1 className="text-2xl font-bold mb-4">Users / Customers</h1>

  
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
//         />

//         <input
//           type="email"
//           placeholder="Email"
//           className="border p-2 rounded w-1/3"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//         />

//         <button className="bg-cyan-500 text-white px-4 rounded">
//           {editId ? "Update" : "Add"}
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
//             {users.length === 0 ? (
//               <tr>
//                 <td colSpan="5" className="text-center p-4">
//                   No users found
//                 </td>
//               </tr>
//             ) : (
//                  users.map((user, index) => (
//                 <tr key={user.id} className="text-center bg-slate-200">
//                   <td className="border p-2">{index + 1}</td>
//                   <td className="border p-2">{user.name}</td>
//                   <td className="border p-2">{user.email}</td>
//                   <td className="border p-2 space-x-2">
//                     <button
//                       onClick={() => handleEdit(user)}
//                       className="bg-yellow-400 px-3 py-1 rounded text-white"
//                     >
//                       Edit
//                     </button>
//                     <button
//                       onClick={() => handleDelete(user.id)}
//                       className="bg-red-500 px-3 py-1 rounded text-white"
//                     >
//                       Delete
//                     </button>
//                   </td>
//                 </tr>
//               ))
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//     </DashboardLayout>
//   );
// };

// export default Users;




// import DashboardLayout from "../Component/DashboardLayout";

// const Users = () => {

//     return (
//         <DashboardLayout>

//             <h1 className="text-2xl font-bold mb-4">Users</h1>
//             <input
//                     type="text"
//                     onInput=''
//                 />
//             <div className="bg-white rounded shadow-md mb-8 ">
//                 <table className="w-full border-collapse">
//                     <thead className="bg-gray-100">
//                         <tr>
//                             <th className="border p-2">#</th>
//                             <th className="border p-2">Name</th>
//                             <th className="border p-2">Email</th>
//                             <th className="border p-2">Actions</th>
//                         </tr>
//                     </thead>

//                     <tbody>
//                         <tr>
//                             <td colSpan="5" className="text-center p-4">
//                                 No users found
//                             </td>
//                         </tr>
//                     </tbody>
//                 </table>
//             </div>
//         </DashboardLayout>

//     );
// };

// export default Users;
