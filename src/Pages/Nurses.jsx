import { useEffect, useState } from "react";
import DashboardLayout from "../Component/dashboardlatout/DashboardLayout";
import { MdKeyboardArrowRight } from "react-icons/md";
import NursesTable from "../Component/nurses/NursesTable";
import DeleteNurseModal from "../Component/nurses/DeleteNurseModal";
import { useFormModal } from "../Component/modal/useFormModal";
import CreateNurse from "../Component/nurses/NusrseFormModal";
import {
  getNurses,
  createNurse,
  updateNurse,
  deleteNurse,
} from "../services/nurses.services";
import { NurseType } from "../types/nurses";
import Pagination from "../Component/formModal/Pagination";
import usePagination from "../Component/modal/usePagination";

function Nurses() {
  const [nurses, setNurses] = useState([]);
  const [search, setSearch] = useState("");
  const [deleted, setDeleted] = useState(null);
  const { page, setPage, totalPages, setTotalPages } = usePagination(1,1); 
  const { isOpen, editId, formData, handleChange, openAdd, openEdit, close } =
    useFormModal(NurseType);

  const fetchNurses = async (pageNumber = page) => {
    const res = await getNurses(pageNumber, 10);
    setNurses(res.data.nurses);
    setTotalPages(res.data.totalPages)
  };

  useEffect(() => {
    fetchNurses(page);
  }, [page]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editId) {
      await updateNurse(editId, formData);
    } else {
      await createNurse(formData);
    }

    fetchNurses(page);
    close();
  };

  const handleDelete = async () => {
    await deleteNurse(deleted);
    fetchNurses(page);
    setDeleted(null);
  };

  const filteredNurses = nurses.filter(
    (n) =>
      n.name.toLowerCase().includes(search.toLowerCase()) ||
      n.email.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <DashboardLayout>
      <h1 className="text-lg font-bold mb-4 flex items-center gap-1">
        Dashboard <MdKeyboardArrowRight /> Nurses
      </h1>

      <div className="flex gap-3 mb-5">
        <input
          placeholder="Search..."
          className="border p-2 rounded w-full"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <button
          onClick={openAdd}
          className="bg-primary text-white px-8 rounded"
        >
          Add
        </button>
      </div>

      <NursesTable
        nurses={filteredNurses}
        onEdit={(nurse) =>
          openEdit(nurse._id, {
            name: nurse.name,
            email: nurse.email,
            status: nurse.status,
          })
        }
        onDelete={(id) => setDeleted(id)}
      />

      <Pagination
      onPageChange={setPage}
      page={page}
      totalPages={totalPages}/>

      {isOpen && (
        <CreateNurse
          formData={formData}
          handleChange={handleChange}
          editId={editId}
          onClose={close}
          onSubmit={handleSubmit}
        />
      )}

      {deleted && (
        <DeleteNurseModal
          onCancel={() => setDeleted(null)}
          onDelete={handleDelete}
        />
      )}
    </DashboardLayout>
  );
}

export default Nurses;