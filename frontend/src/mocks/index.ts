/**
 * Mock Data Architecture
 *
 * This directory contains all static data used during Phase 3 feature development.
 * Keeping mocks separate from components ensures a clean transition to real APIs in Phase 7.
 */

export const mockDelay = (ms = 800) => new Promise((resolve) => setTimeout(resolve, ms));

export * from './auth';
// ... export other domains as they are populated
