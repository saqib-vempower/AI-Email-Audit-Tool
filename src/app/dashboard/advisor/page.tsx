"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { RECENT_EVALUATIONS } from "@/app/lib/mock-data"
import { Badge } from "@/components/ui/badge"
import { 
  Mail, 
  MessageSquare, 
  Heart, 
  CheckCircle2, 
  Star,
  Download,
  Share2,
  Calendar
} from "lucide-react"
import { Button } from "@/components/ui/button"

export default function AdvisorPortal() {
  // Simulate an advisor view
  const myEvaluations = RECENT_EVALUATIONS.slice(0, 3)

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col gap-2">
        <h2 className="text-3xl font-bold tracking-tight text-primary">Advisor Portal</h2>
        <p className="text-muted-foreground">Review your recent evaluations and improve your communication performance.</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-4">
        <Card className="lg:col-span-1 border-none shadow-sm bg-primary text-white">
          <CardHeader>
            <CardTitle>My Performance</CardTitle>
            <CardDescription className="text-primary-foreground/60">Updated 2h ago</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center py-6">
              <div className="inline-flex items-center justify-center p-6 rounded-full border-4 border-accent bg-white/5">
                <span className="text-5xl font-black">4.8</span>
              </div>
              <p className="mt-4 text-sm font-medium text-accent">Excellent Standing</p>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-primary-foreground/60">Grammar</span>
                <span className="font-bold text-accent">98%</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-primary-foreground/60">Tone</span>
                <span className="font-bold text-accent">92%</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-primary-foreground/60">Accuracy</span>
                <span className="font-bold text-accent">95%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="lg:col-span-3 space-y-6">
          <Card className="border-none shadow-sm overflow-hidden bg-white">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-lg">Recent Email Threads</CardTitle>
                <CardDescription>Review automated evaluation scores</CardDescription>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="gap-2">
                  <Download className="h-4 w-4" /> Export All
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-border/50">
                {myEvaluations.map((evalItem) => (
                  <div key={evalItem.id} className="p-6 hover:bg-muted/30 transition-all space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-full bg-accent/10">
                          <Mail className="h-5 w-5 text-accent" />
                        </div>
                        <div>
                          <p className="font-bold text-base leading-none">Re: Enrollment Application - Question</p>
                          <div className="flex items-center gap-2 mt-2">
                            <Calendar className="h-3 w-3 text-muted-foreground" />
                            <span className="text-xs text-muted-foreground">{evalItem.timestamp}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge variant="secondary" className="bg-accent/10 text-accent border-none font-bold">
                          {evalItem.score} / 5.0
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="flex gap-4 pt-2">
                      <div className="flex items-center gap-1.5 text-xs font-semibold text-green-600 bg-green-50 px-2 py-1 rounded border border-green-100">
                        <CheckCircle2 className="h-3 w-3" /> Accurate
                      </div>
                      <div className="flex items-center gap-1.5 text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-1 rounded border border-blue-100">
                        <Heart className="h-3 w-3" /> Empathetic
                      </div>
                      <div className="flex items-center gap-1.5 text-xs font-semibold text-accent bg-accent/5 px-2 py-1 rounded border border-accent/20 ml-auto">
                        <MessageSquare className="h-3 w-3" /> View Feedback
                      </div>
                    </div>

                    <p className="text-sm text-muted-foreground italic line-clamp-2">
                      "I appreciated the detailed response to the student's complex situation. The tone was professional yet warm..."
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}