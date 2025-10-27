import { useState } from "react";
import axios from "axios";
import type { Client } from "../types/types";

interface TableListProps {
  handleOpen: (mode: "edit" | "add", client?: Client) => void;
  tableData: Client[];
  setTableData: React.Dispatch<React.SetStateAction<Client[]>>;
  searchTerm: string;
}

export default function TableList({
  handleOpen,
  tableData,
  setTableData,
  searchTerm,
}: TableListProps) {
  const [error, setError] = useState<string | null>(null);

  const filteredData = tableData.filter((client: Client) => {
    const term = searchTerm.toLowerCase();
    return (
      client.name.toLowerCase().includes(term) ||
      client.email.toLowerCase().includes(term) ||
      client.job.toLowerCase().includes(term)
    );
  });

  const handleDelete = async (id: number | undefined): Promise<void> => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this client?"
    );
    if (!confirmDelete) return;

    try {
      await axios.delete<void>(`http://localhost:3000/api/clients/${id}`);
      setTableData((prevData) => prevData.filter((client) => client.id !== id));
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.message);
      } else {
        setError(String(err));
      }
    }
  };

  return (
    <>
      {error && <div className="alert alert-error">{error}</div>}

      <div className="overflow-x-auto mt-10">
        <table className="table">
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Email</th>
              <th>Job</th>
              <th>Rate</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody className="hover">
            {filteredData.map((client) => (
              <tr key={client.id}>
                <th>{client.id}</th>
                <td>{client.name}</td>
                <td>{client.email}</td>
                <td>{client.job}</td>
                <td>{client.rate}</td>
                <td>
                  <button
                    className={`btn rounded-full w-20 ${
                      client.isActive
                        ? `btn-primary`
                        : `btn-outline btn-primary`
                    }`}
                  >
                    {client.isActive ? "Active" : "Inactive"}
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => handleOpen("edit", client)}
                    className="btn btn-secondary"
                  >
                    Update
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-accent"
                    onClick={() => handleDelete(client.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
