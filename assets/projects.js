// Portfolio data. Company names are left out on purpose; each project is described by what it is.
// kind: "site" (desktop screenshots) or "app" (narrow app screens shown in phone frames).
window.PROJECTS = [
  {
    slug: 'client-portal', kind: 'portal', group: 'apps', feature: true,
    title: 'Client portal with AI calling',
    role: 'Designed and built',
    summary: 'Private portal for a financial services sales team. New leads from ad forms and booked calls arrive on their own, go to the next agent in rotation, and get an AI voice call within two minutes that puts interested people straight through to an agent. Managers see every lead and file in one pipeline.',
    points: [
      'AI voice calls with live transfer to a free agent, plus summary, transcript and recording on each file',
      'Two-way CRM sync, round-robin assignment and per-client checklists',
      'WhatsApp and Telegram call reminders, two-step sign-in, encrypted data and a full activity log'
    ],
    tags: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'ElevenLabs voice AI', 'Twilio', 'Facebook Lead Ads'],
    url: ''
  },
  {
    slug: 'vance-redesign', kind: 'site', group: 'web',
    title: 'Credit repair website redesign',
    role: 'Proposal and build',
    summary: 'Full redesign pitched to management: clearer navigation, stronger proof sections, and structure written for Google and AI assistants (SEO, AEO, GEO).',
    tags: ['Redesign', 'SEO / AEO / GEO', 'Copywriting'],
    url: 'https://halit-88.github.io/vance-credit-redesign/'
  },
  {
    slug: 'greenlight', kind: 'site', group: 'web',
    title: 'B2B SaaS site for auto dealers',
    role: 'Brand, copy and build',
    summary: 'Marketing site for a lead-recovery product that helps dealerships win back declined buyers, with ROI figures, an article library and a dealer email and SMS program behind it.',
    tags: ['B2B marketing', 'Content', 'Email and SMS'],
    url: 'https://greenlightrecover.com/'
  },
  {
    slug: 'veridex', kind: 'site', group: 'web',
    title: 'Fleet software product site',
    role: 'Positioning and build',
    summary: 'Product site for rental-fleet operations software, organized around the jobs it replaces, with a founder demo booking flow.',
    tags: ['Product marketing', 'SaaS', 'Demo funnel'],
    url: 'https://veridexmobility.com/'
  },
  {
    slug: 'ezrentals', kind: 'site', group: 'web',
    title: 'Car rental company website',
    role: 'Built and maintain',
    summary: 'Booking-focused site for a Maryland car rental company: live vehicle list, all-in pricing, and inquiry and booking forms.',
    tags: ['Local business', 'Booking forms', 'Conversion'],
    url: 'https://ezrentalsandleasing.com/'
  },
  {
    slug: 'alina', kind: 'site', group: 'web',
    title: 'Rideshare car rental brand',
    role: 'Three-page campaign',
    summary: 'Brand site plus two audience pages: one recruiting car owners to list idle vehicles, one recruiting Uber and Lyft drivers, each with its own earnings calculator.',
    tags: ['Two-sided marketing', 'Calculators', 'Landing pages'],
    url: 'https://halit-88.github.io/alina-website/'
  },
  {
    slug: 'eztow', kind: 'site', group: 'web',
    title: 'Towing company website',
    role: 'Design and build',
    summary: 'Call-first site for a 24/7 towing service: click-to-call everywhere, service menu and a quote flow built for people on the side of the road.',
    tags: ['Local SEO', 'Click to call', 'Mobile first'],
    url: 'https://eztownow.com/'
  },
  {
    slug: 'gtacfinance', kind: 'site', group: 'web',
    title: 'Financial education platform',
    role: 'Web operations',
    summary: 'Membership site with interactive tools (loan wizard, credit calculators, readiness quiz) and Stripe subscription billing on daily, weekly and monthly plans.',
    tags: ['WordPress', 'Stripe', 'Interactive tools'],
    url: 'https://gtacfinance.com/'
  },
  {
    slug: 'gtac-cardealers', kind: 'site', group: 'web',
    title: 'Dealer partnership site',
    role: 'Build',
    summary: 'B2B site pitching dealerships on turning declined leads into revenue, with the market data and partner sign-up flow.',
    tags: ['B2B', 'Lead capture'],
    url: 'https://halit-88.github.io/cardealers-gtacfinance-static/'
  },
  {
    slug: 'gtac-dealers', kind: 'site', group: 'web',
    title: 'Dealer program landing page',
    role: 'Build',
    summary: 'Single-goal landing page with video, a numbered value list and two clear calls to action.',
    tags: ['Landing page', 'Video'],
    url: 'https://halit-88.github.io/gtac-dealers-site/'
  },
  {
    slug: 'gtac-transformation', kind: 'site', group: 'web',
    title: 'Credit improvement campaign page',
    role: 'Build',
    summary: 'Campaign landing page for a credit-building program, built around one explainer video and an eligibility checklist.',
    tags: ['Campaign page', 'Video'],
    url: 'https://halit-88.github.io/gtac-financial-transformation/'
  },
  {
    slug: 'somados', kind: 'site', group: 'web',
    title: 'Travel booking website (Arabic)',
    role: 'Founder, built solo',
    summary: 'Flights, visas and hotels between Iraq and Turkey. Fares refresh automatically, route pages rebuild and ping search engines, and bookings go straight to WhatsApp.',
    tags: ['Arabic / RTL', 'Automation', 'SEO'],
    url: 'https://somados.com/'
  },
  {
    slug: 'mody', kind: 'site', group: 'web',
    title: 'Car wash and detailing website',
    role: 'Design and build',
    summary: 'Premium local service site with packages, proof points and a booking call to action above the fold.',
    tags: ['Local business', 'Branding'],
    url: 'https://modycarwash.com/'
  },
  {
    slug: 'ez-rent-app', kind: 'app', group: 'apps',
    title: 'Self-service car rental app',
    role: 'Product and build',
    summary: 'Customers pick a car, enter driver and license details, sign the agreement and verify identity, all from their phone, with no counter visit.',
    tags: ['Web app', 'E-signature', 'Onboarding flow'],
    url: 'https://rent.ezrentalsandleasing.com/'
  },
  {
    slug: 'ez-verify', kind: 'app', group: 'apps',
    title: 'Video identity verification',
    role: 'Build',
    summary: 'Two-sided video call: the customer joins from a link, the agent checks their license live from a console.',
    tags: ['Video calling', 'Real time'],
    url: 'https://verify.ezrentalsandleasing.com/'
  },
  {
    slug: 'ez-toll', kind: 'site', group: 'apps',
    title: 'Toll violation reassignment tool',
    role: 'Build',
    summary: 'Splits the monthly toll bundle PDF into individual violations, matches each to the renter, and sends the reassignment packets.',
    tags: ['Automation', 'Google Sheets', 'PDF processing'],
    url: 'https://halit-88.github.io/ez-toll/'
  }
];

// Ads Manager screenshots: company names and spend are blurred, no numbers in the copy.
window.PROOF = [
  { src: 'assets/shots/ads/2.webp', cap: 'Account overview: daily lead trend by campaign' },
  { src: 'assets/shots/ads/1.webp', cap: 'Lead form campaigns for a credit services company' },
  { src: 'assets/shots/ads/4.webp', cap: 'Ad-level results: phone calls and message conversations' },
  { src: 'assets/shots/ads/3.webp', cap: 'Message campaigns for a car rental company' }
];

window.TOOLS = ['Meta Ads Manager', 'Google Analytics 4', 'Google Tag Manager', 'Zapier', 'Twilio', 'GoHighLevel', 'Mailchimp', 'Credit Repair Cloud', 'WordPress', 'Elementor', 'Stripe', 'Calendly', 'ElevenLabs', 'React', 'Node.js', 'PostgreSQL', 'Railway', 'Cloudflare', 'Canva', 'Claude'];
