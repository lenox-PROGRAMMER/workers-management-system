import React from "react";
import { useWorkers } from "../hooks/useWorkers"; 

export default function WorkersDashboard() {
  const { workers, loading } = useWorkers();

  if (loading) return <p>Loading workers...</p>;

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Workers Overview</h2>
      <ul className="space-y-2">
        {workers.map((worker) => (
          <li key={worker.id} className="border p-4 rounded">
            <p><strong>{worker.name}</strong> — {worker.role}</p>
            <p>{worker.department}</p>
            <p>{worker.status}</p>
            <p>{worker.email}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
