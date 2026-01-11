function DeletePatientModal({ onCancel, onDelete }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-5 rounded w-[300px] text-center relative">
        <button
          onClick={onCancel}
          className="absolute top-2 right-2"
        >
          x
        </button>

        <h2 className="font-bold mb-3">Confirm Delete</h2>
        <p className="mb-4">Are you sure you want to delete?</p>

        <div className="flex justify-center gap-2">
          <button onClick={onCancel} className="px-3 py-1  rounded bg-gray-400 text-neutral">Cancel</button>
          <button onClick={onDelete} className="px-3 py-1  rounded bg-primary text-neutral" >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeletePatientModal;