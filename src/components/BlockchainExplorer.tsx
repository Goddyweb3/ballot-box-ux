import React from "react";
import { motion } from "framer-motion";
import { useVoting } from "../hooks/useVoting";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Shield, Database, Lock, Hash, ArrowRight, CheckCircle2, Search } from "lucide-react";
import { Input } from "../components/ui/input";
import { Badge } from "../components/ui/badge";

export const BlockchainExplorer: React.FC = () => {
  const { transactions } = useVoting();

  const mockBlocks = [
    { hash: "0x4f...a2", prev: "0x00...00", time: "10 mins ago", size: "2.4kb", index: 542 },
    { hash: "0x7d...b9", prev: "0x4f...a2", time: "14 mins ago", size: "1.8kb", index: 541 },
    { hash: "0x1a...c4", prev: "0x7d...b9", time: "22 mins ago", size: "2.1kb", index: 540 },
  ];

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      <div className="mb-10 text-center">
        <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-primary/10 mb-4">
           <Database className="h-8 w-8 text-primary" />
        </div>
        <h1 className="text-4xl font-bold tracking-tight mb-4">Public Blockchain Explorer</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Verify election integrity in real-time. Every vote is a transaction on the immutable ledger. 
          Voter identities are cryptographically masked.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
         {[
           { label: "Network Hashrate", value: "245.2 TH/s", icon: Hash },
           { label: "Last Block Time", value: "14.2s", icon: Lock },
           { label: "Active Nodes", value: "1,242 Global", icon: Shield },
         ].map((stat, i) => (
           <Card key={i}>
             <CardContent className="p-6 flex items-center gap-4">
                <div className="h-10 w-10 rounded-lg bg-primary/5 flex items-center justify-center">
                  <stat.icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                   <p className="text-xs text-muted-foreground uppercase font-semibold">{stat.label}</p>
                   <p className="text-xl font-bold">{stat.value}</p>
                </div>
             </CardContent>
           </Card>
         ))}
      </div>

      <div className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <h2 className="text-2xl font-bold">Recent Transactions</h2>
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input className="pl-10" placeholder="Search by Tx Hash or Voter ID" />
          </div>
        </div>

        <div className="space-y-4">
          {transactions.length > 0 ? (
            transactions.slice().reverse().map((tx, idx) => (
              <motion.div
                key={tx.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="group bg-card border rounded-xl p-5 hover:border-primary/50 transition-all shadow-sm"
              >
                <div className="flex flex-col md:flex-row gap-6 md:items-center">
                   <div className="flex items-center gap-3 md:w-1/4">
                      <div className="h-10 w-10 rounded-full bg-green-500/10 flex items-center justify-center group-hover:bg-green-500/20 transition-colors">
                         <CheckCircle2 className="h-5 w-5 text-green-500" />
                      </div>
                      <div>
                         <p className="font-bold text-sm">SECURE_VOTE</p>
                         <p className="text-xs text-muted-foreground">{new Date(tx.timestamp).toLocaleTimeString()}</p>
                      </div>
                   </div>
                   
                   <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] font-mono text-muted-foreground">HASH:</span>
                        <p className="font-mono text-xs truncate text-primary">{tx.hash}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono text-muted-foreground">PREV:</span>
                        <p className="font-mono text-xs truncate opacity-60">{tx.previousHash}</p>
                      </div>
                   </div>

                   <div className="flex items-center gap-2 md:w-1/4 justify-end">
                      <Badge variant="outline" className="font-mono text-[10px]">ELECTION_ID:{tx.electionId}</Badge>
                      <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                   </div>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="py-20 text-center border-2 border-dashed rounded-2xl bg-muted/30">
               <Database className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-20" />
               <p className="text-muted-foreground">Waiting for transactions to be broadcast...</p>
            </div>
          )}

          {/* Historical Blocks Simulation */}
          <div className="pt-12">
            <h3 className="text-xl font-bold mb-6">Confirmed Blocks</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockBlocks.map((block) => (
                <Card key={block.index} className="bg-muted/50 border-none">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-center">
                       <CardTitle className="text-sm font-mono">Block #{block.index}</CardTitle>
                       <Badge variant="secondary" className="text-[10px]">{block.size}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3 pb-4">
                     <div>
                       <p className="text-[10px] uppercase font-bold text-muted-foreground">Block Hash</p>
                       <p className="font-mono text-xs truncate">{block.hash}</p>
                     </div>
                     <div className="flex justify-between items-end">
                       <p className="text-[10px] text-muted-foreground">{block.time}</p>
                       <div className="flex items-center gap-1">
                          <CheckCircle2 className="h-3 w-3 text-green-500" />
                          <span className="text-[10px] font-bold">Verified</span>
                       </div>
                     </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};