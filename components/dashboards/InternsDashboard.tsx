import { useAuth } from "../../contexts/AuthContext";
import { Card } from "../ui/card";
import { Calendar, BookOpen, Award, Clock } from "lucide-react";

export function InternsDashboard() {
  const { currentUser } = useAuth();

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-gray-900 mb-2">Interns Dashboard</h1>
        <p className="text-gray-600">
          Welcome, {currentUser?.fullName}
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 mb-1">Days Completed</p>
              <p className="text-gray-900">45</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Calendar className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </Card>

        <Card className="p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 mb-1">Training Sessions</p>
              <p className="text-gray-900">12</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </Card>

        <Card className="p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 mb-1">Certifications</p>
              <p className="text-gray-900">3</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <Award className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </Card>

        <Card className="p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 mb-1">Hours Logged</p>
              <p className="text-gray-900">180</p>
            </div>
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <Clock className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
        </Card>
      </div>

      {/* Upcoming Training */}
      <Card className="p-6 border border-gray-200 mb-6">
        <h2 className="text-gray-900 mb-4">Upcoming Training Sessions</h2>
        <div className="space-y-4">
          {[
            {
              title: "First Aid Certification",
              date: "October 5, 2025",
              time: "9:00 AM - 12:00 PM",
            },
            {
              title: "CPR Training",
              date: "October 8, 2025",
              time: "2:00 PM - 4:00 PM",
            },
            {
              title: "Emergency Response Procedures",
              date: "October 12, 2025",
              time: "10:00 AM - 1:00 PM",
            },
          ].map((session, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
            >
              <div>
                <p className="text-gray-900">{session.title}</p>
                <p className="text-gray-600 text-sm">{session.date}</p>
              </div>
              <p className="text-gray-600 text-sm">{session.time}</p>
            </div>
          ))}
        </div>
      </Card>

      {/* Recent Activities */}
      <Card className="p-6 border border-gray-200">
        <h2 className="text-gray-900 mb-4">Recent Activities</h2>
        <div className="space-y-3">
          {[
            "Completed Blood Donation Drive training",
            "Attended Emergency Response workshop",
            "Assisted in Community Health Fair",
            "Completed Safety Protocol assessment",
          ].map((activity, index) => (
            <div
              key={index}
              className="flex items-start gap-3 p-3 border-b border-gray-100 last:border-0"
            >
              <div className="w-2 h-2 bg-[#DC143C] rounded-full mt-2"></div>
              <p className="text-gray-700">{activity}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
