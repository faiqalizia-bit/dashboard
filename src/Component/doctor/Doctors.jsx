import DashboardLayout from "../DashboardLayout";
import { useState, useEffect } from "react";
import { AiTwotoneDelete } from "react-icons/ai";
import { MdOutlineModeEditOutline } from "react-icons/md"
import { MdKeyboardArrowRight } from "react-icons/md";
import DoctorFormModal from "./DoctorFormModal";
import DeleteDoctorModal from "./DeleteDoctorModal";

function Doctors() {
  const [search, setSearch] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [editId, setEditId] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [deleted,setDeleted]= useState(false)
  
  const [doctors, setDoctors] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("doctors")) || [];
    } catch {
      return [];
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const newDoctor = {
      id: Date.now(),
      name,
      email,
    };
      if (editId) {
      setDoctors((prev) =>
        prev.map((doc) =>
          doc.id === editId ? { ...doc, name, email } : doc
        )
      );
    } else {
    setDoctors((prev) => [...prev, newDoctor]);
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
      localStorage.setItem("doctors", JSON.stringify(doctors));
    } catch (e) {
      console.error("Failed to save doctors to localStorage", e);
    }
  }, [doctors]);

    const editDr = (doctor) => {
    setEditId(doctor.id);
    setName(doctor.name);
    setEmail(doctor.email);
    setShowPopup(true);
  };

  const delDr = (id) => {
  setDoctors((prevDoctors) =>
    prevDoctors.filter((doctor) => doctor.id !== id)
  );
};

 const filteredDoctors = doctors.filter(
    (doc) =>
        doc.name.toLowerCase().includes(search.toLowerCase()) ||
        doc.email.toLowerCase().includes(search.toLowerCase())
  );
   const confirmDeleteDoctor = (id) => {
    setDeleted(id); 
  };

  const handleDelete = () => {
    setDoctors((prev) => prev.filter((n) => n.id !== deleted));
    setDeleted(null); 
  };

  const cancelDelete = () => setDeleted(null);



  return (
    <DashboardLayout>
      <div className="mb-10 relative py-2">
        <h1 className="text-sm font-bold mb-4"> <div className="flex gap-[1px] items-center">Dashbord<span className="mt-[2px]"><MdKeyboardArrowRight/> </span>Nurses</div></h1>

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
            className="bg-primary text-neutral  px-8 rounded"
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
              {filteredDoctors.length === 0 ? (
                <tr>
                  <td colSpan="3" className="text-center p-4">
                    No data found
                  </td>
                </tr>
              ) : (
                filteredDoctors.map((item, index) => (
                  <tr key={item.id} className="text-left bg-neutral">
                    <td className="border p-2">{item.name}</td>
                    <td className="border p-2">{item.email}</td>
                    <td className="border p-2 space-x-2">
                      <button
                        onClick={() => editDr(item)}
                        className=" px-3 py-1 rounded text-secondary"
                      >
                        <MdOutlineModeEditOutline />
                      </button>
                      <button
                        onClick={() =>  confirmDeleteDoctor(item.id)}
                        className=" px-3 py-1 rounded text-black"
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
          <DoctorFormModal
            name={name}
            email={email}
            setName={setName}
            setEmail={setEmail}
            editId={editId}
            onClose={closePopup}
            onSubmit={handleSubmit}
          />
        )}

         {deleted && (
          <DeleteDoctorModal
            onCancel={() => setDeleted(null)}
            onDelete={handleDelete}
          />
        )}
      </div>
    </DashboardLayout>
  )
}

export default Doctors