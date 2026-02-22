# Subscription & Device – Frontend Assignment

A responsive web app with two pages: **Subscription** (plan selection and billing) and **Device** (device list and management). Data is stored in the browser’s local storage.

## Tech stack

- **Framework:** React 18
- **Build:** Vite 5
- **Routing:** React Router 6
- **Styling:** SASS (SCSS modules), no external UI library
- **State:** React Context + useReducer with localStorage persistence
- **Lint / format:** ESLint, Prettier
- **Tests:** Vitest, React Testing Library

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```
2. Run dev server:
   ```bash
   npm run dev
   ```
3. Open [http://localhost:5173](http://localhost:5173).

## Scripts

| Command        | Description                    |
|----------------|--------------------------------|
| `npm run dev`  | Start dev server               |
| `npm run build`| Production build               |
| `npm run preview` | Preview production build   |
| `npm run lint` | Run ESLint                     |
| `npm run lint:fix` | ESLint with auto-fix       |
| `npm run format` | Prettier format              |
| `npm run test` | Run tests in watch mode        |
| `npm run test:run` | Run tests once             |

## Project structure

```
src/
  components/   # Shared layout (header, nav)
  constants/    # Plan and device type config
  pages/        # Subscription, Device (and subcomponents)
  services/     # localStorage read/write
  store/        # App state (Context + reducer)
  styles/       # Global SCSS (variables, mixins, index)
  test/         # Vitest setup
```

## Assumptions and design decisions

1. **Design:** We tried to match the XD designs as closely as possible (pixel-to-pixel where feasible). The UI implements the assignment requirements: two pages (Subscription, Device), responsive layout, clear hierarchy, and consistent spacing/typography. Layout and components are structured so they can be refined further if design tokens or exact specs are provided.

2. **Data and forms:** All data is stored in objects in localStorage (subscription plan, add-ons, card fields, devices). No server submission; controlled inputs and state drive the UI and persistence.

3. **State management:** Context + useReducer was chosen instead of Redux to keep the bundle small and the flow simple. All persistent state is synced to localStorage in the reducer so reloads restore subscription and devices.

4. **Accessibility:** Semantic HTML, `aria-*` where useful (e.g. modals, lists, alerts), focus styles, and a skip-friendly structure. Error messages use `role="alert"` and `aria-live` where appropriate.

5. **Third-party libraries:** See “Third-party libraries” below.

## Third-party libraries

| Library | Purpose | Rationale |
|--------|---------|-----------|
| react, react-dom | UI framework | Assignment requires a modern JS framework; React is widely used and fits the component model. |
| react-router-dom | Routing | Client-side routing for Subscription, Device, and Easy Access pages with clean URLs. |
| sass | Styling | CSS preprocessor per assignment; SCSS modules for scoped styles and variables. |
| eslint, eslint-config-prettier, eslint-plugin-react, eslint-plugin-react-hooks, eslint-plugin-react-refresh | Linting | Code consistency and React best practices. |
| prettier | Formatting | Consistent style; used with ESLint (eslint-config-prettier). |
| vitest, @testing-library/react, @testing-library/jest-dom, jsdom | Testing | Unit and component tests without Jest; fast and Vite-native. |
| vite, @vitejs/plugin-react | Build | Fast dev server and production build; assignment allows Webpack, Rollup, or Vite. |

No external UI library is used; all components and styles are custom.

## Requirements compliance

| Requirement | Implementation |
|-------------|----------------|
| **Data storage** – Store in localStorage, persist across reloads | `src/services/storage.js` read/write; reducer syncs state to localStorage on every update. |
| **User interaction** – All interactive elements, smooth transitions | Plan cards, add-ons, card inputs, device blocks, toggles, upload; CSS transitions on focus/hover. |
| **Responsive** – Desktop and mobile per design | Layout, Subscription, Device use breakpoints; mobile step dropdown, full-width footer, stacked cards. |
| **Performance** – Fast load, lazy load if needed | No heavy assets; optional lazy loading can be added for routes if needed. |
| **Framework** – React | React 18 with hooks. |
| **State management** | Context + useReducer; single source of truth, persisted to localStorage. |
| **Styling** – SASS, no UI library | SCSS modules, variables, mixins; no component library. |
| **Build** – Vite | Vite 5, React plugin. |
| **Accessibility** – WCAG 2.1–oriented | Semantic HTML, aria-labels, roles, focus styles, keyboard support. |
| **Error handling** | try/catch in storage; safe get/set with fallbacks; store supports error state for future UI. |
| **Code quality** | No inline comments; clear names and structure; ESLint + Prettier. |
| **Testing** | Vitest + React Testing Library; unit tests for storage and AppStore. |

## Deliverables

- **Source:** This repo (Git-friendly: clear structure, `.gitignore`, no secrets).
- **README:** This file (setup, scripts, structure, assumptions, libraries).
- **Live demo:** After `npm run build`, deploy the `dist` folder to Netlify, Vercel, or any static host. Configure SPA fallback so `/subscription` and `/device` work on refresh.

## Evaluation checklist (self)

- [x] Two pages: Subscription, Device (plus Easy Access placeholder)
- [x] Responsive layout; desktop and mobile with breakpoints
- [x] Data in localStorage; persists across reloads; objects for subscription and devices
- [x] Interactive elements: plan selection, add-ons, card details, device blocks (type, serial, toggle, upload)
- [x] React + Vite, SASS, no external UI library
- [x] State management: Context + useReducer, persisted in reducer
- [x] ESLint and Prettier configured and runnable
- [x] Unit tests for storage and AppStore
- [x] README: setup, assumptions, third-party libs, requirements mapping
- [x] Git-friendly source; deployable static build (e.g. Netlify/Vercel with SPA fallback)
