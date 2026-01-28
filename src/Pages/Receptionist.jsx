import { useEffect, useState } from "react";
import { MdKeyboardArrowRight } from "react-icons/md";
import DashboardLayout from "../Component/dashboardlatout/DashboardLayout";
import {
  createReceptionist,
  deleteReceptionist,
  getReceptionists,
  updateReceptionist,
} from "../services/receptionist.services";
import usePagination from "../Component/modal/usePagination";
import { receptionistColumns } from "../Component/Common/TableColumns";
import { useFormModal } from "../Component/modal/useFormModal";
import { ReceptionistType } from "../types/receptionist";
import Table from "../Component/Common/Table";
import DeleteReceptionist from "../Component/receptionist/DeleteReceptionist";
import CreateReceptionist from "../Component/receptionist/create";
import Pagination from "../Component/formModal/Pagination";

function Receptionist() {
  const [search, setSearch] = useState("");
  const [deleted, setDeleted] = useState(false);
  const [receptionist, setReceptionist] = useState([]);
  const { page, setPage, totalPages, setTotalPages } = usePagination(1, 1);

  const { isOpen, editId, formData, handleChange, openAdd, openEdit, close } =
    useFormModal(ReceptionistType);

  const fetchReceptionists = async (pageNumber = page) => {
    try {
      const res = await getReceptionists(pageNumber, 10);
      setReceptionist(res.data.receptionists);
      setTotalPages(res.data.totalPages);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        const res = await updateReceptionist(editId, formData);
        console.log("🚀 ~ handleSubmit ~ res:", res);
      } else {
        const res = await createReceptionist(formData);
        console.log("🚀 ~ handleSubmit ~ res:", res);
      }
      fetchReceptionists(page);
      close();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteReceptionist(deleted);
      fetchReceptionists(page);
      setDeleted(null);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const res = await getReceptionists(page, 10);
        setReceptionist(res.data.receptionists);
        setTotalPages(res.data.totalPages);
      } catch (err) {
        console.error(err);
      }
    })();
  }, [page, setTotalPages]);

  const filteredReceptionist = receptionist.filter(
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
            Receptionists
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
          columns={receptionistColumns}
          data={filteredReceptionist}
          onEdit={(doc) =>
            openEdit(doc._id, {
              name: doc.name,
              email: doc.email,
              role: doc.role,
              status: doc.status,
            })
          }
          onDelete={(id) => setDeleted(id)}
        />
        <Pagination
        page={page} totalPages={totalPages} onPageChange={setPage}
        />
        {isOpen && (
          <CreateReceptionist
            formData={formData}
            handleChange={handleChange}
            editId={editId}
            onClose={close}
            onSubmit={handleSubmit}
          />
        )}

        {deleted && (
          <DeleteReceptionist
            onCancel={() => setDeleted(null)}
            onDelete={handleDelete}
          />
        )}
      </div>
    </DashboardLayout>
  );
}

export default Receptionist;
