import DashboardLayout from "../Component/dashboardlatout/DashboardLayout"
import { useState, useEffect } from "react"
import { MdKeyboardArrowRight } from "react-icons/md";
import PatientFormModal from "../Component/patients/PatientFormModal";
import DeletePatientModal from "../Component/patients/DeletePaitientModal";
import PatientsTable from "../Component/patients/PatientsTable";
import API from "../api";
import { useFormModal } from "../Component/modal/useFormModal";
import { PatientType } from "../types/patient";

function Patients() {
    const [search, setSearch] = useState("")
    const [deleted, setDeleted] = useState(false)
    const [patients, setPatients] = useState([]);

const {
    isOpen,
    editId,
    formData,
    handleChange,
    openAdd,
    openEdit,
    close,
  } = useFormModal(PatientType)

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
                const res = await API.put(`/patients/${editId}`, formData);
            } else {
                const res = await API.post("/patients", formData);
            }
            fetchPatients();
            close();
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


    useEffect(() => {
        fetchPatients()

    }, []);


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
                        onClick={openAdd}
                        className="text-neutral bg-primary px-8 rounded"
                    >
                        Add
                    </button>
                </div>


                <PatientsTable
                    patients={filteredpatients}
                    onEdit={(doc) =>
                        openEdit(doc._id, {
                            name: doc.name,
                            email: doc.email,
                            status: doc.status,
                        })
                    }
                    onDelete={(id) => setDeleted(id)}
                />

                {isOpen && (
                    <PatientFormModal
                        formData={formData}
                        handleChange={handleChange}
                        editId={editId}
                        onClose={close}
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






