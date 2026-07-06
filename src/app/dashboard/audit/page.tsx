
"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { 
  ClipboardCheck, 
  ArrowRight, 
  CheckCircle2, 
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
  Download
} from "lucide-react"

import {
  collection,
  getDocs,
  query,
  orderBy,
} from "firebase/firestore"

import { db } from "@/lib/firebase"
import { Timestamp } from "firebase/firestore"

interface AuditScore {
  score: number;
  max: number;
}

interface Audit {
  id: string;
  emailId: number;
  email: string;
  Summary: string;
  totalscore: number;
  createdAt: Timestamp;
  hasFatalError: boolean;
  scores: {
    "Polite Greeting": AuditScore;
    "Issue Recognition": AuditScore;
    "Structure": AuditScore;
    "Grammar and Tone": AuditScore;
    "Resolution": AuditScore;
    "Next Steps": AuditScore;
    "Timelines": AuditScore;
    "Support Channel": AuditScore;
    "Closing": AuditScore;
    "Confidence": AuditScore;
  };
}

const PARAMETERS = [
  { id: "greeting", label: "Polite Greeting", weight: 5, icon: UserCheck, key: "Polite Greeting" },
  { id: "issue", label: "Issue Recognition", weight: 15, icon: FileText, key: "Issue Recognition" },
  { id: "structure", label: "Structure", weight: 10, icon: BookOpen, key: "Structure" },
  { id: "grammar", label: "Grammar and Tone", weight: 15, icon: Heart, fatal: true, key: "Grammar and Tone" },
  { id: "resolution", label: "Resolution", weight: 15, icon: Scale, fatal: true, key: "Resolution" },
  { id: "nextSteps", label: "Next Steps", weight: 10, icon: ArrowRight, key: "Next Steps" },
  { id: "timelines", label: "Timelines", weight: 10, icon: Clock, key: "Timelines" },
  { id: "channel", label: "Support Channel", weight: 5, icon: Send, key: "Support Channel" },
  { id: "closing", label: "Closing", weight: 5, icon: CheckCircle2, key: "Closing" },
  { id: "confidence", label: "Confidence", weight: 10, icon: Sparkles, key: "Confidence" },
];

export default function AuditDashboard() {
  const [expandedAudit, setExpandedAudit] = useState<string | null>(null);
  const router = useRouter();
  const [audits, setAudits] = useState<Audit[]>([]);
  const [loading, setLoading] = useState(true);

  const aggregateScores = PARAMETERS.reduce((acc, param) => ({
    ...acc,
    [param.id]: 0
  }), {} as Record<string, number>);
  
  if (audits.length > 0) {
    audits.forEach((audit) => {
      PARAMETERS.forEach(param => {
        aggregateScores[param.id] += audit.scores[param.key as keyof typeof audit.scores]?.score ?? 0;
      });
    });
  
    Object.keys(aggregateScores).forEach((key) => {
      aggregateScores[key] /= audits.length;
    });
  }

  const toggleAudit = (id: string) => {
    setExpandedAudit(expandedAudit === id ? null : id)
  }

  useEffect(() => {
    async function loadAudits() {
      try {
        const q = query(collection(db, "audits"), orderBy("createdAt", "desc"));
        const snapshot = await getDocs(q);
        const data = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        })) as Audit[];
        setAudits(data);
      } catch (err) {
        console.error("Error loading audits:", err);
      } finally {
        setLoading(false);
      }
    }
    loadAudits();
  }, []);

  const exportToCSV = () => {
    if (audits.length === 0) return;
    const headers = ["Email ID", "Email", "Total Score", "Created At", "Summary", ...PARAMETERS.map(p => p.label)];
    const rows = audits.map((audit) => [
      audit.emailId,
      audit.email,
      audit.totalscore,
      audit.createdAt?.toDate().toLocaleString(),
      audit.Summary,
      ...PARAMETERS.map(p => audit.scores[p.key as keyof typeof audit.scores]?.score)
    ]);
    const csvContent = [headers.join(","), ...rows.map(r => r.map(v => `"${v ?? ""}"`).join(","))].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `Audits_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="space-y-2">
          <h2 className="text-3xl font-bold tracking-tight text-primary">Audit Performance</h2>
          <p className="text-muted-foreground">Detailed history of all AI-powered email evaluations.</p>
        </div>
        <Button className="bg-accent hover:bg-accent/90 gap-2" onClick={() => router.push("/dashboard/sandbox")}>
          <ClipboardCheck className="h-4 w-4" /> New Audit
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        {PARAMETERS.map((param) => (
          <Card key={param.id} className="border-none shadow-sm bg-white overflow-hidden">
            <CardHeader className="pb-2 space-y-0">
              <div className="flex items-center justify-between mb-2">
                <div className="p-1.5 rounded-lg bg-primary/5">
                  <param.icon className="h-4 w-4 text-primary" />
                </div>
                {param.fatal && (
                  <Badge variant="destructive" className="text-[8px] h-3 px-1 font-black uppercase tracking-tighter">Fatal</Badge>
                )}
              </div>
              <CardTitle className="text-xs font-bold text-muted-foreground uppercase tracking-wider">{param.label}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline gap-1">
                <span className="text-xl font-black">{aggregateScores[param.id]?.toFixed(1)}</span>
                <span className="text-[10px] text-muted-foreground">/ {param.weight}</span>
              </div>
              <Progress value={(aggregateScores[param.id] / param.weight) * 100} className="h-1.5 mt-2" />
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-none shadow-sm">
        <CardHeader className="border-b bg-muted/20">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-bold">Audit History</CardTitle>
            <Button onClick={exportToCSV} variant="outline" size="sm" className="gap-2">
              <Download className="h-4 w-4" /> Export CSV
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y divide-border/50">
            {loading ? (
              <div className="p-8 text-center text-muted-foreground">Loading audit records...</div>
            ) : audits.length === 0 ? (
              <div className="p-8 text-center text-muted-foreground">No audits performed yet.</div>
            ) : audits.map((audit) => (
              <div key={audit.id} className="flex flex-col">
                <div 
                  className="flex items-center justify-between p-4 hover:bg-muted/30 transition-colors cursor-pointer"
                  onClick={() => toggleAudit(audit.id)}
                >
                  <div className="flex items-center gap-4">
                    <div className={`h-10 w-10 rounded-full flex items-center justify-center font-bold text-sm ${audit.totalscore >= 80 ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                      {audit.totalscore}
                    </div>
                    <div>
                      <p className="font-bold text-sm">{audit.email}</p>
                      <p className="text-xs text-muted-foreground">EmailID: {audit.emailId} • {audit.createdAt?.toDate().toLocaleString()}</p>
                    </div>
                  </div>
                  {expandedAudit === audit.id ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </div>

                {expandedAudit === audit.id && (
                  <div className="bg-muted/10 p-6 border-t animate-in slide-in-from-top-2 duration-200">
                    <div className="grid gap-6 md:grid-cols-2">
                      <div className="space-y-4">
                        <h4 className="text-xs font-black uppercase tracking-widest text-primary/60">Breakdown</h4>
                        <div className="grid gap-2">
                          {PARAMETERS.map((p) => (
                            <div key={p.id} className="flex items-center justify-between bg-white p-2 rounded-lg border text-sm">
                              <span className="font-medium">{p.label}</span>
                              <span className="font-bold">{audit.scores[p.key as keyof typeof audit.scores]?.score ?? 0} / {p.weight}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="space-y-4">
                        <h4 className="text-xs font-black uppercase tracking-widest text-primary/60">AI Summary</h4>
                        <div className="bg-white p-4 rounded-xl border shadow-sm italic text-sm leading-relaxed">
                          "{audit.Summary}"
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
