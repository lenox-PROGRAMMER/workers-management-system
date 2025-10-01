import { Users, UserCheck, UserX, Clock } from "lucide-react";
import { Card } from "./ui/card";
import { mockWorkers } from "./mockData";

type DashboardProps = {
  setActiveView: (view: "dashboard" | "workers") => void;
};

export function Dashboard({ setActiveView }: DashboardProps) {
  const stats = {
    total: mockWorkers.length,
    active: mockWorkers.filter((w) => w.status === "active").length,
    onLeave: mockWorkers.filter((w) => w.status === "on-leave").length,
    inactive: mockWorkers.filter((w) => w.status === "inactive").length,
  };

  const recentWorkers = mockWorkers.slice(0, 5);

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-gray-900 mb-2">Dashboard</h1>
        <p className="text-gray-600">Welcome to the Red Cross Workers Management System</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 mb-1">Total Workers</p>
              <p className="text-gray-900">{stats.total}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </Card>

        <Card className="p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 mb-1">Active Workers</p>
              <p className="text-gray-900">{stats.active}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <UserCheck className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </Card>

        <Card className="p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 mb-1">On Leave</p>
              <p className="text-gray-900">{stats.onLeave}</p>
            </div>
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <Clock className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
        </Card>

        <Card className="p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 mb-1">Inactive</p>
              <p className="text-gray-900">{stats.inactive}</p>
            </div>
            <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
              <UserX className="w-6 h-6 text-gray-600" />
            </div>
          </div>
        </Card>
      </div>

      {/* Recent Workers */}
      <Card className="p-6 border border-gray-200">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-gray-900">Recent Workers</h2>
          <button
            onClick={() => setActiveView("workers")}
            className="text-[#DC143C] hover:underline"
          >
            View All
          </button>
        </div>
        <div className="space-y-4">
          {recentWorkers.map((worker) => (
            <div
              key={worker.id}
              className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                  <span className="text-gray-600">
                    {worker.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="text-gray-900">{worker.name}</p>
                  <p className="text-gray-500 text-sm">{worker.role}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-gray-600 text-sm">{worker.department}</span>
                <span
                  className={`px-3 py-1 rounded-full text-sm ${
                    worker.status === "active"
                      ? "bg-green-100 text-green-700"
                      : worker.status === "on-leave"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  {worker.status === "active"
                    ? "Active"
                    : worker.status === "on-leave"
                    ? "On Leave"
                    : "Inactive"}
                </span>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
