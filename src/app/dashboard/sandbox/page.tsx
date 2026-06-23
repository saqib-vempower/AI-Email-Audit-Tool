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
  Send,
  AlertTriangle,
  FileText,
  Clock,
  UserCheck,
  Flag
} from "lucide-react"
import { emailAnalysisSandbox, type EmailAnalysisSandboxOutput } from "@/ai/flows/email-analysis-sandbox"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useToast } from "@/hooks/use-toast"

export default function SandboxPage() {
  const [emailText, setEmailText] = useState("")
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<EmailAnalysisSandboxOutput | null>(null)
  const { toast } = useToast()

  const handleAnalyze = async () => {
    if (!emailText.trim()) return
    setLoading(true)
    setResult(null)
    
    try {
      const output = await emailAnalysisSandbox({ emailText })
      setResult(output)
    } catch (error: any) {
      console.error("Analysis failed", error)
      toast({
        variant: "destructive",
        title: "Evaluation Service Unavailable",
        description: "The AI model is currently experiencing high demand. Please wait a moment and try your audit again.",
      })
    } finally {
      setLoading(false)
    }
  }

  const getScoreColor = (score: number, max: number) => {
    const percentage = (score / max) * 100
    if (percentage >= 90) return "text-green-600 bg-green-50 border-green-100"
    if (percentage >= 70) return "text-blue-600 bg-blue-50 border-blue-100"
    if (percentage >= 50) return "text-yellow-600 bg-yellow-50 border-yellow-100"
    return "text-red-600 bg-red-50 border-red-100"
  }

  const parametersList = result ? [
    { label: "Polite Greeting", data: result.parameters.politeGreeting, icon: UserCheck },
    { label: "Issue Recognition", data: result.parameters.issueRecognition, icon: FileText },
    { label: "Structure", data: result.parameters.structure, icon: BookOpen },
    { label: "Grammar/Tone", data: result.parameters.grammarToneEmpathy, icon: Heart, isFatal: true },
    { label: "Resolution/Policy", data: result.parameters.correctResolution, icon: Scale, isFatal: true },
    { label: "Next Steps", data: result.parameters.clearNextSteps, icon: ArrowRight },
    { label: "Timelines", data: result.parameters.timelinesSet, icon: Clock },
    { label: "Support Channel", data: result.parameters.supportChannel, icon: Send },
    { label: "Closing/Signature", data: result.parameters.professionalClosing, icon: CheckCircle2 },
    { label: "Confidence", data: result.parameters.confidenceAfterReading, icon: Sparkles },
  ] : []

  return (
    <div className="space-y-8 max-w-7xl mx-auto animate-in fade-in duration-700">
      <div className="flex flex-col gap-2">
        <h2 className="text-3xl font-bold tracking-tight text-primary">Email Sandbox</h2>
        <p className="text-muted-foreground">Detailed 10-parameter AI evaluation for education advisor communications.</p>
      </div>

      <div className="grid gap-8 lg:grid-cols-5 items-start">
        <Card className="lg:col-span-2 border-none shadow-lg overflow-hidden sticky top-24">
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
              className="min-h-[500px] border-none focus-visible:ring-0 resize-none p-6 text-base leading-relaxed placeholder:text-muted-foreground/50"
              value={emailText}
              onChange={(e) => setEmailText(e.target.value)}
            />
            <div className="p-4 bg-muted/30 border-t flex flex-col gap-4">
              <div className="flex justify-between items-center">
                <p className="text-xs text-muted-foreground">Character count: {emailText.length}</p>
                <Button 
                  onClick={handleAnalyze} 
                  disabled={loading || !emailText.trim()}
                  className="bg-accent hover:bg-accent/90 transition-all font-semibold gap-2"
                >
                  {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
                  Run Full Audit
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="lg:col-span-3 space-y-6">
          {!result && !loading && (
            <Card className="border-dashed border-2 bg-muted/5 p-20 text-center h-[600px] flex flex-col justify-center items-center gap-4">
              <div className="p-6 rounded-full bg-accent/10">
                <FileText className="h-12 w-12 text-accent" />
              </div>
              <div className="space-y-2">
                <h3 className="font-bold text-xl">Awaiting Content</h3>
                <p className="text-sm text-muted-foreground max-w-[300px] mx-auto">
                  The AI will analyze your draft against the official 10-parameter rubric including fatal error detection.
                </p>
              </div>
            </Card>
          )}

          {loading && (
            <Card className="border-none shadow-sm p-20 text-center h-[600px] flex flex-col justify-center items-center gap-6">
              <div className="relative">
                <Loader2 className="h-16 w-16 animate-spin text-accent" />
                <Sparkles className="h-6 w-6 text-primary absolute -top-2 -right-2 animate-pulse" />
              </div>
              <div className="space-y-2">
                <h3 className="font-bold text-xl">AI Audit in Progress...</h3>
                <p className="text-sm text-muted-foreground">Verifying policy compliance, tone, and empathy parameters</p>
              </div>
            </Card>
          )}

          {result && !loading && (
            <div className="space-y-6 animate-in slide-in-from-right-4 duration-500">
              {result.hasFatalError && (
                <div className="p-4 rounded-xl bg-destructive/10 border border-destructive/20 flex items-center gap-4 text-destructive">
                  <AlertTriangle className="h-6 w-6 shrink-0" />
                  <div>
                    <p className="font-bold">FATAL Error Detected</p>
                    <p className="text-sm opacity-90">This email contains critical issues in Grammar/Tone or Resolution that must be fixed.</p>
                  </div>
                </div>
              )}

              <Card className="border-none shadow-xl overflow-hidden">
                <CardHeader className="bg-primary text-white p-6">
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle className="text-2xl font-black">Audit Results</CardTitle>
                      <CardDescription className="text-primary-foreground/60">Comprehensive Rubric Analysis</CardDescription>
                    </div>
                    <div className="text-right">
                      <p className="text-4xl font-black text-accent">{result.totalScore}<span className="text-xl font-normal text-white/50">/100</span></p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <ScrollArea className="h-[700px]">
                    <div className="p-6 space-y-4">
                      {parametersList.map((param) => (
                        <div key={param.label} className="p-4 rounded-xl border bg-white shadow-sm hover:shadow-md transition-all space-y-3">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className="p-2 rounded-lg bg-primary/5">
                                <param.icon className="h-5 w-5 text-primary" />
                              </div>
                              <div>
                                <p className="font-bold text-sm flex items-center gap-2">
                                  {param.label}
                                  {param.isFatal && (
                                    <Badge variant="destructive" className="text-[10px] h-4 px-1.5 font-black uppercase">Fatal</Badge>
                                  )}
                                </p>
                                <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">Weight: {param.data.maxScore}</p>
                              </div>
                            </div>
                            <Badge className={`font-black ${getScoreColor(param.data.score, param.data.maxScore)}`}>
                              {param.data.score} / {param.data.maxScore}
                            </Badge>
                          </div>
                          <Progress value={(param.data.score / param.data.maxScore) * 100} className="h-2" />
                          <p className="text-xs text-muted-foreground leading-relaxed italic bg-muted/30 p-2 rounded">
                            "{param.data.feedback}"
                          </p>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
                <div className="p-6 bg-accent/5 border-t">
                   <div className="flex items-center gap-2 text-primary mb-2">
                    <Flag className="h-4 w-4" />
                    <h4 className="font-bold text-sm">Strategic Insight</h4>
                  </div>
                  <p className="text-sm text-foreground/80 leading-relaxed italic">
                    "{result.overallFeedback}"
                  </p>
                </div>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
