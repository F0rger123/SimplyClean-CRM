import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  ShieldCheck,
  CheckSquare,
  Sliders,
  Users,
  Plus,
  Trash2,
  Edit2,
  Sparkles,
  Camera,
  Video,
  Star,
  Check,
  Save,
  Clock,
  Layers,
  AlertCircle
} from 'lucide-react';

export const StandardsPermissionsView = () => {
  const {
    checklistTemplates,
    addChecklistTemplate,
    updateChecklistTemplate,
    deleteChecklistTemplate,
    standards,
    setStandards,
    permissions,
    setPermissions,
    showToast
  } = useApp();

  const [activeTab, setActiveTab] = useState('templates'); // 'templates' | 'standards' | 'permissions'

  // New Template Modal State
  const [isAddTemplateModalOpen, setIsAddTemplateModalOpen] = useState(false);
  const [newTplName, setNewTplName] = useState('');
  const [newTplServiceType, setNewTplServiceType] = useState('Deep Clean');
  const [newTplHours, setNewTplHours] = useState(3.0);
  const [newTplPhotos, setNewTplPhotos] = useState(4);
  const [newTplVideo, setNewTplVideo] = useState(true);

  // Editing Template State
  const [selectedTemplate, setSelectedTemplate] = useState(checklistTemplates[0] || null);
  const [newRoomName, setNewRoomName] = useState('');
  const [newTaskText, setNewTaskText] = useState('');
  const [newTaskRequiresPhoto, setNewTaskRequiresPhoto] = useState(true);

  // Standards Edit Form
  const [editStandards, setEditStandards] = useState(standards);

  // Permissions Edit Form
  const [editPermissions, setEditPermissions] = useState(permissions);

  const handleSaveStandards = (e) => {
    e.preventDefault();
    setStandards(editStandards);
    showToast('Quality Standards & SOP rules updated successfully!');
  };

  const handleTogglePermission = (role, permissionKey) => {
    setEditPermissions(prev => {
      const updated = {
        ...prev,
        [role]: {
          ...prev[role],
          [permissionKey]: !prev[role][permissionKey]
        }
      };
      setPermissions(updated);
      showToast(`Updated ${role} permission: ${permissionKey}`);
      return updated;
    });
  };

  const handleCreateTemplate = (e) => {
    e.preventDefault();
    if (!newTplName) return;

    addChecklistTemplate({
      name: newTplName,
      serviceType: newTplServiceType,
      estimatedHours: Number(newTplHours),
      mandatoryPhotosCount: Number(newTplPhotos),
      requireVideoWalkthrough: newTplVideo,
      rooms: [
        {
          roomName: 'General Areas',
          tasks: [
            { id: `t1-${Date.now()}`, task: 'Dust all surfaces & vacuum floor', mandatory: true, requiresPhoto: false },
            { id: `t2-${Date.now()}`, task: 'Sanitize high-touch surfaces & empty trash', mandatory: true, requiresPhoto: true }
          ]
        }
      ]
    });

    setNewTplName('');
    setIsAddTemplateModalOpen(false);
  };

  const handleAddTaskToRoom = (roomIndex) => {
    if (!newTaskText || !selectedTemplate) return;

    const updatedRooms = [...selectedTemplate.rooms];
    updatedRooms[roomIndex].tasks.push({
      id: `task-${Date.now()}`,
      task: newTaskText,
      mandatory: true,
      requiresPhoto: newTaskRequiresPhoto
    });

    updateChecklistTemplate(selectedTemplate.id, { rooms: updatedRooms });
    setNewTaskText('');
    showToast('Checklist task added to template.');
  };

  const handleAddRoom = () => {
    if (!newRoomName || !selectedTemplate) return;

    const updatedRooms = [
      ...selectedTemplate.rooms,
      {
        roomName: newRoomName,
        tasks: [{ id: `task-${Date.now()}`, task: 'Initial room disinfection', mandatory: true, requiresPhoto: false }]
      }
    ];

    updateChecklistTemplate(selectedTemplate.id, { rooms: updatedRooms });
    setNewRoomName('');
    showToast(`Room "${newRoomName}" added to template.`);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-purple-700 bg-purple-100/80 px-3 py-1 rounded-full w-fit border border-purple-300/60 mb-2">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Owner Control Center • Quality Standards & RBAC</span>
          </div>
          <h1 className="font-heading text-3xl font-bold text-obsidian-900 tracking-tight">
            Standards, Checklists & Permissions
          </h1>
          <p className="text-obsidian-500 text-xs mt-1 font-medium">
            Define mandatory job checklists, quality standards, photo requirements, and role permissions.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {activeTab === 'templates' && (
            <button
              onClick={() => setIsAddTemplateModalOpen(true)}
              className="px-5 py-3 bg-obsidian-900 hover:bg-obsidian-800 text-white font-bold rounded-2xl shadow-soft text-xs flex items-center gap-2 border border-purple-300/40">
              <Plus className="w-4 h-4 text-yellow-300" />
              <span>Create Checklist Standard</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-purple-200 pb-3">
        {[
          { id: 'templates', label: 'Job Checklist Standards', icon: CheckSquare },
          { id: 'standards', label: 'Quality & SOP Rules', icon: Sliders },
          { id: 'permissions', label: 'Role Permissions Matrix', icon: Users }
        ].map((tab) => {
          const IconComponent = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-5 py-3 rounded-2xl text-xs font-bold flex items-center gap-2.5 transition-all ${
                isActive
                  ? 'bg-obsidian-900 text-white shadow-soft border border-purple-300/40'
                  : 'bg-white text-obsidian-700 hover:bg-purple-50 border border-purple-200'
              }`}>
              <IconComponent className={`w-4 h-4 ${isActive ? 'text-yellow-300' : 'text-purple-600'}`} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab 1: Checklist Templates Builder */}
      {activeTab === 'templates' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Templates Left List */}
          <div className="lg:col-span-4 space-y-3">
            <div className="text-xs font-bold text-obsidian-500 uppercase tracking-wider px-1">
              Active Master Templates ({checklistTemplates.length})
            </div>

            <div className="space-y-2.5">
              {checklistTemplates.map((tpl) => (
                <div
                  key={tpl.id}
                  onClick={() => setSelectedTemplate(tpl)}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all space-y-2 ${
                    selectedTemplate?.id === tpl.id
                      ? 'bg-obsidian-900 text-white border-purple-400 shadow-soft'
                      : 'bg-white text-obsidian-900 border-purple-200 hover:border-purple-300'
                  }`}>
                  
                  <div className="flex justify-between items-start">
                    <h4 className="font-bold text-sm leading-tight">{tpl.name}</h4>
                    <span className={`px-2 py-0.5 text-[9px] font-extrabold rounded-full ${
                      selectedTemplate?.id === tpl.id ? 'bg-yellow-300 text-obsidian-950' : 'bg-purple-100 text-purple-800'
                    }`}>
                      {tpl.serviceType}
                    </span>
                  </div>

                  <div className={`flex items-center gap-3 text-xs font-medium ${
                    selectedTemplate?.id === tpl.id ? 'text-purple-200' : 'text-obsidian-500'
                  }`}>
                    <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> ~{tpl.estimatedHours}h</span>
                    <span>•</span>
                    <span className="flex items-center gap-1"><Camera className="w-3.5 h-3.5" /> {tpl.mandatoryPhotosCount} Photos</span>
                    {tpl.requireVideoWalkthrough && (
                      <>
                        <span>•</span>
                        <span className="flex items-center gap-1 text-yellow-300 font-bold"><Video className="w-3.5 h-3.5" /> Video</span>
                      </>
                    )}
                  </div>

                </div>
              ))}
            </div>
          </div>

          {/* Template Details & Room Task Editor */}
          <div className="lg:col-span-8 bg-white p-6 md:p-8 rounded-3xl border border-purple-200 shadow-soft space-y-6">
            {selectedTemplate ? (
              <>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-purple-100">
                  <div>
                    <span className="px-3 py-1 bg-purple-100 text-purple-900 font-extrabold text-[11px] rounded-full">
                      {selectedTemplate.serviceType} PROTOCOL
                    </span>
                    <h3 className="font-heading text-2xl font-bold text-obsidian-900 mt-2">{selectedTemplate.name}</h3>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1.5 bg-yellow-100 text-yellow-900 font-bold rounded-xl text-xs flex items-center gap-1 border border-yellow-300">
                      <Camera className="w-3.5 h-3.5" /> Requires {selectedTemplate.mandatoryPhotosCount} Photos
                    </span>
                    {selectedTemplate.requireVideoWalkthrough && (
                      <span className="px-3 py-1.5 bg-purple-100 text-purple-900 font-bold rounded-xl text-xs flex items-center gap-1 border border-purple-300">
                        <Video className="w-3.5 h-3.5" /> 360° Video
                      </span>
                    )}
                  </div>
                </div>

                {/* Rooms and Tasks */}
                <div className="space-y-6">
                  {selectedTemplate.rooms?.map((room, rIdx) => (
                    <div key={rIdx} className="bg-purple-50/50 p-5 rounded-2xl border border-purple-200/80 space-y-3">
                      <div className="flex justify-between items-center pb-2 border-b border-purple-200">
                        <h4 className="font-bold text-sm text-purple-950 flex items-center gap-2">
                          <Layers className="w-4 h-4 text-purple-700" />
                          <span>{room.roomName} ({room.tasks.length} Mandatory Checks)</span>
                        </h4>
                      </div>

                      <div className="space-y-2">
                        {room.tasks.map((task) => (
                          <div key={task.id} className="p-3 bg-white rounded-xl border border-purple-200 shadow-sm flex items-center justify-between text-xs">
                            <div className="flex items-center gap-2.5">
                              <div className="w-5 h-5 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
                                <Check className="w-3.5 h-3.5" />
                              </div>
                              <span className="font-medium text-obsidian-900">{task.task}</span>
                            </div>

                            <div className="flex items-center gap-2">
                              {task.requiresPhoto && (
                                <span className="px-2 py-0.5 bg-purple-100 text-purple-800 text-[10px] font-bold rounded-md flex items-center gap-1">
                                  <Camera className="w-3 h-3" /> Photo Proof
                                </span>
                              )}
                              {task.requiresVideo && (
                                <span className="px-2 py-0.5 bg-yellow-100 text-yellow-900 text-[10px] font-bold rounded-md flex items-center gap-1">
                                  <Video className="w-3 h-3" /> Video Proof
                                </span>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Add Task to this Room */}
                      <div className="pt-2 flex items-center gap-2">
                        <input
                          type="text"
                          placeholder={`Add new task to ${room.roomName}...`}
                          value={newTaskText}
                          onChange={(e) => setNewTaskText(e.target.value)}
                          className="flex-1 px-3.5 py-2 bg-white border border-purple-200 rounded-xl text-xs outline-none focus:border-purple-600"
                        />
                        <label className="flex items-center gap-1 text-[11px] font-semibold text-obsidian-700 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={newTaskRequiresPhoto}
                            onChange={(e) => setNewTaskRequiresPhoto(e.target.checked)}
                            className="accent-purple-600"
                          />
                          <span>Req. Photo</span>
                        </label>
                        <button
                          onClick={() => handleAddTaskToRoom(rIdx)}
                          className="px-4 py-2 bg-obsidian-900 hover:bg-obsidian-800 text-yellow-300 font-bold rounded-xl text-xs flex items-center gap-1">
                          <Plus className="w-3.5 h-3.5" /> Add Task
                        </button>
                      </div>
                    </div>
                  ))}

                  {/* Add New Room Section */}
                  <div className="p-4 bg-white rounded-2xl border border-dashed border-purple-300 flex items-center gap-3">
                    <input
                      type="text"
                      placeholder="New Room / Area Name (e.g. Patio & Balcony, Garage)..."
                      value={newRoomName}
                      onChange={(e) => setNewRoomName(e.target.value)}
                      className="flex-1 px-3.5 py-2 bg-purple-50/50 border border-purple-200 rounded-xl text-xs outline-none"
                    />
                    <button
                      onClick={handleAddRoom}
                      className="px-5 py-2 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 shadow-sm">
                      <Plus className="w-3.5 h-3.5" /> Add Room Category
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="text-center py-20 text-obsidian-400 text-xs">Select a template to view and edit</div>
            )}
          </div>

        </div>
      )}

      {/* Tab 2: Quality & SOP Standards */}
      {activeTab === 'standards' && (
        <form onSubmit={handleSaveStandards} className="bg-white p-6 md:p-8 rounded-3xl border border-purple-200 shadow-soft space-y-6">
          <div className="pb-4 border-b border-purple-100">
            <h3 className="font-heading text-xl font-bold text-obsidian-900">Cleaning Quality & SOP Standard Thresholds</h3>
            <p className="text-xs text-obsidian-500 mt-0.5">Rules enforced automatically across contractor mobile apps and dispatch.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
            
            <div className="p-5 bg-purple-50/50 rounded-2xl border border-purple-200 space-y-4">
              <div className="font-bold text-sm text-purple-950 flex items-center gap-2">
                <Star className="w-4 h-4 text-yellow-500 fill-yellow-400" />
                <span>Performance & Rating Benchmarks</span>
              </div>

              <div>
                <label className="block font-bold text-obsidian-700 mb-1">Minimum Cleaner Rating Threshold (out of 5.0)</label>
                <input
                  type="number"
                  step="0.05"
                  value={editStandards.minimumCleanerRating}
                  onChange={(e) => setEditStandards(prev => ({ ...prev, minimumCleanerRating: Number(e.target.value) }))}
                  className="w-full px-3.5 py-2.5 bg-white border border-purple-200 rounded-xl font-bold text-sm"
                />
                <span className="text-[10px] text-obsidian-500 mt-1 block">Cleaners below this score trigger a quality audit review.</span>
              </div>

              <div>
                <label className="block font-bold text-obsidian-700 mb-1">Late Arrival Alert Threshold (Minutes)</label>
                <input
                  type="number"
                  value={editStandards.lateArrivalThresholdMinutes}
                  onChange={(e) => setEditStandards(prev => ({ ...prev, lateArrivalThresholdMinutes: Number(e.target.value) }))}
                  className="w-full px-3.5 py-2.5 bg-white border border-purple-200 rounded-xl font-bold text-sm"
                />
              </div>
            </div>

            <div className="p-5 bg-yellow-50/50 rounded-2xl border border-yellow-200 space-y-4">
              <div className="font-bold text-sm text-yellow-950 flex items-center gap-2">
                <Camera className="w-4 h-4 text-yellow-700" />
                <span>Photo & Video Validation Protocol</span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-obsidian-700 mb-1">Mandatory Before Photos</label>
                  <input
                    type="number"
                    value={editStandards.mandatoryBeforePhotos}
                    onChange={(e) => setEditStandards(prev => ({ ...prev, mandatoryBeforePhotos: Number(e.target.value) }))}
                    className="w-full px-3.5 py-2.5 bg-white border border-yellow-200 rounded-xl font-bold text-sm"
                  />
                </div>
                <div>
                  <label className="block font-bold text-obsidian-700 mb-1">Mandatory After Photos</label>
                  <input
                    type="number"
                    value={editStandards.mandatoryAfterPhotos}
                    onChange={(e) => setEditStandards(prev => ({ ...prev, mandatoryAfterPhotos: Number(e.target.value) }))}
                    className="w-full px-3.5 py-2.5 bg-white border border-yellow-200 rounded-xl font-bold text-sm"
                  />
                </div>
              </div>

              <div className="space-y-2 pt-2">
                <label className="flex items-center gap-2 font-bold text-obsidian-800 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editStandards.requireVideoOnDeepCleans}
                    onChange={(e) => setEditStandards(prev => ({ ...prev, requireVideoOnDeepCleans: e.target.checked }))}
                    className="w-4 h-4 accent-purple-600 rounded"
                  />
                  <span>Enforce mandatory 360° video walkthrough on all Move-Out & Deep Cleans</span>
                </label>

                <label className="flex items-center gap-2 font-bold text-obsidian-800 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editStandards.autoInvoiceOnJobComplete}
                    onChange={(e) => setEditStandards(prev => ({ ...prev, autoInvoiceOnJobComplete: e.target.checked }))}
                    className="w-4 h-4 accent-purple-600 rounded"
                  />
                  <span>Auto-generate Stripe invoice as soon as cleaner completes checklist</span>
                </label>
              </div>
            </div>

          </div>

          <div className="pt-4 border-t border-purple-100 flex justify-end">
            <button
              type="submit"
              className="px-6 py-3.5 bg-obsidian-900 hover:bg-obsidian-800 text-yellow-300 font-bold rounded-2xl shadow-soft text-xs flex items-center gap-2 border border-purple-300/40">
              <Save className="w-4 h-4" />
              <span>Save & Apply SOP Standards</span>
            </button>
          </div>
        </form>
      )}

      {/* Tab 3: Role Permissions Matrix */}
      {activeTab === 'permissions' && (
        <div className="bg-white p-6 md:p-8 rounded-3xl border border-purple-200 shadow-soft space-y-6">
          <div className="pb-4 border-b border-purple-100 flex justify-between items-center">
            <div>
              <h3 className="font-heading text-xl font-bold text-obsidian-900">Role-Based Access Control (RBAC) Matrix</h3>
              <p className="text-xs text-obsidian-500 mt-0.5">Toggle granular platform access for Owners, Managers, Cleaners, and Clients.</p>
            </div>
            <span className="px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-full">Active Security Policy</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-purple-50/70 border-b border-purple-200 text-obsidian-700 uppercase font-extrabold text-[11px]">
                <tr>
                  <th className="px-6 py-4">Platform Capability / Action</th>
                  <th className="px-6 py-4 text-center">Owner (Admin)</th>
                  <th className="px-6 py-4 text-center">Office Manager</th>
                  <th className="px-6 py-4 text-center">Cleaner / Contractor</th>
                  <th className="px-6 py-4 text-center">Client Portal</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-purple-100 text-obsidian-800 font-medium">
                {[
                  { key: 'canManagePricing', label: 'Modify Pricing & Service Rates' },
                  { key: 'canEditStandards', label: 'Edit Job Checklists & SOP Standards' },
                  { key: 'canAssignContractors', label: 'Assign & Dispatch Cleaner Crews' },
                  { key: 'canViewGateCodes', label: 'View Keycodes & Entry Instructions' },
                  { key: 'canApprovePayouts', label: 'Approve & Release Contractor Payouts' },
                  { key: 'canViewFinancialReports', label: 'Access Financial Reports & Gross Margins' },
                  { key: 'canDeleteRecords', label: 'Permanently Delete Leads / Jobs / Clients' }
                ].map((row) => (
                  <tr key={row.key} className="hover:bg-purple-50/30 transition-colors">
                    <td className="px-6 py-4 font-bold text-obsidian-900">{row.label}</td>
                    
                    {/* Owner Toggle */}
                    <td className="px-6 py-4 text-center">
                      <input
                        type="checkbox"
                        checked={editPermissions.owner?.[row.key] ?? true}
                        onChange={() => handleTogglePermission('owner', row.key)}
                        className="w-4 h-4 accent-purple-600 rounded cursor-pointer"
                      />
                    </td>

                    {/* Manager Toggle */}
                    <td className="px-6 py-4 text-center">
                      <input
                        type="checkbox"
                        checked={editPermissions.manager?.[row.key] ?? false}
                        onChange={() => handleTogglePermission('manager', row.key)}
                        className="w-4 h-4 accent-purple-600 rounded cursor-pointer"
                      />
                    </td>

                    {/* Contractor Toggle */}
                    <td className="px-6 py-4 text-center">
                      <input
                        type="checkbox"
                        checked={editPermissions.contractor?.[row.key] ?? false}
                        onChange={() => handleTogglePermission('contractor', row.key)}
                        className="w-4 h-4 accent-purple-600 rounded cursor-pointer"
                      />
                    </td>

                    {/* Client Toggle */}
                    <td className="px-6 py-4 text-center">
                      <input
                        type="checkbox"
                        checked={editPermissions.client?.[row.key] ?? false}
                        onChange={() => handleTogglePermission('client', row.key)}
                        className="w-4 h-4 accent-purple-600 rounded cursor-pointer"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Add New Master Template Modal */}
      {isAddTemplateModalOpen && (
        <div className="fixed inset-0 z-50 bg-obsidian-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-8 max-w-lg w-full border border-purple-300 shadow-soft-lg relative">
            <button
              onClick={() => setIsAddTemplateModalOpen(false)}
              className="absolute top-4 right-4 text-obsidian-400 hover:text-obsidian-700 text-xl font-bold w-8 h-8 flex items-center justify-center rounded-full hover:bg-purple-100">
              ×
            </button>

            <h2 className="font-heading text-2xl font-bold text-obsidian-900 mb-1">Create Job Checklist Standard</h2>
            <p className="text-xs text-obsidian-500 mb-5">Define master cleaning protocol for recurring service types.</p>

            <form onSubmit={handleCreateTemplate} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-obsidian-700 mb-1">Template Name *</label>
                <input
                  type="text"
                  required
                  value={newTplName}
                  onChange={(e) => setNewTplName(e.target.value)}
                  placeholder="e.g. Airbnb Turnover 90-Min Standard"
                  className="w-full px-3.5 py-2.5 bg-purple-50/50 border border-purple-200 rounded-xl outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-obsidian-700 mb-1">Service Type</label>
                  <select
                    value={newTplServiceType}
                    onChange={(e) => setNewTplServiceType(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-purple-50/50 border border-purple-200 rounded-xl outline-none">
                    <option value="Standard Clean">Standard Clean</option>
                    <option value="Deep Clean">Deep Clean</option>
                    <option value="Move-In / Move-Out">Move-In / Move-Out</option>
                    <option value="Commercial">Commercial</option>
                    <option value="Airbnb Turnover">Airbnb Turnover</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-obsidian-700 mb-1">Estimated Hours</label>
                  <input
                    type="number"
                    step="0.5"
                    value={newTplHours}
                    onChange={(e) => setNewTplHours(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-purple-50/50 border border-purple-200 rounded-xl outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-obsidian-700 mb-1">Mandatory Photo Count</label>
                  <input
                    type="number"
                    value={newTplPhotos}
                    onChange={(e) => setNewTplPhotos(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-purple-50/50 border border-purple-200 rounded-xl outline-none"
                  />
                </div>
                <div className="flex items-center pt-5">
                  <label className="flex items-center gap-2 font-bold text-obsidian-800 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={newTplVideo}
                      onChange={(e) => setNewTplVideo(e.target.checked)}
                      className="accent-purple-600"
                    />
                    <span>Require 360° Video</span>
                  </label>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-obsidian-900 hover:bg-obsidian-800 text-white font-bold rounded-2xl shadow-soft text-sm flex items-center justify-center gap-2 border border-purple-300/40">
                <CheckSquare className="w-4 h-4 text-yellow-300" />
                <span>Save Master Checklist Template</span>
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
