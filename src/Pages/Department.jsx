import DashboardLayout from "../Component/dashboardlatout/DashboardLayout";
import DepartmentTable from "../Component/deaprtments/DepartmentTable";
import { useState, useEffect } from "react";
import { MdKeyboardArrowRight } from "react-icons/md";
import DeleteFormModal from "../Component/deaprtments/DeleteFormModal";
import DepartmentFormModal from "../Component/deaprtments/departmentFormModal";
import {
  getDepartments,
  createDepartment,
  updateDepartment,
  deleteDepartment,
} from "../services/department.services";
import { useFormModal } from "../Component/modal/useFormModal";
import { DepartmentType } from "../types/department";
import usePagination from "../Component/modal/usePagination";
import Pagination from "../Component/formModal/Pagination";
import Table from "../Component/Common/Table";
import { departmentColumns } from "../Component/Common/TableColumns";

function Department() {
  const [search, setSearch] = useState("");
  const [deleted, setDeleted] = useState(false);
  const [department, setDepartment] = useState([]);
  const { page, setPage, totalPages, setTotalPages } = usePagination(1,1);

  const { isOpen, editId, formData, handleChange, openAdd, openEdit, close } =
    useFormModal(DepartmentType);

  const fetchDepartments = async (pageNumber = page) => {
    try {
      const res = await getDepartments(pageNumber, 10);
      setDepartment(res.data.departments);
      setTotalPages(res.data.totalPages)
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        const res = await updateDepartment(editId, formData);
        console.log("🚀 ~ handleSubmit ~ res:", res);
      } else {
        const res = await createDepartment(formData);
        console.log("🚀 ~ handleSubmit ~ res:", res);
      }
      fetchDepartments(page);
      close();
    } catch (err) {
      console.error(err);
    }
  };
  const handleDelete = async () => {
    try {
      await deleteDepartment(deleted);
      fetchDepartments(page);
      setDeleted(null);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchDepartments(page);
  }, [page]);

  const filteredDepart = department.filter(
    (doc) =>
      doc.name.toLowerCase().includes(search.toLowerCase()) ||
      doc.email.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <DashboardLayout>
      <div className="mb-10 relative py-2">
        <h1 className="text-lg font-bold mb-4">
          {" "}
          <div className="flex gap-[1px] items-center">
            Dashboard
            <span className="mt-[2px]">
              <MdKeyboardArrowRight />{" "}
            </span>
            Department
          </div>
        </h1>

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
            {" "}
            Add
          </button>
        </div>
        <Table
         columns={departmentColumns}
          data={filteredDepart}
          onEdit={(doc) =>
            openEdit(doc._id, {
              name: doc.name,
              email: doc.email,
              status: doc.status,
            })
          }
          onDelete={(id) => setDeleted(id)}
        />
        <Pagination
        page={page} totalPages={totalPages} onPageChange={setPage}
        />
        {isOpen && (
          <DepartmentFormModal
            formData={formData}
            handleChange={handleChange}
            editId={editId}
            onClose={close}
            onSubmit={handleSubmit}
          />
        )}
        {deleted && (
          <DeleteFormModal
            onCancel={() => setDeleted(null)}
            onDelete={handleDelete}
          />
        )}
      </div>
    </DashboardLayout>
  );
}

export default Department;
