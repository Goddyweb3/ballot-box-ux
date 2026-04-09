import React from "react";
import { useParams, useNavigate, Link } from "react-router";
import { useVoting } from "../../hooks/useVoting";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Skeleton } from "../../components/ui/skeleton";
import { ArrowLeft, CheckCircle2, ShieldAlert, Loader2, Database, Share2 } from "lucide-react";

export const ElectionDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { elections, castVote, isLoading, transactions } = useVoting();
  const [selectedCandidate, setSelectedCandidate] = React.useState<string | null>(null);
  const [isCasting, setIsCasting] = React.useState(false);

  const election = elections.find((e) => e.id === id);
  const userVote = transactions.find((t) => t.electionId === id);

  if (!election) {
    return <div className="p-20 text-center">Election not found</div>;
  }

  const handleVote = async () => {
    if (!selectedCandidate) return;
    setIsCasting(true);
    await castVote(election.id, selectedCandidate);
    setIsCasting(false);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <Link to="/dashboard" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary mb-6">
        <ArrowLeft className="h-4 w-4 mr-1" /> Back to Dashboard
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <Badge className="bg-primary/10 text-primary border-primary/20">{election.status}</Badge>
              <span className="text-sm text-muted-foreground">ID: {election.id}</span>
            </div>
            <h1 className="text-4xl font-bold mb-4">{election.title}</h1>
            <p className="text-lg text-muted-foreground">{election.description}</p>
          </motion.div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Candidates</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {election.candidates.map((candidate) => (
                <motion.div
                  key={candidate.id}
                  whileHover={!userVote ? { y: -4 } : {}}
                  onClick={() => !userVote && setSelectedCandidate(candidate.id)}
                  className={`cursor-pointer rounded-xl border-2 p-5 transition-all ${
                    selectedCandidate === candidate.id 
                      ? "border-primary bg-primary/5 ring-4 ring-primary/10" 
                      : userVote?.candidateId === candidate.id 
                        ? "border-green-500 bg-green-50" 
                        : "border-slate-200 dark:border-slate-800 hover:border-slate-300"
                  } ${userVote && userVote.candidateId !== candidate.id ? "opacity-50 grayscale" : ""}`}
                >
                  <div className="flex items-center gap-4">
                    <img src={candidate.avatar} alt={candidate.name} className="h-16 w-16 rounded-full border shadow-sm" />
                    <div className="flex-1">
                      <h3 className="font-bold text-lg">{candidate.name}</h3>
                      <p className="text-sm text-muted-foreground">{candidate.party}</p>
                    </div>
                    {userVote?.candidateId === candidate.id && (
                      <CheckCircle2 className="h-6 w-6 text-green-500" />
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <Card className="sticky top-24 border-primary/20 shadow-lg overflow-hidden">
            <div className="h-2 bg-primary w-full" />
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {userVote ? "Vote Record" : "Confirm Choice"}
              </CardTitle>
              <CardDescription>
                {userVote ? "Your vote is secured on the blockchain ledger." : "Please review your selection carefully."}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {userVote ? (
                <div className="space-y-6">
                  <div className="p-4 rounded-lg bg-green-500/5 border border-green-500/20 text-center">
                    <div className="h-12 w-12 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-3">
                      <CheckCircle2 className="h-6 w-6 text-green-500" />
                    </div>
                    <p className="font-bold text-green-700 dark:text-green-400">Vote Cast Successfully</p>
                    <p className="text-xs text-muted-foreground mt-1">Confirmed on: {new Date(userVote.timestamp).toLocaleString()}</p>
                  </div>
                  
                  <div className="space-y-2">
                    <p className="text-[10px] font-mono text-muted-foreground uppercase">Transaction Hash</p>
                    <div className="p-2 rounded bg-muted font-mono text-[10px] break-all border">
                      {userVote.hash}
                    </div>
                  </div>

                  <Link to="/ledger" className="w-full">
                    <Button variant="outline" className="w-full gap-2">
                      <Database className="h-4 w-4" /> View Ledger
                    </Button>
                  </Link>
                </div>
              ) : (
                <div className="space-y-6">
                  {selectedCandidate ? (
                    <div className="p-4 rounded-lg bg-primary/5 border border-primary/10">
                      <p className="text-xs text-muted-foreground uppercase font-semibold mb-1">Current Selection</p>
                      <p className="font-bold text-lg">{election.candidates.find(c => c.id === selectedCandidate)?.name}</p>
                    </div>
                  ) : (
                    <div className="p-8 rounded-lg border border-dashed text-center">
                       <ShieldAlert className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                       <p className="text-sm text-muted-foreground">No candidate selected yet</p>
                    </div>
                  )}

                  <div className="text-[10px] text-muted-foreground flex gap-2">
                    <div className="h-3 w-3 rounded-full bg-amber-500 flex-shrink-0 mt-0.5" />
                    <p>By casting this vote, you acknowledge that this action is permanent and will be recorded on an immutable ledger.</p>
                  </div>

                  <Button 
                    className="w-full h-12" 
                    disabled={!selectedCandidate || isCasting}
                    onClick={handleVote}
                  >
                    {isCasting ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Encrypting & Broadcasting...
                      </>
                    ) : (
                      "Cast Secure Vote"
                    )}
                  </Button>
                </div>
              )}
            </CardContent>
            <CardFooter className="bg-muted/50 border-t flex justify-center py-4">
              <Button variant="ghost" size="sm" className="gap-2 text-xs">
                <Share2 className="h-3 w-3" /> Share Election Info
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};