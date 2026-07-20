import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  DollarSign,
  Calendar,
  UserPlus,
  AlertCircle,
  TrendingUp,
  CheckCircle2,
  Clock,
  Sparkles,
  ArrowUpRight,
  ChevronRight,
  Plus,
  UserCheck,
  MapPin,
  Play
} from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from 'recharts';

export const DashboardView = () => {
  const {
    jobs,
    leads,
    invoices,
    setActiveTab,
    setActiveModal,
    updateJobStatus,
    showToast
  } = useApp();

  const chartData = [
    { day: 'Mon', revenue: 2400 },
    { day: 'Tue', revenue: 3100 },
    { day: 'Wed', revenue: 2800 },
    { day: 'Thu', revenue: 4200 },
    { day: 'Fri', revenue: 3900 },
    { day: 'Sat', revenue: 5100 },
    { day: 'Sun', revenue: 1850 }
  ];

  const todayJobs = jobs.filter(j => j.date === '2026-07-20' || j.date === new Date().toISOString().split('T')[0]);
  const overdueInvoices = invoices.filter(inv => inv.status === 'overdue');

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-purple-700 bg-purple-100/80 px-3 py-1 rounded-full w-fit border border-purple-300/60 mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>SimplyClean Operating System • Austin TX Branch</span>
          </div>
          <h1 className="font-heading text-3xl font-bold text-obsidian-900 tracking-tight">
            Operations Dashboard
          </h1>
          <p className="text-obsidian-500 text-xs mt-1 font-medium">
            Overview of today's cleaning schedule, dispatch status, quotes, and revenue.
          </p>
        </div>

        {/* Quick Actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setActiveModal('new_job')}
            className="px-4 py-2.5 bg-obsidian-900 hover:bg-obsidian-800 text-white font-bold rounded-2xl shadow-soft text-xs flex items-center gap-2 transition-all border border-purple-300/40">
            <Plus className="w-4 h-4 text-yellow-300" />
            <span>Schedule New Job</span>
          </button>
          <button
            onClick={() => setActiveModal('new_lead')}
            className="px-4 py-2.5 bg-purple-100 hover:bg-purple-200 text-purple-950 font-bold rounded-2xl border border-purple-300 text-xs flex items-center gap-2 transition-all">
            <UserPlus className="w-4 h-4 text-purple-700" />
            <span>Add New Lead</span>
          </button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        
        {/* Metric 1 */}
        <div className="bg-white p-5 rounded-3xl border border-purple-200 shadow-soft hover:shadow-soft-lg transition-all space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-xs font-bold text-obsidian-500 uppercase tracking-wider">Weekly Revenue</span>
            <div className="w-9 h-9 rounded-2xl bg-purple-100 text-purple-800 flex items-center justify-center font-bold">
              <DollarSign className="w-5 h-5" />
            </div>
          </div>
          <div>
            <div className="font-heading text-3xl font-bold text-obsidian-900">$23,350.00</div>
            <div className="mt-1 flex items-center gap-1 text-xs font-bold text-emerald-600">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>+18.4% vs last week</span>
            </div>
          </div>
        </div>

        {/* Metric 2 */}
        <div className="bg-white p-5 rounded-3xl border border-purple-200 shadow-soft hover:shadow-soft-lg transition-all space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-xs font-bold text-obsidian-500 uppercase tracking-wider">Today's Jobs</span>
            <div className="w-9 h-9 rounded-2xl bg-yellow-100 text-yellow-800 flex items-center justify-center font-bold">
              <Calendar className="w-5 h-5" />
            </div>
          </div>
          <div>
            <div className="font-heading text-3xl font-bold text-obsidian-900">{todayJobs.length || 3} Scheduled</div>
            <div className="mt-1 flex items-center gap-2 text-xs font-semibold text-obsidian-600">
              <span className="text-emerald-600 font-bold">1 Completed</span>
              <span>•</span>
              <span className="text-purple-600 font-bold">1 En Route</span>
            </div>
          </div>
        </div>

        {/* Metric 3 */}
        <div className="bg-white p-5 rounded-3xl border border-purple-200 shadow-soft hover:shadow-soft-lg transition-all space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-xs font-bold text-obsidian-500 uppercase tracking-wider">Active Pipeline</span>
            <div className="w-9 h-9 rounded-2xl bg-purple-100 text-purple-800 flex items-center justify-center font-bold">
              <UserPlus className="w-5 h-5" />
            </div>
          </div>
          <div>
            <div className="font-heading text-3xl font-bold text-obsidian-900">{leads.length} Leads</div>
            <div className="mt-1 text-xs font-semibold text-purple-700">
              Est. Value: ${leads.reduce((acc, curr) => acc + (curr.estimatedPrice || 0), 0)}
            </div>
          </div>
        </div>

        {/* Metric 4 */}
        <div className="bg-white p-5 rounded-3xl border border-purple-200 shadow-soft hover:shadow-soft-lg transition-all space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-xs font-bold text-obsidian-500 uppercase tracking-wider">Attention Required</span>
            <div className="w-9 h-9 rounded-2xl bg-rose-100 text-rose-700 flex items-center justify-center font-bold">
              <AlertCircle className="w-5 h-5" />
            </div>
          </div>
          <div>
            <div className="font-heading text-3xl font-bold text-obsidian-900">{overdueInvoices.length} Overdue</div>
            <div className="mt-1 text-xs font-semibold text-rose-600">
              ${overdueInvoices.reduce((acc, curr) => acc + (curr.total || 0), 0).toFixed(2)} Pending Payment
            </div>
          </div>
        </div>

      </div>

      {/* Main Grid: Schedule & Revenue Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Today's Dispatch Schedule */}
        <div className="lg:col-span-7 bg-white p-6 rounded-3xl border border-purple-200 shadow-soft space-y-5">
          
          <div className="flex justify-between items-center pb-3 border-b border-purple-100">
            <div>
              <h2 className="font-heading text-lg font-bold text-obsidian-900 flex items-center gap-2">
                <Clock className="w-5 h-5 text-purple-600" />
                <span>Today's Cleaning Schedule</span>
              </h2>
              <p className="text-xs text-obsidian-500">Live dispatch and status updates from active cleaner crews</p>
            </div>
            <button
              onClick={() => setActiveTab('jobs')}
              className="text-xs font-bold text-purple-700 hover:underline flex items-center gap-1">
              <span>View Full Calendar</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-3.5">
            {todayJobs.map((job) => (
              <div
                key={job.id}
                className="p-4 rounded-2xl border border-purple-200 bg-purple-50/40 hover:bg-purple-50/80 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-obsidian-900">{job.title}</span>
                    <span className={`px-2.5 py-0.5 text-[10px] font-extrabold rounded-full ${
                      job.status === 'completed' ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' :
                      job.status === 'in_progress' ? 'bg-yellow-100 text-yellow-800 border border-yellow-300' :
                      'bg-purple-100 text-purple-800 border border-purple-300'
                    }`}>
                      {job.status.replace('_', ' ').toUpperCase()}
                    </span>
                  </div>
                  
                  <div className="text-xs text-obsidian-600 flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-purple-600 shrink-0" />
                    <span>{job.address}</span>
                  </div>

                  <div className="text-[11px] text-obsidian-500 flex items-center gap-3">
                    <span className="font-semibold text-purple-900">🕒 {job.startTime} - {job.endTime}</span>
                    <span>•</span>
                    <span className="font-medium">Crew: {job.assignedCrewNames ? job.assignedCrewNames.join(', ') : 'Assigned'}</span>
                  </div>
                </div>

                <div className="flex sm:flex-col items-end justify-between gap-2 shrink-0">
                  <span className="font-heading font-bold text-base text-obsidian-900">${job.price}</span>
                  {job.status !== 'completed' ? (
                    <button
                      onClick={() => updateJobStatus(job.id, 'completed')}
                      className="px-3 py-1.5 bg-obsidian-900 hover:bg-obsidian-800 text-yellow-300 font-bold rounded-xl text-xs transition-all flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Complete & Invoice</span>
                    </button>
                  ) : (
                    <span className="text-[11px] font-bold text-emerald-600 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Invoiced
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* Revenue Growth Chart */}
        <div className="lg:col-span-5 bg-white p-6 rounded-3xl border border-purple-200 shadow-soft space-y-5 flex flex-col justify-between">
          
          <div>
            <div className="flex justify-between items-center pb-3 border-b border-purple-100">
              <div>
                <h2 className="font-heading text-lg font-bold text-obsidian-900">Revenue Performance</h2>
                <p className="text-xs text-obsidian-500">Daily revenue collected via Stripe</p>
              </div>
              <span className="px-2.5 py-1 text-[11px] bg-yellow-100 text-yellow-800 font-bold rounded-full border border-yellow-300">
                Weekly Total: $23.3k
              </span>
            </div>

            <div className="h-56 mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#C084FC" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="#FAF5FF" stopOpacity={0.0}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="day" stroke="#94A3B8" fontSize={11} tickLine={false} />
                  <YAxis stroke="#94A3B8" fontSize={11} tickLine={false} axisLine={false} />
                  <Tooltip contentStyle={{ borderRadius: '16px', borderColor: '#E9D5FF', fontSize: '12px' }} />
                  <Area type="monotone" dataKey="revenue" stroke="#9333EA" strokeWidth={3} fillOpacity={1} fill="url(#colorRev)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="p-4 bg-purple-50 rounded-2xl border border-purple-200 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2.5">
              <Sparkles className="w-4 h-4 text-purple-700" />
              <span className="font-semibold text-purple-950">QuickBooks Auto-Sync enabled</span>
            </div>
            <button
              onClick={() => setActiveTab('integrations')}
              className="text-purple-700 font-bold hover:underline">
              Sync Log →
            </button>
          </div>

        </div>

      </div>

    </div>
  );
};
