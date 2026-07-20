# Design System Specification - Insurance Management Platform (IMP)

This document serves as the visual contract for the platform. All UI implementation must adhere to these tokens.

## 1. Color Palette

### 1.1 Brand & Neutral
- **Primary (Brand)**: Indigo (`#4f46e5`). Used for primary actions, active states, and brand identity.
- **Neutral**: Slate. Used for text, borders, and subtle backgrounds.
- **Scale**: 50 (lightest) to 950 (darkest).

### 1.2 Semantic (Status)
- **Success**: Emerald (`#059669`). Used for approvals, payments, and positive states.
- **Warning**: Amber (`#f59e0b`). Used for pending items, KYC reviews, and alerts.
- **Danger**: Rose (`#e11d48`). Used for rejections, errors, and destructive actions.
- **Info**: Sky (`#0ea5e9`). Used for help text and informational banners.

## 2. Typography

- **Primary Font**: `Inter` (Variable). High readability for data-dense interfaces.
- **Scale**:
  - `xs`: 12px (0.75rem) - Captions, metadata.
  - `sm`: 14px (0.875rem) - Default Body, form labels, secondary text.
  - `base`: 16px (1rem) - Leading text, primary body content.
  - `lg`: 18px (1.125rem) - Card titles, sub-section headers.
  - `xl`: 20px (1.25rem) - Section headers.
  - `2xl`: 24px (1.5rem) - Page section titles.
  - `3xl`: 30px (1.875rem) - Main Page titles.

## 3. Spacing & Grid

- **Base Unit**: 4px.
- **Scale**:
  - `1`: 4px | `2`: 8px | `3`: 12px | `4`: 16px
  - `6`: 24px | `8`: 32px | `12`: 48px | `16`: 64px
- **Layout Max Width**: `max-w-7xl` (1280px) for portal content.

## 4. Shape & Elevation

### 4.1 Border Radius
- `sm`: 4px - Small badges, tag elements.
- `md`: 6px - Checkboxes, small buttons.
- `lg`: 8px - Main buttons, inputs, dropdowns.
- `xl`: 12px - Cards, main panels.
- `2xl`: 16px - Modals, complex organisms.
- `full`: 9999px - Avatars, pills.

### 4.2 Shadows
- `none`: Flat elements.
- `sm`: Subtle borders (buttons).
- `md`: Standard elevation (Cards, popovers).
- `lg`: High elevation (Modals, dropdown menus).

## 5. Motion & Animation

- **Durations**:
  - `fast`: 150ms (Hover states, toggle switches).
  - `normal`: 300ms (Layout transitions, dropdowns).
  - `slow`: 500ms (Modals, complex entrance animations).
- **Easing**:
  - `standard`: `cubic-bezier(0.4, 0, 0.2, 1)` (In-out).
  - `entrance`: `cubic-bezier(0, 0, 0.2, 1)` (Out).
  - `exit`: `cubic-bezier(0.4, 0, 1, 1)` (In).

## 6. Iconography

- **Library**: Lucide React.
- **Stroke Width**: 2px (Normal), 1.5px (Thin/Subtle).
- **Sizing**:
  - `sm`: 16px (Icons inside buttons/inputs).
  - `md`: 20px (Nav items, card headers).
  - `lg`: 24px (Feature icons, banners).

## 7. Responsive Breakpoints

- `sm`: 640px (Mobile Landscape)
- `md`: 768px (Tablets)
- `lg`: 1024px (Laptops)
- `xl`: 1280px (Desktops)

## 8. Accessibility Rules

- **Focus Indicator**: Always visible. `ring-2 ring-brand-500 ring-offset-2`.
- **Contrast**: Maintain WCAG 2.1 AA standard for text/background ratios.
- **Semantic HTML**: Buttons for actions, Anchors for navigation.
- **Empty States**: Every dynamic list must have an accessible `EmptyState` component.
- **Errors**: Form errors must be linked to inputs via `aria-describedby`.

## 9. Component Classification

### Atoms
Button, Input, Textarea, Checkbox, Radio, Select, Badge, Avatar, Spinner, Icon, Divider.

### Molecules
FormField, SearchBar, Alert, Breadcrumb, Pagination, EmptyState, LoadingSkeleton, NotificationItem, StatCard.

### Organisms
Sidebar, Topbar, Modal, Drawer, DataTable, NotificationCenter, PageHeader, MultiStepWizard.
