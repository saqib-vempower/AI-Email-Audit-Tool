
'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { emailAnalysisSandbox } from '@/ai/flows/email-analysis-sandbox';
import type { EmailAnalysisSandboxOutput } from '@/ai/flows/email-analysis-sandbox';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

const EmailAnalysisComponent: React.FC = () => {
  const [ticketId, setTicketId] = useState('');
  const [ticketData, setTicketData] = useState<any>(null);
  
  type Department = "SST" | "SLU" | "IM";

  const [department, setDepartment] = useState<Department>("SST");
  
  const [inputMethod, setInputMethod] = useState("ticket");
  
  const [analysisResult, setAnalysisResult] = useState<EmailAnalysisSandboxOutput | null>(null);
  
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  
  const [error, setError] = useState<string | null>(null);
  const loadTicket = async () => {
    if (!ticketId.trim()) {
      setError("Please enter a Ticket ID.");
      return;
    }
  
    try {
      setIsLoading(true);
      setError(null);
  
      const response = await fetch("/api/freshdesk", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ticketId,
        }),
      });
  
      if (!response.ok) {
        throw new Error("Ticket not found");
      }
  
      const data = await response.json();
  
      setTicketData(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };
  const handleAnalysis = async () => {
    setIsLoading(true);
    setError(null);
  
    try {
      let combinedEmailText = "";
  
      // -----------------------------
      // Freshdesk Ticket
      // -----------------------------
      if (inputMethod === "ticket") {
        if (!ticketData) {
          throw new Error("Please load a ticket first.");
        }
  
        combinedEmailText = `
  STUDENT EMAIL THREAD:
  ${ticketData.studentEmail}
  
  ADVISOR'S RESPONSE:
  ${ticketData.advisorResponse}
  `;
      }
  
      // -----------------------------
      // Paste Emails
      // -----------------------------
      else if (inputMethod === "paste") {
        if (!ticketData?.studentEmail || !ticketData?.advisorResponse) {
          throw new Error("Please paste both emails.");
        }
  
        combinedEmailText = `
  STUDENT EMAIL THREAD:
  ${ticketData.studentEmail}
  
  ADVISOR'S RESPONSE:
  ${ticketData.advisorResponse}
  `;
      }
  
      // -----------------------------
      // Upload Screenshot
      // -----------------------------
      else if (inputMethod === "image") {
        if (!selectedImage) {
          throw new Error("Please upload an image.");
        }
  
        const formData = new FormData();
        formData.append("image", selectedImage);
  
        const response = await fetch("/api/extract-email", {
          method: "POST",
          body: formData,
        });
  
        if (!response.ok) {
          throw new Error("Failed to extract email from screenshot.");
        }
  
        const extracted = await response.json();
  
        combinedEmailText = extracted.emailText;
      }
  
      // -----------------------------
      // Run AI Evaluation
      // -----------------------------
      const result = await emailAnalysisSandbox({
        emailText: combinedEmailText,
        advisorCode: ticketId || "0",
        department,
      });
  
      setAnalysisResult(result);
  
    } catch (e: any) {
      setError(e.message || "An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  const isButtonDisabled =
  isLoading ||
  (
    inputMethod === "ticket" && !ticketData
  ) ||
  (
    inputMethod === "paste" &&
    (!ticketData?.studentEmail || !ticketData?.advisorResponse)
  ) ||
  (
    inputMethod === "image" &&
    !selectedImage
  );
   
    

  return (
    <div className="p-4 space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">Email Analysis Sandbox</h2>
        <p className="text-muted-foreground">Paste advisor responses and get instant AI-powered quality checks.</p>
      </div>

      <Card className="border-none shadow-sm">
        <CardContent className="pt-6 space-y-4">
        <div className="space-y-2 w-96">

<Label>Department</Label>

<Select
  value={department}
  onValueChange={(value) => setDepartment(value as Department)}
>
<SelectTrigger className="h-9 text-sm">
  <SelectValue />
</SelectTrigger>

  <SelectContent>
    <SelectItem value="SST">SST</SelectItem>
    <SelectItem value="SLU">SLU</SelectItem>
    <SelectItem value="IM">IM</SelectItem>
  </SelectContent>
</Select>
<div className="space-y-2">

<Label>Input Method</Label>

<Select
value={inputMethod}
onValueChange={setInputMethod}
>

<SelectTrigger className="h-9 text-sm">
  <SelectValue />
</SelectTrigger>

<SelectContent>

<SelectItem value="ticket">
Freshdesk Ticket
</SelectItem>

<SelectItem value="paste">
Paste Emails
</SelectItem>

<SelectItem value="image">
Upload Screenshot
</SelectItem>

</SelectContent>

</Select>

</div>

</div>
{inputMethod === "ticket" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
            <Label htmlFor="ticketId">Ticket ID</Label>

<Input
  id="ticketId"
  value={ticketId}
  onChange={(e) => setTicketId(e.target.value)}
  placeholder="Enter Ticket ID"
/>




  <Button
    onClick={loadTicket}
    disabled={isLoading || !ticketId}
  >
    {isLoading ? "Loading..." : "Load Ticket"}
  </Button>
</div>
            </div>
)}
           
        
           {(inputMethod === "ticket" ||
inputMethod === "paste") && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="studentEmail">Student Email</Label>
              <Textarea
value={ticketData?.studentEmail || ""}
rows={12}
readOnly={inputMethod === "ticket"}
onChange={(e)=>
setTicketData({
...ticketData,
studentEmail:e.target.value
})
}
/>
            </div>
            <div className="space-y-2">
              <Label htmlFor="advisorResponse">Advisor's Response</Label>
              <Textarea
  value={ticketData?.advisorResponse || ""}
  rows={12}
  readOnly={inputMethod==="ticket"}

onChange={(e)=>
setTicketData({
...ticketData,
advisorResponse:e.target.value
})
}
/>

            </div>
          </div>
)}
{inputMethod === "image" && (
  <div className="space-y-2 w-96">
    <Label htmlFor="emailScreenshot">Upload Screenshot</Label>

    <Input
      id="emailScreenshot"
      type="file"
      accept="image/*"
      className="h-10 text-sm"
      onChange={(e) => {
        const file = e.target.files?.[0];
      
        if (file) {
          setSelectedImage(file);
          console.log("Selected screenshot:", file);
        }
      }}
    />

    <p className="text-sm text-muted-foreground">
      Upload a screenshot of the email conversation for AI analysis.
    </p>
  </div>
)}

<Button
  onClick={handleAnalysis}
  disabled={isButtonDisabled}
  className="w-full md:w-auto"
>
  {isLoading ? "Analyzing..." : "Generate Scorecard"}
</Button>

         
        </CardContent>
      </Card>

      {error && <p className="text-red-500 font-medium">{error}</p>}

      {analysisResult && (
        <Card className="border-none shadow-md animate-in fade-in slide-in-from-bottom-2">
          <CardHeader className="bg-muted/30 border-b">
  <CardTitle>AI Audit Scorecard</CardTitle>

  <div className="mt-3 flex flex-col gap-2">

<div className="flex items-center gap-2">
  <span className="text-sm font-medium text-muted-foreground">
    Advisor:
  </span>

  <span className="rounded-md bg-green-100 px-3 py-1 text-sm font-semibold text-green-700">
    {analysisResult.advisorName}
  </span>
</div>

<div className="flex items-center gap-2">
  <span className="text-sm font-medium text-muted-foreground">
    Department:
  </span>

  <span className="rounded-md bg-blue-100 px-3 py-1 text-sm font-semibold text-blue-700">
    {analysisResult.department}
  </span>
</div>

</div>
</CardHeader>
          <CardContent className="space-y-8 pt-6">
            <div className="space-y-2">
              <h4 className="font-bold text-sm uppercase text-muted-foreground tracking-widest">Overall Feedback</h4>
              <p className="text-lg leading-relaxed">{analysisResult.overallFeedback}</p>
            </div>

            <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-sm uppercase text-muted-foreground tracking-widest">Total Performance</h4>
                  <span className="text-2xl font-black text-primary">{analysisResult.totalScore}/100</span>
                </div>
                <Progress value={analysisResult.totalScore} className="h-3" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Object.entries(analysisResult.parameters).map(([key, value]) => (
                <div key={key} className="p-4 rounded-xl bg-muted/20 border space-y-2">
                  <h5 className="font-bold capitalize text-primary">{key.replace(/([A-Z])/g, ' $1')}</h5>
                  <div className="flex justify-between items-center text-sm">
                    <span className="font-medium text-muted-foreground">Score</span>
                    <span className="font-bold">{value.score} / {value.maxScore}</span>
                  </div>
                  <p className="text-sm text-muted-foreground leading-snug italic">"{value.feedback}"</p>
                </div>
              ))}
            </div>

            {analysisResult.hasFatalError && (
              <div className="p-4 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-center">
                <p className="font-black text-sm uppercase tracking-widest">Fatal Error Detected</p>
                <p className="text-xs mt-1">This communication fails critical policy or quality standards.</p>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default EmailAnalysisComponent;