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

const TermsAndConditions = () => {
  return (
    <section className="min-h-screen px-6 py-16 sm:py-20 bg-linear-to-br from-blue-50 via-white to-blue-100">
      <div className="max-w-3xl mx-auto bg-white border border-blue-100 rounded-3xl p-8 sm:p-12 shadow-2xl">
        <span className="inline-block px-4 py-1.5 rounded-full bg-blue-100 text-blue-700 text-xs font-bold tracking-wide uppercase">
          Legal
        </span>

        <h1 className="mt-4 text-2xl sm:text-3xl font-extrabold text-blue-950">
          Terms &amp; Conditions
        </h1>

        <p className="mt-2 text-sm text-gray-400">
          Last updated: {lastUpdated}
        </p>

        <p className="mt-6 text-sm sm:text-base text-gray-600 leading-relaxed">
          These Terms & Conditions govern your use of the Shah Digital
          website. By using this site, submitting an enquiry, or creating an
          account, you agree to these terms.
        </p>

        <Section title="1. Use of This Website">
          <p>
            You agree to use this website only for lawful purposes and not
            to misuse it — including attempting to gain unauthorized access
            to accounts, data, or systems that don't belong to you.
          </p>
        </Section>

        <Section title="2. Accounts">
          <p>
            If you register an account, you're responsible for keeping your
            login credentials confidential and for all activity under your
            account. Administrator accounts are intended for authorized
            Shah Digital personnel only.
          </p>
        </Section>

        <Section title="3. Product & Catalogue Information">
          <p>
            We try to keep product listings, pricing, and availability
            accurate, but errors can happen. We reserve the right to correct
            any errors and to update or remove listings at any time.
          </p>
        </Section>

        <Section title="4. Enquiries">
          <p>
            Submitting an enquiry does not create a binding order or
            contract — it's a request for us to contact you. Any resulting
            sale or service is subject to separate agreement between you and
            Shah Digital.
          </p>
        </Section>

        <Section title="5. Intellectual Property">
          <p>
            All content on this site — including text, images, logos, and
            branding — belongs to Shah Digital or its licensors and may not
            be copied or reused without permission.
          </p>
        </Section>

        <Section title="6. Limitation of Liability">
          <p>
            This website is provided "as is". To the extent permitted by
            law, Shah Digital is not liable for indirect or consequential
            losses arising from your use of the site.
          </p>
        </Section>

        <Section title="7. Changes to These Terms">
          <p>
            We may update these terms from time to time. Continued use of
            the site after changes are posted means you accept the updated
            terms.
          </p>
        </Section>

        <Section title="8. Governing Law">
          <p>
            These terms are governed by the laws of India, and any disputes
            will be subject to the exclusive jurisdiction of the courts of
            India.
          </p>
        </Section>

        <Section title="9. Contact Us">
          <p>
            Questions about these terms? Reach us at{" "}
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

export default TermsAndConditions;
