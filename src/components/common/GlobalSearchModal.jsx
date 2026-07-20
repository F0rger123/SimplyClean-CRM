import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { Search, UserCheck, Calendar, FileText, UserPlus, ChevronRight } from 'lucide-react';

export const GlobalSearchModal = () => {
  const {
    isSearchOpen,
    setIsSearchOpen,
    clients,
    leads,
    jobs,
    invoices,
    setActiveTab,
    showToast
  } = useApp();

  const [query, setQuery] = useState('');

  // Keyboard shortcut listener (Cmd+K / Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
      if (e.key === 'Escape') {
        setIsSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setIsSearchOpen]);

  if (!isSearchOpen) return null;

  const matchedClients = clients.filter(c => c.name.toLowerCase().includes(query.toLowerCase()) || c.address.toLowerCase().includes(query.toLowerCase()));
  const matchedLeads = leads.filter(l => l.name.toLowerCase().includes(query.toLowerCase()));
  const matchedJobs = jobs.filter(j => j.title.toLowerCase().includes(query.toLowerCase()) || j.clientName.toLowerCase().includes(query.toLowerCase()));
  const matchedInvoices = invoices.filter(i => i.id.toLowerCase().includes(query.toLowerCase()) || i.clientName.toLowerCase().includes(query.toLowerCase()));

  const handleSelect = (tab, msg) => {
    setActiveTab(tab);
    setIsSearchOpen(false);
    showToast(msg);
  };

  return (
    <div className="fixed inset-0 z-50 bg-obsidian-950/70 backdrop-blur-sm flex items-start justify-center pt-20 p-4">
      <div className="bg-white rounded-3xl p-6 max-w-xl w-full border border-purple-300 shadow-soft-lg relative animate-in fade-in zoom-in-95 duration-150 space-y-4">
        
        {/* Search Header Input */}
        <div className="flex items-center gap-3 pb-3 border-b border-purple-100">
          <Search className="w-5 h-5 text-purple-600 shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search leads, clients, jobs, invoices..."
            className="w-full text-sm font-semibold outline-none text-obsidian-900 placeholder:text-obsidian-400 placeholder:font-normal"
          />
          <button
            onClick={() => setIsSearchOpen(false)}
            className="text-xs font-bold text-obsidian-400 px-2 py-1 bg-purple-100 rounded-lg hover:text-obsidian-700">
            ESC
          </button>
        </div>

        {/* Results List */}
        <div className="space-y-4 max-h-96 overflow-y-auto pr-1 text-xs">
          
          {/* Clients Results */}
          {matchedClients.length > 0 && (
            <div>
              <div className="font-bold text-[10px] text-obsidian-400 uppercase tracking-wider mb-2">Clients ({matchedClients.length})</div>
              <div className="space-y-1">
                {matchedClients.map(c => (
                  <div
                    key={c.id}
                    onClick={() => handleSelect('clients', `Opened Client Profile: ${c.name}`)}
                    className="p-3 bg-purple-50/50 hover:bg-purple-100/60 rounded-xl cursor-pointer flex justify-between items-center transition-colors">
                    <div className="flex items-center gap-2">
                      <UserCheck className="w-4 h-4 text-purple-600" />
                      <div>
                        <div className="font-bold text-obsidian-900">{c.name}</div>
                        <div className="text-[11px] text-obsidian-500">{c.address}</div>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-obsidian-400" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Leads Results */}
          {matchedLeads.length > 0 && (
            <div>
              <div className="font-bold text-[10px] text-obsidian-400 uppercase tracking-wider mb-2">Leads ({matchedLeads.length})</div>
              <div className="space-y-1">
                {matchedLeads.map(l => (
                  <div
                    key={l.id}
                    onClick={() => handleSelect('leads', `Opened Lead Pipeline: ${l.name}`)}
                    className="p-3 bg-purple-50/50 hover:bg-purple-100/60 rounded-xl cursor-pointer flex justify-between items-center transition-colors">
                    <div className="flex items-center gap-2">
                      <UserPlus className="w-4 h-4 text-yellow-600" />
                      <div>
                        <div className="font-bold text-obsidian-900">{l.name} (${l.estimatedPrice})</div>
                        <div className="text-[11px] text-obsidian-500">{l.cleaningType}</div>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-obsidian-400" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Jobs Results */}
          {matchedJobs.length > 0 && (
            <div>
              <div className="font-bold text-[10px] text-obsidian-400 uppercase tracking-wider mb-2">Jobs ({matchedJobs.length})</div>
              <div className="space-y-1">
                {matchedJobs.map(j => (
                  <div
                    key={j.id}
                    onClick={() => handleSelect('jobs', `Opened Job: ${j.title}`)}
                    className="p-3 bg-purple-50/50 hover:bg-purple-100/60 rounded-xl cursor-pointer flex justify-between items-center transition-colors">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-purple-600" />
                      <div>
                        <div className="font-bold text-obsidian-900">{j.title}</div>
                        <div className="text-[11px] text-obsidian-500">{j.clientName} • {j.date}</div>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-obsidian-400" />
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
