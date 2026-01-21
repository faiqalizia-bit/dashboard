import { useEffect, useState } from "react";
import  DashboardLayout  from "../Component/dashboardlatout/DashboardLayout"
import { MdKeyboardArrowRight } from "react-icons/md";
import NursesTable from "../Component/nurses/NursesTable";
import DeleteNurseModal from "../Component/nurses/DeleteNurseModal";
import { useFormModal } from "../Component/modal/useFormModal";
import CreateNurse from "../Component/nurses/NusrseFormModal";
import { getNurses, createNurse, updateNurse, deleteNurse } from "../services/nurses.services";
import { NurseType } from "../types/nurses";



function Nurses() {
  const [nurses, setNurses] = useState([]);
  const [search, setSearch] = useState("");
  const [deleted, setDeleted] = useState(null);
  
  const {
    isOpen,
    editId,
    formData,
    handleChange,
    openAdd,
    openEdit,
    close,
  } = useFormModal(NurseType);

  const fetchNurses = async () => {
    const res = await getNurses();
    setNurses(res.data);
  };

  useEffect(() => {
    fetchNurses();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editId) {
      await updateNurse(editId, formData);
    } else {
      await createNurse(formData);
    }

    fetchNurses();
    close();
  };

  const handleDelete = async () => {
    await deleteNurse(deleted);
    fetchNurses();
    setDeleted(null);
  };

  const filteredNurses = nurses.filter(
    (n) =>
      n.name.toLowerCase().includes(search.toLowerCase()) ||
      n.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <DashboardLayout>
      <h1 className="text-lg font-bold mb-4 flex items-center gap-1">
        Dashboard <MdKeyboardArrowRight /> Nurses
      </h1>

      <div className="flex gap-3 mb-5">
        <input
          placeholder="Search..."
          className="border p-2 rounded w-full"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <button onClick={openAdd} className="bg-primary text-white px-8 rounded">
          Add
        </button>
      </div>

      <NursesTable
        nurses={filteredNurses}
        onEdit={(nurse) =>
          openEdit(nurse._id, {
            name: nurse.name,
            email: nurse.email,
            status: nurse.status,
          })
        }
        onDelete={(id) => setDeleted(id)}
      />

      {isOpen && (
        <CreateNurse 
         formData={formData}
         handleChange={handleChange}
         editId={editId}
         onClose={close}
         onSubmit={handleSubmit}
        
        />

      )}

      {deleted && (
        <DeleteNurseModal
          onCancel={() => setDeleted(null)}
          onDelete={handleDelete}
        />
      )}
    </DashboardLayout>
  );
}

export default Nurses;












































































// import DashboardLayout from "../dashboardlatout/DashboardLayout";
// import { useState, useEffect } from "react";
// import { AiTwotoneDelete } from "react-icons/ai";
// import { MdOutlineModeEditOutline } from "react-icons/md"
// import { MdKeyboardArrowRight } from "react-icons/md";
// import NurseFormModal from "./NusrseFormModal";
// import DeleteNurseModal from "./DeleteNurseModal";
// import NursesTable from "./NursesTable";
// import API from "../../api";


// function Nurses() {
//     const [search, setSearch] = useState("");
//     const [name, setName] = useState("");
//     const [email, setEmail] = useState("");
//     const [editId, setEditId] = useState(null);
//     const [showPopup, setShowPopup] = useState(false);
//     const [deleted, setDeleted] = useState(false)
//     const [status, setStatus] = useState("");//

//     const [nurses, setNurses] = useState([])


//      const fetchNurses = async () => {
//   try {
//     const res = await API.get("nurses");
//     setNurses(res.data);
//   } catch (err) {
//     console.error(err);
//   }
// };


// const handleSubmit = async (e) => {
//   e.preventDefault();
//   try {
//     if (editId) {
//       const res = await API.put(`/nurses/${editId}`, { name, email, status });
//     } else {
//       const res = await API.post("/nurses", { name, email, status });
//     }
//     fetchNurses();
//     closePopup();
//   } catch (err) {
//     console.error(err);
//   }
// };


// const handleDelete = async () => {
//   try {
//     await API.delete(`/nurses/${deleted}`);
//     fetchNurses();
//     setDeleted(null);
//   } catch (err) {
//     console.error(err);
//   }
// };



//     const closePopup = () => {
//         setShowPopup(false);
//         setEditId(null);
//         setName("");
//         setEmail("");
//         setStatus("");//
//     };

//     useEffect(() => {
//      fetchNurses()
//     }, []);

//     const editNurse = (nurse) => {
//         setEditId(nurse._id);
//         setName(nurse.name);
//         setEmail(nurse.email);
//         setStatus(nurse.status)
//         setShowPopup(true);
//     };

//     const filteredNurses = nurses.filter(
//         (nun) =>
//             nun.name.toLowerCase().includes(search.toLowerCase()) ||
//             nun.email.toLowerCase().includes(search.toLowerCase())
//     );

//     const confirmDeleteNurse = (id) => {
//         setDeleted(id);
//     };

   


//     return (
//         <DashboardLayout>
//             <div className="mb-10 relative py-2">
//                 <h1 className="text-lg font-bold mb-4"> <div className="flex gap-[1px] items-center">Dashbord<span className="mt-[2px]"><MdKeyboardArrowRight /></span>Nurses</div></h1>

//                 <div className="flex gap-3 mb-5">
//                     <input
//                         type="text"
//                         placeholder="Search..."
//                         className="border p-2 rounded w-full"
//                         value={search}
//                         onChange={(e) => setSearch(e.target.value)}
//                     />

//                     <button
//                         onClick={() => setShowPopup(true)}
//                         className="bg-primary text-neutral px-8 rounded"
//                     >
//                         Add
//                     </button>
//                 </div>



//                 <NursesTable
//                     nurses={filteredNurses}
//                     onEdit={editNurse}
//                     onDelete={confirmDeleteNurse}
//                 />

//                 {showPopup && (
//                     <NurseFormModal
//                         name={name}
//                         email={email}
//                         setName={setName}
//                         setEmail={setEmail}
//                         editId={editId}
//                         onClose={closePopup}
//                         onSubmit={handleSubmit}
//                         status={status}//
//                         setStatus={setStatus}
//                     />
//                 )}

//                 {deleted && (
//                     <DeleteNurseModal
//                         onCancel={() => setDeleted(null)}
//                         onDelete={handleDelete}
//                     />
//                 )}

//             </div>
//         </DashboardLayout>
//     )
// }

// export default Nurses





