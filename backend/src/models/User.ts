import mongoose, { Schema, Document } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  role: 'student' | 'admin';
  comparePassword: (password: string) => Promise<boolean>;
}

const userSchema = new Schema<IUser>({
  username: { type: String, required: true, unique: true, trim: true },
  email: { type: String, required: true, unique: true, trim: true, lowercase: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['student', 'admin'], default: 'student' }
}, {
  timestamps: true
});

userSchema.pre('save', async function() {
  console.log(`Pre-save hook triggered. Password modified: ${this.isModified('password')}`);
  if (!this.isModified('password')) {
    return;
  }
  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(this.password, salt);
    console.log(`Password hashed successfully. Hash starts with: ${hash.substring(0, 10)}`);
    this.password = hash;
  } catch (err: any) {
    console.error('Error hashing password:', err);
    throw err;
  }
});

userSchema.methods.comparePassword = async function(password: string): Promise<boolean> {
  console.log(`Comparing password. Provided: ${password.substring(0, 1)}... Against hash: ${this.password.substring(0, 10)}...`);
  const isMatch = await bcrypt.compare(password, this.password);
  return isMatch;
};

export default mongoose.model<IUser>('User', userSchema);
