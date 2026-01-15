import DashboardLayout from "../dashboardlatout/DashboardLayout"
import { useState, useEffect } from "react"
import { AiTwotoneDelete } from "react-icons/ai";
import { MdOutlineModeEditOutline } from "react-icons/md"
import { MdKeyboardArrowRight } from "react-icons/md";
import PatientFormModal from "./PatientFormModal";
import DeletePatientModal from "./DeletePaitientModal";
import PatientsTable from "./PatientsTable";
import API from "../../api";


function Patients() {
    const [search, setSearch] = useState("")
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [editId, setEditId] = useState(null);
    const [showPopup, setShowPopup] = useState(false);
    const [deleted, setDeleted] = useState(false)
    const [status, setStatus] = useState("");//

    const [patients, setPatients] = useState([]);



    const fetchPatients = async () => {
        try {
            const res = await API.get("patients");
            setPatients(res.data);
        } catch (err) {
            console.error(err);
        }
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editId) {
                const res = await API.put(`/patients/${editId}`, { name, email, status });
            } else {
                const res = await API.post("/patients", { name, email, status });
            }
            fetchPatients();
            closePopup();
        } catch (err) {
            console.error(err);
        }
    };


    const handleDelete = async () => {
        try {
            await API.delete(`/patients/${deleted}`);
            fetchPatients();
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
        fetchPatients()

    }, []);



    const editPatients = (patient) => {
        setEditId(patient._id);
        setName(patient.name);
        setEmail(patient.email);
        setStatus(patient.status)
        setShowPopup(true);
    };


    const confirmDeletePatient = (id) => {
        setDeleted(id);
    };




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


                <PatientsTable
                    patients={filteredpatients}
                    onEdit={editPatients}
                    onDelete={confirmDeletePatient}
                />

                {showPopup && (
                    <PatientFormModal
                        name={name}
                        email={email}
                        setName={setName}
                        setEmail={setEmail}
                        editId={editId}
                        onClose={closePopup}
                        onSubmit={handleSubmit}
                        status={status}//
                        setStatus={setStatus}
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






