import React, { useState } from "react";
import Sidebar from "@/components/admin/Sidebar";
import MetricsOverview from "@/components/admin/MetricsOverview";
import UserManagement from "@/components/admin/UserManagement";
import KYCVerification from "@/components/admin/KYCVerification";
import Proposals from "@/components/admin/Proposals";
import PostModeration from "@/components/admin/PostModeration";
import Analytics from "@/components/admin/Analytics";

interface DashboardProps {
  activeSection?:
    | "dashboard"
    | "users"
    | "kyc"
    | "proposals"
    | "posts"
    | "analytics"
    | "settings";
}

const Dashboard = ({ activeSection = "dashboard" }: DashboardProps) => {
  const [currentSection, setCurrentSection] = useState(activeSection);

  const renderContent = () => {
    switch (currentSection) {
      case "dashboard":
        return (
          <div className="space-y-6">
            <MetricsOverview />
            <UserManagement />
          </div>
        );
      case "users":
        return <UserManagement />;
      case "kyc":
        return <KYCVerification />;
      case "proposals":
        return <Proposals />;
      case "posts":
        return <PostModeration />;
      case "analytics":
        return <Analytics />;
      case "settings":
        return (
          <div className="p-6 bg-white rounded-lg">
            <h2 className="text-2xl font-bold">Settings</h2>
            <p className="text-gray-500">Settings panel coming soon...</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar
        activeSection={currentSection}
        onNavigate={(section) =>
          setCurrentSection(section as typeof currentSection)
        }
      />
      <main className="flex-1 overflow-auto p-6">
        <div className="max-w-7xl mx-auto">{renderContent()}</div>
      </main>
    </div>
  );
};

export default Dashboard;