import React, { useState } from "react";
import DropdownComponent from "./dropdowncomponent";
import Modal from "./modal";

const DynamicTable = ({ columns, initialData }) => {
  const [data, setData] = useState(initialData);
  const [editRowIndex, setEditRowIndex] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  const handleCellChange = (e, rowIndex, colIndex) => {
    const newData = [...data];
    newData[rowIndex][columns[colIndex].accessor] = e.target.value;
    setData(newData);
  };

  const addRow = () => {
    const newRow = columns.reduce((acc, col) => {
      acc[col.accessor] = "";
      return acc;
    }, {});
    setData([...data, newRow]);
  };

  const deleteRow = (rowIndex) => {
    const newData = data.filter((_, index) => index !== rowIndex);
    setData(newData);
  };

  const toggleEditMode = (rowIndex) => {
    setEditRowIndex(editRowIndex === rowIndex ? null : rowIndex);
  };

  const saveRowChanges = (rowIndex) => {
    toggleEditMode(rowIndex); // Exit edit mode after saving
  };

  const showRowDetails = (rowIndex) => {
    setSelectedRow(data[rowIndex]);
    setIsModalOpen(true); // Open the modal with row details
  };

  const actions = [
    {
      label: "Edit",
      onClick: (rowIndex) => toggleEditMode(rowIndex),
    },
    {
      label: "Delete",
      onClick: (rowIndex) => deleteRow(rowIndex),
    },
    {
      label: "View",
      onClick: (rowIndex) => showRowDetails(rowIndex), // Trigger modal open on "View"
    },
  ];

  // Modify actions based on edit state
  const modifiedActions = (rowIndex) => {
    if (editRowIndex === rowIndex) {
      return [
        {
          label: "Save",
          onClick: (rowIndex) => saveRowChanges(rowIndex),
        },
        ...actions.filter((action) => action.label !== "Edit"),
      ];
    }
    return actions;
  };

  return (
    <div className="container mx-auto p-4">
      <div className="overflow-visible shadow-md rounded-lg">
        <table className="min-w-full border-collapse border border-gray-300 bg-white w-full table-auto">
          <thead className="bg-gray-800 text-white">
            <tr>
              {columns.map((col, index) => (
                <th
                  key={index}
                  className="px-4 py-3 text-left text-sm font-semibold uppercase tracking-wider"
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className={
                  rowIndex % 2 === 0
                    ? "bg-gray-100 hover:bg-gray-200"
                    : "bg-white hover:bg-gray-200"
                }
              >
                {columns.map((col, colIndex) => (
                  <td
                    key={colIndex}
                    className="px-4 py-2 text-sm text-gray-600 border border-gray-300"
                  >
                    {col.accessor === "dropdown" ? (
                      <DropdownComponent
                        rowIndex={rowIndex}
                        actions={modifiedActions(rowIndex)}
                      />
                    ) : editRowIndex === rowIndex ? (
                      <input
                        type="text"
                        value={row[col.accessor]}
                        onChange={(e) =>
                          handleCellChange(e, rowIndex, colIndex)
                        }
                        className="w-full bg-transparent border-none p-1 text-sm"
                      />
                    ) : (
                      row[col.accessor]
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button
        onClick={addRow}
        className="mt-4 bg-green-500 text-white p-2 rounded hover:bg-green-600"
      >
        Add Row
      </button>

      {/* Modal component */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)} // Close modal on click
        row={selectedRow}
      />
    </div>
  );
};

export default DynamicTable;
