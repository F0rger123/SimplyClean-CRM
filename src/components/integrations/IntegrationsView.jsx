import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Zap,
  CreditCard,
  FileText,
  MessageSquare,
  MapPin,
  CheckCircle2,
  RefreshCw,
  Send,
  Sparkles,
  ShieldCheck,
  Check,
  Play
} from 'lucide-react';

export const IntegrationsView = () => {
  const { integrations, setIntegrations, syncQuickBooks, sendTwilioSMS, showToast } = useApp();

  const [activeModal, setActiveModal] = useState(null); // 'stripe' | 'twilio' | 'maps' | 'quickbooks'
  const [testAmount, setTestAmount] = useState(195);
  const [smsPhone, setSmsPhone] = useState('(512) 555-0192');
  const [smsText, setSmsText] = useState('Hi Emily! SimplyClean crew (Elena) is en route to 742 Evergreen Terrace. Arrival estimated in 15 mins.');
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncLogs, setSyncLogs] = useState([]);

  const handleTestStripeCharge = (e) => {
    e.preventDefault();
    showToast(`Stripe Live Charge of $${testAmount}.00 processed successfully! Payment receipt logged.`);
    setActiveModal(null);
  };

  const handleTestSMS = (e) => {
    e.preventDefault();
    sendTwilioSMS(smsPhone, smsText);
    setActiveModal(null);
  };

  const handleRunFullSync = () => {
    setIsSyncing(true);
    setSyncLogs(['Initiating QuickBooks OAuth2 token validation...']);
    
    setTimeout(() => {
      setSyncLogs(prev => [...prev, 'Fetched 14 active clients from SimplyClean database.']);
    }, 600);

    setTimeout(() => {
      setSyncLogs(prev => [...prev, 'Pushed 3 new paid invoices into QuickBooks Chart of Accounts.']);
    }, 1200);

    setTimeout(() => {
      setSyncLogs(prev => [...prev, '✓ Sync completed with 0 errors!']);
      setIsSyncing(false);
      syncQuickBooks();
    }, 1800);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-3xl font-bold text-obsidian-900 tracking-tight">
            Settings & 3rd-Party Integrations Hub
          </h1>
          <p className="text-obsidian-500 text-xs mt-1 font-medium">
            Manage live API keys, active webhook triggers, Stripe payment gateways, and QuickBooks sync.
          </p>
        </div>

        <button
          onClick={handleRunFullSync}
          disabled={isSyncing}
          className="px-5 py-3 bg-obsidian-900 hover:bg-obsidian-800 text-white font-bold rounded-2xl shadow-soft text-xs flex items-center gap-2 border border-purple-300/40">
          <RefreshCw className={`w-4 h-4 text-yellow-300 ${isSyncing ? 'animate-spin' : ''}`} />
          <span>{isSyncing ? 'Syncing All Integrations...' : 'Run Global 1-Click Sync'}</span>
        </button>
      </div>

      {/* Sync Log Box if actively syncing */}
      {syncLogs.length > 0 && (
        <div className="p-4 bg-obsidian-900 text-purple-200 rounded-2xl border border-purple-400/30 text-xs font-mono space-y-1 shadow-inner">
          <div className="text-yellow-300 font-bold flex items-center gap-2">
            <Zap className="w-4 h-4" />
            <span>Live Integration Sync Terminal Output:</span>
          </div>
          {syncLogs.map((log, idx) => (
            <div key={idx} className="text-obsidian-300">{log}</div>
          ))}
        </div>
      )}

      {/* Integrations Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Stripe Card */}
        <div className="bg-white p-6 rounded-3xl border border-purple-200 shadow-soft hover:shadow-soft-lg transition-all space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-purple-100 text-purple-800 flex items-center justify-center font-bold">
                  <CreditCard className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-base text-obsidian-900">Stripe Payment Gateway</h3>
                  <div className="text-xs text-obsidian-500">{integrations.stripe.accountName}</div>
                </div>
              </div>
              <span className="px-3 py-1 bg-emerald-100 text-emerald-800 font-bold rounded-full text-[10px] flex items-center gap-1 border border-emerald-300">
                <CheckCircle2 className="w-3 h-3" /> Live & Connected
              </span>
            </div>

            <div className="p-3.5 bg-purple-50/60 rounded-2xl border border-purple-200/80 text-xs space-y-1.5 font-medium text-obsidian-700">
              <div className="flex justify-between"><span>Publishable Key:</span><span className="font-mono text-obsidian-900">pk_live_51M9x...48190248</span></div>
              <div className="flex justify-between"><span>Total Processed:</span><span className="font-bold text-emerald-700 font-heading">{integrations.stripe.totalProcessed}</span></div>
              <div className="flex justify-between"><span>Auto Card Payouts:</span><span className="text-purple-700 font-bold">Enabled</span></div>
            </div>
          </div>

          <div className="pt-3 border-t border-purple-100 flex items-center justify-between text-xs">
            <button
              onClick={() => setActiveModal('stripe')}
              className="px-4 py-2 bg-obsidian-900 hover:bg-obsidian-800 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 shadow-soft border border-purple-300/40">
              <CreditCard className="w-3.5 h-3.5 text-yellow-300" />
              <span>Test Stripe Live Charge</span>
            </button>
            <span className="text-obsidian-400 text-[11px]">PCI-DSS Level 1 Secure</span>
          </div>
        </div>

        {/* QuickBooks Card */}
        <div className="bg-white p-6 rounded-3xl border border-purple-200 shadow-soft hover:shadow-soft-lg transition-all space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-yellow-100 text-yellow-900 flex items-center justify-center font-bold">
                  <FileText className="w-6 h-6 text-yellow-700" />
                </div>
                <div>
                  <h3 className="font-bold text-base text-obsidian-900">QuickBooks Online</h3>
                  <div className="text-xs text-obsidian-500">Realm ID: {integrations.quickbooks.realmId}</div>
                </div>
              </div>
              <span className="px-3 py-1 bg-emerald-100 text-emerald-800 font-bold rounded-full text-[10px] flex items-center gap-1 border border-emerald-300">
                <CheckCircle2 className="w-3 h-3" /> Live & Connected
              </span>
            </div>

            <div className="p-3.5 bg-yellow-50/60 rounded-2xl border border-yellow-200/80 text-xs space-y-1.5 font-medium text-obsidian-700">
              <div className="flex justify-between"><span>Last Sync Timestamp:</span><span className="font-bold text-obsidian-900">{integrations.quickbooks.lastSync}</span></div>
              <div className="flex justify-between"><span>Sync Invoices & Tax:</span><span className="text-purple-700 font-bold">Auto Enabled</span></div>
              <div className="flex justify-between"><span>Sync Client Contacts:</span><span className="text-purple-700 font-bold">Auto Enabled</span></div>
            </div>
          </div>

          <div className="pt-3 border-t border-purple-100 flex items-center justify-between text-xs">
            <button
              onClick={handleRunFullSync}
              className="px-4 py-2 bg-yellow-300 hover:bg-yellow-400 text-obsidian-950 font-bold rounded-xl text-xs flex items-center gap-1.5 shadow-soft">
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Trigger 1-Click Sync</span>
            </button>
            <span className="text-obsidian-400 text-[11px]">Intuit OAuth2 Verified</span>
          </div>
        </div>

        {/* Twilio SMS Card */}
        <div className="bg-white p-6 rounded-3xl border border-purple-200 shadow-soft hover:shadow-soft-lg transition-all space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-purple-100 text-purple-800 flex items-center justify-center font-bold">
                  <MessageSquare className="w-6 h-6 text-purple-700" />
                </div>
                <div>
                  <h3 className="font-bold text-base text-obsidian-900">Twilio SMS Notifications</h3>
                  <div className="text-xs text-obsidian-500">Number: {integrations.twilio.phoneNumber}</div>
                </div>
              </div>
              <span className="px-3 py-1 bg-emerald-100 text-emerald-800 font-bold rounded-full text-[10px] flex items-center gap-1 border border-emerald-300">
                <CheckCircle2 className="w-3 h-3" /> Live & Connected
              </span>
            </div>

            <div className="p-3.5 bg-purple-50/60 rounded-2xl border border-purple-200/80 text-xs space-y-1.5 font-medium text-obsidian-700">
              <div className="flex justify-between"><span>24h / 1h Appointment Reminders:</span><span className="text-purple-700 font-bold">Active</span></div>
              <div className="flex justify-between"><span>Cleaner En-Route Alerts:</span><span className="text-purple-700 font-bold">Active</span></div>
              <div className="flex justify-between"><span>Google Review Requests:</span><span className="text-purple-700 font-bold">Active</span></div>
            </div>
          </div>

          <div className="pt-3 border-t border-purple-100 flex items-center justify-between text-xs">
            <button
              onClick={() => setActiveModal('twilio')}
              className="px-4 py-2 bg-obsidian-900 hover:bg-obsidian-800 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 shadow-soft border border-purple-300/40">
              <Send className="w-3.5 h-3.5 text-yellow-300" />
              <span>Compose & Test SMS</span>
            </button>
            <span className="text-obsidian-400 text-[11px]">Twilio Programmable SMS</span>
          </div>
        </div>

        {/* Google Maps Route Optimizer Card */}
        <div className="bg-white p-6 rounded-3xl border border-purple-200 shadow-soft hover:shadow-soft-lg transition-all space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-yellow-100 text-yellow-900 flex items-center justify-center font-bold">
                  <MapPin className="w-6 h-6 text-yellow-700" />
                </div>
                <div>
                  <h3 className="font-bold text-base text-obsidian-900">Google Maps Route Optimizer</h3>
                  <div className="text-xs text-obsidian-500">Live Traffic Matrix Enabled</div>
                </div>
              </div>
              <span className="px-3 py-1 bg-emerald-100 text-emerald-800 font-bold rounded-full text-[10px] flex items-center gap-1 border border-emerald-300">
                <CheckCircle2 className="w-3 h-3" /> Live & Connected
              </span>
            </div>

            <div className="p-3.5 bg-yellow-50/60 rounded-2xl border border-yellow-200/80 text-xs space-y-1.5 font-medium text-obsidian-700">
              <div className="flex justify-between"><span>Neighborhood Route Clustering:</span><span className="text-purple-700 font-bold">Active</span></div>
              <div className="flex justify-between"><span>Live Cleaner GPS Tracking:</span><span className="text-purple-700 font-bold">Active</span></div>
              <div className="flex justify-between"><span>Drive Time Savings:</span><span className="font-bold text-emerald-700">~22% Saved</span></div>
            </div>
          </div>

          <div className="pt-3 border-t border-purple-100 flex items-center justify-between text-xs">
            <button
              onClick={() => showToast('Google Maps Route Optimization matrix updated for today!')}
              className="px-4 py-2 bg-yellow-300 hover:bg-yellow-400 text-obsidian-950 font-bold rounded-xl text-xs flex items-center gap-1.5 shadow-soft">
              <MapPin className="w-3.5 h-3.5" />
              <span>Optimize Route Matrix</span>
            </button>
            <span className="text-obsidian-400 text-[11px]">Google Maps Platform API</span>
          </div>
        </div>

      </div>

      {/* Stripe Test Modal */}
      {activeModal === 'stripe' && (
        <div className="fixed inset-0 z-50 bg-obsidian-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full border border-purple-300 shadow-soft-lg relative">
            <button
              onClick={() => setActiveModal(null)}
              className="absolute top-4 right-4 text-obsidian-400 hover:text-obsidian-700 text-xl font-bold w-8 h-8 flex items-center justify-center rounded-full hover:bg-purple-100">
              ×
            </button>

            <div className="flex items-center gap-2.5 mb-2">
              <div className="w-9 h-9 bg-purple-100 rounded-xl flex items-center justify-center font-bold text-purple-700">
                <CreditCard className="w-5 h-5" />
              </div>
              <h2 className="font-heading text-xl font-bold text-obsidian-900">Test Stripe Payment Gateway</h2>
            </div>
            <p className="text-xs text-obsidian-500 mb-5">Simulate live credit card charge via SimplyClean Stripe Gateway.</p>

            <form onSubmit={handleTestStripeCharge} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-obsidian-700 mb-1">Charge Amount ($)</label>
                <input
                  type="number"
                  value={testAmount}
                  onChange={(e) => setTestAmount(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-purple-50/50 border border-purple-200 rounded-xl outline-none font-bold text-sm"
                />
              </div>

              <div>
                <label className="block font-bold text-obsidian-700 mb-1">Card Number (Simulated)</label>
                <input
                  type="text"
                  readOnly
                  value="4242 •••• •••• 4242 (Stripe Test Card)"
                  className="w-full px-3.5 py-2.5 bg-purple-100/60 border border-purple-200 rounded-xl font-mono text-obsidian-800"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold text-obsidian-700 mb-1">Expiry</label>
                  <input type="text" readOnly value="12/28" className="w-full px-3 py-2 bg-purple-50/50 border border-purple-200 rounded-xl" />
                </div>
                <div>
                  <label className="block font-bold text-obsidian-700 mb-1">CVC</label>
                  <input type="text" readOnly value="314" className="w-full px-3 py-2 bg-purple-50/50 border border-purple-200 rounded-xl" />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-obsidian-900 hover:bg-obsidian-800 text-white font-bold rounded-2xl shadow-soft text-sm flex items-center justify-center gap-2 border border-purple-300/40">
                <CheckCircle2 className="w-4 h-4 text-yellow-300" />
                <span>Process Charge of ${testAmount}.00</span>
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Twilio SMS Test Modal */}
      {activeModal === 'twilio' && (
        <div className="fixed inset-0 z-50 bg-obsidian-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full border border-purple-300 shadow-soft-lg relative">
            <button
              onClick={() => setActiveModal(null)}
              className="absolute top-4 right-4 text-obsidian-400 hover:text-obsidian-700 text-xl font-bold w-8 h-8 flex items-center justify-center rounded-full hover:bg-purple-100">
              ×
            </button>

            <div className="flex items-center gap-2.5 mb-2">
              <div className="w-9 h-9 bg-purple-100 rounded-xl flex items-center justify-center font-bold text-purple-700">
                <Send className="w-5 h-5" />
              </div>
              <h2 className="font-heading text-xl font-bold text-obsidian-900">Test Twilio SMS Dispatch</h2>
            </div>
            <p className="text-xs text-obsidian-500 mb-5">Send live test SMS to client via Twilio API.</p>

            <form onSubmit={handleTestSMS} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-obsidian-700 mb-1">Recipient Phone Number</label>
                <input
                  type="text"
                  value={smsPhone}
                  onChange={(e) => setSmsPhone(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-purple-50/50 border border-purple-200 rounded-xl outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-obsidian-700 mb-1">Message Content</label>
                <textarea
                  value={smsText}
                  onChange={(e) => setSmsText(e.target.value)}
                  rows="3"
                  className="w-full px-3.5 py-2.5 bg-purple-50/50 border border-purple-200 rounded-xl outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-obsidian-900 hover:bg-obsidian-800 text-white font-bold rounded-2xl shadow-soft text-sm flex items-center justify-center gap-2 border border-purple-300/40">
                <Send className="w-4 h-4 text-yellow-300" />
                <span>Dispatch Test SMS</span>
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
