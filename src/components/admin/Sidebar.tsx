import React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  LayoutDashboard,
  Users,
  FileCheck,
  FileSignature,
  FileText,
  BarChart,
  Settings,
  LogOut,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface SidebarProps {
  className?: string;
  activeSection?:
    | "dashboard"
    | "users"
    | "kyc"
    | "proposals"
    | "posts"
    | "analytics"
    | "settings";
  onNavigate?: (section: string) => void;
}

const navigationItems = [
  { name: "Dashboard", icon: LayoutDashboard, section: "dashboard" },
  { name: "Users", icon: Users, section: "users" },
  { name: "KYC Verification", icon: FileCheck, section: "kyc" },
  { name: "Proposals", icon: FileSignature, section: "proposals" },
  { name: "Posts", icon: FileText, section: "posts" },
  { name: "Analytics", icon: BarChart, section: "analytics" },
  { name: "Settings", icon: Settings, section: "settings" },
];

const Sidebar = ({
  className,
  activeSection = "dashboard",
  onNavigate = () => {},
}: SidebarProps) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Here you would typically clear any auth tokens or state
    navigate("/");
  };

  return (
    <div
      className={cn(
        "flex h-screen w-[280px] flex-col border-r bg-background",
        className,
      )}
    >
      <div className="p-6">
        <h2 className="text-2xl font-bold">Admin Panel</h2>
      </div>

      <ScrollArea className="flex-1 px-4">
        <nav className="flex flex-col gap-2">
          {navigationItems.map((item) => (
            <Button
              key={item.section}
              variant={activeSection === item.section ? "secondary" : "ghost"}
              className={cn(
                "w-full justify-start gap-2",
                activeSection === item.section && "bg-secondary",
              )}
              onClick={() => onNavigate(item.section)}
            >
              <item.icon className="h-5 w-5" />
              <span>{item.name}</span>
            </Button>
          ))}
        </nav>
      </ScrollArea>

      <div className="border-t p-6">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="flex items-center gap-3 cursor-pointer hover:bg-gray-100 p-2 rounded-lg transition-colors">
              <img
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=admin"
                alt="Admin"
                className="h-10 w-10 rounded-full"
              />
              <div className="flex-1">
                <p className="font-medium">Admin User</p>
                <p className="text-sm text-muted-foreground">
                  admin@example.com
                </p>
              </div>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[240px]">
            <DropdownMenuItem
              onClick={handleLogout}
              className="text-red-600 focus:text-red-600"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default Sidebar;
