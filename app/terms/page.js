'use client';

export default function TermsPage() {
  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <h1 style={styles.title}>Terms of Service</h1>
        <p style={styles.lastUpdated}>Last Updated: {new Date().toLocaleDateString()}</p>

        <section style={styles.section}>
          <h2 style={styles.heading}>1. Acceptance of Terms</h2>
          <p style={styles.text}>
            By accessing and using Corporate Speak Generator ("the Service"), you accept and agree to be bound by the terms and provision of this agreement.
          </p>
        </section>

        <section style={styles.section}>
          <h2 style={styles.heading}>2. Use License</h2>
          <p style={styles.text}>
            Permission is granted to temporarily access and use the Service for personal or commercial use. This is the grant of a license, not a transfer of title, and under this license you may not:
          </p>
          <ul style={styles.list}>
            <li>Modify or copy the materials</li>
            <li>Attempt to decompile or reverse engineer any software contained in the Service</li>
            <li>Remove any copyright or other proprietary notations from the materials</li>
            <li>Transfer the materials to another person or "mirror" the materials on any other server</li>
          </ul>
        </section>

        <section style={styles.section}>
          <h2 style={styles.heading}>3. Subscription Services</h2>
          <p style={styles.text}>
            Some parts of the Service are billed on a subscription basis ("Subscription(s)"). You will be billed in advance on a recurring and periodic basis ("Billing Cycle"). Billing cycles are set on a monthly basis.
          </p>
          <p style={styles.text}>
            At the end of each Billing Cycle, your Subscription will automatically renew unless you cancel it or we cancel it. You may cancel your Subscription renewal through your Stripe customer portal.
          </p>
        </section>

        <section style={styles.section}>
          <h2 style={styles.heading}>4. Free Trial & Free Tier</h2>
          <p style={styles.text}>
            We offer a free tier with limited usage (5 generations per day). We reserve the right to modify or discontinue the free tier at any time.
          </p>
        </section>

        <section style={styles.section}>
          <h2 style={styles.heading}>5. Refunds</h2>
          <p style={styles.text}>
            We offer a 7-day money-back guarantee for all new subscriptions. To request a refund, contact us at support@corporatespeakgen.com within 7 days of your initial purchase.
          </p>
        </section>

        <section style={styles.section}>
          <h2 style={styles.heading}>6. Content</h2>
          <p style={styles.text}>
            You retain all rights to any content you create using the Service. We claim no intellectual property rights over the material you provide or generate through the Service.
          </p>
        </section>

        <section style={styles.section}>
          <h2 style={styles.heading}>7. Prohibited Uses</h2>
          <p style={styles.text}>
            You may not use the Service:
          </p>
          <ul style={styles.list}>
            <li>For any unlawful purpose or to solicit others to perform unlawful acts</li>
            <li>To violate any international, federal, provincial or state regulations, rules, laws, or local ordinances</li>
            <li>To infringe upon or violate our intellectual property rights or the intellectual property rights of others</li>
            <li>To harass, abuse, insult, harm, defame, slander, disparage, intimidate, or discriminate</li>
            <li>To spam or distribute malware</li>
          </ul>
        </section>

        <section style={styles.section}>
          <h2 style={styles.heading}>8. Disclaimer</h2>
          <p style={styles.text}>
            The Service is provided on an "as is" and "as available" basis. We make no warranties, expressed or implied, and hereby disclaim and negate all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
          </p>
        </section>

        <section style={styles.section}>
          <h2 style={styles.heading}>9. Limitations</h2>
          <p style={styles.text}>
            In no event shall Corporate Speak Generator or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the Service.
          </p>
        </section>

        <section style={styles.section}>
          <h2 style={styles.heading}>10. Changes to Terms</h2>
          <p style={styles.text}>
            We reserve the right to modify these terms at any time. We will notify users of any material changes via email or through the Service.
          </p>
        </section>

        <section style={styles.section}>
          <h2 style={styles.heading}>11. Contact Information</h2>
          <p style={styles.text}>
            If you have any questions about these Terms, please contact us at:
            <br /><br />
            Email: support@corporatespeakgen.com
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
