import express from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import prisma from './prismaClient.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'super-secret-luxury-rbmrealestate-token-2026';

app.use(cors());
app.use(express.json());

// --- MIDDLEWARES ---

// Authenticate JWT Token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  
  if (!token) return res.status(401).json({ error: 'Access token required' });

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: 'Invalid or expired token' });
    req.user = user;
    next();
  });
};

// Require Specific User Roles
const requireRole = (roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ error: 'Unauthorized role access' });
    }
    next();
  };
};

// --- AUTHENTICATION ROUTES ---

// Register User
app.post('/api/auth/register', async (req, res) => {
  try {
    const { name, email, phone, password, role } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Name, email, and password are required' });
    }

    const existingUser = await prisma.user.findFirst({
      where: { OR: [{ email }, { phone: phone || undefined }] }
    });
    if (existingUser) {
      return res.status(400).json({ error: 'Email or phone already registered' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const userRole = role && ['ADMIN', 'AGENT', 'CLIENT'].includes(role) ? role : 'CLIENT';

    const user = await prisma.user.create({
      data: {
        name,
        email,
        phone,
        password: hashedPassword,
        role: userRole,
      },
      select: { id: true, name: true, email: true, role: true }
    });

    const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, JWT_SECRET, { expiresIn: '7d' });
    res.status(201).json({ token, user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Login User
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || user.deletedAt) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, JWT_SECRET, { expiresIn: '7d' });
    res.json({
      token,
      user: { id: user.id, name: user.name, email: user.email, role: user.role, profileImage: user.profileImage }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get Current User Profile
app.get('/api/auth/me', authenticateToken, async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: { id: true, name: true, email: true, role: true, phone: true, profileImage: true }
    });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// --- PROPERTIES ROUTES ---

// List Properties with filtering
app.get('/api/properties', async (req, res) => {
  try {
    const { city, type, purpose, minPrice, maxPrice, bedrooms, featured, search } = req.query;

    const whereClause = {
      deletedAt: null,
      status: 'AVAILABLE',
    };

    if (city) whereClause.city = city;
    if (type) whereClause.propertyType = type;
    if (purpose) whereClause.purpose = purpose;
    if (featured) whereClause.featured = featured === 'true';
    if (bedrooms) whereClause.bedrooms = parseInt(bedrooms);

    if (minPrice || maxPrice) {
      whereClause.price = {};
      if (minPrice) whereClause.price.gte = parseFloat(minPrice);
      if (maxPrice) whereClause.price.lte = parseFloat(maxPrice);
    }

    if (search) {
      whereClause.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
        { city: { contains: search, mode: 'insensitive' } },
      ];
    }

    const properties = await prisma.property.findMany({
      where: whereClause,
      include: {
        images: { orderBy: { sortOrder: 'asc' } },
        amenities: { include: { amenity: true } },
      },
      orderBy: { createdAt: 'desc' },
    });

    res.json(properties);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get Single Property by ID or Slug
app.get('/api/properties/:idOrSlug', async (req, res) => {
  try {
    const { idOrSlug } = req.params;
    const isUuid = idOrSlug.match(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i);

    const property = await prisma.property.findFirst({
      where: {
        deletedAt: null,
        OR: [
          isUuid ? { id: idOrSlug } : undefined,
          { slug: idOrSlug }
        ].filter(Boolean)
      },
      include: {
        images: { orderBy: { sortOrder: 'asc' } },
        amenities: { include: { amenity: true } },
        documents: true,
        videos: true,
        creator: { select: { id: true, name: true, email: true, phone: true } }
      }
    });

    if (!property) return res.status(404).json({ error: 'Property not found' });
    res.json(property);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create Property (Admin or Agent)
app.post('/api/properties', authenticateToken, requireRole(['ADMIN', 'AGENT']), async (req, res) => {
  try {
    const {
      title, slug, description, propertyType, purpose, price, bedrooms, bathrooms,
      balconies, parking, area, address, city, state, country, builderName, reraId,
      images, amenities
    } = req.body;

    const property = await prisma.property.create({
      data: {
        title,
        slug,
        description,
        propertyType,
        purpose,
        price: parseFloat(price),
        bedrooms: parseInt(bedrooms) || 0,
        bathrooms: parseInt(bathrooms) || 0,
        balconies: parseInt(balconies) || 0,
        parking: parseInt(parking) || 0,
        area: parseFloat(area),
        address,
        city,
        state,
        country,
        builderName,
        reraId,
        createdBy: req.user.id,
        images: images && images.length > 0 ? {
          createMany: {
            data: images.map((url, idx) => ({
              imageUrl: url,
              isCover: idx === 0,
              sortOrder: idx
            }))
          }
        } : undefined,
        amenities: amenities && amenities.length > 0 ? {
          createMany: {
            data: amenities.map(amId => ({ amenityId: amId }))
          }
        } : undefined
      }
    });

    res.status(201).json(property);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update Property (Admin or Agent Creator)
app.put('/api/properties/:id', authenticateToken, requireRole(['ADMIN', 'AGENT']), async (req, res) => {
  try {
    const { id } = req.params;
    const property = await prisma.property.findUnique({ where: { id } });

    if (!property) return res.status(404).json({ error: 'Property not found' });
    if (req.user.role !== 'ADMIN' && property.createdBy !== req.user.id) {
      return res.status(403).json({ error: 'Access denied to edit this listing' });
    }

    const updated = await prisma.property.update({
      where: { id },
      data: {
        ...req.body,
        price: req.body.price ? parseFloat(req.body.price) : undefined,
        bedrooms: req.body.bedrooms ? parseInt(req.body.bedrooms) : undefined,
        bathrooms: req.body.bathrooms ? parseInt(req.body.bathrooms) : undefined,
        area: req.body.area ? parseFloat(req.body.area) : undefined,
      }
    });

    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Soft Delete Property (Admin or Agent Creator)
app.delete('/api/properties/:id', authenticateToken, requireRole(['ADMIN', 'AGENT']), async (req, res) => {
  try {
    const { id } = req.params;
    const property = await prisma.property.findUnique({ where: { id } });

    if (!property) return res.status(404).json({ error: 'Property not found' });
    if (req.user.role !== 'ADMIN' && property.createdBy !== req.user.id) {
      return res.status(403).json({ error: 'Access denied to delete this listing' });
    }

    await prisma.property.update({
      where: { id },
      data: { deletedAt: new Date() }
    });

    res.json({ message: 'Property listing soft-deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// --- LEADS ROUTES ---

// Submit Inbound Lead
app.post('/api/leads', async (req, res) => {
  try {
    const { propertyId, customerName, email, phone, message, leadSource } = req.body;

    if (!customerName || !email || !phone) {
      return res.status(400).json({ error: 'Name, email, and phone are required' });
    }

    // Auto assign agent if property specified
    let assignedAgentId = null;
    if (propertyId) {
      const property = await prisma.property.findUnique({ where: { id: propertyId } });
      if (property) {
        const agent = await prisma.agent.findFirst({ where: { userId: property.createdBy } });
        if (agent) assignedAgentId = agent.id;
      }
    }

    const lead = await prisma.lead.create({
      data: {
        propertyId,
        customerName,
        email,
        phone,
        message,
        leadSource: leadSource || 'WEBSITE',
        assignedAgent: assignedAgentId
      }
    });

    res.status(201).json(lead);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// List Leads (Admin / Agent role check)
app.get('/api/leads', authenticateToken, requireRole(['ADMIN', 'AGENT']), async (req, res) => {
  try {
    let leads;
    if (req.user.role === 'ADMIN') {
      leads = await prisma.lead.findMany({
        include: { property: { select: { title: true } }, agent: { include: { user: { select: { name: true } } } } },
        orderBy: { createdAt: 'desc' }
      });
    } else {
      const agent = await prisma.agent.findFirst({ where: { userId: req.user.id } });
      leads = await prisma.lead.findMany({
        where: { assignedAgent: agent ? agent.id : undefined },
        include: { property: { select: { title: true } } },
        orderBy: { createdAt: 'desc' }
      });
    }
    res.json(leads);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update Lead Status or Assign Agent
app.put('/api/leads/:id', authenticateToken, requireRole(['ADMIN', 'AGENT']), async (req, res) => {
  try {
    const { id } = req.params;
    const { status, assignedAgent, visitDate } = req.body;

    const updated = await prisma.lead.update({
      where: { id },
      data: {
        status,
        assignedAgent,
        visitDate: visitDate ? new Date(visitDate) : undefined
      }
    });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// --- APPOINTMENTS (Site Visits) ---

// Schedule Site Visit Appointment
app.post('/api/appointments', authenticateToken, async (req, res) => {
  try {
    const { propertyId, agentId, appointmentDate, notes } = req.body;

    if (!propertyId || !agentId || !appointmentDate) {
      return res.status(400).json({ error: 'Property ID, Agent ID, and Appointment Date are required' });
    }

    const appointment = await prisma.appointment.create({
      data: {
        propertyId,
        customerId: req.user.id,
        agentId,
        appointmentDate: new Date(appointmentDate),
        notes
      }
    });

    res.status(201).json(appointment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// List Appointments
app.get('/api/appointments', authenticateToken, async (req, res) => {
  try {
    let appointments;
    if (req.user.role === 'ADMIN') {
      appointments = await prisma.appointment.findMany({
        include: {
          property: { select: { title: true, city: true } },
          customer: { select: { name: true, phone: true } },
          agent: { include: { user: { select: { name: true } } } }
        },
        orderBy: { appointmentDate: 'asc' }
      });
    } else if (req.user.role === 'AGENT') {
      const agent = await prisma.agent.findFirst({ where: { userId: req.user.id } });
      appointments = await prisma.appointment.findMany({
        where: { agentId: agent ? agent.id : undefined },
        include: {
          property: { select: { title: true, city: true } },
          customer: { select: { name: true, phone: true } }
        },
        orderBy: { appointmentDate: 'asc' }
      });
    } else {
      appointments = await prisma.appointment.findMany({
        where: { customerId: req.user.id },
        include: {
          property: { select: { title: true, city: true } },
          agent: { include: { user: { select: { name: true } } } }
        },
        orderBy: { appointmentDate: 'asc' }
      });
    }
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update Appointment Status
app.put('/api/appointments/:id', authenticateToken, requireRole(['ADMIN', 'AGENT']), async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const updated = await prisma.appointment.update({
      where: { id },
      data: { status }
    });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// --- AMENITIES ---
app.get('/api/amenities', async (req, res) => {
  try {
    const list = await prisma.amenity.findMany();
    res.json(list);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// --- TESTIMONIALS ---
app.get('/api/testimonials', async (req, res) => {
  try {
    const list = await prisma.testimonial.findMany({ where: { approved: true } });
    res.json(list);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/testimonials', async (req, res) => {
  try {
    const { customerName, designation, review, rating } = req.body;
    const testimonial = await prisma.testimonial.create({
      data: { customerName, designation, review, rating: parseInt(rating) || 5 }
    });
    res.status(201).json(testimonial);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// --- FAQS ---
app.get('/api/faqs', async (req, res) => {
  try {
    const list = await prisma.faq.findMany();
    res.json(list);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// --- BLOGS ---
app.get('/api/blogs', async (req, res) => {
  try {
    const list = await prisma.blog.findMany({
      where: { published: true },
      include: { category: true, author: { select: { name: true } } },
      orderBy: { createdAt: 'desc' }
    });
    res.json(list);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// --- SETTINGS ---
app.get('/api/settings', async (req, res) => {
  try {
    const settings = await prisma.settings.findFirst();
    res.json(settings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 RBM Real Estate API active at http://localhost:${PORT}`);
});
