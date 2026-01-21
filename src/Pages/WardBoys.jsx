import { useState, useEffect } from "react";
import { MdKeyboardArrowRight } from "react-icons/md";
import DashboardLayout from "../Component/dashboardlatout/DashboardLayout";
import DeleteFormModal from "../Component/wardboys/DeleteFormModal";
import WardFormModal from "../Component/wardboys/WardFormModal";
import WardTable from "../Component/wardboys/WardTable";
import API from "../api";
import { useFormModal } from "../Component/modal/useFormModal";
import { WardBoyType } from "../types/wardboy";

function WardBoys() {
    const [search, setSearch] = useState("");
    const [deleted, setDeleted] = useState(false)
    const [wardBoys, setWardBoys] = useState([])

   
    const {
        isOpen,
        editId,
        formData,
        handleChange,
        openAdd,
        openEdit,
        close,
    } = useFormModal(WardBoyType)



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
                const res = await API.put(`/wardboys/${editId}`, formData);
            } else {
                const res = await API.post("/wardboys", formData);
            }
            fetchWardBoys();
            close();
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
    }

   

    useEffect(() => {
        fetchWardBoys();
    }, []);

  

    const filteredwardb = wardBoys.filter(
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

                <WardTable
                    wardBoys={filteredwardb}
                    onEdit={(doc) =>
                        openEdit(doc._id, {
                            name: doc.name,
                            email: doc.email,
                            status: doc.status,
                        })
                    }
                    onDelete={(id) => setDeleted(id)}
                />

                {isOpen && (<WardFormModal
                    formData={formData}
                    handleChange={handleChange}
                    editId={editId}
                    onClose={close}
                    onSubmit={handleSubmit}
                />)}

                {deleted && (<DeleteFormModal
                    onCancel={() => setDeleted(null)}
                    onDelete={handleDelete}
                />
                )}

            </div>
        </DashboardLayout>
    )
}

export default WardBoys