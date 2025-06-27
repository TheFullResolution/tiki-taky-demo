# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this specific demo.

## Demo Overview

**TikiTaky Checkout Components Demo** showcases Primer's Web Components integration within a realistic travel booking experience. This demo replicates TikiTaky's checkout flow, demonstrating how Primer SDK integrates seamlessly with established travel platforms.

**Target Audience**: Conference attendees, current merchants, potential merchants, Solutions Engineers, and technical decision makers.

## Technology Stack

- **Framework**: React v19.1.0 with TypeScript 5.8.3 (MANDATORY)
- **Build System**: Vite v6.3.5
- **Module System**: ESM (type: "module" in package.json)
- **Payment SDK**: @primer-io/primer-js v0.2.0
- **Package Name**: checkout-components-tikitaky

## Commands

- **Development**: `yarn dev` - Starts Vite dev server on localhost:5173
- **Build**: `yarn build` - TypeScript compilation + Vite build
- **Linting**: `yarn lint` - ESLint with React-specific rules
- **Type checking**: `yarn check-types` - TypeScript type checking only
- **Preview**: `yarn preview` - Preview production build

## Golden Demo Loop Implementation

This demo follows the exact 6-step Golden Demo Loop:

1. **🔄 Fake Loader** (2 seconds) - LoadingState component
2. **🛒 Checkout Page** - Booking summary + Primer SDK integration
3. **💳 Payment Interaction** - Card form with TikiTaky styling
4. **⏳ Processing State** - "Redirecting to payment..."
5. **✅ Confirmation Page** - Success with booking details
6. **🔄 Restart Button** - Loops back to Step 1

## CSS Variables Architecture

### TikiTaky Brand System
```css
:root {
  /* TikiTaky Brand Colors */
  --tikitaky-primary: #007bff;        /* Update with actual brand color */
  --tikitaky-background: #ffffff;
  --tikitaky-text-primary: #212529;
  
  /* Map to Primer SDK variables */
  --primer-color-brand: var(--tikitaky-primary);
  --primer-typography-body-large-font: var(--tikitaky-font-family);
}
```

## Development Notes

- **Single-file demo**: All main logic in App.tsx for easy presentation
- **Company-prefixed CSS**: All variables use `--tikitaky-*` pattern
- **StackBlitz optimized**: External URLs and clean dependencies
- **Conference ready**: Professional polish for live demonstrations

This demo was generated using the Primer SDK Demo Creator and follows all established patterns for professional merchant presentations.