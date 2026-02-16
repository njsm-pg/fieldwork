import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy | Persona Grata Inc.',
  description: 'Privacy Policy for Respondents of Persona Grata Inc.',
}

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-3xl px-4 py-12">
        <h1 className="mb-8 text-3xl font-bold">Privacy Policy - Respondents</h1>

        <div className="prose prose-sm max-w-none space-y-6 text-muted-foreground">
          <section>
            <h2 className="text-xl font-semibold text-foreground">1. Information We Collect</h2>
            <p>We collect the following categories of information:</p>

            <h3 className="text-lg font-medium text-foreground mt-4">a. Information You Provide Directly</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Contact details (e.g., name, email, or phone number) if required for eligibility verification or incentive distribution.</li>
              <li>Demographic or professional details (such as age range, occupation, or location) used for screening or segmentation.</li>
              <li>Responses and preferences submitted through PGI screening and Customer surveys.</li>
            </ul>

            <h3 className="text-lg font-medium text-foreground mt-4">b. Information Collected Automatically</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Device data, browser type, IP address, operating system, and approximate location.</li>
              <li>Engagement metrics (clicks, referral URLs, timestamps) to verify authenticity and improve system performance.</li>
              <li>Advertising identifiers when you interact with PGI digital ads.</li>
            </ul>

            <h3 className="text-lg font-medium text-foreground mt-4">c. Information from Third Parties</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Verification or payout data provided by incentive management vendors.</li>
              <li>Customer-supplied or publicly available data used to validate targeting and response quality.</li>
            </ul>
          </section>

          <hr className="my-6" />

          <section>
            <h2 className="text-xl font-semibold text-foreground">2. How We Use Your Information</h2>
            <p>PGI uses respondent data for the following purposes:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Qualification and Screening</strong> – to confirm eligibility and authenticity before engaging respondents in Customer surveys.</li>
              <li><strong>Survey Administration</strong> – to manage data collection, validate results, and provide Customers with accurate datasets.</li>
              <li><strong>Incentive Management</strong> – to verify eligibility and distribute incentives through authorized third-party payout providers.</li>
              <li><strong>Analytics and Model Development</strong> – to build, train, and refine custom synthetic data models and research tools.</li>
              <li><strong>Fraud Detection and Security</strong> – to prevent duplicate, automated, or otherwise fraudulent participation.</li>
              <li><strong>Compliance and Communication</strong> – to meet legal obligations and communicate with respondents regarding participation or incentives.</li>
            </ul>
          </section>

          <hr className="my-6" />

          <section>
            <h2 className="text-xl font-semibold text-foreground">3. Data Sharing with Customers</h2>
            <p>PGI may share data with its Customers (clients commissioning or providing surveys) as part of its research services.</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Raw Data Sharing:</strong> PGI may provide <strong>raw, non-anonymized data</strong> from the PGI screening survey and/or Customer survey responses — including through <strong>CSV export or similar data delivery methods</strong> — for the Customer&apos;s analysis, quality control, or integration with their own research systems.</li>
              <li>Such shared data may include personally identifiable or contact information when relevant to the study&apos;s requirements or incentive verification process.</li>
              <li>Customers are contractually required to handle this data responsibly and comply with applicable data protection laws and their own privacy obligations.</li>
            </ul>
          </section>

          <hr className="my-6" />

          <section>
            <h2 className="text-xl font-semibold text-foreground">4. Use of Data for Synthetic Modeling</h2>
            <p>
              Depending on the engagement, PGI may only provide respondent sourcing and no synthetic model or persona will be created.
            </p>
            <p>
              However, where data is used for synthetic modeling, PGI will use its best efforts to anonymize, aggregate, or otherwise de-identify all personal information prior to use. Synthetic modeling data is used solely for research and innovation (e.g., training analytic systems or simulating respondent behavior) and does not include any directly identifiable information.
            </p>
          </section>

          <hr className="my-6" />

          <section>
            <h2 className="text-xl font-semibold text-foreground">5. When We Share Information</h2>
            <p>In addition to sharing with Customers under Section 3, PGI may share information:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>With Service Providers</strong> – trusted vendors who help host surveys, validate responses, manage data, or process incentives.</li>
              <li><strong>With Legal Authorities</strong> – when required to comply with laws, subpoenas, or valid government requests.</li>
            </ul>
            <p>
              All third parties accessing identifiable data are bound by confidentiality and data-protection obligations consistent with this Policy.
            </p>
          </section>

          <hr className="my-6" />

          <section>
            <h2 className="text-xl font-semibold text-foreground">6. Incentive Payout Providers</h2>
            <p>
              PGI may use third-party platforms to distribute incentives (e.g., gift cards, digital vouchers). These providers collect limited data (e.g., name, email) solely for fulfilling rewards.
            </p>
            <p>
              By accepting an incentive, you agree to the applicable provider&apos;s terms and privacy practices. PGI is not responsible for those providers&apos; independent data practices beyond what is required under our agreements with them.
            </p>
          </section>

          <hr className="my-6" />

          <section>
            <h2 className="text-xl font-semibold text-foreground">7. Data Retention</h2>
            <p>PGI retains data only as long as necessary to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Complete or verify survey and incentive activities;</li>
              <li>Fulfill contractual obligations to Customers; and</li>
              <li>Comply with legal, accounting, or audit requirements.</li>
            </ul>
            <p>
              <strong>Future Survey Participation.</strong> With your explicit consent at the time of data collection, PGI may retain your contact and profile information for future survey invitations or research opportunities. You will always have the option to:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Withdraw this consent at any time by using the unsubscribe or opt-out mechanism in our communications, or by emailing <strong>support@personagrata.ai</strong>; and</li>
              <li>Request deletion of your retained information.</li>
            </ul>
            <p>
              If you do not provide consent, the information collected for a given survey will be used solely for that project and related record-keeping, then deleted or de-identified once retention obligations are met.
            </p>
            <p>
              De-identified data used for synthetic model training may be retained indefinitely in anonymized form.
            </p>
          </section>

          <hr className="my-6" />

          <section>
            <h2 className="text-xl font-semibold text-foreground">8. Your Rights and Choices</h2>
            <p>Depending on your jurisdiction, you may have rights to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Access a copy of the data PGI holds about you,</li>
              <li>Request correction or deletion,</li>
              <li>Restrict or object to certain processing activities, and</li>
              <li>Request data portability (a copy in a machine-readable format).</li>
            </ul>
            <p>
              Contact <strong>support@personagrata.ai</strong> to exercise these rights. PGI may need to verify your identity before fulfilling your request.
            </p>
          </section>

          <hr className="my-6" />

          <section>
            <h2 className="text-xl font-semibold text-foreground">9. Security</h2>
            <p>
              PGI maintains appropriate administrative and technical safeguards designed to protect personal data against loss, unauthorized access, or misuse. No system is completely secure, and PGI cannot guarantee absolute security.
            </p>
          </section>

          <hr className="my-6" />

          <section>
            <h2 className="text-xl font-semibold text-foreground">10. International Data Transfers</h2>
            <p>
              When transferring data outside your country of residence, PGI implements appropriate safeguards, such as Standard Contractual Clauses or equivalent legal mechanisms, to ensure adequate protection of your personal data.
            </p>
          </section>

          <hr className="my-6" />

          <section>
            <h2 className="text-xl font-semibold text-foreground">11. Updates to This Privacy Policy</h2>
            <p>
              PGI may amend this Policy from time to time. Changes will be posted on our official site with the &quot;Effective Date&quot; updated accordingly.
            </p>
          </section>

          <hr className="my-6" />

          <section>
            <h2 className="text-xl font-semibold text-foreground">12. Contact Information</h2>
            <p>
              For general or privacy-related questions, contact us at: <strong>Persona Grata Inc.</strong> Email (Support): <strong>support@personagrata.ai</strong> or (Privacy &amp; Data Requests): <strong>support@personagrata.ai</strong>
            </p>
          </section>

          <hr className="my-6" />

          <p className="font-semibold text-foreground">
            By participating in PGI surveys or related activities, you acknowledge that you have read, understood, and agreed to this Privacy Policy.
          </p>
        </div>

        <div className="mt-12 border-t pt-6">
          <p className="text-center text-xs text-muted-foreground">
            Persona Grata Inc.
          </p>
        </div>
      </div>
    </div>
  )
}
