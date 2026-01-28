import { useState, useEffect, useCallback } from "react";
import { MdKeyboardArrowRight } from "react-icons/md";
import DashboardLayout from "../Component/dashboardlatout/DashboardLayout";
import DeleteFormModal from "../Component/wardboys/DeleteFormModal";
import WardFormModal from "../Component/wardboys/WardFormModal";
import {
  getWardboys,
  createWardboy,
  updateWardboy,
  deleteWardboy,
} from "../services/wardboy.services";
import { useFormModal } from "../Component/modal/useFormModal";
import { WardBoyType } from "../types/wardboy";
import Pagination from "../Component/formModal/Pagination";
import usePagination from "../Component/modal/usePagination";
import Table from "../Component/Common/Table";
import { wardboyColumns } from "../Component/Common/TableColumns";

function WardBoys() {
  const [search, setSearch] = useState("");
  const [deleted, setDeleted] = useState(false);
  const [wardBoys, setWardBoys] = useState([]);
  const { page, setPage, totalPages, setTotalPages } = usePagination(1, 1);
  const { isOpen, editId, formData, handleChange, openAdd, openEdit, close } =
    useFormModal(WardBoyType);

  const fetchWardBoys = useCallback(
    async (pageNumber = page) => {
      try {
        const res = await getWardboys(pageNumber, 10);
        setWardBoys(res.data.wardBoys);
        setTotalPages(res.data.totalPages);
      } catch (err) {
        console.error(err);
      }
    },
    [page, setTotalPages],
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await updateWardboy(editId, formData);
      } else {
        await createWardboy(formData);
      }
      fetchWardBoys(page);
      close();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteWardboy(deleted);
      fetchWardBoys(page);
      setDeleted(null);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const res = await getWardboys(page, 10);
        setWardBoys(res.data.wardBoys);
        setTotalPages(res.data.totalPages);
      } catch (err) {
        console.error(err);
      }
    })();
  }, [page, setTotalPages]);

  const filteredwardb = wardBoys.filter(
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
            Doctors
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
          columns={wardboyColumns}
          data={filteredwardb}
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
          page={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />

        {isOpen && (
          <WardFormModal
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

export default WardBoys;
