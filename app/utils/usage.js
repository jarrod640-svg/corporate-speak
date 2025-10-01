// Usage tracking and limits for freemium model

export const LIMITS = {
  FREE_DAILY_GENERATIONS: 5,
  FREE_DAILY_VOICE_USES: 0, // Voice is premium only
  FREE_DAILY_BINGO: 3,
};

export function getUsageKey(feature) {
  const today = new Date().toISOString().split('T')[0];
  return `usage_${feature}_${today}`;
}

export function getUsageCount(feature) {
  if (typeof window === 'undefined') return 0;

  const key = getUsageKey(feature);
  const count = localStorage.getItem(key);
  return count ? parseInt(count, 10) : 0;
}

export function incrementUsage(feature) {
  if (typeof window === 'undefined') return;

  const key = getUsageKey(feature);
  const current = getUsageCount(feature);
  localStorage.setItem(key, (current + 1).toString());
}

export function hasReachedLimit(feature) {
  const count = getUsageCount(feature);

  switch(feature) {
    case 'generation':
      return count >= LIMITS.FREE_DAILY_GENERATIONS;
    case 'voice':
      return count >= LIMITS.FREE_DAILY_VOICE_USES;
    case 'bingo':
      return count >= LIMITS.FREE_DAILY_BINGO;
    default:
      return false;
  }
}

export function getRemainingUses(feature) {
  const count = getUsageCount(feature);

  switch(feature) {
    case 'generation':
      return Math.max(0, LIMITS.FREE_DAILY_GENERATIONS - count);
    case 'voice':
      return Math.max(0, LIMITS.FREE_DAILY_VOICE_USES - count);
    case 'bingo':
      return Math.max(0, LIMITS.FREE_DAILY_BINGO - count);
    default:
      return 0;
  }
}

export function isPremiumUser() {
  if (typeof window === 'undefined') return false;

  // Check if user has premium subscription
  const premium = localStorage.getItem('premium_subscription');
  if (!premium) return false;

  const data = JSON.parse(premium);
  // Check if subscription is still valid
  return new Date(data.expiresAt) > new Date();
}

export function setPremiumUser(expiresAt) {
  if (typeof window === 'undefined') return;

  localStorage.setItem('premium_subscription', JSON.stringify({
    expiresAt,
    plan: 'pro',
  }));
}

export function removePremiumUser() {
  if (typeof window === 'undefined') return;

  localStorage.removeItem('premium_subscription');
}
