import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  UserPlus,
  DollarSign,
  Send,
  UserCheck,
  Plus,
  Sparkles,
  Phone,
  Mail,
  MapPin,
  FileText,
  CheckCircle2,
  ChevronRight
} from 'lucide-react';

export const LeadsView = () => {
  const { leads, addLead, updateLeadStage, convertLeadToClient, sendTwilioSMS } = useApp();

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedLead, setSelectedLead] = useState(null);

  // Form State for New Lead & Estimator
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [sqft, setSqft] = useState(2000);
  const [bedrooms, setBedrooms] = useState(3);
  const [bathrooms, setBathrooms] = useState(2);
  const [cleaningType, setCleaningType] = useState('Standard Clean');
  const [notes, setNotes] = useState('');

  // Estimate calculation formula
  const calculateEstimate = () => {
    let base = sqft * 0.08;
    if (cleaningType === 'Deep Clean') base += 60;
    if (cleaningType === 'Move-In / Move-Out') base += 90;
    if (cleaningType === 'Commercial') base = sqft * 0.11;
    base += bedrooms * 10 + bathrooms * 15;
    return Math.round(base);
  };

  const currentEstimate = calculateEstimate();

  const handleSubmitLead = (e) => {
    e.preventDefault();
    if (!name || !email) return;

    addLead({
      name,
      email,
      phone,
      address,
      sqft: Number(sqft),
      bedrooms: Number(bedrooms),
      bathrooms: Number(bathrooms),
      cleaningType,
      estimatedPrice: currentEstimate,
      notes
    });

    // Reset form
    setName('');
    setEmail('');
    setPhone('');
    setAddress('');
    setNotes('');
    setIsAddModalOpen(false);
  };

  const stages = [
    { key: 'new', label: 'New Inquiry', color: 'bg-purple-100 text-purple-900 border-purple-300' },
    { key: 'contacted', label: 'Contacted', color: 'bg-yellow-100 text-yellow-900 border-yellow-300' },
    { key: 'quote_sent', label: 'Quote Sent', color: 'bg-purple-200 text-purple-950 border-purple-400' },
    { key: 'scheduled', label: 'Scheduled', color: 'bg-blue-100 text-blue-900 border-blue-300' },
    { key: 'won', label: 'Won & Booked', color: 'bg-emerald-100 text-emerald-900 border-emerald-300' }
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-3xl font-bold text-obsidian-900 tracking-tight">
            Leads & Instant Quote Pipeline
          </h1>
          <p className="text-obsidian-500 text-xs mt-1 font-medium">
            Manage inquiries, calculate cleaning estimates, and send SMS quote links.
          </p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="px-5 py-3 bg-obsidian-900 hover:bg-obsidian-800 text-white font-bold rounded-2xl shadow-soft text-xs flex items-center gap-2 border border-purple-300/40">
          <Plus className="w-4 h-4 text-yellow-300" />
          <span>Add Lead & Calculate Quote</span>
        </button>
      </div>

      {/* Kanban Board Columns */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 overflow-x-auto pb-4">
        {stages.map((stage) => {
          const stageLeads = leads.filter(l => l.stage === stage.key);
          const stageTotal = stageLeads.reduce((acc, curr) => acc + (curr.estimatedPrice || 0), 0);

          return (
            <div key={stage.key} className="bg-purple-50/50 p-4 rounded-3xl border border-purple-200/80 min-w-[240px] space-y-3">
              
              {/* Column Header */}
              <div className="flex items-center justify-between pb-2 border-b border-purple-200">
                <span className={`px-3 py-1 text-xs font-bold rounded-full border ${stage.color}`}>
                  {stage.label} ({stageLeads.length})
                </span>
                <span className="text-[11px] font-bold text-obsidian-600">${stageTotal}</span>
              </div>

              {/* Lead Cards */}
              <div className="space-y-3">
                {stageLeads.map((lead) => (
                  <div
                    key={lead.id}
                    onClick={() => setSelectedLead(lead)}
                    className="bg-white p-4 rounded-2xl border border-purple-200 shadow-soft hover:shadow-soft-lg hover:border-purple-300 transition-all cursor-pointer space-y-2.5">
                    
                    <div className="flex justify-between items-start">
                      <div className="font-bold text-sm text-obsidian-900">{lead.name}</div>
                      <span className="font-heading font-bold text-sm text-purple-700">${lead.estimatedPrice}</span>
                    </div>

                    <div className="text-xs text-obsidian-600 space-y-1">
                      <div className="flex items-center gap-1.5 text-[11px]">
                        <FileText className="w-3.5 h-3.5 text-purple-500 shrink-0" />
                        <span className="font-medium">{lead.cleaningType} ({lead.sqft} sqft)</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-[11px] text-obsidian-400">
                        <MapPin className="w-3.5 h-3.5 shrink-0" />
                        <span className="truncate">{lead.address}</span>
                      </div>
                    </div>

                    {/* Stage Transition Controls */}
                    <div className="pt-2 border-t border-purple-100 flex items-center justify-between text-[11px]">
                      {stage.key !== 'won' ? (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            const nextStageIndex = stages.findIndex(s => s.key === stage.key) + 1;
                            updateLeadStage(lead.id, stages[nextStageIndex].key);
                          }}
                          className="font-bold text-purple-700 hover:text-purple-900 flex items-center gap-0.5">
                          <span>Move Next</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      ) : (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            convertLeadToClient(lead);
                          }}
                          className="px-2.5 py-1 bg-emerald-100 text-emerald-900 font-bold rounded-lg text-[10px] flex items-center gap-1">
                          <UserCheck className="w-3 h-3" />
                          <span>Convert Client</span>
                        </button>
                      )}

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          sendTwilioSMS(lead.name, `Hi ${lead.name}, your SimplyClean quote for $${lead.estimatedPrice} is ready! Review & confirm here: simplyclean.app/q/${lead.id}`);
                        }}
                        className="text-obsidian-400 hover:text-purple-700 font-semibold flex items-center gap-1">
                        <Send className="w-3 h-3 text-yellow-600" />
                        <span>SMS Quote</span>
                      </button>
                    </div>

                  </div>
                ))}

                {stageLeads.length === 0 && (
                  <div className="p-4 text-center text-xs text-obsidian-400 font-medium italic border border-dashed border-purple-200 rounded-2xl">
                    No leads in stage
                  </div>
                )}
              </div>

            </div>
          );
        })}
      </div>

      {/* Add Lead Modal with Live Calculator */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-obsidian-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-8 max-w-xl w-full border border-purple-300 shadow-soft-lg relative max-h-[90vh] overflow-y-auto">
            
            <button
              onClick={() => setIsAddModalOpen(false)}
              className="absolute top-4 right-4 text-obsidian-400 hover:text-obsidian-700 text-xl font-bold w-8 h-8 flex items-center justify-center rounded-full hover:bg-purple-100">
              ×
            </button>

            <div className="flex items-center gap-2.5 mb-2">
              <div className="w-9 h-9 bg-purple-100 rounded-xl flex items-center justify-center font-bold text-purple-700">
                <Sparkles className="w-5 h-5" />
              </div>
              <h2 className="font-heading text-2xl font-bold text-obsidian-900">Add Lead & Calculate Quote</h2>
            </div>
            <p className="text-xs text-obsidian-500 mb-6">Calculates instant cleaning quote based on home specifications.</p>

            <form onSubmit={handleSubmitLead} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-obsidian-700 mb-1">Lead Full Name *</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Amanda Taylor"
                    className="w-full px-3.5 py-2.5 bg-purple-50/50 border border-purple-200 rounded-xl outline-none focus:border-purple-600"
                  />
                </div>
                <div>
                  <label className="block font-bold text-obsidian-700 mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="amanda@example.com"
                    className="w-full px-3.5 py-2.5 bg-purple-50/50 border border-purple-200 rounded-xl outline-none focus:border-purple-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-obsidian-700 mb-1">Phone Number</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="(512) 555-0199"
                    className="w-full px-3.5 py-2.5 bg-purple-50/50 border border-purple-200 rounded-xl outline-none focus:border-purple-600"
                  />
                </div>
                <div>
                  <label className="block font-bold text-obsidian-700 mb-1">Cleaning Service Type</label>
                  <select
                    value={cleaningType}
                    onChange={(e) => setCleaningType(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-purple-50/50 border border-purple-200 rounded-xl outline-none focus:border-purple-600">
                    <option value="Standard Clean">Standard Clean</option>
                    <option value="Deep Clean">Deep Clean</option>
                    <option value="Move-In / Move-Out">Move-In / Move-Out</option>
                    <option value="Commercial">Commercial Office</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-obsidian-700 mb-1">Property Address</label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Street, City, Zip"
                  className="w-full px-3.5 py-2.5 bg-purple-50/50 border border-purple-200 rounded-xl outline-none focus:border-purple-600"
                />
              </div>

              {/* Specs & Live Estimator Card */}
              <div className="p-4 bg-purple-100/60 rounded-2xl border border-purple-300/60 space-y-3">
                <div className="font-bold text-purple-900 flex justify-between items-center text-sm">
                  <span>⚡ Instant Quote Estimator</span>
                  <span className="font-heading text-lg font-bold text-obsidian-900">${currentEstimate}.00</span>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <label className="block font-semibold text-obsidian-700 mb-1">Square Feet</label>
                    <input
                      type="number"
                      step="100"
                      value={sqft}
                      onChange={(e) => setSqft(e.target.value)}
                      className="w-full px-3 py-1.5 bg-white border border-purple-200 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-obsidian-700 mb-1">Bedrooms</label>
                    <input
                      type="number"
                      value={bedrooms}
                      onChange={(e) => setBedrooms(e.target.value)}
                      className="w-full px-3 py-1.5 bg-white border border-purple-200 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-obsidian-700 mb-1">Bathrooms</label>
                    <input
                      type="number"
                      value={bathrooms}
                      onChange={(e) => setBathrooms(e.target.value)}
                      className="w-full px-3 py-1.5 bg-white border border-purple-200 rounded-lg"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block font-bold text-obsidian-700 mb-1">Notes / Pets / Instructions</label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows="2"
                  placeholder="Gate code, dog details, preferred cleaning day..."
                  className="w-full px-3.5 py-2.5 bg-purple-50/50 border border-purple-200 rounded-xl outline-none focus:border-purple-600"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-obsidian-900 hover:bg-obsidian-800 text-white font-bold rounded-2xl shadow-soft text-sm flex items-center justify-center gap-2 border border-purple-300/40">
                <CheckCircle2 className="w-4 h-4 text-yellow-300" />
                <span>Save Lead & Generate Quote Link</span>
              </button>
            </form>

          </div>
        </div>
      )}

    </div>
  );
};
