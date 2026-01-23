import React from 'react'
import { AiTwotoneDelete } from "react-icons/ai";
import { MdOutlineModeEditOutline } from "react-icons/md";
import StatusBadge from '../satuscolor/StatusBadge';
import NoDataRow from '../Common/nodata';

function PatientsTable({ patients, onEdit, onDelete, show = "true" }) {
    return (
        <div className="bg-white rounded shadow overflow-x-auto">
            <table className="w-full text-left border-collapse">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="border p-2">Name</th>
                        <th className="border p-2">Email</th>
                        <th className="border p-2">Status</th>
                        {show && (<th className="border p-2">Actions</th>)}
                        
                    </tr>
                </thead>

                <tbody>
                    {patients.length === 0 ? (
                        <NoDataRow/>
                    ) : (
                        patients.map((p) => (
                            <tr key={p._id} className="text-left bg-neutral">
                                <td className="border p-2">{p.name}</td>
                                <td className="border p-2">{p.email}</td>
                                <td className="border p-2"><StatusBadge status={p.status}/></td>
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
                                
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default PatientsTable