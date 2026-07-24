import { Link } from "react-router";

const lastUpdated = "July 21, 2026";

const Section = ({ title, children }) => (
  <section className="mt-8">
    <h2 className="text-lg sm:text-xl font-bold text-blue-950">{title}</h2>
    <div className="mt-2 text-sm sm:text-base text-gray-600 leading-relaxed space-y-3">
      {children}
    </div>
  </section>
);

const PrivacyPolicy = () => {
  return (
    <section className="min-h-screen px-6 py-16 sm:py-20 bg-linear-to-br from-blue-50 via-white to-blue-100">
      <div className="max-w-3xl mx-auto bg-white border border-blue-100 rounded-3xl p-8 sm:p-12 shadow-2xl">
        <span className="inline-block px-4 py-1.5 rounded-full bg-blue-100 text-blue-700 text-xs font-bold tracking-wide uppercase">
          Legal
        </span>

        <h1 className="mt-4 text-2xl sm:text-3xl font-extrabold text-blue-950">
          Privacy Policy
        </h1>

        <p className="mt-2 text-sm text-gray-400">
          Last updated: {lastUpdated}
        </p>

        <p className="mt-6 text-sm sm:text-base text-gray-600 leading-relaxed">
          Shah Digital ("we", "us", "our") respects your privacy. This
          policy explains what information we collect through this website,
          why we collect it, and how we handle it.
        </p>

        <Section title="1. Information We Collect">
          <p>
            <strong>Enquiry form:</strong> when you submit a product or
            general enquiry, we collect your name, email address, phone
            number, and the message you send us.
          </p>
          <p>
            <strong>Account information:</strong> if you register for an
            account (customer or administrator), we collect your name,
            username, email address, and a securely hashed password. We
            never store your password in plain text.
          </p>
          <p>
            <strong>WhatsApp:</strong> if you click "Enquire on WhatsApp",
            you leave this site and continue the conversation directly with
            us on WhatsApp, which is operated by Meta under its own privacy
            policy.
          </p>
        </Section>

        <Section title="2. How We Use Your Information">
          <ul className="list-disc pl-5 space-y-2">
            <li>To respond to enquiries and provide the products/services you ask about.</li>
            <li>To create and manage your account, if you register one.</li>
            <li>To keep our platform secure and prevent misuse.</li>
          </ul>
          <p>We do not sell your personal information to third parties.</p>
        </Section>

        <Section title="3. Cookies">
          <p>
            We use a single necessary cookie to keep you signed in after
            login (an authentication session cookie). We do not currently
            use advertising or analytics cookies.
          </p>
        </Section>

        <Section title="4. Data Retention">
          <p>
            We keep enquiry and account data for as long as needed to
            respond to you, provide our services, and meet our legal
            obligations. You can request deletion of your account and
            associated data at any time (see Contact Us below).
          </p>
        </Section>

        <Section title="5. Data Security">
          <p>
            We take reasonable technical measures — including password
            hashing and access controls — to protect your information.
            However, no method of transmission or storage is 100% secure.
          </p>
        </Section>

        <Section title="6. Your Rights">
          <p>
            You may request access to, correction of, or deletion of your
            personal data by contacting us using the details below.
          </p>
        </Section>

        <Section title="7. Changes to This Policy">
          <p>
            We may update this policy from time to time. Changes will be
            posted on this page with an updated "Last updated" date.
          </p>
        </Section>

        <Section title="8. Contact Us">
          <p>
            Questions about this policy? Reach us at{" "}
            <a
              href="mailto:shahdigital18@gmail.com"
              className="text-blue-700 font-semibold hover:underline"
            >
              shahdigital18@gmail.com
            </a>
            .
          </p>
        </Section>

        <div className="mt-10 pt-6 border-t border-blue-100">
          <Link
            to="/"
            className="text-blue-700 font-semibold hover:underline text-sm"
          >
            ← Back to home
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PrivacyPolicy;
