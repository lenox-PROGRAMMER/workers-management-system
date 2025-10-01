import { useAuth } from "../../contexts/AuthContext";
import { Card } from "../ui/card";
import { FileText, CheckCircle, Clock, TrendingUp } from "lucide-react";

export function AttacheesDashboard() {
  const { currentUser } = useAuth();

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-gray-900 mb-2">Attachees Dashboard</h1>
        <p className="text-gray-600">
          Welcome, {currentUser?.fullName}
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 mb-1">Tasks Assigned</p>
              <p className="text-gray-900">24</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <FileText className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </Card>

        <Card className="p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 mb-1">Tasks Completed</p>
              <p className="text-gray-900">18</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </Card>

        <Card className="p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 mb-1">Pending Tasks</p>
              <p className="text-gray-900">6</p>
            </div>
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <Clock className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
        </Card>

        <Card className="p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 mb-1">Performance</p>
              <p className="text-gray-900">85%</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </Card>
      </div>

      {/* Current Assignments */}
      <Card className="p-6 border border-gray-200 mb-6">
        <h2 className="text-gray-900 mb-4">Current Assignments</h2>
        <div className="space-y-4">
          {[
            {
              title: "Community Outreach Program Planning",
              deadline: "October 10, 2025",
              status: "in-progress",
            },
            {
              title: "Emergency Kit Distribution Report",
              deadline: "October 8, 2025",
              status: "pending",
            },
            {
              title: "Volunteer Coordination Documentation",
              deadline: "October 15, 2025",
              status: "in-progress",
            },
          ].map((task, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
            >
              <div>
                <p className="text-gray-900">{task.title}</p>
                <p className="text-gray-600 text-sm">Due: {task.deadline}</p>
              </div>
              <span
                className={`px-3 py-1 rounded-full text-sm ${
                  task.status === "in-progress"
                    ? "bg-blue-100 text-blue-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {task.status === "in-progress" ? "In Progress" : "Pending"}
              </span>
            </div>
          ))}
        </div>
      </Card>

      {/* Learning Progress */}
      <Card className="p-6 border border-gray-200">
        <h2 className="text-gray-900 mb-4">Learning Progress</h2>
        <div className="space-y-4">
          {[
            { skill: "Project Management", progress: 75 },
            { skill: "Communication Skills", progress: 90 },
            { skill: "Data Analysis", progress: 60 },
            { skill: "Report Writing", progress: 85 },
          ].map((item, index) => (
            <div key={index}>
              <div className="flex items-center justify-between mb-2">
                <p className="text-gray-700">{item.skill}</p>
                <p className="text-gray-600 text-sm">{item.progress}%</p>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-[#DC143C] h-2 rounded-full"
                  style={{ width: `${item.progress}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
