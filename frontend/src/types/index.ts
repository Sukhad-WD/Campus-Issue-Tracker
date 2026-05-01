export interface User {
  _id: string;
  username: string;
  email: string;
  role: 'student' | 'admin';
  token: string;
}

export interface Issue {
  _id: string;
  title: string;
  category: 'Wi-Fi' | 'Maintenance' | 'Lost Items' | 'Hostel' | 'Library' | 'Other';
  description: string;
  location: string;
  priority: 'Low' | 'Medium' | 'High';
  status: 'Open' | 'In Progress' | 'Resolved';
  imageUrl?: string;
  reportedBy: {
    _id: string;
    username: string;
    email: string;
  };
  createdAt: string;
  updatedAt: string;
}
