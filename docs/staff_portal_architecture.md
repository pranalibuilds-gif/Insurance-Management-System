# Staff Portal Architecture - Insurance Management Platform (IMP)

This document defines the structural and operational contract for the internal staff-facing application.

## 1. Staff Navigation Map (RBAC Contract)

| Module | Agent | Manager | Admin |
| :--- | :---: | :---: | :---: |
| **Dashboard** | ✅ | ✅ | ✅ |
| **Customers** | ✅ | ✅ | ❌ |
| **KYC Review** | ✅ | ✅ | ❌ |
| **Policies** | ✅ | ✅ | ❌ |
| **Claims Queue** | ✅ | ✅ | ❌ |
| **Product Builder** | ❌ | ✅ | ✅ |
| **Billing & Finance** | ❌ | ✅ | ✅ |
| **Reports & Analytics** | ❌ | ✅ | ✅ |
| **User & Role Mgmt** | ❌ | ❌ | ✅ |
| **Audit Center** | ❌ | ❌ | ✅ |
| **System Config** | ❌ | ❌ | ✅ |
| **Staff Notifications**| ✅ | ✅ | ✅ |

## 2. Staff Dashboard Inventory

### 2.1 Agent Dashboard (Operational)
- **Objective**: Complete today's front-office tasks.
- **Widgets**:
  - `Pending KYC Queue`: Individual cards for identity verification.
  - `Assigned Claims`: List of cases requiring investigation.
  - `Customer Follow-ups`: Alerts for missing documents.
  - `Today's Productivity`: Counter of tasks completed today.
  - `Quick Customer Search`: Search bar for instant profile access.

### 2.2 Manager Dashboard (Governance)
- **Objective**: Monitor business performance and team bottlenecks.
- **Widgets**:
  - `Approval Queue`: Claims/Settlements exceeding Agent authority.
  - `Daily Revenue`: Real-time premium collection counter.
  - `Loss Ratio Indicator`: Claims paid vs. Premiums collected.
  - `SLA Violations`: Count of claims older than 48 hours.
  - `Policy Growth Trend`: New policies sold this week.

### 2.3 Admin Dashboard (System Health)
- **Objective**: Ensure platform integrity and security.
- **Widgets**:
  - `Active Users`: Live session count.
  - `Security Feed`: Failed login attempts and role changes.
  - `System Integrity`: Database and Storage health indicators.
  - `Audit Log Preview`: Last 5 critical system actions.

## 3. Staff Workspace Pattern
To maintain predictability, every "Master View" (Customer, Policy, Claim) must follow this consistent layout:

1. **Header**: Title, Status Badge, Global ID.
2. **Status Banner**: High-visibility state indicator (e.g., "Awaiting Decision").
3. **Summary Strip**: 3-4 key metrics (e.g., Policy Coverage, Claim Amount).
4. **Main Tabbed Content**:
   - `Overview`: General details.
   - `Documents`: Evidence/Proof viewer.
   - `Timeline`: Audit/Activity history.
   - `Related`: Linked entities (e.g., Claims for a Policy).
5. **Action Panel (Right Sidebar)**: Decision triggers (Approve, Reject, Assign, Escalate).

## 4. Staff Action Philosophy
Staff pages are designed for **Decisions**, not just viewing. Every workspace must explicitly provide:
- **Decision Controls**: Clear buttons for workflow transitions.
- **Justification**: Mandatory "Notes/Remarks" field for rejections or approvals.
- **Impact Preview**: View what happens after the decision (e.g., "This will trigger a $1,200 payout").
- **Audit Trails**: Every action records the Actor, Timestamp, and previous/new state.
