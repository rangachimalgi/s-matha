import React, { useState, useEffect } from "react";
import { useTable } from "react-table";
import axios from "axios";

const AdminPanel = () => {
    const [data, setData] = useState([]);

    const fetchData = async () => {
        try {
          const response = await axios.get("https://s-matha.onrender.com/api/fetchData"); // Add the route to fetch data
          setData(response.data);
        } catch (error) {
          console.error("Error fetching data:", error.message);
        }
      };

      useEffect(() => {
        fetchData(); // Fetch data when the component mounts
      }, []);

  const [newData, setNewData] = useState({ name: "", phone: "", seva: "" });

  const handleChange = (e) => {
    setNewData({ ...newData, [e.target.name]: e.target.value });
  };

  const handleAddData = async () => {
    try {
      // Validate and add new data
      if (newData.name && newData.phone && newData.seva) {
        const response = await axios.post("https://s-matha.onrender.com/api/addData", newData);
  
        // Assuming the server responds with the added data
        const addedData = response.data;
  
        // Check if the added data has the required properties
        if (addedData && addedData._id && addedData.name && addedData.phone && addedData.seva) {
          const updatedData = [...data, addedData];
          setData(updatedData);
          setNewData({ name: "", phone: "", seva: "" });
        } else {
          console.error("Invalid response format from the server");
        }
      } else {
        alert("Please fill in all fields");
      }
    } catch (error) {
      console.error("Error adding data:", error.message);
    }
  };
  
  const columns = React.useMemo(
    () => [
      { Header: "ID", accessor: "_id" },
      { Header: "Name", accessor: "name" },
      { Header: "Phone", accessor: "phone" },
      { Header: "Seva", accessor: "seva" },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  return (
    <div>
      <h1>User Data</h1>

      {/* Form for adding new data */}
      <div>
        <label>
          Name:
          <input type="text" name="name" value={newData.name} onChange={handleChange} />
        </label>
        <label>
          Phone:
          <input type="text" name="phone" value={newData.phone} onChange={handleChange} />
        </label>
        <label>
          Seva:
          <input type="text" name="seva" value={newData.seva} onChange={handleChange} />
        </label>
        <button onClick={handleAddData}>Add Data</button>
      </div>

      <table {...getTableProps()} style={{ width: "100%" }}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render("Header")}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default AdminPanel;
