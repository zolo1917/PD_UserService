import mongoose, { model } from "mongoose";
import * as uuid from "uuid";
export interface IUser {
  id: {
    type: string;
    require: true;
  };
  userHandle: string;
  hashedPassword: string;
  email: string;
  status: string;
  DOB: Date;
  created_at: Date;
  updated_at: Date;
  last_logged_in: Date;
}

const userSchema = new mongoose.Schema<IUser>({
  id: {
    type: String,
    default: uuid.v4,
  },
  userHandle: {
    type: String,
    require: true,
  },
  hashedPassword: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  status: {
    type: String,
    require: true,
  },
  DOB: {
    type: Date,
  },
  created_at: {
    type: Date,
    default: new Date(),
  },
  updated_at: {
    type: Date,
    default: new Date(),
  },
  last_logged_in: {
    type: Date,
    default: new Date(),
  },
});

export const User = model<IUser>("User", userSchema);
