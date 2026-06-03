
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
  Users
} from "lucide-react"
import Image from "next/image"
import { PlaceHolderImages } from "@/lib/placeholder-images"

export default function LandingPage() {
  const heroImage = PlaceHolderImages.find(img => img.id === 'hero-dashboard')
  const aiImage = PlaceHolderImages.find(img => img.id === 'feature-ai')

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Navigation */}
      <header className="px-6 lg:px-12 h-20 flex items-center justify-between border-b bg-white/50 backdrop-blur-md sticky top-0 z-50">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-white">
            <Mail className="h-5 w-5" />
          </div>
          <span className="text-xl font-bold tracking-tight text-primary">EduMail QA</span>
        </Link>
        <nav className="hidden md:flex gap-8">
          <Link href="#features" className="text-sm font-medium hover:text-accent transition-colors">Features</Link>
          <Link href="#how-it-works" className="text-sm font-medium hover:text-accent transition-colors">How it Works</Link>
          <Link href="#pricing" className="text-sm font-medium hover:text-accent transition-colors">Pricing</Link>
        </nav>
        <div className="flex items-center gap-4">
          <Button variant="ghost" asChild className="hidden sm:flex">
            <Link href="/login">Log in</Link>
          </Button>
          <Button asChild className="bg-accent hover:bg-accent/90">
            <Link href="/signup">Get Started</Link>
          </Button>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 lg:py-32 px-6">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-in fade-in slide-in-from-left-8 duration-1000">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-sm font-semibold">
                <Sparkles className="h-4 w-4" />
                <span>Next-Gen Advisor Quality Assurance</span>
              </div>
              <h1 className="text-5xl lg:text-7xl font-black tracking-tight text-primary leading-[1.1]">
                Elevate Every <span className="text-accent">Student</span> Conversation.
              </h1>
              <p className="text-xl text-muted-foreground max-w-[600px] leading-relaxed">
                Automated AI evaluation for education advisor emails. Ensure compliance, accuracy, and empathy in every response with real-time feedback.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" asChild className="h-14 px-8 text-lg font-bold bg-primary hover:bg-primary/90">
                  <Link href="/signup">Start Free Trial <ArrowRight className="ml-2 h-5 w-5" /></Link>
                </Button>
                <Button size="lg" variant="outline" asChild className="h-14 px-8 text-lg font-bold border-2">
                  <Link href="/dashboard/sandbox">Try the Sandbox</Link>
                </Button>
              </div>
              <div className="flex items-center gap-6 pt-4">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="h-10 w-10 rounded-full border-2 border-background bg-muted overflow-hidden">
                      <Image 
                        src={`https://picsum.photos/seed/user-${i}/100/100`} 
                        alt="User" 
                        width={40} 
                        height={40} 
                      />
                    </div>
                  ))}
                </div>
                <p className="text-sm text-muted-foreground font-medium">
                  Trusted by <span className="text-primary font-bold">500+</span> education leads nationwide.
                </p>
              </div>
            </div>
            <div className="relative animate-in fade-in slide-in-from-right-8 duration-1000">
              <div className="absolute -inset-4 bg-accent/20 rounded-[2rem] blur-3xl" />
              <Card className="relative border-none shadow-2xl overflow-hidden rounded-[2rem]">
                <Image 
                  src={heroImage?.imageUrl || ""} 
                  alt={heroImage?.description || ""} 
                  width={1200} 
                  height={800} 
                  className="w-full h-auto"
                  data-ai-hint={heroImage?.imageHint}
                />
              </Card>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section id="features" className="py-24 bg-primary text-white overflow-hidden relative">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-accent/5 skew-x-12 transform translate-x-1/2" />
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="text-center space-y-4 mb-20">
              <h2 className="text-3xl lg:text-5xl font-bold tracking-tight">Powerful QA Metrics</h2>
              <p className="text-primary-foreground/60 max-w-2xl mx-auto text-lg">
                Our AI analyzes five critical dimensions of every advisor communication.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { title: "Compliance Guard", desc: "Instantly detect FERPA violations and policy deviations.", icon: ShieldCheck },
                { title: "Tone Analysis", desc: "Ensure your advisors maintain a professional and empathetic voice.", icon: MessageSquare },
                { title: "Accuracy Check", desc: "Validate program details, dates, and requirements automatically.", icon: CheckCircle2 },
                { title: "Performance Scorecards", desc: "Deep-dive analytics for team leads to track growth over time.", icon: BarChart3 },
                { title: "Real-time Feedback", desc: "Immediate suggestions for improvement before emails are sent.", icon: Sparkles },
                { title: "Team Management", desc: "Seamlessly oversee dozens of advisors from a single dashboard.", icon: Users },
              ].map((feature, idx) => (
                <Card key={idx} className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all border shadow-none">
                  <CardContent className="p-8 space-y-4">
                    <div className="h-12 w-12 rounded-xl bg-accent flex items-center justify-center shadow-lg shadow-accent/20">
                      <feature.icon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-xl font-bold">{feature.title}</h3>
                    <p className="text-primary-foreground/70 leading-relaxed">{feature.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-24 px-6 bg-accent">
          <div className="max-w-4xl mx-auto text-center space-y-8 text-white">
            <h2 className="text-4xl lg:text-6xl font-black tracking-tight">Ready to improve advisor quality?</h2>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              Join hundreds of institutions using AI to ensure consistent, compliant, and compassionate communication.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button size="lg" variant="secondary" asChild className="h-16 px-10 text-xl font-bold text-primary">
                <Link href="/signup">Create Your Free Account</Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="h-16 px-10 text-xl font-bold border-white text-white hover:bg-white/10">
                <Link href="/dashboard">View Demo Dashboard</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-12 px-6 border-t bg-white">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent text-white">
              <Mail className="h-4 w-4" />
            </div>
            <span className="text-lg font-bold tracking-tight text-primary">EduMail QA</span>
          </div>
          <p className="text-sm text-muted-foreground">
            © 2024 EduMail QA. All rights reserved. Powered by Generative AI.
          </p>
          <div className="flex gap-6">
            <Link href="#" className="text-sm text-muted-foreground hover:text-primary">Privacy</Link>
            <Link href="#" className="text-sm text-muted-foreground hover:text-primary">Terms</Link>
            <Link href="#" className="text-sm text-muted-foreground hover:text-primary">Contact</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
