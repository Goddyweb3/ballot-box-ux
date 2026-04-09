import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion } from "framer-motion";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../components/ui/form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Shield, User, Lock, Mail } from "lucide-react";
import { useVoting } from "../hooks/useVoting";
import { useNavigate } from "react-router";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  role: z.enum(["VOTER", "ADMIN"]),
});

export const Login: React.FC = () => {
  const { login } = useVoting();
  const navigate = useNavigate();
  const [role, setRole] = React.useState<"VOTER" | "ADMIN">("VOTER");

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      role: "VOTER",
    },
  });

  const onSubmit = (values: z.infer<typeof loginSchema>) => {
    login(values.email, values.role);
    if (values.role === "ADMIN") {
      navigate("/admin");
    } else {
      navigate("/dashboard");
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4 bg-slate-50 dark:bg-slate-900/50">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md"
      >
        <Card className="shadow-xl border-slate-200 dark:border-slate-800">
          <CardHeader className="space-y-1 text-center">
            <div className="mx-auto h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <Shield className="h-6 w-6 text-primary" />
            </div>
            <CardTitle className="text-2xl font-bold">Secure Login</CardTitle>
            <CardDescription>
              Enter your credentials to access the voting portal
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="VOTER" className="w-full mb-6" onValueChange={(val) => setRole(val as "VOTER" | "ADMIN")}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="VOTER">Voter Portal</TabsTrigger>
                <TabsTrigger value="ADMIN">Admin Console</TabsTrigger>
              </TabsList>
            </Tabs>

            <Form {...form}>
              <form onSubmit={form.handleSubmit((v) => onSubmit({...v, role}))} className="space-y-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email Address</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input className="pl-10" placeholder="name@example.com" {...field} />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input type="password" className="pl-10" placeholder="••••••••" {...field} />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full h-11" size="lg">
                  Sign In to {role === "ADMIN" ? "Admin" : "Voter"} Account
                </Button>
              </form>
            </Form>
            
            <div className="mt-6 text-center text-sm">
              <span className="text-muted-foreground">Don't have an account? </span>
              <button onClick={() => navigate("/register")} className="text-primary font-semibold hover:underline">
                Register here
              </button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};