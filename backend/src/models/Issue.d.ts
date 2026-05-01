import mongoose, { Document } from 'mongoose';
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
declare const _default: mongoose.Model<IIssue, {}, {}, {}, mongoose.Document<unknown, {}, IIssue, {}, mongoose.DefaultSchemaOptions> & IIssue & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, IIssue>;
export default _default;
//# sourceMappingURL=Issue.d.ts.map