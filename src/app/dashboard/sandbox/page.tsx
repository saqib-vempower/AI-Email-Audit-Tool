"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  Heart, 
  CheckCircle2, 
  Sparkles, 
  AlertCircle, 
  Scale, 
  ArrowRight,
  Loader2,
  BookOpen,
  Send
} from "lucide-react"
import { emailAnalysisSandbox, type EmailAnalysisSandboxOutput } from "@/ai/flows/email-analysis-sandbox"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"

export default function SandboxPage() {
  const [emailText, setEmailText] = useState("")
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<EmailAnalysisSandboxOutput | null>(null)

  const handleAnalyze = async () => {
    if (!emailText.trim()) return
    setLoading(true)
    try {
      const output = await emailAnalysisSandbox({ emailText })
      setResult(output)
    } catch (error) {
      console.error("Analysis failed", error)
    } finally {
      setLoading(false)
    }
  }

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-green-600 bg-green-50 border-green-100"
    if (score >= 75) return "text-blue-600 bg-blue-50 border-blue-100"
    if (score >= 60) return "text-yellow-600 bg-yellow-50 border-yellow-100"
    return "text-red-600 bg-red-50 border-red-100"
  }

  return (
    <div className="space-y-8 max-w-6xl mx-auto animate-in fade-in duration-700">
      <div className="flex flex-col gap-2">
        <h2 className="text-3xl font-bold tracking-tight text-primary">Email Sandbox</h2>
        <p className="text-muted-foreground">Test advisor communication and get instant AI feedback against school guidelines.</p>
      </div>

      <div className="grid gap-8 lg:grid-cols-5 items-start">
        <Card className="lg:col-span-3 border-none shadow-lg overflow-hidden">
          <CardHeader className="bg-primary/5 border-b">
            <div className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-accent" />
              <CardTitle className="text-lg">Advisor Draft</CardTitle>
            </div>
            <CardDescription>Paste the email content below for evaluation</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <Textarea 
              placeholder="Dear Student, I am writing to follow up on your recent application query..."
              className="min-h-[400px] border-none focus-visible:ring-0 resize-none p-6 text-lg leading-relaxed placeholder:text-muted-foreground/50"
              value={emailText}
              onChange={(e) => setEmailText(e.target.value)}
            />
            <div className="p-4 bg-muted/30 border-t flex justify-between items-center">
              <p className="text-xs text-muted-foreground">Character count: {emailText.length}</p>
              <Button 
                onClick={handleAnalyze} 
                disabled={loading || !emailText.trim()}
                className="bg-accent hover:bg-accent/90 transition-all font-semibold gap-2"
              >
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
                Analyze Communication
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="lg:col-span-2 space-y-6">
          {!result && !loading && (
            <Card className="border-dashed border-2 bg-muted/5 p-12 text-center h-[520px] flex flex-col justify-center items-center gap-4">
              <div className="p-4 rounded-full bg-accent/10">
                <Send className="h-8 w-8 text-accent" />
              </div>
              <div>
                <h3 className="font-bold text-lg">Awaiting Content</h3>
                <p className="text-sm text-muted-foreground max-w-[240px] mx-auto mt-2">
                  Evaluation metrics will appear here once you submit an email for analysis.
                </p>
              </div>
            </Card>
          )}

          {loading && (
            <Card className="border-none shadow-sm p-12 text-center h-[520px] flex flex-col justify-center items-center gap-4">
              <Loader2 className="h-12 w-12 animate-spin text-accent" />
              <div className="space-y-2">
                <h3 className="font-bold text-lg">AI Evaluating...</h3>
                <p className="text-sm text-muted-foreground">Scanning for tone, compliance, and accuracy</p>
              </div>
            </Card>
          )}

          {result && !loading && (
            <div className="space-y-4 animate-in slide-in-from-right-4 duration-500">
              <Card className="border-none shadow-lg overflow-hidden">
                <CardHeader className="bg-primary text-white p-6">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-xl">Evaluation Scores</CardTitle>
                    <Badge className="bg-accent text-white border-none px-3">Overall AI Insight</Badge>
                  </div>
                </CardHeader>
                <CardContent className="p-6 space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { label: "Grammar", score: result.grammarScore, icon: CheckCircle2, feedback: result.grammarFeedback },
                      { label: "Tone", score: result.toneScore, icon: Activity, feedback: result.toneFeedback },
                      { label: "Empathy", score: result.empathyScore, icon: Heart, feedback: result.empathyFeedback },
                      { label: "Compliance", score: result.complianceScore, icon: Scale, feedback: result.complianceFeedback },
                    ].map((metric) => (
                      <div key={metric.label} className="p-3 rounded-xl border space-y-2 bg-white shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between">
                          <metric.icon className="h-4 w-4 text-accent" />
                          <span className={`text-xs font-bold px-2 py-0.5 rounded-full border ${getScoreColor(metric.score)}`}>
                            {metric.score}
                          </span>
                        </div>
                        <p className="text-sm font-semibold">{metric.label}</p>
                        <Progress value={metric.score} className="h-1.5" />
                      </div>
                    ))}
                  </div>

                  <div className="space-y-4 pt-4">
                    <div className="p-4 rounded-xl bg-accent/5 border border-accent/10 space-y-2">
                      <div className="flex items-center gap-2 text-accent">
                        <ArrowRight className="h-4 w-4" />
                        <h4 className="font-bold text-sm">Key Suggestions</h4>
                      </div>
                      <p className="text-sm text-foreground/80 leading-relaxed italic">
                        "{result.overallFeedback}"
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border-none shadow-md bg-white">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">Compliance Deep-Dive</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {result.complianceFeedback}
                  </p>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}