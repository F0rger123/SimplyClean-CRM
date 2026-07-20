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
  Sparkles,
  FileCheck,
  Check,
  AlertCircle
} from 'lucide-react';

export const JobsView = () => {
  const { jobs, addJob, updateJobStatus, toggleJobChecklistItem, contractors, clients } = useApp();

  const [selectedJob, setSelectedJob] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [viewMode, setViewMode] = useState('list'); // 'list' | 'calendar'

  // New Job Form State
  const [title, setTitle] = useState('Standard Residential Cleaning');
  const [clientName, setClientName] = useState(clients[0]?.name || 'David & Karen Miller');
  const [address, setAddress] = useState(clients[0]?.address || '4810 Shoal Creek Blvd, Austin, TX 78756');
  const [date, setDate] = useState('2026-07-20');
  const [startTime, setStartTime] = useState('09:00 AM');
  const [endTime, setEndTime] = useState('11:30 AM');
  const [assignedCrewNames, setAssignedCrewNames] = useState(['Elena Rostova']);
  const [price, setPrice] = useState(195);
  const [notes, setNotes] = useState('');

  const handleAddJobSubmit = (e) => {
    e.preventDefault();
    addJob({
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

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-3xl font-bold text-obsidian-900 tracking-tight">
            Jobs & Dispatch Calendar
          </h1>
          <p className="text-obsidian-500 text-xs mt-1 font-medium">
            Schedule cleaner crews, track live job status, and verify completion checklists.
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
          {jobs.map((job) => (
            <div
              key={job.id}
              onClick={() => setSelectedJob(job)}
              className="bg-white p-6 rounded-3xl border border-purple-200 shadow-soft hover:shadow-soft-lg hover:border-purple-300 transition-all cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-4">
              
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <span className="font-bold text-base text-obsidian-900">{job.title}</span>
                  <span className={`px-3 py-1 text-xs font-extrabold rounded-full ${
                    job.status === 'completed' ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' :
                    job.status === 'in_progress' ? 'bg-yellow-100 text-yellow-800 border border-yellow-300' :
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

                <div className="text-[11px] text-obsidian-500">
                  Assigned Crew: <span className="font-semibold text-obsidian-800">{job.assignedCrewNames ? job.assignedCrewNames.join(', ') : 'Elena Rostova'}</span>
                </div>
              </div>

              <div className="flex items-center justify-between md:flex-col md:items-end gap-3 shrink-0 pt-3 md:pt-0 border-t md:border-t-0 border-purple-100">
                <div className="font-heading text-xl font-bold text-obsidian-900">${job.price}.00</div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-purple-700 hover:underline">
                    View Checklist & Photos →
                  </span>
                </div>
              </div>

            </div>
          ))}
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

          <div className="grid grid-cols-7 gap-2 min-h-[300px]">
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
                No jobs
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Job Details Modal with Interactive Checklist & Before/After Photo Inspection */}
      {selectedJob && (
        <div className="fixed inset-0 z-50 bg-obsidian-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-8 max-w-xl w-full border border-purple-300 shadow-soft-lg relative max-h-[90vh] overflow-y-auto space-y-6">
            
            <button
              onClick={() => setSelectedJob(null)}
              className="absolute top-4 right-4 text-obsidian-400 hover:text-obsidian-700 text-xl font-bold w-8 h-8 flex items-center justify-center rounded-full hover:bg-purple-100">
              ×
            </button>

            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-purple-700 mb-1">
                <span>Job Reference #{selectedJob.id}</span>
              </div>
              <h2 className="font-heading text-2xl font-bold text-obsidian-900">{selectedJob.title}</h2>
              <div className="text-xs text-obsidian-600 font-medium mt-1">
                Client: <span className="font-bold text-obsidian-900">{selectedJob.clientName}</span> • {selectedJob.address}
              </div>
            </div>

            {/* Status Change Buttons */}
            <div className="p-4 bg-purple-50 rounded-2xl border border-purple-200 space-y-2 text-xs">
              <div className="font-bold text-purple-950">Update Dispatch Status</div>
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

            {/* Room Completion Checklist */}
            <div className="space-y-3">
              <div className="font-bold text-sm text-obsidian-900 flex items-center gap-2">
                <FileCheck className="w-4 h-4 text-purple-600" />
                <span>Cleaner Quality Checklist</span>
              </div>
              <div className="space-y-2 text-xs">
                {selectedJob.checklist.map((c) => (
                  <label
                    key={c.id}
                    onClick={() => toggleJobChecklistItem(selectedJob.id, c.id)}
                    className="flex items-center gap-3 p-3 bg-purple-50/40 rounded-xl border border-purple-200/80 cursor-pointer hover:bg-purple-50">
                    <input
                      type="checkbox"
                      checked={c.completed}
                      readOnly
                      className="w-4 h-4 rounded text-purple-600 accent-purple-600"
                    />
                    <span className={`font-medium ${c.completed ? 'line-through text-obsidian-400' : 'text-obsidian-800'}`}>
                      {c.task}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Before / After Photo Inspection Proof */}
            <div className="space-y-3 pt-2">
              <div className="font-bold text-sm text-obsidian-900 flex items-center gap-2">
                <Camera className="w-4 h-4 text-yellow-600" />
                <span>Inspection Photo Proof</span>
              </div>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="bg-purple-50 p-3 rounded-2xl border border-purple-200 text-center space-y-2">
                  <div className="font-bold text-obsidian-600 text-[11px]">Before Cleaning</div>
                  <img
                    src={selectedJob.beforePhoto || 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=300&q=80'}
                    alt="Before"
                    className="w-full h-32 object-cover rounded-xl"
                  />
                </div>
                <div className="bg-purple-50 p-3 rounded-2xl border border-purple-200 text-center space-y-2">
                  <div className="font-bold text-emerald-700 text-[11px]">After Cleaning ✨</div>
                  <img
                    src={selectedJob.afterPhoto || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=300&q=80'}
                    alt="After"
                    className="w-full h-32 object-cover rounded-xl"
                  />
                </div>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* Add Job Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-obsidian-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-8 max-w-lg w-full border border-purple-300 shadow-soft-lg relative">
            
            <button
              onClick={() => setIsAddModalOpen(false)}
              className="absolute top-4 right-4 text-obsidian-400 hover:text-obsidian-700 text-xl font-bold w-8 h-8 flex items-center justify-center rounded-full hover:bg-purple-100">
              ×
            </button>

            <h2 className="font-heading text-2xl font-bold text-obsidian-900 mb-1">Schedule New Cleaning Job</h2>
            <p className="text-xs text-obsidian-500 mb-5">Assign crew and set service date.</p>

            <form onSubmit={handleAddJobSubmit} className="space-y-4 text-xs">
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
                    onChange={(e) => setClientName(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-purple-50/50 border border-purple-200 rounded-xl outline-none">
                    {clients.map(c => (
                      <option key={c.id} value={c.name}>{c.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-obsidian-700 mb-1">Price ($)</label>
                  <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-purple-50/50 border border-purple-200 rounded-xl outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-obsidian-700 mb-1">Service Address</label>
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
