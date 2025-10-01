# 💳 Stripe Setup Guide (15 Minutes)

## Step 1: Create Stripe Account (5 min)

1. Go to [stripe.com](https://stripe.com)
2. Click **"Start now"**
3. Fill in:
   - Email
   - Full name
   - Country
   - Password

4. **Verify your email** (check inbox)

5. You can start in **TEST MODE** immediately!
   - Full verification takes 1-2 days
   - But you can test everything now

---

## Step 2: Create Products (5 min)

### Product 1: Pro Plan

1. Stripe Dashboard → **Products** → **Add product**

2. Fill in:
   ```
   Name: Corporate Speak Generator - Pro
   Description: Unlimited generations, Voice Translator, all premium features
   ```

3. **Pricing**:
   ```
   Price: $4.99
   Billing period: Monthly (Recurring)
   Currency: USD
   ```

4. Click **Save product**

5. Click **Create payment link**

6. Configure payment link:
   ```
   ✅ After payment: Redirect to a page
   Success URL: https://YOUR-DOMAIN.com/success
   Cancel URL: https://YOUR-DOMAIN.com/

   ✅ Collect customer email
   ✅ Allow promotion codes
   ```

7. **Save payment link**

8. **Copy the payment link URL** - looks like:
   ```
   https://buy.stripe.com/test_xxxxxxxx (test mode)
   https://buy.stripe.com/xxxxxxxx (live mode)
   ```

### Product 2: Team Plan

Repeat above steps with:
```
Name: Corporate Speak Generator - Team
Description: For teams up to 5 users. Includes shared features, custom buzzwords, and API access.
Price: $19.99
Billing period: Monthly
```

---

## Step 3: Update Your Code (5 min)

### File 1: `app/components/UpgradeModal.js`

Find line ~50:
```javascript
window.open('https://buy.stripe.com/test_DEMO', '_blank');
```

Replace with YOUR payment link:
```javascript
window.open('https://buy.stripe.com/YOUR_PRO_LINK_HERE', '_blank');
```

### File 2: `app/pricing/page.js`

Find line ~66 (Pro button):
```javascript
window.open('https://buy.stripe.com/test_DEMO', '_blank');
```

Replace with:
```javascript
window.open('https://buy.stripe.com/YOUR_PRO_LINK_HERE', '_blank');
```

Find line ~90 (Team button):
```javascript
window.open('https://buy.stripe.com/test_DEMO_TEAM', '_blank');
```

Replace with:
```javascript
window.open('https://buy.stripe.com/YOUR_TEAM_LINK_HERE', '_blank');
```

---

## Step 4: Test the Payment Flow

### In TEST MODE:

1. Visit your local app: http://localhost:3001
2. Try to use Voice mode → Upgrade modal appears
3. Click **"Upgrade to Pro"**
4. Should open Stripe checkout

### Use Stripe Test Cards:

**Successful payment:**
```
Card number: 4242 4242 4242 4242
Expiry: Any future date (e.g., 12/25)
CVC: Any 3 digits (e.g., 123)
ZIP: Any 5 digits (e.g., 12345)
```

**Card requiring authentication:**
```
Card number: 4000 0025 0000 3155
(Follow prompts to complete authentication)
```

**Declined card:**
```
Card number: 4000 0000 0000 0002
```

5. Complete test payment
6. Should redirect to `/success` page
7. Verify you now have Pro access (unlimited generations, voice mode unlocked)

---

## Step 5: Set Up Webhooks (Advanced - Optional)

For automatic subscription management when users cancel/upgrade:

1. Stripe Dashboard → **Developers** → **Webhooks**
2. Click **Add endpoint**
3. Endpoint URL: `https://YOUR-DOMAIN.com/api/webhooks/stripe`
4. Select events to listen to:
   - `customer.subscription.created`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
   - `invoice.payment_succeeded`
   - `invoice.payment_failed`

5. Copy the **Signing secret** (starts with `whsec_`)

6. Create `/app/api/webhooks/stripe/route.js`:

```javascript
import { headers } from 'next/headers';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

export async function POST(req) {
  const body = await req.text();
  const signature = headers().get('stripe-signature');

  let event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err) {
    return new Response(`Webhook Error: ${err.message}`, { status: 400 });
  }

  // Handle the event
  switch (event.type) {
    case 'customer.subscription.created':
    case 'customer.subscription.updated':
      // Activate premium for user
      const subscription = event.data.object;
      console.log('Subscription updated:', subscription.id);
      break;

    case 'customer.subscription.deleted':
      // Deactivate premium for user
      const deletedSub = event.data.object;
      console.log('Subscription cancelled:', deletedSub.id);
      break;

    case 'invoice.payment_failed':
      // Send email reminder
      const failedInvoice = event.data.object;
      console.log('Payment failed:', failedInvoice.id);
      break;
  }

  return new Response(JSON.stringify({ received: true }), { status: 200 });
}
```

7. Add to `.env.local`:
```
STRIPE_SECRET_KEY=sk_test_your_key_here
STRIPE_WEBHOOK_SECRET=whsec_your_secret_here
```

---

## Step 6: Go Live (When Ready)

### Activate Your Account

1. Stripe Dashboard → Click **Activate your account**
2. Provide:
   - Business details
   - Bank account for payouts
   - Tax information
   - Identity verification

3. **Verification takes 1-2 business days**

### Switch to Live Mode

1. Toggle **Test mode** to **Live mode** (top right)
2. Create products again in Live mode (same as test)
3. Get new Live payment links
4. Update your code with Live links
5. Deploy to production

### Important: Update Environment Variables

Create `.env.local`:
```
STRIPE_SECRET_KEY=sk_live_YOUR_LIVE_KEY
STRIPE_PUBLISHABLE_KEY=pk_live_YOUR_LIVE_KEY
```

Update in Vercel:
1. Vercel Dashboard → Your Project → Settings → Environment Variables
2. Add:
   - `STRIPE_SECRET_KEY` = your live secret key
   - `STRIPE_WEBHOOK_SECRET` = your live webhook secret

3. Redeploy

---

## Stripe Dashboard Tour

### Important Sections:

**Home**
- Quick stats (revenue, customers, etc.)

**Payments**
- See all transactions
- Refund customers if needed

**Customers**
- Manage customer subscriptions
- View payment history

**Products**
- Edit pricing
- Create new products

**Billing → Customer Portal**
- Customize what customers can do:
  - Cancel subscription
  - Update payment method
  - View invoices

**Settings → Customer Emails**
- Customize receipt emails
- Add your logo/branding

---

## Common Issues & Solutions

### Issue: Payment link doesn't redirect to success page
**Solution:** Check that success URL is set in payment link settings. Must be full URL (https://...)

### Issue: User doesn't get premium access after payment
**Solution:**
1. Check that they clicked through to `/success` page
2. Verify localStorage has `premium_subscription` key
3. For long-term solution, implement webhooks

### Issue: Test mode payments work, live mode doesn't
**Solution:**
1. Verify you've switched to Live mode in dashboard
2. Update payment links to Live links (no `test_` in URL)
3. Check environment variables are using Live keys

### Issue: Customer wants refund
**Solution:**
1. Stripe Dashboard → Payments → Find transaction
2. Click **Refund**
3. Select full or partial amount
4. Refund processes in 5-10 business days

---

## Pricing Experiments

### Month 1: Keep it simple
- $4.99/month Pro
- $19.99/month Team

### Month 2+: Try variations
- **Yearly discount**: $49.99/year (save $10)
- **Lifetime deal**: $99 one-time (limited to first 500)
- **Launch special**: 50% off first month

### A/B Testing
Use Stripe's **Price Testing** feature:
1. Create 2 different prices ($4.99 vs $9.99)
2. Split traffic 50/50
3. Measure conversion rate
4. Keep the winner

---

## Revenue Tracking

### Daily Check
- Stripe Dashboard → Home
- Check MRR (Monthly Recurring Revenue)
- Track new customers

### Weekly Analysis
- Which plan converts better?
- Where do customers drop off?
- What's your churn rate?

### Monthly Goals
- Month 1: $50 MRR (10 customers)
- Month 3: $250 MRR (50 customers)
- Month 6: $1,000 MRR (200 customers)

---

## Tax Compliance

### US Sales Tax
- Stripe Tax (automatic): Stripe Dashboard → Settings → Tax
- Enable "Automatically calculate and collect tax"
- $0.50 per invoice (worth it for compliance)

### VAT (Europe)
- Same: Enable Stripe Tax
- Handles EU VAT automatically
- Provides VAT invoices

### Getting Tax Help
- Consult with accountant (deduct as business expense)
- Use Stripe's tax resources: stripe.com/tax

---

## Security Best Practices

### Never commit API keys
```
# .gitignore (already set up)
.env.local
.env
```

### Use environment variables
```
# .env.local
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PUBLISHABLE_KEY=pk_test_...
```

### Verify webhook signatures
Always verify signatures in webhook handlers (see webhook example above)

### HTTPS only
- Vercel provides free HTTPS
- Never use Stripe on HTTP

---

## Checklist

- [ ] Created Stripe account
- [ ] Verified email
- [ ] Created Pro product ($4.99/month)
- [ ] Created Team product ($19.99/month)
- [ ] Got payment links
- [ ] Updated code with payment links
- [ ] Tested with test card (4242 4242 4242 4242)
- [ ] Success page redirects correctly
- [ ] Premium access activates after payment
- [ ] Ready to go live when account verified!

---

## Support

**Stripe Help:**
- Support: support.stripe.com
- Docs: stripe.com/docs
- Community: discord.gg/stripe (unofficial)

**Your Support:**
- If users have payment issues, check Stripe Dashboard first
- Most issues are customer payment method problems
- You can issue refunds instantly through dashboard

---

**You're now ready to accept payments! 🎉**

Start in test mode, get comfortable with the flow, then activate your account and go live!

**First paying customer within 48 hours is totally possible!** 🚀
