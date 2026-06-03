
"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail, ArrowLeft, Loader2, ShieldCheck, Sparkles, BarChart3 } from "lucide-react"
import { useRouter } from "next/navigation"

export default function SignupPage() {
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    // Simulate auth
    setTimeout(() => {
      router.push("/dashboard")
    }, 1500)
  }

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-background">
      {/* Left side: Content */}
      <div className="hidden lg:flex flex-col justify-center p-12 bg-primary text-white lg:w-1/2 xl:w-[60%] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-full h-full bg-accent/5 -skew-x-12 translate-x-1/2" />
        <div className="max-w-xl mx-auto relative z-10 space-y-12">
          <Link href="/" className="flex items-center gap-2 mb-12">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent text-white">
              <Mail className="h-6 w-6" />
            </div>
            <span className="text-2xl font-bold tracking-tight">EduMail QA</span>
          </Link>
          
          <div className="space-y-6">
            <h2 className="text-5xl font-black leading-tight">Start delivering excellence in every email.</h2>
            <p className="text-xl text-primary-foreground/70 leading-relaxed">
              Join thousands of education advisors who use our platform to maintain compliance and improve student engagement.
            </p>
          </div>

          <div className="grid gap-6">
            {[
              { icon: ShieldCheck, title: "FERPA Compliant", desc: "Automated privacy and data security checks." },
              { icon: Sparkles, title: "AI-Powered Insights", desc: "Instant feedback on tone, empathy, and accuracy." },
              { icon: BarChart3, title: "Advanced Analytics", desc: "Track growth with team-wide performance dashboards." },
            ].map((item, idx) => (
              <div key={idx} className="flex gap-4">
                <div className="h-10 w-10 shrink-0 rounded-lg bg-white/10 flex items-center justify-center">
                  <item.icon className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <h4 className="font-bold text-lg">{item.title}</h4>
                  <p className="text-primary-foreground/60">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right side: Form */}
      <div className="flex-1 flex items-center justify-center p-6">
        <Link href="/" className="lg:hidden absolute top-8 left-8 flex items-center gap-2 text-muted-foreground">
          <ArrowLeft className="h-4 w-4" />
          Home
        </Link>
        
        <div className="w-full max-w-md space-y-8 animate-in fade-in slide-in-from-right-4 duration-700">
          <div className="lg:hidden text-center mb-8">
             <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-accent text-white mb-4">
              <Mail className="h-6 w-6" />
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-primary">Get Started</h1>
          </div>

          <Card className="border-none shadow-2xl">
            <form onSubmit={handleSignup}>
              <CardHeader>
                <CardTitle className="text-xl">Create your account</CardTitle>
                <CardDescription>Start your 14-day free trial today.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="first-name">First Name</Label>
                    <Input id="first-name" placeholder="Jane" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="last-name">Last Name</Label>
                    <Input id="last-name" placeholder="Doe" required />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Work Email</Label>
                  <Input id="email" type="email" placeholder="jane@university.edu" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input id="password" type="password" required />
                </div>
              </CardContent>
              <CardFooter className="flex flex-col gap-4">
                <Button className="w-full bg-accent hover:bg-accent/90 h-11 text-base font-bold" disabled={loading}>
                  {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : "Create Account"}
                </Button>
                <p className="text-xs text-center text-muted-foreground px-4">
                  By signing up, you agree to our Terms of Service and Privacy Policy.
                </p>
                <p className="text-sm text-center text-muted-foreground pt-2">
                  Already have an account?{" "}
                  <Link href="/login" className="text-accent font-bold hover:underline">Log in</Link>
                </p>
              </CardFooter>
            </form>
          </Card>
        </div>
      </div>
    </div>
  )
}
