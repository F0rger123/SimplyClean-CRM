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
  Zap,
  Sparkles
} from 'lucide-react';

export const Sidebar = () => {
  const { activeTab, setActiveTab, activeRole } = useApp();

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, roles: ['owner', 'manager', 'contractor'] },
    { id: 'leads', label: 'Leads & Quotes', icon: UserPlus, badge: '4 New', roles: ['owner', 'manager'] },
    { id: 'clients', label: 'Clients Directory', icon: Users, roles: ['owner', 'manager'] },
    { id: 'jobs', label: 'Jobs & Dispatch', icon: Calendar, badge: '7 Today', roles: ['owner', 'manager', 'contractor', 'client'] },
    { id: 'contractors', label: 'Cleaners & Staff', icon: UserCheck, roles: ['owner', 'manager'] },
    { id: 'invoices', label: 'Invoices & Tax', icon: FileText, badge: '1 Overdue', badgeColor: 'bg-rose-100 text-rose-700', roles: ['owner', 'manager', 'client'] },
    { id: 'messages', label: 'Messages Inbox', icon: MessageSquare, badge: '1 SMS', roles: ['owner', 'manager', 'contractor'] },
    { id: 'reports', label: 'Reports & Revenue', icon: BarChart3, roles: ['owner'] },
    { id: 'integrations', label: 'Settings & Integrations', icon: SlidersHorizontal, roles: ['owner', 'manager'] }
  ];

  // Filter menu items by active role
  const visibleItems = navItems.filter(item => item.roles.includes(activeRole));

  return (
    <aside className="w-64 bg-white border-r border-purple-200 flex flex-col justify-between shrink-0 min-h-[calc(100vh-4rem)] p-4">
      <div className="space-y-6">
        
        {/* Navigation Group */}
        <div>
          <div className="px-3 mb-2 text-[10px] font-bold text-obsidian-400 uppercase tracking-wider">
            Main Navigation
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

        {/* Quick Integrations Badge Card */}
        <div className="p-3.5 bg-gradient-to-br from-purple-50 to-yellow-50/60 rounded-2xl border border-purple-200 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-obsidian-900 flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-yellow-600 fill-yellow-400" />
              <span>Integrations Live</span>
            </span>
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          </div>
          <div className="text-[11px] text-obsidian-600 font-medium leading-tight">
            Stripe & QuickBooks connected and syncing.
          </div>
          <button
            onClick={() => setActiveTab('integrations')}
            className="text-[11px] font-bold text-purple-700 hover:text-purple-900 hover:underline inline-block pt-1">
            Manage Integrations →
          </button>
        </div>

      </div>

      {/* System Version Footnote */}
      <div className="pt-4 border-t border-purple-100 flex items-center justify-between text-[11px] text-obsidian-400 font-medium">
        <div className="flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-purple-500" />
          <span>SimplyClean v3.5</span>
        </div>
        <span className="text-emerald-600 font-bold">Online</span>
      </div>

    </aside>
  );
};
