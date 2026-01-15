import React from 'react'
import { AiTwotoneDelete } from "react-icons/ai";
import { MdOutlineModeEditOutline } from "react-icons/md";

function PatientsTable({ patients, onEdit, onDelete, show = "true" }) {
    return (
        <div className="bg-white rounded shadow overflow-x-auto">
            <table className="w-full text-left border-collapse">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="border p-2">Name</th>
                        <th className="border p-2">Email</th>
                        {show && (<th className="border p-2">Actions</th>)}
                        <th className="border p-2">Status</th>
                    </tr>
                </thead>

                <tbody>
                    {patients.length === 0 ? (
                        <tr>
                            <td colSpan="4" className="text-center p-4">
                                No data found
                            </td>
                        </tr>
                    ) : (
                        patients.map((p) => (
                            <tr key={p._id} className="text-left bg-neutral">
                                <td className="border p-2">{p.name}</td>
                                <td className="border p-2">{p.email}</td>
                                {show && (<td className="border p-2 space-x-2">
                                    <button
                                        onClick={() => onEdit(p)}
                                        className=" px-3 py-1 rounded text-secondary"
                                    >
                                        <MdOutlineModeEditOutline />
                                    </button>
                                    <button
                                        onClick={() => onDelete(p._id)}
                                        className=" px-3 py-1 rounded text-secondary"
                                    >
                                        <AiTwotoneDelete />
                                    </button>
                                </td>
                                )}
                                <td className="border p-2">{p.status}</td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default PatientsTable