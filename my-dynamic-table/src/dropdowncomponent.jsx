import React, { useState, useRef, useEffect } from "react";

const DropdownComponent = ({ rowIndex, actions }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null); // Create a ref to track the dropdown

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  // Close dropdown if clicked outside of it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        type="button"
        className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
        onClick={toggleDropdown}
      >
        Actions
      </button>

      {isOpen && (
        <div className="absolute top-full mt-2 right-0 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
          <div className="py-1">
            {actions.map(({ label, onClick }, index) => (
              <button
                key={index}
                onClick={() => {
                  onClick(rowIndex);
                  setIsOpen(false); // Close dropdown after an action is performed
                }}
                className="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 w-full text-left"
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DropdownComponent;
