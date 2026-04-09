import React from "react";
import { motion } from "framer-motion";
import { useVoting } from "../../hooks/useVoting";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import { Progress } from "../../components/ui/progress";
import { Calendar, Users, Clock, ArrowRight, ShieldCheck, Database } from "lucide-react";
import { Link } from "react-router";

export const VoterDashboard: React.FC = () => {
  const { user, elections, transactions } = useVoting();

  const userVotes = transactions.filter(t => elections.some(e => e.id === t.electionId));

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-10"
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Voter Dashboard</h1>
            <p className="text-muted-foreground mt-1">Welcome back, {user?.name}. Your identity is verified.</p>
          </div>
          <div className="flex items-center gap-3 p-3 rounded-lg bg-primary/5 border border-primary/10">
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
              <ShieldCheck className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase font-semibold">Voter ID</p>
              <p className="font-mono font-bold">{user?.voterId}</p>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Active Elections */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary" />
              Active Elections
            </h2>
            <Badge variant="outline">{elections.filter(e => e.status === "ACTIVE").length} Available</Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {elections.filter(e => e.status === "ACTIVE").map((election, idx) => (
              <motion.div
                key={election.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
              >
                <Card className="h-full flex flex-col hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start mb-2">
                      <Badge className="bg-green-500/10 text-green-500 border-green-500/20">Live Now</Badge>
                      <div className="flex items-center text-xs text-muted-foreground gap-1">
                        <Users className="h-3 w-3" /> {election.votersCount} voters
                      </div>
                    </div>
                    <CardTitle className="text-xl">{election.title}</CardTitle>
                    <CardDescription className="line-clamp-2">{election.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <div className="space-y-4">
                      <div className="text-sm">
                         <p className="font-semibold mb-2">Leading Candidates</p>
                         <div className="space-y-3">
                           {election.candidates.slice(0, 2).map(c => (
                             <div key={c.id} className="space-y-1">
                               <div className="flex justify-between text-xs">
                                 <span>{c.name}</span>
                                 <span className="font-medium">{Math.round((c.votes / (election.candidates.reduce((a,b)=>a+b.votes,0) || 1)) * 100)}%</span>
                               </div>
                               <Progress value={(c.votes / (election.candidates.reduce((a,b)=>a+b.votes,0) || 1)) * 100} className="h-1" />
                             </div>
                           ))}
                         </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="pt-0">
                    <Link to={`/election/${election.id}`} className="w-full">
                      <Button className="w-full gap-2">
                        {transactions.some(t => t.electionId === election.id) ? "View Vote Details" : "Cast Your Vote"}
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="flex items-center justify-between pt-4">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <Calendar className="h-5 w-5 text-muted-foreground" />
              Upcoming
            </h2>
          </div>
          {elections.filter(e => e.status === "UPCOMING").map((election) => (
             <Card key={election.id} className="bg-muted/30">
               <CardContent className="p-6 flex items-center justify-between">
                 <div>
                   <h3 className="font-bold">{election.title}</h3>
                   <p className="text-sm text-muted-foreground">Starts on {new Date(election.startTime).toLocaleDateString()}</p>
                 </div>
                 <Button variant="outline" disabled>Set Reminder</Button>
               </CardContent>
             </Card>
          ))}
        </div>

        {/* Voter Stats & Ledger Snippet */}
        <div className="space-y-8">
           <Card className="bg-primary text-primary-foreground overflow-hidden">
             <div className="absolute top-0 right-0 p-4 opacity-10">
               <Database className="h-24 w-24" />
             </div>
             <CardHeader>
               <CardTitle className="text-lg">Your Impact</CardTitle>
             </CardHeader>
             <CardContent>
               <div className="flex items-center justify-between mb-4">
                 <span className="text-sm opacity-80">Total Votes Cast</span>
                 <span className="text-2xl font-bold">{userVotes.length}</span>
               </div>
               <div className="flex items-center justify-between">
                 <span className="text-sm opacity-80">Security Status</span>
                 <Badge className="bg-white/20 text-white border-none">100% Encrypted</Badge>
               </div>
             </CardContent>
             <CardFooter className="border-t border-white/10 pt-4">
               <Link to="/ledger" className="text-xs hover:underline flex items-center gap-1">
                 View your votes on the blockchain <ArrowRight className="h-3 w-3" />
               </Link>
             </CardFooter>
           </Card>

           <div className="space-y-4">
             <h3 className="font-bold">Recent Activity</h3>
             <div className="space-y-3">
               {transactions.length > 0 ? (
                 transactions.slice(-3).reverse().map((t, i) => (
                   <div key={i} className="p-3 rounded-lg border bg-card flex items-center gap-3">
                     <div className="h-8 w-8 rounded bg-primary/10 flex items-center justify-center flex-shrink-0">
                       <ShieldCheck className="h-4 w-4 text-primary" />
                     </div>
                     <div className="min-w-0">
                       <p className="text-sm font-medium truncate">Vote Confirmed</p>
                       <p className="text-[10px] font-mono text-muted-foreground truncate">HASH: {t.hash}</p>
                     </div>
                   </div>
                 ))
               ) : (
                 <p className="text-sm text-muted-foreground italic">No recent activity found.</p>
               )}
             </div>
           </div>
        </div>
      </div>
    </div>
  );
};