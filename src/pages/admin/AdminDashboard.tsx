import { Activity, Users, BarChart3, Search } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const stats = [
  { label: "Sessions", value: "—", icon: Activity },
  { label: "Users", value: "—", icon: Users },
  { label: "Analytics", value: "—", icon: BarChart3 },
  { label: "Search Clicks", value: "—", icon: Search },
];

const AdminDashboard = () => {
  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
        <p className="mt-1 text-muted-foreground">
          Welcome to the admin panel. Add your management tools here.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.label}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-semibold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardContent className="flex items-center justify-center rounded-lg border border-dashed p-12 text-center text-muted-foreground">
          No admin tools yet — this is your starting point.
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;
