import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import { VotingProvider, useVoting } from "./hooks/useVoting";
import { Navbar } from "./components/layout/Navbar";
import { Landing } from "./pages/Landing";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { VoterDashboard } from "./pages/voter/VoterDashboard";
import { ElectionDetails } from "./pages/voter/ElectionDetails";
import { AdminDashboard } from "./pages/admin/AdminDashboard";
import { BlockchainExplorer } from "./components/BlockchainExplorer";
import { Toaster } from "./components/ui/sonner";
import { ReactNode } from "react";

const ProtectedRoute = ({ children, role }: { children: ReactNode; role?: "VOTER" | "ADMIN" }) => {
  const { user } = useVoting();
  if (!user) return <Navigate to="/login" replace />;
  if (role && user.role !== role) return <Navigate to="/" replace />;
  return <>{children}</>;
};

function AppRoutes() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/ledger" element={<BlockchainExplorer />} />
          
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute role="VOTER">
                <VoterDashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/election/:id" 
            element={
              <ProtectedRoute role="VOTER">
                <ElectionDetails />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin" 
            element={
              <ProtectedRoute role="ADMIN">
                <AdminDashboard />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </main>
      <Toaster position="top-right" richColors />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <VotingProvider>
        <AppRoutes />
      </VotingProvider>
    </BrowserRouter>
  );
}

export default App;