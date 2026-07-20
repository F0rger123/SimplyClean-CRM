import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  BarChart3,
  Download,
  DollarSign,
  TrendingUp,
  Award,
  Users,
  Sparkles,
  Star
} from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, PieChart, Pie, Cell } from 'recharts';

export const ReportsView = () => {
  const { contractors, showToast } = useApp();

  const serviceBreakdown = [
    { name: 'Standard Clean', value: 45, color: '#A855F7' },
    { name: 'Deep Clean', value: 30, color: '#D8B4FE' },
    { name: 'Commercial', value: 18, color: '#FACC15' },
    { name: 'Move-In/Out', value: 7, color: '#FEF08A' }
  ];

  const handleExportCSV = () => {
    showToast('SimplyClean Financial & Cleaner Performance Report exported to CSV!');
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-3xl font-bold text-obsidian-900 tracking-tight">
            Reports & Profit Margin Analytics
          </h1>
          <p className="text-obsidian-500 text-xs mt-1 font-medium">
            Financial analytics, crew performance leaderboards, and revenue channel breakdown.
          </p>
        </div>

        <button
          onClick={handleExportCSV}
          className="px-5 py-3 bg-obsidian-900 hover:bg-obsidian-800 text-white font-bold rounded-2xl shadow-soft text-xs flex items-center gap-2 border border-purple-300/40">
          <Download className="w-4 h-4 text-yellow-300" />
          <span>Export Analytics CSV</span>
        </button>
      </div>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
        
        <div className="bg-white p-5 rounded-3xl border border-purple-200 shadow-soft">
          <div className="text-xs font-bold text-obsidian-500 uppercase">Gross Profit Margin</div>
          <div className="font-heading text-3xl font-bold text-obsidian-900 mt-2">68.4%</div>
          <div className="text-xs text-emerald-600 font-bold mt-1">+4.2% optimized crew routes</div>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-purple-200 shadow-soft">
          <div className="text-xs font-bold text-obsidian-500 uppercase">Average Ticket / Job</div>
          <div className="font-heading text-3xl font-bold text-obsidian-900 mt-2">$235.00</div>
          <div className="text-xs text-purple-700 font-bold mt-1">+$45 via add-on estimator</div>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-purple-200 shadow-soft">
          <div className="text-xs font-bold text-obsidian-500 uppercase">Quote Conversion Rate</div>
          <div className="font-heading text-3xl font-bold text-obsidian-900 mt-2">78.2%</div>
          <div className="text-xs text-yellow-600 font-bold mt-1">Twilio SMS instant quotes</div>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-purple-200 shadow-soft">
          <div className="text-xs font-bold text-obsidian-500 uppercase">Client Retention Rate</div>
          <div className="font-heading text-3xl font-bold text-obsidian-900 mt-2">94.1%</div>
          <div className="text-xs text-purple-700 font-bold mt-1">Bi-weekly recurring subscription</div>
        </div>

      </div>

      {/* Charts & Cleaner Leaderboard */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Cleaner Performance Leaderboard */}
        <div className="lg:col-span-7 bg-white p-6 rounded-3xl border border-purple-200 shadow-soft space-y-4">
          <div className="flex justify-between items-center pb-3 border-b border-purple-100">
            <h2 className="font-heading text-lg font-bold text-obsidian-900 flex items-center gap-2">
              <Award className="w-5 h-5 text-yellow-600" />
              <span>Cleaner Performance Leaderboard</span>
            </h2>
            <span className="text-xs font-bold text-purple-700">July 2026 Rankings</span>
          </div>

          <div className="space-y-3">
            {contractors.map((c, idx) => (
              <div key={c.id} className="p-4 rounded-2xl bg-purple-50/40 border border-purple-200 flex items-center justify-between text-xs">
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-obsidian-900 text-yellow-300 font-bold flex items-center justify-center text-xs">
                    #{idx + 1}
                  </span>
                  <img src={c.avatar} alt={c.name} className="w-9 h-9 rounded-full object-cover border border-purple-300" />
                  <div>
                    <div className="font-bold text-obsidian-900 text-sm">{c.name}</div>
                    <div className="text-obsidian-500">{c.role} • {c.jobsCompleted} Completed Cleans</div>
                  </div>
                </div>

                <div className="text-right space-y-0.5">
                  <div className="flex items-center justify-end gap-1 font-bold text-yellow-600">
                    <Star className="w-3.5 h-3.5 fill-yellow-400" />
                    <span>{c.rating} / 5.0</span>
                  </div>
                  <div className="text-[10px] text-emerald-700 font-bold">${c.hourlyRate}/hr Payout</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Revenue Service Mix */}
        <div className="lg:col-span-5 bg-white p-6 rounded-3xl border border-purple-200 shadow-soft space-y-4 flex flex-col justify-between">
          <div>
            <h2 className="font-heading text-lg font-bold text-obsidian-900 pb-3 border-b border-purple-100">
              Revenue Breakdown by Service
            </h2>
            <div className="h-56 mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={serviceBreakdown} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={70} label>
                    {serviceBreakdown.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs">
            {serviceBreakdown.map((item) => (
              <div key={item.name} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                <span className="font-semibold text-obsidian-700">{item.name} ({item.value}%)</span>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
