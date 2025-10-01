'use client';

export default function UpgradeModal({ isOpen, onClose, feature }) {
  if (!isOpen) return null;

  const featureMessages = {
    generation: {
      title: "Daily Limit Reached! 🚀",
      description: "You've used all 5 free generations today. Upgrade to Pro for unlimited access!",
    },
    voice: {
      title: "Voice Mode is Premium! 🎤",
      description: "The Voice Translator feature is available exclusively for Pro users. Upgrade now!",
    },
    bingo: {
      title: "Bingo Limit Reached! 🎯",
      description: "You've generated your 3 free bingo boards today. Go Pro for unlimited boards!",
    },
  };

  const message = featureMessages[feature] || featureMessages.generation;

  return (
    <div style={styles.overlay} onClick={onClose}>
      <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} style={styles.closeButton}>✕</button>

        <div style={styles.header}>
          <h2 style={styles.title}>{message.title}</h2>
          <p style={styles.description}>{message.description}</p>
        </div>

        <div style={styles.pricing}>
          <div style={styles.priceCard}>
            <div style={styles.badge}>MOST POPULAR</div>
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

            <button style={styles.upgradeButton} onClick={() => {
              window.open('https://buy.stripe.com/test_DEMO', '_blank');
            }}>
              Upgrade to Pro
            </button>
          </div>
        </div>

        <div style={styles.footer}>
          <p style={styles.footerText}>
            💳 Secure payment via Stripe • Cancel anytime • 7-day money-back guarantee
          </p>
        </div>
      </div>
    </div>
  );
}

const styles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
    padding: '20px',
  },
  modal: {
    backgroundColor: 'white',
    borderRadius: '20px',
    maxWidth: '500px',
    width: '100%',
    maxHeight: '90vh',
    overflow: 'auto',
    position: 'relative',
    boxShadow: '0 25px 50px rgba(0,0,0,0.3)',
  },
  closeButton: {
    position: 'absolute',
    top: '15px',
    right: '15px',
    background: 'none',
    border: 'none',
    fontSize: '1.5rem',
    cursor: 'pointer',
    color: '#666',
    width: '30px',
    height: '30px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '50%',
    transition: 'background-color 0.3s',
  },
  header: {
    padding: '40px 30px 20px',
    textAlign: 'center',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    borderRadius: '20px 20px 0 0',
  },
  title: {
    margin: '0 0 10px 0',
    fontSize: '1.8rem',
    fontWeight: 'bold',
  },
  description: {
    margin: 0,
    fontSize: '1rem',
    opacity: 0.95,
  },
  pricing: {
    padding: '30px',
  },
  priceCard: {
    position: 'relative',
    border: '3px solid #667eea',
    borderRadius: '15px',
    padding: '25px',
    backgroundColor: '#f8f9fa',
  },
  badge: {
    position: 'absolute',
    top: '-12px',
    left: '50%',
    transform: 'translateX(-50%)',
    backgroundColor: '#10b981',
    color: 'white',
    padding: '5px 15px',
    borderRadius: '20px',
    fontSize: '0.75rem',
    fontWeight: 'bold',
  },
  planName: {
    margin: '0 0 15px 0',
    fontSize: '1.5rem',
    color: '#333',
    textAlign: 'center',
  },
  price: {
    textAlign: 'center',
    marginBottom: '20px',
  },
  currency: {
    fontSize: '1.5rem',
    color: '#666',
    verticalAlign: 'top',
  },
  amount: {
    fontSize: '3rem',
    fontWeight: 'bold',
    color: '#667eea',
  },
  period: {
    fontSize: '1rem',
    color: '#666',
  },
  features: {
    listStyle: 'none',
    padding: 0,
    margin: '0 0 25px 0',
  },
  upgradeButton: {
    width: '100%',
    padding: '15px',
    fontSize: '1.1rem',
    fontWeight: 'bold',
    backgroundColor: '#667eea',
    color: 'white',
    border: 'none',
    borderRadius: '10px',
    cursor: 'pointer',
    transition: 'transform 0.2s, background-color 0.3s',
  },
  footer: {
    padding: '20px 30px 30px',
    textAlign: 'center',
  },
  footerText: {
    margin: 0,
    fontSize: '0.85rem',
    color: '#666',
  },
};
