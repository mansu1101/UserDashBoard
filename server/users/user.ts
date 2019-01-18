/**
 * User model class.
 */
export class User {
  _id: any;
  username: string;
  password: string;
  email: string;
  mobile: number;
  bio: string;
  role: string;
  createdAt: Date;
  modifiedAt: Date;
  deletedAt: Date;
  isActive: boolean;
  key: any;

  constructor(data: User | {} = {}) {
    (<any>Object).assign(this, data);
  }
}