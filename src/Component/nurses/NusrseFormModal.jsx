import CustomModal from "../formModal/CustomModal";
function CreateNurse({
  formData,
  handleChange,
  editId,
  onClose,
  onSubmit,
}) {
  return (
    <div>
      <CustomModal
        title="Add Nurse"
        editTitle="Edit Nurse"
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
    </div>
  );
}

export default CreateNurse;























// function NurseFormModal({
//   name,
//   email,
//   setName,
//   setEmail,
//   editId,
//   onClose,
//   onSubmit,
//   status,//
//   setStatus,//
// }) {
//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
//       <div className="bg-white p-5 rounded w-[350px]">
//         <div className="flex justify-between mb-4">
//           <h2 className="font-bold">{editId ? "Edit Nurse" : "Add Nurse"}</h2>
//           <button onClick={onClose}
//            className="text-primary font-bold text-lg hover:text-red-500"
//           >x</button>
//         </div>

//         <form onSubmit={onSubmit} className="flex flex-col gap-3">
//           <input
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             placeholder="Name"
//             required
//             className="border p-2 rounded"
//           />
//           <input
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             placeholder="Email"
//             required
//             className="border p-2 rounded"
//           />
           
//            <select
//             value={status}
//             onChange={(e) => setStatus(e.target.value)}
//             required
//             className="border p-2 rounded"
//           >
//             <option value="">Select Status</option>
//             <option value="Active">Active</option>
//             <option value="Inactive">Inactive</option>
//           </select>

//           <div className="flex justify-end gap-2">
//             <button type="button" onClick={onClose} className="bg-primary text-white px-3 py-1 rounded">
//               Cancel
//             </button>
//             <button className="bg-primary text-white px-4 py-1 rounded">
//               {editId ? "Save" : "Add"}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default NurseFormModal;