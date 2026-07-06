
'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { emailAnalysisSandbox } from '@/ai/flows/email-analysis-sandbox';
import type { EmailAnalysisSandboxOutput } from '@/ai/flows/email-analysis-sandbox';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

const EmailAnalysisComponent: React.FC = () => {
  const [emailId, setEmailId] = useState('');
  const [advisorEmail, setAdvisorEmail] = useState('');
  const [studentEmail, setStudentEmail] = useState('');
  const [advisorResponse, setAdvisorResponse] = useState('');
  const [analysisResult, setAnalysisResult] = useState<EmailAnalysisSandboxOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAnalysis = async () => {
    if (!emailId || !advisorEmail || !studentEmail || !advisorResponse) {
      setError('Please fill in all fields.');
      return;
    }

    if (!/^\d{6}$/.test(emailId)) {
      setError('EmailID must be a 6-digit number.');
      return;
    }

    setIsLoading(true);
    setError(null);
    try {
      const combinedEmailText = `STUDENT EMAIL THREAD:\n${studentEmail}\n\n---\n\nADVISOR'S RESPONSE:\n${advisorResponse}`;

      const result = await emailAnalysisSandbox({
        emailText: combinedEmailText,
        advisorCode: emailId,
        advisorEmail: advisorEmail,
      });
      setAnalysisResult(result);
    } catch (e: any) {
      setError(e.message || 'An unexpected error occurred.');
    }
    setIsLoading(false);
  };

  const isButtonDisabled =
    isLoading ||
    !emailId.trim() ||
    !advisorEmail.trim() ||
    !studentEmail.trim() ||
    !advisorResponse.trim();

  return (
    <div className="p-4 space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">Email Analysis Sandbox</h2>
        <p className="text-muted-foreground">Paste advisor responses and get instant AI-powered quality checks.</p>
      </div>

      <Card className="border-none shadow-sm">
        <CardContent className="pt-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="emailId">EmailID</Label>
              <Input
                id="emailId"
                value={emailId}
                onChange={(e) => setEmailId(e.target.value)}
                placeholder="# e.g. 110429"
                maxLength={6}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="advisorEmail">Advisor Email</Label>
              <Input
                id="advisorEmail"
                type="email"
                value={advisorEmail}
                onChange={(e) => setAdvisorEmail(e.target.value)}
                placeholder="advisor@example.com"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="studentEmail">Student Email Thread</Label>
              <Textarea
                id="studentEmail"
                value={studentEmail}
                onChange={(e) => setStudentEmail(e.target.value)}
                placeholder="Paste the student's email or thread here..."
                rows={12}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="advisorResponse">Advisor's Response</Label>
              <Textarea
                id="advisorResponse"
                value={advisorResponse}
                onChange={(e) => setAdvisorResponse(e.target.value)}
                placeholder="Paste the advisor's draft or response here..."
                rows={12}
              />
            </div>
          </div>

          <Button 
            onClick={handleAnalysis} 
            disabled={isButtonDisabled} 
            className="w-full md:w-auto"
          >
            {isLoading ? 'Analyzing...' : 'Generate Scorecard'}
          </Button>
        </CardContent>
      </Card>

      {error && <p className="text-red-500 font-medium">{error}</p>}

      {analysisResult && (
        <Card className="border-none shadow-md animate-in fade-in slide-in-from-bottom-2">
          <CardHeader className="bg-muted/30 border-b">
            <CardTitle>AI Audit Scorecard</CardTitle>
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
