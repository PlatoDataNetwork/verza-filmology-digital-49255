import { useEffect, useState } from "react";
import { StatCard } from "@/components/admin/StatCard";
import { RecentActivity } from "@/components/admin/RecentActivity";
import {
  EngagementChart,
  TrafficChart,
  UsersChart,
} from "@/components/admin/DashboardCharts";
import { Skeleton } from "@/components/ui/skeleton";
import { getAdminDashboardData, type DashboardData } from "@/lib/admin/dashboardData";

const AdminDashboard = () => {
  const [data, setData] = useState<DashboardData | null>(null);

  useEffect(() => {
    let active = true;
    getAdminDashboardData().then((d) => {
      if (active) setData(d);
    });
    return () => {
      active = false;
    };
  }, []);

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
        <p className="mt-1 text-muted-foreground">Overview of traffic, users, and engagement.</p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        {data
          ? data.stats.map((metric) => <StatCard key={metric.key} metric={metric} />)
          : Array.from({ length: 6 }).map((_, i) => <Skeleton key={i} className="h-[116px] rounded-xl" />)}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2">
          {data ? <TrafficChart data={data.traffic} /> : <Skeleton className="h-[340px] rounded-xl" />}
        </div>
        <div>
          {data ? <EngagementChart data={data.engagement} /> : <Skeleton className="h-[340px] rounded-xl" />}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2">
          {data ? <UsersChart data={data.users} /> : <Skeleton className="h-[340px] rounded-xl" />}
        </div>
        <div>
          {data ? <RecentActivity items={data.activity} /> : <Skeleton className="h-[340px] rounded-xl" />}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
