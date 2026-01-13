import React from 'react'
import { useState, useEffect } from "react";
import { MdKeyboardArrowRight } from "react-icons/md";
import DashboardLayout from '../dashboardlatout/DashboardLayout'
import GuardsTable from './GuardsTable';
import GuardsFormModal from './GuardsFormModal';
import GuardDeleteModal from './GuardDeleteModal';

function Guards() {
    const [search, setSearch] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [editId, setEditId] = useState(null);
    const [showPopup, setShowPopup] = useState(false);
    const [deleted, setDeleted] = useState(false)
    const [status, setStatus] = useState("");

    const [guard, setGuard] = useState(() => {
        try {
            return JSON.parse(localStorage.getItem("guards")) || [];
        } catch {
            return [];
        }
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        const newGuard = {
            id: Date.now(),
            name,
            email,
            status,//
        };
        if (editId) {
            setGuard((prev) =>
                prev.map((w) =>
                    w.id === editId ? { ...w, name, email, status } : w
                )
            );
        } else {
            setGuard((prev) => [...prev, newGuard]);
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
            localStorage.setItem("guards", JSON.stringify(guard));
        } catch (e) {
            console.error("Failed to save WardBoys to localStorage", e);
        }
    }, [guard]);

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

    const handleDelete = () => {
        setGuard((prev) => prev.filter((n) => n.id !== deleted));
        setDeleted(null);
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