"use client"
import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  Bar, 
  BarChart, 
  Line, 
  LineChart, 
  ResponsiveContainer, 
  XAxis, 
  YAxis, 
  Tooltip, 
  Legend,
  CartesianGrid
} from "recharts"
import { 
  Mail, 
  
  CheckCircle2, 
  TrendingUp,
  Heart,
  Activity,
  ShieldCheck,
  Search
} from "lucide-react"

import { Badge } from "@/components/ui/badge"


export default function LeaderDashboard() {
  const [trendData, setTrendData] = useState<any[]>([]);
const [categoryData, setCategoryData] = useState<any[]>([]);
const [advisorPerformance, setAdvisorPerformance] = useState<any[]>([]);

const [dashboardStats, setDashboardStats] = useState({
    totalEvaluations: 0,
    averageScore: 0,
    complianceRate: 0,
  });
  useEffect(() => {
    loadDashboardStats();
  }, []);
  
  const loadDashboardStats = async () => {
    try {
      const snapshot = await getDocs(collection(db, "audits"));
  
      const audits = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as any[];
      console.log(audits);
  
      // -------------------------
      // BASIC STATS
      // -------------------------
      const totalEvaluations = audits.length;
  
      const totalScore = audits.reduce(
        (sum, audit) => sum + (audit.totalScore || 0),
        0
      );
  
      const averageScore =
        totalEvaluations > 0 ? totalScore / totalEvaluations : 0;
  
      const compliant = audits.filter(
        (a) => (a.totalScore || 0) >= 80
      ).length;
  
      const complianceRate =
        totalEvaluations > 0 ? (compliant / totalEvaluations) * 100 : 0;
  
      setDashboardStats({
        totalEvaluations,
        averageScore,
        complianceRate,
      });
  
      // -------------------------
// CATEGORY DISTRIBUTION
// -------------------------

const avgPercentage = (category: string) => {
  let total = 0;

  audits.forEach((audit) => {
    const item = audit.scores?.[category];

    if (item) {
      total += (item.score / item.max) * 100;
    }
  });

  return totalEvaluations ? total / totalEvaluations : 0;
};

const categoryData = [
  {
    metric: "Grammar",
    value: avgPercentage("Grammar and Tone"),
  },
  {
    metric: "Confidence",
    value: avgPercentage("Confidence"),
  },
  {
    metric: "Resolution",
    value: avgPercentage("Resolution"),
  },
  {
    metric: "Structure",
    value: avgPercentage("Structure"),
  },
];

console.log(categoryData);

setCategoryData(categoryData);
  
      // -------------------------
      // PERFORMANCE TRENDS
      // -------------------------
      const monthMap: Record<string, any> = {};
  
      audits.forEach((audit) => {
        if (!audit.createdAt) return;
  
        const date = audit.createdAt?.toDate
          ? audit.createdAt.toDate()
          : new Date(audit.createdAt);
  
        const month = date.toLocaleString("default", { month: "short" });
  
        if (!monthMap[month]) {
          monthMap[month] = {
            month,
            grammar: 0,
            confidence: 0,
            resolution: 0,
            count: 0,
        };
        }
  
        monthMap[month].grammar +=
        ((audit.scores?.["Grammar and Tone"]?.score || 0) /
          (audit.scores?.["Grammar and Tone"]?.max || 1)) *
        100;
      
      monthMap[month].confidence +=
        ((audit.scores?.Confidence?.score || 0) /
          (audit.scores?.Confidence?.max || 1)) *
        100;
      
      monthMap[month].resolution +=
        ((audit.scores?.Resolution?.score || 0) /
          (audit.scores?.Resolution?.max || 1)) *
        100;
      
      monthMap[month].count += 1;
      });
  
      const trendData = Object.values(monthMap).map((m: any) => ({
        month: m.month,
        grammar: m.grammar / m.count,
        confidence: m.confidence / m.count,
        resolution: m.resolution / m.count,
      }));
      
      console.log(trendData);
      setTrendData(trendData);
      // -------------------------
// ADVISOR PERFORMANCE
// -------------------------

const advisorMap: Record<string, any> = {};

audits.forEach((audit) => {
  const advisor = audit.advisorName || "Unknown";

  if (!advisorMap[advisor]) {
    advisorMap[advisor] = {
      advisor,
      audits: 0,
      totalScore: 0,
    };
  }

  advisorMap[advisor].audits += 1;
  advisorMap[advisor].totalScore += Number(audit.totalScore || 0);
});

const advisorStats = Object.values(advisorMap).map((item: any) => ({
  advisor: item.advisor,
  audits: item.audits,
  averageScore: item.totalScore / item.audits,
}));

// Optional: sort by audit count (highest first)
advisorStats.sort((a: any, b: any) => b.audits - a.audits);

setAdvisorPerformance(advisorStats);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="shadow-sm border-none bg-white">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Evaluations</CardTitle>
            <Mail className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
          <div className="text-2xl font-bold">
  {dashboardStats.totalEvaluations}
</div>
            <p className="text-xs text-green-600 font-medium flex items-center gap-1 mt-1">
              <TrendingUp className="h-3 w-3" /> +12% from last month
            </p>
          </CardContent>
        </Card>
        <Card className="shadow-sm border-none bg-white">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Team Avg Score</CardTitle>
            <Activity className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
          <div className="text-2xl font-bold">
  {dashboardStats.averageScore.toFixed(2)}
</div>
<p className="text-xs text-muted-foreground">
  Average total score
</p>
<p className="text-xs text-muted-foreground">out of 100</p>
            <div className="h-1 w-full bg-secondary rounded-full mt-3">
              <div className="h-full bg-accent rounded-full" style={{ width: `${dashboardStats.averageScore}%` }} />
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-sm border-none bg-white">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Compliance Rate</CardTitle>
            <ShieldCheck className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
          <div className="text-2xl font-bold">
  {dashboardStats.complianceRate.toFixed(1)}%
</div>
            <p className="text-xs text-green-600 font-medium mt-1">
              Top industry standard
            </p>
          </CardContent>
        </Card>
        
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <Card className="lg:col-span-4 border-none shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg">Performance Trends</CardTitle>
            <CardDescription>Monthly breakdown across evaluation categories</CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trendData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                  <XAxis 
                    dataKey="month" 
                    stroke="#888888" 
                    fontSize={12} 

                    tickLine={false} 
                    axisLine={false} 
                  />
                  <YAxis 
                    stroke="#888888" 
                    fontSize={12} 
                    tickLine={false} 
                    axisLine={false} 
                    tickFormatter={(value) => `${value}%`}
                  />
                  <Tooltip 
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                  />
                  <Legend iconType="circle" />
                  <Line
  type="monotone"
  dataKey="grammar"
  stroke="hsl(var(--chart-1))"
  strokeWidth={3}
  dot={{ r: 4, strokeWidth: 2, fill: "#fff" }}
/>
<Line
  type="monotone"
  dataKey="confidence"
  stroke="hsl(var(--chart-2))"
  strokeWidth={3}
  dot={{ r: 4, strokeWidth: 2, fill: "#fff" }}
/>
<Line
  type="monotone"
  dataKey="resolution"
  stroke="#22c55e"
  strokeWidth={3}
  dot={{ r: 4, strokeWidth: 2, fill: "#fff" }}
/>
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-3 border-none shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg">Category Distribution</CardTitle>
            <CardDescription>Aggregate team performance by metric</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoryData} layout="vertical">
                  <XAxis
  type="number"
  domain={[0, 100]}
  hide
/>
                  <YAxis 
                    dataKey="metric" 
                    type="category" 
                    stroke="#888888" 
                    fontSize={12} 
                    tickLine={false} 
                    axisLine={false} 
                    width={80}
                  />
                  <Tooltip 
                    cursor={{ fill: 'transparent' }}
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                  />
                  <Bar 
                    dataKey="value" 
                    fill="hsl(var(--accent))" 
                    radius={[0, 4, 4, 0]} 
                    barSize={24}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
      <Card className="border-none shadow-sm">
  <CardHeader>
    <CardTitle>Advisor Performance</CardTitle>
    <CardDescription>
      Audit count and average score by advisor
    </CardDescription>
  </CardHeader>

  <CardContent>
    <table className="w-full">
      <thead>
        <tr className="border-b">
          <th className="text-left py-2">Advisor</th>
          <th className="text-center py-2">Total Audits</th>
          <th className="text-center py-2">Average Total Score</th>
        </tr>
      </thead>

      <tbody>
        {advisorPerformance.map((advisor) => (
          <tr key={advisor.advisor} className="border-b">
            <td className="py-3">{advisor.advisor}</td>

            <td className="text-center">
              {advisor.audits}
            </td>

            <td className="text-center">
              {advisor.averageScore.toFixed(2)}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </CardContent>
</Card>
     
    </div>
  )
}