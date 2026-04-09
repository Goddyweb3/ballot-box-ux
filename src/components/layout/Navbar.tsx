import React from "react";
import { Link, useNavigate } from "react-router";
import { useVoting } from "../../hooks/useVoting";
import { Button } from "../ui/button";
import { Shield, LayoutDashboard, LogOut, Menu, X, Database } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const Navbar: React.FC = () => {
  const { user, logout } = useVoting();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary shadow-lg shadow-primary/20">
            <Shield className="h-6 w-6 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold tracking-tight">SecuVote</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6">
          <Link to="/" className="text-sm font-medium hover:text-primary transition-colors">Home</Link>
          {user && (
            <>
              <Link 
                to={user.role === "ADMIN" ? "/admin" : "/dashboard"} 
                className="text-sm font-medium hover:text-primary transition-colors flex items-center gap-1"
              >
                <LayoutDashboard className="h-4 w-4" />
                Dashboard
              </Link>
              <Link to="/ledger" className="text-sm font-medium hover:text-primary transition-colors flex items-center gap-1">
                <Database className="h-4 w-4" />
                Blockchain
              </Link>
            </>
          )}
          
          <div className="flex items-center gap-3">
            {!user ? (
              <>
                <Link to="/login">
                  <Button variant="ghost" size="sm">Login</Button>
                </Link>
                <Link to="/register">
                  <Button size="sm">Get Started</Button>
                </Link>
              </>
            ) : (
              <div className="flex items-center gap-4 border-l pl-4">
                <div className="text-right">
                  <p className="text-xs font-semibold">{user.name}</p>
                  <p className="text-[10px] text-muted-foreground uppercase">{user.role}</p>
                </div>
                <Button variant="ghost" size="icon" onClick={handleLogout} className="text-destructive hover:bg-destructive/10">
                  <LogOut className="h-5 w-5" />
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t bg-background px-4 py-4"
          >
            <div className="flex flex-col gap-4">
              <Link to="/" className="text-lg font-medium" onClick={() => setIsMenuOpen(false)}>Home</Link>
              {user && (
                <>
                  <Link to={user.role === "ADMIN" ? "/admin" : "/dashboard"} className="text-lg font-medium" onClick={() => setIsMenuOpen(false)}>Dashboard</Link>
                  <Link to="/ledger" className="text-lg font-medium" onClick={() => setIsMenuOpen(false)}>Blockchain</Link>
                </>
              )}
              {!user ? (
                <div className="grid grid-cols-2 gap-2">
                  <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                    <Button variant="outline" className="w-full">Login</Button>
                  </Link>
                  <Link to="/register" onClick={() => setIsMenuOpen(false)}>
                    <Button className="w-full">Register</Button>
                  </Link>
                </div>
              ) : (
                <Button variant="destructive" className="w-full" onClick={() => { handleLogout(); setIsMenuOpen(false); }}>
                  Logout
                </Button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};