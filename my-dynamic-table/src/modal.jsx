import React from "react";

const Modal = ({ isOpen, onClose, row }) => {
  if (!isOpen) return null; // Don't render modal if it's not open

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-blue-900 bg-opacity-75 z-50">
      <div className="bg-blue-800 p-6 rounded-lg shadow-lg w-1/3">
        <h2 className="text-xl font-bold text-white">Row Details</h2>
        <p className="text-white">
          <strong>Name:</strong> {row.name}
        </p>
        <p className="text-white">
          <strong>Age:</strong> {row.age}
        </p>
        <p className="text-white">
          <strong>Email:</strong> {row.email}
        </p>
        <button
          onClick={onClose}
          className="mt-4 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;
