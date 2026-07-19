# System Design - Insurance Management Platform (IMP)

## 1. Architectural Style: Modular Monolith
The system is designed as a modular monolith to ensure high maintainability and clear separation of concerns while keeping deployment simple for an enterprise-grade project.

## 2. Module Boundaries & Responsibilities

| Module | Primary Responsibility |
| :--- | :--- |
| **Identity & Access (IAM)** | Authentication (JWT), RBAC, Session management, and Role-Permission mapping. |
| **Customer Management** | Lifecycle of customers (Registered to Archived), Profile details, and KYC status tracking. |
| **Insurance Products** | Catalog management for different insurance types (Health, Vehicle, etc.) including rules and eligibility. |
| **Policy Management** | Management of the legal contract instance, including activation, renewal, and cancellation. |
| **Billing & Premiums** | Financial scheduling, installment tracking, payments, and receipt generation. |
| **Claims Management** | The end-to-end claim settlement workflow (Submission to Settlement). |
| **Document Management** | Passive storage service for file metadata and secure access to physical files. |
| **Notification Management** | Communication engine for reminders, status updates, and alerts (Push/Email). |
| **Reporting & Dashboard** | Analytical engine for KPIs, trends, and business performance snapshots. |
| **Audit Logging** | Immutable, append-only record of all significant system events and state changes. |

## 3. Communication Pattern: Event-Driven
Modules communicate primarily through **Domain Events** rather than direct manipulation of each other's data.

### Example Workflow: Policy Activation
1. **Policy Module** activates a policy and publishes `POLICY_ACTIVATED`.
2. **Billing Module** subscribes to `POLICY_ACTIVATED` and generates the `PremiumSchedule`.
3. **Notification Module** subscribes and sends a "Welcome & Policy Document" alert.
4. **Audit Module** records the activation for compliance.

## 4. Key Architectural Rules
1. **Single Ownership Rule**: Each business entity has a single owner module. Only the owner can modify the entity's state.
2. **Cross-Module Reads**: Done via Application Services or read-only Repositories, never by direct table access from foreign modules.
3. **Passive Infrastructure**: The Document Module does not know "why" a file exists; it only provides storage and retrieval capabilities.
4. **Analytical Reporting**: The Reporting Module reads from other modules but never owns transactional data.
