'use client';

export default function UsageCounter({ used, limit, feature }) {
  const percentage = (used / limit) * 100;
  const remaining = limit - used;

  const getColor = () => {
    if (percentage >= 100) return '#ef4444';
    if (percentage >= 80) return '#f59e0b';
    return '#10b981';
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <span style={styles.label}>Today's Usage</span>
        <span style={styles.count}>
          {used} / {limit} {feature}
        </span>
      </div>

      <div style={styles.progressBar}>
        <div
          style={{
            ...styles.progressFill,
            width: `${Math.min(percentage, 100)}%`,
            backgroundColor: getColor(),
          }}
        />
      </div>

      {remaining > 0 ? (
        <p style={styles.message}>
          ✨ {remaining} {feature} remaining today
        </p>
      ) : (
        <p style={{...styles.message, color: '#ef4444', fontWeight: 'bold'}}>
          ⚠️ Daily limit reached! Upgrade to Pro for unlimited access
        </p>
      )}
    </div>
  );
}

const styles = {
  container: {
    padding: '15px',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: '10px',
    border: '2px solid #e5e7eb',
    marginBottom: '20px',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '10px',
  },
  label: {
    fontSize: '0.9rem',
    color: '#666',
    fontWeight: '600',
  },
  count: {
    fontSize: '0.9rem',
    color: '#333',
    fontWeight: 'bold',
  },
  progressBar: {
    height: '8px',
    backgroundColor: '#e5e7eb',
    borderRadius: '10px',
    overflow: 'hidden',
    marginBottom: '10px',
  },
  progressFill: {
    height: '100%',
    transition: 'width 0.3s ease, background-color 0.3s ease',
    borderRadius: '10px',
  },
  message: {
    margin: 0,
    fontSize: '0.85rem',
    color: '#666',
    textAlign: 'center',
  },
};
