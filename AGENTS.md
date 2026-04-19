# PROJECT KNOWLEDGE BASE

**Generated:** 2026-04-18
**Commit:** 7e579c6
**Branch:** main

## OVERVIEW
Weetell Digital Health - Icon-based pediatric symptom checker with sound narration, text subtitles, and age-based routing. Next.js 16 + React 19 + Tailwind CSS 4.

## STRUCTURE
```
./
├── src/
│   ├── app/           # Pages (layout, start, checkup, results/*)
│   ├── components/     # Atomic: atoms/, molecules/, organisms/, templates/
│   ├── data/          # Static data (symptom-graph.tsx, doctors.ts, locales.ts)
│   ├── lib/           # Utilities (audio.ts)
│   └── stores/        # Zustand state (useAssessmentStore.ts)
├── public/            # Static assets (svg, videos, captions)
├── dev/               # Development screenshots
└── data/              # Root-level PNG assets
```

## WHERE TO LOOK
| Task | Location | Notes |
|------|----------|-------|
| Main routing | `src/app/` | Next.js App Router |
| State management | `src/stores/useAssessmentStore.ts` | Zustand + persist |
| Symptom logic | `src/data/symptom-graph.tsx` | DAG data structure |
| Components | `src/components/` | Atomic design (atoms→molecules→organisms) |
| Audio system | `src/lib/audio.ts` | SoundManager singleton |
| Page entry | `src/app/page.tsx` | Splash → /start |
| Body map | `src/components/molecules/BodySVG.tsx` | Interactive SVG |

## CONVENTIONS
- Path alias: `@/*` → `./src/*`
- Components: PascalCase, co-located `__tests__/` folders
- State: Zustand with persist middleware (localStorage)
- Animation: framer-motion spring configs (`SPRING_BOUNCY`, `SPRING_SMOOTH`)
- Accessibility: Text labels ON by default, subtitles ON by default

## ANTI-PATTERNS (THIS PROJECT)
- NO `as any` type suppression
- NO `@ts-ignore` comments
- NO direct `localStorage` access (use Zustand `persist`)
- NO CSS transitions for complex animations (use framer-motion)

## UNIQUE STYLES
- Spring physics for all animations (stiffness: 400, damping: 16)
- SubtitleOverlay component for deaf/hard-of-hearing support
- Icon-first UI with optional text labels (toggleable)
- BodySVG uses inline SVG with clickable path regions

## COMMANDS
```bash
npm run dev          # Development server
npm run build        # Production build
npm run lint         # ESLint check
npm run test         # Jest unit tests
npm run test:e2e     # Playwright e2e tests
npm run typecheck    # TypeScript check
```

## NOTES
- `.kilo/` is a nested npm project (AI tooling) - not part of app
- `public/videos/` contains educational content (placeholder)
- No GitHub Actions CI configured
- URL state sync via `nuqs` library
