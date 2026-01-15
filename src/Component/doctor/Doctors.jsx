import DashboardLayout from "../dashboardlatout/DashboardLayout";
import { useState, useEffect } from "react";
import { AiTwotoneDelete } from "react-icons/ai";
import { MdOutlineModeEditOutline } from "react-icons/md"
import { MdKeyboardArrowRight } from "react-icons/md";
import DoctorFormModal from "./DoctorFormModal";
import DeleteDoctorModal from "./DeleteDoctorModal";
import DoctorsTable from "./DoctorsTable";
import API from "../../api";

function Doctors() {
  const [search, setSearch] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [editId, setEditId] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [deleted, setDeleted] = useState(false)
  const [status, setStatus] = useState("");
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchDoctors = async () => {
    try {
      const res = await API.get("doctors");
      setDoctors(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let response;
    try {
      setLoading(true)
      if (editId) {
        response = await API.put(`/doctors/${editId}`, { name, email, status });
      } else {
        response = await API.post("/doctors", { name, email, status });
      }
      if (response) {
        fetchDoctors();
        setLoading(false)
      }
      closePopup();
    } catch (err) {
      console.error(err);
      setLoading(false)
    }
  };


  const handleDelete = async () => {
    try {
      await API.delete(`/doctors/${deleted}`);
      fetchDoctors();
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
    fetchDoctors();

  }, []);

  const editDr = (doctor) => {
    setEditId(doctor._id);
    setName(doctor.name);
    setEmail(doctor.email);
    setStatus(doctor.status);
    setShowPopup(true);//
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
            onClick={() => setShowPopup(true)}
            className="bg-primary text-neutral  px-8 rounded"
          >
            Add
          </button>
        </div>


        <DoctorsTable
          doctors={filteredDoctors}
          onEdit={editDr}
          onDelete={confirmDeleteDoctor}
        />
        {showPopup && (
          <DoctorFormModal
            name={name}
            email={email}
            setName={setName}
            setEmail={setEmail}
            editId={editId}
            onClose={closePopup}
            onSubmit={handleSubmit}
            status={status}//
            setStatus={setStatus}
            loading={loading}
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







