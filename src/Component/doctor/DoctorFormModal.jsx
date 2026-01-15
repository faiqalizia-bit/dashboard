function DoctorFormModal({
  name,
  email,
  setName,
  setEmail,
  editId,
  onClose,
  onSubmit,
  status,//
  setStatus,//
  loading,

}) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-5 rounded w-[350px]">
        <div className="flex justify-between mb-4">
          <h2 className="font-bold">{editId ? "Edit Doctor" : "Add Doctor"}</h2>
          <button onClick={onClose}
            className="text-primary font-bold text-lg hover:text-red-500"
          >x</button>
        </div>

        <form onSubmit={onSubmit} className="flex flex-col gap-3">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            required
            className="border p-2 rounded"
          />
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
            className="border p-2 rounded"
          />
          {/* kucjh */}
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            required
            className="border p-2 rounded"
          >
            <option value="">Select Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>

          <div className="flex justify-end gap-2">
            <button type="button" onClick={onClose} className="bg-primary text-white px-3 py-1 rounded">
              Cancel
            </button>
            <button className="bg-primary text-white px-4 py-1 rounded">
              {loading ? "Processing.." :  editId ? "Update" : "Add"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default DoctorFormModal;