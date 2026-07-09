import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import AdminSidebar from '../../components/admin/AdminSidebar';
import axios from 'axios';
import { Plus, Edit2, Trash2, X, AlertCircle, RefreshCw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const AdminProperties = () => {
  const { user, isAdminOrAgent, loading: authLoading } = useAuth();
  const navigate = useNavigate();

  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    description: '',
    propertyType: 'RESIDENTIAL',
    purpose: 'SALE',
    price: '',
    bedrooms: '0',
    bathrooms: '0',
    balconies: '0',
    parking: '0',
    area: '',
    address: '',
    city: '',
    state: '',
    country: '',
    builderName: '',
    reraId: '',
    imagesInput: ''
  });

  const fetchProperties = async () => {
    try {
      setLoading(true);
      const res = await axios.get('/api/properties');
      setProperties(res.data);
    } catch (err) {
      console.error('Error fetching properties:', err);
    }
    finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!authLoading && !isAdminOrAgent()) {
      navigate('/admin/login');
    }
  }, [user, authLoading]);

  useEffect(() => {
    if (user && isAdminOrAgent()) {
      fetchProperties();
    }
  }, [user]);

  const handleOpenAdd = () => {
    setSelectedProperty(null);
    setFormData({
      title: '',
      slug: '',
      description: '',
      propertyType: 'RESIDENTIAL',
      purpose: 'SALE',
      price: '',
      bedrooms: '2',
      bathrooms: '2',
      balconies: '1',
      parking: '1',
      area: '1500',
      address: '',
      city: '',
      state: '',
      country: '',
      builderName: '',
      reraId: '',
      imagesInput: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80'
    });
    setError('');
    setShowModal(true);
  };

  const handleOpenEdit = (prop) => {
    setSelectedProperty(prop);
    setFormData({
      title: prop.title,
      slug: prop.slug,
      description: prop.description,
      propertyType: prop.propertyType,
      purpose: prop.purpose,
      price: prop.price.toString(),
      bedrooms: prop.bedrooms.toString(),
      bathrooms: prop.bathrooms.toString(),
      balconies: prop.balconies.toString(),
      parking: prop.parking.toString(),
      area: prop.area.toString(),
      address: prop.address,
      city: prop.city,
      state: prop.state,
      country: prop.country,
      builderName: prop.builderName || '',
      reraId: prop.reraId || '',
      imagesInput: prop.images?.map(i => i.imageUrl).join(', ') || ''
    });
    setError('');
    setShowModal(true);
  };

  const handleTitleChange = (e) => {
    const titleVal = e.target.value;
    const generatedSlug = titleVal
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');

    setFormData(prev => ({
      ...prev,
      title: titleVal,
      slug: generatedSlug
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this property?')) return;
    try {
      await axios.delete(`/api/properties/${id}`);
      setProperties(properties.filter(p => p.id !== id));
    } catch (err) {
      console.error('Error deleting property:', err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);

    const imagesArray = formData.imagesInput
      .split(',')
      .map(url => url.trim())
      .filter(url => url.length > 0);

    const submissionData = {
      ...formData,
      images: imagesArray
    };

    try {
      if (selectedProperty) {
        // Edit Mode
        const res = await axios.put(`/api/properties/${selectedProperty.id}`, submissionData);
        setProperties(properties.map(p => p.id === selectedProperty.id ? { ...p, ...res.data } : p));
      } else {
        // Create Mode
        const res = await axios.post('/api/properties', submissionData);
        setProperties([res.data, ...properties]);
      }
      setShowModal(false);
      fetchProperties(); // Reload detailed list
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to submit form. Verify inputs.');
    } finally {
      setSubmitting(false);
    }
  };

  if (authLoading || !user || !isAdminOrAgent()) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-primary text-white">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-accent" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-slate-50 dark:bg-dark-bg transition-colors duration-300">
      <AdminSidebar />

      <main className="flex-grow p-8 overflow-y-auto">
        <header className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-serif text-slate-900 dark:text-white">Properties Portfolio</h1>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Manage listed luxury estates and properties</p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={fetchProperties}
              className="p-2.5 bg-white dark:bg-dark-card border border-slate-100 dark:border-dark-border/40 hover:border-accent text-slate-600 dark:text-slate-300 rounded-lg cursor-pointer transition-all"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
            <button
              onClick={handleOpenAdd}
              className="bg-accent hover:bg-gold-hover text-primary px-4 py-2.5 rounded-lg text-sm font-semibold flex items-center gap-2 shadow cursor-pointer transition-all duration-300"
            >
              <Plus className="w-4 h-4" /> Create Listing
            </button>
          </div>
        </header>

        {loading ? (
          <div className="h-64 flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-accent" />
          </div>
        ) : (
          <div className="bg-white dark:bg-dark-card border border-slate-100 dark:border-dark-border/40 rounded-xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-slate-100 dark:border-dark-border/40 text-slate-400 text-xs uppercase bg-slate-50 dark:bg-[#1E293B]/20">
                    <th className="p-4 font-medium">Cover</th>
                    <th className="p-4 font-medium">Title & Location</th>
                    <th className="p-4 font-medium">Price</th>
                    <th className="p-4 font-medium">Specs</th>
                    <th className="p-4 font-medium">Status</th>
                    <th className="p-4 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-dark-border/20">
                  {properties.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="p-8 text-center text-slate-400">No properties registered.</td>
                    </tr>
                  ) : (
                    properties.map((prop) => (
                      <tr key={prop.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/10 text-slate-700 dark:text-slate-300 transition-colors">
                        <td className="p-4">
                          <img
                            src={prop.images?.[0]?.imageUrl || 'https://placehold.co/80x60'}
                            alt=""
                            className="w-16 h-12 rounded object-cover border border-slate-100 dark:border-slate-800"
                          />
                        </td>
                        <td className="p-4">
                          <h4 className="font-semibold text-slate-900 dark:text-white text-base">{prop.title}</h4>
                          <p className="text-xs text-slate-400 mt-0.5">{prop.city}, {prop.country}</p>
                          <span className="text-[10px] text-accent tracking-widest uppercase font-light mt-1 inline-block">{prop.propertyType} • For {prop.purpose}</span>
                        </td>
                        <td className="p-4 font-semibold text-slate-950 dark:text-white">
                          ${parseFloat(prop.price).toLocaleString()}
                        </td>
                        <td className="p-4 text-xs space-y-0.5">
                          <p>{prop.bedrooms} Bed | {prop.bathrooms} Bath</p>
                          <p className="text-slate-400">{parseFloat(prop.area).toLocaleString()} {prop.areaUnit}</p>
                        </td>
                        <td className="p-4">
                          <span className={`px-2.5 py-1 rounded-full text-[10px] tracking-wide uppercase font-semibold ${
                            prop.status === 'AVAILABLE' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-red-500/10 text-red-500'
                          }`}>
                            {prop.status}
                          </span>
                        </td>
                        <td className="p-4">
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleOpenEdit(prop)}
                              className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 hover:text-accent rounded cursor-pointer transition-all"
                              title="Edit Property"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDelete(prop.id)}
                              className="p-1.5 hover:bg-red-500/10 text-slate-500 hover:text-red-500 rounded cursor-pointer transition-all"
                              title="Delete Property"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>

      {/* CRUD MODAL */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white dark:bg-dark-card border border-slate-200 dark:border-dark-border/40 w-full max-w-3xl rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
            >
              {/* Header */}
              <div className="p-6 border-b border-slate-100 dark:border-dark-border/40 flex justify-between items-center bg-slate-50 dark:bg-[#1E293B]/20">
                <h3 className="text-xl font-serif text-slate-900 dark:text-white">
                  {selectedProperty ? 'Edit Property Listing' : 'Publish New Property'}
                </h3>
                <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-600 dark:hover:text-white cursor-pointer">
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="p-6 overflow-y-auto flex-grow space-y-6">
                {error && (
                  <div className="p-4 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-lg flex items-center gap-3 text-red-700 dark:text-red-300 text-sm">
                    <AlertCircle className="w-5 h-5 text-red-500 shrink-0" />
                    <span>{error}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Title */}
                  <div className="md:col-span-2">
                    <label className="block text-slate-500 dark:text-slate-400 text-xs uppercase mb-1.5 font-medium">Property Title</label>
                    <input
                      type="text"
                      required
                      value={formData.title}
                      onChange={handleTitleChange}
                      placeholder="e.g. Elysium Waterfront Duplex"
                      className="w-full px-4 py-2.5 bg-slate-50 dark:bg-primary border border-slate-200 dark:border-slate-800 rounded-lg focus:outline-none focus:border-accent text-slate-950 dark:text-white text-sm"
                    />
                  </div>

                  {/* Slug */}
                  <div>
                    <label className="block text-slate-500 dark:text-slate-400 text-xs uppercase mb-1.5 font-medium">Slug (Auto-generated)</label>
                    <input
                      type="text"
                      required
                      readOnly
                      value={formData.slug}
                      className="w-full px-4 py-2.5 bg-slate-100 dark:bg-primary/50 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-500 text-sm focus:outline-none"
                    />
                  </div>

                  {/* Price */}
                  <div>
                    <label className="block text-slate-500 dark:text-slate-400 text-xs uppercase mb-1.5 font-medium">Price (USD)</label>
                    <input
                      type="number"
                      required
                      name="price"
                      value={formData.price}
                      onChange={handleInputChange}
                      placeholder="e.g. 2400000"
                      className="w-full px-4 py-2.5 bg-slate-50 dark:bg-primary border border-slate-200 dark:border-slate-800 rounded-lg focus:outline-none focus:border-accent text-slate-950 dark:text-white text-sm"
                    />
                  </div>

                  {/* Type */}
                  <div>
                    <label className="block text-slate-500 dark:text-slate-400 text-xs uppercase mb-1.5 font-medium">Property Type</label>
                    <select
                      name="propertyType"
                      value={formData.propertyType}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2.5 bg-slate-50 dark:bg-primary border border-slate-200 dark:border-slate-800 rounded-lg focus:outline-none focus:border-accent text-slate-950 dark:text-white text-sm"
                    >
                      <option value="PENTHOUSE">Penthouse</option>
                      <option value="VILLA">Villa</option>
                      <option value="RESIDENTIAL">Residential Apartment</option>
                      <option value="COMMERCIAL">Commercial Office</option>
                    </select>
                  </div>

                  {/* Purpose */}
                  <div>
                    <label className="block text-slate-500 dark:text-slate-400 text-xs uppercase mb-1.5 font-medium">Listing Purpose</label>
                    <select
                      name="purpose"
                      value={formData.purpose}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2.5 bg-slate-50 dark:bg-primary border border-slate-200 dark:border-slate-800 rounded-lg focus:outline-none focus:border-accent text-slate-950 dark:text-white text-sm"
                    >
                      <option value="SALE">For Sale</option>
                      <option value="RENT">For Rent</option>
                    </select>
                  </div>

                  {/* Beds & Baths */}
                  <div className="grid grid-cols-4 gap-2 md:col-span-2">
                    <div>
                      <label className="block text-slate-500 dark:text-slate-400 text-[10px] uppercase mb-1 font-medium">Bedrooms</label>
                      <input
                        type="number"
                        name="bedrooms"
                        value={formData.bedrooms}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 bg-slate-50 dark:bg-primary border border-slate-200 dark:border-slate-800 rounded-lg focus:outline-none text-slate-950 dark:text-white text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-500 dark:text-slate-400 text-[10px] uppercase mb-1 font-medium">Bathrooms</label>
                      <input
                        type="number"
                        name="bathrooms"
                        value={formData.bathrooms}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 bg-slate-50 dark:bg-primary border border-slate-200 dark:border-slate-800 rounded-lg focus:outline-none text-slate-950 dark:text-white text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-500 dark:text-slate-400 text-[10px] uppercase mb-1 font-medium">Balconies</label>
                      <input
                        type="number"
                        name="balconies"
                        value={formData.balconies}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 bg-slate-50 dark:bg-primary border border-slate-200 dark:border-slate-800 rounded-lg focus:outline-none text-slate-950 dark:text-white text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-500 dark:text-slate-400 text-[10px] uppercase mb-1 font-medium">Parking</label>
                      <input
                        type="number"
                        name="parking"
                        value={formData.parking}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 bg-slate-50 dark:bg-primary border border-slate-200 dark:border-slate-800 rounded-lg focus:outline-none text-slate-950 dark:text-white text-sm"
                      />
                    </div>
                  </div>

                  {/* Area */}
                  <div>
                    <label className="block text-slate-500 dark:text-slate-400 text-xs uppercase mb-1.5 font-medium">Area (SQFT)</label>
                    <input
                      type="number"
                      required
                      name="area"
                      value={formData.area}
                      onChange={handleInputChange}
                      placeholder="e.g. 3500"
                      className="w-full px-4 py-2.5 bg-slate-50 dark:bg-primary border border-slate-200 dark:border-slate-800 rounded-lg focus:outline-none focus:border-accent text-slate-950 dark:text-white text-sm"
                    />
                  </div>

                  {/* Builder Name */}
                  <div>
                    <label className="block text-slate-500 dark:text-slate-400 text-xs uppercase mb-1.5 font-medium">Builder Name</label>
                    <input
                      type="text"
                      name="builderName"
                      value={formData.builderName}
                      onChange={handleInputChange}
                      placeholder="e.g. Signature Developments"
                      className="w-full px-4 py-2.5 bg-slate-50 dark:bg-primary border border-slate-200 dark:border-slate-800 rounded-lg focus:outline-none focus:border-accent text-slate-950 dark:text-white text-sm"
                    />
                  </div>

                  {/* RERA Registration */}
                  <div>
                    <label className="block text-slate-500 dark:text-slate-400 text-xs uppercase mb-1.5 font-medium">RERA Permit ID</label>
                    <input
                      type="text"
                      name="reraId"
                      value={formData.reraId}
                      onChange={handleInputChange}
                      placeholder="e.g. RERA-NY-4221"
                      className="w-full px-4 py-2.5 bg-slate-50 dark:bg-primary border border-slate-200 dark:border-slate-800 rounded-lg focus:outline-none focus:border-accent text-slate-950 dark:text-white text-sm"
                    />
                  </div>

                  {/* Address */}
                  <div className="md:col-span-2">
                    <label className="block text-slate-500 dark:text-slate-400 text-xs uppercase mb-1.5 font-medium">Exact Address</label>
                    <input
                      type="text"
                      required
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      placeholder="Street address, block number..."
                      className="w-full px-4 py-2.5 bg-slate-50 dark:bg-primary border border-slate-200 dark:border-slate-800 rounded-lg focus:outline-none focus:border-accent text-slate-950 dark:text-white text-sm"
                    />
                  </div>

                  {/* City, State, Country */}
                  <div className="grid grid-cols-3 gap-2 md:col-span-2">
                    <div>
                      <label className="block text-slate-500 dark:text-slate-400 text-xs uppercase mb-1.5 font-medium">City</label>
                      <input
                        type="text"
                        required
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 bg-slate-50 dark:bg-primary border border-slate-200 dark:border-slate-800 rounded-lg focus:outline-none text-slate-950 dark:text-white text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-500 dark:text-slate-400 text-xs uppercase mb-1.5 font-medium">State</label>
                      <input
                        type="text"
                        required
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 bg-slate-50 dark:bg-primary border border-slate-200 dark:border-slate-800 rounded-lg focus:outline-none text-slate-950 dark:text-white text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-500 dark:text-slate-400 text-xs uppercase mb-1.5 font-medium">Country</label>
                      <input
                        type="text"
                        required
                        name="country"
                        value={formData.country}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 bg-slate-50 dark:bg-primary border border-slate-200 dark:border-slate-800 rounded-lg focus:outline-none text-slate-950 dark:text-white text-sm"
                      />
                    </div>
                  </div>

                  {/* Description */}
                  <div className="md:col-span-2">
                    <label className="block text-slate-500 dark:text-slate-400 text-xs uppercase mb-1.5 font-medium">Description</label>
                    <textarea
                      required
                      name="description"
                      rows="4"
                      value={formData.description}
                      onChange={handleInputChange}
                      placeholder="Write description detailing amenities, accessibility, views..."
                      className="w-full px-4 py-2.5 bg-slate-50 dark:bg-primary border border-slate-200 dark:border-slate-800 rounded-lg focus:outline-none focus:border-accent text-slate-950 dark:text-white text-sm"
                    />
                  </div>

                  {/* Images list (comma separated) */}
                  <div className="md:col-span-2">
                    <label className="block text-slate-500 dark:text-slate-400 text-xs uppercase mb-1.5 font-medium">Image URLs (comma separated)</label>
                    <input
                      type="text"
                      name="imagesInput"
                      value={formData.imagesInput}
                      onChange={handleInputChange}
                      placeholder="https://images.unsplash.com/url1, https://images.unsplash.com/url2"
                      className="w-full px-4 py-2.5 bg-slate-50 dark:bg-primary border border-slate-200 dark:border-slate-800 rounded-lg focus:outline-none focus:border-accent text-slate-950 dark:text-white text-sm font-mono"
                    />
                  </div>
                </div>

                {/* Footer Controls */}
                <div className="pt-4 border-t border-slate-100 dark:border-dark-border/40 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-5 py-2.5 text-sm border border-slate-250 dark:border-slate-800 text-slate-500 hover:bg-slate-50 rounded-lg cursor-pointer transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="px-6 py-2.5 text-sm bg-accent hover:bg-gold-hover text-primary font-semibold rounded-lg cursor-pointer transition-all duration-300 shadow"
                  >
                    {submitting ? 'Submitting...' : 'Save Listing'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminProperties;
