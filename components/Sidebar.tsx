import { LayoutDashboard, Users, Settings, LogOut, Key } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { useState } from "react";
import { ChangePasswordDialog } from "./ChangePasswordDialog";

type SidebarProps = {
  activeView: string;
  setActiveView: (view: string) => void;
};

export function Sidebar({ activeView, setActiveView }: SidebarProps) {
  const { currentUser, logout } = useAuth();
  const [showPasswordDialog, setShowPasswordDialog] = useState(false);

  if (!currentUser) return null;

  const getRoleName = () => {
    switch (currentUser.role) {
      case "admin":
        return "Administrator";
      case "intern":
        return "Intern";
      case "attachee":
        return "Attachee";
      case "volunteer":
        return "Volunteer";
      case "staff":
        return "Staff";
      default:
        return "User";
    }
  };

  return (
    <>
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
        {/* Header with Red Cross Logo */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-[#DC143C] rounded flex items-center justify-center">
              <div className="relative">
                <div className="w-6 h-1.5 bg-white rounded-sm"></div>
                <div className="w-1.5 h-6 bg-white rounded-sm absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
              </div>
            </div>
            <div>
              <h1 className="text-[#DC143C]">Red Cross</h1>
              <p className="text-gray-500 text-sm">Workers Management</p>
            </div>
          </div>

          {/* User Info */}
          <div className="p-3 bg-gray-50 rounded-lg">
            <p className="text-gray-900 text-sm truncate">{currentUser.fullName}</p>
            <p className="text-gray-500 text-xs">{getRoleName()}</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            <li>
              <button
                onClick={() => setActiveView("dashboard")}
                className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors ${
                  activeView === "dashboard"
                    ? "bg-[#DC143C] text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <LayoutDashboard className="w-5 h-5" />
                <span>Dashboard</span>
              </button>
            </li>
            
            {currentUser.role === "admin" && (
              <li>
                <button
                  onClick={() => setActiveView("users")}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors ${
                    activeView === "users"
                      ? "bg-[#DC143C] text-white"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <Users className="w-5 h-5" />
                  <span>User Management</span>
                </button>
              </li>
            )}

            <li>
              <button
                onClick={() => setShowPasswordDialog(true)}
                className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
              >
                <Key className="w-5 h-5" />
                <span>Change Password</span>
              </button>
            </li>

            <li>
              <button
                className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
              >
                <Settings className="w-5 h-5" />
                <span>Settings</span>
              </button>
            </li>
          </ul>
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200">
          <button
            onClick={logout}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      <ChangePasswordDialog
        open={showPasswordDialog}
        onOpenChange={setShowPasswordDialog}
        isRequired={false}
      />
    </>
  );
}
