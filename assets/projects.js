// Portfolio data. Projects were planned by Khalid and built with AI tools. Company names are left out on purpose; each project is described by what it is.
// kind: "site" (desktop screenshots) or "app" (narrow app screens shown in phone frames).
window.PROJECTS = [
  {
    slug: 'p17', kind: 'portal', group: 'apps', feature: true, shots: 5,
    title: 'SO STUDIO: AI video content studio',
    role: 'Designed and built for in-house marketing',
    summary: 'I built SO STUDIO to keep up with the volume of video social platforms demand. One long video or podcast goes in; finished, on-brand Shorts, Reels, TikToks and episodes come out. It runs fully on a Mac and uses only rights-free footage, music and effects, so ads are not blocked or muted.',
    points: [
      'Every format from one upload, with speaker tracking, captions, motion graphics, music ducking and filler removal',
      'Rights-free by design: AI-checked Pexels B-roll, licensed music and CC0 sound effects',
      'Brand kits from any website, per-brand compliance rules, and AI-written posts sent to a scheduler after review'
    ],
    tags: ['AI video', 'Short-form content', 'Brand kits', 'Rights-free media', 'Runs locally']
  },
  {
    slug: 'p18', kind: 'portal', group: 'apps', feature: true, shots: 5,
    title: 'SO AI: private on-device AI assistant',
    role: 'Designed and built, runs fully offline',
    summary: 'A ChatGPT-style assistant that runs entirely on one Mac, with no cloud AI. I built it to show that a company can have chat, document Q&A, voice and image tools while keeping every prompt, file and customer record in-house. I can set up the same kind of private AI for any team that handles sensitive data.',
    points: [
      'Privacy by design: the language model, document search and speech recognition all run on localhost, so nothing is sent to an AI company',
      'Private knowledge base (RAG): learns from PDFs, Word, slides, spreadsheets, audio and video, and answers from the company\'s own files',
      'No per-message API bill, works without internet, and makes data-handling and NDA rules easier to meet'
    ],
    tags: ['Local LLM', 'RAG', 'Ollama', 'Whisper', 'Electron', 'Data privacy']
  },
  {
    slug: 'p19', kind: 'portal', group: 'apps', feature: true, shots: 3,
    title: 'Social media auto-publisher',
    role: 'Designed and built, runs on its own',
    summary: 'The publishing half of the content system. Finished videos land in a Dropbox folder and go out on schedule to Facebook, Instagram, TikTok and YouTube Shorts, one a day per platform, with no one logging in to post. Every week it also writes and designs branded image posts and holds them 48 hours for review before scheduling them.',
    points: [
      'Quality checks on every file (format, length, audio, size), with a written reason for anything rejected',
      'Per-platform rules and queues, so a video that does not fit one platform never leaves a gap on the others',
      'Runs on GitHub Actions every 3 hours with a permanent ledger of every post, at almost no running cost'
    ],
    tags: ['Automation', 'GitHub Actions', 'Buffer API', 'Cloudflare R2', 'Social media']
  },
  {
    slug: 'p01', kind: 'portal', group: 'apps', feature: true,
    title: 'Client portal with AI calling',
    role: 'Planned and built with AI tools',
    summary: 'Private portal for a financial services sales team. New leads from ad forms and booked calls arrive on their own, go to the next agent in rotation, and get an AI voice call within two minutes that puts interested people straight through to an agent. Managers see every lead and file in one pipeline.',
    points: [
      'AI voice calls with live transfer to a free agent, plus summary, transcript and recording on each file',
      'Two-way CRM sync, round-robin assignment and per-client checklists',
      'WhatsApp and Telegram call reminders, two-step sign-in, encrypted data and a full activity log'
    ],
    tags: ['AI voice calling', 'Lead routing', 'CRM sync', 'Facebook Lead Ads', 'WhatsApp reminders']
  },
  {
    slug: 'p02', kind: 'site', group: 'web',
    title: 'Credit repair website redesign',
    role: 'Proposal, copy and build with AI tools',
    summary: 'Full redesign pitched to management: clearer navigation, stronger proof sections, and structure written for Google and AI assistants (SEO, AEO, GEO).',
    tags: ['Redesign', 'SEO / AEO / GEO', 'Copywriting']
  },
  {
    slug: 'p03', kind: 'site', group: 'web',
    title: 'B2B SaaS site for auto dealers',
    role: 'Brand, copy and build with AI tools',
    summary: 'Marketing site for a lead-recovery product that helps dealerships win back declined buyers, with ROI figures, an article library and a dealer email and SMS program behind it.',
    tags: ['B2B marketing', 'Content', 'Email and SMS']
  },
  {
    slug: 'p04', kind: 'site', group: 'web',
    title: 'Fleet software product site',
    role: 'Positioning, copy and build with AI tools',
    summary: 'Product site for rental-fleet operations software, organized around the jobs it replaces, with a founder demo booking flow.',
    tags: ['Product marketing', 'SaaS', 'Demo funnel']
  },
  {
    slug: 'p05', kind: 'site', group: 'web',
    title: 'Car rental company website',
    role: 'Built with AI tools, run and maintain',
    summary: 'Booking-focused site for a Maryland car rental company: live vehicle list, all-in pricing, and inquiry and booking forms.',
    tags: ['Local business', 'Booking forms', 'Conversion']
  },
  {
    slug: 'p06', kind: 'site', group: 'web',
    title: 'Rideshare car rental brand',
    role: 'Three-page campaign built with AI tools',
    summary: 'Brand site plus two audience pages: one recruiting car owners to list idle vehicles, one recruiting Uber and Lyft drivers, each with its own earnings calculator.',
    tags: ['Two-sided marketing', 'Calculators', 'Landing pages']
  },
  {
    slug: 'p07', kind: 'site', group: 'web',
    title: 'Towing company website',
    role: 'Design and build with AI tools',
    summary: 'Call-first site for a 24/7 towing service: click-to-call everywhere, service menu and a quote flow built for people on the side of the road.',
    tags: ['Local SEO', 'Click to call', 'Mobile first']
  },
  {
    slug: 'p08', kind: 'site', group: 'web',
    title: 'Financial education platform',
    role: 'Web operations',
    summary: 'Membership site with interactive tools (loan wizard, credit calculators, readiness quiz) and Stripe subscription billing on daily, weekly and monthly plans.',
    tags: ['WordPress', 'Stripe', 'Interactive tools']
  },
  {
    slug: 'p09', kind: 'site', group: 'web',
    title: 'Dealer partnership site',
    role: 'Built with AI tools',
    summary: 'B2B site pitching dealerships on turning declined leads into revenue, with the market data and partner sign-up flow.',
    tags: ['B2B', 'Lead capture']
  },
  {
    slug: 'p10', kind: 'site', group: 'web',
    title: 'Dealer program landing page',
    role: 'Built with AI tools',
    summary: 'Single-goal landing page with video, a numbered value list and two clear calls to action.',
    tags: ['Landing page', 'Video']
  },
  {
    slug: 'p11', kind: 'site', group: 'web',
    title: 'Credit improvement campaign page',
    role: 'Built with AI tools',
    summary: 'Campaign landing page for a credit-building program, built around one explainer video and an eligibility checklist.',
    tags: ['Campaign page', 'Video']
  },
  {
    slug: 'p12', kind: 'site', group: 'web',
    title: 'Travel booking website (Arabic)',
    role: 'Founder, built solo with AI tools',
    summary: 'Flights, visas and hotels between Iraq and Turkey. Fares refresh automatically, route pages rebuild and ping search engines, and bookings go straight to WhatsApp.',
    tags: ['Arabic / RTL', 'Automation', 'SEO']
  },
  {
    slug: 'p13', kind: 'site', group: 'web',
    title: 'Car wash and detailing website',
    role: 'Design and build with AI tools',
    summary: 'Premium local service site with packages, proof points and a booking call to action above the fold.',
    tags: ['Local business', 'Branding']
  },
  {
    slug: 'p14', kind: 'app', group: 'apps',
    title: 'Self-service car rental app',
    role: 'Product plan, built with AI tools',
    summary: 'Customers pick a car, enter driver and license details, sign the agreement and verify identity, all from their phone, with no counter visit.',
    tags: ['Web app', 'E-signature', 'Onboarding flow']
  },
  {
    slug: 'p15', kind: 'app', group: 'apps',
    title: 'Video identity verification',
    role: 'Built with AI tools',
    summary: 'Two-sided video call: the customer joins from a link, the agent checks their license live from a console.',
    tags: ['Identity check', 'Video calls']
  },
  {
    slug: 'p16', kind: 'site', group: 'apps',
    title: 'Toll violation reassignment tool',
    role: 'Built with AI tools',
    summary: 'Splits the monthly toll bundle PDF into individual violations, matches each to the renter, and sends the reassignment packets.',
    tags: ['Automation', 'Google Sheets', 'PDF processing']
  }
];

// Ads Manager screenshots: company names and spend are blurred, no numbers in the copy.
window.PROOF = [
  { src: 'assets/shots/ads/2.webp', cap: 'Account overview: daily lead trend by campaign' },
  { src: 'assets/shots/ads/1.webp', cap: 'Lead form campaigns for a credit services company' },
  { src: 'assets/shots/ads/4.webp', cap: 'Ad-level results: phone calls and message conversations' },
  { src: 'assets/shots/ads/3.webp', cap: 'Message campaigns for a car rental company' }
];

window.TOOLS = ['Meta Ads Manager', 'Google Analytics 4', 'Google Tag Manager', 'Zapier', 'Twilio', 'GoHighLevel', 'Mailchimp', 'WordPress', 'Elementor', 'Stripe', 'Calendly', 'ElevenLabs', 'Cloudflare', 'Canva', 'Claude', 'FFmpeg', 'Pexels', 'Ollama'];
