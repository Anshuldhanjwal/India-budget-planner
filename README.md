# India Budget Trip Planner 🇮🇳

A self-contained Next.js 14 budget trip planning web application for destinations across India. It supports metros, heritage cities, hill stations, offbeat villages, Himalayan treks, and spiritual destinations.

## Features

- **109 Destinations & Coords**: Real geographic coordinate support with Haversine x1.3 road distance fallback.
- **60+ Real Trains**: Integrates real Indian train routes with estimated costs (SL, 3A, 2A) and direct IRCTC search links.
- **Trekking Engine**: Supports 20 major Himalayan and regional treks with daily itineraries, permits, campsites, and local gear rental information.
- **DIY vs Package Cost comparison**: Compares trekking budgets side-by-side.
- **Offline Network & ATM Warning System**: Critical red banners and packing alerts if a destination has poor network coverage (BSNL SIM required) or lacks local ATMs.
- **Printable Emergency Wallet Card**: Isolated 85x55mm printable emergency contact card for wallet storage, supporting offline phone calls and hospital listings.
- **Group Cost Splitter**: Divide trip expenses equally or perform "smart splits" excluding non-participants, with WhatsApp share buttons.
- **Comparison Page**: Side-by-side comparison matrix for two different destinations.

## Tech Stack

- **Frontend**: Next.js 14 (App Router) + Tailwind CSS + Lucide Icons
- **Backend**: Next.js API Routes (fully self-contained, no external database or API keys required)
- **Deployment**: Vercel-ready

## Local Setup

1. Clone the repository and navigate to the project directory:
   ```bash
   cd budget_planner
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Sample URLs for Testing

- **City Trip (Direct Route)**:
  [http://localhost:3000/results?source=Delhi&destination=Mumbai&startDate=2026-06-01&days=5&travelers=2&budget=budget](http://localhost:3000/results?source=Delhi&destination=Mumbai&startDate=2026-06-01&days=5&travelers=2&budget=budget)
- **Trek Trip (Multi-leg + Altitude Warning)**:
  [http://localhost:3000/results?source=Delhi&destination=Kedarkantha&startDate=2026-01-15&days=8&travelers=2&budget=budget](http://localhost:3000/results?source=Delhi&destination=Kedarkantha&startDate=2026-01-15&days=8&travelers=2&budget=budget)
- **Side-by-Side Comparison**:
  [http://localhost:3000/compare?dest1=Kasol&dest2=Kheerganga&source=Delhi&days=4&travelers=2&budget=budget&startDate=2026-06-01](http://localhost:3000/compare?dest1=Kasol&dest2=Kheerganga&source=Delhi&days=4&travelers=2&budget=budget&startDate=2026-06-01)
