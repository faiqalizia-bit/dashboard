import { useState,useEffect } from "react";
import { MdKeyboardArrowRight } from "react-icons/md";
import DashboardLayout from "../dashboardlatout/DashboardLayout";
import DeleteFormModal from "./DeleteFormModal";
import WardFormModal from "./WardFormModal";
import WardTable from "./WardTable";
import API from "../../api";

function WardBoys() {
    const [search, setSearch] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [editId, setEditId] = useState(null);
    const [showPopup, setShowPopup] = useState(false);
    const [deleted, setDeleted] = useState(false)
    const [status, setStatus] = useState("");

    const [wardBoys, setWardBoys] = useState([])


    const fetchWardBoys = async () => {
  try {
    const res = await API.get("wardboys");
    setWardBoys(res.data);
  } catch (err) {
    console.error(err);
  }
};


const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    if (editId) {
      const res = await API.put(`/wardboys/${editId}`, { name, email, status });
    } else {
      const res = await API.post("/wardboys", { name, email, status });
    }
    fetchWardBoys();
    closePopup();
  } catch (err) {
    console.error(err);
  }
};


const handleDelete = async () => {
  try {
    await API.delete(`/wardboys/${deleted}`);
    fetchWardBoys();
    setDeleted(null);
  } catch (err) {
    console.error(err);
  }
};





    //     () => {
    //     try {
    //         return JSON.parse(localStorage.getItem("wardboys")) || [];
    //     } catch {
    //         return [];
    //     }
    // });

    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     const newWardboy = {
    //         id: Date.now(),
    //         name,
    //         email,
    //         status,//
    //     };
    //     if (editId) {
    //         setWardBoys((prev) =>
    //             prev.map((w) =>
    //                 w.id === editId ? { ...w, name, email, status } : w
    //             )
    //         );
    //     } else {
    //         setWardBoys((prev) => [...prev, newWardboy]);
    //     }
    //     closePopup();
    // };

    const closePopup = () => {
        setShowPopup(false);
        setEditId(null);
        setName("");
        setEmail("");
        setStatus("");//
    };

    useEffect(() => {
        fetchWardBoys();
        // try {
        //     localStorage.setItem("wardboys", JSON.stringify(wardBoys));
        // } catch (e) {
        //     console.error("Failed to save WardBoys to localStorage", e);
        // }
    }, []);

    const editDr = (w) => {
        setEditId(w._id);
        setName(w.name);
        setEmail(w.email);
        setShowPopup(true);//
        setStatus(w.status);
    };

    const delDr = (id) => {
        setWardBoys((prevDoctors) =>
            prevDoctors.filter((doctor) => doctor.id !== id)
        );
    };

    const filteredwardb = wardBoys.filter(
        (doc) =>
            doc.name.toLowerCase().includes(search.toLowerCase()) ||
            doc.email.toLowerCase().includes(search.toLowerCase())
    );
    const confirmDeleteDoctor = (id) => {
        setDeleted(id);
    };

    // const handleDelete = () => {
    //     setWardBoys((prev) => prev.filter((n) => n.id !== deleted));
    //     setDeleted(null);
    // };

    // const cancelDelete = () => setDeleted(null);

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

                <WardTable
                    wardBoys={filteredwardb}
                    onEdit={editDr}
                    onDelete={confirmDeleteDoctor}
                />

                {showPopup && (<WardFormModal
                    name={name}
                    email={email}
                    setName={setName}
                    setEmail={setEmail}
                    editId={editId}
                    onClose={closePopup}
                    onSubmit={handleSubmit}
                    status={status}
                    setStatus={setStatus}
                />)}

               {deleted &&( <DeleteFormModal
                    onCancel={() => setDeleted(null)}
                    onDelete={handleDelete}
                />
               )}

            </div>
        </DashboardLayout>
    )
}

export default WardBoys