import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, FileCheck, FileText, DollarSign } from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  description: string;
}

const MetricCard = ({
  title = "Metric",
  value = "0",
  icon = <Users className="h-4 w-4" />,
  description = "No data available",
}: MetricCardProps) => {
  return (
    <Card className="bg-white">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className="h-4 w-4 text-muted-foreground">{icon}</div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
};

interface MetricsOverviewProps {
  metrics?: {
    activeUsers: string;
    pendingVerifications: string;
    newPosts: string;
    revenue: string;
  };
}

const MetricsOverview = ({
  metrics = {
    activeUsers: "1,234",
    pendingVerifications: "56",
    newPosts: "89",
    revenue: "$12,345",
  },
}: MetricsOverviewProps) => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 p-4 bg-gray-50">
      <MetricCard
        title="Active Users"
        value={metrics.activeUsers}
        icon={<Users className="h-4 w-4" />}
        description="Total active users this month"
      />
      <MetricCard
        title="Pending Verifications"
        value={metrics.pendingVerifications}
        icon={<FileCheck className="h-4 w-4" />}
        description="KYC verifications awaiting review"
      />
      <MetricCard
        title="New Posts"
        value={metrics.newPosts}
        icon={<FileText className="h-4 w-4" />}
        description="Service posts in last 24 hours"
      />
      <MetricCard
        title="Revenue"
        value={metrics.revenue}
        icon={<DollarSign className="h-4 w-4" />}
        description="Total revenue this month"
      />
    </div>
  );
};

export default MetricsOverview;
