# Frontend State Architecture - Insurance Management Platform (IMP)

This document defines the patterns and rules for managing data and UI state within the React application. Consistency here is critical for maintainability and seamless backend integration.

## 1. State Classification

| State Type | Ownership | Persistence | Technology |
| :--- | :--- | :--- | :--- |
| **Server State** | Shared (Backend) | API Cache | TanStack Query (React Query) |
| **Global UI State** | Shared (Frontend) | Memory | Context API / Zustand (future) |
| **Local Component State** | Private | Memory | `useState` / `useReducer` |
| **Form State** | Private | Memory | React Hook Form + Zod |
| **Persistent Drafts** | User | `localStorage` | Custom Store (Wizard) |

## 2. Server State Pattern (TanStack Query)

### 2.1 Query Key Convention
Keys must be organized as arrays starting with the domain entity.
- `['customers', 'profile']`
- `['policies', 'list', { customerId: '...' }]`
- `['policies', 'detail', id]`
- `['claims', 'list', { status: '...' }]`

### 2.2 Invalidation Rules
Mutations must explicitly invalidate related query keys to ensure UI consistency.
- **After Payment**: Invalidate `['billing']` and `['policies']`.
- **After Document Upload**: Invalidate `['documents']`.
- **After Profile Update**: Invalidate `['customers', 'profile']`.

### 2.3 Stale Time & Retries
- `staleTime`: Default 5 minutes for reference data (products), 0 for transactional data (claims/billing).
- `retry`: 1 for idempotent GET requests, 0 for mutations to avoid duplicate submissions.

## 3. Global UI State (Context API)

The following contexts are the "Single Source of Truth" for non-persistent UI state:
- **`AuthContext`**: Current user object, permissions, and session status.
- **`LayoutContext`**: Sidebar collapse state, mobile drawer status.
- **`SearchContext`**: Shared state for the Global Search results.

## 4. Local & Persistent State

- **Wizard Drafts**: Managed via `localStorage` with a `lastSaved` timestamp. Automatically cleared only upon successful `COMPLETED` workflow status or manual abandonment.
- **Unsaved Changes**: Guarded by a custom hook `useUnsavedChanges(isDirty)` that leverages the browser's `beforeunload` event and React Router's `unstable_useBlocker` (if v6.4+).

## 5. Error Handling & Loading States

- **Global Errors**: Handled by the `ErrorBoundary` organism at the app root.
- **API Errors**: Standardized response format `{ error: { code: string, message: string, details: [] } }`.
- **Skeletons**: Every list view must have a corresponding `LoadingSkeleton` variant defined in Phase 2.5.

## 6. Real-time Synchronization (Mock Strategy)
While in Phase 3 (Mocks), all updates must be reflected in the local `mockStore` to simulate actual data persistence across different components (e.g., updating profile reflects immediately on Dashboard).
