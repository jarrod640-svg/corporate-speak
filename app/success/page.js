'use client';

import { useEffect, useState } from 'react';
import { setPremiumUser } from '../utils/usage';

export default function SuccessPage() {
  const [activated, setActivated] = useState(false);

  useEffect(() => {
    // Set premium status (expires in 31 days to cover full month)
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 31);
    setPremiumUser(expiresAt.toISOString());
    setActivated(true);

    // Track conversion
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'purchase', {
        transaction_id: Date.now(),
        value: 4.99,
        currency: 'USD',
        items: [{
          item_id: 'pro_plan',
          item_name: 'Pro Plan',
          price: 4.99,
          quantity: 1
        }]
      });
    }
  }, []);

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.successIcon}>🎉</div>
        <h1 style={styles.title}>Welcome to Pro!</h1>
        <p style={styles.subtitle}>
          Your subscription is now active. Enjoy unlimited access to all premium features!
        </p>

        <div style={styles.features}>
          <h3 style={styles.featuresTitle}>What You Just Unlocked:</h3>
          <ul style={styles.featuresList}>
            <li>✅ Unlimited text generations</li>
            <li>✅ Voice Translator with all AI voices</li>
            <li>✅ Unlimited Meeting Bingo boards</li>
            <li>✅ No watermarks on generated content</li>
            <li>✅ Save favorites (coming soon)</li>
            <li>✅ Export to PDF (coming soon)</li>
          </ul>
        </div>

        <div style={styles.buttons}>
          <button
            onClick={() => window.location.href = '/'}
            style={styles.primaryButton}
          >
            🚀 Start Using Pro Features
          </button>
          <button
            onClick={() => window.location.href = 'mailto:support@corporatespeakgen.com?subject=Pro%20Subscription'}
            style={styles.secondaryButton}
          >
            💬 Contact Support
          </button>
        </div>

        <div style={styles.info}>
          <p style={styles.infoText}>
            📧 A confirmation email has been sent to your inbox with your receipt.
          </p>
          <p style={styles.infoText}>
            💳 Manage your subscription anytime from your Stripe customer portal.
          </p>
        </div>

        <div style={styles.nextSteps}>
          <h3 style={styles.nextStepsTitle}>🎯 Quick Tips:</h3>
          <ol style={styles.nextStepsList}>
            <li>Try the Voice Translator - speak naturally and hear corporate jargon!</li>
            <li>Generate unlimited examples to practice for your next meeting</li>
            <li>Create custom Meeting Bingo boards for team bonding</li>
            <li>Share your favorite generations with colleagues (they'll love it!)</li>
          </ol>
        </div>

        <div style={styles.footer}>
          <p style={styles.footerText}>
            Thank you for supporting Corporate Speak Generator! 🙏
          </p>
          <p style={styles.footerTextSmall}>
            Questions? Email us at support@corporatespeakgen.com
          </p>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    padding: '40px 20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: '20px',
    padding: '50px 40px',
    maxWidth: '700px',
    width: '100%',
    boxShadow: '0 25px 50px rgba(0,0,0,0.3)',
  },
  successIcon: {
    fontSize: '5rem',
    textAlign: 'center',
    marginBottom: '20px',
  },
  title: {
    fontSize: '2.5rem',
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
    margin: '0 0 15px 0',
  },
  subtitle: {
    fontSize: '1.2rem',
    textAlign: 'center',
    color: '#666',
    marginBottom: '40px',
    lineHeight: '1.6',
  },
  features: {
    backgroundColor: '#f8f9fa',
    padding: '25px',
    borderRadius: '12px',
    marginBottom: '30px',
  },
  featuresTitle: {
    fontSize: '1.3rem',
    color: '#333',
    marginTop: 0,
    marginBottom: '15px',
  },
  featuresList: {
    margin: 0,
    paddingLeft: '20px',
    lineHeight: '2',
    fontSize: '1rem',
    color: '#555',
  },
  buttons: {
    display: 'grid',
    gap: '15px',
    marginBottom: '30px',
  },
  primaryButton: {
    padding: '18px',
    fontSize: '1.2rem',
    fontWeight: 'bold',
    backgroundColor: '#10b981',
    color: 'white',
    border: 'none',
    borderRadius: '12px',
    cursor: 'pointer',
    transition: 'transform 0.2s, background-color 0.3s',
  },
  secondaryButton: {
    padding: '15px',
    fontSize: '1rem',
    fontWeight: '600',
    backgroundColor: 'white',
    color: '#667eea',
    border: '2px solid #667eea',
    borderRadius: '12px',
    cursor: 'pointer',
    transition: 'all 0.3s',
  },
  info: {
    backgroundColor: '#e0e7ff',
    padding: '20px',
    borderRadius: '10px',
    marginBottom: '30px',
  },
  infoText: {
    margin: '8px 0',
    fontSize: '0.95rem',
    color: '#4338ca',
  },
  nextSteps: {
    marginBottom: '30px',
  },
  nextStepsTitle: {
    fontSize: '1.2rem',
    color: '#333',
    marginBottom: '15px',
  },
  nextStepsList: {
    margin: 0,
    paddingLeft: '20px',
    lineHeight: '2',
    fontSize: '1rem',
    color: '#555',
  },
  footer: {
    textAlign: 'center',
    paddingTop: '20px',
    borderTop: '2px solid #e5e7eb',
  },
  footerText: {
    fontSize: '1.1rem',
    color: '#333',
    fontWeight: '600',
    marginBottom: '10px',
  },
  footerTextSmall: {
    fontSize: '0.9rem',
    color: '#666',
    margin: 0,
  },
};
