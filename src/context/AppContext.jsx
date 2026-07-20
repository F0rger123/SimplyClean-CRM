import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  initialLeads,
  initialClients,
  initialJobs,
  initialContractors,
  initialInvoices,
  initialMessages,
  initialIntegrations
} from '../data/initialData';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // Signed out (Landing Page) by default vs Signed in (CRM Application)
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    const saved = localStorage.getItem('simplyclean_isLoggedIn');
    return saved !== null ? JSON.parse(saved) : false;
  });

  // Current active role when signed in: 'owner', 'manager', 'contractor', 'client'
  const [activeRole, setActiveRole] = useState(() => {
    return localStorage.getItem('simplyclean_activeRole') || 'owner';
  });

  // Active view tab when signed in
  const [activeTab, setActiveTab] = useState(() => {
    return localStorage.getItem('simplyclean_activeTab') || 'dashboard';
  });

  // Persistent App State
  const [leads, setLeads] = useState(() => {
    const saved = localStorage.getItem('simplyclean_leads');
    return saved ? JSON.parse(saved) : initialLeads;
  });

  const [clients, setClients] = useState(() => {
    const saved = localStorage.getItem('simplyclean_clients');
    return saved ? JSON.parse(saved) : initialClients;
  });

  const [jobs, setJobs] = useState(() => {
    const saved = localStorage.getItem('simplyclean_jobs');
    return saved ? JSON.parse(saved) : initialJobs;
  });

  const [contractors, setContractors] = useState(() => {
    const saved = localStorage.getItem('simplyclean_contractors');
    return saved ? JSON.parse(saved) : initialContractors;
  });

  const [invoices, setInvoices] = useState(() => {
    const saved = localStorage.getItem('simplyclean_invoices');
    return saved ? JSON.parse(saved) : initialInvoices;
  });

  const [messages, setMessages] = useState(() => {
    const saved = localStorage.getItem('simplyclean_messages');
    return saved ? JSON.parse(saved) : initialMessages;
  });

  const [integrations, setIntegrations] = useState(() => {
    const saved = localStorage.getItem('simplyclean_integrations');
    return saved ? JSON.parse(saved) : initialIntegrations;
  });

  // Modals & UI States
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAIOpen, setIsAIOpen] = useState(false);
  const [activeModal, setActiveModal] = useState(null); // 'new_job', 'new_lead', 'new_client', 'new_invoice', 'payment_modal', etc.
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [selectedJob, setSelectedJob] = useState(null);
  const [selectedClient, setSelectedClient] = useState(null);
  const [toastNotification, setToastNotification] = useState(null);

  // Sync state to LocalStorage
  useEffect(() => {
    localStorage.setItem('simplyclean_isLoggedIn', JSON.stringify(isLoggedIn));
  }, [isLoggedIn]);

  useEffect(() => {
    localStorage.setItem('simplyclean_activeRole', activeRole);
  }, [activeRole]);

  useEffect(() => {
    localStorage.setItem('simplyclean_activeTab', activeTab);
  }, [activeTab]);

  useEffect(() => {
    localStorage.setItem('simplyclean_leads', JSON.stringify(leads));
  }, [leads]);

  useEffect(() => {
    localStorage.setItem('simplyclean_clients', JSON.stringify(clients));
  }, [clients]);

  useEffect(() => {
    localStorage.setItem('simplyclean_jobs', JSON.stringify(jobs));
  }, [jobs]);

  useEffect(() => {
    localStorage.setItem('simplyclean_contractors', JSON.stringify(contractors));
  }, [contractors]);

  useEffect(() => {
    localStorage.setItem('simplyclean_invoices', JSON.stringify(invoices));
  }, [invoices]);

  useEffect(() => {
    localStorage.setItem('simplyclean_messages', JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    localStorage.setItem('simplyclean_integrations', JSON.stringify(integrations));
  }, [integrations]);

  // Toast Helper
  const showToast = (message, type = 'success') => {
    setToastNotification({ message, type, id: Date.now() });
    setTimeout(() => {
      setToastNotification(null);
    }, 4000);
  };

  // State Action Handlers
  const addLead = (newLead) => {
    const leadObj = {
      ...newLead,
      id: `lead-${Date.now()}`,
      dateAdded: new Date().toISOString().split('T')[0],
      stage: newLead.stage || 'new'
    };
    setLeads(prev => [leadObj, ...prev]);
    showToast(`Lead "${leadObj.name}" added successfully!`);
  };

  const updateLeadStage = (leadId, newStage) => {
    setLeads(prev => prev.map(l => l.id === leadId ? { ...l, stage: newStage } : l));
    showToast(`Lead stage updated to ${newStage.replace('_', ' ')}.`);
  };

  const convertLeadToClient = (lead) => {
    const clientObj = {
      id: `client-${Date.now()}`,
      name: lead.name,
      company: lead.cleaningType === 'Commercial' ? lead.name : 'Homeowner',
      email: lead.email,
      phone: lead.phone,
      address: lead.address,
      entryCode: 'Provided upon booking',
      pets: 'To be confirmed',
      specialInstructions: lead.notes || 'None',
      frequency: lead.frequency,
      rate: lead.estimatedPrice,
      totalSpent: 0,
      status: 'Active',
      joinedDate: new Date().toISOString().split('T')[0]
    };
    setClients(prev => [clientObj, ...prev]);
    setLeads(prev => prev.map(l => l.id === lead.id ? { ...l, stage: 'won' } : l));
    showToast(`Lead "${lead.name}" converted to Active Client!`);
  };

  const addClient = (newClient) => {
    const clientObj = {
      ...newClient,
      id: `client-${Date.now()}`,
      totalSpent: 0,
      status: 'Active',
      joinedDate: new Date().toISOString().split('T')[0]
    };
    setClients(prev => [clientObj, ...prev]);
    showToast(`Client "${clientObj.name}" created!`);
  };

  const addJob = (newJob) => {
    const jobObj = {
      ...newJob,
      id: `job-${Date.now()}`,
      status: 'scheduled',
      paymentStatus: 'pending',
      checklist: newJob.checklist || [
        { id: 'c1', task: 'Dust all ceiling fans & surfaces', completed: false },
        { id: 'c2', task: 'Sanitize kitchen counters & sink', completed: false },
        { id: 'c3', task: 'Clean bathrooms & glass doors', completed: false },
        { id: 'c4', task: 'Vacuum carpets & mop hard floors', completed: false }
      ]
    };
    setJobs(prev => [jobObj, ...prev]);
    showToast(`Job scheduled for ${jobObj.clientName}!`);
  };

  const updateJobStatus = (jobId, newStatus) => {
    setJobs(prev => prev.map(j => {
      if (j.id === jobId) {
        // If completed, trigger automated invoice creation
        if (newStatus === 'completed' && j.status !== 'completed') {
          const invObj = {
            id: `INV-2026-${Math.floor(100 + Math.random() * 900)}`,
            jobId: j.id,
            clientName: j.clientName,
            clientEmail: `${j.clientName.toLowerCase().replace(/[^a-z]/g, '')}@example.com`,
            issueDate: new Date().toISOString().split('T')[0],
            dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            amount: j.price,
            tax: Number((j.price * 0.0825).toFixed(2)),
            total: Number((j.price * 1.0825).toFixed(2)),
            status: 'pending',
            paymentMethod: 'Stripe Direct Pay / Card',
            lineItems: [{ description: j.title || 'Cleaning Service', quantity: 1, rate: j.price }]
          };
          setInvoices(inv => [invObj, ...inv]);
          showToast(`Job marked completed! Invoice ${invObj.id} generated automatically.`);
        }
        return { ...j, status: newStatus };
      }
      return j;
    }));
  };

  const toggleJobChecklistItem = (jobId, taskId) => {
    setJobs(prev => prev.map(j => {
      if (j.id === jobId) {
        const updatedChecklist = j.checklist.map(c => c.id === taskId ? { ...c, completed: !c.completed } : c);
        return { ...j, checklist: updatedChecklist };
      }
      return j;
    }));
  };

  const payInvoice = (invoiceId, paymentDetails = {}) => {
    setInvoices(prev => prev.map(inv => {
      if (inv.id === invoiceId) {
        const updatedInv = {
          ...inv,
          status: 'paid',
          paymentDate: new Date().toISOString().split('T')[0],
          paymentMethod: paymentDetails.method || 'Stripe Credit Card (•••• 4242)'
        };
        // Also update matching job payment status if present
        if (inv.jobId) {
          setJobs(jList => jList.map(j => j.id === inv.jobId ? { ...j, paymentStatus: 'paid' } : j));
        }
        return updatedInv;
      }
      return inv;
    }));
    showToast(`Invoice ${invoiceId} marked as PAID via Stripe!`);
  };

  const syncQuickBooks = () => {
    setIntegrations(prev => ({
      ...prev,
      quickbooks: {
        ...prev.quickbooks,
        lastSync: `Just now (${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })})`
      }
    }));
    showToast('QuickBooks 1-Click Sync completed! Invoices & Contacts synced.');
  };

  const sendTwilioSMS = (recipient, text) => {
    const newMessage = {
      id: `msg-${Date.now()}`,
      clientName: recipient,
      channel: 'SMS (Twilio)',
      unread: false,
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&q=80',
      lastMessage: text,
      timestamp: 'Just now',
      history: [{ sender: 'system', text: text, time: 'Just now' }]
    };
    setMessages(prev => [newMessage, ...prev]);
    showToast(`Twilio SMS sent to ${recipient}!`);
  };

  return (
    <AppContext.Provider value={{
      isLoggedIn, setIsLoggedIn,
      activeRole, setActiveRole,
      activeTab, setActiveTab,
      leads, addLead, updateLeadStage, convertLeadToClient,
      clients, addClient, setSelectedClient, selectedClient,
      jobs, addJob, updateJobStatus, toggleJobChecklistItem, setSelectedJob, selectedJob,
      contractors,
      invoices, payInvoice, setSelectedInvoice, selectedInvoice,
      messages, sendTwilioSMS,
      integrations, setIntegrations, syncQuickBooks,
      isSearchOpen, setIsSearchOpen,
      isAIOpen, setIsAIOpen,
      activeModal, setActiveModal,
      toastNotification, showToast
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
