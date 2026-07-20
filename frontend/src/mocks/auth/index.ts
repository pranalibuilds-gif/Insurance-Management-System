import { mockDelay } from '..';

export type UserRole = 'ADMIN' | 'MANAGER' | 'AGENT' | 'CUSTOMER';

export interface MockUser {
  id: string;
  email: string;
  role: UserRole;
  name: string;
}

export const mockLogin = async (email: string): Promise<MockUser> => {
  await mockDelay(1000);

  let role: UserRole = 'CUSTOMER';
  if (email.startsWith('admin')) role = 'ADMIN';
  else if (email.startsWith('manager')) role = 'MANAGER';
  else if (email.startsWith('agent')) role = 'AGENT';

  return {
    id: Math.random().toString(36).substr(2, 9),
    email,
    role,
    name: email.split('@')[0],
  };
};
