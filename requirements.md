Technical Architecture and Implementation Report: Weetell Digital Health Platform
1. Executive Summary
1.1 Project Vision and Objectives
The Weetell initiative represents a strategic effort to transform a high-fidelity interface design, originally conceptualized in Framer, into a robust, production-grade web application. The core objective is to replicate the fluid user experience (UX) and sophisticated micro-interactions of the prototype while leveraging the performance, scalability, and maintainability of a modern engineering stack. The target platform is a "Digital Health Interface"—a symptom checker and triage tool—that guides users through a series of diagnostic steps to appropriate care resources.1
The client’s requirements stipulate a specific deployment strategy utilizing subdomains (e.g., app.weetell.media), a static-first data architecture for immediate performance, and a strict adherence to the visual language established in the provided design assets. This report serves as a comprehensive technical blueprint, detailing the architectural decisions, technology stack (centered on Next.js 16), and implementation roadmap required to bridge the gap between design intent and engineering reality.
1.2 Architectural Philosophy
The proposed architecture is built on the principle of "Static Shell, Dynamic Core." Given the request for static data, the application will leverage Next.js’s advanced static generation capabilities to deliver near-instantaneous load times—a critical metric for digital health tools where user anxiety is a factor.1 However, to maintain the "app-like" feel of the Framer prototype, the client-side architecture will utilize heavy hydration of interactive islands, powered by React Server Components (RSC) and a sophisticated state management layer using Zustand.3
This hybrid approach ensures that while the content (questions, logic trees, doctor directories) is statically baked into the application for performance and SEO, the user journey feels alive, responsive, and deeply interactive. The use of Framer Motion will ensure that every transition—from selecting a body part to filtering doctor availability—is physically modeled, providing the tactile feedback that distinguishes premium digital products.4
2. Visual Analysis and Functional Decomposition
A rigorous analysis of the provided design artifacts reveals a complex, multi-step wizard interface. The application acts as a decision support system, collecting user inputs through a series of graphical interfaces and outputting a recommendation or service connection.
2.1 Screen-by-Screen Functional Analysis
The user flow, inferred from the sequential screen captures, dictates the following logical progression:
Screen 1: The Splash Entry (The "Wee" Brand)
Visual Elements: A minimalist screen featuring the "Wee" logo and a speech bubble motif ("Weetell").
Technical Implication: This serves as the application's loading state or entry portal. In a web context, this should be implemented as a layout animation that greets the user before transitioning automatically or via interaction to the language selection.
Interaction Model: A "breathing" animation on the logo followed by a layout expansion where the logo moves to the header position of the subsequent screen.
Screen 2: Localization and Context (The Globe)
Visual Elements: A central globe illustration surrounded by flags (Germany, Spain, Turkey).
Functional Intent: Internationalization (i18n) and market selection. This step is crucial for configuring the downstream logic (e.g., available doctors in Germany vs. Spain).
Data Requirement: A static configuration file mapping locales to specific content flows.
Micro-interaction: The globe should be interactive, perhaps rotating or highlighting based on the user's IP address (geo-sniffing) or hover state. Clicking a flag triggers a zoom-in transition.
Screen 3: Patient Demographics (The Age Triage)
Visual Elements: Illustrations of a baby ("0-3") and a child ("3+").
Functional Intent: Age stratification. Pediatric symptoms often require different logic trees than older children or adults.
Architecture Note: This selection initializes the "Patient Profile" in the global state store. It determines which "Body Outline" (Screen 4 or 7) is displayed next.
Screen 4 & 7: Symptom Localization (The Body Map)
Visual Elements: An outline of a human body (child or infant variant).
Functional Intent: The core triage mechanism. Users tap a body part (head, chest, stomach) to filter symptoms.
Technical Implementation: This requires a complex interactive SVG overlay. We cannot use simple images here; we need raw SVG paths acting as hit targets (<path id="head" onClick={...} />).
Micro-interaction: On hover, the specific body part should glow or scale up (scale: 1.05). On selection, the view should zoom into that region or transition to the specific symptom list.
Screen 5: Symptom Specification (The Head)
Visual Elements: A close-up of the head with icons representing specific conditions (e.g., coins possibly representing "cost/insurance" or mental load, or specific cranial symptoms).
Functional Intent: Granular symptom selection.
Data Structure: This implies a hierarchical data relationship: Region (Head) -> Sub-symptoms.
Screen 6: Severity and Measurement (The Thermometer)
Visual Elements: A distressed face with temperature readings (37.5, 38, 40°C).
Functional Intent: Quantitative data entry.
Input Component: Instead of a standard dropdown, this requires a custom "Slider" or "Discrete Scale" component where users drag or tap to set the severity. The face illustration should ideally react to the value (getting sadder as temperature rises)—a classic "reactive micro-interaction".6
Screen 8: Provider Discovery (Arzt-Auskunft Integration)
Visual Elements: A text-heavy screen titled "Arzt-Auskunft" (Doctor Information), with a search button.
Functional Intent: Integration with a provider directory.
Architecture Decision: Since the request is for "static data," this will likely present a mock search or a pre-filtered list of "recommended" types of doctors based on previous inputs, rather than a live API call to a backend DB in this phase.
Screen 9, 10, 11: Service Selection (Hospital, Pharmacy, Telehealth)
Visual Elements: Icons for a hospital bed, map location marker, pill bottle, video camera, and in-person consultation.
Functional Intent: The "Action" phase. Users choose how they want to receive care (Telemedicine vs. Visit).
Routing Logic: Selecting "Map" triggers a geolocation flow. Selecting "Video" might trigger a scheduling flow.
3. Core Technology Ecosystem: Next.js 16 & React 19
To satisfy the requirement for the "latest version of next.js" and the "best performant strategy," the application will be architected on the bleeding edge of the React ecosystem. Next.js 16 (and the upcoming v16 features) introduces paradigm shifts that fundamentally benefit this type of static, interactive application.7
3.1 The App Router Paradigm
We will exclusively use the App Router (app/ directory) architecture. Unlike the Page Router, the App Router defaults to React Server Components (RSC).
Benefit for Weetell: The static content (the questions, the SVG paths for the body, the logic trees) remains on the server (or is generated at build time). It is not included in the client-side JavaScript bundle. Only the interactive islands (the buttons, the state-tracking logic) are sent to the browser. This results in a minimal "First Load JS" footprint, essential for mobile performance on 3G networks.9
3.2 React Compiler (The "Forget" Project)
Next.js 16 includes support for the React Compiler. We will enable this experimental feature to automatically optimize rendering performance.
Why it matters: In complex wizard forms with animations, developers historically spent hours manually optimizing with useMemo and useCallback to prevent unnecessary re-renders that cause animation jank. The React Compiler handles this automatically, ensuring that when a user toggles a symptom, only the affected UI elements update, maintaining 60fps (or 120fps) animation smoothness without manual overhead.7
3.3 Turbopack for Rapid Iteration
The development environment will leverage Turbopack. As we are tasked with replicating "micro-interactions," the development loop involves tweaking animation spring constants (e.g., stiffness: 300, damping: 20) hundreds of times. Turbopack’s sub-second Hot Module Replacement (HMR) allows developers to see these changes instantly, significantly reducing the "tuning" time compared to Webpack.7
3.4 Partial Pre-Rendering (PPR)
Although the client requested static data, we will architect for Partial Pre-Rendering. This Next.js 16 feature allows us to statically generate the "Shell" of the application (the logo, the layout, the navigation) while keeping the "Content" (the dynamic wizard step) capable of being streamed or suspended if we move to dynamic data later. This future-proofs the app without sacrificing current static speed.7
4. Technical Architecture: Frontend & Component Design
The application will follow an Atomic Design methodology, modified for the Next.js App Router context.
4.1 Component Hierarchy

Fragment kodu


graph TD
    RootLayout --> ProviderLayer
    ProviderLayer --> Template(Animation Shell)
    Template --> PageContent
    
    subgraph "Atomic Library"
        Atom[Atoms: Icons, Labels, Inputs]
        Molecule
        Organism
    end
    
    PageContent --> Organism


4.2 The "Micro-Interaction" Component Strategy
To support the requirement for "micro interactions," we cannot use standard HTML elements. We must build a library of motion-enhanced primitives.
Example: The InteractiveCard Component
This component will be used for the Age Selection and Service Selection screens.
Behavior: It must support a "rest" state, a "hover" state (lift up), a "tap" state (compress), and a "selected" state (ring highlight).
Implementation: Using framer-motion, we define a variants object that encapsulates these physics. We avoid CSS transitions for complex movement to prevent layout thrashing; Framer Motion handles the transform hardware acceleration efficiently.6
4.3 SVG Architecture (The Body Map)
The Body Map (Screens 4 & 7) is the most technically demanding visual component.
Strategy: We will not use <img src="body.svg" />. Instead, we will inline the SVG using @svgr/webpack.
Optimization: This allows us to map the onClick handlers directly to specific paths (e.g., the "Head" path).
State styling: We can pass the activeRegion prop to the SVG component. If activeRegion === 'head', the Head path receives a CSS class or inline fill color change. This avoids replacing the entire image and allows for smooth color transitions.12
5. Static Data Strategy & Graph Architecture
The client’s request for "static data" requires a sophisticated approach to data modeling. We are not just hardcoding text; we are building a static database within the codebase.
5.1 TypeScript Constants vs. JSON
While JSON is the standard for data exchange, TypeScript Constants are the superior choice for internal static data in Next.js 16.
Comparative Analysis:
Type Safety: A TypeScript constant (const DATA: Step = [...]) is validated at compile time. If a developer typos a "nextStepId", the build fails immediately. A JSON file would only fail at runtime, potentially leading to broken links in the wizard flow.14
Tree Shaking: Modern bundlers (Turbopack) are excellent at "tree-shaking" (removing unused code). If we export a massive data object but only use the "Baby" branch on a specific page, the bundler can theoretically exclude the "Adult" branch code from that chunk. JSON files are often bundled in their entirety.
Performance: Importing a TS constant is zero-cost (it's just variable assignment). Parsing a large JSON file requires JSON.parse(), which blocks the main thread during hydration.
5.2 The "Symptom Graph" Data Structure
We will model the application flow as a Directed Acyclic Graph (DAG).
Field
Type
Description
id
string
Unique identifier for the step (e.g., step_body_selection)
type
enum
Render type: choice, body-map, slider, info
question
string
The text prompt (e.g., "Where does it hurt?")
metadata
object
Configuration for UI (e.g., { showThermometer: true })
options
Array
List of available answers
options.nextId
string
The Routing Logic: The ID of the step to load if this option is chosen.

Insight: By embedding the routing logic (nextId) directly into the data options, we create a "self-driving" wizard. The frontend component simply looks at the selected option's nextId to know where to go next, decoupling the UI from the business logic.
6. Micro-Interactions and Animation Engineering
The "Weetell" brand relies on a friendly, animated personality. Replicating the Framer prototype requires physics-based animation, not linear tweens.
6.1 The Physics of "Friendly"
In Framer, animations often use "Spring" physics (mass, stiffness, damping) rather than duration (0.5s ease-in-out). Spring physics feel more natural because they carry momentum.
Global Configuration: We will define a standard spring config:
TypeScript
export const SPRING_BOUNCY = { type: "spring", stiffness: 400, damping: 16 };
export const SPRING_SMOOTH = { type: "spring", stiffness: 200, damping: 20 };

Every interaction in the app will use one of these two presets to ensure consistency.16
6.2 Page Transition Architecture
Navigating between wizard steps needs to feel like a continuous journey, not a series of page reloads.
Challenge: Next.js App Router's layout.tsx does not re-render on navigation, but page.tsx does. This makes exit animations (the old page sliding out) difficult.
Solution: We will use template.tsx. In Next.js, a template is similar to a layout but creates a new instance for each route.
Implementation: We wrap the template.tsx children in an <AnimatePresence mode="wait"> (from Framer Motion). We use a FrozenRouter context to hold the "old" page in the DOM while it animates out, even after the URL has changed. This is the only robust way to achieve cinema-quality page transitions in Next.js 16.17
6.3 Specialized Interactions
The Globe (Screen 2): We will use react-spring or framer-motion 3D transforms to create a parallax effect on the globe as the mouse moves, giving it depth.
The Thermometer (Screen 6): We will map the slider input value (37-41) to the SVG viewBox or path of the face mouth. As the value increases, the mouth curve interpolates from "neutral" to "frown" using useTransform hooks.4
7. State Management Architecture
A Symptom Checker is inherently stateful. We must track the user's journey from the first click to the final result.
7.1 Global State: Zustand
We will use Zustand for global state management. It is lighter than Redux and avoids the "Prop Drilling" hell of native React Context.3
Store Slice: useAssessmentStore
ageGroup: 'baby' | 'child'
locale: 'de' | 'es' | 'tr'
symptoms: Array of selected symptom IDs.
severity: Numeric value.
location: Lat/Long (optional).
7.2 Persistence and Hydration
A critical requirement for web apps is resilience. If the user refreshes the page on Step 5, they should not be sent back to Step 1.
Strategy: We will use Zustand's persist middleware to save the state to localStorage.
The Hydration Gap: Rehydrating state from LocalStorage can cause a "Hydration Mismatch" error (Server renders empty state, Client renders Step 5).
Fix: We will implement a useHydrated hook or a <ClientOnly> wrapper that delays the rendering of the active step until the client has mounted. We will show a loading skeleton during this millisecond gap to prevent layout shift.3
7.3 URL State Synchronization (nuqs)
In addition to internal state, we will sync the current step to the URL (e.g., ?step=fever_check).
Why: This allows the user to use the Browser Back Button naturally.
Library: We will use nuqs (Next.js URL Query Strings), a type-safe library for managing URL state. It acts like a React hook (useQueryState) but writes to the URL bar.20
8. Styling and Design System
8.1 Tailwind CSS v4 Configuration
We will adopt a "mobile-first" styling strategy. Tailwind's utility classes allow us to rapidly style the layout for the small screens shown in the design (mobile frames) and adapt them for desktop if necessary.
Theming: We will extend the Tailwind configuration with the specific colors extracted from the design (The "Wee Blue", the "Alert Red" of the thermometer).
Typography: We will load the specific rounded sans-serif font used in the design (likely something like 'Varela Round' or 'Quicksand') via next/font/google to ensure zero Cumulative Layout Shift (CLS).
8.2 Responsive Design Strategy
The design shows mobile frames. The web app must look good on a desktop too.
Constraint: On desktop, we will center the application in a "mobile-like" container (max-width: 480px) with a blurred ambient background derived from the current step's dominant color. This preserves the design integrity of the mobile-first layouts without stretching assets awkwardly across a 4k monitor.
9. Infrastructure and Deployment: Subdomains
The requirement to "deploy on sub domain" (e.g., app.weetell.media) requires specific configuration in Next.js.
9.1 Middleware-Based Multi-Tenancy
We will use Next.js Middleware to handle the routing.
Mechanism: The middleware.ts file intercepts every request. It checks the Host header.
Logic:
If Host is app.weetell.media, rewrite the request to /app/app-folder.
If Host is weetell.media, rewrite to /app/marketing-folder.
Benefit: This allows us to keep all code in a single repository (Monorepo-style) but serve different content based on the domain. This is cleaner than maintaining two separate Git repositories.22
9.2 CI/CD Pipeline
Vercel Integration: As the creators of Next.js, Vercel is the optimal host. We will configure the Vercel project to assign the wildcard domain *.weetell.media to the project.
Preview Environments: Every Pull Request will generate a preview URL, allowing the client to test the "micro-interactions" on their own device before merging.
10. Performance Optimization Strategy
To meet the "best performant strategy" requirement, we will focus on Core Web Vitals.
10.1 Largest Contentful Paint (LCP)
Optimization: The "Hero" image (likely the Body Map or Globe) will be prioritized using the priority prop in next/image or explicit <link rel="preload"> tags. This tells the browser to fetch this asset before the CSS or JS is fully parsed.
10.2 Cumulative Layout Shift (CLS)
Optimization: We will strictly define width and height on all SVG icons and images. The "Body Map" container will have a preserved aspect ratio (aspect-ratio: 9/16) to prevent the page from jumping as the SVG loads.
10.3 Interaction to Next Paint (INP)
Optimization: This measures how quickly the app responds to a click. By using local state for immediate feedback (e.g., the button turns blue instantly on click) before triggering the "Next Step" logic, we ensure the app feels responsive. The React Compiler further aids this by reducing the main thread work during these interactions.
11. Requirements Specification (requirements.md)
This section provides the exact technical specification document requested for the development team.
Project: Weetell Digital Health Web App
Target URL: https://app.weetell.media (Subdomain)
Framework: Next.js 16(App Router)
Deployment: Vercel (Recommended)
1. Page & Route Inventory
Based on the visual analysis, the application requires the following route structure. Note that due to the wizard nature, these may share a single physical route (/checkup) with dynamic states, but logically they are distinct views.
Screen ID
Route / State
Description
Key Assets/Components
01_Splash
/
Entry point. Logo animation. Auto-redirect.
LogoSVG, SplashLayout
02_Lang
/start
Language/Region selection.
InteractiveGlobe, FlagGrid
03_Age
/checkup?step=age
Age group selection (Baby/Child).
ProfileCard, AgeIcons
04_Body
/checkup?step=body
Body part selection (Front/Back toggle).
InteractiveBodySVG, ZoomPanControls
05_Symptom
/checkup?step=symptom
Detailed symptom list for selected body part.
IconGrid, FilterTabs
06_Severity
/checkup?step=severity
Input specific data (Temp, Pain Level).
EmotionSlider, ThermometerInput
08_Doctors
/results/doctors
List of available doctor types.
DoctorCard, MockDataList
09_Service
/results/service
Choose service type (Hospital, Telehealth).
ServiceIconGrid
10_Map
/results/map
Geolocation/Map view.
StaticMapImage (placeholder), LocationPin

2. Technical Stack Specification
Core: next@latest (v16+), react@rc (v19).
Language: typescript@5.x (Strict mode enabled).
Styling: tailwindcss@3.4, clsx, tailwind-merge (for dynamic class logic).
Animation: framer-motion@11 (Critical for micro-interactions).
State: zustand (Store), nuqs (URL sync).
Validation: zod (Schema validation for form steps), react-hook-form.
Icons: @svgr/webpack (for custom SVGs), lucide-react (for standard UI icons).
Utilities: date-fns (if scheduling is needed), react-use (for browser sensors like geolocation).
3. Data Architecture Strategy
Location: src/data/
Format: TypeScript Constants (.ts).
Files:
locales.ts: Definitions of supported countries/languages.
symptom-graph.ts: The master logic tree linking body parts to symptoms and symptoms to recommended services.
doctors.ts: Mock list of providers for the "Arzt-Auskunft" screen.
Interface Definition:
TypeScript
interface IWizardStep {
  id: string;
  question: Record<string, string>; // Localized strings
  type: 'selection' | 'body-map' | 'input';
  options: {
    id: string;
    label: string;
    iconAsset: string;
    nextStep: string; // The branching logic key
  };
}


4. Detailed Micro-Interaction Requirements
Button Interaction: All primary buttons must use the "Spring Scale" effect: whileHover={{ scale: 1.05 }} and whileTap={{ scale: 0.95 }}.
Body Map Interaction:
Idle: Body outline stroke is light grey (#e5e7eb).
Hover: Specific body part fills with light blue (#dbeafe).
Select: Body part fills with brand blue (#3b82f6) and scales up.
Step Transitions:
Next: Current step slides out Left (x: -100%), New step slides in from Right (x: 100%).
Back: Inverse animation.
Note: Requires tracking "history" to determine direction.
5. Performance & Build Requirements
Target Core Web Vitals:
LCP < 1.2s
CLS < 0.05
INP < 200ms
Static Generation: The app must export as a static build where possible, or use Edge Runtime for the Middleware routing.
Bundle Analysis: Vendor chunks must be split. Heavy libraries (like Lottie players, if used) must be lazy-loaded using next/dynamic.
12. Conclusion
The translation of the Weetell Framer concept into a functional Next.js application is a sophisticated engineering task that balances the competing demands of rich interactivity and static performance. By selecting Next.js 16, we gain access to the App Router and React Compiler, which fundamentally solve the performance bottlenecks associated with complex, animated interfaces.
The decision to use TypeScript Constants for the data layer transforms the application's content into a type-safe, compile-time validated structure, eliminating a defined class of runtime errors common in JSON-based CMS setups. Meanwhile, the Zustand + Nuqs state architecture provides a robust, resilient user session that survives browser refreshes and enables deep-linking—a significant UX upgrade over the prototype.
Finally, the detailed attention to Micro-interactions via Framer Motion ensures that the "soul" of the design—the playful, reassuring feedback loops defined in the original Framer visuals—is not lost in translation, but rather enhanced by the precision of a native code implementation. This report provides the roadmap to deliver not just a website, but a premier Digital Health Interface.
Cytowane prace
Build an AI Symptom Tracker App: Complete Development Guide, otwierano: grudnia 8, 2025, https://topflightapps.com/ideas/ai-symptom-tracker-app-development/
Best practices for using symptom checkers in healthcare orgs - Infermedica Blog, otwierano: grudnia 8, 2025, https://infermedica.com/blog/articles/best-practices-for-symptom-checker-use
Setup with Next.js - Zustand, otwierano: grudnia 8, 2025, https://zustand.docs.pmnd.rs/guides/nextjs
Nextjs Page Transition With Framer-Motion - DEV Community, otwierano: grudnia 8, 2025, https://dev.to/joseph42a/nextjs-page-transition-with-framer-motion-33dg
I Rebuilt 3 Awwwards Page Transitions using Nextjs and Framer Motion (Page Router), otwierano: grudnia 8, 2025, https://www.youtube.com/watch?v=WmvpJ4KX30s
9 Best React Native Animation Libraries in 2025 - F22 Labs, otwierano: grudnia 8, 2025, https://www.f22labs.com/blogs/9-best-react-native-animation-libraries/
Next.js 16, otwierano: grudnia 8, 2025, https://nextjs.org/blog/next-16
The latest Next.js news, otwierano: grudnia 8, 2025, https://nextjs.org/blog
Next.js Features, Use Cases and Setup Guide for Production Apps - Strapi, otwierano: grudnia 8, 2025, https://strapi.io/blog/next-js-explained-features-use-cases-getting-started
The Latest Next.js Features You Need to Know in 2025 | by Ahmed Sekak | Medium, otwierano: grudnia 8, 2025, https://medium.com/@ahmadesekak/the-latest-next-js-features-you-need-to-know-in-2025-f67b57e886c0
Top React animation libraries (and how to pick the right one in 2025) - DronaHQ, otwierano: grudnia 8, 2025, https://www.dronahq.com/react-animation-libraries/
Turbopack: found a better way to inline SVG icons in Next.js 16 : r/nextjs - Reddit, otwierano: grudnia 8, 2025, https://www.reddit.com/r/nextjs/comments/1p1ywso/turbopack_found_a_better_way_to_inline_svg_icons/
Turbopack: A Better Way to Inline SVG in Next.js 16 - DEV Community, otwierano: grudnia 8, 2025, https://dev.to/vitalets/turbopack-a-better-way-to-inline-svg-in-nextjs-16-36em
Configuration: TypeScript - Next.js, otwierano: grudnia 8, 2025, https://nextjs.org/docs/app/api-reference/config/typescript
Angular: whether to use *.constant.ts or .constant.json for storing constants and configs - Stack Overflow, otwierano: grudnia 8, 2025, https://stackoverflow.com/questions/58197183/angular-whether-to-use-constant-ts-or-constant-json-for-storing-constants-an
A Beginner's Guide to Framer Motion in React & Next.js | by Ciril P Thomas | Medium, otwierano: grudnia 8, 2025, https://medium.com/@cirilptomass/a-beginners-guide-to-framer-motion-in-react-next-js-2378c7c1b20d
How to make a page transition with Framer Motion and Next.js 14? - Stack Overflow, otwierano: grudnia 8, 2025, https://stackoverflow.com/questions/77603249/how-to-make-a-page-transition-with-framer-motion-and-next-js-14
Been going crazy for the last few hours. Is it even possible with Next 16 + app router + Framer-motion to have page transitions with enter + exit animations ? : r/nextjs - Reddit, otwierano: grudnia 8, 2025, https://www.reddit.com/r/nextjs/comments/1jp74fz/been_going_crazy_for_the_last_few_hours_is_it/
Advanced page transitions with Next.js and Framer Motion - devblogs.sh, otwierano: grudnia 8, 2025, https://devblogs.sh/posts/advanced-page-transitions-with-nextjs-and-framer-motion
How To Use Zustand With Next Js 16 | Blog, otwierano: grudnia 8, 2025, https://www.dimasroger.com/blog/how-to-use-zustand-with-next-js-16
Confused about Zustand usage within Next : r/nextjs - Reddit, otwierano: grudnia 8, 2025, https://www.reddit.com/r/nextjs/comments/1bs7513/confused_about_zustand_usage_within_next/
Subdomains in Next.js 14 — How to Structure a Scalable Multitenant Frontend Application, otwierano: grudnia 8, 2025, https://trillionclues.medium.com/subdomains-in-next-js-14-how-to-structure-a-scalable-multitenant-frontend-application-f68edc526a60
Dynamic Subdomain Routing With NextJS - Stack Overflow, otwierano: grudnia 8, 2025, https://stackoverflow.com/questions/62590811/dynamic-subdomain-routing-with-nextjs
