import {
  Trophy,
  Zap,
  Briefcase,
  Building2,
  Award,
  Anchor,
  Ruler,
  Wrench,
  Settings,
  Users,
  Camera,
  Layers,
  Image,
  BarChart2,
  Megaphone,
  Globe,
  Star,
  Music,
  Tv,
  Wine,
  Compass,
  ShieldCheck,
  CheckCircle,
  Lightbulb,
  Mic,
  ChefHat,
  Package,
  Map,
  Heart,
  Sparkles,
  Store,
} from "lucide-react";

export const packagesData = [
  // ─── 01. Exhibitions & Expo Stands ───────────────────────────────────────────
  {
    slug: "exhibitions-expo-stands",
    num: "01",
    tag: "Exhibitions",
    icon: Trophy,
    accentColor: "#ff8c00",

    seoTitle: "Exhibition Stand Design & Management Dubai | Captive Events",
    metaDescription:
      "Premium exhibition stand design, 3D fabrication, and expo management services across Dubai and the UAE. Captive Events builds immersive brand environments that attract visitors and elevate your presence.",
    ogImage: "/services/2.png",
    canonicalPath: "/services/packages/exhibitions-expo-stands",

    hero: {
      category: "Exhibition Excellence",
      heading: "Exhibitions &\nExpo Stands",
      description:
        "Design, fabricate, and manage premium exhibition stands and immersive expo environments that elevate brands and attract visitors.",
      bgImage: "/services/2.png",
    },

    differentiators: {
      heading: "Built to\nStop Traffic.",
      description:
        "Every stand we create is engineered for maximum dwell time — where architecture, branding, and experience converge into a single powerful statement.",
      features: [
        { icon: Ruler, title: "3D Precision Design", text: "Photorealistic renders before a single panel is cut." },
        { icon: Wrench, title: "In-House Fabrication", text: "Premium materials, built by our dedicated workshop team." },
        { icon: Settings, title: "Full Installation", text: "We set up, test, and hand over — zero stress for you." },
        { icon: ShieldCheck, title: "End-to-End Management", text: "Project managed from brief to post-event breakdown." },
      ],
    },

    inclusions: [
      { icon: Ruler, label: "3D Stand Design" },
      { icon: Wrench, label: "Custom Fabrication" },
      { icon: Settings, label: "Installation" },
      { icon: Briefcase, label: "Project Management" },
      { icon: Megaphone, label: "Branding" },
      { icon: Lightbulb, label: "Lighting" },
      { icon: Image, label: "Graphics" },
      { icon: Package, label: "Post Event Breakdown" },
    ],

    audiences: [
      { icon: Globe, label: "Trade Shows", text: "Brands competing for visibility on an international stage." },
      { icon: Trophy, label: "International Exhibitions", text: "Global exhibitors entering new markets with impact." },
      { icon: Building2, label: "Expo Centers", text: "Organizers needing unified stand ecosystems." },
      { icon: Briefcase, label: "Corporate Exhibitors", text: "Enterprise brands with presence requirements." },
      { icon: Settings, label: "Manufacturers", text: "Industrial players showcasing product lines." },
      { icon: Store, label: "Retail Brands", text: "Consumer brands driving footfall and engagement." },
    ],

    showcase: {
      featured: { src: "/services/2.png", alt: "Premium custom exhibition stand designed and fabricated by Captive Events Dubai" },
      supporting: [
        { src: "/portfolio/3.png", alt: "Exhibition stand installation with architectural lighting and branded displays" },
        { src: "/portfolio/1.png", alt: "Branded exhibition environment with coordinated digital displays and visitor zones" },
      ],
    },

    timeline: [
      { step: "01", label: "Discovery & Brief", text: "We map your objectives, target audience, and spatial requirements." },
      { step: "02", label: "3D Concept & Design", text: "Our studio produces photorealistic renders for your approval." },
      { step: "03", label: "Fabrication", text: "Precision-built in our UAE workshop using premium materials." },
      { step: "04", label: "Installation", text: "On-site setup, testing, and brand-readiness check." },
      { step: "05", label: "Live Support", text: "Our team is present throughout the event." },
      { step: "06", label: "Breakdown & Storage", text: "Clean dismantling, storage, or reuse planning post-event." },
    ],
  },

  // ─── 02. Roadshows & Brand Activations ───────────────────────────────────────
  {
    slug: "roadshows-brand-activations",
    num: "02",
    tag: "Brand Activation",
    icon: Zap,
    accentColor: "#ff3b3b",

    seoTitle: "Roadshows & Brand Activations Dubai | Captive Events",
    metaDescription:
      "High-impact roadshows, experiential marketing campaigns, and brand activations across Dubai and the UAE. Captive Events creates memorable brand interactions that drive engagement and visibility.",
    ogImage: "/services/6.png",
    canonicalPath: "/services/packages/roadshows-brand-activations",

    hero: {
      category: "Brand Experience",
      heading: "Roadshows &\nBrand Activations",
      description:
        "Create memorable brand experiences through engaging roadshows, experiential marketing campaigns, and high-impact activations.",
      bgImage: "/services/6.png",
    },

    differentiators: {
      heading: "Every Location\nA Statement.",
      description:
        "We turn ordinary spaces into brand destinations — activations designed to stop people in their tracks and convert them into advocates.",
      features: [
        { icon: Map, label: "Campaign Planning", title: "Multi-City Strategy", text: "Coordinated activations across key markets and venues." },
        { icon: Lightbulb, label: "Experiential Design", title: "Immersive Experiences", text: "Environments audiences step into, not just walk past." },
        { icon: Users, label: "Brand Ambassadors", title: "Brand Ambassadors", text: "Trained, briefed, and brand-aligned talent on the ground." },
        { icon: BarChart2, label: "Analytics", title: "Live Analytics", text: "Real-time performance tracking across activation touchpoints." },
      ],
    },

    inclusions: [
      { icon: Map, label: "Campaign Planning" },
      { icon: Lightbulb, label: "Experiential Design" },
      { icon: Layers, label: "Mobile Displays" },
      { icon: Users, label: "Brand Ambassadors" },
      { icon: Sparkles, label: "Sampling" },
      { icon: Star, label: "Interactive Activities" },
      { icon: Settings, label: "Production" },
      { icon: BarChart2, label: "Analytics" },
    ],

    audiences: [
      { icon: ShieldCheck, label: "FMCG", text: "Consumer goods brands driving trial and adoption." },
      { icon: Building2, label: "Retail", text: "Brands bringing their store experience to the streets." },
      { icon: Tv, label: "Technology", text: "Tech companies launching products with live demos." },
      { icon: Heart, label: "Healthcare", text: "Healthcare brands engaging communities with purpose." },
      { icon: Globe, label: "Lifestyle Brands", text: "Aspirational brands connecting with their audience IRL." },
      { icon: Settings, label: "Automotive", text: "Car brands staging immersive model reveal experiences." },
    ],

    showcase: {
      featured: { src: "/services/6.png", alt: "Brand activation campaign managed by Captive Events Dubai" },
      supporting: [
        { src: "/portfolio/2.png", alt: "Coordinated promotional brand assets prepared for an event marketing campaign" },
        { src: "/portfolio/5.png", alt: "Brand activation with interactive audience engagement" },
      ],
    },

    timeline: [
      { step: "01", label: "Campaign Strategy", text: "Goals, locations, audience profile, and timeline planning." },
      { step: "02", label: "Creative Concept", text: "Activation design, experience flow, and visual identity." },
      { step: "03", label: "Production", text: "Builds, displays, collateral, and crew briefed and ready." },
      { step: "04", label: "Rollout", text: "Seamless deployment across all activation locations." },
      { step: "05", label: "Live Management", text: "On-ground coordination and real-time adjustments." },
      { step: "06", label: "Reporting", text: "Engagement metrics, reach data, and campaign review." },
    ],
  },

  // ─── 03. Corporate Event Suite ────────────────────────────────────────────────
  {
    slug: "corporate-event-suite",
    num: "03",
    tag: "Corporate",
    icon: Briefcase,
    accentColor: "#ffcc00",

    seoTitle: "Corporate Event Management Dubai | Captive Events",
    metaDescription:
      "Executive conferences, product launches, networking events, and corporate celebrations delivered with precision across Dubai and the UAE. Captive Events — premium corporate event management.",
    ogImage: "/services/3.png",
    canonicalPath: "/services/packages/corporate-event-suite",

    hero: {
      category: "Corporate Excellence",
      heading: "Corporate\nEvent Suite",
      description:
        "Deliver executive experiences through conferences, networking events, product launches, annual meetings, and corporate celebrations.",
      bgImage: "/services/3.png",
    },

    differentiators: {
      heading: "Where Business\nMeets Excellence.",
      description:
        "We design and deliver corporate events that reflect the calibre of your brand — from intimate boardroom dinners to full-scale annual conferences.",
      features: [
        { icon: Building2, title: "Venue Sourcing", text: "Access to Dubai's finest corporate venues and spaces." },
        { icon: Mic, title: "Stage Production", text: "Professional AV, staging, and presenter support." },
        { icon: Users, title: "Guest Management", text: "Registration, invitations, check-in — handled completely." },
        { icon: CheckCircle, title: "Flawless Execution", text: "Dedicated on-site coordinator from setup to close." },
      ],
    },

    inclusions: [
      { icon: Building2, label: "Venue Sourcing" },
      { icon: Settings, label: "Conference Setup" },
      { icon: Mic, label: "Stage Production" },
      { icon: CheckCircle, label: "Registration" },
      { icon: Tv, label: "AV" },
      { icon: Users, label: "Guest Management" },
      { icon: ChefHat, label: "Catering" },
      { icon: Megaphone, label: "Branding" },
    ],

    audiences: [
      { icon: Briefcase, label: "Corporates", text: "Regional and global companies hosting executive events." },
      { icon: Globe, label: "Government", text: "Public sector bodies needing formal, polished experiences." },
      { icon: Building2, label: "Banks", text: "Financial institutions hosting investor and client events." },
      { icon: ShieldCheck, label: "Private Companies", text: "SMEs and private enterprises investing in their brand." },
      { icon: Users, label: "Associations", text: "Industry associations and professional bodies." },
      { icon: Star, label: "Enterprise Clients", text: "Large-scale clients requiring full event infrastructure." },
    ],

    showcase: {
      featured: { src: "/services/3.png", alt: "Professionally managed corporate event by Captive Events Dubai" },
      supporting: [
        { src: "/portfolio/5.png", alt: "Dubai business conference with delegates, keynote stage, and networking environment" },
        { src: "/portfolio/7.png", alt: "Corporate networking event with executive audience" },
      ],
    },

    timeline: [
      { step: "01", label: "Requirements & Brief", text: "Objectives, guest count, budget framework, and vision." },
      { step: "02", label: "Venue & Supplier Sourcing", text: "Curated shortlist matched to your brand standards." },
      { step: "03", label: "Creative & Logistics", text: "Agenda, production design, catering, and branding." },
      { step: "04", label: "Pre-Event Rehearsal", text: "AV testing, run-of-show, and crew briefing." },
      { step: "05", label: "Event Execution", text: "Full-day on-site management and guest experience delivery." },
      { step: "06", label: "Post-Event Review", text: "Feedback collection and post-event reporting." },
    ],
  },

  // ─── 04. Real Estate Events ───────────────────────────────────────────────────
  {
    slug: "real-estate-events",
    num: "04",
    tag: "Real Estate",
    icon: Building2,
    accentColor: "#ff8c00",

    seoTitle: "Real Estate Event Management Dubai | Captive Events",
    metaDescription:
      "Premium property launches, investor showcases, sales center activations, and real estate events across Dubai and the UAE. Captive Events creates immersive property experiences that convert.",
    ogImage: "/services/1.png",
    canonicalPath: "/services/packages/real-estate-events",

    hero: {
      category: "Property & Development",
      heading: "Real Estate\nEvents",
      description:
        "Launch developments through premium showcases, property activations, investor events, and immersive sales experiences.",
      bgImage: "/services/1.png",
    },

    differentiators: {
      heading: "Launch It\nLike a Brand.",
      description:
        "Real estate is emotional. We craft the environments, narratives, and moments that make investors and buyers say yes — before they've even seen the floor plans.",
      features: [
        { icon: Building2, title: "Property Launches", text: "Theatrical reveals that create buzz and urgency." },
        { icon: Star, title: "VIP Investor Events", text: "Exclusive experiences for high-net-worth audiences." },
        { icon: Image, title: "Scale Models & Displays", text: "Bespoke physical and digital showcase installations." },
        { icon: Heart, title: "Guest Hospitality", text: "Fine dining, entertainment, and white-glove service." },
      ],
    },

    inclusions: [
      { icon: Building2, label: "Property Launches" },
      { icon: Star, label: "VIP Events" },
      { icon: Layers, label: "Scale Models" },
      { icon: Briefcase, label: "Sales Centers" },
      { icon: Megaphone, label: "Branding" },
      { icon: Globe, label: "Investor Experiences" },
      { icon: Tv, label: "Digital Displays" },
      { icon: Wine, label: "Guest Hospitality" },
    ],

    audiences: [
      { icon: Building2, label: "Developers", text: "Master developers launching flagship projects." },
      { icon: Briefcase, label: "Property Agencies", text: "Agencies managing premium portfolio presentations." },
      { icon: BarChart2, label: "Investors", text: "Investor audiences requiring a high-conviction experience." },
      { icon: Star, label: "Luxury Communities", text: "Branded lifestyle communities building aspiration." },
      { icon: Globe, label: "Master Developments", text: "Large-scale integrated development launches." },
      { icon: ShieldCheck, label: "Project Consultants", text: "Advisory firms managing client acquisition events." },
    ],

    showcase: {
      featured: { src: "/services/1.png", alt: "Premium real estate event managed by Captive Events Dubai" },
      supporting: [
        { src: "/portfolio/6.png", alt: "Property launch event with branded environment and investor presentations" },
        { src: "/portfolio/9.png", alt: "Real estate showcase with scale models and luxury hospitality" },
      ],
    },

    timeline: [
      { step: "01", label: "Project Discovery", text: "Property profile, target audience, and launch objectives." },
      { step: "02", label: "Experience Design", text: "Event concept, spatial flow, and brand narrative." },
      { step: "03", label: "Fabrication & Builds", text: "Scale models, sales center fit-out, display systems." },
      { step: "04", label: "Investor Journey Mapping", text: "Every touchpoint sequenced for maximum impact." },
      { step: "05", label: "Launch Day", text: "Full production, hospitality, and team coordination." },
      { step: "06", label: "Post-Launch Support", text: "Digital follow-up assets and lead capture review." },
    ],
  },

  // ─── 05. Industry Galas & Award Shows ────────────────────────────────────────
  {
    slug: "industry-galas-award-shows",
    num: "05",
    tag: "Gala & Awards",
    icon: Award,
    accentColor: "#ffcc00",

    seoTitle: "Gala Dinners & Award Shows Dubai | Captive Events",
    metaDescription:
      "Prestigious gala dinners, award ceremonies, and executive celebrations produced with elegance across Dubai and the UAE. Captive Events — where excellence meets occasion.",
    ogImage: "/services/4.png",
    canonicalPath: "/services/packages/industry-galas-award-shows",

    hero: {
      category: "Prestige & Celebration",
      heading: "Industry Galas &\nAward Shows",
      description:
        "Celebrate excellence with elegant gala dinners, award ceremonies, executive celebrations, and prestigious industry events.",
      bgImage: "/services/4.png",
    },

    differentiators: {
      heading: "Moments Worth\nRemembering.",
      description:
        "We design celebrations that honour achievement — from dramatic red carpet arrivals to award-winning production values that make every winner feel the magnitude of the moment.",
      features: [
        { icon: Mic, title: "Award Stage Design", text: "Dramatic custom-built award stages and scenic design." },
        { icon: Music, title: "Entertainment Curation", text: "Live performances, hosts, and programming that wows." },
        { icon: Lightbulb, title: "Premium Lighting", text: "Architectural and event lighting that transforms the room." },
        { icon: Camera, title: "Photography & Film", text: "Capturing every award moment with cinematic quality." },
      ],
    },

    inclusions: [
      { icon: Mic, label: "Award Stage" },
      { icon: Music, label: "Entertainment" },
      { icon: ChefHat, label: "Dinner Setup" },
      { icon: Lightbulb, label: "Lighting" },
      { icon: Settings, label: "Production" },
      { icon: Star, label: "Red Carpet" },
      { icon: Camera, label: "Photography" },
      { icon: Wine, label: "Hospitality" },
    ],

    audiences: [
      { icon: Trophy, label: "Corporate Awards", text: "Companies honouring staff achievement and excellence." },
      { icon: Globe, label: "Government Awards", text: "Public sector bodies celebrating public service." },
      { icon: Users, label: "Associations", text: "Industry groups hosting their flagship annual ceremony." },
      { icon: Star, label: "Luxury Brands", text: "Premium brands hosting exclusive client celebrations." },
      { icon: Briefcase, label: "Business Groups", text: "Business communities recognising leadership." },
      { icon: Award, label: "Media & Publishing", text: "Media companies hosting industry award nights." },
    ],

    showcase: {
      featured: { src: "/services/4.png", alt: "Gala dinner and award ceremony produced by Captive Events Dubai" },
      supporting: [
        { src: "/portfolio/8.png", alt: "Award stage with premium lighting and production for industry gala night" },
        { src: "/portfolio/12.png", alt: "Elegant gala dinner setup with luxury table settings and branded environment" },
      ],
    },

    timeline: [
      { step: "01", label: "Event Concept", text: "Theme, tone, programme, and guest experience vision." },
      { step: "02", label: "Venue & Production Design", text: "Stage, floor plan, lighting rig, and seating layout." },
      { step: "03", label: "Entertainment & Programme", text: "Speakers, hosts, performers, and award categories." },
      { step: "04", label: "Décor & Styling", text: "Table design, floral, ambient, and branded elements." },
      { step: "05", label: "Awards Night", text: "Full event management, production control, hospitality." },
      { step: "06", label: "Media & Highlights", text: "Photography delivery, video highlights, press assets." },
    ],
  },

  // ─── 06. Luxury Nautical Experiences ─────────────────────────────────────────
  {
    slug: "luxury-nautical-experiences",
    num: "06",
    tag: "Nautical Luxury",
    icon: Anchor,
    accentColor: "#ff8c00",

    seoTitle: "Luxury Yacht Events Dubai | Captive Events",
    metaDescription:
      "Private yacht charters, luxury nautical experiences, corporate retreats, and exclusive networking events on the water. Captive Events — premium maritime experiences in Dubai.",
    ogImage: "/services/5.png",
    canonicalPath: "/services/packages/luxury-nautical-experiences",

    hero: {
      category: "Maritime Luxury",
      heading: "Luxury Nautical\nExperiences",
      description:
        "Create unforgettable experiences aboard luxury yachts through premium networking events, celebrations, and executive hospitality.",
      bgImage: "/services/5.png",
    },

    differentiators: {
      heading: "The Sea as\nYour Venue.",
      description:
        "Dubai's skyline looks different from the water. We create events that use the sea as a backdrop — where every detail, from the fine dining to the sunset, is curated with precision.",
      features: [
        { icon: Anchor, title: "Private Charter", text: "Exclusive access to Dubai's finest luxury yachts." },
        { icon: ChefHat, title: "Fine Dining", text: "Custom menus crafted by executive chefs aboard." },
        { icon: Music, title: "Live Entertainment", text: "Musicians, DJs, and performers for any occasion." },
        { icon: Camera, title: "Luxury Photography", text: "Professional sea-level photography and cinematography." },
      ],
    },

    inclusions: [
      { icon: Anchor, label: "Private Yacht Charter" },
      { icon: ChefHat, label: "Fine Dining" },
      { icon: Compass, label: "Water Sports" },
      { icon: Music, label: "Live Entertainment" },
      { icon: Sparkles, label: "Luxury Decor" },
      { icon: Camera, label: "Photography" },
      { icon: Map, label: "Cruise Planning" },
      { icon: Wine, label: "Hospitality" },
    ],

    audiences: [
      { icon: Star, label: "VIP Clients", text: "Exclusive clientele seeking elevated private experiences." },
      { icon: Briefcase, label: "Executives", text: "C-suite leaders hosting intimate high-trust events." },
      { icon: Globe, label: "Luxury Brands", text: "Premium brands creating exclusive client experiences." },
      { icon: Users, label: "Corporate Retreats", text: "Teams building culture away from the boardroom." },
      { icon: Heart, label: "Private Celebrations", text: "Birthdays, anniversaries, and milestone moments." },
      { icon: Trophy, label: "Incentive Groups", text: "Companies rewarding top performers with luxury." },
    ],

    showcase: {
      featured: { src: "/services/5.png", alt: "Luxury yacht experience event by Captive Events Dubai" },
      supporting: [
        { src: "/portfolio/4.png", alt: "Private yacht charter event with luxury hospitality and decor" },
        { src: "/portfolio/11.png", alt: "Corporate nautical experience with executive guests aboard" },
      ],
    },

    timeline: [
      { step: "01", label: "Experience Brief", text: "Guest count, occasion, duration, and preferred itinerary." },
      { step: "02", label: "Yacht Selection", text: "We match your event to the perfect vessel." },
      { step: "03", label: "Concept & Menu Design", text: "Décor theme, dining menu, and entertainment lineup." },
      { step: "04", label: "Crew & Logistics", text: "Captain, crew, photographers, and entertainment briefed." },
      { step: "05", label: "The Experience", text: "Full hospitality management from boarding to sunset." },
      { step: "06", label: "Media Delivery", text: "Photography and videography delivered post-event." },
    ],
  },
];

// Helper — find by slug
export const getPackageBySlug = (slug) =>
  packagesData.find((p) => p.slug === slug);


