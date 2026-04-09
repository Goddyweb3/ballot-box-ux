import React from "react";
import { useVoting } from "../../hooks/useVoting";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";
import { 
  Users, 
  Vote, 
  BarChart3, 
  PlusCircle, 
  ShieldCheck, 
  Settings, 
  AlertCircle,
  TrendingUp,
  History
} from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";

export const AdminDashboard: React.FC = () => {
  const { elections, transactions } = useVoting();

  const totalVotes = transactions.length;
  const activeElections = elections.filter(e => e.status === "ACTIVE").length;
  
  // Prepare chart data for first active election
  const mainElection = elections[0];
  const chartData = mainElection?.candidates.map(c => ({
    name: c.name,
    votes: c.votes
  })) || [];

  const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6"];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Admin Console</h1>
          <p className="text-muted-foreground mt-1">Global oversight and election management.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="gap-2">
            <History className="h-4 w-4" /> View Audit Logs
          </Button>
          <Button className="gap-2">
            <PlusCircle className="h-4 w-4" /> New Election
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          { label: "Total Votes Cast", value: totalVotes + 1250, icon: Vote, color: "text-blue-500", bg: "bg-blue-500/10" },
          { label: "Active Elections", value: activeElections, icon: BarChart3, color: "text-green-500", bg: "bg-green-500/10" },
          { label: "Verified Voters", value: "24.5k", icon: Users, color: "text-amber-500", bg: "bg-amber-500/10" },
          { label: "Security Health", value: "Optimal", icon: ShieldCheck, color: "text-purple-500", bg: "bg-purple-500/10" },
        ].map((stat, i) => (
          <Card key={i}>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className={`h-12 w-12 rounded-xl ${stat.bg} flex items-center justify-center`}>
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Live Overview</TabsTrigger>
          <TabsTrigger value="management">Election Management</TabsTrigger>
          <TabsTrigger value="security">Security Protocols</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <Card className="lg:col-span-2">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Election Real-time Results</CardTitle>
                    <CardDescription>{mainElection?.title}</CardDescription>
                  </div>
                  <Badge variant="outline" className="flex items-center gap-1">
                    <TrendingUp className="h-3 w-3" /> Live
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] w-full mt-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip 
                        contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                      />
                      <Bar dataKey="votes" radius={[4, 4, 0, 0]}>
                        {chartData.map((_, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>System Health</CardTitle>
                <CardDescription>Server & Blockchain status</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {[
                  { label: "Blockchain Nodes", status: "Operational", color: "bg-green-500" },
                  { label: "Smart Contracts", status: "Verified", color: "bg-green-500" },
                  { label: "API Gateway", status: "Slow", color: "bg-amber-500" },
                  { label: "Storage Layer", status: "Operational", color: "bg-green-500" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <span className="text-sm font-medium">{item.label}</span>
                    <div className="flex items-center gap-2">
                       <span className="text-xs text-muted-foreground">{item.status}</span>
                       <div className={`h-2 w-2 rounded-full ${item.color}`} />
                    </div>
                  </div>
                ))}
                
                <div className="pt-4 border-t">
                  <div className="flex items-center gap-2 text-amber-500 mb-2">
                    <AlertCircle className="h-4 w-4" />
                    <span className="text-sm font-semibold">Security Alert</span>
                  </div>
                  <p className="text-xs text-muted-foreground">High volume of login attempts from unfamiliar IP ranges detected in US-East regions.</p>
                  <Button variant="link" className="p-0 h-auto text-xs mt-2">Investigate Logs</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="management">
          <Card>
            <CardContent className="p-0">
               <div className="overflow-x-auto">
                 <table className="w-full text-sm">
                   <thead className="bg-muted/50 border-b">
                     <tr>
                       <th className="px-6 py-4 text-left font-semibold">Election Title</th>
                       <th className="px-6 py-4 text-left font-semibold">Status</th>
                       <th className="px-6 py-4 text-left font-semibold">Candidates</th>
                       <th className="px-6 py-4 text-left font-semibold">Voters</th>
                       <th className="px-6 py-4 text-right font-semibold">Actions</th>
                     </tr>
                   </thead>
                   <tbody className="divide-y">
                     {elections.map((e) => (
                       <tr key={e.id} className="hover:bg-muted/30 transition-colors">
                         <td className="px-6 py-4 font-medium">{e.title}</td>
                         <td className="px-6 py-4">
                           <Badge variant={e.status === "ACTIVE" ? "default" : "secondary"}>
                             {e.status}
                           </Badge>
                         </td>
                         <td className="px-6 py-4">{e.candidates.length} candidates</td>
                         <td className="px-6 py-4">{e.votersCount} registered</td>
                         <td className="px-6 py-4 text-right">
                           <Button variant="ghost" size="icon">
                             <Settings className="h-4 w-4" />
                           </Button>
                         </td>
                       </tr>
                     ))}
                   </tbody>
                 </table>
               </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};