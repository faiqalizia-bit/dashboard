import { useState, useEffect } from "react";
import { AiTwotoneDelete } from "react-icons/ai";
import { MdOutlineModeEditOutline } from "react-icons/md"

const LayoutManager = ({ title }) => {
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [editId, setEditId] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
  const storedItems = localStorage.getItem("layoutItems");
  if (storedItems) {
    setItems(JSON.parse(storedItems));
  }
}, []);

  useEffect(() => {
    localStorage.setItem("layoutItems", JSON.stringify(items));
  }, [items]);

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
                      className="bg-orange-700 px-3 py-1 rounded text-black"
                    >
                      <MdOutlineModeEditOutline />
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="bg-orange-700 px-3 py-1 rounded text-black"
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
