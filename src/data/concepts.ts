/**
 * One register feeds the homepage and /work: one client project (Big Beerah Collection,
 * labelled "Client Project", ledger item 19), seven invented brands and two uncommissioned
 * concepts based on existing businesses (both labelled "Concept Project").
 */
export type ConceptFilterCategory = 'Business websites' | 'E-commerce' | 'Product interfaces';

export type ConceptBasis = 'fictional' | 'reference' | 'client';

export interface Concept {
  id: string;
  name: string;
  category: string;
  filterCategory: ConceptFilterCategory;
  label: typeof CONCEPT_LABEL | typeof CLIENT_LABEL;
  /** Present on every concept; absent on client work. */
  conceptOnly?: true;
  /** fictional = invented brand. reference = existing business, uncommissioned concept site.
   * client = commissioned work the client agreed to publish (ledger item 19). */
  basis: ConceptBasis;
  summary: string;
  challenge: string;
  approach: string;
  explores: string[];
  alt: {
    cover: string;
    detail: string;
    desktop: string;
    mobile: string;
  };
  study: ConceptStudy;
}

export interface ConceptStudy {
  capability: string;
  /** Editorial one-liner. Contains exactly one <em>. */
  headline: string;
  brief: string;
  audience: string;
  decisions: { title: string; detail: string }[];
  palette: { name: string; hex: string }[];
  type: { role: string; face: string }[];
  limits: string;
  services: string[];
  theme: { bg: string; fg: string; accent: string; muted: string; tone: 'dark' | 'light' };
}

export const CONCEPT_LABEL = 'Concept Project';
export const CLIENT_LABEL = 'Client Project';
export const CONCEPT_DISCLAIMER =
  'Fictional design concept. Not completed client work. Not a live business or client result. Not a client project.';

export const REFERENCE_CONCEPT_DISCLAIMER =
  'Independent design concept based on an existing business. Not commissioned work, not an official website, and not a client project.';

export const TECHNOLOGY_POSITIONING =
  'At SabiForge, we do not just build websites. We build with the latest technology and modern design standards: fast, responsive, accessible, and conversion-focused. We never ship outdated or legacy design.';

const fictional = 'Fictional studio concept. Not a client project.';
const reference =
  'Independent design concept based on an existing business. Not commissioned work. Not a client project.';

export const concepts: Concept[] = [
  {
    id: 'maison-vale-studios',
    name: 'Maison Vale Studios',
    category: 'Interior Design / Creative Studio',
    filterCategory: 'Business websites',
    label: CONCEPT_LABEL,
    conceptOnly: true,
    basis: 'fictional',
    summary: fictional,
    challenge:
      'An interior studio needs a site that feels as considered as the rooms, without burying the work under a generic template.',
    approach:
      'An editorial project index, warm material photography, and a short enquiry that asks which kind of space is being planned.',
    explores: ['Editorial art direction', 'Project indexing', 'Material-led layout'],
    alt: {
      cover:
        'Provisional generated art-direction image for the Maison Vale Studios concept project: a sunlit interior studio with a coded website preview on a monitor.',
      detail:
        'Provisional generated art-direction image for the Maison Vale Studios concept project: a travertine and linen living room with a coded mobile website preview.',
      desktop:
        'Coded desktop interface preview for the fictional Maison Vale Studios concept project, showing an interior studio homepage.',
      mobile:
        'Coded mobile interface preview for the fictional Maison Vale Studios concept project, showing an interior studio homepage.',
    },
    study: {
      capability: 'Editorial studio website',
      headline: 'Rooms, materials and projects, <em>readable</em> at a glance.',
      brief:
        'Maison Vale Studios is a fictional interior practice. The concept site leads with space types and materials instead of a stock hero and a contact form.',
      audience:
        'People planning a home, hospitality or commercial interior, often browsing on a phone.',
      decisions: [
        {
          title: 'Lead with the kind of space',
          detail:
            'Residential, hospitality and commercial are the first choices, so a visitor can tell whether the studio works on their kind of project.',
        },
        {
          title: 'Let materials set the palette',
          detail:
            'Ivory, walnut, stone and olive come from the rooms themselves. The interface stays quiet so the work can carry the page.',
        },
        {
          title: 'Ask for the project, not a slogan',
          detail:
            'The enquiry asks which space is being planned. It does not promise a timeline or a result.',
        },
      ],
      palette: [
        { name: 'Ivory', hex: '#F6F1E8' },
        { name: 'Walnut', hex: '#6B4A32' },
        { name: 'Stone', hex: '#C8BBA8' },
        { name: 'Olive', hex: '#5E6B45' },
        { name: 'Ink', hex: '#2C241C' },
      ],
      type: [
        { role: 'Display', face: 'Instrument Serif' },
        { role: 'Text', face: 'Inter' },
      ],
      limits:
        'The rooms and materials are illustrative. A real studio site would use the practice’s own photography and project facts.',
      services: ['custom-website-design-development'],
      theme: { bg: '#2c241c', fg: '#f6f1e8', accent: '#c4a574', muted: '#d9cbb8', tone: 'dark' },
    },
  },
  {
    id: 'aura-clothing',
    name: 'AURA Clothing',
    category: 'Fashion / E-commerce',
    filterCategory: 'E-commerce',
    label: CONCEPT_LABEL,
    conceptOnly: true,
    basis: 'fictional',
    summary: fictional,
    challenge:
      'A clothing label needs a shop that feels editorial on a phone, with categories that are easy to scan before anyone asks about a piece.',
    approach:
      'A high-contrast lookbook structure, three clear categories, and an enquire path instead of a pretend checkout.',
    explores: ['Editorial commerce', 'Category structure', 'Enquire-first shopping'],
    alt: {
      cover:
        'Provisional generated art-direction image for the AURA Clothing concept project: a black and champagne boutique with a coded website preview.',
      detail:
        'Provisional generated art-direction image for the AURA Clothing concept project: an editorial clothing still life with a coded mobile shop preview.',
      desktop:
        'Coded desktop interface preview for the fictional AURA Clothing concept project, showing a fashion shop homepage.',
      mobile:
        'Coded mobile interface preview for the fictional AURA Clothing concept project, showing a fashion shop homepage.',
    },
    study: {
      capability: 'Fashion storefront',
      headline: 'A shop that reads like a <em>lookbook</em>, not a catalogue dump.',
      brief:
        'AURA Clothing is a fictional fashion label. The concept organises tailoring, ready-to-wear and accessories without invented prices or stock counts.',
      audience: 'Shoppers comparing clothing categories on a phone before they ask about a piece.',
      decisions: [
        {
          title: 'Three categories, not a grid of everything',
          detail:
            'Tailoring, ready to wear and accessories are the first decisions. A visitor can move without scrolling a wall of products.',
        },
        {
          title: 'Keep the palette photographic',
          detail:
            'Black, warm off-white and champagne follow the clothes. No seasonal slogan is baked into the layout.',
        },
        {
          title: 'Enquire instead of a fake purchase',
          detail:
            'The concept stops at a question. It does not invent a price, a size run or a delivery promise.',
        },
      ],
      palette: [
        { name: 'Black', hex: '#111111' },
        { name: 'Ivory', hex: '#F7F3EE' },
        { name: 'Champagne', hex: '#CDB89A' },
        { name: 'Stone', hex: '#8A8175' },
      ],
      type: [
        { role: 'Display', face: 'Outfit, wide tracking for the wordmark' },
        { role: 'Text', face: 'Inter' },
      ],
      limits:
        'No product is for sale here. Sizes, prices and availability would be confirmed by a real merchant before a store launched.',
      services: ['shopify-ecommerce-development'],
      theme: { bg: '#111111', fg: '#f7f3ee', accent: '#cdb89a', muted: '#c9c1b6', tone: 'dark' },
    },
  },
  {
    id: 'flowdesk-os',
    name: 'FlowDesk OS',
    category: 'Business Software / SaaS',
    filterCategory: 'Product interfaces',
    label: CONCEPT_LABEL,
    conceptOnly: true,
    basis: 'fictional',
    summary: fictional,
    challenge:
      'A small team needs software that shows what to do next, without opening on a wall of totals.',
    approach:
      'A calm task board with Now, Next and Later, written as sample work rather than business results.',
    explores: ['Task hierarchy', 'Operational layout', 'Sample data discipline'],
    alt: {
      cover:
        'Provisional generated art-direction image for the FlowDesk OS concept project: a slate office desk with a coded dashboard preview.',
      detail:
        'Provisional generated art-direction image for the FlowDesk OS concept project: a side view of a workspace with a coded mobile dashboard preview.',
      desktop:
        'Coded desktop interface preview for the fictional FlowDesk OS concept project, showing a sample task board.',
      mobile:
        'Coded mobile interface preview for the fictional FlowDesk OS concept project, showing a sample task board.',
    },
    study: {
      capability: 'Operational software interface',
      headline: 'The next task, <em>before</em> the dashboard noise.',
      brief:
        'FlowDesk OS is a fictional operations tool. The concept shows a sample board of work in progress. It does not report revenue, customers or performance.',
      audience: 'People coordinating project work who check status between other tasks.',
      decisions: [
        {
          title: 'Sort by sequence, not by score',
          detail:
            'Now, Next and Later describe order. The board does not show percentages, revenue or customer counts.',
        },
        {
          title: 'Label every row as a sample',
          detail: 'Task names are illustrative. Nothing on the screen is a live client record.',
        },
        {
          title: 'Use a working palette, not a neon one',
          detail:
            'Slate, navy and pale blue keep the interface readable in an office. Accent colour marks the current column only.',
        },
      ],
      palette: [
        { name: 'Slate', hex: '#1C2430' },
        { name: 'Navy', hex: '#243B5A' },
        { name: 'Cloud', hex: '#F4F7FB' },
        { name: 'Teal', hex: '#3E7C78' },
      ],
      type: [
        { role: 'Interface', face: 'Inter' },
        { role: 'Labels', face: 'JetBrains Mono' },
      ],
      limits:
        'The board is a layout study. A real product would need permissions, audit history and the client’s own workflow.',
      services: ['custom-software-and-business-platforms'],
      theme: { bg: '#1c2430', fg: '#f4f7fb', accent: '#7eb8b4', muted: '#c5d0dc', tone: 'dark' },
    },
  },
  {
    id: 'campusone-portal',
    name: 'CampusOne Portal',
    category: 'Education / Student Portal',
    filterCategory: 'Product interfaces',
    label: CONCEPT_LABEL,
    conceptOnly: true,
    basis: 'fictional',
    summary: fictional,
    challenge:
      'A student portal is often a list of links. Learners need to see the current module and the next step without hunting.',
    approach:
      'A sample home that leads with the current module, a short list of study areas, and a clear note that it is not a real institution.',
    explores: ['Learning navigation', 'Current-task hierarchy', 'Institution-neutral copy'],
    alt: {
      cover:
        'Provisional generated art-direction image for the CampusOne Portal concept project: a library study table with a coded portal preview.',
      detail:
        'Provisional generated art-direction image for the CampusOne Portal concept project: a reading room with a coded mobile portal preview.',
      desktop:
        'Coded desktop interface preview for the fictional CampusOne Portal concept project, showing a sample student home.',
      mobile:
        'Coded mobile interface preview for the fictional CampusOne Portal concept project, showing a sample student home.',
    },
    study: {
      capability: 'Student portal',
      headline: 'The current module, <em>not</em> a maze of links.',
      brief:
        'CampusOne Portal is a fictional study home. It is not affiliated with any university. Modules, names and progress marks are sample layout only.',
      audience:
        'Learners checking what to open next, usually on a laptop in a library or on a phone between classes.',
      decisions: [
        {
          title: 'Open on the current module',
          detail:
            'The first block names the sample module and the next action. Secondary links stay below it.',
        },
        {
          title: 'Refuse a real school identity',
          detail:
            'The interface does not use a university crest, a campus name or a claim of enrolment.',
        },
        {
          title: 'Keep academic colour quiet',
          detail: 'Navy, porcelain and a small ochre accent distinguish navigation from content.',
        },
      ],
      palette: [
        { name: 'Navy', hex: '#12315C' },
        { name: 'Porcelain', hex: '#F4F7FB' },
        { name: 'Sky', hex: '#D5E4F5' },
        { name: 'Ochre', hex: '#C4A15A' },
      ],
      type: [
        { role: 'Interface', face: 'Inter' },
        { role: 'Display', face: 'Outfit' },
      ],
      limits:
        'No grades, attendance or student records are real. A live portal would need the institution’s own identity and access rules.',
      services: ['custom-software-and-business-platforms'],
      theme: { bg: '#12315c', fg: '#f4f7fb', accent: '#c4a15a', muted: '#d5e4f5', tone: 'dark' },
    },
  },
  {
    id: 'bloom-wellness-studio',
    name: 'Bloom Wellness Studio',
    category: 'Wellness / Booking Website',
    filterCategory: 'Business websites',
    label: CONCEPT_LABEL,
    conceptOnly: true,
    basis: 'fictional',
    summary: fictional,
    challenge:
      'A wellness studio site should explain the kinds of visits and how to ask for a time, without pretending a booking has been confirmed.',
    approach:
      'A calm service menu and a request form pattern that states, in the interface, that no appointment is booked.',
    explores: ['Service explanation', 'Booking honesty', 'Calm visual system'],
    alt: {
      cover:
        'Provisional generated art-direction image for the Bloom Wellness Studio concept project: a sage and linen spa interior with a coded website preview.',
      detail:
        'Provisional generated art-direction image for the Bloom Wellness Studio concept project: a therapy room with a coded mobile booking preview.',
      desktop:
        'Coded desktop interface preview for the fictional Bloom Wellness Studio concept project, showing a visit-request page.',
      mobile:
        'Coded mobile interface preview for the fictional Bloom Wellness Studio concept project, showing a visit-request page.',
    },
    study: {
      capability: 'Booking website',
      headline: 'A request for a time, <em>without</em> a false confirmation.',
      brief:
        'Bloom Wellness Studio is a fictional practice. The concept explains movement, rest and recovery visits and lets someone request a time. It does not book anything.',
      audience: 'People comparing studio visits on a phone before they ask about availability.',
      decisions: [
        {
          title: 'Name the visit, not a clinician',
          detail:
            'The page describes kinds of sessions. It does not invent staff, licences or clinical claims.',
        },
        {
          title: 'Say that nothing is booked',
          detail:
            'The request control is labelled as a concept. A real studio would connect its own calendar later.',
        },
        {
          title: 'Use a quiet natural palette',
          detail: 'Sage, linen and clay match the room and stay readable for long text.',
        },
      ],
      palette: [
        { name: 'Sage', hex: '#D7E4D4' },
        { name: 'Linen', hex: '#F7F3EC' },
        { name: 'Clay', hex: '#8C5A45' },
        { name: 'Leaf', hex: '#3E5C45' },
      ],
      type: [
        { role: 'Display', face: 'Instrument Serif' },
        { role: 'Text', face: 'Inter' },
      ],
      limits:
        'No appointment is created. Treatments, practitioners and availability are not verified because this is a design concept.',
      services: ['custom-website-design-development'],
      theme: { bg: '#3e5c45', fg: '#f7f3ec', accent: '#f3e6da', muted: '#d7e4d4', tone: 'dark' },
    },
  },
  {
    id: 'routepilot-logistics',
    name: 'RoutePilot Logistics',
    category: 'Logistics / Business Platform',
    filterCategory: 'Product interfaces',
    label: CONCEPT_LABEL,
    conceptOnly: true,
    basis: 'fictional',
    summary: fictional,
    challenge:
      'Dispatch teams need a board of lanes and statuses they can scan, without a screen full of guarantees.',
    approach:
      'A sample lane board with plain status words and an on-screen note that nothing is a live shipment.',
    explores: ['Status scanning', 'Operations layout', 'Claim-free sample data'],
    alt: {
      cover:
        'Provisional generated art-direction image for the RoutePilot Logistics concept project: a warehouse dispatch desk with a coded tracking preview.',
      detail:
        'Provisional generated art-direction image for the RoutePilot Logistics concept project: a loading dock with a coded mobile lane board.',
      desktop:
        'Coded desktop interface preview for the fictional RoutePilot Logistics concept project, showing sample dispatch lanes.',
      mobile:
        'Coded mobile interface preview for the fictional RoutePilot Logistics concept project, showing sample dispatch lanes.',
    },
    study: {
      capability: 'Logistics platform',
      headline: 'Lane and status, <em>readable</em> from across a desk.',
      brief:
        'RoutePilot Logistics is a fictional dispatch board. Lanes and statuses are samples. The interface does not promise delivery times or show live tracking numbers.',
      audience: 'People coordinating shipments who need to see which lane needs attention.',
      decisions: [
        {
          title: 'Use status words, not tracking theatre',
          detail:
            'Preparing, moving and arrived are layout labels. They are not live events and they are not promises.',
        },
        {
          title: 'Keep identifiers obviously fake',
          detail:
            'Lanes are named North, East and Yard. There is no tracking number that could be mistaken for a real consignment.',
        },
        {
          title: 'Match the warehouse, not a consumer app',
          detail: 'Steel, navy and amber are built for a dim dispatch desk and a rugged tablet.',
        },
      ],
      palette: [
        { name: 'Graphite', hex: '#2A3138' },
        { name: 'Navy', hex: '#1C2B3A' },
        { name: 'Steel', hex: '#E8EEF2' },
        { name: 'Amber', hex: '#E39B3A' },
      ],
      type: [
        { role: 'Interface', face: 'Inter' },
        { role: 'Metadata', face: 'JetBrains Mono' },
      ],
      limits:
        'No shipment is being tracked. A working platform would use the operator’s own lanes, customers and status rules.',
      services: ['custom-software-and-business-platforms'],
      theme: { bg: '#1c2b3a', fg: '#e8eef2', accent: '#e39b3a', muted: '#b7c3ce', tone: 'dark' },
    },
  },
  {
    id: 'big-beerah-collection',
    name: 'Big Beerah Collection',
    category: 'Modest Fashion & Accessories / E-commerce',
    filterCategory: 'E-commerce',
    label: CLIENT_LABEL,
    basis: 'client',
    summary: 'Client project, published with the owner’s permission.',
    challenge:
      'A modest-fashion business needs an online shop with the categories its customers already ask for (hijabs, abayas, scarves, jewellery and fabric) in the brand’s own colours.',
    approach:
      'A blush, burgundy and gold shop organised by those categories, designed for shoppers browsing on a phone.',
    explores: ['Category merchandising', 'Modest fashion presentation', 'Enquire-first commerce'],
    alt: {
      cover:
        'Big Beerah Collection shop homepage: burgundy hero reading “Modest Fashion for Everyday Elegance”, category tiles and new arrivals.',
      detail:
        'Big Beerah Collection desktop shop design: crown logo, navigation, hero with a model in a satin hijab, shop-by-category tiles and new arrivals with prices.',
      desktop:
        'Big Beerah Collection desktop shop design: crown logo, navigation, hero with a model in a satin hijab, shop-by-category tiles and new arrivals with prices.',
      mobile:
        'Big Beerah Collection mobile shop design: delivery banner, crown logo, “Hijabs, Abayas & Accessories” hero, categories, new arrivals and a fabrics promotion.',
    },
    study: {
      capability: 'Modest fashion storefront',
      headline: 'Hijabs, abayas and accessories, <em>sorted</em> the way shoppers ask for them.',
      brief:
        'Big Beerah Collection is a modest-fashion business and a SabiForge client. We designed its online shop around hijabs, abayas, jersey scarves, fabrics and necklaces, with ready-to-wear, gift boxes and everyday essentials alongside.',
      audience: 'Shoppers looking for modest clothing and accessories on a phone.',
      decisions: [
        {
          title: 'Lead with the real categories',
          detail:
            'The shop leads with hijabs, abayas, jersey scarves, necklaces and fabrics, then ready-to-wear, gift boxes and everyday essentials, the way the business already sells.',
        },
        {
          title: 'Keep the brand palette',
          detail:
            'Blush, burgundy and gold are the brand colours. The layout does not introduce a drinks identity.',
        },
        {
          title: 'Design for the phone first',
          detail:
            'Most customers browse on a phone, so categories sit near the top and every tap target is large enough to use with a thumb.',
        },
      ],
      palette: [
        { name: 'Blush', hex: '#F4D6D8' },
        { name: 'Burgundy', hex: '#6E2438' },
        { name: 'Gold', hex: '#C4A265' },
        { name: 'Cream', hex: '#FBF6F2' },
      ],
      type: [
        { role: 'Display', face: 'Instrument Serif' },
        { role: 'Text', face: 'Inter' },
      ],
      limits:
        'The screens show the shop design. For current stock and prices, contact Big Beerah Collection directly.',
      services: ['shopify-ecommerce-development'],
      theme: { bg: '#6e2438', fg: '#fbf6f2', accent: '#e6c98a', muted: '#f4d6d8', tone: 'dark' },
    },
  },
  {
    id: 'amzlat-world-of-beauty',
    name: 'Amzlat World of Beauty',
    category: 'Beauty, Cosmetics & Fashion Retail',
    filterCategory: 'E-commerce',
    label: CONCEPT_LABEL,
    conceptOnly: true,
    basis: 'reference',
    summary: reference,
    challenge:
      'A beauty and fashion shop needs makeup, skincare, hair and clothing in one structure, without copying another store’s products or claims.',
    approach:
      'A pink, cream, black and gold category shop with blank product types and an enquire path.',
    explores: ['Beauty retail taxonomy', 'Category navigation', 'Unbranded product presentation'],
    alt: {
      cover:
        'Provisional generated art-direction image for the Amzlat World of Beauty concept project: unbranded cosmetics and hair tools with a coded shop preview.',
      detail:
        'Provisional generated art-direction image for the Amzlat World of Beauty concept project: a pink and black beauty still life with a coded mobile shop preview.',
      desktop:
        'Coded desktop interface preview for the Amzlat World of Beauty concept project, a beauty and fashion shop.',
      mobile:
        'Coded mobile interface preview for the Amzlat World of Beauty concept project, a beauty and fashion shop.',
    },
    study: {
      capability: 'Beauty and fashion retail',
      headline: 'Makeup, skin, hair and fashion, <em>separated</em> before the scroll.',
      brief:
        'Amzlat World of Beauty is an existing beauty business. This study is an uncommissioned shop concept in pink, cream, black and gold. It groups makeup, skincare, hair and fashion, and also shows body care and manicure and pedicure from the supplied reference. It does not copy prices, addresses or contact details.',
      audience: 'Shoppers moving between beauty and fashion categories on a phone.',
      decisions: [
        {
          title: 'Follow the reference taxonomy',
          detail:
            'Makeup, skincare, hair and fashion stay first. Body care and manicure and pedicure are included because they appear on the supplied reference.',
        },
        {
          title: 'Show product types, not borrowed brands',
          detail:
            'Bottles and tools are unbranded. No third-party logo or product claim is copied from the reference screenshot.',
        },
        {
          title: 'Hold the pink, cream, black and gold system',
          detail:
            'The interface uses the reference palette so the shop is recognisable without republishing the old page.',
        },
      ],
      palette: [
        { name: 'Pink', hex: '#F3D5E0' },
        { name: 'Cream', hex: '#FFF8F3' },
        { name: 'Black', hex: '#161616' },
        { name: 'Gold', hex: '#C6A15B' },
      ],
      type: [
        { role: 'Display', face: 'Outfit' },
        { role: 'Text', face: 'Inter' },
      ],
      limits:
        'No cosmetic claim, ingredient list, price or stock level is stated. The reference screenshot is direction, not a catalogue to republish.',
      services: ['shopify-ecommerce-development'],
      theme: { bg: '#161616', fg: '#fff8f3', accent: '#c6a15b', muted: '#f3d5e0', tone: 'dark' },
    },
  },
  {
    id: 'opeyemi-phones-gadgets',
    name: 'Opeyemi Phones & Gadgets',
    category: 'Electronics Retail / Buy, Sell & Swap',
    filterCategory: 'E-commerce',
    label: CONCEPT_LABEL,
    conceptOnly: true,
    basis: 'reference',
    summary: reference,
    challenge:
      'A phone and gadget shop needs phones, laptops and watches to be obvious, with buy, sell and swap as separate paths, and no pretend checkout.',
    approach:
      'A cobalt and white storefront, three device categories, a swap section, and a WhatsApp-style control that stays disabled in the demo.',
    explores: ['Device categories', 'Buy, sell and swap paths', 'Enquiry before checkout'],
    alt: {
      cover:
        'Provisional generated art-direction image for the Opeyemi Phones and Gadgets concept project: a phone, laptop and watch on a cobalt desk with a coded shop preview.',
      detail:
        'Provisional generated art-direction image for the Opeyemi Phones and Gadgets concept project: devices on a blue counter with a coded mobile shop preview.',
      desktop:
        'Coded desktop interface preview for the Opeyemi Phones and Gadgets concept project, an electronics shop with buy, sell and swap.',
      mobile:
        'Coded mobile interface preview for the Opeyemi Phones and Gadgets concept project, an electronics shop with buy, sell and swap.',
    },
    study: {
      capability: 'Electronics retail',
      headline: 'Phones, laptops and watches, then <em>ask</em> before you buy.',
      brief:
        'Opeyemi Phones & Gadgets is an existing electronics business. This study is an uncommissioned storefront adapted from the supplied responsive prototype. It shows phones, MacBooks and watches, plus buy, sell and swap. The green WhatsApp control stays disabled. Prices, warranties and phone numbers from the earlier site are not included.',
      audience: 'People comparing device types, or describing a device they want to sell or swap.',
      decisions: [
        {
          title: 'Keep the cobalt, white and green system',
          detail:
            'The prototype’s blue and white layout and green enquiry accent stay. The green control does not open a chat.',
        },
        {
          title: 'Separate browse from swap',
          detail:
            'Shopping by device type and describing a device to sell or swap are different sections, as in the prototype.',
        },
        {
          title: 'Leave commercial facts out',
          detail:
            'No price, warranty, stock count or phone number is shown. Listings are labelled as samples.',
        },
      ],
      palette: [
        { name: 'Cobalt', hex: '#123CC9' },
        { name: 'Deep', hex: '#0A215F' },
        { name: 'White', hex: '#FFFFFF' },
        { name: 'WhatsApp green', hex: '#079344' },
      ],
      type: [
        { role: 'Display', face: 'Outfit' },
        { role: 'Text', face: 'Inter' },
      ],
      limits:
        'This is not a live store. The WhatsApp control is disabled. No payment, warranty, stock check or verified phone number is connected.',
      services: ['shopify-ecommerce-development'],
      theme: { bg: '#0a215f', fg: '#f5f7fc', accent: '#3dce7a', muted: '#c9d4ee', tone: 'dark' },
    },
  },
  {
    id: 'corporate-digital-modernization',
    name: 'Corporate Website Redesign & Digital Modernization',
    category: 'Corporate / Digital Transformation',
    filterCategory: 'Business websites',
    label: CONCEPT_LABEL,
    conceptOnly: true,
    basis: 'fictional',
    summary: fictional,
    challenge:
      'An established organisation can outgrow a website that is hard to scan, hard to use on a phone, and unclear about what happens next.',
    approach:
      'A graphite, stone and forest-green corporate homepage organised as review, redesign and support, with no awards or performance claims.',
    explores: ['Corporate information design', 'Redesign narrative', 'Phone-first structure'],
    alt: {
      cover:
        'Provisional generated art-direction image for the corporate redesign concept project: a stone and glass atrium with a coded enterprise website preview.',
      detail:
        'Provisional generated art-direction image for the corporate redesign concept project: a conference room with a coded mobile website preview.',
      desktop:
        'Coded desktop interface preview for the fictional corporate website redesign concept project.',
      mobile:
        'Coded mobile interface preview for the fictional corporate website redesign concept project.',
    },
    study: {
      capability: 'Corporate redesign',
      headline: 'A clearer company site, <em>without</em> invented results.',
      brief:
        'Corporate Website Redesign & Digital Modernization is a fictional before-to-next study. It shows how an enterprise homepage can explain the work and the next step. It names no client and no outcome.',
      audience:
        'People arriving at a company site who need to understand the organisation and where to go next.',
      decisions: [
        {
          title: 'Structure the offer in three moves',
          detail:
            'Review, redesign and support match the way a modernization project is actually discussed. They are not a results dashboard.',
        },
        {
          title: 'Use a trustworthy, quiet palette',
          detail: 'Graphite, stone and deep green read as an institution rather than a campaign.',
        },
        {
          title: 'Refuse awards and metrics',
          detail:
            'The page does not show logos, percentages or before-and-after claims. Those would need a real engagement.',
        },
      ],
      palette: [
        { name: 'Graphite', hex: '#1E2421' },
        { name: 'Stone', hex: '#F3F1EC' },
        { name: 'Forest', hex: '#1F4D3A' },
        { name: 'Brass', hex: '#B7A48A' },
      ],
      type: [
        { role: 'Display', face: 'Outfit' },
        { role: 'Text', face: 'Inter' },
      ],
      limits:
        'No organisation is named. A real redesign would start from that organisation’s content, constraints and approval.',
      services: ['website-redesign-modernization'],
      theme: { bg: '#1e2421', fg: '#f3f1ec', accent: '#8fbfa8', muted: '#d5d0c6', tone: 'dark' },
    },
  },
];

export function getConcept(id: string): Concept | undefined {
  return concepts.find((concept) => concept.id === id);
}

export const conceptFilters = [
  'All work',
  'Client work',
  'Business websites',
  'E-commerce',
  'Product interfaces',
] as const satisfies readonly ('All work' | 'Client work' | ConceptFilterCategory)[];
