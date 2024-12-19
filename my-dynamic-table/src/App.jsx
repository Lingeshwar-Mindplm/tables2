import React from "react";
import DynamicTable from "./DynamicTable";
import DropdownComponent from "./dropdowncomponent";

const App = () => {
  const columns = [
    { header: "Name", accessor: "name" },
    { header: "Age", accessor: "age" },
    { header: "Email", accessor: "email" },
    {
      header: "Dropdown",
      accessor: "dropdown",
      Cell: ({ row }) => (
        <DropdownComponent
          options={["Option 1", "Option 2", "Option 3"]}
          onSelect={(value) =>
            alert(`Dropdown value for row ${row.name}: ${value}`)
          }
        />
      ),
    },
  ];

  const initialData = [
    { name: "Wasif", age: 21, email: "wasif@email.com", dropdown: "" },
    { name: "Ali", age: 19, email: "ali@email.com", dropdown: "" },
    { name: "Saad", age: 16, email: "saad@email.com", dropdown: "" },
    { name: "Asad", age: 25, email: "asad@email.com", dropdown: "" },
  ];

  return (
    <div>
      <h1 className="text-center text-2xl font-bold my-4">Dynamic Table</h1>
      <DynamicTable columns={columns} initialData={initialData} />
    </div>
  );
};

export default App;
