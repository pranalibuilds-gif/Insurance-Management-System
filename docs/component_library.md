# Shared UI Component Library - Atoms

This document tracks the usage and API for the core atom components of the Insurance Management Platform.

## 1. Button
**Purpose**: Primary action trigger for forms and navigation.
- **Variants**: `primary`, `secondary`, `outline`, `ghost`, `danger`.
- **Sizes**: `sm`, `md`, `lg`.
- **Props**: `isLoading`, `isIconOnly`, plus standard HTML button attributes.
- **Accessibility**: Support for `focus-visible`, `aria-disabled`. Handles active states and transitions.

## 2. Input
**Purpose**: Standardized text-based user input.
- **Props**: `label`, `helperText`, `error`, `prefixIcon`, `suffixIcon`, `isRequired`.
- **Types**: Supports all native types (`text`, `password`, `email`, etc.).
- **Accessibility**: Automatically links labels and error/helper text via ARIA IDs. Highlights focus with consistent brand ring.

## 3. Card
**Purpose**: Container for grouping related content (e.g., widgets, profile sections).
- **Variants**: `default`, `outlined`, `elevated`.
- **Sub-components**: 
  - `Card.Header`: Optional top section with border and subtle background.
  - `Card.Content`: Main padding area.
  - `Card.Footer`: Optional bottom action area.

## 4. Badge
**Purpose**: Semantic status indicators.
- **Variants**: `success` (Emerald), `warning` (Amber), `danger` (Rose), `info` (Sky), `neutral` (Slate).
- **Sizes**: `sm`, `md`.

## 5. Spinner
**Purpose**: Visual feedback for asynchronous operations.
- **Variants**: 
  - `inline`: Flows with text.
  - `centered`: Flex container for full-width sections.
  - `fullscreen`: Overlay for entire page transitions.
- **Sizes**: `sm`, `md`, `lg`.

---

# Shared UI Component Library - Molecules

## 1. FormField
**Purpose**: High-level wrapper for form elements providing consistent label, helper text, and error states.
- **Props**: `label`, `helperText`, `error`, `isRequired`.
- **Logic**: Automatically handles ARIA attributes and links child inputs to their labels.

## 2. Alert
**Purpose**: Inline messaging for status updates or validations.
- **Variants**: `success`, `warning`, `danger`, `info`.
- **Props**: `title`, `onClose`, `children`.
- **Logic**: Includes preset Lucide icons for each variant.

## 3. SearchBar
**Purpose**: Standard search input with icon and clear action.
- **Props**: `onSearch`, `onClear`, `onChange`.

## 4. Breadcrumb
**Purpose**: Secondary navigation showing the user's location in the hierarchy.
- **Props**: `items` (label, href).
- **Logic**: Automatically prepends a Home link.

## 5. PageHeader
**Purpose**: Standard layout block for the top of every page.
- **Props**: `title`, `description`, `actions`.

## 6. EmptyState
**Purpose**: Descriptive placeholder for views with no data.
- **Props**: `icon`, `title`, `description`, `action` (Primary button).

## 7. StatCard
**Purpose**: Dashboard visual for displaying key performance indicators.
- **Props**: `label`, `value`, `icon`, `trend` (percentage + direction).

---

# Shared UI Component Library - Organisms

## 1. Sidebar
**Purpose**: Primary application navigation.
- **Features**: Collapsible, Nested items, Role-based items, Active route tracking.
- **Logic**: Configuration-driven via `NavigationConfig`.

## 2. Topbar
**Purpose**: Global header providing context and utility actions.
- **Features**: Breadcrumbs, Global search (optional), Notifications bell, User profile.

## 3. DataTable
**Purpose**: Standardized data display for lists.
- **Features**: Sorting, Pagination, Loading states (Skeletons), Empty states.
- **Generic**: Type-safe column accessors.

## 4. Modal
**Purpose**: Overlay for focused tasks or information.
- **Features**: Backdrop blur, Transition animations, Header/Footer slots, Focus trapping (standard behavior).
