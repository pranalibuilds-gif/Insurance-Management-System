export const QUERY_KEYS = {
  AUTH: {
    SESSION: ['auth', 'session'],
  },
  PRODUCTS: {
    LIST: ['products', 'list'],
    DETAIL: (id: string) => ['products', 'detail', id],
    CATEGORIES: ['products', 'categories'],
  },
  POLICIES: {
    LIST: ['policies', 'list'],
    DETAIL: (id: string) => ['policies', 'detail', id],
    WORKSPACE: (id: string) => ['policies', 'workspace', id],
    MY: ['policies', 'my'],
  },
  CUSTOMERS: {
    PROFILE: ['customers', 'profile'],
    WORKSPACE: (id: string) => ['customers', 'workspace', id],
  },
  CLAIMS: {
    LIST: ['claims', 'list'],
    DETAIL: (id: string) => ['claims', 'detail', id],
    WORKSPACE: (id: string) => ['claims', 'workspace', id],
  },
  BILLING: {
    SUMMARY: ['billing', 'summary'],
    HISTORY: ['billing', 'history'],
  },
  NOTIFICATIONS: {
    LIST: ['notifications', 'list'],
  },
  STAFF: {
    DASHBOARD: ['staff', 'dashboard'],
    REPORTS: ['staff', 'reports'],
  }
};
