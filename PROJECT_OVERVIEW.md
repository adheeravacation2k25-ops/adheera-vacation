# Aadhera Vacation - Premium Travel Website

## Project Overview
A fully responsive, modern, premium-looking travel agency website built with React 18, TypeScript, Tailwind CSS, and Framer Motion.

## Architecture

### Tech Stack
- **React 18** - UI library with hooks and concurrent features
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework with custom theme
- **Framer Motion** - Production-ready animations
- **React Router v6** - Client-side routing
- **Lucide React** - Beautiful icons
- **Vite** - Fast build tool

### Project Structure
```
aadhera-vacation/
├── public/                 # Static assets
├── src/
│   ├── components/
│   │   ├── ui/            # Reusable UI primitives
│   │   │   ├── AnimatedCounter.tsx    # Number animation with intersection observer
│   │   │   ├── ScrollReveal.tsx       # Scroll-triggered reveal animations
│   │   │   ├── StarRating.tsx         # Interactive star rating display
│   │   │   ├── LoadingSpinner.tsx     # Loading states and skeletons
│   │   │   └── SectionTitle.tsx       # Animated section headers
│   │   ├── sections/      # Page section components
│   │   │   ├── HeroSection.tsx        # Full-screen hero with search
│   │   │   ├── PopularDestinations.tsx # Filterable destination grid
│   │   │   ├── FeaturedPackages.tsx    # Package cards with discounts
│   │   │   ├── WhyChooseUs.tsx       # Feature cards with icons
│   │   │   ├── Testimonials.tsx       # Animated review carousel
│   │   │   ├── StatsSection.tsx       # Animated counter stats
│   │   │   ├── BlogPreview.tsx        # Blog post cards
│   │   │   ├── FAQSection.tsx         # Accordion FAQ
│   │   │   └── NewsletterSection.tsx  # Email subscription
│   │   └── layout/        # Layout components
│   │       ├── Navbar.tsx             # Sticky glassmorphism navbar
│   │       ├── Footer.tsx             # Multi-column footer
│   │       ├── Chatbot.tsx            # AI chatbot widget
│   │       └── BackToTop.tsx          # Scroll-to-top button
│   ├── pages/             # Route-level pages
│   │   ├── HomePage.tsx              # Landing page composition
│   │   ├── ExplorePage.tsx           # Destination explorer with filters
│   │   ├── PackagesPage.tsx          # Package listings
│   │   ├── AboutPage.tsx             # Company story & team
│   │   ├── ContactPage.tsx           # Contact form & info
│   │   ├── DestinationDetailPage.tsx # Detail view with tabs
│   │   └── BookingPage.tsx           # Multi-step booking flow
│   ├── data/              # Static data
│   │   └── index.ts                  # Destinations, packages, testimonials, etc.
│   ├── hooks/             # Custom React hooks
│   │   └── useScrollAnimation.ts     # Intersection observer & scroll progress
│   └── utils/             # Utility functions
│       └── index.ts                  # Formatters, cn helper, etc.
├── index.html             # HTML entry point
├── vite.config.ts         # Vite configuration
├── tailwind.config.js    # Tailwind with custom theme
├── tsconfig.json         # TypeScript config
└── package.json          # Dependencies
```

## Pages & Features

### 1. Home Page
- **Hero Section**: Full-screen with background image, animated text, search bar with filters, floating particles
- **Popular Destinations**: Category-filterable grid with hover zoom, favorite toggle
- **Featured Packages**: Discount badges, rating display, destination tags
- **Why Choose Us**: Dark section with icon cards and hover effects
- **Stats Section**: Animated counters with intersection observer
- **Testimonials**: Auto-rotating carousel with navigation
- **Blog Preview**: 3-card grid with category badges
- **FAQ Section**: Animated accordion with smooth expand/collapse
- **Newsletter**: Background image overlay with email capture

### 2. Explore Destinations Page
- Advanced filters: Search, Category, Country, Trip Type, Price Range, Rating
- Grid/List view toggle
- Sorting: Featured, Price, Rating, Reviews
- Pagination
- Favorite toggle on cards

### 3. Packages Page
- Similar filtering to Explore
- Discount percentage badges
- Original vs. discounted price display
- Grid/List toggle
- Pagination

### 4. Destination Detail Page
- Image gallery with navigation
- Tabbed content: Overview, Itinerary, Reviews
- Sidebar: Price, booking CTA, contact info, map
- Hotel details with amenities
- Day-by-day itinerary timeline

### 5. Booking Page
- 3-step wizard: Details → Review → Confirm
- Form validation
- Price calculation based on travelers
- Booking reference generation
- Success confirmation

### 6. About Page
- Company story with image
- Mission & Vision cards
- Animated statistics
- Team member grid with hover effects
- Achievement awards

### 7. Contact Page
- Contact info cards (Visit/Call/Email)
- Contact form with validation
- Working hours display
- Social media links

## Key Features

### Animations
- Scroll-triggered reveals (Framer Motion whileInView)
- Staggered entrance animations
- Hover scale/translate effects
- Page transitions
- Loading skeletons
- Animated counters
- Smooth accordion expand/collapse

### UI/UX
- Glassmorphism effects (backdrop-blur)
- Custom gradient backgrounds
- Dark mode toggle (class-based)
- Responsive mobile menu (slide-in drawer)
- Sticky navbar with transparency transition
- Image hover zoom
- Card hover lift effects

### Interactive Elements
- AI Chatbot with suggested questions
- Favorite/heart toggle
- Grid/List view toggle
- Multi-select filters
- Search with real-time filtering
- Pagination
- Form validation

### Design System
- **Colors**: Deep Blue, Ocean Cyan, Sunset Orange, White, Dark Slate
- **Typography**: Playfair Display (headings), Inter (body)
- **Spacing**: Consistent section padding system
- **Shadows**: Layered shadows for depth
- **Borders**: Subtle borders with rounded corners
- **Transitions**: 300ms default, cubic-bezier easing

## Data Model

### Destination
- id, name, country, price, rating, reviews
- description, category, type, image, gallery
- duration, highlights[], included[], hotel{}, itinerary[]

### Package
- id, title, duration, price, originalPrice, discount
- rating, reviews, image, destinations[], category, type, description

### Testimonial
- id, name, location, avatar, rating, text, package

### Team Member
- id, name, role, image, bio

## Performance Considerations
- Lazy loading with Intersection Observer
- Optimized images from Unsplash CDN
- Minimal re-renders with useMemo
- Passive scroll listeners
- CSS transitions over JS animations where possible

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Browser Support
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Android)
