import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Calendar as CalendarIcon,
  Clock,
  MapPin,
  CheckCircle2,
  Plus,
  UserCheck,
  Camera,
  Video,
  Sparkles,
  FileCheck,
  Check,
  AlertCircle,
  Play,
  Layers,
  ChevronRight
} from 'lucide-react';

export const JobsView = () => {
  const {
    jobs,
    addJob,
    updateJobStatus,
    toggleJobChecklistItem,
    checklistTemplates,
    contractors,
    clients,
    mediaVault
  } = useApp();

  const [selectedJob, setSelectedJob] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [viewMode, setViewMode] = useState('list'); // 'list' | 'calendar'

  // New Job Form State
  const [templateId, setTemplateId] = useState(checklistTemplates[0]?.id || 'tpl-deep');
  const [title, setTitle] = useState('Deep Clean & Sanitize Standard');
  const [clientName, setClientName] = useState(clients[0]?.name || 'David & Karen Miller');
  const [address, setAddress] = useState(clients[0]?.address || '4810 Shoal Creek Blvd, Austin, TX 78756');
  const [date, setDate] = useState('2026-07-20');
  const [startTime, setStartTime] = useState('09:00 AM');
  const [endTime, setEndTime] = useState('11:30 AM');
  const [assignedCrewNames, setAssignedCrewNames] = useState(['Elena Rostova']);
  const [price, setPrice] = useState(220);
  const [notes, setNotes] = useState('');

  const handleTemplateSelect = (tId) => {
    setTemplateId(tId);
    const tpl = checklistTemplates.find(t => t.id === tId);
    if (tpl) {
      setTitle(tpl.name);
      if (tpl.serviceType === 'Deep Clean') setPrice(220);
      else if (tpl.serviceType === 'Move-In / Move-Out') setPrice(380);
      else if (tpl.serviceType === 'Commercial') setPrice(550);
      else setPrice(195);
    }
  };

  const handleAddJobSubmit = (e) => {
    e.preventDefault();
    addJob({
      templateId,
      title,
      clientName,
      address,
      date,
      startTime,
      endTime,
      assignedCrewNames,
      price: Number(price),
      notes
    });
    setIsAddModalOpen(false);
  };

  // Filter media for currently selected job
  const jobMediaList = selectedJob ? mediaVault.filter(m => m.jobId === selectedJob.id) : [];

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-3xl font-bold text-obsidian-900 tracking-tight">
            Jobs & Dispatch Operations
          </h1>
          <p className="text-obsidian-500 text-xs mt-1 font-medium">
            Schedule cleaner crews, assign standard checklists, and inspect uploaded before/after photos and video walkthroughs.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center p-1 bg-purple-100/70 rounded-2xl border border-purple-200">
            <button
              onClick={() => setViewMode('list')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                viewMode === 'list' ? 'bg-obsidian-900 text-white shadow-soft' : 'text-obsidian-700'
              }`}>
              List View
            </button>
            <button
              onClick={() => setViewMode('calendar')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                viewMode === 'calendar' ? 'bg-obsidian-900 text-white shadow-soft' : 'text-obsidian-700'
              }`}>
              Calendar Grid
            </button>
          </div>

          <button
            onClick={() => setIsAddModalOpen(true)}
            className="px-5 py-3 bg-obsidian-900 hover:bg-obsidian-800 text-white font-bold rounded-2xl shadow-soft text-xs flex items-center gap-2 border border-purple-300/40">
            <Plus className="w-4 h-4 text-yellow-300" />
            <span>Schedule Job</span>
          </button>
        </div>
      </div>

      {/* Jobs List / Calendar Grid */}
      {viewMode === 'list' ? (
        <div className="space-y-4">
          {jobs.map((job) => {
            const completedCount = job.checklist?.filter(c => c.completed).length || 0;
            const totalCount = job.checklist?.length || 0;
            const percent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;
            const mediaCount = mediaVault.filter(m => m.jobId === job.id).length;

            return (
              <div
                key={job.id}
                onClick={() => setSelectedJob(job)}
                className="bg-white p-6 rounded-3xl border border-purple-200 shadow-soft hover:shadow-soft-lg hover:border-purple-300 transition-all cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-4">
                
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <span className="font-bold text-base text-obsidian-900">{job.title}</span>
                    <span className={`px-3 py-1 text-xs font-extrabold rounded-full ${
                      job.status === 'completed' ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' :
                      job.status === 'in_progress' ? 'bg-yellow-100 text-yellow-800 border border-yellow-300 animate-pulse' :
                      'bg-purple-100 text-purple-800 border border-purple-300'
                    }`}>
                      {job.status.replace('_', ' ').toUpperCase()}
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-4 text-xs text-obsidian-600 font-medium">
                    <div className="flex items-center gap-1.5 text-purple-900 font-bold">
                      <UserCheck className="w-3.5 h-3.5 text-purple-600" />
                      <span>{job.clientName}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-yellow-600" />
                      <span>{job.date} ({job.startTime} - {job.endTime})</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-purple-500" />
                      <span>{job.address}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-xs text-obsidian-500">
                    <div>
                      Assigned Crew: <span className="font-semibold text-obsidian-800">{job.assignedCrewNames ? job.assignedCrewNames.join(', ') : 'Elena Rostova'}</span>
                    </div>
                    <span>•</span>
                    <div className="flex items-center gap-1 text-purple-800 font-semibold">
                      <Camera className="w-3.5 h-3.5" />
                      <span>{mediaCount} Photos/Videos Uploaded</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between md:flex-col md:items-end gap-3 shrink-0 pt-3 md:pt-0 border-t md:border-t-0 border-purple-100">
                  <div className="text-right">
                    <div className="font-heading font-bold text-xl text-obsidian-900">${job.price}.00</div>
                    <div className="text-[11px] text-obsidian-500 font-medium">{completedCount}/{totalCount} Checklist Tasks ({percent}%)</div>
                  </div>
                  
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedJob(job);
                    }}
                    className="px-4 py-2 bg-purple-100 hover:bg-purple-200 text-purple-900 font-bold rounded-xl text-xs flex items-center gap-1.5 transition-colors">
                    <span>Inspect Media & Tasks</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>
            );
          })}
        </div>
      ) : (
        /* Calendar Grid View */
        <div className="bg-white p-6 rounded-3xl border border-purple-200 shadow-soft space-y-4">
          <div className="grid grid-cols-7 gap-2 text-center text-xs font-bold text-obsidian-500 pb-2 border-b border-purple-100">
            <div>Mon 20</div>
            <div>Tue 21</div>
            <div>Wed 22</div>
            <div>Thu 23</div>
            <div>Fri 24</div>
            <div>Sat 25</div>
            <div>Sun 26</div>
          </div>

          <div className="grid grid-cols-7 gap-2 min-h-[320px]">
            {/* Mon 20 Column */}
            <div className="p-2 bg-purple-50/50 rounded-2xl space-y-2 border border-purple-200/60">
              {jobs.filter(j => j.date === '2026-07-20').map(j => (
                <div
                  key={j.id}
                  onClick={() => setSelectedJob(j)}
                  className="p-2.5 bg-white rounded-xl border border-purple-200 shadow-sm text-xs cursor-pointer hover:border-purple-400">
                  <div className="font-bold text-obsidian-900 truncate">{j.clientName}</div>
                  <div className="text-[10px] text-purple-700 font-semibold">{j.startTime} • ${j.price}</div>
                  <span className={`inline-block mt-1 px-2 py-0.5 text-[9px] font-bold rounded-full ${
                    j.status === 'completed' ? 'bg-emerald-100 text-emerald-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {j.status}
                  </span>
                </div>
              ))}
            </div>

            {/* Tue 21 Column */}
            <div className="p-2 bg-purple-50/30 rounded-2xl space-y-2 border border-purple-100">
              {jobs.filter(j => j.date === '2026-07-21').map(j => (
                <div
                  key={j.id}
                  onClick={() => setSelectedJob(j)}
                  className="p-2.5 bg-white rounded-xl border border-purple-200 shadow-sm text-xs cursor-pointer hover:border-purple-400">
                  <div className="font-bold text-obsidian-900 truncate">{j.clientName}</div>
                  <div className="text-[10px] text-purple-700 font-semibold">{j.startTime} • ${j.price}</div>
                </div>
              ))}
            </div>

            {[...Array(5)].map((_, i) => (
              <div key={i} className="p-2 bg-slate-50/50 rounded-2xl border border-slate-100 text-center text-xs text-slate-400 font-medium">
                No jobs scheduled
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Comprehensive Job Details Modal with Media Vault & Interactive Checklist */}
      {selectedJob && (
        <div className="fixed inset-0 z-50 bg-obsidian-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-8 max-w-2xl w-full border border-purple-300 shadow-soft-lg relative max-h-[90vh] overflow-y-auto space-y-6">
            
            <button
              onClick={() => setSelectedJob(null)}
              className="absolute top-4 right-4 text-obsidian-400 hover:text-obsidian-700 text-xl font-bold w-8 h-8 flex items-center justify-center rounded-full hover:bg-purple-100">
              ×
            </button>

            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-purple-700 mb-1">
                <span>Job #{selectedJob.id}</span>
                <span>•</span>
                <span className="capitalize">{selectedJob.status.replace('_', ' ')}</span>
              </div>
              <h2 className="font-heading text-2xl font-bold text-obsidian-900">{selectedJob.title}</h2>
              <div className="text-xs text-obsidian-600 font-medium mt-1">
                Client: <span className="font-bold text-obsidian-900">{selectedJob.clientName}</span> • {selectedJob.address}
              </div>
            </div>

            {/* Status Selector */}
            <div className="p-4 bg-purple-50 rounded-2xl border border-purple-200 space-y-2 text-xs">
              <div className="font-bold text-purple-950">Dispatch Status</div>
              <div className="grid grid-cols-3 gap-2">
                {['scheduled', 'in_progress', 'completed'].map((st) => (
                  <button
                    key={st}
                    onClick={() => {
                      updateJobStatus(selectedJob.id, st);
                      setSelectedJob(prev => ({ ...prev, status: st }));
                    }}
                    className={`py-2 rounded-xl font-bold capitalize transition-all ${
                      selectedJob.status === st
                        ? 'bg-obsidian-900 text-yellow-300 shadow-soft'
                        : 'bg-white text-obsidian-700 hover:bg-purple-100 border border-purple-200'
                    }`}>
                    {st.replace('_', ' ')}
                  </button>
                ))}
              </div>
            </div>

            {/* Room Checklist Section */}
            <div className="space-y-3">
              <div className="font-bold text-sm text-obsidian-900 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FileCheck className="w-4 h-4 text-purple-600" />
                  <span>Cleaner Quality Checklist</span>
                </div>
                <span className="text-xs text-purple-700 font-bold">
                  {selectedJob.checklist?.filter(c => c.completed).length || 0} / {selectedJob.checklist?.length || 0} Completed
                </span>
              </div>

              <div className="space-y-2 text-xs">
                {selectedJob.checklist?.map((c) => (
                  <label
                    key={c.id}
                    onClick={() => toggleJobChecklistItem(selectedJob.id, c.id)}
                    className="flex items-center justify-between p-3 bg-purple-50/40 rounded-xl border border-purple-200/80 cursor-pointer hover:bg-purple-50">
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={c.completed}
                        readOnly
                        className="w-4 h-4 rounded text-purple-600 accent-purple-600"
                      />
                      <div>
                        <span className="text-[10px] font-bold text-purple-800 uppercase block">{c.room}</span>
                        <span className={`font-medium ${c.completed ? 'line-through text-obsidian-400' : 'text-obsidian-800'}`}>
                          {c.task}
                        </span>
                      </div>
                    </div>

                    {c.requiresPhoto && (
                      <span className="px-2 py-0.5 bg-purple-100 text-purple-800 text-[10px] font-bold rounded">
                        Photo Required
                      </span>
                    )}
                  </label>
                ))}
              </div>
            </div>

            {/* Media Vault Gallery (Photos & Videos uploaded by cleaners) */}
            <div className="space-y-3 pt-2 border-t border-purple-100">
              <div className="font-bold text-sm text-obsidian-900 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Camera className="w-4 h-4 text-yellow-600" />
                  <span>Uploaded Inspection Media ({jobMediaList.length})</span>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {jobMediaList.map((m) => (
                  <div key={m.id} className="p-2 bg-purple-50 rounded-2xl border border-purple-200 text-xs space-y-1.5">
                    <div className="h-28 rounded-xl overflow-hidden bg-obsidian-950 flex items-center justify-center relative">
                      {m.type === 'video_walkthrough' ? (
                        <video src={m.url} controls className="w-full h-full object-cover" />
                      ) : (
                        <img src={m.url} alt={m.room} className="w-full h-full object-cover" />
                      )}
                      <span className={`absolute top-1.5 left-1.5 px-2 py-0.5 text-[8px] font-extrabold rounded-full ${
                        m.type === 'after_photo' ? 'bg-emerald-500 text-white' : 'bg-yellow-400 text-obsidian-950'
                      }`}>
                        {m.type.replace('_', ' ').toUpperCase()}
                      </span>
                    </div>
                    <div className="font-bold text-obsidian-900 truncate">{m.room}</div>
                    <div className="text-[10px] text-obsidian-500 truncate">{m.notes || m.timestamp}</div>
                  </div>
                ))}

                {jobMediaList.length === 0 && (
                  <div className="col-span-full py-8 text-center text-xs text-obsidian-400 font-medium italic border border-dashed border-purple-200 rounded-2xl">
                    No contractor photos uploaded for this job yet.
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>
      )}

      {/* Add Job Modal with Template Selection */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-obsidian-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-8 max-w-lg w-full border border-purple-300 shadow-soft-lg relative max-h-[90vh] overflow-y-auto">
            
            <button
              onClick={() => setIsAddModalOpen(false)}
              className="absolute top-4 right-4 text-obsidian-400 hover:text-obsidian-700 text-xl font-bold w-8 h-8 flex items-center justify-center rounded-full hover:bg-purple-100">
              ×
            </button>

            <h2 className="font-heading text-2xl font-bold text-obsidian-900 mb-1">Schedule New Cleaning Job</h2>
            <p className="text-xs text-obsidian-500 mb-5">Select master checklist protocol & assign cleaner crew.</p>

            <form onSubmit={handleAddJobSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-obsidian-700 mb-1">Checklist Standard Template *</label>
                <select
                  value={templateId}
                  onChange={(e) => handleTemplateSelect(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-purple-50/50 border border-purple-200 rounded-xl outline-none font-bold text-purple-950">
                  {checklistTemplates.map(t => (
                    <option key={t.id} value={t.id}>{t.name} ({t.serviceType})</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-bold text-obsidian-700 mb-1">Job Title</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-purple-50/50 border border-purple-200 rounded-xl outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-obsidian-700 mb-1">Client Name</label>
                  <select
                    value={clientName}
                    onChange={(e) => {
                      setClientName(e.target.value);
                      const cl = clients.find(c => c.name === e.target.value);
                      if (cl) setAddress(cl.address);
                    }}
                    className="w-full px-3.5 py-2.5 bg-purple-50/50 border border-purple-200 rounded-xl outline-none">
                    {clients.map(c => (
                      <option key={c.id} value={c.name}>{c.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-obsidian-700 mb-1">Service Price ($)</label>
                  <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-purple-50/50 border border-purple-200 rounded-xl outline-none font-bold text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-obsidian-700 mb-1">Property Address</label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-purple-50/50 border border-purple-200 rounded-xl outline-none"
                />
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block font-bold text-obsidian-700 mb-1">Date</label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full px-3 py-2 bg-purple-50/50 border border-purple-200 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-bold text-obsidian-700 mb-1">Start Time</label>
                  <input
                    type="text"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    className="w-full px-3 py-2 bg-purple-50/50 border border-purple-200 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-bold text-obsidian-700 mb-1">End Time</label>
                  <input
                    type="text"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    className="w-full px-3 py-2 bg-purple-50/50 border border-purple-200 rounded-xl"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-obsidian-700 mb-1">Assign Cleaner Crew</label>
                <select
                  value={assignedCrewNames[0]}
                  onChange={(e) => setAssignedCrewNames([e.target.value])}
                  className="w-full px-3.5 py-2.5 bg-purple-50/50 border border-purple-200 rounded-xl outline-none">
                  {contractors.map(c => (
                    <option key={c.id} value={c.name}>{c.name} ({c.role} • ${c.hourlyRate}/hr)</option>
                  ))}
                </select>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-obsidian-900 hover:bg-obsidian-800 text-white font-bold rounded-2xl shadow-soft text-sm flex items-center justify-center gap-2 border border-purple-300/40">
                <CalendarIcon className="w-4 h-4 text-yellow-300" />
                <span>Confirm & Dispatch Crew</span>
              </button>
            </form>

          </div>
        </div>
      )}

    </div>
  );
};
