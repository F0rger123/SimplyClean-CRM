import React from 'react';
import { useApp } from './context/AppContext';
import { LandingPage } from './components/landing/LandingPage';
import { ContractorPortal } from './components/contractor-portal/ContractorPortal';
import { Navbar } from './components/layout/Navbar';
import { Sidebar } from './components/layout/Sidebar';
import { DashboardView } from './components/dashboard/DashboardView';
import { LeadsView } from './components/leads/LeadsView';
import { ClientsView } from './components/clients/ClientsView';
import { JobsView } from './components/jobs/JobsView';
import { ContractorsView } from './components/contractors/ContractorsView';
import { StandardsPermissionsView } from './components/standards/StandardsPermissionsView';
import { InvoicesView } from './components/invoices/InvoicesView';
import { MessagesView } from './components/messages/MessagesView';
import { ReportsView } from './components/reports/ReportsView';
import { IntegrationsView } from './components/integrations/IntegrationsView';
import { Toast } from './components/common/Toast';
import { AIAssistantModal } from './components/ai/AIAssistantModal';
import { GlobalSearchModal } from './components/common/GlobalSearchModal';

export const App = () => {
  const { isLoggedIn, activeRole, activeTab } = useApp();

  // 1. Signed Out View (Landing Page)
  if (!isLoggedIn) {
    return (
      <>
        <LandingPage />
        <Toast />
      </>
    );
  }

  // 2. Contractor Mobile Portal View (Dedicated Cleaner Interface)
  if (activeRole === 'contractor') {
    return (
      <>
        <ContractorPortal />
        <Toast />
      </>
    );
  }

  // 3. Owner & Manager CRM Workspace (Desktop + Mobile Responsive)
  return (
    <div className="min-h-screen bg-[#FAF8FC] text-obsidian-900 flex flex-col font-sans selection:bg-purple-200">
      <Navbar />
      
      <div className="flex-1 flex max-w-screen-2xl w-full mx-auto">
        <Sidebar />
        
        <main className="flex-1 p-4 md:p-8 overflow-y-auto">
          {activeTab === 'dashboard' && <DashboardView />}
          {activeTab === 'leads' && <LeadsView />}
          {activeTab === 'clients' && <ClientsView />}
          {activeTab === 'jobs' && <JobsView />}
          {activeTab === 'contractors' && <ContractorsView />}
          {activeTab === 'standards' && <StandardsPermissionsView />}
          {activeTab === 'invoices' && <InvoicesView />}
          {activeTab === 'messages' && <MessagesView />}
          {activeTab === 'reports' && <ReportsView />}
          {activeTab === 'integrations' && <IntegrationsView />}
        </main>
      </div>

      <Toast />
      <AIAssistantModal />
      <GlobalSearchModal />
    </div>
  );
};
