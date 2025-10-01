import { useAuth } from "../../contexts/AuthContext";
import { Card } from "../ui/card";
import { Briefcase, FileText, Users, CheckCircle } from "lucide-react";

export function StaffDashboard() {
  const { currentUser } = useAuth();

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-gray-900 mb-2">Staff Dashboard</h1>
        <p className="text-gray-600">
          Welcome, {currentUser?.fullName}
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 mb-1">Active Projects</p>
              <p className="text-gray-900">8</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Briefcase className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </Card>

        <Card className="p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 mb-1">Team Members</p>
              <p className="text-gray-900">25</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </Card>

        <Card className="p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 mb-1">Reports Pending</p>
              <p className="text-gray-900">4</p>
            </div>
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <FileText className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
        </Card>

        <Card className="p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 mb-1">Tasks Completed</p>
              <p className="text-gray-900">142</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </Card>
      </div>

      {/* Active Projects */}
      <Card className="p-6 border border-gray-200 mb-6">
        <h2 className="text-gray-900 mb-4">Active Projects</h2>
        <div className="space-y-4">
          {[
            {
              name: "Emergency Response Initiative",
              progress: 75,
              deadline: "October 30, 2025",
              team: 8,
            },
            {
              name: "Community Health Program",
              progress: 60,
              deadline: "November 15, 2025",
              team: 12,
            },
            {
              name: "Youth Training Campaign",
              progress: 45,
              deadline: "November 30, 2025",
              team: 6,
            },
          ].map((project, index) => (
            <div
              key={index}
              className="p-4 bg-gray-50 rounded-lg border border-gray-200"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="text-gray-900 mb-1">{project.name}</h3>
                  <p className="text-gray-600 text-sm">
                    Due: {project.deadline} • Team: {project.team} members
                  </p>
                </div>
                <span className="text-gray-600">{project.progress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-[#DC143C] h-2 rounded-full"
                  style={{ width: `${project.progress}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Team Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6 border border-gray-200">
          <h2 className="text-gray-900 mb-4">Team Performance</h2>
          <div className="space-y-4">
            {[
              { department: "Emergency Response", score: 92 },
              { department: "Medical Services", score: 88 },
              { department: "Community Outreach", score: 95 },
              { department: "Administration", score: 85 },
            ].map((dept, index) => (
              <div key={index}>
                <div className="flex items-center justify-between mb-2">
                  <p className="text-gray-700">{dept.department}</p>
                  <p className="text-gray-600 text-sm">{dept.score}%</p>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-green-500 h-2 rounded-full"
                    style={{ width: `${dept.score}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6 border border-gray-200">
          <h2 className="text-gray-900 mb-4">Upcoming Deadlines</h2>
          <div className="space-y-3">
            {[
              { task: "Monthly Performance Report", date: "October 5, 2025" },
              { task: "Budget Review Meeting", date: "October 8, 2025" },
              { task: "Staff Training Session", date: "October 12, 2025" },
              { task: "Quarterly Planning", date: "October 20, 2025" },
            ].map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <p className="text-gray-900">{item.task}</p>
                <p className="text-gray-600 text-sm">{item.date}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
