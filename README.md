# Insurance Management Platform (IMP) v1.0.0

**Status: Engineering Frozen**

The Insurance Management Platform (IMP) is a full-stack, enterprise-grade application built with a **Modular Monolith** architecture. It provides a complete end-to-end solution for insurance acquisition, claim investigation, and operational governance.

## 🌟 Project Highlights
- **Atomic Design System**: 100+ reusable UI components built for consistency.
- **Decision-Driven UX**: Workspaces designed for staff to make high-stakes operational decisions.
- **Transactional Integrity**: Robust state machines for policy issuance and claim settlement.
- **Observability-Ready**: Structured JSON logging with request tracing.

---

## 📽️ Interactive Demo
Follow our [Detailed Demo Script](./docs/demo_script.md) to walk through the most critical user journeys.

---

## 🏗️ Technical Architecture
IMP is engineered for maintainability and scalability through clear separation of concerns.

### [Read the Architecture Overview](./docs/architecture_overview.md)

### Key Technologies
- **Frontend**: React 18, TypeScript, Tailwind CSS, TanStack Query, React Hook Form.
- **Backend**: Python 3.11, FastAPI, SQLAlchemy 2.0, Pydantic V2, Structlog.
- **Database**: PostgreSQL 15.
- **Containerization**: Docker & Docker Compose.

---

## 🚀 Key Modules

### [Customer Portal](./docs/system_design.md#customer-portal)
- **8-Step Purchase Wizard**: From eligibility to authorization.
- **Claim Management**: Investigative case tracking.
- **Financial Ledger**: Installment history and receipt vault.

### [Staff Portal](./docs/staff_portal_architecture.md)
- **Customer 360**: Unified workspace for identity and kyc.
- **Claims Investigative**: Forensic-style evidence review and approval.
- **Product Builder**: Version-controlled design of insurance offerings.
- **BI Analytics**: Real-time business performance reporting.

---

## 🚦 Local Setup

### 1. Clone & Initialize
```bash
git clone https://github.com/pranalibuilds-gif/Insurance-Management-System
cd Insurance-Management-System
```

### 2. Run with Docker Compose
```bash
docker-compose up --build
```

### 3. Generate Historical Demo Data
```bash
cd backend
python -m app.seeds.seed
```

---

## 📖 Engineering Documentation
- [Domain Model](./docs/domain_model.md)
- [Database Schema](./docs/database_design.md)
- [Frontend State Architecture](./docs/frontend_state_architecture.md)
- [Known Limitations](./docs/known_limitations.md)

---

**Release Version**: v1.0.0 (Engineering Freeze)
**Author**: Pranali More
