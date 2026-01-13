import React from 'react'
import DashboardLayout from '../dashboardlatout/DashboardLayout'
import DepartmentTable from './DepartmentTable';
import { useState, useEffect } from "react";
import { FcDepartment } from "react-icons/fc";
import { MdKeyboardArrowRight } from "react-icons/md";
import DepartmentFormModal from './departmentFormModal';
function Department() {
    const [search, setSearch] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [editId, setEditId] = useState(null);
    const [showPopup, setShowPopup] = useState(false);
    const [deleted, setDeleted] = useState(false)
    const [status, setStatus] = useState("");

    const [department, setDepartment] = useState(() => {
        try {
            return JSON.parse(localStorage.getItem("department")) || [];
        } catch {
            return [];
        }
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        const newWardboy = {
            id: Date.now(),
            name,
            email,
            status,//
        };
        if (editId) {
            setDepartment((prev) =>
                prev.map((w) =>
                    w.id === editId ? { ...w, name, email, status } : w
                )
            );
        } else {
            setDepartment((prev) => [...prev, newWardboy]);
        }
        closePopup();
    };

    const closePopup = () => {
        setShowPopup(false);
        setEditId(null);
        setName("");
        setEmail("");
        setStatus("");//
    };

    useEffect(() => {
        try {
            localStorage.setItem("department", JSON.stringify(department));
        } catch (e) {
            console.error("Failed to save deparment to localStorage", e);
        }
    }, [department]);

    const editDr = (w) => {
        setEditId(w.id);
        setName(w.name);
        setEmail(w.email);
        setShowPopup(true);//
        setStatus(w.status);
    };

    const delDr = (id) => {
        setDepartment((prevDoctors) =>
            prevDoctors.filter((doctor) => doctor.id !== id)
        );
    };

    const filteredDepart = department.filter(
        (doc) =>
            doc.name.toLowerCase().includes(search.toLowerCase()) ||
            doc.email.toLowerCase().includes(search.toLowerCase())
    );
    const confirmDeleteDoctor = (id) => {
        setDeleted(id);
    };

    const handleDelete = () => {
        setDepartment((prev) => prev.filter((n) => n.id !== deleted));
        setDeleted(null);
    };

    const cancelDelete = () => setDeleted(null);

    return (
        <DashboardLayout>
            <div className="mb-10 relative py-2">
                <h1 className="text-lg font-bold mb-4"> <div className="flex gap-[1px] items-center">Dashboard<span className="mt-[2px]"><MdKeyboardArrowRight /> </span>Department</div></h1>

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

                <DepartmentTable
                    department={filteredDepart}
                    onEdit={editDr}
                    onDelete={confirmDeleteDoctor}
                />

                {showPopup && (<DepartmentFormModal
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

                {deleted && (<DeleteFormModal
                    onCancel={() => setDeleted(null)}
                    onDelete={handleDelete}
                />
                )}

            </div>
        </DashboardLayout>

    )
}

export default Department