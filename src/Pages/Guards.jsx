import { useState, useEffect } from "react";
import { MdKeyboardArrowRight } from "react-icons/md";
import DashboardLayout from '../Component/dashboardlatout/DashboardLayout'
import GuardsTable from '../Component/gaurds/GuardsTable';
import GuardsFormModal from '../Component/gaurds/GuardsFormModal';
import GuardDeleteModal from '../Component/gaurds/GuardDeleteModal';
import API from '../api';
import { useFormModal } from '../Component/modal/useFormModal';
import { GuardType } from "../types/Guard";

function Guards() {
    const [search, setSearch] = useState("");
    const [deleted, setDeleted] = useState(false)
    const [guard, setGuard] = useState([]);

  
    const {
        isOpen,
        editId,
        formData,
        handleChange,
        openAdd,
        openEdit,
        close,
    } = useFormModal(GuardType)


    const fetchGuards = async () => {
        try {
            const res = await API.get("guards");
            setGuard(res.data);
        }
        catch (err) {
            console.error(err);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editId) {
                const res = await API.put(`/guards/${editId}`, formData);
            } else {
                const res = await API.post("/guards", formData);
            }
            fetchGuards();
            close();
        } catch (err) {
            console.error(err);
        }
    };

    const handleDelete = async () => {
        try {
            await API.delete(`/guards/${deleted}`);
            fetchGuards();
            setDeleted(null);
        } catch (err) {
            console.error(err);
        }
    };




    // const closePopup = () => {
    //     setShowPopup(false);
    //     setEditId(null);
    //     setName("");
    //     setEmail("");
    //     setStatus("");//
    // };

    useEffect(() => {

        fetchGuards();
    }, []);

    // const editDr = (w) => {
    //     setEditId(w._id);
    //     setName(w.name);
    //     setEmail(w.email);
    //     setShowPopup(true);//
    //     setStatus(w.status);
    // };

    // const delDr = (id) => {
    //     setGuard((prevDoctors) =>
    //         prevDoctors.filter((doctor) => doctor.id !== id)
    //     );
    // };

    const filteredGuards = guard.filter(
        (doc) =>
            doc.name.toLowerCase().includes(search.toLowerCase()) ||
            doc.email.toLowerCase().includes(search.toLowerCase())
    );
    // const confirmDeleteDoctor = (id) => {
    //     setDeleted(id);
    // };


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
                        onClick={openAdd}
                        className="bg-primary text-neutral  px-8 rounded"
                    >
                        Add
                    </button>
                </div>

                <GuardsTable
                    guard={filteredGuards}
                    onEdit={(doc) =>
                        openEdit(doc._id, {
                            name: doc.name,
                            email: doc.email,
                            status: doc.status,
                        })
                    }
                    onDelete={(id) => setDeleted(id)}
                />

                {isOpen && (<GuardsFormModal
                    formData={formData}
                    handleChange={handleChange}
                    editId={editId}
                    onClose={close}
                    onSubmit={handleSubmit}
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