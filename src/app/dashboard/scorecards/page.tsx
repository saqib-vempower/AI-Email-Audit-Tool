"use client"

import { ADVISORS } from "@/app/lib/mock-data"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { BarChart3, ChevronRight, UserCircle, Users } from "lucide-react"
import Link from "next/link"

export default function ScorecardsPage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="space-y-2">
          <h2 className="text-3xl font-bold tracking-tight text-primary">Team Scorecards</h2>
          <p className="text-muted-foreground">Detailed performance tracking for individual education advisors.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="gap-2">
            <BarChart3 className="h-4 w-4" />
            Compare All
          </Button>
          <Button className="bg-accent hover:bg-accent/90 gap-2">
            <Users className="h-4 w-4" />
            Manage Team
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {ADVISORS.map((advisor) => (
          <Link key={advisor.id} href={`/dashboard/scorecards/${advisor.id}`}>
            <Card className="border-none shadow-sm hover:shadow-lg transition-all group overflow-hidden bg-white">
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-full bg-accent/10 flex items-center justify-center">
                      <UserCircle className="h-8 w-8 text-accent" />
                    </div>
                    <div>
                      <CardTitle className="text-lg font-bold group-hover:text-accent transition-colors">{advisor.name}</CardTitle>
                      <CardDescription>Advisor ID: AD-{advisor.id}00</CardDescription>
                    </div>
                  </div>
                  <Badge className={parseFloat(advisor.trend) > 0 ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}>
                    {advisor.trend}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">Performance Avg</p>
                    <p className="text-3xl font-black text-primary">{advisor.avgScore.toFixed(1)} <span className="text-sm font-normal text-muted-foreground">/ 5.0</span></p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">Evaluations</p>
                    <p className="text-xl font-bold">{advisor.evaluations}</p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-medium">
                    <span>Current Reliability Score</span>
                    <span className="text-accent">{Math.round((advisor.avgScore / 5) * 100)}%</span>
                  </div>
                  <Progress value={(advisor.avgScore / 5) * 100} className="h-2 bg-secondary" />
                </div>

                <div className="pt-4 border-t flex items-center justify-between text-sm text-accent font-semibold">
                  View Full Report
                  <ChevronRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}