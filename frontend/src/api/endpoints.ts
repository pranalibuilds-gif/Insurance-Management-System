export const ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    ME: '/auth/me',
    REFRESH: '/auth/refresh',
  },
  PRODUCTS: {
    LIST: '/products',
    DETAIL: (id: string) => `/products/${id}`,
    CATEGORIES: '/products/categories',
  },
  POLICIES: {
    LIST: '/policies',
    DETAIL: (id: string) => `/policies/${id}`,
    WORKSPACE: (id: string) => `/policies/${id}/workspace`,
    MY: '/policies/my',
  },
  CUSTOMERS: {
    ME: '/customers/me',
    PROFILE: '/customers/me/profile',
    WORKSPACE: (id: string) => `/customers/${id}/workspace`,
    DOCUMENTS: (id: string) => `/customers/${id}/documents`,
  },
  DOCUMENTS: {
    LIST: '/documents',
    DETAIL: (id: string) => `/documents/${id}`,
    CATEGORIES: '/documents/categories',
  },
  CLAIMS: {
    LIST: '/claims',
    DETAIL: (id: string) => `/claims/${id}`,
    WORKSPACE: (id: string) => `/claims/${id}/workspace`,
    SUBMIT: '/claims',
  },
  BILLING: {
    SUMMARY: '/billing/summary',
    HISTORY: '/billing/history',
    PAY: '/billing/pay',
  },
  NOTIFICATIONS: {
    LIST: '/notifications',
    MARK_READ: (id: string) => `/notifications/${id}/read`,
  },
};
