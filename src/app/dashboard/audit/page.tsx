"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { 
  ClipboardCheck, 
  ArrowRight, 
  CheckCircle2, 
  AlertTriangle, 
  UserCheck, 
  FileText, 
  BookOpen, 
  Heart, 
  Scale, 
  Clock, 
  Send, 
  Sparkles,
  ChevronDown,
  ChevronUp,
  Search,
  Download
} from "lucide-react"
import { RECENT_EVALUATIONS } from "@/app/lib/mock-data"
import { ScrollArea } from "@/components/ui/scroll-area"

const PARAMETERS = [
  { id: "greeting", label: "Polite Greeting", weight: 5, icon: UserCheck, avg: 4.8 },
  { id: "issue", label: "Issue Recognition", weight: 15, icon: FileText, avg: 14.2 },
  { id: "structure", label: "Clear Structure", weight: 10, icon: BookOpen, avg: 9.5 },
  { id: "grammar", label: "Grammar/Tone (FATAL)", weight: 15, icon: Heart, avg: 14.5, fatal: true },
  { id: "resolution", label: "Resolution (FATAL)", weight: 15, icon: Scale, avg: 13.8, fatal: true },
  { id: "nextSteps", label: "Clear Next Steps", weight: 10, icon: ArrowRight, avg: 8.9 },
  { id: "timelines", label: "Timelines Set", weight: 10, icon: Clock, avg: 9.1 },
  { id: "channel", label: "Support Channel", weight: 5, icon: Send, avg: 4.9 },
  { id: "closing", label: "Professional Closing", weight: 5, icon: CheckCircle2, avg: 4.7 },
  { id: "confidence", label: "Student Confidence", weight: 10, icon: Sparkles, avg: 9.4 },
]

export default function AuditDashboard() {
  const [expandedAudit, setExpandedAudit] = useState<string | null>(null)

  const toggleAudit = (id: string) => {
    setExpandedAudit(expandedAudit === id ? null : id)
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="space-y-2">
          <h2 className="text-3xl font-bold tracking-tight text-primary">Audit Performance</h2>
          <p className="text-muted-foreground">Aggregated parameter scorecards and detailed audit history.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" /> Export Report
          </Button>
          <Button className="bg-accent hover:bg-accent/90 gap-2">
            <ClipboardCheck className="h-4 w-4" /> New Batch Audit
          </Button>
        </div>
      </div>

      {/* Aggregate Parameter Performance */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-5">
        {PARAMETERS.map((param) => (
          <Card key={param.id} className="border-none shadow-sm bg-white overflow-hidden">
            <CardHeader className="pb-2 space-y-0">
              <div className="flex items-center justify-between mb-2">
                <div className={`p-1.5 rounded-lg bg-primary/5`}>
                  <param.icon className="h-4 w-4 text-primary" />
                </div>
                {param.fatal && (
                  <Badge variant="destructive" className="text-[8px] h-3 px-1 font-black uppercase">Fatal</Badge>
                )}
              </div>
              <CardTitle className="text-xs font-bold text-muted-foreground uppercase tracking-wider">{param.label}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline gap-1">
                <span className="text-xl font-black">{param.avg.toFixed(1)}</span>
                <span className="text-[10px] text-muted-foreground">/ {param.weight}</span>
              </div>
              <Progress value={(param.avg / param.weight) * 100} className="h-1 mt-2" />
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Detailed Audit Feed */}
      <Card className="border-none shadow-sm">
        <CardHeader className="border-b bg-muted/20">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-lg">Recent Audit Scorecards</CardTitle>
              <CardDescription>Click on an audit to view the full 10-parameter breakdown</CardDescription>
            </div>
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input 
                type="text" 
                placeholder="Search by advisor..." 
                className="w-full pl-9 pr-4 py-2 bg-white border rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-accent/50"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y divide-border/50">
            {RECENT_EVALUATIONS.map((audit) => (
              <div key={audit.id} className="flex flex-col">
                <div 
                  className="flex items-center justify-between p-4 hover:bg-muted/30 transition-colors cursor-pointer"
                  onClick={() => toggleAudit(audit.id)}
                >
                  <div className="flex items-center gap-4">
                    <div className={`h-10 w-10 rounded-full flex items-center justify-center font-bold text-sm ${audit.score >= 4.5 ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                      {audit.score.toFixed(1)}
                    </div>
                    <div>
                      <p className="font-bold text-sm">{audit.advisor}</p>
                      <p className="text-xs text-muted-foreground">{audit.timestamp} • Re: Enrollment Application</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <Badge variant={audit.status === 'Excellent' ? 'default' : 'secondary'} className={audit.status === 'Excellent' ? 'bg-green-600' : ''}>
                      {audit.status}
                    </Badge>
                    {expandedAudit === audit.id ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                  </div>
                </div>

                {expandedAudit === audit.id && (
                  <div className="bg-muted/20 p-6 border-t animate-in slide-in-from-top-2 duration-300">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-4">
                        <h4 className="text-sm font-black uppercase tracking-widest text-primary/60">Parameter Breakdown</h4>
                        <div className="grid gap-2">
                          {PARAMETERS.map((p) => (
                            <div key={p.id} className="flex items-center justify-between bg-white p-3 rounded-lg border shadow-sm">
                              <div className="flex items-center gap-2">
                                <div className="text-xs font-bold">{p.label}</div>
                                {p.fatal && <Badge variant="destructive" className="text-[8px] h-3 px-1">FATAL</Badge>}
                              </div>
                              <div className="flex items-center gap-2">
                                <div className="w-24 h-1.5 bg-secondary rounded-full overflow-hidden">
                                  <div className="h-full bg-accent" style={{ width: '90%' }} />
                                </div>
                                <span className="text-xs font-black">{p.avg.toFixed(1)} / {p.weight}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="space-y-4">
                        <h4 className="text-sm font-black uppercase tracking-widest text-primary/60">Evaluator Insights</h4>
                        <div className="bg-white p-4 rounded-xl border shadow-sm space-y-4">
                          <div className="flex items-start gap-3">
                            <Sparkles className="h-5 w-5 text-accent mt-0.5" />
                            <div>
                              <p className="text-sm font-bold">Strategic Summary</p>
                              <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                                The advisor demonstrated high empathy and correctly identified the student's core issue. 
                                Grammar and resolution were accurate, meeting fatal parameter standards. 
                                Minor improvement needed in setting specific timelines (currently used "soon" instead of a range).
                              </p>
                            </div>
                          </div>
                          <div className="pt-4 border-t flex justify-between items-center">
                            <div className="flex items-center gap-2">
                              <CheckCircle2 className="h-4 w-4 text-green-600" />
                              <span className="text-xs font-bold text-green-600">Compliance Verified</span>
                            </div>
                            <Button size="sm" variant="outline" className="text-xs h-8">Full Analysis</Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
