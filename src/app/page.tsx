
"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card"
import { 
  Mail, 
  Sparkles, 
  ShieldCheck, 
  BarChart3, 
  CheckCircle2, 
  ArrowRight,
  Users,
  Zap,
  Globe,
  Lock,
  Heart,
  UserCheck,
  FileText,
  BookOpen,
  Scale,
  Clock,
  Send,
  AlertTriangle
} from "lucide-react"
import { Badge } from "@/components/ui/badge"

const RUBRIC_PARAMETERS = [
  { title: "Polite Greeting", weight: 5, icon: UserCheck, desc: "Person-focused opening with proper student address." },
  { title: "Issue Recognition", weight: 15, icon: FileText, desc: "Restating the contact reason clearly in the first paragraph." },
  { title: "Clear Structure", weight: 10, icon: BookOpen, desc: "Organized layout with short paragraphs and bullet points." },
  { title: "Grammar & Tone", weight: 15, icon: Heart, desc: "Professional empathy. Zero tolerance for blame or sarcasm.", fatal: true },
  { title: "Policy Accuracy", weight: 15, icon: Scale, desc: "Correct university policy resolution and information.", fatal: true },
  { title: "Clear Next Steps", weight: 10, icon: ArrowRight, desc: "Explicitly defined actions for both student and advisor." },
  { title: "Timelines Set", weight: 10, icon: Clock, desc: "Specific timeframes (e.g. 48 hours) instead of 'soon'." },
  { title: "Support Channel", weight: 5, icon: Send, desc: "Correct portal sections or escalation paths provided." },
  { title: "Professional Closing", weight: 5, icon: CheckCircle2, desc: "Polite closing with full name, role, and department." },
  { title: "Student Confidence", weight: 10, icon: Sparkles, desc: "Ensures the student has zero remaining ambiguity." },
]

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background selection:bg-accent/30">
      {/* Navigation */}
      <header className="px-6 lg:px-12 h-20 flex items-center justify-between border-b bg-white/80 backdrop-blur-xl sticky top-0 z-50">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-white shadow-lg shadow-primary/20 group-hover:bg-accent transition-colors duration-300">
            <Mail className="h-5 w-5" />
          </div>
          <span className="text-xl font-black tracking-tight text-primary">EduMail <span className="text-accent">QA</span></span>
        </Link>
        
        <nav className="hidden md:flex gap-8 items-center text-sm font-semibold text-muted-foreground">
          <Link href="#features" className="hover:text-accent transition-colors">Features</Link>
          <Link href="#rubric" className="hover:text-accent transition-colors">Rubric</Link>
        </nav>

        <div className="flex items-center gap-4">
          <Button asChild className="bg-accent hover:bg-accent/90 text-white font-bold rounded-full px-6">
            <Link href="/login">Log in</Link>
          </Button>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative pt-20 pb-32 lg:pt-32 lg:pb-48 px-6 overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full -z-10">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2" />
          </div>

          <div className="max-w-7xl mx-auto text-center space-y-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/5 border border-primary/10 text-primary text-xs font-bold uppercase tracking-widest animate-in fade-in slide-in-from-top-4 duration-1000">
              <Sparkles className="h-3.5 w-3.5 text-accent" />
              <span>AI-Powered Quality Assurance</span>
            </div>
            
            <motion.div
  initial={{ opacity: 0, y: 60 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{
    duration: 0.8,
    ease: "easeOut",
    staggerChildren: 0.2,
  }}
>
  <motion.h1
    initial={{ opacity: 0, y: 40 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8 }}
    className="text-6xl lg:text-8xl font-black tracking-tighter text-primary leading-[0.9]"
  >
    Perfect Every <br />
    <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
      Email Analysis.
    </span>
  </motion.h1>

  <motion.p
    initial={{ opacity: 0, y: 40 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.3, duration: 0.8 }}
    className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed mt-8"
  >
    The only automated evaluation platform built for education advisors.
    Ensure institutional policy compliance, empathy, and accuracy in every
    interaction.
  </motion.p>
</motion.div>

            {/* Rubric Section */}
            <div id="rubric" className="pt-24 max-w-6xl mx-auto animate-in fade-in zoom-in-95 duration-1000 delay-500">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-black text-primary mb-2">The Excellence Rubric</h2>
                <p className="text-muted-foreground">Our AI evaluates advisor communications across 10 mission-critical parameters.</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                {RUBRIC_PARAMETERS.map((param) => (
                  <Card key={param.title} className="border-none shadow-md bg-white hover:shadow-lg transition-all text-left group">
                    <CardContent className="p-5 space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="p-2 rounded-lg bg-primary/5 group-hover:bg-accent/10 transition-colors">
                          <param.icon className="h-5 w-5 text-primary group-hover:text-accent transition-colors" />
                        </div>
                        <div className="flex flex-col items-end">
                          <span className="text-[10px] font-black uppercase text-muted-foreground">Weight</span>
                          <span className="text-sm font-bold text-primary">{param.weight} pts</span>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-bold text-sm tracking-tight">{param.title}</h3>
                          {param.fatal && (
                            <Badge variant="destructive" className="text-[8px] h-3 px-1 uppercase font-black">Fatal</Badge>
                          )}
                        </div>
                        <p className="text-[11px] text-muted-foreground leading-tight">
                          {param.desc}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="mt-8 p-4 rounded-2xl bg-destructive/5 border border-destructive/10 inline-flex items-center gap-3">
                <AlertTriangle className="h-5 w-5 text-destructive" />
                <p className="text-xs font-medium text-destructive">
                  <strong>Fatal parameters</strong> (Grammar & Policy) require a minimum 50% score for overall evaluation pass.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Features Bento Grid */}
        <section id="features" className="py-32 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
              <div className="space-y-4">
                <h2 className="text-4xl lg:text-6xl font-black tracking-tighter text-primary">Built for High-Growth <br />Education Teams.</h2>
              </div>
              <p className="text-lg text-muted-foreground max-w-md">
                Monitor performance at scale without sacrificing the personal touch students expect from their advisors.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-6 md:grid-rows-2 gap-6 h-auto md:h-[600px]">
              <Card className="md:col-span-3 md:row-span-1 bg-primary text-white border-none overflow-hidden relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-transparent" />
                <CardContent className="p-10 relative z-10 flex flex-col justify-between h-full">
                  <ShieldCheck className="h-12 w-12 text-accent mb-6" />
                  <div>
                    <h3 className="text-2xl font-bold mb-2">Policy Compliance</h3>
                    <p className="text-primary-foreground/70">Automatic detection of privacy data leaks and institutional policy violations before they happen.</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="md:col-span-3 md:row-span-1 bg-accent text-white border-none overflow-hidden relative group">
                <CardContent className="p-10 flex flex-col justify-between h-full">
                  <BarChart3 className="h-12 w-12 text-white/80 mb-6" />
                  <div>
                    <h3 className="text-2xl font-bold mb-2">Audit Intelligence</h3>
                    <p className="text-white/80">Track individual advisor growth with longitudinal data and comparative benchmarks across 10 key parameters.</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="md:col-span-2 md:row-span-1 border-none bg-muted/30 hover:bg-muted/50 transition-colors">
                <CardContent className="p-10 flex flex-col justify-center items-center text-center h-full">
                  <Heart className="h-10 w-10 text-red-500 mb-4" />
                  <h3 className="text-xl font-bold mb-2">Empathy Scoring</h3>
                  <p className="text-sm text-muted-foreground">AI-driven sentiment analysis ensures your tone remains supportive and professional.</p>
                </CardContent>
              </Card>

              <Card className="md:col-span-2 md:row-span-1 border-none bg-muted/30 hover:bg-muted/50 transition-colors">
                <CardContent className="p-10 flex flex-col justify-center items-center text-center h-full">
                  <CheckCircle2 className="h-10 w-10 text-green-500 mb-4" />
                  <h3 className="text-xl font-bold mb-2">Accuracy Guard</h3>
                  <p className="text-sm text-muted-foreground">Verify program facts and deadlines against your institutional guidelines.</p>
                </CardContent>
              </Card>

              <Card className="md:col-span-2 md:row-span-1 border-none bg-muted/30 hover:bg-muted/50 transition-colors">
                <CardContent className="p-10 flex flex-col justify-center items-center text-center h-full">
                  <Users className="h-10 w-10 text-accent mb-4" />
                  <h3 className="text-xl font-bold mb-2">Team Sync</h3>
                  <p className="text-sm text-muted-foreground">Easily manage permissions and roles for team leads and individual advisors.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-32 px-6">
          <div className="max-w-5xl mx-auto">
            <div className="bg-primary rounded-[3rem] p-12 lg:p-24 text-center space-y-10 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-full h-full bg-accent/5 -skew-x-12 translate-x-1/2" />
              <div className="relative z-10 space-y-6">
                <h2 className="text-4xl lg:text-6xl font-black text-white tracking-tight">Ready to transform your <br />email quality assurance?</h2>
                <p className="text-xl text-primary-foreground/60 max-w-xl mx-auto">
                  Join hundreds of education leaders today and start delivering excellence in every email analysis.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
                  <Button size="lg" asChild className="bg-accent hover:bg-accent/90 text-white font-black h-16 px-10 rounded-full">
                    <Link href="/login">Log in</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-20 px-6 border-t bg-white">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12">
          <div className="col-span-2 space-y-6">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-white">
                <Mail className="h-5 w-5" />
              </div>
              <span className="text-xl font-black tracking-tight text-primary">EduMail <span className="text-accent">QA</span></span>
            </Link>
            <p className="text-muted-foreground max-w-xs">
              Empowering education advisors with AI-driven insights to deliver world-class institutional support.
            </p>
          </div>
          <div className="space-y-4">
            <h4 className="font-bold text-primary">Product</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="#features" className="hover:text-accent">Features</Link></li>
              <li><Link href="#rubric" className="hover:text-accent">Rubric</Link></li>
              <li><Link href="/compliance" className="hover:text-accent">Compliance</Link></li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="font-bold text-primary">Legal</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/privacy" className="hover:text-accent">
  Privacy Policy
</Link></li>
              <li><Link href="/terms-of-service" className="hover:text-accent">Terms of Service</Link></li>
              <li><Link href="#" className="hover:text-accent">Institutional Statement</Link></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-20 pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © 2026 Excelerate. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <Link href="#" className="hover:text-primary transition-colors flex items-center gap-1.5"><Globe className="h-4 w-4" /> English (US)</Link>
            <Link href="#" className="hover:text-primary transition-colors flex items-center gap-1.5"><Lock className="h-4 w-4" /> Secure Data</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
