import DashboardLayout from '../Component/dashboardlatout/DashboardLayout'
import DepartmentTable from '../Component/deaprtments/DepartmentTable';
import { useState, useEffect } from "react";
import { MdKeyboardArrowRight } from "react-icons/md";
import DeleteFormModal from '../Component/deaprtments/DeleteFormModal';
import DepartmentFormModal from '../Component/deaprtments/departmentFormModal';
import API from '../api';
import { useFormModal } from '../Component/modal/useFormModal';
import { DepartmentType } from '../types/department';

function Department() {
    const [search, setSearch] = useState("");
    const [deleted, setDeleted] = useState(false)
    const [department, setDepartment] = useState([])
  
    const {
        isOpen,
        editId,
        formData,
        handleChange,
        openAdd,
        openEdit,
        close,
    } = useFormModal(DepartmentType)

    const fetchDepartments = async () => {
        try {
            const res = await API.get("departments");
            setDepartment(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editId) {
                const res = await API.put(`/departments/${editId}`, formData);
                console.log("🚀 ~ handleSubmit ~ res:", res)
            } else {
                const res = await API.post("/departments", formData);
                console.log("🚀 ~ handleSubmit ~ res:", res)
            }
            fetchDepartments();
            close();
        } catch (err) {
            console.error(err);
        }
    };
    const handleDelete = async () => {
        try {
            await API.delete(`/departments/${deleted}`);
            fetchDepartments();
            setDeleted(null);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchDepartments()
    }, []);

    const filteredDepart = department.filter(
        (doc) =>
            doc.name.toLowerCase().includes(search.toLowerCase()) ||
            doc.email.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <DashboardLayout>
            <div className="mb-10 relative py-2">
                <h1 className="text-lg font-bold mb-4"> <div className="flex gap-[1px] items-center">Dashboard<span className="mt-[2px]"><MdKeyboardArrowRight /> </span>Department</div></h1>

                <div className="flex gap-3 mb-5">
                    <input
                        type="text"
                        placeholder="Search..."
                        className="border p-2 rounded w-full"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <button onClick={openAdd} className="bg-primary text-neutral  px-8 rounded" >  Add</button>
                </div>
                <DepartmentTable
                    department={filteredDepart}
                    onEdit={(doc) =>
                        openEdit(doc._id, {
                            name: doc.name,
                            email: doc.email,
                            status: doc.status,
                        })
                    }
                    onDelete={(id) => setDeleted(id)}
                />
                {isOpen && (<DepartmentFormModal
                    formData={formData}
                    handleChange={handleChange}
                    editId={editId}
                    onClose={close}
                    onSubmit={handleSubmit}
                />
                )}
                {deleted && (<DeleteFormModal
                    onCancel={() => setDeleted(null)}
                    onDelete={handleDelete}
                />
                )}
            </div>
        </DashboardLayout>

    )
}

export default Department