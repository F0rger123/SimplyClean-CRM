export const initialChecklistTemplates = [
  {
    id: 'tpl-deep',
    name: 'Deep Clean & Sanitize Standard',
    serviceType: 'Deep Clean',
    estimatedHours: 3.5,
    mandatoryPhotosCount: 4,
    requireVideoWalkthrough: true,
    rooms: [
      {
        roomName: 'Kitchen',
        tasks: [
          { id: 'k1', task: 'Deep scrub stovetop, burner grates & backsplash', mandatory: true, requiresPhoto: true },
          { id: 'k2', task: 'Clean interior of microwave & wipe oven exterior', mandatory: true, requiresPhoto: false },
          { id: 'k3', task: 'Disinfect sink, polish faucet & drain ring', mandatory: true, requiresPhoto: true },
          { id: 'k4', task: 'Wipe down exterior of all cabinet doors & handles', mandatory: false, requiresPhoto: false },
          { id: 'k5', task: 'Vacuum & steam mop tile floors including under island', mandatory: true, requiresPhoto: false }
        ]
      },
      {
        roomName: 'Bathrooms',
        tasks: [
          { id: 'b1', task: 'Scrub & remove hard water spots from shower glass doors', mandatory: true, requiresPhoto: true },
          { id: 'b2', task: 'Deep disinfect toilet bowl, tank, base & surrounding floor', mandatory: true, requiresPhoto: false },
          { id: 'b3', task: 'Shine mirrors, scrub vanity countertops & polish faucets', mandatory: true, requiresPhoto: false },
          { id: 'b4', task: 'Empty wastebaskets, replace liner & sanitize pedal bin', mandatory: false, requiresPhoto: false }
        ]
      },
      {
        roomName: 'Bedrooms & Living Areas',
        tasks: [
          { id: 'l1', task: 'Dust ceiling fans, high crown molding & baseboards', mandatory: true, requiresPhoto: false },
          { id: 'l2', task: 'Vacuum all carpets with edge tool along baseboards', mandatory: true, requiresPhoto: false },
          { id: 'l3', task: 'Wipe all window sills, switch plates & door frames', mandatory: true, requiresPhoto: false }
        ]
      }
    ]
  },
  {
    id: 'tpl-std',
    name: 'Standard Residential Maintenance Clean',
    serviceType: 'Standard Clean',
    estimatedHours: 2.0,
    mandatoryPhotosCount: 2,
    requireVideoWalkthrough: false,
    rooms: [
      {
        roomName: 'General Housekeeping',
        tasks: [
          { id: 'g1', task: 'Dust all accessible surface areas & tables', mandatory: true, requiresPhoto: false },
          { id: 'g2', task: 'Disinfect kitchen counters, sinks & stovetop', mandatory: true, requiresPhoto: true },
          { id: 'g3', task: 'Sanitize bathroom toilets, mirrors & vanity tops', mandatory: true, requiresPhoto: true },
          { id: 'g4', task: 'Vacuum all rugs & mop hard floors throughout', mandatory: true, requiresPhoto: false },
          { id: 'g5', task: 'Empty all trash cans to exterior bins', mandatory: true, requiresPhoto: false }
        ]
      }
    ]
  },
  {
    id: 'tpl-move',
    name: 'Move-In / Move-Out Turnover Protocol',
    serviceType: 'Move-In / Move-Out',
    estimatedHours: 4.5,
    mandatoryPhotosCount: 6,
    requireVideoWalkthrough: true,
    rooms: [
      {
        roomName: 'Full Interior Inspection',
        tasks: [
          { id: 'm1', task: 'Clean interior & exterior of all kitchen cabinets and drawers', mandatory: true, requiresPhoto: true },
          { id: 'm2', task: 'Deep degrease interior oven & refrigerator interior', mandatory: true, requiresPhoto: true },
          { id: 'm3', task: 'Deep scrub bathtubs, tile grout & shower stalls', mandatory: true, requiresPhoto: true },
          { id: 'm4', task: 'Wipe inside all bedroom and linen closets', mandatory: true, requiresPhoto: false },
          { id: 'm5', task: 'Wipe baseboards, doors, light switches & light fixtures', mandatory: true, requiresPhoto: false },
          { id: 'm6', task: 'Complete final 360° video walkthrough of empty property', mandatory: true, requiresPhoto: false }
        ]
      }
    ]
  },
  {
    id: 'tpl-comm',
    name: 'Commercial Office & Facility Protocol',
    serviceType: 'Commercial',
    estimatedHours: 3.0,
    mandatoryPhotosCount: 3,
    requireVideoWalkthrough: false,
    rooms: [
      {
        roomName: 'Office & Common Areas',
        tasks: [
          { id: 'c1', task: 'Sanitize all workstation desks, conference tables & keyboards', mandatory: true, requiresPhoto: false },
          { id: 'c2', task: 'Clean breakroom sink, wipe microwaves & clean coffee station', mandatory: true, requiresPhoto: true },
          { id: 'c3', task: 'Disinfect multi-stall restrooms & replenish paper goods', mandatory: true, requiresPhoto: true },
          { id: 'c4', task: 'Empty all office recycling and trash receptacles', mandatory: true, requiresPhoto: false },
          { id: 'c5', task: 'Vacuum all hallway carpeting & damp mop hard entryways', mandatory: true, requiresPhoto: false }
        ]
      }
    ]
  }
];

export const initialStandards = {
  minimumCleanerRating: 4.8,
  mandatoryBeforePhotos: 2,
  mandatoryAfterPhotos: 2,
  requireVideoOnDeepCleans: true,
  autoInvoiceOnJobComplete: true,
  requireGateCodeAcknowledgment: true,
  lateArrivalThresholdMinutes: 15,
  supplyKitCheckRequired: true,
  dressCode: 'SimplyClean Branded Polo / Apron, Non-slip shoe covers'
};

export const initialPermissions = {
  owner: {
    canManagePricing: true,
    canEditStandards: true,
    canAssignContractors: true,
    canViewGateCodes: true,
    canApprovePayouts: true,
    canDeleteRecords: true,
    canViewFinancialReports: true
  },
  manager: {
    canManagePricing: false,
    canEditStandards: true,
    canAssignContractors: true,
    canViewGateCodes: true,
    canApprovePayouts: true,
    canDeleteRecords: false,
    canViewFinancialReports: true
  },
  contractor: {
    canManagePricing: false,
    canEditStandards: false,
    canAssignContractors: false,
    canViewGateCodes: true, // Visible only for their assigned jobs today
    canApprovePayouts: false,
    canDeleteRecords: false,
    canViewFinancialReports: false,
    canUploadMedia: true,
    canCompleteChecklist: true,
    canClockInOut: true,
    canChatDispatch: true
  },
  client: {
    canManagePricing: false,
    canEditStandards: false,
    canAssignContractors: false,
    canViewGateCodes: false,
    canApprovePayouts: false,
    canDeleteRecords: false,
    canViewFinancialReports: false,
    canViewAssignedPhotos: true,
    canPayInvoices: true,
    canRequestService: true
  }
};

export const initialMediaVault = [
  {
    id: 'media-1',
    jobId: 'job-101',
    contractorId: 'contractor-1',
    contractorName: 'Elena Rostova',
    type: 'before_photo',
    room: 'Kitchen & Counters',
    url: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&q=80',
    timestamp: '2026-07-20 09:05 AM',
    notes: 'Initial state before deep clean & stove degreasing.'
  },
  {
    id: 'media-2',
    jobId: 'job-101',
    contractorId: 'contractor-1',
    contractorName: 'Elena Rostova',
    type: 'after_photo',
    room: 'Kitchen & Counters',
    url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
    timestamp: '2026-07-20 11:25 AM',
    notes: 'All counters sanitized, stove scrubbed, sink polished to chrome shine.'
  },
  {
    id: 'media-3',
    jobId: 'job-101',
    contractorId: 'contractor-2',
    contractorName: 'Carlos Mendez',
    type: 'after_photo',
    room: 'Master Bathroom',
    url: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800&q=80',
    timestamp: '2026-07-20 11:20 AM',
    notes: 'Shower glass completely clear of mineral spots.'
  },
  {
    id: 'media-4',
    jobId: 'job-102',
    contractorId: 'contractor-1',
    contractorName: 'Elena Rostova',
    type: 'before_photo',
    room: 'Living Room Baseboards',
    url: 'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?w=800&q=80',
    timestamp: '2026-07-20 01:10 PM',
    notes: 'Dog hair on baseboards documented prior to vacuuming.'
  },
  {
    id: 'media-5',
    jobId: 'job-104',
    contractorId: 'contractor-3',
    contractorName: 'Jessica Vance',
    type: 'video_walkthrough',
    room: 'Full Property 360°',
    url: 'https://assets.mixkit.co/videos/preview/mixkit-modern-apartment-living-room-interior-41589-large.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80',
    timestamp: '2026-07-19 04:30 PM',
    notes: 'Completed full walkthrough video verification.'
  }
];

export const initialAutomations = [
  {
    id: 'auto-1',
    name: 'Auto-Invoice on Job Completion',
    trigger: 'When cleaner completes all mandatory checklist items & clocks out',
    action: 'Generate itemized PDF invoice and trigger Stripe auto-charge if card on file',
    enabled: true
  },
  {
    id: 'auto-2',
    name: 'Twilio Cleaner En-Route SMS Alert',
    trigger: 'When cleaner taps "En Route" in Mobile Companion App',
    action: 'Send SMS with estimated arrival time and cleaner photo to client phone',
    enabled: true
  },
  {
    id: 'auto-3',
    name: 'Instant Quote Follow-Up Reminder',
    trigger: 'When a new lead quote has not been confirmed after 24 hours',
    action: 'Send friendly SMS reminder with quote discount code link',
    enabled: true
  },
  {
    id: 'auto-4',
    name: 'Quality Review SMS on High Score',
    trigger: 'When cleaner uploads all verified after-photos and job completes',
    action: 'Send Google 5-Star review link to client via Twilio SMS',
    enabled: true
  },
  {
    id: 'auto-5',
    name: 'QuickBooks Real-Time Financial Sync',
    trigger: 'When any invoice status changes to "Paid"',
    action: 'Sync transaction, sales tax, and customer record into QuickBooks Online ledger',
    enabled: true
  }
];

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
    entryCode: 'Key under blue ceramic pot on front porch',
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
    entryCode: 'Security guard at main entrance grants badge #31',
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
    templateId: 'tpl-std',
    title: 'Bi-Weekly Residential Clean',
    clientName: 'David & Karen Miller',
    clientId: 'client-2',
    address: '4810 Shoal Creek Blvd, Austin, TX 78756',
    date: '2026-07-20',
    startTime: '09:00 AM',
    endTime: '11:30 AM',
    assignedCrew: ['contractor-1', 'contractor-2'],
    assignedCrewNames: ['Elena Rostova', 'Carlos Mendez'],
    price: 195,
    status: 'completed',
    paymentStatus: 'paid',
    clockedInTime: '09:02 AM',
    clockedOutTime: '11:28 AM',
    elapsedMinutes: 146,
    entryCode: 'Key under blue ceramic pot on front porch',
    pets: 'No pets',
    checklist: [
      { id: 'c1', room: 'Kitchen', task: 'Sanitize kitchen counters, sink & stovetop', completed: true, requiresPhoto: true },
      { id: 'c2', room: 'Bathrooms', task: 'Deep clean master bath & remove shower spots', completed: true, requiresPhoto: true },
      { id: 'c3', room: 'Living Room', task: 'Dust all ceiling fans & blinds', completed: true, requiresPhoto: false },
      { id: 'c4', room: 'Floors', task: 'Vacuum carpets & mop hardwood floors', completed: true, requiresPhoto: false },
      { id: 'c5', room: 'Trash', task: 'Take out trash & replace liners', completed: true, requiresPhoto: false }
    ],
    notes: 'Job completed on time. Client left 5-star tip!'
  },
  {
    id: 'job-102',
    templateId: 'tpl-deep',
    title: 'Deep Clean & Pet Treatment',
    clientName: 'Emily Watson',
    clientId: 'client-1',
    address: '742 Evergreen Terrace, Austin, TX 78704',
    date: '2026-07-20',
    startTime: '01:00 PM',
    endTime: '04:00 PM',
    assignedCrew: ['contractor-1'],
    assignedCrewNames: ['Elena Rostova'],
    price: 220,
    status: 'in_progress',
    paymentStatus: 'pending',
    clockedInTime: '01:04 PM',
    clockedOutTime: null,
    elapsedMinutes: 48,
    entryCode: 'Keypad Code #7721 (Front Door)',
    pets: '2 friendly Golden Retrievers (in fenced backyard)',
    checklist: [
      { id: 'c1', room: 'Kitchen', task: 'Deep scrub stovetop & degrease backsplash', completed: true, requiresPhoto: true },
      { id: 'c2', room: 'Kitchen', task: 'Oven & microwave interior clean', completed: true, requiresPhoto: false },
      { id: 'c3', room: 'Bathrooms', task: 'Sanitize 3 bathrooms & shower stalls', completed: false, requiresPhoto: true },
      { id: 'c4', room: 'Bedrooms', task: 'Dust baseboards & vacuum pet hair along edges', completed: false, requiresPhoto: false },
      { id: 'c5', room: 'Floors', task: 'Mop all tile & hardwood with hypoallergenic spray', completed: false, requiresPhoto: false }
    ],
    notes: 'Cleaner en route to second floor bathrooms.'
  },
  {
    id: 'job-103',
    templateId: 'tpl-comm',
    title: 'Weekly Office Commercial Clean',
    clientName: 'Apex Design Studio',
    clientId: 'client-3',
    address: '800 E 6th St, Austin, TX 78702',
    date: '2026-07-20',
    startTime: '06:00 PM',
    endTime: '08:30 PM',
    assignedCrew: ['contractor-3'],
    assignedCrewNames: ['Jessica Vance'],
    price: 550,
    status: 'scheduled',
    paymentStatus: 'pending',
    clockedInTime: null,
    clockedOutTime: null,
    entryCode: 'Security guard at main entrance grants badge #31',
    pets: 'Office cat (Whiskers)',
    checklist: [
      { id: 'c1', room: 'Workstations', task: 'Wipe all desk surfaces & disinfect keyboards', completed: false, requiresPhoto: false },
      { id: 'c2', room: 'Breakroom', task: 'Sanitize breakroom counter & coffee station', completed: false, requiresPhoto: true },
      { id: 'c3', room: 'Restrooms', task: 'Clean rest rooms & replenish paper goods', completed: false, requiresPhoto: true },
      { id: 'c4', room: 'Floors', task: 'Vacuum all office carpets & mop entrance', completed: false, requiresPhoto: false }
    ],
    notes: 'Requires keycard from security desk before 6:15 PM.'
  },
  {
    id: 'job-104',
    templateId: 'tpl-move',
    title: 'Move-In Deep Turnover Cleaning',
    clientName: 'Sophia Martinez',
    clientId: 'client-1',
    address: '1402 Barton Springs Rd, Austin, TX 78704',
    date: '2026-07-21',
    startTime: '10:00 AM',
    endTime: '02:00 PM',
    assignedCrew: ['contractor-2', 'contractor-3'],
    assignedCrewNames: ['Carlos Mendez', 'Jessica Vance'],
    price: 380,
    status: 'scheduled',
    paymentStatus: 'pending',
    clockedInTime: null,
    clockedOutTime: null,
    entryCode: 'Keypad #4892 (Back Door)',
    pets: 'None (Vacant property)',
    checklist: [
      { id: 'c1', room: 'Cabinets', task: 'Clean inside all kitchen cabinets & wipe shelves', completed: false, requiresPhoto: true },
      { id: 'c2', room: 'Appliances', task: 'Deep scrub oven interior & refrigerator coils', completed: false, requiresPhoto: true },
      { id: 'c3', room: 'Tile', task: 'Deep steam clean tile grout in all bathrooms', completed: false, requiresPhoto: true },
      { id: 'c4', room: 'Video', task: 'Record 360° video walkthrough of completed move-in state', completed: false, requiresPhoto: false, requiresVideo: true }
    ],
    notes: 'Move-in before new tenant furniture delivery.'
  }
];

export const initialContractors = [
  {
    id: 'contractor-1',
    name: 'Elena Rostova',
    role: 'Lead Cleaner',
    pin: '1234',
    phone: '(512) 555-0111',
    email: 'elena.r@simplyclean.com',
    hourlyRate: 28,
    rating: 4.95,
    jobsCompleted: 342,
    status: 'Active',
    backgroundCheck: 'Passed (Verified 2026)',
    insuranceStatus: 'Active & Insured',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&q=80',
    assignedRouteToday: 'South Austin Route (3 Jobs)',
    todayEarnings: 140.00,
    weeklyEarnings: 840.00,
    tipsReceived: 65.00
  },
  {
    id: 'contractor-2',
    name: 'Carlos Mendez',
    role: 'Senior Cleaner',
    pin: '2345',
    phone: '(512) 555-0122',
    email: 'carlos.m@simplyclean.com',
    hourlyRate: 25,
    rating: 4.88,
    jobsCompleted: 218,
    status: 'Active',
    backgroundCheck: 'Passed (Verified 2026)',
    insuranceStatus: 'Active & Insured',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&q=80',
    assignedRouteToday: 'Central Austin Route (2 Jobs)',
    todayEarnings: 75.00,
    weeklyEarnings: 625.00,
    tipsReceived: 40.00
  },
  {
    id: 'contractor-3',
    name: 'Jessica Vance',
    role: 'Commercial Cleaning Specialist',
    pin: '3456',
    phone: '(512) 555-0166',
    email: 'jessica.v@simplyclean.com',
    hourlyRate: 30,
    rating: 4.98,
    jobsCompleted: 412,
    status: 'Active',
    backgroundCheck: 'Passed (Verified 2026)',
    insuranceStatus: 'Active & Insured',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&q=80',
    assignedRouteToday: 'East Austin Commercial Route (2 Jobs)',
    todayEarnings: 90.00,
    weeklyEarnings: 960.00,
    tipsReceived: 85.00
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
    clientName: 'Elena Rostova (Lead Cleaner)',
    channel: 'Contractor Dispatch',
    unread: false,
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&q=80',
    lastMessage: 'All before-photos uploaded for 742 Evergreen. Moving to upstairs bathrooms now.',
    timestamp: '01:15 PM',
    history: [
      { sender: 'contractor', text: 'Arrived at 742 Evergreen. Gate code worked perfectly.', time: '01:05 PM' },
      { sender: 'system', text: 'Dispatch: Great! Remember to upload photos of the glass shower doors.', time: '01:06 PM' },
      { sender: 'contractor', text: 'All before-photos uploaded for 742 Evergreen. Moving to upstairs bathrooms now.', time: '01:15 PM' }
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
