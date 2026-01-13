import { AiTwotoneDelete } from "react-icons/ai";
import { MdOutlineModeEditOutline } from "react-icons/md";

function WardTable({ wardBoys, onEdit, onDelete, showActions="true" }) {
  return (
   <div className="bg-white rounded shadow overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2">Name</th>
              <th className="border p-2">Email</th>
              {showActions &&(<th className="border p-2">Actions</th>)}
              <th className="border p-2">Status</th>
            </tr>
          </thead>
  
          <tbody>
              {wardBoys.length === 0 ? (
                        <tr>
                            <td colSpan="4" className="text-center p-4">
                                No data found
                            </td>
                        </tr>
                    ) : (
                       wardBoys.map((item) => (
                            <tr key={item.id} className="bg-neutral">
                                <td className="border p-2">{item.name}</td>
                                <td className="border p-2">{item.email}</td>
                                <td className="border p-2 space-x-2">
                                    <button
                                        onClick={() => onEdit(item)}
                                        className="px-3 py-1 text-secondary"
                                    >
                                        <MdOutlineModeEditOutline />
                                    </button>

                                    <button
                                        onClick={() => onDelete(item.id)}
                                        className="px-3 py-1 text-black"
                                    >
                                        <AiTwotoneDelete />
                                    </button>
                                </td>
                                <td className="border p-2">{item.status}</td>
                            </tr>
                        ))
                    )}
          </tbody>
        </table>
      </div>
  )
}

export default WardTable