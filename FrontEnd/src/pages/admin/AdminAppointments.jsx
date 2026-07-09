import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import AdminSidebar from '../../components/admin/AdminSidebar';
import axios from 'axios';
import { Calendar, Phone, CheckCircle2, XCircle, Clock, RefreshCw } from 'lucide-react';
import { motion } from 'framer-motion';

const AdminAppointments = () => {
  const { user, isAdminOrAgent, loading: authLoading } = useAuth();
  const navigate = useNavigate();

  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);

  const fetchAppointments = async () => {
    try {
      setLoading(true);
      const res = await axios.get('/api/appointments');
      setAppointments(res.data);
    } catch (err) {
      console.error('Error fetching appointments:', err);
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
      fetchAppointments();
    }
  }, [user]);

  const handleStatusUpdate = async (id, newStatus) => {
    try {
      setUpdatingId(id);
      await axios.put(`/api/appointments/${id}`, { status: newStatus });
      setAppointments(appointments.map(app => app.id === id ? { ...app, status: newStatus } : app));
    } catch (err) {
      console.error('Failed to update appointment status:', err);
    } finally {
      setUpdatingId(null);
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
            <h1 className="text-3xl font-serif text-slate-900 dark:text-white">Site Visits Calendar</h1>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Manage scheduled viewings & customer meetups</p>
          </div>

          <button
            onClick={fetchAppointments}
            className="p-2.5 bg-white dark:bg-dark-card border border-slate-100 dark:border-dark-border/40 hover:border-accent text-slate-600 dark:text-slate-300 rounded-lg cursor-pointer transition-all"
            title="Refresh Data"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </header>

        {loading ? (
          <div className="h-64 flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-accent" />
          </div>
        ) : (
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            {appointments.length === 0 ? (
              <div className="col-span-2 text-center py-12 text-slate-400 bg-white dark:bg-dark-card rounded-xl border border-slate-100 dark:border-dark-border/40">
                No site appointments scheduled yet.
              </div>
            ) : (
              appointments.map((app) => (
                <motion.div
                  key={app.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white dark:bg-dark-card border border-slate-100 dark:border-dark-border/40 p-6 rounded-xl shadow-sm flex flex-col justify-between"
                >
                  <div className="flex justify-between items-start gap-4 mb-4">
                    <div>
                      <h4 className="font-serif text-lg text-slate-900 dark:text-white font-semibold">
                        {app.property?.title}
                      </h4>
                      <p className="text-xs text-slate-400 mt-0.5">{app.property?.city}</p>
                    </div>

                    <span className={`px-3 py-1 rounded-full text-xs font-semibold uppercase ${
                      app.status === 'COMPLETED' ? 'bg-emerald-500/10 text-emerald-500' :
                      app.status === 'CANCELLED' ? 'bg-red-500/10 text-red-500' :
                      'bg-amber-500/10 text-amber-500'
                    }`}>
                      {app.status}
                    </span>
                  </div>

                  {/* Customer Card */}
                  <div className="bg-slate-50 dark:bg-[#1E293B]/20 p-4 rounded-lg space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-500 dark:text-slate-400">Client:</span>
                      <span className="font-semibold text-slate-800 dark:text-slate-200">{app.customer?.name}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-500 dark:text-slate-400">Phone:</span>
                      <a href={`tel:${app.customer?.phone}`} className="hover:text-accent font-mono text-xs flex items-center gap-1 text-slate-800 dark:text-slate-200">
                        <Phone className="w-3 h-3" /> {app.customer?.phone}
                      </a>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-500 dark:text-slate-400">Meeting Date:</span>
                      <span className="font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-accent" /> {new Date(app.appointmentDate).toLocaleString()}
                      </span>
                    </div>
                    {app.agent && (
                      <div className="flex justify-between text-sm pt-1.5 border-t border-slate-200/50 dark:border-slate-800/40">
                        <span className="text-slate-500 dark:text-slate-400">Assigned Agent:</span>
                        <span className="text-accent text-xs font-semibold uppercase tracking-wider">{app.agent?.user?.name}</span>
                      </div>
                    )}
                  </div>

                  {app.notes && (
                    <p className="text-xs text-slate-500 dark:text-slate-400 bg-amber-500/5 border-l-2 border-accent/40 p-3 rounded-r mb-4">
                      <strong>Client Note:</strong> {app.notes}
                    </p>
                  )}

                  {/* Actions */}
                  <div className="flex justify-end gap-2 pt-4 border-t border-slate-100 dark:border-dark-border/20">
                    {app.status === 'SCHEDULED' && (
                      <>
                        <button
                          disabled={updatingId === app.id}
                          onClick={() => handleStatusUpdate(app.id, 'CANCELLED')}
                          className="flex items-center gap-1 px-4 py-2 text-xs border border-red-500/20 text-red-500 hover:bg-red-500/5 rounded-lg cursor-pointer transition-all"
                        >
                          <XCircle className="w-4 h-4" /> Cancel Visit
                        </button>
                        <button
                          disabled={updatingId === app.id}
                          onClick={() => handleStatusUpdate(app.id, 'COMPLETED')}
                          className="flex items-center gap-1 px-4 py-2 text-xs bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg cursor-pointer transition-all shadow-sm"
                        >
                          <CheckCircle2 className="w-4 h-4" /> Mark Completed
                        </button>
                      </>
                    )}
                    {app.status !== 'SCHEDULED' && (
                      <button
                        disabled={updatingId === app.id}
                        onClick={() => handleStatusUpdate(app.id, 'SCHEDULED')}
                        className="flex items-center gap-1 px-4 py-2 text-xs border border-slate-200 dark:border-slate-800 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-850 rounded-lg cursor-pointer transition-all"
                      >
                        <Clock className="w-4 h-4" /> Re-Schedule
                      </button>
                    )}
                  </div>
                </motion.div>
              ))
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminAppointments;
