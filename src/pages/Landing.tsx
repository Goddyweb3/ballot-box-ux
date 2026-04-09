import React from "react";
import { motion } from "framer-motion";
import { Button } from "../components/ui/button";
import { Shield, Lock, Globe, CheckCircle, BarChart3, Database, ArrowRight } from "lucide-react";
import { Link } from "react-router";

export const Landing: React.FC = () => {
  const features = [
    {
      title: "Blockchain Powered",
      description: "Immutable ledger ensures that every vote is tamper-proof and verifiable by the public.",
      icon: Database,
    },
    {
      title: "End-to-End Encryption",
      description: "Your vote is encrypted at the source, ensuring complete anonymity and privacy.",
      icon: Lock,
    },
    {
      title: "Real-time Transparency",
      description: "Monitor election progress with live statistics and blockchain transaction hashes.",
      icon: BarChart3,
    },
    {
      title: "Smart Verification",
      description: "Unique voter IDs and multi-factor authentication prevent duplicate or fraudulent voting.",
      icon: CheckCircle,
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-24 md:py-32 bg-slate-50 dark:bg-slate-900/50">
        <div className="container mx-auto px-4 relative z-10 text-center max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              <Shield className="h-4 w-4" />
              Next-Generation Online Voting
            </div>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
              The Future of <span className="text-primary">Secure Elections</span> is Here
            </h1>
            <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
              Decentralized, transparent, and immutable voting system powered by blockchain technology. Ensure every voice is heard and every vote counts.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/register">
                <Button size="lg" className="h-14 px-8 text-lg gap-2">
                  Get Started <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
              <Link to="/ledger">
                <Button variant="outline" size="lg" className="h-14 px-8 text-lg gap-2">
                  View Blockchain Explorer <Globe className="h-5 w-5" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Hero Image / Illustration Simulation */}
        <motion.div 
          className="container mx-auto px-4 mt-16"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          <div className="relative rounded-2xl overflow-hidden border shadow-2xl bg-background max-w-5xl mx-auto">
             <img 
               src="https://storage.googleapis.com/dala-prod-public-storage/generated-images/c87a305f-319c-4e3b-be86-86b37f593a24/hero-image-840516f4-1775667529949.webp" 
               alt="Secure Voting Interface" 
               className="w-full h-auto opacity-90"
             />
             <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Core Security Features</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our system is built on industry-standard security protocols to ensure the integrity of the democratic process.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="p-8 rounded-2xl border bg-card hover:shadow-lg transition-all border-slate-200 dark:border-slate-800"
              >
                <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-24 bg-primary text-primary-foreground overflow-hidden">
        <div className="container mx-auto px-4 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-5xl font-bold mb-6">Built for Uncompromising Integrity</h2>
              <p className="text-primary-foreground/80 text-lg mb-8">
                SecuVote eliminates the "black box" of traditional digital voting. Every transaction hash is publicly verifiable while maintaining absolute voter anonymity.
              </p>
              <ul className="space-y-4">
                {["AES-256 Encryption", "Decentralized Ledger", "SHA-256 Hashing", "MFA Authentication"].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-400" />
                    <span className="font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative">
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                className="opacity-20 absolute -inset-20 flex items-center justify-center"
              >
                 <Globe className="w-full h-full text-white" />
              </motion.div>
              <div className="relative z-10 p-8 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20">
                <div className="space-y-6">
                  <div className="p-4 rounded-xl bg-white/10 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                       <div className="h-3 w-3 rounded-full bg-green-500 animate-pulse" />
                       <span className="text-sm font-mono">NODE_ACTIVE: 0x4f...a2</span>
                    </div>
                    <span className="text-xs font-mono opacity-60">12ms latency</span>
                  </div>
                  <div className="h-32 flex items-end gap-1 px-2">
                    {[40, 70, 45, 90, 65, 80, 50, 85, 95, 60, 75].map((h, i) => (
                      <motion.div 
                        key={i} 
                        initial={{ height: 0 }}
                        animate={{ height: `${h}%` }}
                        transition={{ duration: 1, delay: i * 0.1 }}
                        className="flex-1 bg-white/30 rounded-t-sm" 
                      />
                    ))}
                  </div>
                  <p className="text-center font-mono text-xs opacity-70 italic">Blockchain Network Verification in Progress...</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};