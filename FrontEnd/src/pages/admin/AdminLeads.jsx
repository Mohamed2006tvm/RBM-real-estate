import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import AdminSidebar from '../../components/admin/AdminSidebar';
import axios from 'axios';
import { Filter, Calendar, MessageSquare, RefreshCw } from 'lucide-react';
import { motion } from 'framer-motion';

const AdminLeads = () => {
  const { user, isAdminOrAgent, loading: authLoading } = useAuth();
  const navigate = useNavigate();

  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState('ALL');
  const [updatingId, setUpdatingId] = useState(null);

  const fetchLeads = async () => {
    try {
      setLoading(true);
      const res = await axios.get('/api/leads');
      setLeads(res.data);
    } catch (err) {
      console.error('Error fetching leads:', err);
    } finally {
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
      fetchLeads();
    }
  }, [user]);

  const handleStatusChange = async (leadId, newStatus) => {
    try {
      setUpdatingId(leadId);
      await axios.put(`/api/leads/${leadId}`, { status: newStatus });
      setLeads(leads.map(l => l.id === leadId ? { ...l, status: newStatus } : l));
    } catch (err) {
      console.error('Failed to update lead status:', err);
    } finally {
      setUpdatingId(null);
    }
  };

  const handleVisitDateChange = async (leadId, dateStr) => {
    try {
      setUpdatingId(leadId);
      await axios.put(`/api/leads/${leadId}`, { visitDate: dateStr });
      setLeads(leads.map(l => l.id === leadId ? { ...l, visitDate: dateStr } : l));
    } catch (err) {
      console.error('Failed to update visit date:', err);
    } finally {
      setUpdatingId(null);
    }
  };

  const filteredLeads = filterStatus === 'ALL' 
    ? leads 
    : leads.filter(l => l.status === filterStatus);

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
        <header className="mb-8 flex flex-col sm:flex-row justify-between sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-serif text-slate-900 dark:text-white">Leads Registry</h1>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Review and process inbound buying interest</p>
          </div>

          <div className="flex gap-3 items-center">
            <button
              onClick={fetchLeads}
              className="p-2.5 bg-white dark:bg-dark-card border border-slate-100 dark:border-dark-border/40 hover:border-accent text-slate-600 dark:text-slate-300 rounded-lg cursor-pointer transition-all"
              title="Refresh Data"
            >
              <RefreshCw className="w-4 h-4" />
            </button>

            {/* Filter Toggle */}
            <div className="relative flex items-center bg-white dark:bg-dark-card border border-slate-100 dark:border-dark-border/40 rounded-lg px-3">
              <Filter className="w-4 h-4 text-slate-400 mr-2" />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="py-2.5 pr-8 bg-transparent text-sm text-slate-700 dark:text-slate-300 focus:outline-none border-none cursor-pointer"
              >
                <option value="ALL">All Leads</option>
                <option value="NEW">New</option>
                <option value="CONTACTED">Contacted</option>
                <option value="VISITING">Visiting</option>
                <option value="CLOSED">Closed</option>
              </select>
            </div>
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
                    <th className="p-4 font-medium">Customer Details</th>
                    <th className="p-4 font-medium">Property Interest</th>
                    <th className="p-4 font-medium">Message</th>
                    <th className="p-4 font-medium">Schedule Site Visit</th>
                    <th className="p-4 font-medium">Status Guard</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-dark-border/20">
                  {filteredLeads.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="p-8 text-center text-slate-400">No matching client leads found.</td>
                    </tr>
                  ) : (
                    filteredLeads.map((lead) => (
                      <tr key={lead.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/10 text-slate-700 dark:text-slate-300 transition-colors">
                        {/* Name & Contact */}
                        <td className="p-4">
                          <h4 className="font-semibold text-slate-950 dark:text-white text-base">{lead.customerName}</h4>
                          <p className="text-xs text-slate-400 mt-0.5">{lead.email}</p>
                          <p className="text-xs font-mono text-slate-500 mt-0.5">{lead.phone}</p>
                        </td>

                        {/* Property Title */}
                        <td className="p-4">
                          {lead.property ? (
                            <span className="text-primary dark:text-accent font-medium">{lead.property.title}</span>
                          ) : (
                            <span className="text-slate-400 italic">General Inquiry</span>
                          )}
                        </td>

                        {/* Message */}
                        <td className="p-4 max-w-xs">
                          <p className="text-xs line-clamp-2" title={lead.message}>
                            {lead.message || <span className="text-slate-400 italic">No notes provided</span>}
                          </p>
                        </td>

                        {/* Visit date setter */}
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            <input
                              type="datetime-local"
                              value={lead.visitDate ? new Date(new Date(lead.visitDate).getTime() - new Date().getTimezoneOffset() * 60000).toISOString().slice(0, 16) : ''}
                              onChange={(e) => handleVisitDateChange(lead.id, e.target.value)}
                              className="text-xs px-2 py-1.5 bg-slate-50 dark:bg-primary border border-slate-200 dark:border-slate-800 rounded text-slate-700 dark:text-slate-300 focus:outline-none focus:border-accent"
                            />
                          </div>
                        </td>

                        {/* Status select */}
                        <td className="p-4">
                          <select
                            disabled={updatingId === lead.id}
                            value={lead.status}
                            onChange={(e) => handleStatusChange(lead.id, e.target.value)}
                            className={`text-xs px-3 py-1.5 rounded-full font-semibold border-none cursor-pointer focus:outline-none ${
                              lead.status === 'CLOSED' ? 'bg-emerald-500/10 text-emerald-500' :
                              lead.status === 'VISITING' ? 'bg-blue-500/10 text-blue-500' :
                              lead.status === 'CONTACTED' ? 'bg-amber-500/10 text-amber-500' :
                              'bg-purple-500/10 text-purple-500'
                            }`}
                          >
                            <option value="NEW">New</option>
                            <option value="CONTACTED">Contacted</option>
                            <option value="VISITING">Visiting</option>
                            <option value="CLOSED">Closed</option>
                          </select>
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
    </div>
  );
};

export default AdminLeads;
