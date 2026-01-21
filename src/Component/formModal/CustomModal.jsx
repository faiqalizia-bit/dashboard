import { RxCross2 } from "react-icons/rx";

function CustomModal({ editId, title, editTitle, onClose, children }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-5 rounded w-[350px]">
        <div className="flex justify-between mb-4">
          <h2 className="font-bold text-xl">{editId ? editTitle : title}</h2>
          <button onClick={onClose} 
           className="text-primary font-semibold text-lg hover:text-white p-2 rounded-md hover:bg-red-500">
            <RxCross2 />
          </button>
        </div>
        <div className="text-center" >
        {children}
        </div>
      </div>
    </div>
  );
}

export default CustomModal;
