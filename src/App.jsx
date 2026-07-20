import React from 'react';
import { useApp } from './context/AppContext';
import { LandingPage } from './components/landing/LandingPage';
import { Navbar } from './components/layout/Navbar';
import { Sidebar } from './components/layout/Sidebar';
import { DashboardView } from './components/dashboard/DashboardView';
import { LeadsView } from './components/leads/LeadsView';
import { ClientsView } from './components/clients/ClientsView';
import { JobsView } from './components/jobs/JobsView';
import { ContractorsView } from './components/contractors/ContractorsView';
import { InvoicesView } from './components/invoices/InvoicesView';
import { MessagesView } from './components/messages/MessagesView';
import { ReportsView } from './components/reports/ReportsView';
import { IntegrationsView } from './components/integrations/IntegrationsView';
import { Toast } from './components/common/Toast';
import { AIAssistantModal } from './components/ai/AIAssistantModal';
import { GlobalSearchModal } from './components/common/GlobalSearchModal';

export const App = () => {
  const { isLoggedIn, activeTab } = useApp();

  // 1. Signed Out View (Landing Page)
  if (!isLoggedIn) {
    return (
      <>
        <LandingPage />
        <Toast />
      </>
    );
  }

  // 2. Signed In CRM Application Workspace
  return (
    <div className="min-h-screen bg-[#FAF8FC] text-obsidian-900 flex flex-col font-sans selection:bg-purple-200">
      <Navbar />
      
      <div className="flex-1 flex max-w-screen-2xl w-full mx-auto">
        <Sidebar />
        
        <main className="flex-1 p-6 md:p-8 overflow-y-auto">
          {activeTab === 'dashboard' && <DashboardView />}
          {activeTab === 'leads' && <LeadsView />}
          {activeTab === 'clients' && <ClientsView />}
          {activeTab === 'jobs' && <JobsView />}
          {activeTab === 'contractors' && <ContractorsView />}
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
