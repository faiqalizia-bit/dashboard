import DashboardLayout from "../dashboardlatout/DashboardLayout"
import { useState, useEffect } from "react"
import { AiTwotoneDelete } from "react-icons/ai";
import { MdOutlineModeEditOutline } from "react-icons/md"
import { MdKeyboardArrowRight } from "react-icons/md";
import PatientFormModal from "./PatientFormModal";
import DeletePatientModal from "./DeletePaitientModal";


function Patients() {
    const [search, setSearch] = useState("")
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [editId, setEditId] = useState(null);
    const [showPopup, setShowPopup] = useState(false);
    const [deleted, setDeleted] = useState(false)

    const [patients, setPatients] = useState(() => {
        try {
            return JSON.parse(localStorage.getItem("patients")) || [];
        } catch {
            return [];
        }
    })

    const handleSubmit = (e) => {
        e.preventDefault();
        const newPatients = {
            id: Date.now(),
            name,
            email,
        };
        if (editId) {
            setPatients((prev) =>
                prev.map((p) =>
                    p.id === editId ? { ...p, name, email } : p
                )
            );
        } else {
            setPatients((prev) => [...prev, newPatients]);
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
            localStorage.setItem("patients", JSON.stringify(patients));
        } catch (e) {
            console.error("Failed to save patients to localStorage", e);
        }
    }, [patients]);

    const editPatients = (patient) => {
        setEditId(patient.id);
        setName(patient.name);
        setEmail(patient.email);
        setShowPopup(true);
    };

    const delPatients = (id) => {
        setPatients((prevPatients) =>
            prevPatients.filter((patient) => patient.id !== id)
        );
    };

    const confirmDeletePatient = (id) => {
        setDeleted(id);
    };

    const handleDelete = () => {
        setPatients((prev) => prev.filter((n) => n.id !== deleted));
        setDeleted(null);
    };

    const cancelDelete = () => setDeleted(null);

    const filteredpatients = patients.filter(
        (nun) =>
            nun.name.toLowerCase().includes(search.toLowerCase()) ||
            nun.email.toLowerCase().includes(search.toLowerCase())
    );
    return (
        <DashboardLayout>
            <div className="mb-10 relative py-2">
                <h1 className="text-sm font-bold mb-4"> <div className="flex gap-[1px] items-center">Dashbord<span className="mt-[2px]"><MdKeyboardArrowRight /></span>Patients</div></h1>

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
                        className="text-neutral bg-primary px-8 rounded"
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
                            {filteredpatients.length === 0 ? (
                                <tr>
                                    <td colSpan="4" className="text-center p-4">
                                        No data found
                                    </td>
                                </tr>
                            ) : (
                                filteredpatients.map((item, index) => (
                                    <tr key={item.id} className="text-left bg-neutral">
                                        <td className="border p-2">{item.name}</td>
                                        <td className="border p-2">{item.email}</td>
                                        <td className="border p-2 space-x-2">
                                            <button
                                                onClick={() => editPatients(item)}
                                                className=" px-3 py-1 rounded text-secondary"
                                            >
                                                <MdOutlineModeEditOutline />
                                            </button>
                                            <button
                                                onClick={() => confirmDeletePatient(item.id)}
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
                    <PatientFormModal
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
                    <DeletePatientModal
                        onCancel={() => setDeleted(null)}
                        onDelete={handleDelete}
                    />
                )}


            </div>

        </DashboardLayout>
    )
}

export default Patients