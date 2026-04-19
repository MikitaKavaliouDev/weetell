# Organisms

## OVERVIEW
High-level composed components that orchestrate atoms and molecules into interactive selection flows for the pediatric assessment pipeline.

## STRUCTURE
```
organisms/
├── ActionDecision.tsx        # Post-assessment action routing (home/clinic/ER)
├── AgeSelection.tsx          # Age-group picker with icon-based UI
├── BodyMapSelection.tsx      # Body region selector integrated with BodySVG
├── SeveritySelection.tsx     # Symptom severity scale (mild/moderate/severe)
├── SymptomSelection.tsx      # Icon-driven symptom chooser from DAG data
├── UrgencySelection.tsx      # Urgency level indicator and selector
└── __tests__/                # Co-located Jest tests per component
```

## WHERE TO LOOK
| Task | File | Notes |
|------|------|-------|
| Assessment flow entry | `SymptomSelection.tsx` | Consumes `symptom-graph.tsx` DAG |
| Age routing logic | `AgeSelection.tsx` | Determines downstream question sets |
| Body interaction | `BodyMapSelection.tsx` | Wraps `BodySVG` molecule, emits region IDs |
| Severity scoring | `SeveritySelection.tsx` | Maps to urgency calculation |
| Final decision | `ActionDecision.tsx` | Reads store, renders recommendation |
| Test patterns | `__tests__/` | Mock store setup, framer-motion animation testing |
