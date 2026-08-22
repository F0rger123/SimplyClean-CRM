import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ContractorJobActive } from './ContractorJobActive';
import { ContractorPayouts } from './ContractorPayouts';
import { ContractorChat } from './ContractorChat';
import {
  Calendar,
  CheckCircle2,
  Clock,
  DollarSign,
  MessageSquare,
  Sparkles,
  Smartphone,
  ChevronRight,
  UserCheck,
  Star,
  MapPin,
  Play,
  ArrowLeft,
  LogOut,
  Maximize2
} from 'lucide-react';

export const ContractorPortal = () => {
  const {
    activeContractor,
    setActiveContractor,
    contractors,
    jobs,
    contractorViewTab,
    setContractorViewTab,
    contractorActiveJobId,
    setContractorActiveJobId,
    isMobileSimulated,
    setIsMobileSimulated,
    setActiveRole,
    showToast
  } = useApp();

  const [isCleanerPickerOpen, setIsCleanerPickerOpen] = useState(false);

  // Active Job object
  const activeJob = jobs.find(j => j.id === contractorActiveJobId) || jobs[0];

  // Jobs assigned to this contractor today
  const assignedJobs = jobs.filter(j => 
    (j.assignedCrew && j.assignedCrew.includes(activeContractor?.id)) ||
    (j.assignedCrewNames && j.assignedCrewNames.includes(activeContractor?.name)) ||
    true // show all for easy demo testing
  );

  const handleSelectJobToClean = (jobId) => {
    setContractorActiveJobId(jobId);
    setContractorViewTab('active_job');
    showToast(`Loaded Job #${jobId} into active cleaner workspace.`);
  };

  const content = (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      
      {/* Top Mobile App Header */}
      <div className="bg-white rounded-3xl p-5 border border-purple-200 shadow-soft flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        
        <div className="flex items-center gap-3.5">
          <img
            src={activeContractor?.avatar}
            alt={activeContractor?.name}
            className="w-12 h-12 rounded-2xl object-cover border-2 border-purple-300 shadow-sm"
          />
          <div>
            <div className="flex items-center gap-2">
              <span className="font-heading font-bold text-base text-obsidian-900">{activeContractor?.name}</span>
              <span className="px-2 py-0.5 text-[10px] font-extrabold bg-purple-100 text-purple-900 rounded-full border border-purple-300">
                {activeContractor?.role}
              </span>
            </div>
            <div className="flex items-center gap-3 text-xs text-obsidian-600 font-medium mt-0.5">
              <span className="flex items-center gap-1 text-yellow-600 font-bold">
                <Star className="w-3.5 h-3.5 fill-yellow-400" /> {activeContractor?.rating}
              </span>
              <span>•</span>
              <span className="text-purple-800 font-semibold">{activeContractor?.assignedRouteToday}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          
          {/* Switch Cleaner Persona */}
          <div className="relative">
            <button
              onClick={() => setIsCleanerPickerOpen(!isCleanerPickerOpen)}
              className="px-3 py-2 bg-purple-100 hover:bg-purple-200 text-purple-900 font-bold rounded-xl text-xs flex items-center gap-1.5 transition-colors">
              <UserCheck className="w-3.5 h-3.5" />
              <span>Switch Cleaner</span>
            </button>

            {isCleanerPickerOpen && (
              <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-2xl shadow-soft-lg border border-purple-200 p-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                <div className="px-3 py-1.5 text-[10px] font-bold text-obsidian-400 uppercase">Select Active Cleaner</div>
                {contractors.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => {
                      setActiveContractor(c);
                      setIsCleanerPickerOpen(false);
                      showToast(`Switched cleaner session to ${c.name}.`);
                    }}
                    className={`w-full text-left p-2 rounded-xl text-xs flex items-center gap-2.5 transition-colors ${
                      activeContractor?.id === c.id ? 'bg-purple-100 text-purple-900 font-bold' : 'hover:bg-purple-50 text-obsidian-700'
                    }`}>
                    <img src={c.avatar} alt={c.name} className="w-7 h-7 rounded-full object-cover" />
                    <div>
                      <div className="font-bold">{c.name}</div>
                      <div className="text-[10px] text-obsidian-500">{c.role}</div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Toggle Simulated Phone Frame */}
          <button
            onClick={() => setIsMobileSimulated(!isMobileSimulated)}
            className="px-3 py-2 bg-yellow-100 hover:bg-yellow-200 text-yellow-900 font-bold rounded-xl text-xs flex items-center gap-1.5 transition-colors">
            <Smartphone className="w-3.5 h-3.5 text-yellow-700" />
            <span className="hidden sm:inline">{isMobileSimulated ? 'Full View' : 'Phone Simulator'}</span>
          </button>

          {/* Switch back to Owner CRM */}
          <button
            onClick={() => {
              setActiveRole('owner');
              showToast('Switched back to Owner Workspace.');
            }}
            className="px-3 py-2 bg-obsidian-900 hover:bg-obsidian-800 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 transition-colors">
            <ArrowLeft className="w-3.5 h-3.5 text-yellow-300" />
            <span className="hidden sm:inline">Owner CRM</span>
          </button>

        </div>

      </div>

      {/* Navigation Tab Pills */}
      <div className="grid grid-cols-4 gap-2 bg-purple-100/70 p-1.5 rounded-2xl border border-purple-200 text-xs font-bold">
        {[
          { id: 'jobs', label: "Today's Jobs", icon: Calendar },
          { id: 'active_job', label: "Active Clean", icon: Clock },
          { id: 'payouts', label: "My Payouts", icon: DollarSign },
          { id: 'chat', label: "Dispatch Chat", icon: MessageSquare }
        ].map((tab) => {
          const IconComponent = tab.icon;
          const isActive = contractorViewTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setContractorViewTab(tab.id)}
              className={`py-3 rounded-xl flex items-center justify-center gap-2 transition-all ${
                isActive
                  ? 'bg-obsidian-900 text-yellow-300 shadow-soft font-extrabold'
                  : 'text-obsidian-700 hover:bg-white/60'
              }`}>
              <IconComponent className="w-4 h-4" />
              <span className="hidden sm:inline">{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab View Content */}
      {contractorViewTab === 'jobs' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center px-1">
            <h3 className="font-heading text-lg font-bold text-obsidian-900">
              Assigned Route Schedule ({assignedJobs.length} Jobs)
            </h3>
            <span className="text-xs font-semibold text-purple-700">Today, July 20</span>
          </div>

          <div className="space-y-3.5">
            {assignedJobs.map((j) => (
              <div
                key={j.id}
                onClick={() => handleSelectJobToClean(j.id)}
                className={`bg-white p-5 rounded-3xl border shadow-soft hover:shadow-soft-lg transition-all cursor-pointer space-y-3 ${
                  contractorActiveJobId === j.id ? 'border-purple-500 ring-2 ring-purple-300/50' : 'border-purple-200 hover:border-purple-300'
                }`}>
                
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[10px] font-extrabold text-purple-700 uppercase tracking-wider">
                      {j.startTime} - {j.endTime}
                    </span>
                    <h4 className="font-heading text-lg font-bold text-obsidian-900 mt-0.5">{j.clientName}</h4>
                  </div>

                  <span className={`px-3 py-1 rounded-full text-xs font-extrabold capitalize ${
                    j.status === 'completed' ? 'bg-emerald-100 text-emerald-900 border border-emerald-300' :
                    j.status === 'in_progress' ? 'bg-yellow-100 text-yellow-900 border border-yellow-300' :
                    'bg-purple-100 text-purple-900 border border-purple-300'
                  }`}>
                    {j.status.replace('_', ' ')}
                  </span>
                </div>

                <div className="text-xs text-obsidian-600 flex items-center gap-2 font-medium">
                  <MapPin className="w-4 h-4 text-purple-600 shrink-0" />
                  <span>{j.address}</span>
                </div>

                <div className="p-3 bg-purple-50/70 rounded-xl border border-purple-200 text-xs flex justify-between items-center">
                  <span className="font-medium text-purple-950">Service: {j.title}</span>
                  <span className="font-bold text-obsidian-900 font-heading text-sm">${j.price}</span>
                </div>

                <div className="pt-2 border-t border-purple-100 flex justify-between items-center text-xs">
                  <span className="text-obsidian-500 font-medium">
                    {j.checklist?.filter(c => c.completed).length || 0} / {j.checklist?.length || 0} Checklist Tasks Done
                  </span>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSelectJobToClean(j.id);
                    }}
                    className="px-4 py-2 bg-obsidian-900 hover:bg-obsidian-800 text-yellow-300 font-bold rounded-xl text-xs flex items-center gap-1.5 shadow-soft">
                    <span>Open Checklist & Media</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>
            ))}
          </div>
        </div>
      )}

      {contractorViewTab === 'active_job' && (
        <ContractorJobActive job={activeJob} onJobSelect={handleSelectJobToClean} />
      )}

      {contractorViewTab === 'payouts' && (
        <ContractorPayouts />
      )}

      {contractorViewTab === 'chat' && (
        <ContractorChat />
      )}

    </div>
  );

  // If Phone Simulator mode is enabled, wrap in realistic iPhone mockup bezel
  if (isMobileSimulated) {
    return (
      <div className="min-h-screen bg-obsidian-950 py-10 px-4 flex flex-col items-center justify-center">
        <div className="mb-4 flex items-center gap-4 text-white text-xs font-bold">
          <span>📱 iPhone 16 Pro Simulator Mode</span>
          <button
            onClick={() => setIsMobileSimulated(false)}
            className="px-3 py-1.5 bg-purple-900 hover:bg-purple-800 text-purple-200 rounded-xl border border-purple-400/40">
            Exit Phone Frame View
          </button>
        </div>

        <div className="w-full max-w-[420px] bg-white rounded-[50px] border-[12px] border-obsidian-800 shadow-2xl overflow-hidden relative min-h-[850px] flex flex-col">
          {/* Top Notch / Dynamic Island */}
          <div className="w-full h-8 bg-white flex items-center justify-center pt-2">
            <div className="w-28 h-5 bg-obsidian-950 rounded-full" />
          </div>

          <div className="p-4 flex-1 overflow-y-auto">
            {content}
          </div>

          {/* Bottom Home Indicator */}
          <div className="w-full h-6 bg-white flex items-center justify-center pb-2">
            <div className="w-32 h-1 bg-obsidian-300 rounded-full" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF8FC] p-4 md:p-8 font-sans selection:bg-purple-200">
      {content}
    </div>
  );
};
