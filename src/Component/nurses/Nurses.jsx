// import DashboardLayout from "./DashboardLayout"
import DashboardLayout from "../dashboardlatout/DashboardLayout";
import { useState, useEffect } from "react";
import { AiTwotoneDelete } from "react-icons/ai";
import { MdOutlineModeEditOutline } from "react-icons/md"
import { MdKeyboardArrowRight } from "react-icons/md";
import NurseFormModal from "./NusrseFormModal";
import DeleteNurseModal from "./DeleteNurseModal";


function Nurses() {
    const [search, setSearch] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [editId, setEditId] = useState(null);
    const [showPopup, setShowPopup] = useState(false);
    const [deleted, setDeleted] = useState(false)

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
        setDeleted(id);
    };

    const handleDelete = () => {
        setNurses((prev) => prev.filter((n) => n.id !== deleted));
        setDeleted(null);
    };

    const cancelDelete = () => setDeleted(null);



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
                    <NurseFormModal
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
                    <DeleteNurseModal
                        onCancel={() => setDeleted(null)}
                        onDelete={handleDelete}
                    />
                )}

            </div>
        </DashboardLayout>
    )
}

export default Nurses