import Link from "next/link";
import {
  ShieldCheck,
  CheckCircle2,
  Lock,
  FileSearch,
  Database,
  Scale,
  AlertCircle,
} from "lucide-react";

export default function CompliancePage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto max-w-6xl px-6 py-16">
        {/* Header */}
        <div className="text-center mb-14">
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
            <ShieldCheck className="h-8 w-8 text-primary" />
          </div>

          <h1 className="text-4xl font-bold tracking-tight">
            Compliance
          </h1>

          <p className="mt-4 text-muted-foreground max-w-3xl mx-auto">
            The AI Email Audit Tool is designed to support organizations in
            maintaining consistent quality standards, responsible AI usage,
            secure handling of business communications, and internal compliance
            processes.
          </p>
        </div>

        <div className="space-y-8">

          {/* Data Security */}
          <section className="rounded-xl border p-6">
            <div className="flex items-center gap-3 mb-4">
              <Lock className="text-primary" />
              <h2 className="text-2xl font-semibold">
                Data Security
              </h2>
            </div>

            <ul className="space-y-3 text-muted-foreground list-disc pl-6">
              <li>Encrypted communication between users and the application.</li>
              <li>Controlled access to audit reports and dashboards.</li>
              <li>Secure storage of audit records according to organizational policies.</li>
              <li>Support for role-based access where implemented.</li>
            </ul>
          </section>

          {/* Responsible AI */}
          <section className="rounded-xl border p-6">
            <div className="flex items-center gap-3 mb-4">
              <CheckCircle2 className="text-primary" />
              <h2 className="text-2xl font-semibold">
                Responsible AI
              </h2>
            </div>

            <p className="text-muted-foreground leading-7">
              AI-generated audit scores and recommendations are intended to
              assist reviewers and quality teams. Final business decisions
              should always include human review where appropriate.
            </p>

            <ul className="mt-4 space-y-2 list-disc pl-6 text-muted-foreground">
              <li>AI assists—not replaces—human evaluation.</li>
              <li>Results should be validated before operational decisions.</li>
              <li>Models may produce occasional inaccuracies.</li>
            </ul>
          </section>

          {/* Quality Standards */}
          <section className="rounded-xl border p-6">
            <div className="flex items-center gap-3 mb-4">
              <FileSearch className="text-primary" />
              <h2 className="text-2xl font-semibold">
                Quality & Audit Standards
              </h2>
            </div>

            <p className="text-muted-foreground leading-7">
              The platform evaluates emails using predefined quality criteria,
              helping organizations maintain consistency across customer
              communications.
            </p>

            <div className="grid gap-3 mt-5 md:grid-cols-2">
              <div className="rounded-lg border p-4">
                ✓ Grammar & Language Quality
              </div>

              <div className="rounded-lg border p-4">
                ✓ Professional Tone
              </div>

              <div className="rounded-lg border p-4">
                ✓ Policy & Compliance Checks
              </div>

              <div className="rounded-lg border p-4">
                ✓ Customer Communication Standards
              </div>

              <div className="rounded-lg border p-4">
                ✓ Resolution Quality
              </div>

              <div className="rounded-lg border p-4">
                ✓ Overall Performance Scoring
              </div>
            </div>
          </section>

          {/* Data Handling */}
          <section className="rounded-xl border p-6">
            <div className="flex items-center gap-3 mb-4">
              <Database className="text-primary" />
              <h2 className="text-2xl font-semibold">
                Data Handling
              </h2>
            </div>

            <p className="text-muted-foreground leading-7">
              Organizations using the platform are responsible for ensuring
              they have the necessary permissions to upload email content for
              analysis. Where possible, sensitive information should be removed
              or masked before submission.
            </p>
          </section>

          {/* Regulatory */}
          <section className="rounded-xl border p-6">
            <div className="flex items-center gap-3 mb-4">
              <Scale className="text-primary" />
              <h2 className="text-2xl font-semibold">
                Regulatory Considerations
              </h2>
            </div>

            <p className="text-muted-foreground leading-7">
              The AI Email Audit Tool is designed to support organizational
              compliance efforts. Customers remain responsible for complying
              with applicable laws, regulations, contractual obligations, and
              internal governance requirements.
            </p>
          </section>

          {/* Disclaimer */}
          <section className="rounded-xl border border-yellow-300 bg-yellow-50 p-6 dark:bg-yellow-950/20">
            <div className="flex items-center gap-3 mb-4">
              <AlertCircle className="text-yellow-600" />
              <h2 className="text-2xl font-semibold">
                Compliance Disclaimer
              </h2>
            </div>

            <p className="text-muted-foreground leading-7">
              This page describes the platform's compliance-related features and
              practices. It should not be interpreted as a claim that the
              platform is certified under any specific regulatory framework or
              security standard unless explicitly stated by the organization
              operating the service.
            </p>
          </section>

        </div>

        <div className="mt-12 text-center">
          <Link
            href="/"
            className="inline-flex rounded-lg bg-primary px-6 py-3 text-primary-foreground transition hover:opacity-90"
          >
            Return to Home
          </Link>
        </div>
      </div>
    </main>
  );
}