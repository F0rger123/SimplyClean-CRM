import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  initialLeads,
  initialClients,
  initialJobs,
  initialContractors,
  initialInvoices,
  initialMessages,
  initialIntegrations,
  initialChecklistTemplates,
  initialStandards,
  initialPermissions,
  initialMediaVault,
  initialAutomations
} from '../data/initialData';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // Authentication & Persona
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    const saved = localStorage.getItem('simplyclean_isLoggedIn');
    return saved !== null ? JSON.parse(saved) : false;
  });

  const [activeRole, setActiveRole] = useState(() => {
    return localStorage.getItem('simplyclean_activeRole') || 'owner'; // 'owner' | 'manager' | 'contractor' | 'client'
  });

  // Active view tab for Owner/Manager CRM Workspace
  const [activeTab, setActiveTab] = useState(() => {
    return localStorage.getItem('simplyclean_activeTab') || 'dashboard';
  });

  // Contractor Mobile Companion App State
  const [activeContractor, setActiveContractor] = useState(() => {
    const saved = localStorage.getItem('simplyclean_activeContractor');
    return saved ? JSON.parse(saved) : initialContractors[0];
  });

  const [contractorViewTab, setContractorViewTab] = useState('jobs'); // 'jobs' | 'active_job' | 'payouts' | 'chat'
  const [contractorActiveJobId, setContractorActiveJobId] = useState('job-102');
  const [isMobileSimulated, setIsMobileSimulated] = useState(false);

  // Persistent Core Data
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

  // Standards, SOPs, Checklists & Permissions
  const [checklistTemplates, setChecklistTemplates] = useState(() => {
    const saved = localStorage.getItem('simplyclean_checklistTemplates');
    return saved ? JSON.parse(saved) : initialChecklistTemplates;
  });

  const [standards, setStandards] = useState(() => {
    const saved = localStorage.getItem('simplyclean_standards');
    return saved ? JSON.parse(saved) : initialStandards;
  });

  const [permissions, setPermissions] = useState(() => {
    const saved = localStorage.getItem('simplyclean_permissions');
    return saved ? JSON.parse(saved) : initialPermissions;
  });

  const [mediaVault, setMediaVault] = useState(() => {
    const saved = localStorage.getItem('simplyclean_mediaVault');
    return saved ? JSON.parse(saved) : initialMediaVault;
  });

  const [automations, setAutomations] = useState(() => {
    const saved = localStorage.getItem('simplyclean_automations');
    return saved ? JSON.parse(saved) : initialAutomations;
  });

  // Modals & UI Controls
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAIOpen, setIsAIOpen] = useState(false);
  const [activeModal, setActiveModal] = useState(null);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [selectedJob, setSelectedJob] = useState(null);
  const [selectedClient, setSelectedClient] = useState(null);
  const [toastNotification, setToastNotification] = useState(null);

  // Sync to LocalStorage
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
    localStorage.setItem('simplyclean_activeContractor', JSON.stringify(activeContractor));
  }, [activeContractor]);

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
    localStorage.setItem('simplyclean_checklistTemplates', JSON.stringify(checklistTemplates));
  }, [checklistTemplates]);

  useEffect(() => {
    localStorage.setItem('simplyclean_standards', JSON.stringify(standards));
  }, [standards]);

  useEffect(() => {
    localStorage.setItem('simplyclean_permissions', JSON.stringify(permissions));
  }, [permissions]);

  useEffect(() => {
    localStorage.setItem('simplyclean_mediaVault', JSON.stringify(mediaVault));
  }, [mediaVault]);

  useEffect(() => {
    localStorage.setItem('simplyclean_automations', JSON.stringify(automations));
  }, [automations]);

  // Toast Helper
  const showToast = (message, type = 'success') => {
    setToastNotification({ message, type, id: Date.now() });
    setTimeout(() => {
      setToastNotification(null);
    }, 4000);
  };

  // Media Vault Handlers (Real Photos & Video Upload)
  const uploadJobMedia = ({ jobId, type, room, url, thumbnail, notes }) => {
    const newMedia = {
      id: `media-${Date.now()}`,
      jobId,
      contractorId: activeContractor?.id || 'contractor-1',
      contractorName: activeContractor?.name || 'Elena Rostova',
      type, // 'before_photo' | 'after_photo' | 'video_walkthrough' | 'issue_photo'
      room: room || 'General Area',
      url,
      thumbnail: thumbnail || url,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', month: 'short', day: 'numeric' }),
      notes: notes || ''
    };

    setMediaVault(prev => [newMedia, ...prev]);
    showToast(`Uploaded ${type.replace('_', ' ')} (${room}) to Job #${jobId}!`);
    return newMedia;
  };

  const deleteJobMedia = (mediaId) => {
    setMediaVault(prev => prev.filter(m => m.id !== mediaId));
    showToast('Media item removed from vault.');
  };

  // Clock In / Clock Out Handlers
  const clockInContractor = (jobId) => {
    const nowTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setJobs(prev => prev.map(j => {
      if (j.id === jobId) {
        return {
          ...j,
          status: 'in_progress',
          clockedInTime: nowTime,
          clockedOutTime: null,
          elapsedMinutes: 0
        };
      }
      return j;
    }));
    showToast(`Clocked in at ${nowTime} for Job #${jobId}! Live timer active.`);
  };

  const clockOutContractor = (jobId, completionNotes = '') => {
    const nowTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setJobs(prev => prev.map(j => {
      if (j.id === jobId) {
        // Trigger auto invoice
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

        return {
          ...j,
          status: 'completed',
          clockedOutTime: nowTime,
          notes: completionNotes || j.notes
        };
      }
      return j;
    }));
    showToast(`Job #${jobId} completed & clocked out! Invoice auto-generated.`);
  };

  // Checklist Template Management
  const addChecklistTemplate = (newTemplate) => {
    const tpl = {
      ...newTemplate,
      id: `tpl-${Date.now()}`
    };
    setChecklistTemplates(prev => [...prev, tpl]);
    showToast(`Checklist Standard "${tpl.name}" created!`);
  };

  const updateChecklistTemplate = (tplId, updatedData) => {
    setChecklistTemplates(prev => prev.map(t => t.id === tplId ? { ...t, ...updatedData } : t));
    showToast('Checklist Standard template updated.');
  };

  const deleteChecklistTemplate = (tplId) => {
    setChecklistTemplates(prev => prev.filter(t => t.id !== tplId));
    showToast('Template deleted.');
  };

  // Lead, Client, Job, Invoice Methods
  const addLead = (newLead) => {
    const leadObj = {
      ...newLead,
      id: `lead-${Date.now()}`,
      dateAdded: new Date().toISOString().split('T')[0],
      stage: newLead.stage || 'new'
    };
    setLeads(prev => [leadObj, ...prev]);
    showToast(`Lead "${leadObj.name}" added to pipeline!`);
  };

  const updateLeadStage = (leadId, newStage) => {
    setLeads(prev => prev.map(l => l.id === leadId ? { ...l, stage: newStage } : l));
    showToast(`Lead moved to ${newStage.replace('_', ' ')}.`);
  };

  const convertLeadToClient = (lead) => {
    const clientObj = {
      id: `client-${Date.now()}`,
      name: lead.name,
      company: lead.cleaningType === 'Commercial' ? lead.name : 'Homeowner',
      email: lead.email,
      phone: lead.phone,
      address: lead.address,
      entryCode: 'Keypad / Lockbox provided upon schedule',
      pets: 'To be confirmed',
      specialInstructions: lead.notes || 'Standard cleaning guidelines',
      frequency: lead.frequency || 'Bi-Weekly',
      rate: lead.estimatedPrice,
      totalSpent: 0,
      status: 'Active',
      joinedDate: new Date().toISOString().split('T')[0]
    };
    setClients(prev => [clientObj, ...prev]);
    setLeads(prev => prev.map(l => l.id === lead.id ? { ...l, stage: 'won' } : l));
    showToast(`Converted lead "${lead.name}" into Active Client!`);
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
    showToast(`Client profile for "${clientObj.name}" created!`);
  };

  const addJob = (newJob) => {
    const template = checklistTemplates.find(t => t.id === newJob.templateId) || checklistTemplates[0];
    
    // Flatten room tasks into checklist items
    const generatedChecklist = [];
    template.rooms.forEach(r => {
      r.tasks.forEach(t => {
        generatedChecklist.push({
          id: `${t.id}-${Date.now()}`,
          room: r.roomName,
          task: t.task,
          completed: false,
          requiresPhoto: t.requiresPhoto || false,
          requiresVideo: t.requiresVideo || false
        });
      });
    });

    const jobObj = {
      ...newJob,
      id: `job-${Date.now()}`,
      status: 'scheduled',
      paymentStatus: 'pending',
      clockedInTime: null,
      clockedOutTime: null,
      checklist: newJob.checklist && newJob.checklist.length > 0 ? newJob.checklist : generatedChecklist
    };
    setJobs(prev => [jobObj, ...prev]);
    showToast(`Job scheduled for ${jobObj.clientName}! Standard template applied.`);
  };

  const updateJobStatus = (jobId, newStatus) => {
    setJobs(prev => prev.map(j => {
      if (j.id === jobId) {
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
          showToast(`Job marked completed! Auto-generated Invoice ${invObj.id}.`);
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
        if (inv.jobId) {
          setJobs(jList => jList.map(j => j.id === inv.jobId ? { ...j, paymentStatus: 'paid' } : j));
        }
        return updatedInv;
      }
      return inv;
    }));
    showToast(`Invoice ${invoiceId} marked PAID via Stripe!`);
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
      activeContractor, setActiveContractor,
      contractorViewTab, setContractorViewTab,
      contractorActiveJobId, setContractorActiveJobId,
      isMobileSimulated, setIsMobileSimulated,
      leads, addLead, updateLeadStage, convertLeadToClient,
      clients, addClient, setSelectedClient, selectedClient,
      jobs, addJob, updateJobStatus, toggleJobChecklistItem, setSelectedJob, selectedJob,
      contractors, setContractors,
      invoices, payInvoice, setSelectedInvoice, selectedInvoice,
      messages, setMessages, sendTwilioSMS,
      integrations, setIntegrations, syncQuickBooks,
      checklistTemplates, addChecklistTemplate, updateChecklistTemplate, deleteChecklistTemplate,
      standards, setStandards,
      permissions, setPermissions,
      mediaVault, uploadJobMedia, deleteJobMedia,
      automations, setAutomations,
      clockInContractor, clockOutContractor,
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
