# Insurance Management Platform (IMP) v1.0.0

**Status: Development Complete**

The Insurance Management Platform (IMP) is a full-stack, enterprise-grade application designed for the modern insurance industry. It follows a strictly modular monolith architecture, providing comprehensive portals for both customers and operational staff.

## 🚀 Key Features

### Customer Portal
- **Identity & KYC**: Complete onboarding with identity verification and document vault.
- **Product Catalog**: Dynamic insurance plans with eligibility checking.
- **Purchase Wizard**: 8-step transactional workflow with immutable snapshots and integrated payments.
- **Policy Management**: Self-service workspace for coverage overview, timeline, and documents.
- **Claims Center**: Comprehensive claim submission and tracking with evidence management.
- **Billing & Payments**: Financial dashboard with installment tracking and receipt downloads.

### Staff Portal (RBAC-driven)
- **Role-based Dashboards**: Custom views for Agents (Operations), Managers (Governance), and Admins (System).
- **Customer 360**: Centralized workspace for KYC review and customer administrative actions.
- **Claims Investigative Workspace**: Decision-driven case management with financial adjustment tools.
- **Policy Administration**: Global contract management and change history.
- **Product Builder**: Versioned design tool for configuring new insurance offerings.
- **Reports & Analytics**: Business intelligence hub for revenue, loss ratios, and SLA monitoring.

## 🏗️ Architecture

The platform is built on a **Modular Monolith** pattern, ensuring high cohesion and loose coupling between business domains.

### Frontend (React 18 + Vite)
- **Atomic Design System**: Reusable components (`StatCard`, `DataTable`, `WorkspaceShell`).
- **Service/Repository Pattern**: Decoupled UI from data-fetching logic.
- **State Management**: TanStack Query (React Query) for server state and Context API for global UI state.
- **Mock/API Switching**: Environment-aware service factory allows development without a live backend.

### Backend (FastAPI + SQLAlchemy)
- **Layered Design**: Core -> API -> Services -> Models -> Repositories.
- **Database**: PostgreSQL with asynchronous sessions using `asyncpg`.
- **Security**: JWT-based authentication with Role-Based Access Control (RBAC).
- **Observability**: Structured JSON logging and request tracing.

## 🛠️ Technical Stack

- **Frontend**: React, TypeScript, Tailwind CSS, TanStack Query, React Hook Form, Zod, Lucide React.
- **Backend**: Python, FastAPI, SQLAlchemy 2.0, Pydantic V2, Structlog.
- **Database**: PostgreSQL 15.
- **Containerization**: Docker & Docker Compose.

## 📖 Documentation

Detailed engineering artifacts can be found in the `/docs` directory:
- [System Design](./docs/system_design.md)
- [Domain Model](./docs/domain_model.md)
- [Database Design](./docs/database_design.md)
- [Frontend State Architecture](./docs/frontend_state_architecture.md)
- [Staff Portal Architecture](./docs/staff_portal_architecture.md)

---

## 🚦 Getting Started (Local Development)

### 1. Clone the Repository
```bash
git clone https://github.com/pranalibuilds-gif/Insurance-Management-System
cd Insurance-Management-System
```

### 2. Run with Docker Compose
```bash
docker-compose up --build
```
- Frontend: `http://localhost`
- Backend API: `http://localhost:8000/docs`

### 3. Manual Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

### 4. Manual Backend Setup
```bash
cd backend
python -m venv venv
source venv/bin/activate # or venv\Scripts\activate on Windows
pip install -r requirements.txt
uvicorn app.main:app --reload
```

---

## 🔮 Future Expansion (Roadmap)

While the current engineering milestone is complete, the architecture is designed to support:
1. **Cloud-Native Storage**: Switch from `LocalStorageProvider` to `S3Provider` for scalable document management.
2. **Automated Reminders**: Integrate `Celery` or `RQ` for background renewal notifications and claim SLA triggers.
3. **Advanced Underwriting**: Expand the `ProductBuilder` to include complex rule-based pricing engines.
4. **Mobile Experience**: Add React Native support by leveraging the unified `services/` layer.
5. **Real-time Analytics**: Integrate `Socket.io` or FastAPI WebSockets for live operational dashboard updates.

---

**Release Version**: v1.0.0 (Engineering Finalized)
**Author**: Pranali More
