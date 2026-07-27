# Project Limitations & Scope Decisions - IMP v1.0.0

The following items were intentionally scoped out for the v1.0.0 engineering freeze or handled via simulations.

## 🚫 Functional Limitations
- **Payments**: The payment step in the Purchase Wizard utilizes a simulation service. There is no integration with real gateways (Stripe, Razorpay).
- **KYC Verification**: Real-party identity verification (OCR/eKYC) is simulated. Users are currently manually verified by Staff in the dashboard.
- **Email/SMS**: Communications are logged to the console/structured logs. No real SMTP or SMS gateway is connected.

## ⚙️ Technical Limitations
- **File Storage**: The platform uses a `LocalStorageProvider`. While an `IStorageProvider` interface exists, a cloud-native S3 implementation is not provided in this version.
- **Scalability**: The background job system uses FastAPI's `BackgroundTasks`. For high-volume production, this should be replaced with `Celery` and `Redis`.
- **Search**: Global search utilizes a database-driven `LIKE` query. A full-text search engine (Elasticsearch) is recommended for production.

## 🔐 Security Decisions
- **Refresh Tokens**: While JWT access tokens are implemented, automatic refresh token rotation was deferred to v1.1.
- **SSL/TLS**: The local setup (Docker) does not include an Nginx SSL configuration.
