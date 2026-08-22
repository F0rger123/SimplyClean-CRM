import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  DollarSign,
  TrendingUp,
  Calendar,
  CreditCard,
  Award,
  Star,
  CheckCircle2,
  Download
} from 'lucide-react';

export const ContractorPayouts = () => {
  const { activeContractor, jobs, showToast } = useApp();

  const completedJobs = jobs.filter(j => j.status === 'completed');

  const handleRequestEarlyPayout = () => {
    showToast(`Instant Stripe Express payout of $${activeContractor?.weeklyEarnings || 840}.00 initiated to your debit card!`);
  };

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-200">
      
      {/* Payout Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        
        <div className="bg-white p-5 rounded-3xl border border-purple-200 shadow-soft">
          <span className="text-xs font-bold text-obsidian-500 uppercase">Today's Earnings</span>
          <div className="font-heading text-3xl font-bold text-obsidian-900 mt-1">
            ${activeContractor?.todayEarnings || 140}.00
          </div>
          <div className="text-xs text-emerald-600 font-bold mt-1 flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" /> 2 Jobs Completed
          </div>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-purple-200 shadow-soft">
          <span className="text-xs font-bold text-obsidian-500 uppercase">Weekly Payout Balance</span>
          <div className="font-heading text-3xl font-bold text-purple-700 mt-1">
            ${activeContractor?.weeklyEarnings || 840}.00
          </div>
          <div className="text-xs text-obsidian-500 font-medium mt-1">
            Next Direct Deposit: <span className="font-bold text-obsidian-900">Friday</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-purple-200 shadow-soft">
          <span className="text-xs font-bold text-obsidian-500 uppercase">Tips Collected</span>
          <div className="font-heading text-3xl font-bold text-yellow-600 mt-1">
            +${activeContractor?.tipsReceived || 65}.00
          </div>
          <div className="text-xs text-yellow-700 font-bold mt-1 flex items-center gap-1">
            <Star className="w-3.5 h-3.5 fill-yellow-400" /> 100% Retained by Cleaner
          </div>
        </div>

      </div>

      {/* Instant Payout Action Banner */}
      <div className="bg-obsidian-900 text-white p-6 rounded-3xl border border-purple-300/40 shadow-soft-lg flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="text-xs text-yellow-300 font-bold uppercase tracking-wider flex items-center gap-1.5">
            <CreditCard className="w-4 h-4" />
            <span>Stripe Express Instant Payouts</span>
          </div>
          <h3 className="font-heading text-lg font-bold">Transfer Available Funds Instantly</h3>
          <p className="text-xs text-obsidian-400">0% fee for weekly Friday auto-transfers or $0.50 for instant card deposit.</p>
        </div>

        <button
          onClick={handleRequestEarlyPayout}
          className="px-6 py-3.5 bg-yellow-300 hover:bg-yellow-400 text-obsidian-950 font-bold rounded-2xl shadow-soft text-xs shrink-0 transition-all">
          Cash Out ${activeContractor?.weeklyEarnings || 840}.00 Now
        </button>
      </div>

      {/* Completed Jobs Payout Ledger */}
      <div className="bg-white rounded-3xl p-6 border border-purple-200 shadow-soft space-y-4">
        <div className="flex justify-between items-center pb-3 border-b border-purple-100">
          <div>
            <h3 className="font-heading text-base font-bold text-obsidian-900">Completed Shift Ledger</h3>
            <p className="text-xs text-obsidian-500">Breakdown of hours worked, hourly payout, and client tips.</p>
          </div>
          <span className="px-3 py-1 bg-purple-100 text-purple-900 font-bold rounded-full text-xs">
            Rate: ${activeContractor?.hourlyRate || 28}/hr
          </span>
        </div>

        <div className="space-y-3 text-xs">
          {completedJobs.map(j => (
            <div key={j.id} className="p-4 rounded-2xl bg-purple-50/40 border border-purple-200 flex items-center justify-between">
              <div className="space-y-0.5">
                <div className="font-bold text-obsidian-900 text-sm">{j.title}</div>
                <div className="text-obsidian-600">{j.clientName} • {j.date}</div>
                <div className="text-[11px] text-purple-800 font-medium">Clock: {j.clockedInTime || '09:00 AM'} - {j.clockedOutTime || '11:30 AM'}</div>
              </div>

              <div className="text-right space-y-0.5">
                <div className="font-heading font-bold text-base text-emerald-700">+${(j.price * 0.45).toFixed(2)}</div>
                <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] font-extrabold rounded-full">
                  Paid to Ledger
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
