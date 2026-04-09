import React from "react";
import { motion } from "framer-motion";
import { Shield, Mail, User, Lock, ArrowRight } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../components/ui/card";
import { Link, useNavigate } from "react-router";
import { toast } from "sonner";

export const Register: React.FC = () => {
  const navigate = useNavigate();

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Account created! You can now log in.");
    navigate("/login");
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4 bg-slate-50 dark:bg-slate-900/50">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-xl"
      >
        <Card className="shadow-xl border-slate-200 dark:border-slate-800">
          <div className="grid grid-cols-1 md:grid-cols-5">
             <div className="md:col-span-2 bg-primary p-8 text-primary-foreground hidden md:flex flex-col justify-between">
                <div>
                  <Shield className="h-12 w-12 mb-6" />
                  <h2 className="text-2xl font-bold mb-4">Join SecuVote</h2>
                  <p className="text-primary-foreground/80 text-sm leading-relaxed">
                    Access a secure, blockchain-verified voting platform. Your identity is protected, and your vote is immutable.
                  </p>
                </div>
                <div className="space-y-4">
                  {[
                    "Biometric Verification",
                    "Unique Voter ID",
                    "Tamper-proof Ledger"
                  ].map((text, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs">
                      <div className="h-1.5 w-1.5 rounded-full bg-white" />
                      {text}
                    </div>
                  ))}
                </div>
             </div>

             <div className="md:col-span-3 p-8">
               <CardHeader className="p-0 mb-6">
                 <CardTitle className="text-2xl font-bold">Create Account</CardTitle>
                 <CardDescription>Register as a voter to start participating</CardDescription>
               </CardHeader>
               
               <form onSubmit={handleRegister} className="space-y-4">
                 <div className="space-y-2">
                    <label className="text-sm font-medium">Full Name</label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input className="pl-10" placeholder="John Doe" required />
                    </div>
                 </div>
                 <div className="space-y-2">
                    <label className="text-sm font-medium">Email Address</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input className="pl-10" type="email" placeholder="name@example.com" required />
                    </div>
                 </div>
                 <div className="space-y-2">
                    <label className="text-sm font-medium">Password</label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input className="pl-10" type="password" placeholder="••••••••" required />
                    </div>
                 </div>
                 
                 <div className="pt-4">
                   <Button type="submit" className="w-full h-11 text-lg gap-2">
                     Register Now <ArrowRight className="h-4 w-4" />
                   </Button>
                 </div>
               </form>

               <div className="mt-8 pt-6 border-t text-center text-sm">
                 <span className="text-muted-foreground">Already have an account? </span>
                 <Link to="/login" className="text-primary font-semibold hover:underline">
                   Login here
                 </Link>
               </div>
             </div>
          </div>
        </Card>
      </motion.div>
    </div>
  );
};