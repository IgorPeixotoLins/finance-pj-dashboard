---
name: Precision Enterprise
colors:
  surface: '#f7f9fb'
  surface-dim: '#d8dadc'
  surface-bright: '#f7f9fb'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f4f6'
  surface-container: '#eceef0'
  surface-container-high: '#e6e8ea'
  surface-container-highest: '#e0e3e5'
  on-surface: '#191c1e'
  on-surface-variant: '#45464d'
  inverse-surface: '#2d3133'
  inverse-on-surface: '#eff1f3'
  outline: '#76777d'
  outline-variant: '#c6c6cd'
  surface-tint: '#565e74'
  primary: '#000000'
  on-primary: '#ffffff'
  primary-container: '#131b2e'
  on-primary-container: '#7c839b'
  inverse-primary: '#bec6e0'
  secondary: '#505f76'
  on-secondary: '#ffffff'
  secondary-container: '#d0e1fb'
  on-secondary-container: '#54647a'
  tertiary: '#000000'
  on-tertiary: '#ffffff'
  tertiary-container: '#002113'
  on-tertiary-container: '#009668'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dae2fd'
  primary-fixed-dim: '#bec6e0'
  on-primary-fixed: '#131b2e'
  on-primary-fixed-variant: '#3f465c'
  secondary-fixed: '#d3e4fe'
  secondary-fixed-dim: '#b7c8e1'
  on-secondary-fixed: '#0b1c30'
  on-secondary-fixed-variant: '#38485d'
  tertiary-fixed: '#6ffbbe'
  tertiary-fixed-dim: '#4edea3'
  on-tertiary-fixed: '#002113'
  on-tertiary-fixed-variant: '#005236'
  background: '#f7f9fb'
  on-background: '#191c1e'
  surface-variant: '#e0e3e5'
typography:
  display-lg:
    fontFamily: Hanken Grotesk
    fontSize: 36px
    fontWeight: '700'
    lineHeight: 44px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Hanken Grotesk
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Hanken Grotesk
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 24px
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-caps:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.05em
  data-mono:
    fontFamily: JetBrains Mono
    fontSize: 13px
    fontWeight: '500'
    lineHeight: 16px
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  sidebar-width: 260px
  header-height: 64px
  container-padding: 2rem
  gutter: 1.5rem
  stack-sm: 0.5rem
  stack-md: 1rem
---

## Brand & Style
The design system is engineered for high-stakes corporate environments where clarity, speed of data ingestion, and perceived security are paramount. The brand personality is authoritative yet modern, positioning the product as a reliable partner in financial decision-making. 

The aesthetic follows a **Corporate / Modern** movement with a lean toward **Minimalism**. It prioritizes high-performance data visualization over decorative elements. The emotional response is one of "calm control"—achieved through a structured grid, generous use of whitespace within dense data sets, and a deliberate lack of non-functional ornamentation. Visual depth is handled through subtle tonal layering rather than heavy shadows to maintain a clean, "digital-first" professional atmosphere.

## Colors
The palette is rooted in a professional "Deep Navy Blue" (#0f172a) which serves as the primary anchor for navigation and high-level headers, conveying stability and depth. "Slate Gray" (#64748b) is utilized for secondary information, borders, and inactive states to ensure a clear visual hierarchy that doesn't overwhelm the eye.

Functional accents are strictly reserved for data semantics:
- **Emerald Green (#10b981):** Exclusively for positive growth, success status badges, and "Approve" actions.
- **Professional Red (#ef4444):** Reserved for negative trends, alerts, and "Decline" actions.
- **Neutral Backgrounds:** The system uses a range of cool grays (from #f8fafc to #f1f5f9) to differentiate surface areas without introducing heavy lines.

## Typography
This design system employs a dual-font strategy to balance character with utility. **Hanken Grotesk** is used for headlines and primary UI anchors to provide a sharp, contemporary corporate feel. **Inter** is the workhorse for all body copy and interface labels, chosen for its exceptional legibility in dense layouts.

For financial figures and transaction IDs, **JetBrains Mono** is used at a slightly reduced scale to ensure character alignment in tables, making it easier for users to compare numerical values vertically. 

Mobile considerations: For screens below 768px, `display-lg` scales down to 28px, and `headline-md` scales to 20px to prevent text wrapping on summary cards.

## Layout & Spacing
The layout uses a **fixed-fluid hybrid model**. The sidebar navigation is fixed at 260px, while the main content area utilizes a fluid 12-column grid. 

- **Sidebar:** Positioned on the left, using the Primary Deep Navy Blue as a background to frame the content.
- **Top Header:** Persistent 64px bar for global search, notifications, and profile.
- **Gaps:** A standard 1.5rem (24px) gutter is used between dashboard widgets/cards.
- **Responsive Behavior:** 
    - **Desktop (1280px+):** Full 12-column visibility.
    - **Tablet (768px - 1279px):** Sidebar collapses into a 64px icon rail; grid transitions to 6 columns.
    - **Mobile (<768px):** Sidebar moves to a hidden "hamburger" drawer; all cards stack vertically with 1rem lateral margins.

## Elevation & Depth
To maintain a high-performance, professional look, the design system avoids heavy drop shadows. Instead, it utilizes **Tonal Layers** and **Low-Contrast Outlines**.

- **Level 0 (Background):** #f8fafc (The canvas).
- **Level 1 (Cards/Surface):** White (#ffffff) with a 1px solid border in #e2e8f0. No shadow.
- **Level 2 (Hover/Active):** White (#ffffff) with a very soft, 10% opacity Deep Navy shadow (0 4px 6px -1px) to indicate interactivity.
- **Sidebar Depth:** The sidebar uses its dark color value to create perceived depth, sitting "behind" the main content area which appears to slide over it.

## Shapes
The shape language is **Soft** (roundedness 1). This choice balances the seriousness of the financial industry with modern UI trends. 

- **Standard Elements:** Buttons, input fields, and small cards use a 0.25rem (4px) radius.
- **Large Containers:** Main dashboard cards and modal containers use a 0.5rem (8px) radius.
- **Badges:** Status indicators (e.g., "Paid," "Pending") use a 1rem (pill) radius to distinguish them from interactive buttons.

## Components
- **Summary Cards:** Top-level metrics. Feature a `headline-sm` title in Slate Gray, a `display-lg` value in Deep Navy, and a small `data-mono` trend indicator (Emerald for up, Red for down).
- **Transaction Tables:** Rows should have a subtle hover state (#f1f5f9). Cell text uses `body-md`. The "Amount" column uses `data-mono` and is right-aligned for readability.
- **Buttons:**
    - *Primary:* Solid Deep Navy (#0f172a) with white text.
    - *Secondary:* Outline Slate Gray (#64748b) with a 1px border.
    - *Success:* Solid Emerald (#10b981) for final confirmations.
- **Input Fields:** Search bars in the header should be semi-transparent or light gray (#f1f5f9) with no border, becoming white with a 1px Slate Gray border on focus.
- **Status Badges:** Low-saturation backgrounds with high-saturation text. Example: A "Positive" badge uses a light mint background with Emerald Green text.
- **Sidebar Nav Items:** High-contrast active state using a 3px vertical Emerald line on the far left of the active menu item.