'use client';

export default function PrivacyPage() {
  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <h1 style={styles.title}>Privacy Policy</h1>
        <p style={styles.lastUpdated}>Last Updated: {new Date().toLocaleDateString()}</p>

        <section style={styles.section}>
          <h2 style={styles.heading}>1. Information We Collect</h2>
          <p style={styles.text}>
            We collect information you provide directly to us, including:
          </p>
          <ul style={styles.list}>
            <li><strong>Payment Information:</strong> Processed securely through Stripe. We never store your credit card details.</li>
            <li><strong>Usage Data:</strong> We track daily usage limits using browser localStorage (stored locally on your device).</li>
            <li><strong>Generated Content:</strong> Text you generate is not stored on our servers. Voice recordings are processed in real-time and not saved.</li>
          </ul>
        </section>

        <section style={styles.section}>
          <h2 style={styles.heading}>2. How We Use Your Information</h2>
          <p style={styles.text}>
            We use the information we collect to:
          </p>
          <ul style={styles.list}>
            <li>Provide, maintain, and improve our Service</li>
            <li>Process your payments and subscriptions</li>
            <li>Send you technical notices and support messages</li>
            <li>Respond to your comments and questions</li>
            <li>Monitor and analyze trends, usage, and activities</li>
          </ul>
        </section>

        <section style={styles.section}>
          <h2 style={styles.heading}>3. Data Storage</h2>
          <p style={styles.text}>
            <strong>Browser Storage (localStorage):</strong> We use browser localStorage to track your daily usage limits. This data is stored locally on your device and can be cleared at any time by clearing your browser data.
          </p>
          <p style={styles.text}>
            <strong>No Content Storage:</strong> We do not store the text you generate or voice recordings you make. Everything is processed in real-time in your browser.
          </p>
        </section>

        <section style={styles.section}>
          <h2 style={styles.heading}>4. Third-Party Services</h2>
          <p style={styles.text}>
            We use the following third-party services:
          </p>
          <ul style={styles.list}>
            <li><strong>Stripe:</strong> For payment processing. See <a href="https://stripe.com/privacy" target="_blank" rel="noopener">Stripe's Privacy Policy</a></li>
            <li><strong>Google Analytics:</strong> For usage analytics (if enabled). See <a href="https://policies.google.com/privacy" target="_blank" rel="noopener">Google's Privacy Policy</a></li>
            <li><strong>Vercel:</strong> For hosting. See <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener">Vercel's Privacy Policy</a></li>
          </ul>
        </section>

        <section style={styles.section}>
          <h2 style={styles.heading}>5. Web Speech API</h2>
          <p style={styles.text}>
            Our Voice Translator feature uses your browser's built-in Web Speech API. Voice data is processed by your browser and may be sent to browser providers (Google for Chrome, Microsoft for Edge, Apple for Safari) for speech recognition. We do not have access to this data.
          </p>
        </section>

        <section style={styles.section}>
          <h2 style={styles.heading}>6. Cookies</h2>
          <p style={styles.text}>
            We use localStorage instead of cookies for tracking usage limits. We may use cookies for analytics if Google Analytics is enabled. You can disable cookies in your browser settings.
          </p>
        </section>

        <section style={styles.section}>
          <h2 style={styles.heading}>7. Data Security</h2>
          <p style={styles.text}>
            We take reasonable measures to help protect your information from loss, theft, misuse, unauthorized access, disclosure, alteration, and destruction. However, no internet transmission is ever fully secure or error-free.
          </p>
        </section>

        <section style={styles.section}>
          <h2 style={styles.heading}>8. Your Rights</h2>
          <p style={styles.text}>
            You have the right to:
          </p>
          <ul style={styles.list}>
            <li>Access the personal information we hold about you</li>
            <li>Request correction of inaccurate information</li>
            <li>Request deletion of your information</li>
            <li>Object to processing of your information</li>
            <li>Cancel your subscription at any time</li>
          </ul>
        </section>

        <section style={styles.section}>
          <h2 style={styles.heading}>9. GDPR Compliance (EU Users)</h2>
          <p style={styles.text}>
            If you are in the European Economic Area (EEA), you have certain data protection rights. We aim to take reasonable steps to allow you to correct, amend, delete, or limit the use of your Personal Data.
          </p>
        </section>

        <section style={styles.section}>
          <h2 style={styles.heading}>10. Children's Privacy</h2>
          <p style={styles.text}>
            Our Service is not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13.
          </p>
        </section>

        <section style={styles.section}>
          <h2 style={styles.heading}>11. Changes to This Policy</h2>
          <p style={styles.text}>
            We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date.
          </p>
        </section>

        <section style={styles.section}>
          <h2 style={styles.heading}>12. Contact Us</h2>
          <p style={styles.text}>
            If you have any questions about this Privacy Policy, please contact us at:
            <br /><br />
            Email: privacy@corporatespeakgen.com
            <br />
            General Support: support@corporatespeakgen.com
          </p>
        </section>

        <div style={styles.backButton}>
          <button onClick={() => window.location.href = '/'} style={styles.button}>
            ← Back to App
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#f9fafb',
    padding: '40px 20px',
  },
  content: {
    maxWidth: '800px',
    margin: '0 auto',
    backgroundColor: 'white',
    padding: '50px',
    borderRadius: '15px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
  },
  title: {
    fontSize: '2.5rem',
    fontWeight: 'bold',
    color: '#333',
    marginBottom: '10px',
  },
  lastUpdated: {
    color: '#666',
    fontSize: '0.95rem',
    marginBottom: '40px',
  },
  section: {
    marginBottom: '35px',
  },
  heading: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#444',
    marginBottom: '15px',
  },
  text: {
    fontSize: '1rem',
    lineHeight: '1.8',
    color: '#555',
    marginBottom: '15px',
  },
  list: {
    paddingLeft: '30px',
    lineHeight: '1.8',
    color: '#555',
  },
  backButton: {
    marginTop: '50px',
    textAlign: 'center',
  },
  button: {
    padding: '12px 30px',
    fontSize: '1rem',
    fontWeight: '600',
    backgroundColor: '#667eea',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
  },
};
