// Mock Database for Premium Real Estate Web Application

export const properties = [
  {
    id: 'prop-1',
    title: 'The Royal Pavilion Penthouse',
    type: 'Penthouse',
    location: 'Manhattan, NY',
    price: 8500000,
    beds: 4,
    baths: 4.5,
    area: 5200,
    status: 'For Sale',
    stage: 'Ready to Move',
    builder: 'RBM Developments',
    reraId: 'RERA-NY-88931',
    completionDate: 'Ready',
    yearBuilt: 2024,
    parking: '3 Cars Assigned',
    description: 'Perched high above the city skyline, The Royal Pavilion Penthouse offers unprecedented views of Central Park. Designed by world-renowned architect Jean Nouvel, this glass-wrapped masterpiece boasts custom Italian marble finishes, a private wrap-around terrace, a double-height living room, and a state-of-the-art chef\'s kitchen. Experience the epitome of Manhattan luxury with private elevator access, 24/7 concierge, and wellness amenities.',
    images: [
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80'
    ],
    amenities: ['Private Elevator', 'Wrap-around Terrace', '24/7 Concierge', 'Wine Cellar', 'Smart Home System', 'Indoor Private Pool'],
    featured: true
  },
  {
    id: 'prop-2',
    title: 'Serene Oasis Luxury Villa',
    type: 'Villa',
    location: 'Beverly Hills, LA',
    price: 12400000,
    beds: 6,
    baths: 7,
    area: 9800,
    status: 'For Sale',
    stage: 'Ready to Move',
    builder: 'Elite Living Spaces',
    reraId: 'RERA-CA-10294',
    completionDate: 'Ready',
    yearBuilt: 2023,
    parking: '6 Cars Garage',
    description: 'An architectural tour de force, this ultra-private estate is tucked away in the most prestigious enclave of Beverly Hills. Featuring a seamless transition between indoor and outdoor living, the home surrounds a resort-style zero-edge infinity pool. Amenities include a subterranean 8-car garage, a 12-seat soundproof Dolby Atmos home theater, a full wellness spa with steam room, and a professional-grade fitness studio.',
    images: [
      'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80'
    ],
    amenities: ['Zero-edge Pool', 'subterranean Garage', 'Dolby Atmos Cinema', 'Wellness Spa', 'Fitness Studio', 'Guard Gated'],
    featured: true
  },
  {
    id: 'prop-3',
    title: 'Marina Heights Corporate Headquarters',
    type: 'Commercial',
    location: 'Downtown, Miami',
    price: 15500000,
    beds: 0,
    baths: 12,
    area: 14500,
    status: 'For Sale',
    stage: 'Under Construction',
    builder: 'Apex Heights Corp',
    reraId: 'RERA-FL-74620',
    completionDate: 'Dec 2026',
    yearBuilt: 2026,
    parking: '20 Reserved Spaces',
    description: 'Position your business at the pinnacle of prestige with the Marina Heights corporate suite. Occupying three entire high-zone floors, this premium commercial space features column-free floor plates, floor-to-ceiling high-efficiency glazing, executive boardrooms with panoramic ocean views, private terraces, and dedicated high-speed elevators. Built to achieve LEED Gold certification.',
    images: [
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1200&q=80'
    ],
    amenities: ['LEED Gold certified', 'Executive Boardrooms', 'High-Speed Elevators', 'Fiber-optic Backbone', 'Helipad Access', 'Valet Parking'],
    featured: false
  },
  {
    id: 'prop-4',
    title: 'The Azure Waterfront Mansion',
    type: 'Villa',
    location: 'Palm Jumeirah, Dubai',
    price: 18900000,
    beds: 5,
    baths: 6.5,
    area: 11200,
    status: 'For Sale',
    stage: 'Ready to Move',
    builder: 'Vanguard Luxury Group',
    reraId: 'RERA-DXB-9908',
    completionDate: 'Ready',
    yearBuilt: 2025,
    parking: '4 Cars Garage',
    description: 'Commanding a premier waterfront location on the frond of Palm Jumeirah, this custom villa offers private beach access and breathtaking views of the Dubai Marina skyline. The interior boasts double-height glass walls, custom chandelier installations, Gaggenau kitchen appliances, and bespoke Italian furnishings. The exterior landscape is complete with a sunken firepit, an infinity-edge pool, and private jetty.',
    images: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=80'
    ],
    amenities: ['Private Beach Access', 'Infinity Pool', 'Sunken Firepit', 'Private Jetty', 'Smart Climate Systems', 'Staff Quarters'],
    featured: true
  },
  {
    id: 'prop-5',
    title: 'The Obsidian Modernist Estate',
    type: 'Villa',
    location: 'Bel Air, LA',
    price: 24500000,
    beds: 7,
    baths: 9,
    area: 16200,
    status: 'For Sale',
    stage: 'Under Construction',
    builder: 'Monolith Builders',
    reraId: 'RERA-CA-55209',
    completionDate: 'Jun 2027',
    yearBuilt: 2027,
    parking: '8 Cars Showroom',
    description: 'Artfully integrated into the natural contours of Bel Air, The Obsidian is a dramatic statement of modernist luxury. Wrapped in textured concrete and dark volcanic stone, the property features a massive 75-foot infinity pool suspended over the canyon. The interior is curated with custom details like a private bowling alley, dual master wings, an automated security command center, and a commercial-grade commercial catering kitchen.',
    images: [
      'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1513584684374-8bab748fbf90?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1527030280862-64139fbe04ca?auto=format&fit=crop&w=1200&q=80'
    ],
    amenities: ['Bowling Alley', '75-Foot Infinity Pool', 'Dual Master Wings', 'Automated Security', 'Professional Catering Kitchen', 'Helipad'],
    featured: true
  },
  {
    id: 'prop-6',
    title: 'Mayfair Townhouse Heritage Suites',
    type: 'Residential',
    location: 'Mayfair, London',
    price: 6900000,
    beds: 3,
    baths: 3.5,
    area: 3600,
    status: 'For Rent',
    stage: 'Ready to Move',
    builder: 'Grosvenor Estates Ltd',
    reraId: 'RERA-UK-77312',
    completionDate: 'Ready',
    yearBuilt: 1890,
    parking: 'Permit Parking Only',
    description: 'This meticulously restored Georgian townhouse in the heart of Mayfair blends historical grandeur with ultra-modern comforts. The residence preserves original features, including ornate plasterwork ceilings, restored fireplaces, and sash windows. Features include a bespoke Smallbone of Devizes kitchen, comfort cooling, underfloor heating, and dedicated concierge services.',
    images: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80'
    ],
    amenities: ['Restored Fireplaces', 'Comfort Cooling', 'Bespoke Kitchen', 'Underfloor Heating', 'Private Wine Cellar', 'Elevator'],
    featured: false
  },
  {
    id: 'prop-7',
    title: 'The Luminary Office Tower Penthouse',
    type: 'Commercial',
    location: 'Manhattan, NY',
    price: 9200000,
    beds: 0,
    baths: 6,
    area: 7500,
    status: 'For Sale',
    stage: 'Ready to Move',
    builder: 'RBM Developments',
    reraId: 'RERA-NY-88935',
    completionDate: 'Ready',
    yearBuilt: 2025,
    parking: '6 Parking Passes',
    description: 'Commanding the top two floors of the iconic Luminary Tower, this commercial penthouse is ideal for a high-profile family office or private hedge fund. Features open workspaces under vaulted skylights, dynamic partitionable glass meeting zones, luxury executive washrooms, and private rooftop terrace with full facilities.',
    images: [
      'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1570126125858-3b7780a6b4de?auto=format&fit=crop&w=1200&q=80'
    ],
    amenities: ['Skylights', 'Executive Restrooms', 'Rooftop Terrace', 'Card Access Control', 'HVAC Multi-Zone', 'Catering Station'],
    featured: false
  },
  {
    id: 'prop-8',
    title: 'The Reserve Luxury Residences',
    type: 'Residential',
    location: 'Bandra, Mumbai',
    price: 4800000,
    beds: 3,
    baths: 3,
    area: 2800,
    status: 'For Sale',
    stage: 'Ready to Move',
    builder: 'Elite Living Spaces',
    reraId: 'PR-MUM-48092',
    completionDate: 'Ready',
    yearBuilt: 2024,
    parking: '3 Automated Car Parking Stacks',
    description: 'An exclusive low-density high-rise development in Bandra West, offering single-apartment floors for absolute privacy. Features Italian modular kitchens, sprawling decks overlooking the Arabian Sea, private lift access, and complete integration with Lutron automation systems.',
    images: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80'
    ],
    amenities: ['Arabian Sea Views', 'Single-Apartment Floors', 'Lutron Automation', 'Modular Kitchen', 'Clubhouse Access', '24/7 Security'],
    featured: false
  },
  {
    id: 'prop-9',
    title: 'Bayside Commercial Plaza',
    type: 'Commercial',
    location: 'Downtown, Miami',
    price: 7200000,
    beds: 0,
    baths: 8,
    area: 9200,
    status: 'For Rent',
    stage: 'Ready to Move',
    builder: 'Apex Heights Corp',
    reraId: 'RERA-FL-74625',
    completionDate: 'Ready',
    yearBuilt: 2023,
    parking: '10 Assigned Spaces',
    description: 'An excellent prime retail and office location featuring double-height visibility on Biscayne Boulevard. Perfect for ultra-luxury automotive showrooms, banking facilities, or high-fashion flagship stores.',
    images: [
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80'
    ],
    amenities: ['High Street Visibility', 'Double-Height Ceilings', 'Valet Parking Dropoff', 'Back Generator Power', 'Central Air Conditioning'],
    featured: false
  },
  {
    id: 'prop-10',
    title: 'RBM Crown Estate',
    type: 'Villa',
    location: 'Palm Jumeirah, Dubai',
    price: 22000000,
    beds: 6,
    baths: 7.5,
    area: 12800,
    status: 'For Sale',
    stage: 'Under Construction',
    builder: 'Vanguard Luxury Group',
    reraId: 'RERA-DXB-9915',
    completionDate: 'Oct 2027',
    yearBuilt: 2027,
    parking: '5 Cars Garage',
    description: 'Positioned on the tip of the Palm Jumeirah VIP frond, the RBM Crown Estate offers a customized selection of European furnishings, automated lighting, a beach club deck, glass-elevated elevator, and panoramic view of Dubai Skyline.',
    images: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80'
    ],
    amenities: ['Private Beachfront', 'Beach Club Deck', 'Glass Elevator', 'Skyline Panorama', 'Smart Living Panels', 'Wine Vault'],
    featured: true
  }
];

export const projects = [
  {
    id: 'proj-1',
    title: 'The RBM Residences',
    builder: 'RBM Developments',
    status: 'Ongoing',
    priceRange: '$5.5M - $18M',
    location: 'Manhattan, NY',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80',
    description: 'An architectural icon redefining urban luxury. Featuring 32 custom full-floor residences and bi-level penthouses overlooking Central Park.',
    reraCertified: true
  },
  {
    id: 'proj-2',
    title: 'Valhalla Hills Estates',
    builder: 'Elite Living Spaces',
    status: 'Completed',
    priceRange: '$8.0M - $25M',
    location: 'Beverly Hills, LA',
    image: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=800&q=80',
    description: 'An exclusive collection of 12 private gated estates. Winner of the Architectural Design Award 2025 for seamless indoor-outdoor integrations.',
    reraCertified: true
  },
  {
    id: 'proj-3',
    title: 'AeroHeights Commercial Hub',
    builder: 'Apex Heights Corp',
    status: 'Ongoing',
    priceRange: '$3.0M - $12M',
    location: 'Downtown, Miami',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80',
    description: 'Vanguard commercial high-rise targeted for premium corporate headquarters, featuring private elevators and heliport access.',
    reraCertified: true
  },
  {
    id: 'proj-4',
    title: 'The Palm Vista Penthouses',
    builder: 'Vanguard Luxury Group',
    status: 'Ongoing',
    priceRange: '$12.5M - $45M',
    location: 'Palm Jumeirah, Dubai',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80',
    description: 'Ultra-luxurious sky villas floating above the Arabian Gulf, featuring private beach clubs and personalized butler services.',
    reraCertified: true
  },
  {
    id: 'proj-5',
    title: 'Heritage Townhouses Phase II',
    builder: 'Grosvenor Estates Ltd',
    status: 'Completed',
    priceRange: '$6.5M - $15M',
    location: 'Mayfair, London',
    image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80',
    description: 'Restoration of historic Victorian facades into state-of-the-art residences featuring custom underground automation garages.',
    reraCertified: true
  },
  {
    id: 'proj-6',
    title: 'The Monolith Terraces',
    builder: 'Monolith Builders',
    status: 'Ongoing',
    priceRange: '$15M - $35M',
    location: 'Bel Air, LA',
    image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=800&q=80',
    description: 'Eco-conscious modern architecture blending volcanic stone, glass, and waterfalls. Nestled in a private canyon estate.',
    reraCertified: true
  }
];

export const blogs = [
  {
    id: 'blog-1',
    title: 'Navigating the Luxury Real Estate Market in 2026',
    excerpt: 'Key indicators, emerging luxury hotspots, and why long-term wealth preservation is driving high-end asset acquisitions.',
    content: 'The global luxury real estate market has shown remarkable resilience in 2026. High-net-worth individuals are increasingly allocating funds to tangible trophy assets to hedge against inflation and volatile equity markets. This article breaks down the three leading market drivers: the rise of branded residences, the premium put on private health and wellness infrastructure (like integrated spa wings and air filtration), and the cities showing the strongest capital appreciation, including Dubai, Miami, and London.\n\nInvestors looking for stable returns are prioritizing ready-to-move properties with verified compliance documentation (like RERA certification). Working with dedicated portfolio relationship managers ensures access to exclusive off-market listings.',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80',
    date: 'June 18, 2026',
    author: 'Eleanor Vance',
    category: 'Investment Advice',
    readTime: '6 mins read'
  },
  {
    id: 'blog-2',
    title: '5 Crucial Questions to Ask Before Buying a Penthouse',
    excerpt: 'From private elevator access rules to air rights and maintenance overheads, here is what high-end buyers need to look for.',
    content: 'Penthouses represent the ultimate statement of luxury, but they also bring specific architectural and legal complexities. Before making an offer, you should evaluate: 1) Roof rights and air space rights. Can neighboring buildings obstruct your views in the future? 2) Private elevator access configurations and emergency override permissions. 3) Roof load parameters if you intend to install a private rooftop pool or heavy planters. 4) Acoustic insulation from HVAC units frequently located above or near penthouse slabs. 5) Structural maintenance structures managed by HOA or the building developer.',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80',
    date: 'May 24, 2026',
    author: 'Arthur Pendelton',
    category: 'Buying Guide',
    readTime: '4 mins read'
  },
  {
    id: 'blog-3',
    title: 'Understanding Commercial Leases: Single vs. Triple Net Leases',
    excerpt: 'A comprehensive guide for corporate clients looking to lease high-profile office and retail space.',
    content: 'Leasing commercial property requires understanding the allocation of property costs. In a Single Net Lease (N), the tenant pays base rent plus a pro-rata share of property taxes. In a Double Net Lease (NN), the tenant covers taxes and insurance premiums. However, the gold standard for commercial landlords is the Triple Net Lease (NNN), where the lessee assumes all operating expenses, including structural maintenance, taxes, and property insurance. Reviewing lease covenants with professional legal assistance is crucial to protect your corporate operations.',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80',
    date: 'April 12, 2026',
    author: 'Marcus Aurelius',
    category: 'Real Estate Tips',
    readTime: '8 mins read'
  },
  {
    id: 'blog-4',
    title: 'Tax Planning and Wealth Preservation via Property Investment',
    excerpt: 'How savvy family offices structures investments in real estate to maximize tax depreciation and pass down wealth.',
    content: 'Real estate remains one of the most effective vehicles for multi-generational wealth preservation. Through tax depreciation, interest deductions, and structural vehicles like 1031 exchanges, investors can defer capital gains tax indefinitely while generating stable yield. This article details advanced strategies, including forming dedicated holding trusts and structuring fractional co-investments.',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80',
    date: 'March 05, 2026',
    author: 'Victoria Sterling',
    category: 'Investment Advice',
    readTime: '10 mins read'
  }
];

export const testimonials = [
  {
    id: 'test-1',
    name: 'Harrison Sterling',
    role: 'Managing Partner, Sterling Global Capital',
    rating: 5,
    comment: 'The level of professionalism and attention to detail from the initial consultation to the final registration of our Bel Air estate was unmatched. Their dedicated relationship manager navigated complex legal requirements with ease, making it a stress-free process.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80'
  },
  {
    id: 'test-2',
    name: 'Serena Patel',
    role: 'Luxury Real Estate Collector',
    rating: 5,
    comment: 'Acquiring a penthouse in Manhattan demands deep market insights. The advanced compare tool, verified listings, and direct access to builder developers allowed me to make an investment decision with absolute confidence. A world-class brokerage experience.',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&h=150&q=80'
  },
  {
    id: 'test-3',
    name: 'Jean-Pierre Dubois',
    role: 'CEO, Dubois Enterprises',
    rating: 5,
    comment: 'Securing a full-zone corporate headquarters in Miami was pivotal for our US expansion. The commercial leasing consultants handled the documentation and custom alterations seamlessly. I highly recommend their commercial division.',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&h=150&q=80'
  }
];

export const faqs = [
  {
    question: 'What is a RERA certified property and why is it important?',
    answer: 'A RERA (Real Estate Regulatory Authority) certified property complies with strict transparency, development timelines, and consumer protection laws. Buying RERA-certified properties guarantees that developer disclosures are verified, funds are stored in escrow accounts to ensure construction timelines, and legal structures are secured against developer defaults.'
  },
  {
    question: 'How does the property comparison and wishlist tool work?',
    answer: 'Our website lets you save properties to a private wishlist which persists in your browser. You can select up to three properties to compare side-by-side in terms of price, area, bedroom counts, location, builder, RERA certification, and specific luxury amenities.'
  },
  {
    question: 'Do you provide end-to-end legal and loan documentation support?',
    answer: 'Yes. We offer fully integrated in-house legal support, title verification, loan application guidance with leading financial institutions, and complete assistance during registration and key handovers.'
  },
  {
    question: 'What is the average timeline for closing a high-end luxury transaction?',
    answer: 'For ready-to-move properties, a standard closing transaction (including verification, escrow funding, and registration) takes between 15 to 30 days. For international clients, this can extend slightly depending on bank transfers and power of attorney verifications.'
  },
  {
    question: 'Can I request a private video tour or virtual reality walkthrough?',
    answer: 'Absolutely. We offer premium, high-resolution custom video walkthroughs and live 3D video tours guided by a relationship manager for all our properties. You can schedule this via the "Book Visit" or "WhatsApp" CTA buttons.'
  }
];
