# Components

## OVERVIEW

Atomic design system implementing the UI layer across four tiers: atoms, molecules, organisms, and templates.

## STRUCTURE

```
components/
├── atoms/              # Foundational building blocks
│   ├── __tests__/
│   ├── BodyPartIllustrations.tsx
│   ├── InteractiveCard.tsx
│   ├── Logo.tsx
│   ├── ResultsIcons.tsx
│   ├── ServiceIllustrations.tsx
│   └── SymptomIcons.tsx
├── molecules/          # Composed atom groups
│   ├── __tests__/
│   ├── BodySVG.tsx         # Interactive body map with clickable SVG regions
│   ├── CartoonGlobe.tsx
│   ├── FeverChildSVG.tsx
│   ├── InteractiveGlobe.tsx
│   ├── QRCodeModal.tsx
│   ├── SettingsMenu.tsx
│   ├── SubtitleOverlay.tsx # Accessibility: deaf/hard-of-hearing subtitles
│   ├── ThermometerSVG.tsx
│   ├── VideoPlayer.tsx
│   └── WeetellLogo.tsx
├── organisms/          # Complex multi-molecule sections
│   ├── __tests__/
│   ├── ActionDecision.tsx
│   ├── AgeSelection.tsx
│   ├── BodyMapSelection.tsx
│   ├── SeveritySelection.tsx
│   ├── SymptomSelection.tsx
│   └── UrgencySelection.tsx
└── templates/          # Page-level layout shells
    └── PageTransition.tsx
```

## WHERE TO LOOK

| Need | File | Notes |
|------|------|-------|
| Body map interaction | `molecules/BodySVG.tsx` | Inline SVG with clickable path regions |
| Subtitle support | `molecules/SubtitleOverlay.tsx` | Accessibility overlay for narration |
| Symptom flow UI | `organisms/SymptomSelection.tsx` | Icon-based symptom picker |
| Age routing UI | `organisms/AgeSelection.tsx` | Age-group selection component |
| Page transitions | `templates/PageTransition.tsx` | Framer-motion page wrapper |
| Icon assets | `atoms/SymptomIcons.tsx` | Symptom icon components |

## CONVENTIONS

- **Atomic hierarchy**: atoms → molecules → organisms → templates. Never skip levels.
- **Co-located tests**: each subdirectory has its own `__tests__/` folder.
- **Framer-motion**: all animations use spring physics (`SPRING_BOUNCY`, `SPRING_SMOOTH`).
- **No CSS transitions**: use framer-motion for all animation needs.
- **PascalCase**: all component files and exports.
- **Accessibility**: text labels and subtitles are ON by default.
