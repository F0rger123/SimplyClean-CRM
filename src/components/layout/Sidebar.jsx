import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  LayoutDashboard,
  UserPlus,
  Users,
  Calendar,
  UserCheck,
  FileText,
  CreditCard,
  MessageSquare,
  BarChart3,
  SlidersHorizontal,
  ShieldCheck,
  Zap,
  Sparkles,
  Smartphone
} from 'lucide-react';

export const Sidebar = () => {
  const { activeTab, setActiveTab, activeRole, setActiveRole, showToast } = useApp();

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, roles: ['owner', 'manager', 'contractor'] },
    { id: 'leads', label: 'Leads & Pipeline', icon: UserPlus, badge: '4 New', roles: ['owner', 'manager'] },
    { id: 'clients', label: 'Clients Directory', icon: Users, roles: ['owner', 'manager'] },
    { id: 'jobs', label: 'Jobs & Dispatch', icon: Calendar, badge: '7 Today', roles: ['owner', 'manager', 'contractor', 'client'] },
    { id: 'contractors', label: 'Cleaners & Staff', icon: UserCheck, roles: ['owner', 'manager'] },
    { id: 'standards', label: 'Standards & SOPs', icon: ShieldCheck, badge: 'Owner', badgeColor: 'bg-purple-100 text-purple-900 border border-purple-300', roles: ['owner'] },
    { id: 'invoices', label: 'Invoices & Billing', icon: FileText, badge: '1 Overdue', badgeColor: 'bg-rose-100 text-rose-700', roles: ['owner', 'manager', 'client'] },
    { id: 'messages', label: 'Messages Inbox', icon: MessageSquare, badge: '1 SMS', roles: ['owner', 'manager', 'contractor'] },
    { id: 'reports', label: 'Reports & Revenue', icon: BarChart3, roles: ['owner'] },
    { id: 'integrations', label: 'Automations & Apps', icon: SlidersHorizontal, roles: ['owner', 'manager'] }
  ];

  const visibleItems = navItems.filter(item => item.roles.includes(activeRole));

  return (
    <aside className="w-64 bg-white border-r border-purple-200 hidden lg:flex flex-col justify-between shrink-0 min-h-[calc(100vh-4rem)] p-4">
      <div className="space-y-6">
        
        {/* Navigation Section */}
        <div>
          <div className="px-3 mb-2 text-[10px] font-extrabold text-obsidian-400 uppercase tracking-wider">
            {activeRole.toUpperCase()} WORKSPACE
          </div>
          
          <div className="space-y-1">
            {visibleItems.map((item) => {
              const IconComponent = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-obsidian-900 text-white shadow-soft font-bold border border-purple-300/30'
                      : 'text-obsidian-700 hover:bg-purple-50 hover:text-purple-900'
                  }`}>
                  <div className="flex items-center gap-3">
                    <IconComponent className={`w-4 h-4 ${isActive ? 'text-yellow-300' : 'text-purple-600'}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className={`px-2 py-0.5 text-[10px] font-extrabold rounded-full ${
                      item.badgeColor || (isActive ? 'bg-yellow-300 text-obsidian-950' : 'bg-purple-100 text-purple-800')
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Quick Shortcut to Contractor Mobile Portal */}
        <div className="p-4 bg-gradient-to-br from-purple-100 to-yellow-100/60 rounded-3xl border border-purple-300/80 space-y-2.5">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-obsidian-900 flex items-center gap-1.5">
              <Smartphone className="w-4 h-4 text-purple-700" />
              <span>Contractor Mobile Portal</span>
            </span>
          </div>
          <p className="text-[11px] text-obsidian-600 font-medium leading-relaxed">
            Cleaners access check-in timers, room checklists, and photo/video upload vault.
          </p>
          <button
            onClick={() => {
              setActiveRole('contractor');
              showToast('Switched to Contractor Mobile Companion Portal!');
            }}
            className="w-full py-2.5 bg-obsidian-900 hover:bg-obsidian-800 text-yellow-300 font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 shadow-sm">
            <span>Open Cleaner App →</span>
          </button>
        </div>

      </div>

      {/* Footer System Status */}
      <div className="pt-4 border-t border-purple-100 flex items-center justify-between text-[11px] text-obsidian-400 font-medium">
        <div className="flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-purple-500" />
          <span>SimplyClean v3.6</span>
        </div>
        <span className="text-emerald-600 font-bold flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>Online</span>
        </span>
      </div>

    </aside>
  );
};
