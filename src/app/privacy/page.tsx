import Link from "next/link";
import { ShieldCheck, Lock, Database, Users, ArrowLeft } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <header className="border-b bg-white">
        <div className="max-w-5xl mx-auto h-16 px-6 flex items-center justify-between">
          <h1 className="text-2xl font-black text-primary">
            Privacy Policy
          </h1>

          <Button asChild variant="outline">
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Link>
          </Button>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-5xl mx-auto px-6 py-12">
        <Card className="shadow-lg border-0 rounded-3xl">
          <CardContent className="p-10 space-y-10">

            <div>
              <p className="text-sm text-muted-foreground">
                Effective Date: July 2026
              </p>

              <h2 className="text-4xl font-black text-primary mt-2">
                EduMail QA Privacy Policy
              </h2>

              <p className="mt-4 text-muted-foreground leading-8">
                EduMail QA is an internal quality assurance platform used by
                authorized employees to evaluate advisor email communications.
                This application is intended solely for internal business
                purposes and is not available for public use.
              </p>
            </div>

            {/* Section 1 */}
            <section className="space-y-4">
              <div className="flex items-center gap-3">
                <Database className="h-6 w-6 text-accent" />
                <h3 className="text-2xl font-bold">
                  Information We Collect
                </h3>
              </div>

              <ul className="space-y-2 text-muted-foreground list-disc pl-6">
                <li>User account information (name and company email).</li>
                <li>Email content submitted for quality evaluation.</li>
                <li>Audit scores, reports, and feedback.</li>
                <li>Application usage information for operational purposes.</li>
              </ul>
            </section>

            {/* Section 2 */}
            <section className="space-y-4">
              <div className="flex items-center gap-3">
                <ShieldCheck className="h-6 w-6 text-accent" />
                <h3 className="text-2xl font-bold">
                  How Information Is Used
                </h3>
              </div>

              <ul className="space-y-2 text-muted-foreground list-disc pl-6">
                <li>Evaluate advisor email quality.</li>
                <li>Generate quality scores and audit reports.</li>
                <li>Support coaching and performance improvement.</li>
                <li>Maintain operational and reporting dashboards.</li>
              </ul>
            </section>

            {/* Section 3 */}
            <section className="space-y-4">
              <div className="flex items-center gap-3">
                <Lock className="h-6 w-6 text-accent" />
                <h3 className="text-2xl font-bold">
                  Data Security
                </h3>
              </div>

              <p className="text-muted-foreground leading-8">
                Data is stored securely within company-managed systems.
                Access is restricted to authorized personnel based on their
                assigned roles. Appropriate technical and organizational
                measures are implemented to help protect company information.
              </p>
            </section>

            {/* Section 4 */}
            <section className="space-y-4">
              <div className="flex items-center gap-3">
                <Users className="h-6 w-6 text-accent" />
                <h3 className="text-2xl font-bold">
                  Data Sharing
                </h3>
              </div>

              <p className="text-muted-foreground leading-8">
                Information processed through EduMail QA is used exclusively
                for internal business operations. Data is not sold or shared
                with external organizations except where required by company
                policy or applicable law.
              </p>
            </section>

            {/* Section 5 */}
            <section className="space-y-4">
              <h3 className="text-2xl font-bold">
                Policy Updates
              </h3>

              <p className="text-muted-foreground leading-8">
                This Privacy Policy may be updated periodically to reflect
                operational, security, or regulatory changes. The latest
                version will always be available within the application.
              </p>
            </section>

            <div className="rounded-2xl bg-primary text-white p-8">
              <h3 className="text-xl font-bold mb-3">
                Internal Use Only
              </h3>

              <p className="text-primary-foreground/80 leading-7">
                EduMail QA is intended solely for authorized employees and
                approved users within the organization. Unauthorized access,
                distribution, or use of information processed through this
                application is prohibited.
              </p>
            </div>

          </CardContent>
        </Card>
      </main>
    </div>
  );
}