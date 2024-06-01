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
