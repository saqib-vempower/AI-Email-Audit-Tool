import Link from "next/link";
import { FileText, ShieldCheck, AlertTriangle, Scale, Lock, Mail } from "lucide-react";

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto max-w-5xl px-6 py-16">
        <div className="mb-10 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
            <FileText className="h-8 w-8 text-primary" />
          </div>

          <h1 className="text-4xl font-bold tracking-tight">
            Terms of Service
          </h1>

          <p className="mt-4 text-muted-foreground">
            Effective Date: July 2026
          </p>

          <p className="mx-auto mt-4 max-w-3xl text-muted-foreground">
            These Terms of Service govern your use of the AI Email Audit Tool.
            By accessing or using this platform, you agree to comply with these
            terms and all applicable laws.
          </p>
        </div>

        <div className="space-y-8">

          <section className="rounded-xl border p-6">
            <div className="mb-4 flex items-center gap-3">
              <ShieldCheck className="text-primary" />
              <h2 className="text-2xl font-semibold">
                1. Acceptance of Terms
              </h2>
            </div>

            <p className="text-muted-foreground leading-7">
              By using this platform, you acknowledge that you have read,
              understood, and agreed to these Terms of Service. If you do not
              agree with any part of these terms, please discontinue using the
              application.
            </p>
          </section>

          <section className="rounded-xl border p-6">
            <div className="mb-4 flex items-center gap-3">
              <Mail className="text-primary" />
              <h2 className="text-2xl font-semibold">
                2. Service Description
              </h2>
            </div>

            <p className="text-muted-foreground leading-7">
              The AI Email Audit Tool evaluates customer support emails using
              artificial intelligence. The platform analyzes communication
              quality, grammar, compliance, professionalism, tone, clarity, and
              other quality indicators to provide recommendations for
              improvement.
            </p>

            <ul className="mt-4 list-disc space-y-2 pl-6 text-muted-foreground">
              <li>Grammar and language assessment</li>
              <li>Tone and professionalism analysis</li>
              <li>Compliance evaluation</li>
              <li>Quality scoring</li>
              <li>Performance reporting and dashboards</li>
            </ul>
          </section>

          <section className="rounded-xl border p-6">
            <div className="mb-4 flex items-center gap-3">
              <Scale className="text-primary" />
              <h2 className="text-2xl font-semibold">
                3. Acceptable Use
              </h2>
            </div>

            <p className="text-muted-foreground mb-4">
              You agree to use the platform responsibly and only for lawful
              purposes.
            </p>

            <ul className="list-disc space-y-2 pl-6 text-muted-foreground">
              <li>Upload only emails you are authorized to analyze.</li>
              <li>Do not attempt to disrupt or interfere with the service.</li>
              <li>Do not misuse AI-generated reports.</li>
              <li>Do not upload malicious or harmful content.</li>
              <li>Comply with your organization's data handling policies.</li>
            </ul>
          </section>

          <section className="rounded-xl border p-6">
            <div className="mb-4 flex items-center gap-3">
              <Lock className="text-primary" />
              <h2 className="text-2xl font-semibold">
                4. Privacy & Data Handling
              </h2>
            </div>

            <p className="text-muted-foreground leading-7">
              Email content submitted for analysis may be processed by AI
              services solely for generating audit results. Users are
              responsible for ensuring they have the necessary permissions to
              upload the content.
            </p>

            <p className="mt-4 text-muted-foreground leading-7">
              We recommend removing sensitive personal information whenever
              possible before uploading emails for analysis.
            </p>
          </section>

          <section className="rounded-xl border p-6">
            <div className="mb-4 flex items-center gap-3">
              <AlertTriangle className="text-primary" />
              <h2 className="text-2xl font-semibold">
                5. AI Generated Results
              </h2>
            </div>

            <p className="text-muted-foreground leading-7">
              Audit scores, recommendations, and insights are generated using
              artificial intelligence. While every effort is made to provide
              accurate assessments, AI-generated outputs may occasionally
              contain inaccuracies and should be reviewed by qualified personnel
              before making important operational decisions.
            </p>
          </section>

          <section className="rounded-xl border p-6">
            <h2 className="mb-4 text-2xl font-semibold">
              6. Intellectual Property
            </h2>

            <p className="text-muted-foreground leading-7">
              All software, dashboards, algorithms, branding, and interface
              components remain the intellectual property of the platform owner.
              Users may not copy, redistribute, reverse engineer, or reproduce
              any part of the application without permission.
            </p>
          </section>

          <section className="rounded-xl border p-6">
            <h2 className="mb-4 text-2xl font-semibold">
              7. Limitation of Liability
            </h2>

            <p className="text-muted-foreground leading-7">
              The AI Email Audit Tool is provided "as is" without warranties of
              any kind. The platform shall not be liable for business losses,
              incorrect audit decisions, data inaccuracies, or indirect damages
              arising from use of the service.
            </p>
          </section>

          <section className="rounded-xl border p-6">
            <h2 className="mb-4 text-2xl font-semibold">
              8. Service Availability
            </h2>

            <p className="text-muted-foreground leading-7">
              We strive to maintain reliable service availability but cannot
              guarantee uninterrupted access. Maintenance, upgrades, or external
              AI service outages may temporarily affect functionality.
            </p>
          </section>

          <section className="rounded-xl border p-6">
            <h2 className="mb-4 text-2xl font-semibold">
              9. Changes to Terms
            </h2>

            <p className="text-muted-foreground leading-7">
              These Terms of Service may be updated periodically. Continued use
              of the platform after updates constitutes acceptance of the
              revised terms.
            </p>
          </section>

          <section className="rounded-xl border p-6">
            <h2 className="mb-4 text-2xl font-semibold">
              10. Contact
            </h2>

            <p className="text-muted-foreground leading-7">
              For questions regarding these Terms of Service, please contact
              your system administrator or support team.
            </p>
          </section>
        </div>

        <div className="mt-12 flex justify-center">
          <Link
            href="/"
            className="rounded-lg bg-primary px-6 py-3 text-primary-foreground transition hover:opacity-90"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
}