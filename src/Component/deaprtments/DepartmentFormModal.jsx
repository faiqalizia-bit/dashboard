import CustomModal from "../formModal/CustomModal"

function DepartmentFormModal({
formData,
  handleChange,
  editId,
  onClose,
  onSubmit,

  
}) {
  return (
    <CustomModal
        title="Add Doctor"
        editTitle="Edit Doctor"
        editId={editId}
        onClose={onClose}
        onSubmit={onSubmit}
      >
        <form onSubmit={onSubmit} className="flex flex-col gap-3">
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Name"
            required
            className="border p-2 rounded"
          />

          <input
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            required
            className="border p-2 rounded"
          />

          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            required
            className="border p-2 rounded"
          >
            <option value="">Select Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="bg-primary text-white px-3 py-1 rounded"
            >
              Cancel
            </button>
            <button className="bg-primary text-white px-4 py-1 rounded">
              {editId ? "Save" : "Add"}
            </button>
          </div>
        </form>

      </CustomModal>
    
  )
}

export default DepartmentFormModal