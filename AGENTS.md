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
- **770px and below**: Mobile layout (single column, full width bio, stacked layout)
- **771px and above**: Desktop circular carousel layout

### Circular Carousel Animation (Desktop Only)

**Overview:**
On desktop (>770px), project cards orbit in a circle around the centered bio. Cards remain upright while moving in their circular path.

**Animation Timing (CSS Variables in App.css):**
```css
--circle-carousel-delay: 1s;        /* When first card starts fading in */
--carousel-stagger-interval: 0.5s;  /* Time between each card appearing */
--carousel-fade-in-duration: 1.2s;  /* How long fade-in takes */
--orbit-radius: 450px;              /* Circle radius */
--orbit-duration: 60s;              /* Time for one complete orbit */
```

**Animation Sequence:**
1. **Bio** fades in at 0.2s
2. **Bio links** fade in together at 1.0s
3. **Project cards** fade in with stagger:
   - Card 1: 1.0s
   - Card 2: 1.5s
   - Card 3: 2.0s
   - Card 4: 2.5s
   - Card 5: 3.0s
   - Card 6: 3.5s
4. **Cards start orbiting** immediately when they appear (same delay as fade-in)

**How It Works:**
- Each card uses two animations: `fadeIn` + `orbit[N]`
- Orbit animations use `rotate(Ndeg) translate(radius) rotate(-Ndeg)` to keep cards upright
- Cards are positioned at 60° intervals (6 cards × 60° = 360°)
- Hovering on any card pauses the entire orbit (CSS `:has()` selector)

**Adding More Projects:**

If you add a 7th, 8th, or more project cards:

1. **Update the angle calculation:**
   - New angle interval = 360° ÷ number of cards
   - Example: 7 cards = 51.43° intervals, 8 cards = 45° intervals

2. **Create new orbit keyframes in App.css:**
   ```css
   @keyframes orbit[ANGLE] {
     from {
       transform: rotate([ANGLE]deg) translate(var(--orbit-radius)) rotate(-[ANGLE]deg);
     }
     to {
       transform: rotate([ANGLE+360]deg) translate(var(--orbit-radius)) rotate(-[ANGLE+360]deg);
     }
   }
   ```

3. **Add new nth-child rules in App.css:**
   ```css
   .project-card:nth-child(7) {
     animation:
       fadeIn var(--carousel-fade-in-duration) ease-out
         calc(var(--circle-carousel-delay) + 6 * var(--carousel-stagger-interval)) backwards,
       orbit[ANGLE] var(--orbit-duration) linear
         calc(var(--circle-carousel-delay) + 6 * var(--carousel-stagger-interval)) infinite;
   }
   ```

4. **Update JavaScript constants in Projects.tsx:**
   - The `CIRCLE_CAROUSEL_DELAY` and `CAROUSEL_STAGGER_INTERVAL` constants are already dynamic
   - No changes needed - they automatically calculate: `${CIRCLE_CAROUSEL_DELAY + index * CAROUSEL_STAGGER_INTERVAL}s`

5. **Consider adjusting orbit radius:**
   - More cards = more crowding
   - Increase `--orbit-radius` if cards overlap (try 500px, 550px, etc.)

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