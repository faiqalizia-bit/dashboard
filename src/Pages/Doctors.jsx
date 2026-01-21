import DashboardLayout from "../Component/dashboardlatout/DashboardLayout";
import { useState, useEffect } from "react";
import { MdKeyboardArrowRight } from "react-icons/md";
import CreateDoctor from "../Component/doctor/Create"
import DeleteDoctorModal from "../Component/doctor/Delete";
import { useFormModal } from "../Component/modal/useFormModal";
import DoctorsTable from "../Component/doctor/List";
import { getDoctors, createDoctor, deleteDoctor, updateDoctor } from "../services/doctor.services"
import { DoctorType } from "../types/doctors";

function Doctors() {
  const [search, setSearch] = useState("");
  const [deleted, setDeleted] = useState(false)
  const [doctors, setDoctors] = useState([]);
  const {
    isOpen,
    editId,
    formData,
    handleChange,
    openAdd,
    openEdit,
    close,
  } = useFormModal(DoctorType)

  const fetchDoctors = async () => {
    try {
      const res = await getDoctors()
      setDoctors(res.data);
    } catch (err) {
      console.error(err);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editId) {
      await updateDoctor(editId, formData);
    } else {
      await createDoctor(formData);
    }

    fetchDoctors();
    close();
  };

  const handleDelete = async () => {
    try {
      await deleteDoctor(deleted);
      fetchDoctors();
      setDeleted(null);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchDoctors();

  }, []);

  const filteredDoctors = doctors.filter(
    (doc) =>
      doc.name.toLowerCase().includes(search.toLowerCase()) ||
      doc.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <DashboardLayout>
      <div className="mb-10 relative py-2">
        <h1 className="text-lg font-bold mb-4"> <div className="flex gap-[1px] items-center">Dashboard<span className="mt-[2px]"><MdKeyboardArrowRight /> </span>Doctors</div></h1>

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
            className="bg-primary text-neutral  px-8 rounded"
          >
            Add
          </button>
        </div>
        <DoctorsTable
          doctors={filteredDoctors}
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
          <CreateDoctor
            formData={formData}
            handleChange={handleChange}
            editId={editId}
            onClose={close}
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







