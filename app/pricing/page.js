'use client';

export default function PricingPage() {
  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>Simple, Transparent Pricing</h1>
        <p style={styles.subtitle}>Choose the plan that's right for you</p>
      </div>

      <div style={styles.pricingGrid}>
        {/* Free Plan */}
        <div style={styles.pricingCard}>
          <h3 style={styles.planName}>Free</h3>
          <div style={styles.price}>
            <span style={styles.currency}>$</span>
            <span style={styles.amount}>0</span>
            <span style={styles.period}>/month</span>
          </div>
          <ul style={styles.features}>
            <li>✅ 5 generations per day</li>
            <li>✅ Meeting Bingo (3/day)</li>
            <li>✅ Email Fluffer</li>
            <li>❌ Voice Translator</li>
            <li>❌ No ads</li>
            <li>❌ Save favorites</li>
          </ul>
          <button style={styles.button} onClick={() => window.location.href = '/'}>
            Get Started Free
          </button>
        </div>

        {/* Pro Plan */}
        <div style={{...styles.pricingCard, ...styles.featuredCard}}>
          <div style={styles.popularBadge}>MOST POPULAR</div>
          <h3 style={styles.planName}>Pro</h3>
          <div style={styles.price}>
            <span style={styles.currency}>$</span>
            <span style={styles.amount}>4.99</span>
            <span style={styles.period}>/month</span>
          </div>
          <ul style={styles.features}>
            <li>✅ Unlimited text generations</li>
            <li>✅ Voice Translator mode</li>
            <li>✅ All AI voices</li>
            <li>✅ Unlimited bingo boards</li>
            <li>✅ No ads</li>
            <li>✅ No watermarks</li>
            <li>✅ Save favorites</li>
            <li>✅ Export to PDF</li>
          </ul>
          <button style={styles.featuredButton} onClick={() => {
            window.open('https://buy.stripe.com/test_DEMO', '_blank');
          }}>
            Upgrade to Pro
          </button>
        </div>

        {/* Team Plan */}
        <div style={styles.pricingCard}>
          <h3 style={styles.planName}>Team</h3>
          <div style={styles.price}>
            <span style={styles.currency}>$</span>
            <span style={styles.amount}>19.99</span>
            <span style={styles.period}>/month</span>
          </div>
          <p style={styles.teamNote}>Up to 5 users</p>
          <ul style={styles.features}>
            <li>✅ Everything in Pro</li>
            <li>✅ Team dashboard</li>
            <li>✅ Shared favorites</li>
            <li>✅ Custom buzzwords</li>
            <li>✅ Usage analytics</li>
            <li>✅ API access</li>
            <li>✅ Slack integration</li>
          </ul>
          <button style={styles.button} onClick={() => {
            window.open('https://buy.stripe.com/test_DEMO_TEAM', '_blank');
          }}>
            Get Team Plan
          </button>
        </div>
      </div>

      <div style={styles.faq}>
        <h2 style={styles.faqTitle}>Frequently Asked Questions</h2>
        <div style={styles.faqGrid}>
          <div style={styles.faqItem}>
            <h4 style={styles.faqQuestion}>Can I cancel anytime?</h4>
            <p style={styles.faqAnswer}>Yes! Cancel anytime with one click. No questions asked.</p>
          </div>
          <div style={styles.faqItem}>
            <h4 style={styles.faqQuestion}>Do you offer refunds?</h4>
            <p style={styles.faqAnswer}>Yes, we offer a 7-day money-back guarantee on all plans.</p>
          </div>
          <div style={styles.faqItem}>
            <h4 style={styles.faqQuestion}>What payment methods do you accept?</h4>
            <p style={styles.faqAnswer}>We accept all major credit cards via Stripe.</p>
          </div>
          <div style={styles.faqItem}>
            <h4 style={styles.faqQuestion}>Can I upgrade or downgrade later?</h4>
            <p style={styles.faqAnswer}>Absolutely! Change your plan anytime from your account settings.</p>
          </div>
        </div>
      </div>

      <div style={styles.cta}>
        <h2 style={styles.ctaTitle}>Ready to sound more professional?</h2>
        <button style={styles.ctaButton} onClick={() => window.location.href = '/'}>
          Start Free Trial
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    padding: '40px 20px',
  },
  header: {
    textAlign: 'center',
    marginBottom: '60px',
  },
  title: {
    fontSize: '3rem',
    fontWeight: 'bold',
    color: 'white',
    margin: '0 0 15px 0',
  },
  subtitle: {
    fontSize: '1.3rem',
    color: 'rgba(255,255,255,0.9)',
    margin: 0,
  },
  pricingGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '30px',
    maxWidth: '1200px',
    margin: '0 auto 80px',
  },
  pricingCard: {
    backgroundColor: 'white',
    borderRadius: '20px',
    padding: '40px 30px',
    boxShadow: '0 10px 40px rgba(0,0,0,0.2)',
    position: 'relative',
  },
  featuredCard: {
    border: '4px solid #10b981',
    transform: 'scale(1.05)',
  },
  popularBadge: {
    position: 'absolute',
    top: '-15px',
    left: '50%',
    transform: 'translateX(-50%)',
    backgroundColor: '#10b981',
    color: 'white',
    padding: '8px 20px',
    borderRadius: '20px',
    fontSize: '0.8rem',
    fontWeight: 'bold',
  },
  planName: {
    fontSize: '2rem',
    margin: '0 0 20px 0',
    color: '#333',
    textAlign: 'center',
  },
  price: {
    textAlign: 'center',
    marginBottom: '10px',
  },
  currency: {
    fontSize: '1.5rem',
    color: '#666',
    verticalAlign: 'top',
  },
  amount: {
    fontSize: '4rem',
    fontWeight: 'bold',
    color: '#667eea',
  },
  period: {
    fontSize: '1.2rem',
    color: '#666',
  },
  teamNote: {
    textAlign: 'center',
    color: '#666',
    fontSize: '0.9rem',
    marginBottom: '20px',
  },
  features: {
    listStyle: 'none',
    padding: 0,
    margin: '30px 0',
    minHeight: '300px',
  },
  button: {
    width: '100%',
    padding: '15px',
    fontSize: '1.1rem',
    fontWeight: 'bold',
    backgroundColor: '#667eea',
    color: 'white',
    border: 'none',
    borderRadius: '10px',
    cursor: 'pointer',
    transition: 'transform 0.2s',
  },
  featuredButton: {
    width: '100%',
    padding: '15px',
    fontSize: '1.1rem',
    fontWeight: 'bold',
    backgroundColor: '#10b981',
    color: 'white',
    border: 'none',
    borderRadius: '10px',
    cursor: 'pointer',
    transition: 'transform 0.2s',
  },
  faq: {
    maxWidth: '900px',
    margin: '0 auto 80px',
    backgroundColor: 'white',
    borderRadius: '20px',
    padding: '40px',
  },
  faqTitle: {
    fontSize: '2rem',
    textAlign: 'center',
    marginBottom: '40px',
    color: '#333',
  },
  faqGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '30px',
  },
  faqItem: {},
  faqQuestion: {
    fontSize: '1.1rem',
    fontWeight: 'bold',
    color: '#333',
    marginBottom: '10px',
  },
  faqAnswer: {
    color: '#666',
    lineHeight: '1.6',
  },
  cta: {
    textAlign: 'center',
    maxWidth: '600px',
    margin: '0 auto',
  },
  ctaTitle: {
    fontSize: '2.5rem',
    color: 'white',
    marginBottom: '30px',
  },
  ctaButton: {
    padding: '20px 50px',
    fontSize: '1.3rem',
    fontWeight: 'bold',
    backgroundColor: 'white',
    color: '#667eea',
    border: 'none',
    borderRadius: '50px',
    cursor: 'pointer',
    boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
  },
};
