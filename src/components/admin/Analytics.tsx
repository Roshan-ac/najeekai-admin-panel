import React from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, LineChart, PieChart, Activity } from "lucide-react";

interface AnalyticsProps {
  userEngagementData?: number[];
  transactionData?: number[];
  platformMetrics?: number[];
}

const Analytics = ({
  userEngagementData = [65, 59, 80, 81, 56, 55, 40],
  transactionData = [28, 48, 40, 19, 86, 27, 90],
  platformMetrics = [30, 20, 25, 15, 10],
}: AnalyticsProps) => {
  return (
    <div className="w-full min-h-[600px] p-6 bg-white">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Analytics & Reports</h2>
      </div>

      <Tabs defaultValue="engagement" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="engagement" className="flex items-center gap-2">
            <BarChart className="w-4 h-4" />
            User Engagement
          </TabsTrigger>
          <TabsTrigger value="transactions" className="flex items-center gap-2">
            <LineChart className="w-4 h-4" />
            Transactions
          </TabsTrigger>
          <TabsTrigger value="platform" className="flex items-center gap-2">
            <PieChart className="w-4 h-4" />
            Platform Metrics
          </TabsTrigger>
        </TabsList>

        <TabsContent value="engagement">
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Activity className="w-5 h-5 text-blue-500" />
              <h3 className="text-lg font-semibold">
                User Engagement Overview
              </h3>
            </div>
            <div className="h-[400px] flex items-center justify-center border rounded-lg">
              {/* Placeholder for actual chart */}
              <div className="text-center text-gray-500">
                <p>User Engagement Chart</p>
                <p className="text-sm">Data: {userEngagementData.join(", ")}</p>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="transactions">
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <LineChart className="w-5 h-5 text-green-500" />
              <h3 className="text-lg font-semibold">Transaction History</h3>
            </div>
            <div className="h-[400px] flex items-center justify-center border rounded-lg">
              {/* Placeholder for actual chart */}
              <div className="text-center text-gray-500">
                <p>Transaction History Chart</p>
                <p className="text-sm">Data: {transactionData.join(", ")}</p>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="platform">
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <PieChart className="w-5 h-5 text-purple-500" />
              <h3 className="text-lg font-semibold">Platform Statistics</h3>
            </div>
            <div className="h-[400px] flex items-center justify-center border rounded-lg">
              {/* Placeholder for actual chart */}
              <div className="text-center text-gray-500">
                <p>Platform Metrics Chart</p>
                <p className="text-sm">Data: {platformMetrics.join(", ")}</p>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Analytics;
