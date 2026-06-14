"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { 
  Mail, 
  Sparkles, 
  ShieldCheck, 
  BarChart3, 
  CheckCircle2, 
  ArrowRight,
  MessageSquare,
  Users,
  Zap,
  Globe,
  Lock,
  Heart
} from "lucide-react"
import Image from "next/image"
import { PlaceHolderImages } from "@/lib/placeholder-images"

export default function LandingPage() {
  const heroImage = PlaceHolderImages.find(img => img.id === 'hero-dashboard')

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
          <Link href="#metrics" className="hover:text-accent transition-colors">Metrics</Link>
          <Link href="/dashboard/sandbox" className="hover:text-accent transition-colors flex items-center gap-1.5">
            <Zap className="h-3.5 w-3.5 fill-current" /> Sandbox
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <Link href="/login" className="text-sm font-bold text-primary hover:text-accent transition-colors px-4 py-2">
            Log in
          </Link>
          <Button asChild className="bg-accent hover:bg-accent/90 text-white font-bold rounded-full px-6">
            <Link href="/signup">Get Started</Link>
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
            
            <h1 className="text-6xl lg:text-8xl font-black tracking-tighter text-primary leading-[0.9] animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-100">
              Perfect Every <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Student Contact.</span>
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
              The only automated evaluation platform built for education advisors. Ensure FERPA compliance, empathy, and accuracy in every single email.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
              <Button size="lg" asChild className="h-16 px-10 text-lg font-bold bg-primary hover:bg-primary/90 shadow-xl shadow-primary/20 rounded-full group">
                <Link href="/signup" className="flex items-center gap-2">
                  Get Started Now <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="h-16 px-10 text-lg font-bold border-2 rounded-full">
                <Link href="/dashboard/sandbox">Try Live Sandbox</Link>
              </Button>
            </div>

            <div className="pt-20 animate-in fade-in zoom-in-95 duration-1000 delay-500">
              <Card className="relative border-none shadow-[0_32px_64px_-16px_rgba(0,0,0,0.15)] overflow-hidden rounded-[2.5rem] max-w-5xl mx-auto ring-1 ring-primary/5">
                <Image 
                  src={heroImage?.imageUrl || ""} 
                  alt={heroImage?.description || ""} 
                  width={1200} 
                  height={800} 
                  className="w-full h-auto"
                  priority
                  data-ai-hint={heroImage?.imageHint}
                />
              </Card>
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
                    <h3 className="text-2xl font-bold mb-2">FERPA Compliance</h3>
                    <p className="text-primary-foreground/70">Automatic detection of student data leaks and policy violations before they happen.</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="md:col-span-3 md:row-span-1 bg-accent text-white border-none overflow-hidden relative group">
                <CardContent className="p-10 flex flex-col justify-between h-full">
                  <BarChart3 className="h-12 w-12 text-white/80 mb-6" />
                  <div>
                    <h3 className="text-2xl font-bold mb-2">Performance Analytics</h3>
                    <p className="text-white/80">Track individual advisor growth with longitudinal data and comparative benchmarks.</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="md:col-span-2 md:row-span-1 border-none bg-muted/30 hover:bg-muted/50 transition-colors">
                <CardContent className="p-10 flex flex-col justify-center items-center text-center h-full">
                  <Heart className="h-10 w-10 text-red-500 mb-4" />
                  <h3 className="text-xl font-bold mb-2">Empathy Scoring</h3>
                  <p className="text-sm text-muted-foreground">AI-driven sentiment analysis ensures your tone remains supportive.</p>
                </CardContent>
              </Card>

              <Card className="md:col-span-2 md:row-span-1 border-none bg-muted/30 hover:bg-muted/50 transition-colors">
                <CardContent className="p-10 flex flex-col justify-center items-center text-center h-full">
                  <CheckCircle2 className="h-10 w-10 text-green-500 mb-4" />
                  <h3 className="text-xl font-bold mb-2">Accuracy Guard</h3>
                  <p className="text-sm text-muted-foreground">Verify program facts and deadlines against your institution's knowledge base.</p>
                </CardContent>
              </Card>

              <Card className="md:col-span-2 md:row-span-1 border-none bg-muted/30 hover:bg-muted/50 transition-colors">
                <CardContent className="p-10 flex flex-col justify-center items-center text-center h-full">
                  <Users className="h-10 w-10 text-accent mb-4" />
                  <h3 className="text-xl font-bold mb-2">Team Sync</h3>
                  <p className="text-sm text-muted-foreground">Easily manage permissions and roles for leads and advisors.</p>
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
                <h2 className="text-4xl lg:text-6xl font-black text-white tracking-tight">Ready to transform your <br />student experience?</h2>
                <p className="text-xl text-primary-foreground/60 max-w-xl mx-auto">
                  Join 500+ education leaders today and start delivering excellence in every interaction.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
                  <Button size="lg" asChild className="bg-accent hover:bg-accent/90 text-white font-black h-16 px-10 rounded-full">
                    <Link href="/signup">Create Account</Link>
                  </Button>
                  <Button size="lg" variant="outline" asChild className="border-white/20 text-white hover:bg-white/10 font-black h-16 px-10 rounded-full">
                    <Link href="/dashboard">View Live Demo</Link>
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
              Empowering education advisors with AI-driven insights to deliver world-class student support.
            </p>
          </div>
          <div className="space-y-4">
            <h4 className="font-bold text-primary">Product</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="#features" className="hover:text-accent">Features</Link></li>
              <li><Link href="/dashboard/sandbox" className="hover:text-accent">Sandbox</Link></li>
              <li><Link href="#" className="hover:text-accent">Compliance</Link></li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="font-bold text-primary">Legal</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="#" className="hover:text-accent">Privacy Policy</Link></li>
              <li><Link href="#" className="hover:text-accent">Terms of Service</Link></li>
              <li><Link href="#" className="hover:text-accent">FERPA Statement</Link></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-20 pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © 2024 EduMail QA. All rights reserved.
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
