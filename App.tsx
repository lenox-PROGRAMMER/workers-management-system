import { useState, useEffect } from "react";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { LoginPage } from "./components/LoginPage";
import { Sidebar } from "./components/Sidebar";
import { AdminDashboard } from "./components/dashboards/AdminDashboard";
import { InternsDashboard } from "./components/dashboards/InternsDashboard";
import { AttacheesDashboard } from "./components/dashboards/AttacheesDashboard";
import { VolunteersDashboard } from "./components/dashboards/VolunteersDashboard";
import { StaffDashboard } from "./components/dashboards/StaffDashboard";
import { ChangePasswordDialog } from "./components/ChangePasswordDialog";
import { Toaster } from "./components/ui/sonner";

function AppContent() {
  const { currentUser } = useAuth();
  const [activeView, setActiveView] = useState<string>("dashboard");
  const [showPasswordDialog, setShowPasswordDialog] = useState(false);

  // Check if user must change password on login
  useEffect(() => {
    if (currentUser?.mustChangePassword) {
      setShowPasswordDialog(true);
    }
  }, [currentUser]);

  if (!currentUser) {
    return <LoginPage />;
  }

  const renderDashboard = () => {
    if (activeView === "dashboard") {
      switch (currentUser.role) {
        case "admin":
          return <AdminDashboard />;
        case "intern":
          return <InternsDashboard />;
        case "attachee":
          return <AttacheesDashboard />;
        case "volunteer":
          return <VolunteersDashboard />;
        case "staff":
          return <StaffDashboard />;
        default:
          return <AdminDashboard />;
      }
    }
    return null;
  };

  return (
    <div className="size-full flex bg-gray-50">
      <Sidebar activeView={activeView} setActiveView={setActiveView} />
      <main className="flex-1 overflow-auto">{renderDashboard()}</main>
      <ChangePasswordDialog
        open={showPasswordDialog}
        onOpenChange={setShowPasswordDialog}
        isRequired={currentUser.mustChangePassword}
      />
      <Toaster />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
