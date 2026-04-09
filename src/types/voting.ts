import { LucideIcon } from "lucide-react";

export type UserRole = "VOTER" | "ADMIN" | "OBSERVER";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  verified: boolean;
  voterId?: string;
}

export interface Candidate {
  id: string;
  name: string;
  party: string;
  avatar: string;
  votes: number;
}

export interface Election {
  id: string;
  title: string;
  description: string;
  startTime: string;
  endTime: string;
  status: "UPCOMING" | "ACTIVE" | "COMPLETED";
  candidates: Candidate[];
  votersCount: number;
}

export interface VoteTransaction {
  id: string;
  electionId: string;
  candidateId: string;
  timestamp: string;
  hash: string;
  previousHash: string;
}

export interface Feature {
  title: string;
  description: string;
  icon: LucideIcon;
}