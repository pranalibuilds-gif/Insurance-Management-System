# Domain Model - Insurance Management Platform (IMP)

## 1. Ubiquitous Language
- **Insurance Product**: A reusable template defining coverage, pricing, and rules.
- **Policy**: A legally binding contract instance created from a Product for a specific Customer.
- **Premium Schedule**: The complete set of installments for a policy term.
- **Premium Installment**: A single scheduled payment obligation.
- **Payment**: A financial transaction satisfying an installment.
- **Receipt**: Official acknowledgement of a completed payment.
- **Claim**: A request for compensation under a Policy.
- **Settlement**: The approved financial resolution of a claim.
- **Nominee**: A person designated by the Customer to receive benefits.
- **KYC**: Know Your Customer - identity verification process.

## 2. Core Entities

### Customer
- **Lifecycle States**: `Registered`, `Active`, `Inactive`, `Archived`.
- **KYC States**: `Not Submitted`, `Pending Verification`, `Verified`, `Rejected`.
- **Invariants**: 
    - Min age 18.
    - Nominee share total must be exactly 100%.
    - Email/Phone must be unique.

### Insurance Product
- **Lifecycle States**: `Draft`, `Active`, `Inactive`.
- **Attributes**: Category, Min/Max Coverage, Frequencies, Waiting Period, Required Documents list, Exclusions.
- **Invariants**: 
    - Active products only can be sold.
    - Min Coverage < Max Coverage.

### Policy
- **Lifecycle States**: `Draft`, `Active`, `Lapsed`, `Cancelled`, `Expired`.
- **Invariants**: 
    - Active only if Customer KYC is `Verified`.
    - Coverage must be within Product bounds.
    - Policy Number is immutable once issued.
- **Ownership**: References Customer (Owner) and Nominees (Beneficiaries).

### Billing (Premium & Payment)
- **Entities**: `PremiumSchedule`, `PremiumInstallment`, `Payment`, `Receipt`.
- **Invariants**: 
    - Total Installments = Total Policy Premium.
    - Receipt is generated only after `Payment` is confirmed.
    - Payment must have a unique Transaction ID.

### Claim
- **Lifecycle States**: `Submitted`, `Under Review`, `Verified`, `Approved`, `Rejected`, `Settled`.
- **Attributes**: Claim Type, Incident Date, Estimated Loss, Approved Amount.
- **Invariants**: 
    - Policy must be `Active` on the Incident Date.
    - Incident Date must be within Policy term.
    - Claim Amount <= Policy Coverage.

## 3. Infrastructure Entities
- **Document**: Metadata (File path, Type, OwnerType, OwnerID).
- **Notification**: State (Pending, Sent, Read, Archived).
- **Audit Log**: Immutable, append-only record (Timestamp, Actor, Action, Entity, Changes).
- **Policy Document / Receipt**: Specific business identities for generated legal files.
