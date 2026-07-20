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
