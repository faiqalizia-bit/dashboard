import { AiTwotoneDelete } from "react-icons/ai";
import { MdOutlineModeEditOutline } from "react-icons/md";

function NursesTable({nurses, onEdit, onDelete}) {
    return (
        <div className="bg-white rounded shadow overflow-x-auto">
            <table className="w-full text-left border-collapse">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="border p-2">Name</th>
                        <th className="border p-2">Email</th>
                        <th className="border p-2">Status</th>
                        <th className="border p-2">Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {nurses.length === 0 ? (
                        <tr>
                            <td colSpan="4" className="text-center p-4">
                                No data found
                            </td>
                        </tr>
                    ) : (
                        nurses.map((nun) => (
                            <tr key={nun._id} className="bg-neutral">
                                <td className="border p-2">{nun.name}</td>
                                <td className="border p-2">{nun.email}</td>
                                  <td className="border p-2">{nun.status}</td>
                                <td className="border p-2 space-x-2">
                                    <button
                                        onClick={() => onEdit(nun)}
                                        className="px-3 py-1 text-secondary"
                                    >
                                        <MdOutlineModeEditOutline />
                                    </button>

                                    <button
                                        onClick={() => onDelete(nun._id)}
                                        className="px-3 py-1 text-black"
                                    >
                                        <AiTwotoneDelete />
                                    </button>
                                </td>
                              
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default NursesTable