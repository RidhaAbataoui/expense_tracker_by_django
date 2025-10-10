import { TrendingUp, TrendingDown, Wallet } from "lucide-react";
import { StatCard } from "@/components/StatCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Cell, Pie, PieChart, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { useEffect, useState } from "react";
import { getBalance } from "@/API/balance";
import { getExpenseDistribution } from "@/API/filterExpenses";

const COLORS = [
  "hsl(217, 91%, 60%)",
  "hsl(173, 80%, 40%)",
  "hsl(142, 76%, 36%)",
  "hsl(0, 84%, 60%)",
  "hsl(280, 65%, 60%)",
];


const Dashboard = () => {
  const [data, setData] = useState<{ total_income?: number; total_expenses?: number; balance?: number } | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await getBalance();
        setData(res);
      } catch (error) {
        console.error("Error fetching balance:", error);
      }
    })();
  }, []);
   const [categoryData, setCategoryData] = useState([]);

    useEffect(() => {
      const fetchData = async () => {
        const data = await getExpenseDistribution();
        const coloredData = data.map((item, index) => ({
          ...item,
          color: COLORS[index % COLORS.length],
      }));
      setCategoryData(coloredData);
    };
      fetchData();
    }, []);

  

  

  if (!data) return <div>Loading...</div>;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Overview of your financial activity</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <StatCard
          title="Total Income"
          value={`$${data.total_income?.toLocaleString() ?? 0}`}
          icon={TrendingUp}
          gradientClass="gradient-success"
          trend="This month"
        />
        <StatCard
          title="Total Expenses"
          value={`$${data.total_expenses?.toLocaleString() ?? 0}`}
          icon={TrendingDown}
          gradientClass="gradient-danger"
          trend="This month"
        />
        <StatCard
          title="Current Balance"
          value={`$${data.balance?.toLocaleString() ?? 0}`}
          icon={Wallet}
          gradientClass="gradient-primary"
          trend="Available funds"
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Expense Distribution by Category</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
