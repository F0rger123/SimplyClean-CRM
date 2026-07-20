import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Sparkles,
  Search,
  Plus,
  Bell,
  Bot,
  UserCheck,
  LogOut,
  ChevronDown,
  ShieldAlert,
  Check,
  Calendar,
  UserPlus,
  FileText,
  CreditCard
} from 'lucide-react';

export const Navbar = () => {
  const {
    setIsLoggedIn,
    activeRole,
    setActiveRole,
    setIsSearchOpen,
    setIsAIOpen,
    setActiveModal,
    showToast
  } = useApp();

  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isRoleMenuOpen, setIsRoleMenuOpen] = useState(false);
  const [isQuickActionsOpen, setIsQuickActionsOpen] = useState(false);

  const notifications = [
    { id: 1, title: 'Job Completed', desc: 'Elena marked 4810 Shoal Creek Blvd as completed.', time: '10m ago', unread: true },
    { id: 2, title: 'Invoice Paid', desc: 'Stripe processed $211.09 for INV-2026-001.', time: '1h ago', unread: true },
    { id: 3, title: 'New Lead Added', desc: 'TechHub Coworking requested a commercial quote.', time: '3h ago', unread: false }
  ];

  const handleRoleChange = (role) => {
    setActiveRole(role);
    setIsRoleMenuOpen(false);
    showToast(`Switched view to ${role.toUpperCase()} mode.`);
  };

  return (
    <nav className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-purple-200">
      <div className="px-6 h-16 flex items-center justify-between">
        
        {/* Left: Brand Logo & Role Badge */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => setIsLoggedIn(false)}>
            <div className="w-9 h-9 bg-obsidian-900 rounded-2xl flex items-center justify-center shadow-soft border border-purple-300">
              <Sparkles className="w-5 h-5 text-yellow-300" />
            </div>
            <div>
              <span className="font-heading text-xl font-bold tracking-tight text-obsidian-900">Simply<span className="text-purple-600">Clean</span></span>
              <span className="ml-1.5 px-2 py-0.5 text-[10px] font-bold bg-purple-100 text-purple-800 rounded-full border border-purple-300/60">CRM</span>
            </div>
          </div>

          {/* Role Indicator Badge */}
          <div className="relative">
            <button
              onClick={() => setIsRoleMenuOpen(!isRoleMenuOpen)}
              className="px-3 py-1 bg-yellow-100/80 hover:bg-yellow-200 text-yellow-900 text-xs font-bold rounded-xl border border-yellow-300 flex items-center gap-1.5 transition-colors">
              <UserCheck className="w-3.5 h-3.5 text-yellow-700" />
              <span className="capitalize">{activeRole} View</span>
              <ChevronDown className="w-3 h-3 opacity-60" />
            </button>

            {/* Role Dropdown */}
            {isRoleMenuOpen && (
              <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-2xl shadow-soft-lg border border-purple-200 p-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                <div className="px-3 py-1.5 text-[10px] font-bold text-obsidian-400 uppercase tracking-wider">Switch Active Role</div>
                {[
                  { role: 'owner', label: 'Owner (Full Access)' },
                  { role: 'manager', label: 'Office Manager' },
                  { role: 'contractor', label: 'Cleaner / Staff' },
                  { role: 'client', label: 'Client Portal View' }
                ].map((item) => (
                  <button
                    key={item.role}
                    onClick={() => handleRoleChange(item.role)}
                    className={`w-full text-left px-3 py-2 rounded-xl text-xs font-medium flex items-center justify-between transition-colors ${
                      activeRole === item.role ? 'bg-purple-100 text-purple-900 font-bold' : 'hover:bg-purple-50 text-obsidian-700'
                    }`}>
                    <span>{item.label}</span>
                    {activeRole === item.role && <Check className="w-3.5 h-3.5 text-purple-700" />}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Center: Global Search Bar Trigger */}
        <div className="hidden md:flex items-center">
          <button
            onClick={() => setIsSearchOpen(true)}
            className="w-80 h-10 px-4 bg-purple-50/60 hover:bg-purple-100/60 border border-purple-200 rounded-2xl flex items-center justify-between text-xs text-obsidian-500 transition-all shadow-inner">
            <div className="flex items-center gap-2">
              <Search className="w-4 h-4 text-purple-500" />
              <span>Search leads, clients, jobs, invoices...</span>
            </div>
            <kbd className="px-2 py-0.5 bg-white rounded border border-purple-200 font-mono text-[10px] font-bold text-obsidian-600">
              ⌘K
            </kbd>
          </button>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2.5">
          
          {/* Quick Action + Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsQuickActionsOpen(!isQuickActionsOpen)}
              className="h-10 px-3.5 bg-obsidian-900 hover:bg-obsidian-800 text-white rounded-2xl text-xs font-bold flex items-center gap-1.5 shadow-soft border border-purple-300/40 transition-all">
              <Plus className="w-4 h-4 text-yellow-300" />
              <span className="hidden sm:inline">Quick Action</span>
            </button>

            {isQuickActionsOpen && (
              <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-2xl shadow-soft-lg border border-purple-200 p-2 z-50">
                <button
                  onClick={() => { setActiveModal('new_job'); setIsQuickActionsOpen(false); }}
                  className="w-full text-left px-3 py-2 text-xs font-medium text-obsidian-800 hover:bg-purple-50 rounded-xl flex items-center gap-2">
                  <Calendar className="w-3.5 h-3.5 text-purple-600" /> Schedule New Job
                </button>
                <button
                  onClick={() => { setActiveModal('new_lead'); setIsQuickActionsOpen(false); }}
                  className="w-full text-left px-3 py-2 text-xs font-medium text-obsidian-800 hover:bg-purple-50 rounded-xl flex items-center gap-2">
                  <UserPlus className="w-3.5 h-3.5 text-yellow-600" /> Add New Lead
                </button>
                <button
                  onClick={() => { setActiveModal('new_client'); setIsQuickActionsOpen(false); }}
                  className="w-full text-left px-3 py-2 text-xs font-medium text-obsidian-800 hover:bg-purple-50 rounded-xl flex items-center gap-2">
                  <UserCheck className="w-3.5 h-3.5 text-purple-600" /> Add New Client
                </button>
                <button
                  onClick={() => { setActiveModal('new_invoice'); setIsQuickActionsOpen(false); }}
                  className="w-full text-left px-3 py-2 text-xs font-medium text-obsidian-800 hover:bg-purple-50 rounded-xl flex items-center gap-2">
                  <FileText className="w-3.5 h-3.5 text-yellow-600" /> Create Invoice
                </button>
              </div>
            )}
          </div>

          {/* AI Assistant Button */}
          <button
            onClick={() => setIsAIOpen(true)}
            className="h-10 px-3.5 bg-gradient-to-r from-purple-600 to-purple-800 text-white rounded-2xl text-xs font-bold flex items-center gap-1.5 shadow-soft hover:brightness-105 transition-all">
            <Bot className="w-4 h-4 text-yellow-300" />
            <span className="hidden sm:inline">SimplyClean AI</span>
          </button>

          {/* Notifications Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
              className="w-10 h-10 rounded-2xl bg-purple-50 hover:bg-purple-100 text-obsidian-700 flex items-center justify-center transition-colors relative border border-purple-200">
              <Bell className="w-4 h-4" />
              <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-yellow-400 ring-2 ring-white" />
            </button>

            {isNotificationsOpen && (
              <div className="absolute top-full right-0 mt-2 w-80 bg-white rounded-2xl shadow-soft-lg border border-purple-200 p-4 z-50">
                <div className="flex justify-between items-center pb-3 border-b border-purple-100">
                  <span className="font-bold text-xs text-obsidian-900">Notifications (2)</span>
                  <button onClick={() => setIsNotificationsOpen(false)} className="text-[10px] text-purple-600 font-bold hover:underline">Mark all read</button>
                </div>
                <div className="mt-3 space-y-2 max-h-64 overflow-y-auto">
                  {notifications.map((n) => (
                    <div key={n.id} className={`p-2.5 rounded-xl text-xs border ${n.unread ? 'bg-purple-50/80 border-purple-200' : 'bg-white border-transparent'}`}>
                      <div className="font-bold text-obsidian-900">{n.title}</div>
                      <div className="text-obsidian-600 mt-0.5 text-[11px]">{n.desc}</div>
                      <div className="text-[10px] text-obsidian-400 mt-1">{n.time}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* User Avatar & Logout */}
          <div className="flex items-center gap-3 pl-3 border-l border-purple-200">
            <img
              src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&q=80"
              alt="Sarah Chen"
              className="w-9 h-9 rounded-2xl object-cover border-2 border-purple-300 shadow-sm"
            />
            <div className="hidden lg:block text-left">
              <div className="text-xs font-bold text-obsidian-900 leading-tight">Sarah Chen</div>
              <div className="text-[10px] font-medium text-purple-700 capitalize">SimplyClean Owner</div>
            </div>
            <button
              onClick={() => { setIsLoggedIn(false); showToast('Signed out to Landing Page.'); }}
              title="Sign Out to Landing Page"
              className="w-8 h-8 rounded-xl hover:bg-rose-50 hover:text-rose-600 text-obsidian-400 flex items-center justify-center transition-colors">
              <LogOut className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>
    </nav>
  );
};
