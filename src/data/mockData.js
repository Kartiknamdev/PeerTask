// Mock Users
export const mockUsers = [
  {
    id: 'user_1',
    name: 'Alex Johnson',
    email: 'alex@example.com',
    password: 'password123', // In a real app, this would be hashed
    userType: 'client',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    bio: 'Marketing professional with a focus on content creation and strategy.',
    rating: 4.8,
    completedTasks: 15,
    createdAt: '2023-09-15T10:30:00Z'
  },
  {
    id: 'user_2',
    name: 'Sarah Miller',
    email: 'sarah@example.com',
    password: 'password123',
    userType: 'worker',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    bio: 'Professional editor with 5+ years of experience in academic and business documents.',
    rating: 4.9,
    completedTasks: 32,
    skills: ['Proofreading', 'Editing', 'Research', 'Academic Writing'],
    createdAt: '2023-08-10T14:20:00Z'
  },
  {
    id: 'user_3',
    name: 'David Williams',
    email: 'david@example.com',
    password: 'password123',
    userType: 'worker',
    avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    bio: 'Legal professional specializing in contract review and document preparation.',
    rating: 4.7,
    completedTasks: 24,
    skills: ['Legal Analysis', 'Contract Review', 'Document Preparation'],
    createdAt: '2023-10-05T09:15:00Z'
  },
  {
    id: 'user_4',
    name: 'Emily Chen',
    email: 'emily@example.com',
    password: 'password123',
    userType: 'client',
    avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    bio: 'Small business owner looking for help with various documentation needs.',
    rating: 4.6,
    completedTasks: 8,
    createdAt: '2023-11-20T16:45:00Z'
  }
]

// Mock Tasks
export const mockTasks = [
  {
    id: 'task_1',
    title: 'Proofread Marketing Materials',
    description: 'Need someone to proofread and edit our new marketing brochure before it goes to print. The document is approximately 15 pages long and includes product descriptions, company history, and client testimonials.',
    requirements: 'Strong attention to detail and experience with marketing content preferred. Looking for grammar, spelling, and clarity improvements.',
    budget: 150,
    deadline: '2025-04-15T23:59:59Z',
    category: 'Proofreading',
    tags: ['Marketing', 'Editing', 'Brochure'],
    createdBy: 'user_1',
    createdAt: '2025-02-28T13:45:00Z',
    status: 'open',
    applicants: [
      {
        userId: 'user_2',
        appliedAt: '2025-03-01T10:22:00Z',
        coverLetter: 'I have extensive experience proofreading marketing materials and would love to help with your brochure.',
        status: 'pending'
      }
    ],
    assignedTo: null,
    attachments: [
      {
        name: 'MarketingBrochure_Draft.pdf',
        size: '2.4 MB',
        uploadedAt: '2025-02-28T13:48:00Z'
      }
    ]
  },
  {
    id: 'task_2',
    title: 'Review and Summarize Legal Contract',
    description: 'Need assistance reviewing a 30-page service agreement contract and creating a 2-page executive summary highlighting the key points, obligations, and potential risks.',
    requirements: 'Legal background required. Experience with service agreements and contract law preferred.',
    budget: 300,
    deadline: '2025-04-10T18:00:00Z',
    category: 'Legal',
    tags: ['Contract', 'Summary', 'Legal Review'],
    createdBy: 'user_4',
    createdAt: '2025-03-01T09:30:00Z',
    status: 'assigned',
    applicants: [
      {
        userId: 'user_3',
        appliedAt: '2025-03-01T11:15:00Z',
        coverLetter: 'As a legal professional with contract review experience, I can provide a thorough analysis and concise summary of your agreement.',
        status: 'accepted'
      }
    ],
    assignedTo: 'user_3',
    assignedAt: '2025-03-02T14:22:00Z',
    attachments: [
      {
        name: 'ServiceAgreement_2025.pdf',
        size: '4.1 MB',
        uploadedAt: '2025-03-01T09:35:00Z'
      }
    ]
  },
  {
    id: 'task_3',
    title: 'Format Academic Research Paper',
    description: 'Need help formatting an academic research paper according to APA 7th edition guidelines. The paper is 25 pages including references and needs proper formatting for submission to an academic journal.',
    requirements: 'Must be familiar with APA 7th edition guidelines. Experience with academic paper formatting preferred.',
    budget: 120,
    deadline: '2025-04-05T23:59:59Z',
    category: 'Academic',
    tags: ['APA Format', 'Research Paper', 'Formatting'],
    createdBy: 'user_1',
    createdAt: '2025-03-10T15:20:00Z',
    status: 'completed',
    applicants: [
      {
        userId: 'user_2',
        appliedAt: '2025-03-10T16:45:00Z',
        coverLetter: 'I have formatted numerous academic papers according to APA guidelines and can ensure your paper meets all requirements.',
        status: 'accepted'
      }
    ],
    assignedTo: 'user_2',
    assignedAt: '2025-03-11T09:10:00Z',
    completedAt: '2025-03-13T14:30:00Z',
    paymentStatus: 'paid',
    paidAt: '2025-03-14T10:15:00Z',
    attachments: [
      {
        name: 'Research_Draft.docx',
        size: '1.8 MB',
        uploadedAt: '2025-03-10T15:25:00Z'
      }
    ]
  },
  {
    id: 'task_4',
    title: 'Transcribe Business Interview Recordings',
    description: 'Need transcription for 5 business interviews (approximately 45 minutes each). Clean verbatim format required with speaker identification.',
    requirements: 'Fast and accurate typing skills. Experience with transcription and business terminology preferred.',
    budget: 175,
    deadline: '2025-04-12T18:00:00Z',
    category: 'Transcription',
    tags: ['Interviews', 'Business', 'Audio'],
    createdBy: 'user_4',
    createdAt: '2025-03-15T11:30:00Z',
    status: 'open',
    applicants: [],
    assignedTo: null,
    attachments: [
      {
        name: 'Interview_Sample.mp3',
        size: '5.2 MB',
        uploadedAt: '2025-03-15T11:35:00Z'
      }
    ]
  },
  {
    id: 'task_5',
    title: 'Create Executive Resume and Cover Letter',
    description: 'Need help creating a professional executive-level resume and cover letter template that I can customize for different applications. Looking for modern design with clean formatting.',
    requirements: 'Experience with executive resume writing. Understanding of ATS systems and optimization techniques.',
    budget: 200,
    deadline: '2025-04-08T23:59:59Z',
    category: 'Resume',
    tags: ['Executive', 'Cover Letter', 'Professional'],
    createdBy: 'user_1',
    createdAt: '2025-03-20T14:15:00Z',
    status: 'open',
    applicants: [
      {
        userId: 'user_2',
        appliedAt: '2025-03-20T16:30:00Z',
        coverLetter: 'I specialize in creating ATS-friendly executive resumes and would be delighted to help with your project.',
        status: 'pending'
      }
    ],
    assignedTo: null,
    attachments: [
      {
        name: 'Current_Resume.pdf',
        size: '1.1 MB',
        uploadedAt: '2025-03-20T14:20:00Z'
      },
      {
        name: 'Career_History.docx',
        size: '0.9 MB',
        uploadedAt: '2025-03-20T14:22:00Z'
      }
    ]
  }
]

// Mock Messages
export const mockMessages = [
  {
    id: 'msg_1',
    conversationId: 'conv_1',
    senderId: 'user_1',
    receiverId: 'user_2',
    content: 'Hello Sarah, I noticed you applied for my proofreading task. Could you tell me more about your experience with marketing materials?',
    timestamp: '2025-03-01T14:30:00Z',
    read: true
  },
  {
    id: 'msg_2',
    conversationId: 'conv_1',
    senderId: 'user_2',
    receiverId: 'user_1',
    content: 'Hi Alex, I have proofread and edited marketing materials for several companies in the tech industry. I pay special attention to maintaining brand voice while ensuring clarity and correct grammar.',
    timestamp: '2025-03-01T14:45:00Z',
    read: true
  },
  {
    id: 'msg_3',
    conversationId: 'conv_1',
    senderId: 'user_1',
    receiverId: 'user_2',
    content: 'That sounds great. What would be your approach to handling our brochure?',
    timestamp: '2025-03-01T15:10:00Z',
    read: true
  },
  {
    id: 'msg_4',
    conversationId: 'conv_1',
    senderId: 'user_2',
    receiverId: 'user_1',
    content: 'I would start by reviewing the entire document to understand the overall structure and messaging. Then I would do a detailed edit focusing on grammar, spelling, and clarity. Finally, I would review again for consistency in tone and style. I can provide comments explaining any significant changes I recommend.',
    timestamp: '2025-03-01T15:25:00Z',
    read: false
  },
  {
    id: 'msg_5',
    conversationId: 'conv_2',
    senderId: 'user_4',
    receiverId: 'user_3',
    content: 'Hi David, I wanted to check on the progress of the contract review. Do you have any questions about the agreement?',
    timestamp: '2025-03-03T10:15:00Z',
    read: true
  },
  {
    id: 'msg_6',
    conversationId: 'conv_2',
    senderId: 'user_3',
    receiverId: 'user_4',
    content: 'Hello Emily. Ive completed about 70% of the review. I noticed some potentially problematic clauses in the liability section. Would you like me to provide preliminary notes on those sections before I complete the full review?',
    timestamp: '2025-03-03T10:30:00Z',
    read: true
  },
  {
    id: 'msg_7',
    conversationId: 'conv_2',
    senderId: 'user_4',
    receiverId: 'user_3',
    content: 'Yes, that would be very helpful! Please send over what you have so far regarding those liability concerns.',
    timestamp: '2025-03-03T10:45:00Z',
    read: false
  }
]

// Mock Conversations (for UI organization)
export const mockConversations = [
  {
    id: 'conv_1',
    participants: ['user_1', 'user_2'],
    lastMessageTimestamp: '2025-03-01T15:25:00Z',
    unreadCount: {
      'user_1': 1,
      'user_2': 0
    }
  },
  {
    id: 'conv_2',
    participants: ['user_3', 'user_4'],
    lastMessageTimestamp: '2025-03-03T10:45:00Z',
    unreadCount: {
      'user_3': 1,
      'user_4': 0
    }
  }
]

// Mock Notifications
export const mockNotifications = [
  {
    id: 'notif_1',
    userId: 'user_1',
    type: 'application',
    content: 'Sarah Miller has applied to your task "Proofread Marketing Materials"',
    relatedId: 'task_1',
    timestamp: '2025-03-01T10:22:00Z',
    read: true
  },
  {
    id: 'notif_2',
    userId: 'user_2',
    type: 'message',
    content: 'New message from Alex Johnson',
    relatedId: 'conv_1',
    timestamp: '2025-03-01T14:30:00Z',
    read: true
  },
  {
    id: 'notif_3',
    userId: 'user_3',
    type: 'task_assigned',
    content: 'You have been assigned to the task "Review and Summarize Legal Contract"',
    relatedId: 'task_2',
    timestamp: '2025-03-02T14:22:00Z',
    read: true
  },
  {
    id: 'notif_4',
    userId: 'user_4',
    type: 'message',
    content: 'New message from David Williams',
    relatedId: 'conv_2',
    timestamp: '2025-03-03T10:30:00Z',
    read: false
  },
  {
    id: 'notif_5',
    userId: 'user_1',
    type: 'task_completed',
    content: 'Your task "Format Academic Research Paper" has been completed',
    relatedId: 'task_3',
    timestamp: '2025-03-13T14:30:00Z',
    read: false
  }
]