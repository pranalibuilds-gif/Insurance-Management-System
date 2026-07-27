export const APP_CONFIG = {
  PROJECT_NAME: 'Insurance Management Platform',
  VERSION: '1.0.0',
  DEFAULT_PAGE_SIZE: 10,
  SLA_DEADLINE_HRS: 48,
  MAX_UPLOAD_SIZE_MB: 10,
  SUPPORT_EMAIL: 'support@imp.com',
};

export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1',
  TIMEOUT_MS: 10000,
};

export const STORAGE_KEYS = {
  AUTH_TOKEN: 'auth_token',
  REFRESH_TOKEN: 'refresh_token',
  USER_PREFERENCES: 'user_preferences',
  PURCHASE_DRAFT: 'imp_purchase_draft',
};
