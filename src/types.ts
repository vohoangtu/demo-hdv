export interface HDV {
  id: string;
  name: string;
  avatar: string;
  type: 'Fulltime' | 'Collaborator';
  branch: string;
  baseLocation: string;
  status: 'Active' | 'Pending' | 'Blocked' | 'Ready' | 'Pending Accept';
  languages: string[];
  routes: string[];
  rating: number;
  completedTours: number;
  operationalScore: number;
  phone?: string;
  email?: string;
  idNumber?: string;
  skills?: string[];
  certifications?: string[];
  tourHistory?: {
    id: string;
    name: string;
    date: string;
    rating: number;
    status: string;
  }[];
}

export interface Tour {
  id: string;
  name: string;
  image: string;
  startDate: string;
  endDate: string;
  duration: string;
  guests: number;
  guestType: 'Inbound' | 'Domestic';
  language: string;
  location: string;
  status: 'Pending' | 'Live' | 'Completed' | 'Settled' | 'Pending Audit' | 'Pending Review';
  priority: 'High' | 'Standard' | 'Urgent';
  budget?: number;
  assignedHDV?: string;
  itinerary?: string[];
  operatorContact?: {
    name: string;
    phone: string;
    email: string;
  };
  notes?: string;
  internalFeedback?: string;
}

export interface ApprovalStep {
  id: string;
  action: 'Approve' | 'Reject' | 'Submit' | 'Request Info';
  role: 'Guide' | 'Admin' | 'Finance';
  user: string;
  date: string;
  comment?: string;
}

export interface Settlement {
  id: string;
  tourId: string;
  hdvName: string;
  date: string;
  expenses: number;
  bonus: number;
  advance: number;
  total: number;
  status: 'Pending Audit' | 'Pending Review' | 'Settled' | 'Rejected';
  items?: {
    category: string;
    amount: number;
    description: string;
    receiptUrl?: string;
  }[];
  notes?: string;
  approvalHistory?: ApprovalStep[];
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  timestamp: string;
  isRead: boolean;
  link?: string;
}
