import { AiTwotoneDelete } from "react-icons/ai";
import { MdOutlineModeEditOutline } from "react-icons/md";
import StatusBadge from "../satuscolor/StatusBadge";
import NoDataRow from "../Common/nodata";

function DoctorsTable({ doctors, onEdit, onDelete, showActions="true" }) {
  return (
    <div className="bg-white rounded shadow overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2">Name</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Status</th>
            {showActions &&(<th className="border p-2">Actions</th>)}
            
          </tr>
        </thead>

        <tbody>
          {doctors.length === 0 ? (
           <NoDataRow/>
          ) : (
            doctors.map((doc) => (
              <tr key={doc._id} className="bg-neutral">
                <td className="border p-2">{doc.name}</td>
                <td className="border p-2">{doc.email}</td>
                 <td className="border p-2"><StatusBadge status={doc.status}/></td>
              {showActions &&(  <td className="border p-2 space-x-2">
                  <button
                    onClick={() => onEdit(doc)}
                    className="px-3 py-1 text-secondary"
                  >
                    <MdOutlineModeEditOutline />
                  </button>

                  <button
                    onClick={() => onDelete(doc._id)}
                    className="px-3 py-1 text-black"
                  >
                    <AiTwotoneDelete />
                  </button>
                </td>
                )}
                {/* ku */}
                
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default DoctorsTable;