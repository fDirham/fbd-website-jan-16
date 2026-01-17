# AGENTS.md

This file provides guidance to agents like Claude Code (claude.ai/code) when working with code in this repository.

# Things to always do
- Plan before implementing anything
- Double check work after completion

## Project Structure

This is a React + TypeScript + Vite project. The actual application code is located in the `fbd-website-jan-16-react-app/` subdirectory, not at the repository root.

**Working directory**: All development commands should be run from `/Users/fbd-mac/Desktop/projects/fbd-website-jan-16/fbd-website-jan-16-react-app/`

## Development Commands

All commands must be run from the `fbd-website-jan-16-react-app/` directory:

```bash
# Start development server with HMR
npm run dev

# Build for production (runs TypeScript compiler + Vite build)
npm run build

# Run ESLint
npm run lint

# Preview production build
npm run preview
```

## Tech Stack

- **React 19.2** - Using the latest React with StrictMode enabled
- **TypeScript 5.9** - Strict type checking with project references
- **Vite 7** - Fast dev server with HMR
- **ESLint 9** - Flat config format with TypeScript, React Hooks, and React Refresh plugins

## Architecture

### TypeScript Configuration

The project uses TypeScript project references for separation of concerns:
- `tsconfig.app.json` - Application source code configuration
- `tsconfig.node.json` - Build tooling (Vite config) configuration
- `tsconfig.json` - Root config that references both

### Build System

- **Vite** is configured with the `@vitejs/plugin-react` for Fast Refresh using Babel
- The build process runs `tsc -b` (TypeScript build mode) before Vite bundling
- Output directory: `dist/`

### Linting

ESLint uses the modern flat config format (`eslint.config.js`) with:
- TypeScript ESLint recommended rules
- React Hooks rules (flat config)
- React Refresh rules for Vite
- Browser globals
- ES2020 syntax support

### Entry Points

- `index.html` - Root HTML template (Vite convention)
- `src/main.tsx` - Application entry point, renders App in StrictMode
- `src/App.tsx` - Main application component

## Styling and Components

### Styling Approach

This project uses **vanilla CSS with BEM naming convention** (Block Element Modifier). No CSS modules, preprocessors (SCSS/SASS), or CSS-in-JS libraries are used.

**CSS Files:**
- `src/index.css` - Global reset, font configuration, and base styles
- `src/App.css` - All component styling using BEM naming

### CSS Custom Properties (Design System)

All styling uses CSS variables defined in `:root` in `App.css`:

**Color Variables:**
```css
--color-bg, --color-text-primary, --color-text-secondary
--color-card-bg, --color-link-bg, --color-link-border, --color-link-hover
```

**Spacing Scale (8px base unit):**
```css
--spacing-xxs: 0.25rem (4px)
--spacing-xs: 0.5rem (8px)
--spacing-sm: 1rem (16px)
--spacing-md: 1.5rem (24px)
--spacing-lg: 2rem (32px)
--spacing-xl: 3rem (48px)
```

**Border Radius Scale:**
```css
--border-radius-xxs: 2px
--border-radius-xs: 4px
--border-radius-sm: 8px
--border-radius-md: 12px
--border-radius-pill: 120px
--border-radius-round: 50%
```

**Component-specific sizes:**
```css
--bio-width, --bio-link-icon-size, --project-card-icon-size, --app-top-padding
```

### BEM Naming Convention

**Block-level classes:**
- `.app`, `.bio`, `.bio-link`, `.projects`, `.project-card`

**Element classes (Block__Element):**
- `.bio__headshot`, `.bio__name`, `.bio__title`, `.bio__description`, `.bio__links`
- `.bio-link__icon`, `.bio-link__label`
- `.project-card__header`, `.project-card__icon`, `.project-card__title`, `.project-card__description`

### Component Structure

**Directory:** `src/components/`

Components follow these patterns:

1. **TypeScript interfaces for props** - Always define a props interface:
```typescript
interface ComponentNameProps {
  prop1: string;
  prop2: number;
}
```

2. **Default export** - Components are exported as default:
```typescript
export default function ComponentName({ prop1, prop2 }: ComponentNameProps) {
  // ...
}
```

3. **Presentational vs Container:**
   - **Presentational components** (e.g., `BioLink.tsx`, `ProjectCard.tsx`): Accept props, render UI, no state/logic
   - **Container components** (e.g., `Bio.tsx`, `Projects.tsx`): May use hooks, manage data, render presentational components

4. **BEM classes match component names:**
   - `Bio.tsx` uses `.bio` and `.bio__*` classes
   - `ProjectCard.tsx` uses `.project-card` and `.project-card__*` classes

### Responsive Design

**Breakpoints in App.css:**
- **1024px and below**: Reduce grid columns (e.g., 3 columns → 2 columns)
- **768px and below**: Mobile layout (single column, full width bio, stacked layout)

### Asset Management

**Images/Icons:** Centralized in `src/constants/images.ts` as exported constants:
```typescript
export const ICON_NAME = "/assets/icon-name.svg";
```

Components import and use these constants, selecting different variants based on theme:
```typescript
const icon = theme === 'dark' ? ICON_WHITE : ICON_BLACK;
```

## React Contexts

### Context Pattern (Three-File Structure)

Contexts use a modular three-file pattern in `src/contexts/<context-name>/`:

1. **`<Name>Context.tsx`** - Context definition
2. **`<Name>Provider.tsx`** - Provider component with logic
3. **`use<Name>.ts`** - Custom hook for consuming context

### Example: Theme Context

**File structure:**
```
src/contexts/theme/
├── ThemeContext.tsx
├── ThemeProvider.tsx
└── useTheme.ts
```

### 1. Context Definition Pattern

**File:** `ThemeContext.tsx`

```typescript
import { createContext } from "react";

export type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export default ThemeContext;
```

**Key patterns:**
- Define a TypeScript type/interface for context shape
- Initialize context with `undefined` (enforced by custom hook)
- Use strict TypeScript typing: `ThemeContextType | undefined`
- Export the context as default export
- Export types for use in other files

### 2. Provider Component Pattern

**File:** `ThemeProvider.tsx`

```typescript
import { useState, useEffect } from "react";
import ThemeContext, { Theme } from "./ThemeContext";

interface ThemeProviderProps {
  children: React.ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setThemeState] = useState<Theme>(() => {
    // Lazy initialization: Check localStorage first
    const stored = localStorage.getItem("theme");
    if (stored === "light" || stored === "dark") {
      return stored;
    }

    // Fall back to system preference
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      return "dark";
    }

    return "light";
  });

  // useEffect for persistence and side effects
  useEffect(() => {
    // Apply theme and persist to localStorage
  }, [theme]);

  const toggleTheme = () => {
    setThemeState((prev) => (prev === "light" ? "dark" : "light"));
  };

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
```

**Key patterns:**
- Named export for provider component
- Props interface with `children: React.ReactNode`
- `useState` with lazy initialization function
- `useEffect` for side effects (persistence, system listeners)
- localStorage integration for persistence
- `window.matchMedia()` for system preference detection
- Provide all state and methods in context value

### 3. Custom Hook Pattern

**File:** `useTheme.ts`

```typescript
import { useContext } from "react";
import ThemeContext from "./ThemeContext";

export default function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
```

**Key patterns:**
- Default export for hook
- Validate provider exists with error handling
- Throw descriptive error message if used outside provider
- Return fully typed context value

### 4. Provider Setup in main.tsx

```typescript
import { ThemeProvider } from './contexts/theme/ThemeProvider'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </StrictMode>,
)
```

### 5. Using Context in Components

```typescript
import useTheme from "../contexts/theme/useTheme";

export default function MyComponent() {
  const { theme, toggleTheme } = useTheme();

  // Use theme state or methods
  const icon = theme === 'dark' ? ICON_WHITE : ICON_BLACK;

  return <button onClick={toggleTheme}>Toggle Theme</button>;
}
```

### Context Best Practices

1. **Always use the custom hook** - Never use `useContext()` directly in components
2. **Error boundary** - Custom hook validates provider exists
3. **Type safety** - Full TypeScript typing for context shape
4. **Separation of concerns** - Keep definition, provider logic, and hook separate
5. **Lazy initialization** - Use lazy initializer for expensive initial state
6. **Persistence** - Use `useEffect` for localStorage/sessionStorage persistence
7. **System preferences** - Integrate `window.matchMedia()` when relevant