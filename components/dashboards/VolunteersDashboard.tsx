import { useAuth } from "../../contexts/AuthContext";
import { Card } from "../ui/card";
import { Heart, Users, Calendar, Star } from "lucide-react";

export function VolunteersDashboard() {
  const { currentUser } = useAuth();

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-gray-900 mb-2">Volunteers Dashboard</h1>
        <p className="text-gray-600">
          Welcome, {currentUser?.fullName}
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 mb-1">Volunteer Hours</p>
              <p className="text-gray-900">156</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Clock className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </Card>

        <Card className="p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 mb-1">Events Attended</p>
              <p className="text-gray-900">22</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Calendar className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </Card>

        <Card className="p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 mb-1">People Helped</p>
              <p className="text-gray-900">450+</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </Card>

        <Card className="p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 mb-1">Impact Score</p>
              <p className="text-gray-900">4.8</p>
            </div>
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <Star className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
        </Card>
      </div>

      {/* Upcoming Events */}
      <Card className="p-6 border border-gray-200 mb-6">
        <div className="flex items-center gap-2 mb-4">
          <Heart className="w-5 h-5 text-[#DC143C]" />
          <h2 className="text-gray-900">Upcoming Volunteer Opportunities</h2>
        </div>
        <div className="space-y-4">
          {[
            {
              title: "Blood Donation Drive",
              date: "October 6, 2025",
              time: "8:00 AM - 4:00 PM",
              location: "Community Center",
            },
            {
              title: "Health Awareness Campaign",
              date: "October 10, 2025",
              time: "10:00 AM - 2:00 PM",
              location: "City Park",
            },
            {
              title: "Disaster Preparedness Workshop",
              date: "October 14, 2025",
              time: "9:00 AM - 12:00 PM",
              location: "Red Cross Training Center",
            },
          ].map((event, index) => (
            <div
              key={index}
              className="p-4 bg-gray-50 rounded-lg border border-gray-200"
            >
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-gray-900">{event.title}</h3>
                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                  Register
                </span>
              </div>
              <div className="space-y-1 text-sm text-gray-600">
                <p>📅 {event.date} • {event.time}</p>
                <p>📍 {event.location}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Recent Contributions */}
      <Card className="p-6 border border-gray-200">
        <h2 className="text-gray-900 mb-4">Recent Contributions</h2>
        <div className="space-y-3">
          {[
            {
              activity: "Assisted at Blood Donation Camp",
              date: "September 28, 2025",
              hours: 6,
            },
            {
              activity: "Community Food Distribution",
              date: "September 25, 2025",
              hours: 4,
            },
            {
              activity: "First Aid Training Support",
              date: "September 22, 2025",
              hours: 8,
            },
            {
              activity: "Emergency Response Team",
              date: "September 18, 2025",
              hours: 5,
            },
          ].map((contribution, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 border-b border-gray-100 last:border-0"
            >
              <div>
                <p className="text-gray-900">{contribution.activity}</p>
                <p className="text-gray-500 text-sm">{contribution.date}</p>
              </div>
              <span className="text-[#DC143C]">{contribution.hours}h</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
