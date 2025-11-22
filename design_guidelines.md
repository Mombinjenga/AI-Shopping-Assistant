# AI Shopping Assistant - Design Guidelines

## Design Approach

**Reference-Based Approach** drawing from modern e-commerce and AI product leaders:
- **Airbnb**: Clean card-based product displays, generous whitespace
- **Amazon**: Information-dense product grids, efficient filtering
- **Perplexity AI**: Modern search-first interface, AI summary presentation
- **Linear**: Sharp typography, purposeful spacing

Core principle: Blend e-commerce efficiency with AI-powered intelligence through clean, modern aesthetics.

## Typography

**Font Stack** (via Google Fonts):
- Primary: Inter (400, 500, 600, 700) - UI, body text, product info
- Accent: Sora (600, 700) - Hero headlines, section titles

**Hierarchy**:
- Hero Headline: text-5xl md:text-6xl lg:text-7xl, font-bold (Sora)
- Page Titles: text-3xl md:text-4xl, font-semibold (Sora)
- Section Headers: text-2xl md:text-3xl, font-semibold (Inter)
- Card Titles: text-lg font-medium (Inter)
- Body Text: text-base, font-normal (Inter)
- UI Labels: text-sm font-medium (Inter)
- Captions: text-xs, text-gray-600 dark:text-gray-400

## Layout System

**Spacing Primitives**: Use Tailwind units of 2, 4, 6, 8, 12, 16, 20, 24
- Component padding: p-4 to p-8
- Section spacing: py-12 md:py-20 lg:py-24
- Card gaps: gap-6 to gap-8
- Inline spacing: space-x-4, space-y-6

**Container Strategy**:
- Max-width: max-w-7xl mx-auto px-4 md:px-6 lg:px-8
- Full-bleed sections for hero and featured content
- Contained sections for product grids and content areas

**Grid System**:
- Product Grid: grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4
- Feature Cards: grid-cols-1 md:grid-cols-2 lg:grid-cols-3
- Two-column layouts: grid-cols-1 lg:grid-cols-2

## Component Library

### Navigation Bar
Fixed top navigation with glass morphism effect (backdrop-blur-lg bg-white/80 dark:bg-gray-900/80)
- Logo: Left-aligned, text-xl font-bold
- Main nav links: Center or right-aligned horizontal list with gap-8
- Right section: Dark/light toggle icon button, Login button (rounded-full px-6), User profile avatar
- Mobile: Hamburger menu with slide-out drawer

### Hero Section (Homepage)
Full-width section, min-h-[600px] lg:min-h-[700px]
- Large hero image background (shopping/lifestyle imagery)
- Centered content overlay with backdrop-blur background on search container
- Hero headline with gradient text effect
- Prominent search bar: Large rounded-2xl input with shadow-2xl, h-14 md:h-16
- Search icon inside input, AI sparkle icon to indicate intelligence
- Category quick filters below search as rounded pill buttons

### Product Cards
Elevated card design with hover lift effect
- Image: aspect-[4/3] with rounded-t-xl
- Store badge: Absolute top-right corner, small rounded pill
- Content padding: p-4 to p-6
- Product name: text-lg font-medium, line-clamp-2
- Rating: Star icons + count (text-sm)
- Price section: Large font-semibold for current price, text-sm line-through for original
- Compare button: Full-width rounded-lg at card bottom

### Search Results Layout
Two-column layout for desktop (lg:grid-cols-[300px_1fr])
- Left sidebar: Sticky filters with collapsible sections
- Main area: AI summary card at top (rounded-xl, p-6, subtle border), product grid below
- AI Summary: Includes avatar icon, typewriter-style text, key insights as bullet points

### Room Visualization Feature
Split-screen comparison layout
- Upload zone: Dashed border rounded-xl, drag-and-drop area with icon and instructions
- Preview area: Two-column (before/after) with slider control
- Furniture selector: Bottom drawer or right sidebar with product thumbnails
- Generate button: Prominent gradient button, rounded-full with loading state

### Filtering Panel
Sticky sidebar component
- Section headers: text-sm font-semibold uppercase tracking-wide
- Price range: Dual-handle slider
- Checkboxes: Custom styled with rounded borders
- Category tags: Multi-select pills with close icons
- Apply/Reset buttons at bottom

### Footer
Multi-column layout (grid-cols-1 md:grid-cols-2 lg:grid-cols-4)
- Newsletter signup: Email input with inline submit button
- Quick links columns: About, Contact, Help, Legal
- Social icons: Circular icon buttons in row
- Copyright and trust badges at bottom

## Images

**Hero Section**: 
Large lifestyle image showing modern shopping/home environment. Image should be bright, aspirational, featuring diverse products or a beautifully styled room. Size: 1920x1000px minimum, optimized for web.

**Product Images**:
Clean white/neutral backgrounds, consistent aspect ratio (4:3), high resolution product photography showing items clearly.

**Room Visualization**:
Sample room photos for demo purposes - modern living room, bedroom, kitchen with neutral styling to showcase furniture overlays effectively.

**About Page**:
Team photos or workspace imagery showing authentic, professional environment.

Icons: Use Heroicons (outline + solid variants) via CDN for all UI icons.