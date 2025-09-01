# Infinite Scrollable Journal Calendar

An infinite-scrolling calendar built with **Next.js**, **TypeScript**, **Tailwind CSS**, and **react-window** for smooth, virtualized week-by-week rendering. Users can view journal entries attached to dates, scroll seamlessly into the past and future, and interact with entries in a swipeable card interface.

---

## 🚀 Tech Stack

* [Next.js (App Router)](https://nextjs.org/docs/app)
* [TypeScript](https://www.typescriptlang.org/)
* [Tailwind CSS](https://tailwindcss.com/)
* [date-fns](https://date-fns.org/)
* [react-window](https://github.com/bvaughn/react-window)

---

## 📂 Project Structure

```bash
src/
 ├─ components/
 │   ├─ calendar/
 │   │   ├─ CalendarCell.tsx
 │   │   ├─ CalendarRow.tsx
 │   │   └─ CalendarTable.tsx
 │   ├─ entry/
 │   │   ├─ EntryCard.tsx
 │   │   └─ EntryCarousel.tsx
 │   └─ ui/...
 ├─ hooks/...
 ├─ lib/...
 ├─ state/...
 └─ types/...
```

---

## ⚙️ Getting Started

```bash
# Install dependencies
bun install

# Start development server
bun dev

# Build for production
bun build
```

The app will be available at [http://localhost:3000](http://localhost:3000).

---

## ✅ Assignment Tasks Checklist

### Calendar Functionality

* [x] Implement **infinite past/future scroll** (used `virtuoso`).
* [x] Ensure **continuous scroll** — not snap-to-month.
* [x] Support **partial visibility of two months** in viewport.
* [ ] Sticky header updates to show the **month with most visible area**.

### Journal Entries

* [ ] Parse and normalize dataset into ISO dates.
* [ ] Render journal entries inside **calendar cells**.
* [ ] Support **multiple entries per day** (show chips or “+X more”).
* [ ] On click, open **swipable card detail UI** (EntryCarousel).
* [ ] Implement prev/next navigation between entries.

### UI & UX

* [x] Build **custom calendar components** (`CalendarCell`, `CalendarRow`, `CalendarTable`) with Tailwind.
* [ ] Add **responsive design** (desktop + mobile grid).
* [ ] Implement **sticky month header**.
* [ ] Add **dark mode support**.
* [ ] Ensure **accessibility** (roles, aria attributes, keyboard nav).

### State & Data

* [ ] Use Zustand store for managing calendar state (selected entry, filters, etc.).
* [ ] Persist journal entries with **localStorage or IndexedDB**.
* [ ] Add actions for **add/edit/delete** journal entries.

### Performance

* [ ] Virtualize rows (weeks) with `react-window` to reduce DOM nodes.
* [ ] Precompute month matrices and cache with `date-fns`.
* [ ] Optimize images with `next/image` (lazy loading + placeholders).
* [ ] Throttle/debounce scroll + intersection observers.

### Deployment

* [ ] Configure Next.js image domains for journal images.
* [x] Deploy to **Vercel**.
* [x] Connect GitHub repo → Vercel for preview deployments.
* [ ] Add final README and documentation.

---
