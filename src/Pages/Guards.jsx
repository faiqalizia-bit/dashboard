import { useState, useEffect } from "react";
import { MdKeyboardArrowRight } from "react-icons/md";
import DashboardLayout from "../Component/dashboardlatout/DashboardLayout";
import GuardsFormModal from "../Component/gaurds/GuardsFormModal";
import GuardDeleteModal from "../Component/gaurds/GuardDeleteModal";
import {
  getGuards,
  updateGuard,
  createGuard,
  deleteGuard,
} from "../services/guard.servcies";
import { useFormModal } from "../Component/modal/useFormModal";
import { GuardType } from "../types/Guard";
import usePagination from "../Component/modal/usePagination";
import Pagination from "../Component/formModal/Pagination";
import { guardColumns } from "../Component/Common/TableColumns";
import Table from "../Component/Common/Table";

function Guards() {            
  const [search, setSearch] = useState("");
  const [deleted, setDeleted] = useState(false);
  const [guard, setGuard] = useState([]);
  const { page, setPage, totalPages, setTotalPages } = usePagination(1,1);

  const { isOpen, editId, formData, handleChange, openAdd, openEdit, close } =
    useFormModal(GuardType);

  const fetchGuards = async (pageNumber =page) => {
    try {
      const res = await getGuards(pageNumber, 10);
      setGuard(res.data.guards);
      setTotalPages(res.data.totalPages)
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        const res = await updateGuard(editId, formData);
        console.log("🚀 ~ handleSubmit ~ res:", res)
      } else {
        const res = await createGuard(formData);
        console.log("🚀 ~ handleSubmit ~ res:", res)
      }
      fetchGuards(page);
      close();
    } catch (err) {
      console.error(err);
    }
  }; 

  const handleDelete = async () => {
    try {
      await deleteGuard(deleted);
      fetchGuards(page);
      setDeleted(null);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchGuards(page);
  }, [page]);

  const filteredGuards = guard.filter(
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
            Guards
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
            Add
          </button>
        </div>

        <Table
          columns={guardColumns}
          data={filteredGuards}
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
          <GuardsFormModal
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
  );
}

export default Guards;
