import React, { createContext, useContext, useState, useEffect } from "react";
import { User, Election, VoteTransaction, Candidate } from "../types/voting";
import { toast } from "sonner";

interface VotingContextType {
  user: User | null;
  elections: Election[];
  transactions: VoteTransaction[];
  login: (email: string, role: "VOTER" | "ADMIN") => void;
  logout: () => void;
  castVote: (electionId: string, candidateId: string) => Promise<void>;
  createElection: (election: Omit<Election, "id" | "votersCount">) => void;
  isLoading: boolean;
}

const VotingContext = createContext<VotingContextType | undefined>(undefined);

const INITIAL_ELECTIONS: Election[] = [
  {
    id: "1",
    title: "National Student Council 2025",
    description: "Annual election for the university student council representatives.",
    startTime: new Date().toISOString(),
    endTime: new Date(Date.now() + 86400000 * 7).toISOString(),
    status: "ACTIVE",
    votersCount: 1250,
    candidates: [
      { id: "c1", name: "Alex Johnson", party: "Student Voice", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex", votes: 450 },
      { id: "c2", name: "Sarah Williams", party: "Tech Pioneers", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah", votes: 800 },
    ],
  },
  {
    id: "2",
    title: "Community Board Members",
    description: "Local community board elections for urban development.",
    startTime: new Date(Date.now() + 86400000).toISOString(),
    endTime: new Date(Date.now() + 86400000 * 3).toISOString(),
    status: "UPCOMING",
    votersCount: 0,
    candidates: [
      { id: "c3", name: "Michael Chen", party: "Green Future", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael", votes: 0 },
      { id: "c4", name: "Elena Rodriguez", party: "Urban Growth", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Elena", votes: 0 },
    ],
  },
];

export const VotingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [elections, setElections] = useState<Election[]>(INITIAL_ELECTIONS);
  const [transactions, setTransactions] = useState<VoteTransaction[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const login = (email: string, role: "VOTER" | "ADMIN") => {
    const newUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      name: email.split("@")[0],
      email,
      role,
      verified: true,
      voterId: role === "VOTER" ? `VOT-${Math.floor(1000 + Math.random() * 9000)}` : undefined,
    };
    setUser(newUser);
    toast.success(`Welcome back, ${newUser.name}!`);
  };

  const logout = () => {
    setUser(null);
    toast.info("Logged out successfully");
  };

  const castVote = async (electionId: string, candidateId: string) => {
    setIsLoading(true);
    // Simulate blockchain confirmation
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const prevHash = transactions.length > 0 ? transactions[transactions.length - 1].hash : "0000000000000000";
    const newHash = btoa(Math.random().toString()).substring(0, 16);

    const newTransaction: VoteTransaction = {
      id: Math.random().toString(36).substr(2, 9),
      electionId,
      candidateId,
      timestamp: new Date().toISOString(),
      hash: newHash,
      previousHash: prevHash,
    };

    setTransactions((prev) => [...prev, newTransaction]);
    setElections((prev) =>
      prev.map((el) => {
        if (el.id === electionId) {
          return {
            ...el,
            candidates: el.candidates.map((cand) =>
              cand.id === candidateId ? { ...cand, votes: cand.votes + 1 } : cand
            ),
          };
        }
        return el;
      })
    );

    setIsLoading(false);
    toast.success("Vote securely recorded on blockchain!");
  };

  const createElection = (electionData: Omit<Election, "id" | "votersCount">) => {
    const newElection: Election = {
      ...electionData,
      id: (elections.length + 1).toString(),
      votersCount: 0,
    };
    setElections((prev) => [...prev, newElection]);
    toast.success("Election created successfully");
  };

  return (
    <VotingContext.Provider value={{ user, elections, transactions, login, logout, castVote, createElection, isLoading }}>
      {children}
    </VotingContext.Provider>
  );
};

export const useVoting = () => {
  const context = useContext(VotingContext);
  if (!context) throw new Error("useVoting must be used within a VotingProvider");
  return context;
};