import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import confetti from 'canvas-confetti';
import {
  Clock,
  MapPin,
  Key,
  Dog,
  CheckCircle2,
  Camera,
  Video,
  AlertTriangle,
  Upload,
  Play,
  Trash2,
  Sparkles,
  ExternalLink,
  Copy,
  ChevronRight,
  ShieldCheck,
  Check,
  Plus,
  Maximize2,
  X
} from 'lucide-react';

export const ContractorJobActive = ({ job, onJobSelect }) => {
  const {
    activeContractor,
    toggleJobChecklistItem,
    uploadJobMedia,
    deleteJobMedia,
    mediaVault,
    clockInContractor,
    clockOutContractor,
    showToast
  } = useApp();

  const fileInputRef = useRef(null);
  const videoInputRef = useRef(null);

  // Live Timer State
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  // Upload Modal / Lightbox State
  const [selectedMediaPreview, setSelectedMediaPreview] = useState(null);
  const [uploadCategory, setUploadCategory] = useState('before_photo'); // 'before_photo' | 'after_photo' | 'video_walkthrough' | 'issue_photo'
  const [uploadRoom, setUploadRoom] = useState('Kitchen & Counters');
  const [uploadNotes, setUploadNotes] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  // Issue reporting modal
  const [isIssueModalOpen, setIsIssueModalOpen] = useState(false);
  const [issueDescription, setIssueDescription] = useState('');

  // Setup Timer based on job status
  useEffect(() => {
    let interval = null;
    if (job?.status === 'in_progress') {
      setIsTimerRunning(true);
      interval = setInterval(() => {
        setElapsedSeconds(prev => prev + 1);
      }, 1000);
    } else {
      setIsTimerRunning(false);
    }
    return () => clearInterval(interval);
  }, [job?.status]);

  if (!job) {
    return (
      <div className="p-8 text-center bg-white rounded-3xl border border-purple-200 shadow-soft">
        <Clock className="w-12 h-12 text-purple-400 mx-auto mb-3" />
        <h3 className="font-heading text-lg font-bold text-obsidian-900">No Active Cleaning Job Selected</h3>
        <p className="text-xs text-obsidian-500 mt-1">Select a job from your dispatch schedule to start clock-in & checklists.</p>
      </div>
    );
  }

  // Calculate live earnings
  const hourlyRate = activeContractor?.hourlyRate || 28;
  const currentEarned = (((job.elapsedMinutes || 0) * 60 + elapsedSeconds) / 3600 * hourlyRate).toFixed(2);

  // Checklist Progress calculation
  const totalTasks = job.checklist?.length || 0;
  const completedTasks = job.checklist?.filter(c => c.completed).length || 0;
  const progressPercent = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  // Media items for this job
  const jobMediaList = mediaVault.filter(m => m.jobId === job.id);

  // Format Elapsed Time
  const formatTime = (secs) => {
    const total = (job.elapsedMinutes || 0) * 60 + secs;
    const h = Math.floor(total / 3600);
    const m = Math.floor((total % 3600) / 60);
    const s = total % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleCopyGateCode = () => {
    navigator.clipboard.writeText(job.entryCode || '');
    showToast('Entry keycode copied to clipboard!');
  };

  // Real File Upload Handler (Photo or Video)
  const handleFileSelected = (e, forcedType = null) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    setIsUploading(true);
    files.forEach((file) => {
      const isVideo = file.type.startsWith('video/');
      const mediaType = forcedType || (isVideo ? 'video_walkthrough' : uploadCategory);
      const fileUrl = URL.createObjectURL(file);

      uploadJobMedia({
        jobId: job.id,
        type: mediaType,
        room: uploadRoom,
        url: fileUrl,
        thumbnail: isVideo ? 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600&q=80' : fileUrl,
        notes: uploadNotes || (isVideo ? 'Live video walkthrough' : `${uploadRoom} photo verification`)
      });
    });

    setIsUploading(false);
    setUploadNotes('');
  };

  const handleReportIssueSubmit = (e) => {
    e.preventDefault();
    if (!issueDescription) return;

    uploadJobMedia({
      jobId: job.id,
      type: 'issue_photo',
      room: uploadRoom,
      url: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&q=80',
      notes: `ISSUE REPORTED: ${issueDescription}`
    });

    showToast('Issue flagged with photo proof and synced to dispatch.');
    setIssueDescription('');
    setIsIssueModalOpen(false);
  };

  const handleCompleteJob = () => {
    if (completedTasks < totalTasks) {
      if (!window.confirm(`You still have ${totalTasks - completedTasks} incomplete checklist tasks. Are you sure you want to clock out and complete the job?`)) {
        return;
      }
    }

    confetti({
      particleCount: 100,
      spread: 80,
      origin: { y: 0.6 }
    });

    clockOutContractor(job.id, `Job completed by ${activeContractor.name}. All verified before/after media synced.`);
  };

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-200">
      
      {/* 1. Job Header Card */}
      <div className="bg-white rounded-3xl p-6 border border-purple-200 shadow-soft space-y-4">
        
        <div className="flex justify-between items-start">
          <div>
            <span className="px-3 py-1 bg-purple-100 text-purple-900 font-extrabold text-[11px] rounded-full border border-purple-300">
              JOB #{job.id} • {job.title}
            </span>
            <h2 className="font-heading text-2xl font-bold text-obsidian-900 mt-2">{job.clientName}</h2>
          </div>

          <span className={`px-3 py-1 rounded-full text-xs font-extrabold capitalize ${
            job.status === 'completed' ? 'bg-emerald-100 text-emerald-900 border border-emerald-300' :
            job.status === 'in_progress' ? 'bg-yellow-100 text-yellow-900 border border-yellow-300 animate-pulse' :
            'bg-purple-100 text-purple-900 border border-purple-300'
          }`}>
            {job.status.replace('_', ' ')}
          </span>
        </div>

        {/* Address & Navigation Link */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 border-t border-purple-100 text-xs">
          <div className="flex items-center gap-2 text-obsidian-700 font-medium">
            <MapPin className="w-4 h-4 text-purple-600 shrink-0" />
            <span>{job.address}</span>
          </div>

          <a
            href={`https://maps.google.com/?q=${encodeURIComponent(job.address)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3.5 py-2 bg-yellow-100 hover:bg-yellow-200 text-yellow-900 font-bold rounded-xl flex items-center gap-1.5 w-fit transition-colors">
            <span>Open in Google Maps</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Access Keycode & Pet Warning Banner */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
          
          <div className="p-3.5 bg-purple-50 rounded-2xl border border-purple-200 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-purple-200 text-purple-900 flex items-center justify-center font-bold">
                <Key className="w-4 h-4" />
              </div>
              <div className="text-xs">
                <div className="font-bold text-obsidian-900">Access Keycode</div>
                <div className="text-purple-800 font-semibold">{job.entryCode || 'Keypad #7721'}</div>
              </div>
            </div>
            <button
              onClick={handleCopyGateCode}
              title="Copy Code"
              className="p-2 bg-white hover:bg-purple-100 rounded-xl text-purple-700 transition-colors border border-purple-200">
              <Copy className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="p-3.5 bg-yellow-50 rounded-2xl border border-yellow-200 flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-yellow-200 text-yellow-900 flex items-center justify-center font-bold">
              <Dog className="w-4 h-4" />
            </div>
            <div className="text-xs">
              <div className="font-bold text-obsidian-900">Pet & Safety Instructions</div>
              <div className="text-yellow-900 font-medium">{job.pets || 'No pets on property'}</div>
            </div>
          </div>

        </div>

      </div>

      {/* 2. Clock In / Live Timer Action Bar */}
      <div className="bg-obsidian-900 text-white rounded-3xl p-6 border border-purple-300/40 shadow-soft-lg flex flex-col md:flex-row md:items-center justify-between gap-4">
        
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-purple-800/80 text-yellow-300 flex items-center justify-center font-bold">
            <Clock className="w-7 h-7" />
          </div>
          <div>
            <div className="text-xs text-purple-300 font-bold uppercase tracking-wider">Live Time Clock & Shift Tracker</div>
            <div className="font-heading text-3xl font-bold font-mono text-white mt-0.5">
              {formatTime(elapsedSeconds)}
            </div>
            <div className="text-xs text-obsidian-400 mt-0.5">
              Pay Rate: <span className="text-yellow-300 font-bold">${hourlyRate}/hr</span> • Estimated Earned: <span className="text-emerald-400 font-bold">${currentEarned}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {job.status === 'scheduled' && (
            <button
              onClick={() => clockInContractor(job.id)}
              className="w-full md:w-auto px-7 py-3.5 bg-yellow-300 hover:bg-yellow-400 text-obsidian-950 font-bold rounded-2xl shadow-soft flex items-center justify-center gap-2 text-sm transition-all">
              <Play className="w-4 h-4 fill-obsidian-950" />
              <span>Clock In & Start Clean</span>
            </button>
          )}

          {job.status === 'in_progress' && (
            <>
              <button
                onClick={() => setIsIssueModalOpen(true)}
                className="px-4 py-3.5 bg-rose-900/60 hover:bg-rose-900 text-rose-200 font-bold rounded-2xl border border-rose-500/40 text-xs flex items-center gap-1.5 transition-all">
                <AlertTriangle className="w-4 h-4 text-rose-400" />
                <span>Flag Damage</span>
              </button>

              <button
                onClick={handleCompleteJob}
                className="px-6 py-3.5 bg-emerald-500 hover:bg-emerald-400 text-obsidian-950 font-bold rounded-2xl shadow-soft flex items-center gap-2 text-sm transition-all">
                <CheckCircle2 className="w-5 h-5" />
                <span>Complete & Clock Out</span>
              </button>
            </>
          )}

          {job.status === 'completed' && (
            <div className="px-5 py-2.5 bg-emerald-950/80 border border-emerald-500/60 rounded-2xl text-xs font-bold text-emerald-300 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Shift Completed & Invoice Generated</span>
            </div>
          )}
        </div>

      </div>

      {/* 3. Interactive Room-by-Room Quality Checklist */}
      <div className="bg-white rounded-3xl p-6 md:p-8 border border-purple-200 shadow-soft space-y-6">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-purple-100">
          <div>
            <h3 className="font-heading text-xl font-bold text-obsidian-900 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-purple-600" />
              <span>Cleaning Quality Checklist</span>
            </h3>
            <p className="text-xs text-obsidian-500 mt-0.5">
              Tap tasks as you complete them. Mandatory items require verification.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right">
              <div className="text-xs font-bold text-purple-900">{completedTasks} of {totalTasks} Done ({progressPercent}%)</div>
            </div>
            <div className="w-24 h-3 bg-purple-100 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-purple-600 to-yellow-400 transition-all duration-300" style={{ width: `${progressPercent}%` }} />
            </div>
          </div>
        </div>

        {/* Checklist Items */}
        <div className="space-y-3">
          {job.checklist?.map((item) => (
            <div
              key={item.id}
              onClick={() => toggleJobChecklistItem(job.id, item.id)}
              className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-start justify-between gap-3 ${
                item.completed
                  ? 'bg-purple-50/70 border-purple-300 text-obsidian-500'
                  : 'bg-white border-purple-200 hover:border-purple-300 text-obsidian-900'
              }`}>
              
              <div className="flex items-start gap-3.5">
                <div className={`w-6 h-6 rounded-xl flex items-center justify-center font-bold shrink-0 mt-0.5 transition-colors ${
                  item.completed ? 'bg-purple-600 text-white' : 'border-2 border-purple-300 bg-purple-50'
                }`}>
                  {item.completed && <Check className="w-4 h-4" />}
                </div>

                <div>
                  <span className={`text-xs font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-md ${
                    item.completed ? 'bg-purple-200 text-purple-900' : 'bg-yellow-100 text-yellow-900'
                  }`}>
                    {item.room || 'Room'}
                  </span>
                  <div className={`text-sm font-semibold mt-1.5 ${item.completed ? 'line-through text-obsidian-400' : 'text-obsidian-900'}`}>
                    {item.task}
                  </div>
                </div>
              </div>

              {/* Photo & Video Requirement Tags */}
              <div className="flex items-center gap-1.5 shrink-0">
                {item.requiresPhoto && (
                  <span className="px-2.5 py-1 bg-purple-100 text-purple-800 rounded-lg text-[10px] font-bold flex items-center gap-1">
                    <Camera className="w-3 h-3" /> Photo Req.
                  </span>
                )}
                {item.requiresVideo && (
                  <span className="px-2.5 py-1 bg-yellow-100 text-yellow-900 rounded-lg text-[10px] font-bold flex items-center gap-1">
                    <Video className="w-3 h-3" /> Video Req.
                  </span>
                )}
              </div>

            </div>
          ))}
        </div>

      </div>

      {/* 4. Real Photo & Video Upload Suite */}
      <div className="bg-white rounded-3xl p-6 md:p-8 border border-purple-200 shadow-soft space-y-6">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-purple-100">
          <div>
            <h3 className="font-heading text-xl font-bold text-obsidian-900 flex items-center gap-2">
              <Camera className="w-5 h-5 text-yellow-600" />
              <span>Inspection Photo & Video Proof Vault</span>
            </h3>
            <p className="text-xs text-obsidian-500 mt-0.5">
              Upload before/after photos and walkthrough videos directly from phone camera or gallery.
            </p>
          </div>

          {/* Hidden File Inputs */}
          <input
            type="file"
            ref={fileInputRef}
            onChange={(e) => handleFileSelected(e, uploadCategory)}
            accept="image/*"
            multiple
            className="hidden"
          />
          <input
            type="file"
            ref={videoInputRef}
            onChange={(e) => handleFileSelected(e, 'video_walkthrough')}
            accept="video/*"
            className="hidden"
          />

          <div className="flex items-center gap-2">
            <button
              onClick={() => fileInputRef.current?.click()}
              className="px-4 py-2.5 bg-obsidian-900 hover:bg-obsidian-800 text-white font-bold rounded-2xl text-xs flex items-center gap-2 shadow-soft border border-purple-300/40">
              <Camera className="w-4 h-4 text-yellow-300" />
              <span>Upload Photos</span>
            </button>
            <button
              onClick={() => videoInputRef.current?.click()}
              className="px-4 py-2.5 bg-yellow-100 hover:bg-yellow-200 text-yellow-950 font-bold rounded-2xl text-xs flex items-center gap-2 border border-yellow-300">
              <Video className="w-4 h-4 text-yellow-700" />
              <span>Upload Video</span>
            </button>
          </div>
        </div>

        {/* Upload Controls & Category Selector */}
        <div className="p-4 bg-purple-50/60 rounded-2xl border border-purple-200 grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
          <div>
            <label className="block font-bold text-obsidian-700 mb-1">Upload Category</label>
            <select
              value={uploadCategory}
              onChange={(e) => setUploadCategory(e.target.value)}
              className="w-full px-3 py-2 bg-white border border-purple-200 rounded-xl outline-none font-semibold text-obsidian-900">
              <option value="before_photo">Before Cleaning Photo</option>
              <option value="after_photo">After Cleaning Photo ✨</option>
              <option value="video_walkthrough">Video Walkthrough 360°</option>
              <option value="issue_photo">Pre-existing Damage / Issue</option>
            </select>
          </div>

          <div>
            <label className="block font-bold text-obsidian-700 mb-1">Room / Location Tag</label>
            <select
              value={uploadRoom}
              onChange={(e) => setUploadRoom(e.target.value)}
              className="w-full px-3 py-2 bg-white border border-purple-200 rounded-xl outline-none font-semibold text-obsidian-900">
              <option value="Kitchen & Counters">Kitchen & Counters</option>
              <option value="Master Bathroom">Master Bathroom</option>
              <option value="Guest Bathroom">Guest Bathroom</option>
              <option value="Living Room & Baseboards">Living Room & Baseboards</option>
              <option value="Bedrooms">Bedrooms</option>
              <option value="Oven & Appliances">Oven & Appliances</option>
              <option value="Full Property 360°">Full Property 360°</option>
            </select>
          </div>

          <div>
            <label className="block font-bold text-obsidian-700 mb-1">Cleaner Note / Caption</label>
            <input
              type="text"
              value={uploadNotes}
              onChange={(e) => setUploadNotes(e.target.value)}
              placeholder="e.g. Degreased stove, wiped baseboards..."
              className="w-full px-3 py-2 bg-white border border-purple-200 rounded-xl outline-none text-obsidian-900"
            />
          </div>
        </div>

        {/* Media Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {jobMediaList.map((item) => {
            const isVideo = item.type === 'video_walkthrough';
            return (
              <div
                key={item.id}
                onClick={() => setSelectedMediaPreview(item)}
                className="group relative bg-purple-50 rounded-2xl overflow-hidden border border-purple-200 shadow-soft cursor-pointer hover:shadow-soft-lg hover:border-purple-400 transition-all">
                
                <div className="h-36 w-full relative bg-obsidian-950 flex items-center justify-center overflow-hidden">
                  {isVideo ? (
                    <>
                      <video src={item.url} className="w-full h-full object-cover opacity-80" />
                      <div className="absolute inset-0 flex items-center justify-center bg-obsidian-950/40">
                        <div className="w-10 h-10 rounded-full bg-yellow-300 text-obsidian-950 flex items-center justify-center shadow-lg">
                          <Play className="w-5 h-5 fill-obsidian-950 ml-0.5" />
                        </div>
                      </div>
                    </>
                  ) : (
                    <img src={item.url} alt={item.room} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  )}

                  {/* Badge */}
                  <span className={`absolute top-2 left-2 px-2 py-0.5 text-[9px] font-extrabold rounded-full ${
                    item.type === 'after_photo' ? 'bg-emerald-500 text-white' :
                    item.type === 'video_walkthrough' ? 'bg-purple-600 text-white' :
                    item.type === 'issue_photo' ? 'bg-rose-500 text-white' :
                    'bg-yellow-400 text-obsidian-950'
                  }`}>
                    {item.type.replace('_', ' ').toUpperCase()}
                  </span>
                </div>

                <div className="p-3 bg-white space-y-1">
                  <div className="font-bold text-xs text-obsidian-900 truncate">{item.room}</div>
                  <div className="text-[10px] text-obsidian-500 truncate">{item.notes || item.timestamp}</div>
                </div>

              </div>
            );
          })}

          {jobMediaList.length === 0 && (
            <div className="col-span-full py-12 text-center text-xs text-obsidian-400 font-medium italic border-2 border-dashed border-purple-200 rounded-2xl">
              No photos or videos uploaded for this job yet. Tap "Upload Photos" above to add proof.
            </div>
          )}
        </div>

      </div>

      {/* 5. Lightbox / Video Player Modal */}
      {selectedMediaPreview && (
        <div className="fixed inset-0 z-50 bg-obsidian-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-3xl w-full border border-purple-300 shadow-soft-lg relative space-y-4 max-h-[90vh] overflow-y-auto">
            
            <button
              onClick={() => setSelectedMediaPreview(null)}
              className="absolute top-4 right-4 text-obsidian-400 hover:text-obsidian-700 text-xl font-bold w-8 h-8 flex items-center justify-center rounded-full hover:bg-purple-100">
              ×
            </button>

            <div>
              <span className="px-3 py-1 bg-purple-100 text-purple-900 font-extrabold text-[11px] rounded-full">
                {selectedMediaPreview.type.replace('_', ' ').toUpperCase()} • {selectedMediaPreview.room}
              </span>
              <h3 className="font-heading text-xl font-bold text-obsidian-900 mt-2">
                Uploaded by {selectedMediaPreview.contractorName} at {selectedMediaPreview.timestamp}
              </h3>
            </div>

            <div className="rounded-2xl overflow-hidden bg-obsidian-950 flex items-center justify-center max-h-[480px]">
              {selectedMediaPreview.type === 'video_walkthrough' ? (
                <video src={selectedMediaPreview.url} controls autoPlay className="w-full max-h-[460px] rounded-2xl" />
              ) : (
                <img src={selectedMediaPreview.url} alt={selectedMediaPreview.room} className="w-full max-h-[460px] object-contain rounded-2xl" />
              )}
            </div>

            <div className="p-4 bg-purple-50 rounded-2xl border border-purple-200 text-xs flex justify-between items-center">
              <div>
                <span className="font-bold text-obsidian-900">Cleaner Notes:</span>
                <p className="text-obsidian-600 mt-0.5">{selectedMediaPreview.notes || 'Photo verified by cleaner.'}</p>
              </div>

              <button
                onClick={() => {
                  deleteJobMedia(selectedMediaPreview.id);
                  setSelectedMediaPreview(null);
                }}
                className="px-3 py-1.5 bg-rose-100 hover:bg-rose-200 text-rose-800 font-bold rounded-xl text-xs flex items-center gap-1 transition-colors">
                <Trash2 className="w-3.5 h-3.5" /> Delete
              </button>
            </div>

          </div>
        </div>
      )}

      {/* 6. Issue / Damage Flagger Modal */}
      {isIssueModalOpen && (
        <div className="fixed inset-0 z-50 bg-obsidian-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full border border-purple-300 shadow-soft-lg relative">
            
            <button
              onClick={() => setIsIssueModalOpen(false)}
              className="absolute top-4 right-4 text-obsidian-400 hover:text-obsidian-700 text-xl font-bold w-8 h-8 flex items-center justify-center rounded-full hover:bg-purple-100">
              ×
            </button>

            <div className="flex items-center gap-2.5 mb-2">
              <div className="w-9 h-9 bg-rose-100 rounded-xl flex items-center justify-center font-bold text-rose-700">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <h2 className="font-heading text-xl font-bold text-obsidian-900">Flag Pre-Existing Damage / Issue</h2>
            </div>
            <p className="text-xs text-obsidian-500 mb-5">Document scratches, broken items, or extreme grime to protect your crew.</p>

            <form onSubmit={handleReportIssueSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-obsidian-700 mb-1">Room / Item Location</label>
                <input
                  type="text"
                  required
                  value={uploadRoom}
                  onChange={(e) => setUploadRoom(e.target.value)}
                  placeholder="e.g. Master Bedroom Hardwood Floor"
                  className="w-full px-3.5 py-2.5 bg-purple-50/50 border border-purple-200 rounded-xl outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-obsidian-700 mb-1">Damage Description</label>
                <textarea
                  required
                  rows="3"
                  value={issueDescription}
                  onChange={(e) => setIssueDescription(e.target.value)}
                  placeholder="Describe exact condition (e.g. deep gouge on floor next to closet prior to cleaning)..."
                  className="w-full px-3.5 py-2.5 bg-purple-50/50 border border-purple-200 rounded-xl outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-2xl shadow-soft text-sm flex items-center justify-center gap-2">
                <ShieldCheck className="w-4 h-4" />
                <span>Save Issue to CRM Vault</span>
              </button>
            </form>

          </div>
        </div>
      )}

    </div>
  );
};
