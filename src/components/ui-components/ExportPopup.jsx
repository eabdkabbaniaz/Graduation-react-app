import React, { useState } from "react";
import { exportMarks } from "../../api/marks";

export default function ExportPopup({ isOpen, onClose, options }){

  const [selectedOptions, setSelectedOptions] = useState({});
  const [inputValues, setInputValues] = useState({});
  const [isWaiting, setIsWaiting] = useState(false);

  const handleCheckboxChange = (id) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleInputChange = (label, value) => {
    setInputValues((prev) => ({
      ...prev,
      [label]: value,
    }));
  };

  if (!isOpen) return null;

  const handleExport = async () => {
    const selectedColumns = {};

    options.forEach(({ id, label }) => {
      if (selectedOptions[id]) {
        selectedColumns[label] = inputValues[label] || label;
      }
    });

    setIsWaiting(true)
    const response = await exportMarks({columns: selectedColumns}, {responseType: "blob", });
   
     const url = window.URL.createObjectURL(new Blob([response.data]));
     const link = document.createElement("a");
     link.href = url;
     link.setAttribute("download", "exported-data.xlsx"); 
     document.body.appendChild(link);
     link.click();

     link.remove();
     window.URL.revokeObjectURL(url);
     setIsWaiting(false)
     onClose();
 };

  return (
    <div className="fixed inset-0 z-30 flex items-center bg-gray-600 bg-opacity-50 justify-center">
      <div className="bg-white rounded-xl shadow-xl p-6 w-[400px]">
        <h2 className="text-xl font-semibold mb-4 text-center">Export Option</h2>
        <div className="space-y-4">
          {options.map((opt) => (
            <div key={opt.id}>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  className="form-checkbox h-2 w-5 text-indigo-600"
                  checked={!!selectedOptions[opt.id]}
                  onChange={() => handleCheckboxChange(opt.id)}
                />
                <span>{opt.label}</span>
              </label>
              {selectedOptions[opt.id] && (
                <input
                  type="text"
                  placeholder="write column name..."
                  value={inputValues[opt.label] || ""}
                  onChange={(e) => handleInputChange(opt.label, e.target.value)}
                  className="mt-2 w-full border rounded px-3 py-1"
                />
              )}
            </div>
          ))}
        </div>

        <div className="mt-6 flex justify-end space-x-2">
          <button
            className="px-5 py-3 text-sm font-medium leading-5 text-gray-700 transition-colors duration-150 border border-gray-300 rounded-lg dark:text-gray-400 sm:px-4 sm:py-2 sm:w-auto active:bg-transparent hover:border-gray-500 focus:border-gray-500 active:text-gray-500 focus:outline-none focus:shadow-outline-gray"
            onClick={onClose}
          >
            close
          </button>
          <button
            className="ml-4 px-5 py-3 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-lg sm:w-auto sm:px-4 sm:py-2 active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple"
            onClick={handleExport}
          >
            {isWaiting ? "Export..." : "Export"}
          </button>
        </div>
      </div>
    </div>
  );
}