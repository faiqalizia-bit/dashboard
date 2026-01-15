import React from 'react'
import { useState, useEffect } from "react";
import { MdKeyboardArrowRight } from "react-icons/md";
import DashboardLayout from '../dashboardlatout/DashboardLayout'
import GuardsTable from './GuardsTable';
import GuardsFormModal from './GuardsFormModal';
import GuardDeleteModal from './GuardDeleteModal';
import API from '../../api';

function Guards() {
    const [search, setSearch] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [editId, setEditId] = useState(null);
    const [showPopup, setShowPopup] = useState(false);
    const [deleted, setDeleted] = useState(false)
    const [status, setStatus] = useState("");

    const [guard, setGuard] = useState([]);

   const fetchGuards = async () => {
   try{
    const res = await API.get("guards");
    setGuard(res.data);
  } 
 catch (err) {
    console.error(err);
  }
   };

   const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    if (editId) {
      const res = await API.put(`/guards/${editId}`, { name, email, status });
    } else {
      const res = await API.post("/guards", { name, email, status });
    }
    fetchGuards();
    closePopup();
  } catch (err) {
    console.error(err);
  }
};

const handleDelete = async () => {
  try {
    await API.delete(`/guards/${deleted}`);
    fetchGuards();
    setDeleted(null);
  } catch (err) {
    console.error(err);
  }
};




    const closePopup = () => {
        setShowPopup(false);
        setEditId(null);
        setName("");
        setEmail("");
        setStatus("");//
    };

    useEffect(() => {

        fetchGuards();
    }, []);

    const editDr = (w) => {
        setEditId(w.id);
        setName(w.name);
        setEmail(w.email);
        setShowPopup(true);//
        setStatus(w.status);
    };

    const delDr = (id) => {
        setGuard((prevDoctors) =>
            prevDoctors.filter((doctor) => doctor.id !== id)
        );
    };

    const filteredGuards = guard.filter(
        (doc) =>
            doc.name.toLowerCase().includes(search.toLowerCase()) ||
            doc.email.toLowerCase().includes(search.toLowerCase())
    );
    const confirmDeleteDoctor = (id) => {
        setDeleted(id);
    };


    return (
        <DashboardLayout>
            <div className="mb-10 relative py-2">
                <h1 className="text-lg font-bold mb-4"> <div className="flex gap-[1px] items-center">Dashboard<span className="mt-[2px]"><MdKeyboardArrowRight /> </span>Guards</div></h1>

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

                <GuardsTable
                    guard={filteredGuards}
                    onEdit={editDr}
                    onDelete={confirmDeleteDoctor}
                />

                {showPopup && (<GuardsFormModal
                    name={name}
                    email={email}
                    setName={setName}
                    setEmail={setEmail}
                    editId={editId}
                    onClose={closePopup}
                    onSubmit={handleSubmit}
                    status={status}
                    setStatus={setStatus}
                />
                )}

                {deleted && (
                    <GuardDeleteModal
                        onCancel={() => setDeleted(null)}
                        onDelete={handleDelete}
                    />
                )}

            </div>
        </DashboardLayout>
    )
}

export default Guards