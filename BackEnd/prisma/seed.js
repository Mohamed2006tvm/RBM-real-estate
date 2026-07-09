import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seeding...');

  // 1. Clear existing database entries
  console.log('🧹 Cleaning existing records...');
  await prisma.settings.deleteMany({});
  await prisma.faq.deleteMany({});
  await prisma.savedProperty.deleteMany({});
  await prisma.appointment.deleteMany({});
  await prisma.lead.deleteMany({});
  await prisma.testimonial.deleteMany({});
  await prisma.blog.deleteMany({});
  await prisma.category.deleteMany({});
  await prisma.propertyVideo.deleteMany({});
  await prisma.propertyDocument.deleteMany({});
  await prisma.propertyAmenity.deleteMany({});
  await prisma.amenity.deleteMany({});
  await prisma.propertyImage.deleteMany({});
  await prisma.property.deleteMany({});
  await prisma.agent.deleteMany({});
  await prisma.user.deleteMany({});

  // 2. Hash passwords
  const salt = await bcrypt.genSalt(10);
  const adminPassword = await bcrypt.hash('admin123', salt);
  const agentPassword = await bcrypt.hash('agent123', salt);
  const clientPassword = await bcrypt.hash('client123', salt);

  // 3. Create Users
  console.log('👤 Creating users...');
  const adminUser = await prisma.user.create({
    data: {
      name: 'Alexander RBM',
      email: 'admin@rbmrealestate.com',
      phone: '+1 (555) 123-4567',
      password: adminPassword,
      role: 'ADMIN',
      profileImage: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=150&q=80',
      status: 'ACTIVE',
    },
  });

  const agentUser = await prisma.user.create({
    data: {
      name: 'Victoria Vance',
      email: 'agent@rbmrealestate.com',
      phone: '+1 (555) 987-6543',
      password: agentPassword,
      role: 'AGENT',
      profileImage: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80',
      status: 'ACTIVE',
    },
  });

  const clientUser = await prisma.user.create({
    data: {
      name: 'Marcus Sterling',
      email: 'client@rbmrealestate.com',
      phone: '+1 (555) 234-5678',
      password: clientPassword,
      role: 'CLIENT',
      profileImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
      status: 'ACTIVE',
    },
  });

  // 4. Create Agent Profiles
  console.log('💼 Creating agent profiles...');
  const agentProfile = await prisma.agent.create({
    data: {
      userId: agentUser.id,
      designation: 'Senior Luxury Consultant',
      experience: 8,
      bio: 'Specializing in off-market penthouses and waterfront villas across Manhattan and Miami.',
      specialization: 'Waterfront Penthouses & Villas',
      rating: 4.95,
    },
  });

  // 5. Create Amenities
  console.log('🏊 Creating amenities...');
  const amenitiesData = [
    { name: 'Infinity Pool', icon: 'Waves' },
    { name: 'Private Elevator', icon: 'ArrowUpDown' },
    { name: 'Smart Home Automation', icon: 'Cpu' },
    { name: 'Home Theater', icon: 'Tv' },
    { name: 'Wine Cellar', icon: 'GlassWater' },
    { name: '24/7 Concierge Security', icon: 'ShieldCheck' },
    { name: 'Private Dock', icon: 'Anchor' },
    { name: 'Spacious Balcony', icon: 'Maximize' },
  ];

  const createdAmenities = [];
  for (const item of amenitiesData) {
    const am = await prisma.amenity.create({ data: item });
    createdAmenities.push(am);
  }

  // 6. Create Properties
  console.log('🏡 Creating properties...');
  const p1 = await prisma.property.create({
    data: {
      title: 'The Grand RBM Penthouse',
      slug: 'the-grand-rbm-penthouse',
      description: 'Suspended in the clouds, this duplex penthouse offers panoramic Manhattan views, double-height ceilings, and private rooftop infinity pool.',
      propertyType: 'PENTHOUSE',
      purpose: 'SALE',
      price: 14500000.00,
      currency: 'USD',
      bedrooms: 4,
      bathrooms: 5,
      balconies: 2,
      parking: 3,
      area: 6500.00,
      areaUnit: 'SQFT',
      furnishing: 'FULLY_FURNISHED',
      status: 'AVAILABLE',
      featured: true,
      constructionStatus: 'READY',
      builderName: 'RBM Developments',
      reraId: 'RERA-NY-2026-99',
      address: '725 5th Ave, Midtown Manhattan',
      city: 'Manhattan',
      state: 'New York',
      country: 'USA',
      latitude: 40.7624,
      longitude: -73.9738,
      createdBy: adminUser.id,
    },
  });

  const p2 = await prisma.property.create({
    data: {
      title: 'Elysium Waterfront Villa',
      slug: 'elysium-waterfront-villa',
      description: 'An architectural masterpiece in Palm Jumeirah featuring private beach access, infinity pool, smart controls, and bespoke interior paneling.',
      propertyType: 'VILLA',
      purpose: 'SALE',
      price: 22000000.00,
      currency: 'USD',
      bedrooms: 6,
      bathrooms: 7,
      balconies: 3,
      parking: 4,
      area: 9200.00,
      areaUnit: 'SQFT',
      furnishing: 'SEMI_FURNISHED',
      status: 'AVAILABLE',
      featured: true,
      constructionStatus: 'READY',
      builderName: 'Signature Properties',
      reraId: 'RERA-DXB-5531',
      address: 'Frond M, Palm Jumeirah',
      city: 'Dubai',
      state: 'Dubai',
      country: 'UAE',
      latitude: 25.1124,
      longitude: 55.1312,
      createdBy: adminUser.id,
    },
  });

  const p3 = await prisma.property.create({
    data: {
      title: 'Bayside Premium Loft',
      slug: 'bayside-premium-loft',
      description: 'Stunning industrial-chic brick walls, floor-to-ceiling glass paneling, and views over Biscayne Bay. Complete with a private workspace.',
      propertyType: 'RESIDENTIAL',
      purpose: 'RENT',
      price: 18000.00,
      currency: 'USD',
      bedrooms: 2,
      bathrooms: 2,
      balconies: 1,
      parking: 1,
      area: 2100.00,
      areaUnit: 'SQFT',
      furnishing: 'FULLY_FURNISHED',
      status: 'AVAILABLE',
      featured: false,
      constructionStatus: 'READY',
      builderName: 'Miami Loft Corp',
      address: '100 Biscayne Blvd',
      city: 'Miami',
      state: 'Florida',
      country: 'USA',
      latitude: 25.7781,
      longitude: -80.1870,
      createdBy: adminUser.id,
    },
  });

  // 7. Associate Amenities to Properties
  console.log('🔗 Connecting properties to amenities...');
  await prisma.propertyAmenity.createMany({
    data: [
      { propertyId: p1.id, amenityId: createdAmenities[0].id }, // Pool
      { propertyId: p1.id, amenityId: createdAmenities[1].id }, // Elevator
      { propertyId: p1.id, amenityId: createdAmenities[2].id }, // Smart Home
      { propertyId: p1.id, amenityId: createdAmenities[5].id }, // Security

      { propertyId: p2.id, amenityId: createdAmenities[0].id }, // Pool
      { propertyId: p2.id, amenityId: createdAmenities[2].id }, // Smart Home
      { propertyId: p2.id, amenityId: createdAmenities[4].id }, // Cellar
      { propertyId: p2.id, amenityId: createdAmenities[6].id }, // Dock
    ],
  });

  // 8. Add Property Images
  console.log('🖼️ Creating property images...');
  await prisma.propertyImage.createMany({
    data: [
      { propertyId: p1.id, imageUrl: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80', isCover: true, sortOrder: 0 },
      { propertyId: p1.id, imageUrl: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=800&q=80', isCover: false, sortOrder: 1 },

      { propertyId: p2.id, imageUrl: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80', isCover: true, sortOrder: 0 },
      { propertyId: p2.id, imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80', isCover: false, sortOrder: 1 },

      { propertyId: p3.id, imageUrl: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80', isCover: true, sortOrder: 0 },
    ],
  });

  // 9. Add Property Videos & Docs
  console.log('🎥 Creating property media links...');
  await prisma.propertyVideo.create({
    data: { propertyId: p1.id, videoUrl: 'https://www.youtube.com/embed/Q4Z4tZis_9g' },
  });

  await prisma.propertyDocument.create({
    data: { propertyId: p1.id, documentName: 'Brochure.pdf', documentUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf' },
  });

  // 10. Create Blog Categories & Blogs
  console.log('✍️ Seeding blogs and categories...');
  const cat1 = await prisma.category.create({ data: { name: 'Market Analysis', slug: 'market-analysis' } });
  const cat2 = await prisma.category.create({ data: { name: 'Interior Design', slug: 'interior-design' } });

  await prisma.blog.create({
    data: {
      title: 'Evaluating Global Real Estate Trends for 2026',
      slug: 'global-real-estate-trends-2026',
      content: 'Luxury properties globally continue to experience high demand driven by wealth redistribution and fractional holding incentives...',
      coverImage: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80',
      categoryId: cat1.id,
      authorId: adminUser.id,
      published: true,
    },
  });

  // 11. Create Testimonials
  console.log('⭐ Creating testimonials...');
  await prisma.testimonial.createMany({
    data: [
      { customerName: 'David & Sophia K.', designation: 'Hedge Fund Executive', photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80', rating: 5, review: 'The transaction process with RBM Realestate was absolutely flawless. Their legal advisory settled the entire title registration in days.', approved: true },
      { customerName: 'James Chen', designation: 'Tech Entrepreneur', photo: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=150&q=80', rating: 5, review: 'Found an off-market duplex penthouse in New York within 48 hours. Absolute discretion and expert relationship management.', approved: true },
    ],
  });

  // 12. Create FAQs
  console.log('❓ Seeding FAQs...');
  await prisma.faq.createMany({
    data: [
      { question: 'What is RERA compliance and what does it check?', answer: 'RERA certification guarantees absolute compliance with real estate guidelines, protecting clients against structural defects and title issues.', category: 'Legal & Documentation' },
      { question: 'Do you assist international buyers with loans?', answer: 'Yes, we secure international mortgages and offshore banking links for eligible global investors.', category: 'Loans & Financing' },
    ],
  });

  // 13. Create Settings
  console.log('⚙️ Creating settings...');
  await prisma.settings.create({
    data: {
      siteName: 'RBM Realestate',
      logo: '',
      email: 'info@rbmrealestate.com',
      phone: '+1 (800) RBM-REAL',
      address: 'Suite 400, 725 5th Ave, Midtown Manhattan, NY',
      socialLinks: { facebook: 'https://facebook.com', twitter: 'https://twitter.com', instagram: 'https://instagram.com', linkedin: 'https://linkedin.com' },
    },
  });

  // 14. Create Leads
  console.log('🎯 Creating leads...');
  await prisma.lead.create({
    data: {
      propertyId: p1.id,
      customerName: 'Eleanor Vance',
      email: 'eleanor@vance.com',
      phone: '+1 (555) 777-8888',
      message: 'I am interested in scheduling a private helicopter viewing for the penthouse.',
      leadSource: 'WEBSITE',
      status: 'NEW',
      assignedAgent: agentProfile.id,
    },
  });

  // 15. Create Appointments
  console.log('📅 Creating appointments...');
  await prisma.appointment.create({
    data: {
      propertyId: p1.id,
      customerId: clientUser.id,
      agentId: agentProfile.id,
      appointmentDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 3), // 3 days in future
      status: 'SCHEDULED',
      notes: 'Client requests private gate security details during visit.',
    },
  });

  console.log('✅ Seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
