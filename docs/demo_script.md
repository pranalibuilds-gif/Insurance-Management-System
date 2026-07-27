# Demo Walkthrough Script - IMP v1.0.0

This script provides a structured path for demonstrating the platform's core workflows.

## 🏁 Setup
1. Ensure the backend and frontend are running (`docker-compose up`).
2. Run the seed script to populate historical data: `python -m app.seeds.seed`.

---

## 🤵 Part 1: The Customer Experience

### 1. Acquisition
- **Action**: Navigate to `/portal/products`.
- **Highlight**: The diverse insurance plans and the "Recommended" badges.
- **Action**: Open "Health Secure Gold" and walk through the **8-step Purchase Wizard**.
- **Highlight**: Real-time premium calculation and eligibility checking.

### 2. Transaction
- **Action**: Complete the purchase and authorize the payment.
- **Highlight**: The transition from `DRAFT` to `PENDING_ISSUANCE`.

### 3. Management
- **Action**: Navigate to `My Policies` and open the new policy workspace.
- **Highlight**: The chronological timeline and integrated document downloads.

---

## 🏢 Part 2: Staff Operations (Log in as `mike@imp.com`)

### 1. Operational Dashboard
- **Action**: Log in as a Manager.
- **Highlight**: The KPI cards showing Total Revenue, Loss Ratio, and SLA Violations.

### 2. Decision Making (Claims)
- **Action**: Go to the **Claims Queue**.
- **Highlight**: The priority indicators and SLA deadline countdowns.
- **Action**: Open a claim and use the **WorkspaceShell** to review evidence and adjust the financial settlement.

### 3. Product Innovation
- **Action**: Open the **Product Builder**.
- **Highlight**: The versioning system and the "Customer Preview" mode.

---

## ⚙️ Part 3: System Integrity (Log in as `admin@imp.com`)

### 1. Security Audit
- **Action**: Navigate to the **Audit Center**.
- **Highlight**: The immutable record of every staff decision and login attempt.

### 2. Platform Analytics
- **Action**: Review the **Reports Dashboard**.
- **Highlight**: The revenue trends and loss ratio analytics calculated from historical seed data.
