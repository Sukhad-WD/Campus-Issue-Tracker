import mongoose, { Schema, Document } from 'mongoose';

export interface IIssue extends Document {
  title: string;
  category: 'Wi-Fi' | 'Maintenance' | 'Lost Items' | 'Hostel' | 'Library' | 'Other';
  description: string;
  location: string;
  priority: 'Low' | 'Medium' | 'High';
  status: 'Open' | 'In Progress' | 'Resolved';
  imageUrl?: string;
  reportedBy: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const issueSchema = new Schema<IIssue>({
  title: { type: String, required: true, trim: true },
  category: { 
    type: String, 
    required: true, 
    enum: ['Wi-Fi', 'Maintenance', 'Lost Items', 'Hostel', 'Library', 'Other'] 
  },
  description: { type: String, required: true },
  location: { type: String, required: true },
  priority: { 
    type: String, 
    required: true, 
    enum: ['Low', 'Medium', 'High'],
    default: 'Medium'
  },
  status: { 
    type: String, 
    required: true, 
    enum: ['Open', 'In Progress', 'Resolved'],
    default: 'Open'
  },
  imageUrl: { type: String },
  reportedBy: { type: Schema.Types.ObjectId, ref: 'User', required: true }
}, {
  timestamps: true
});

export default mongoose.model<IIssue>('Issue', issueSchema);
