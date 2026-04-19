# Molecules Components

## OVERVIEW
Composite UI building blocks that combine atoms into functional interface elements for the pediatric symptom checker.

## STRUCTURE
```
molecules/
├── BodySVG.tsx           # Interactive body map with clickable SVG paths
├── CartoonGlobe.tsx      # Animated globe illustration
├── FeverChildSVG.tsx     # Fever symptom illustration
├── InteractiveGlobe.tsx  # Clickable globe for location selection
├── QRCodeModal.tsx       # QR code display modal
├── SettingsMenu.tsx      # App settings dropdown
├── SubtitleOverlay.tsx   # Accessibility subtitles (deaf/HoH support)
├── ThermometerSVG.tsx    # Temperature visualization SVG
├── VideoPlayer.tsx       # Educational video player
├── WeetellLogo.tsx       # Brand logo component
└── __tests__/            # Component unit tests
```

## WHERE TO LOOK
| Task | File | Notes |
|------|------|-------|
| Body part selection | `BodySVG.tsx` | Inline SVG, clickable `<path>` regions, returns selected body part ID |
| Subtitles/a11y | `SubtitleOverlay.tsx` | Critical for deaf/HoH users, syncs with audio narration |
| Location picker | `InteractiveGlobe.tsx` | Clickable globe, emits country/region selection |
| Settings | `SettingsMenu.tsx` | Language, label toggle, subtitle toggle |
| Video content | `VideoPlayer.tsx` | Plays educational videos from `public/videos/` |
| QR sharing | `QRCodeModal.tsx` | Modal wrapper, generates shareable QR codes |
