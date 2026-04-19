# src/app/

## OVERVIEW
Next.js App Router entry point. Handles splash routing, assessment flow, and result-type branching with URL state sync via `nuqs`.

## STRUCTURE
```
src/app/
├── layout.tsx          # RootLayout: providers, fonts, global metadata
├── template.tsx        # NuqsAdapter wrapper for URL state persistence
├── page.tsx            # SplashPage → auto-redirect to /start
├── globals.css         # Tailwind imports, CSS variables
├── favicon.ico
├── start/
│   └── page.tsx        # Age-based routing entry (pediatric triage)
├── checkup/
│   └── page.tsx        # Symptom assessment flow (icon selection)
└── results/
    ├── page.tsx         # Results hub / summary
    ├── home-care/       # Home care recommendation page
    ├── pharmacy/        # Pharmacy referral page
    ├── consult/         # Doctor consultation page
    ├── map/             # Facility map page
    └── service/         # Service detail page
```

## WHERE TO LOOK
| Need | File |
|------|------|
| Root layout, providers | `layout.tsx` |
| URL state adapter | `template.tsx` |
| Splash / entry redirect | `page.tsx` |
| Age routing logic | `start/page.tsx` |
| Assessment flow | `checkup/page.tsx` |
| Result pages | `results/` subdirs |

## KEY PATTERNS
- **Routing**: File-based App Router. Each `page.tsx` is a route entry.
- **URL state**: `NuqsAdapter` in `template.tsx` wraps children for `nuqs` query param sync.
- **Flow**: `/` (splash) → `/start` (age gate) → `/checkup` (symptom selection) → `/results/*` (outcome pages).
- **Results branching**: Each subdirectory under `results/` represents a distinct care pathway, rendered as separate routes.
