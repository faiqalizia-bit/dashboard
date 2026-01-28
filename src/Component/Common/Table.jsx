import { MdOutlineModeEditOutline } from "react-icons/md";
import { AiTwotoneDelete } from "react-icons/ai";
import NoDataRow from "../Common/nodata";

function Table({ columns = [], data = [], onEdit, onDelete, showActions = true }) {
  return (
    <div className="bg-white rounded shadow overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead className="bg-gray-100">
          <tr>
            {columns.map((col) => (
              <th key={col.key} className="border p-2">
                {col.label}
              </th>
            ))}
            {showActions && <th className="border p-2">Actions</th>}
          </tr>
        </thead>

        <tbody>
          {data.length === 0 ? (
            <NoDataRow  />
          ) : (
            data.map((row) => (
              <tr key={row._id} className="bg-neutral">
                {columns.map((col) => (
                  <td key={col.key} className="border p-2">
                    {col.render ? col.render(row[col.key], row) : row[col.key]}
                  </td>
                ))}
                {showActions && (
                  <td className="border p-2 space-x-2">
                    <button
                      onClick={() => onEdit(row)}
                      className="px-3 py-1 text-secondary"
                    >
                      <MdOutlineModeEditOutline />
                    </button>

                    <button
                      onClick={() => onDelete(row._id)}
                      className="px-3 py-1 text-black"
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
  );
}

export default Table;
