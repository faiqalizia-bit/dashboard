import DashboardLayout from "./DashboardLayout"
import LayoutManager from "./LayoutManager"
import { useState, useEffect } from "react";
import { AiTwotoneDelete } from "react-icons/ai";
import { MdOutlineModeEditOutline } from "react-icons/md"
import { MdKeyboardArrowRight } from "react-icons/md";



function Nurses() {
  const [search, setSearch] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [editId, setEditId] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [deleted, setDelete] = useState(false)

  const [nurses, setNurses] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("nurses")) || [];
    } catch {
      return [];
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const newnurse = {
      id: Date.now(),
      name,
      email,
    };
    if (editId) {
      setNurses((prev) =>
        prev.map((nun) =>
          nun.id === editId ? { ...nun, name, email } : nun
        )
      );
    } else {
      setNurses((prev) => [...prev, newnurse]);
    }
    closePopup();
  };

  const closePopup = () => {
    setShowPopup(false);
    setEditId(null);
    setName("");
    setEmail("");
  };

  useEffect(() => {
    try {
      localStorage.setItem("nurses", JSON.stringify(nurses));
    } catch (e) {
      console.error("Failed to save nurses to localStorage", e);
    }
  }, [nurses]);

  const editNurse = (nurse) => {
    setEditId(nurse.id);
    setName(nurse.name);
    setEmail(nurse.email);
    setShowPopup(true);
  };

  const delNurse = (id) => {
    setNurses((prevNurses) =>
      prevNurses.filter((nurse) => nurse.id !== id)
    );
  };

  const filteredNurses = nurses.filter(
    (nun) =>
      nun.name.toLowerCase().includes(search.toLowerCase()) ||
      nun.email.toLowerCase().includes(search.toLowerCase())
  );

   const confirmDeleteNurse = (id) => {
    setDelete(id); 
  };

  const handleDelete = () => {
    setNurses((prev) => prev.filter((n) => n.id !== deleted));
    setDelete(null); 
  };

  const cancelDelete = () => setDelete(null);



  return (
    <DashboardLayout>
      <div className="mb-10 relative py-2">
        <h1 className="text-sm font-bold mb-4"> <div className="flex gap-[1px] items-center">Dashbord<span className="mt-[2px]"><MdKeyboardArrowRight /></span>Nurses</div></h1>

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
            className="bg-primary text-neutral px-8 rounded"
          >
            Add
          </button>
        </div>


        <div className="bg-white rounded shadow overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-100">
              <tr>
                <th className="border p-2">Name</th>
                <th className="border p-2">Email</th>
                <th className="border p-2">Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredNurses.length === 0 ? (
                <tr>
                  <td colSpan="4" className="text-center p-4">
                    No data found
                  </td>
                </tr>
              ) : (
                filteredNurses.map((item, index) => (
                  <tr key={item.id} className="text-left bg-neutral">
                    <td className="border p-2">{item.name}</td>
                    <td className="border p-2">{item.email}</td>
                    <td className="border p-2 space-x-2">
                      <button
                        onClick={() => editNurse(item)}
                        className=" px-3 py-1 rounded text-secondary"
                      >
                        <MdOutlineModeEditOutline />
                      </button>
                      <button
                        onClick={() => confirmDeleteNurse(item.id)}
                        className=" px-3 py-1 rounded text-secondary"
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
          <div className="fixed inset-0 bg-secondary bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-5 rounded shadow w-[350px] h-50vh">

              <div className="flex justify-between items-center mb-4">
                <h2 className="font-bold text-secondary">
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
                    className="px-3 py-1  rounded bg-primary text-neutral"
                  >
                    Cancel
                  </button>

                  <button className="bg-primary text-neutral px-4 py-1 rounded">
                    {editId ? "Save" : "Add"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
    {deleted&&(
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-5 rounded shadow w-[300px] text-center relative">
            
              <button 
              onClick={cancelDelete}
              className="absolute top-2 right-2 text-gray-500 hover:text-red-600 font-bold text-lg">x</button> 
            
             <h2 className="text-lg font-bold mb-4 ">Confirm Delete</h2>
             <p className="mb-5">Are you sure you want to delete this nurse?</p>

            <div className="flex justify-center gap-2 mt-3">
              <button
                type="button"
                onClick={cancelDelete}
                className="px-3 py-1  rounded bg-gray-400 text-neutral"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleDelete}
                className="px-3 py-1  rounded bg-primary text-neutral"
              >
                Delete
              </button>

            </div>
          </div>
        </div>
        )}
      </div>
    </DashboardLayout>
  )
}

export default Nurses