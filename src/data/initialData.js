export const initialLeads = [
  {
    id: 'lead-1',
    name: 'Emily Watson',
    email: 'emily.w@example.com',
    phone: '(512) 555-0192',
    address: '742 Evergreen Terrace, Austin, TX 78704',
    sqft: 2400,
    bedrooms: 4,
    bathrooms: 3,
    cleaningType: 'Deep Clean',
    frequency: 'Bi-Weekly',
    estimatedPrice: 220,
    stage: 'quote_sent',
    dateAdded: '2026-07-18',
    notes: 'Has 2 golden retrievers. Preferred morning appointments.'
  },
  {
    id: 'lead-2',
    name: 'TechHub Coworking',
    email: 'ops@techhub.io',
    phone: '(512) 555-0144',
    address: '1100 Congress Ave, Suite 400, Austin, TX 78701',
    sqft: 6500,
    bedrooms: 0,
    bathrooms: 6,
    cleaningType: 'Commercial',
    frequency: 'Weekly',
    estimatedPrice: 750,
    stage: 'new',
    dateAdded: '2026-07-20',
    notes: 'After hours cleaning required (after 7 PM).'
  },
  {
    id: 'lead-3',
    name: 'Marcus Brody',
    email: 'marcus.b@example.com',
    phone: '(512) 555-0188',
    address: '3205 Windsor Rd, Austin, TX 78703',
    sqft: 1800,
    bedrooms: 3,
    bathrooms: 2,
    cleaningType: 'Standard Clean',
    frequency: 'Weekly',
    estimatedPrice: 160,
    stage: 'scheduled',
    dateAdded: '2026-07-15',
    notes: 'First cleaning scheduled for Thursday.'
  },
  {
    id: 'lead-4',
    name: 'Sophia Martinez',
    email: 'sophia.m@example.com',
    phone: '(512) 555-0133',
    address: '1402 Barton Springs Rd, Austin, TX 78704',
    sqft: 3100,
    bedrooms: 5,
    bathrooms: 4,
    cleaningType: 'Move-In / Move-Out',
    frequency: 'One-Time',
    estimatedPrice: 380,
    stage: 'won',
    dateAdded: '2026-07-10',
    notes: 'Move-in deep clean completed successfully.'
  }
];

export const initialClients = [
  {
    id: 'client-1',
    name: 'Sophia Martinez',
    company: 'Homeowner',
    email: 'sophia.m@example.com',
    phone: '(512) 555-0133',
    address: '1402 Barton Springs Rd, Austin, TX 78704',
    entryCode: 'Keypad #4892 (Back Door)',
    pets: '1 friendly French Bulldog (Bella)',
    specialInstructions: 'Please use eco-friendly hypoallergenic sprays on hardwood floors.',
    frequency: 'Bi-Weekly',
    rate: 240,
    totalSpent: 1440,
    status: 'Active',
    joinedDate: '2026-03-12'
  },
  {
    id: 'client-2',
    name: 'David & Karen Miller',
    company: 'Homeowner',
    email: 'david.miller@example.com',
    phone: '(512) 555-0177',
    address: '4810 Shoal Creek Blvd, Austin, TX 78756',
    entryCode: 'Key under flower pot on front porch',
    pets: 'No pets',
    specialInstructions: 'Pay extra attention to glass shower doors in master bath.',
    frequency: 'Weekly',
    rate: 195,
    totalSpent: 3120,
    status: 'Active',
    joinedDate: '2026-01-08'
  },
  {
    id: 'client-3',
    name: 'Apex Design Studio',
    company: 'Apex Design LLC',
    email: 'facilities@apexdesign.co',
    phone: '(512) 555-0199',
    address: '800 E 6th St, Austin, TX 78702',
    entryCode: 'Security guard at main entrance grants access',
    pets: 'Office cat (Whiskers)',
    specialInstructions: 'Empty all recycling bins into rear alley dumpster.',
    frequency: 'Weekly',
    rate: 550,
    totalSpent: 6600,
    status: 'Active',
    joinedDate: '2025-11-01'
  }
];

export const initialJobs = [
  {
    id: 'job-101',
    title: 'Bi-Weekly Residential Clean',
    clientName: 'David & Karen Miller',
    address: '4810 Shoal Creek Blvd, Austin, TX 78756',
    date: '2026-07-20',
    startTime: '09:00 AM',
    endTime: '11:30 AM',
    assignedCrew: ['contractor-1', 'contractor-2'],
    assignedCrewNames: ['Elena Rostova', 'Carlos Mendez'],
    price: 195,
    status: 'completed',
    paymentStatus: 'paid',
    checklist: [
      { id: 'c1', task: 'Dust all ceiling fans & blinds', completed: true },
      { id: 'c2', task: 'Sanitize kitchen counters & sink', completed: true },
      { id: 'c3', task: 'Deep clean master bath & glass doors', completed: true },
      { id: 'c4', task: 'Vacuum carpets & mop hardwood floors', completed: true },
      { id: 'c5', task: 'Take out trash & replace liners', completed: true }
    ],
    beforePhoto: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400&q=80',
    afterPhoto: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&q=80',
    notes: 'Job completed on time. Client left 5-star tip!'
  },
  {
    id: 'job-102',
    title: 'Deep Clean & Sanitize',
    clientName: 'Emily Watson',
    address: '742 Evergreen Terrace, Austin, TX 78704',
    date: '2026-07-20',
    startTime: '01:00 PM',
    endTime: '04:00 PM',
    assignedCrew: ['contractor-1'],
    assignedCrewNames: ['Elena Rostova'],
    price: 220,
    status: 'in_progress',
    paymentStatus: 'pending',
    checklist: [
      { id: 'c1', task: 'Dust light fixtures & baseboards', completed: true },
      { id: 'c2', task: 'Oven & microwave interior clean', completed: true },
      { id: 'c3', task: 'Sanitize 3 bathrooms', completed: false },
      { id: 'c4', task: 'Mop all tile & hardwood', completed: false }
    ],
    notes: 'Cleaner en route to second floor bathrooms.'
  },
  {
    id: 'job-103',
    title: 'Weekly Office Commercial Clean',
    clientName: 'Apex Design Studio',
    address: '800 E 6th St, Austin, TX 78702',
    date: '2026-07-20',
    startTime: '06:00 PM',
    endTime: '08:30 PM',
    assignedCrew: ['contractor-3'],
    assignedCrewNames: ['Jessica Vance'],
    price: 550,
    status: 'scheduled',
    paymentStatus: 'pending',
    checklist: [
      { id: 'c1', task: 'Wipe all desk surfaces & keyboards', completed: false },
      { id: 'c2', task: 'Sanitize breakroom & coffee station', completed: false },
      { id: 'c3', task: 'Clean rest rooms & replenish paper goods', completed: false },
      { id: 'c4', task: 'Vacuum all office carpets', completed: false }
    ],
    notes: 'Requires keycard from security desk.'
  },
  {
    id: 'job-104',
    title: 'Move-In Deep Cleaning',
    clientName: 'Sophia Martinez',
    address: '1402 Barton Springs Rd, Austin, TX 78704',
    date: '2026-07-21',
    startTime: '10:00 AM',
    endTime: '02:00 PM',
    assignedCrew: ['contractor-2', 'contractor-3'],
    assignedCrewNames: ['Carlos Mendez', 'Jessica Vance'],
    price: 380,
    status: 'scheduled',
    paymentStatus: 'pending',
    checklist: [
      { id: 'c1', task: 'Clean inside all kitchen cabinets', completed: false },
      { id: 'c2', task: 'Scrub interior windows & sills', completed: false },
      { id: 'c3', task: 'Deep steam clean tile grout', completed: false }
    ],
    notes: 'Move-in before furniture delivery.'
  }
];

export const initialContractors = [
  {
    id: 'contractor-1',
    name: 'Elena Rostova',
    role: 'Lead Cleaner',
    phone: '(512) 555-0111',
    email: 'elena.r@simplyclean.com',
    hourlyRate: 28,
    rating: 4.95,
    jobsCompleted: 342,
    status: 'Active',
    backgroundCheck: 'Passed (Verified 2026)',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&q=80',
    assignedRouteToday: 'South Austin Route (3 Jobs)'
  },
  {
    id: 'contractor-2',
    name: 'Carlos Mendez',
    role: 'Senior Cleaner',
    phone: '(512) 555-0122',
    email: 'carlos.m@simplyclean.com',
    hourlyRate: 25,
    rating: 4.88,
    jobsCompleted: 218,
    status: 'Active',
    backgroundCheck: 'Passed (Verified 2026)',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&q=80',
    assignedRouteToday: 'Central Austin Route (2 Jobs)'
  },
  {
    id: 'contractor-3',
    name: 'Jessica Vance',
    role: 'Commercial Cleaning Specialist',
    phone: '(512) 555-0166',
    email: 'jessica.v@simplyclean.com',
    hourlyRate: 30,
    rating: 4.98,
    jobsCompleted: 412,
    status: 'Active',
    backgroundCheck: 'Passed (Verified 2026)',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&q=80',
    assignedRouteToday: 'East Austin Commercial Route (2 Jobs)'
  }
];

export const initialInvoices = [
  {
    id: 'INV-2026-001',
    jobId: 'job-101',
    clientName: 'David & Karen Miller',
    clientEmail: 'david.miller@example.com',
    issueDate: '2026-07-20',
    dueDate: '2026-07-27',
    amount: 195.00,
    tax: 16.09,
    total: 211.09,
    status: 'paid',
    paymentMethod: 'Stripe Credit Card (•••• 4242)',
    lineItems: [
      { description: 'Weekly Residential Cleaning (3 Bed / 2 Bath)', quantity: 1, rate: 195.00 }
    ]
  },
  {
    id: 'INV-2026-002',
    jobId: 'job-102',
    clientName: 'Emily Watson',
    clientEmail: 'emily.w@example.com',
    issueDate: '2026-07-20',
    dueDate: '2026-07-27',
    amount: 220.00,
    tax: 18.15,
    total: 238.15,
    status: 'pending',
    paymentMethod: 'Auto-debit via Stripe on file',
    lineItems: [
      { description: 'Deep Clean & Pet Treatment (4 Bed / 3 Bath)', quantity: 1, rate: 220.00 }
    ]
  },
  {
    id: 'INV-2026-003',
    jobId: 'job-103',
    clientName: 'Apex Design Studio',
    clientEmail: 'facilities@apexdesign.co',
    issueDate: '2026-07-14',
    dueDate: '2026-07-21',
    amount: 550.00,
    tax: 45.38,
    total: 595.38,
    status: 'overdue',
    paymentMethod: 'ACH Direct Deposit',
    lineItems: [
      { description: 'Weekly Commercial Office Cleaning', quantity: 1, rate: 550.00 }
    ]
  }
];

export const initialMessages = [
  {
    id: 'msg-1',
    clientName: 'Emily Watson',
    channel: 'SMS',
    unread: true,
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&q=80',
    lastMessage: 'Hi! Just wanted to make sure Elena knows about the dog in the backyard?',
    timestamp: '10:14 AM',
    history: [
      { sender: 'client', text: 'Hi! Just wanted to make sure Elena knows about the dog in the backyard?', time: '10:14 AM' },
      { sender: 'system', text: 'SimplyClean Dispatch: Elena is notified! She will keep the gate secured.', time: '10:16 AM' }
    ]
  },
  {
    id: 'msg-2',
    clientName: 'David Miller',
    channel: 'Email',
    unread: false,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80',
    lastMessage: 'Thanks for the immaculate cleaning today! Left a review on Google.',
    timestamp: 'Yesterday',
    history: [
      { sender: 'system', text: 'Invoice INV-2026-001 receipt sent via email.', time: 'Yesterday 12:05 PM' },
      { sender: 'client', text: 'Thanks for the immaculate cleaning today! Left a review on Google.', time: 'Yesterday 12:45 PM' }
    ]
  }
];

export const initialIntegrations = {
  stripe: {
    connected: true,
    accountName: 'SimplyClean Austin (acct_1M9x92K)',
    liveMode: true,
    publishableKey: 'pk_live_51M9x92K89210948190248',
    totalProcessed: '$42,850.00',
    autoPayouts: true
  },
  quickbooks: {
    connected: true,
    realmId: '9130350294104921',
    lastSync: 'Today at 08:30 AM',
    syncInvoices: true,
    syncCustomers: true
  },
  twilio: {
    connected: true,
    phoneNumber: '+1 (512) 883-9201',
    smsRemindersEnabled: true,
    smsFeedbackEnabled: true
  },
  googleMaps: {
    connected: true,
    apiKeySet: true,
    routeOptimization: true,
    liveTrafficMatrix: true
  },
  zapier: {
    connected: true,
    activeZaps: 6
  }
};
