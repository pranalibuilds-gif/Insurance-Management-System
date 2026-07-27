# Database Design - Insurance Management Platform (IMP)

This document translates the Domain Model into a relational schema for PostgreSQL.

## 1. Design Principles
- **UUIDs**: All primary keys use UUID v4 (SQLAlchemy `pk_uuid`).
- **Auditability**: `AuditMixin` provides `created_at`, `updated_at`, `created_by`, and `updated_by`.
- **Integrity**: Strict Foreign Key constraints with appropriate `ON DELETE` actions.
- **Indexing**: High-traffic columns (email, phone, status, policy_number) are indexed.

## 2. Schema Definitions

### Identity & Access (IAM)
#### `users`
- `id`: UUID (PK)
- `email`: VARCHAR(255) (Unique, Index)
- `password_hash`: VARCHAR(255)
- `role`: VARCHAR(50) (Index) - ('ADMIN', 'MANAGER', 'AGENT', 'CUSTOMER')
- `is_active`: BOOLEAN (Index)
- `is_verified`: BOOLEAN

### Customer Management
#### `customers`
- `id`: UUID (PK)
- `user_id`: UUID (FK to `users.id`, Unique, ON DELETE SET NULL)
- `first_name`: VARCHAR(100)
- `last_name`: VARCHAR(100)
- `phone`: VARCHAR(20) (Unique, Index)
- `dob`: DATE
- `kyc_status`: VARCHAR(50) (Index)
- `status`: VARCHAR(50) (Index)
- `address`: JSONB

### Insurance Products
#### `products`
- `id`: UUID (PK)
- `name`: VARCHAR(255) (Index)
- `category`: VARCHAR(50) (Index)
- `description`: VARCHAR(1000)
- `status`: VARCHAR(50) (Index)
- `version`: INTEGER
- `min_coverage`: FLOAT
- `max_coverage`: FLOAT
- `base_premium`: FLOAT
- `waiting_period_days`: INTEGER
- `required_documents`: JSONB
- `premium_frequencies`: JSONB
- `exclusions`: JSONB
- `eligibility`: JSONB
- `is_active`: BOOLEAN (Index)

### Policy Management
#### `policies`
- `id`: UUID (PK)
- `policy_number`: VARCHAR(50) (Unique, Index)
- `customer_id`: UUID (FK to `customers.id`, Index, ON DELETE CASCADE)
- `product_id`: UUID (FK to `products.id`, Index)
- `status`: VARCHAR(50) (Index)
- `coverage_amount`: FLOAT
- `premium_frequency`: VARCHAR(50)
- `premium_status`: VARCHAR(50) (Index)
- `start_date`: DATE
- `end_date`: DATE
- `nominee_ids`: JSONB

### Claims Management
#### `claims`
- `id`: UUID (PK)
- `claim_number`: VARCHAR(50) (Unique, Index)
- `policy_id`: UUID (FK to `policies.id`, Index, ON DELETE CASCADE)
- `status`: VARCHAR(50) (Index)
- `incident_date`: DATE
- `description`: VARCHAR(1000)
- `requested_amount`: FLOAT
- `approved_amount`: FLOAT
- `settlement_amount`: FLOAT
- `risk_indicators`: JSONB

### Billing & Finance
#### `premium_installments`
- `id`: UUID (PK)
- `policy_id`: UUID (FK to `policies.id`, ON DELETE CASCADE)
- `amount`: FLOAT
- `due_date`: DATE
- `status`: VARCHAR(50) (Index)
- `payment_date`: DATE (Nullable)
- `transaction_id`: VARCHAR(100) (Nullable)
- `receipt_number`: VARCHAR(100) (Nullable)

#### `payment_receipts`
- `id`: UUID (PK)
- `receipt_number`: VARCHAR(50) (Unique, Index)
- `installment_id`: UUID (FK to `premium_installments.id`)
- `amount`: FLOAT
- `payment_date`: DATE
- `payment_method`: VARCHAR(50)
- `storage_path`: VARCHAR(500)

### Infrastructure
#### `documents`
- `id`: UUID (PK)
- `title`: VARCHAR(255)
- `category`: VARCHAR(50) (Index)
- `mime_type`: VARCHAR(100)
- `status`: VARCHAR(50) (Index)
- `file_size`: INTEGER
- `storage_path`: VARCHAR(500)
- `current_version`: INTEGER
- `customer_id`: UUID (FK to `customers.id`, Nullable)
- `policy_id`: UUID (FK to `policies.id`, Nullable)
- `claim_id`: UUID (FK to `claims.id`, Nullable)

#### `notifications`
- `id`: UUID (PK)
- `user_id`: UUID (FK to `users.id`, Index, ON DELETE CASCADE)
- `category`: VARCHAR(50) (Index)
- `title`: VARCHAR(255)
- `message`: VARCHAR(1000)
- `type`: VARCHAR(50) (Index)
- `status`: VARCHAR(50) (Index)

#### `audit_logs`
- `id`: UUID (PK)
- `timestamp`: TIMESTAMP (Index)
- `actor`: VARCHAR(255) (Index)
- `action`: VARCHAR(50) (Index)
- `category`: VARCHAR(50) (Index)
- `entity_type`: VARCHAR(50) (Index)
- `entity_id`: VARCHAR(50) (Index)
- `details`: JSONB
- `ip_address`: VARCHAR(50)
