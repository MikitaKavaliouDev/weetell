WEEtell GmbH
Tax ID: 41/767/00160
Address: WEEtell GmbH
Altonaer Poststr. 9a
22767 Hamburg
Represented by : Natalie Williams and Isabel
Lenuck.
Email: mail@nataliewilliams.de
Phone :+49 173 6950 273
This agreement is entered into by and between Ziro Sp. z o.o. (“Designerˮ) and
WEEtell GmbH(“Clientˮ) as of the date of signing.
Symptom Navigation &
Educational Guidance Web
Application
Ziro sp. z o.o
ul. Mogilska 43, 31-545 Kraków
NIP: 675 180 17 84
Represented by Nikhil Singh
Email: nikhil@ziro.health
Phone : +48 509 654 467
https://ziro.health/
Symptom Navigation &
Educational Guidance Web
Application
Project Specification Document
Executive Summary
This web application provides a structured, non-diagnostic pathway for caregivers to
navigate pediatric health symptoms, access educational resources, and determine
appropriate next steps. The system guides users through body part selection, symptom
identification, and evidence-based action recommendations while emphasizing that it
does not replace professional medical diagnosis.
Project Overview
1. Scope of Work
Design and develop a complete icon-based, sound-driven web application with:
• Icon-based interface with optional text labels for accessibility
• Sound narration and feedback for all interactions
• Text support for deaf and hard-of-hearing users
• Three age groups: WEE Baby (0-3), WEE Child (3-11), WEE Teen (12-21)
• Complete workflow from entry → age selection → body part → symptom → action
decision → educational content
• Initial release focuses exclusively on FEVER symptom pathway (additional
symptoms planned for future versions)
• Embedded educational videos (no QR codes for content)
• Responsive design for mobile, tablet, desktop
• Fully functional web application as primary deliverable
2. Deliverables
• Fully functional web application (icon-based, sound-driven)
• Complete design system (icons, colors, typography, sound specifications)
• Responsive web application covering all user journeys
• Asset library (icons, graphics, embedded videos)
• Documentation: Icon meaning guide, sound design specifications, content
structure, deployment guide
• Source code and deployment files
3. Timeline
For the WEE Web Application:
• Project kickoff: March 02, 2026
• Final delivery: April 13, 2026 (5 weeks from kickoff)
Timeline may be adjusted depending on feedback cycles and content availability;
collaboration will ensure transparency about progress and timing.
4. Pricing & Payment Terms
Total Fixed Project Fee: €3,500
Payment Structure:
• €1,000 due immediately upon project start (invoice submitted at kickoff - March
02, 2026)
• €2,500 due upon delivery of final application and all associated deliverables
Payment Terms:
• Payment is due in full upon delivery of the final application and all associated
deliverables
• Developer will submit invoices: €1,000 at project start + €2,500 at project
completion
• Any additional work beyond the agreed scope will be billed separately at the
agreed hourly rate, with prior client approval
Purpose
The application serves as an educational tool to help caregivers:
• Navigate pediatric symptoms systematically through icon-based, sound-driven
interface
• Access age-appropriate health information via embedded educational video
content
• Make informed decisions about whether to wait and monitor or seek medical
attention
• Reduce unnecessary clinical visits while ensuring serious symptoms receive
appropriate care
Access Methods: The application can be accessed via two methods:
• QR code scan: Primary method enabling quick entry without typing
• Regular web link: Direct URL access via browser
Both entry points lead to the same icon-based, sound-driven interface.
Target Audience
• WEE Baby (0-3 years): Parents and caregivers of infants and toddlers
• WEE Child (3-11 years): Parents and caregivers of young children
• WEE Teen (12-21 years): Parents, caregivers, and teens themselves
• Healthcare navigators seeking decision support tools
• Non-clinical users requiring accessible health information
• International users requiring language-independent interface
Key Principles
• Non-diagnostic: Explicitly not a medical diagnosis tool
• Educational: Provides information and guidance, not treatment recommendations
• Accessible: Icon-based, sound-driven interface with no text dependency
• Evidence-based: Embedded video content provides vetted educational materials
• Universal: Works across language barriers through visual and audio
communication
Functional Requirements
FR1: Welcome & Entry
Description: Initial entry point accessed via QR code or web link, with icon-based and
sound-driven interface.
User Story: As a caregiver, I want to quickly access the app by scanning a QR code or
using a web link and navigate using icons and sound without needing to read text.
Acceptance Criteria:
• App entry via QR code scan OR regular web link
• Display welcome screen with icons and sound
• Icon-based navigation throughout entire application with optional text labels
• Sound feedback for all interactions
• Text subtitles visible on-screen for all audio narration (for deaf users)
• Visual disclaimer icon indicating non-diagnostic nature
• Interface works universally without language barriers
FR2: Age Selection
Description: User categorizes the affected individual into age-appropriate groups using
icons.
User Story: As a caregiver, I want to specify the age range of the person with symptoms
using visual icons so that I receive age-appropriate guidance.
Acceptance Criteria:
• Present three age categories with distinct icons: WEE Baby (0-3 years), WEE Child
(3-11 years), WEE Teen (12-21 years)
• Display clear visual distinction between age groups through iconography
• Optional text labels below each icon (e.g., "0-3 years", "3-11 years", "12-21 years")
• Sound feedback when icon is selected with synchronized text display
• Allow single selection only
• Route subsequent content based on age selection
• Enable back navigation to change selection
FR3: Body Part Selection
Description: Visual interface for selecting the affected body region.
User Story: As a caregiver, I want to identify which body part is affected so that I can see
relevant symptoms for that area.
Acceptance Criteria:
• Display interactive body diagram with selectable regions
• Include all major body parts: Head, Arms, Chest/Torso, Abdomen, Legs, Back, Skin
(general)
• Highlight selected body part on click/tap
• Provide clear visual feedback for selection
• Support touch and mouse interaction
FR4: Body Location Confirmation
Description: Confirmation screen asking "Where does it hurt?" / "Wo tut es weh?" to
identify the body location experiencing symptoms, using icons and sound.
User Story: As a caregiver, I want to identify where the pain or symptom is located using
visual icons so that the guidance is appropriately directed.
Acceptance Criteria:
• Display "Where does it hurt?" / "Wo tut es weh?" prompt using icon and sound
• Show text subtitle on screen for the prompt (multilingual support)
• Show body diagram with selectable areas (icon-based interaction)
• Sound feedback when body area is selected with text confirmation displayed
• Text labels available for body parts when selected
• Allow single selection
• Proceed to symptom selection after confirmation
FR5: Symptom Selection
Description: Present symptoms relevant to the selected body part and age group using
icons only (no text).
User Story: As a caregiver, I want to select the specific symptom affecting the body part
using visual icons so that I receive targeted information.
Acceptance Criteria:
• Display symptoms as icon-based grid specific to selected body part
• Initial release: FEVER symptom only (other symptoms planned for future
versions)
• Icons must be universally recognizable with optional text labels below
• Sound feedback when icon is selected with text confirmation displayed
• Filter symptoms by age appropriateness
• Support single symptom selection per journey
FR6: Symptom Detail & Educational Content
Description: Provide detailed information about the selected symptom with embedded
educational video content.
User Story: As a caregiver, I want to understand more about the symptom through
embedded video so that I can make an informed decision without leaving the app.
Acceptance Criteria:
• Display symptom-specific detail screen with icon representation and text heading
• For temperature-related symptoms, provide temperature range selection using
visual thermometer icons with text labels
• Embed educational video directly in the interface (no QR code required)
• Videos play within app with sound and visual content
• Sound-based narration for all video content with synchronized on-screen text
subtitles
• Videos include closed captions/subtitles for deaf users
FR7: Action Decision (Wait or Doctor)
Description: Present two primary pathways using icons: monitoring at home or seeking
medical attention.
User Story: As a caregiver, I want guidance on whether to monitor at home or seek
medical care so that I can take appropriate action.
Acceptance Criteria:
• Display two clear action icons: Wait (clock/home), Doctor (stethoscope/hospital)
• Optional text labels below icons ("Monitor at Home" / "See Doctor")
• Sound explanation for each pathway with synchronized text display
• "Wait" pathway leads to self-care guidance
• "Doctor" pathway leads to medical consultation recommendation
• Design avoids creating anxiety while maintaining clarity
FR8: Wait Pathway & Monitoring Guidance
Description: Provide home monitoring instructions and self-care resources using icons
and sound.
Acceptance Criteria:
• Display "Wait Screen" with icon-based monitoring instructions and text
descriptions
• Embed home care video guidance with subtitles/closed captions
• Include warning sign icons with text explanations requiring medical escalation
• Provide pharmacy option navigation with text label
FR9: Pharmacy Option
Description: Icon-based guidance for pharmacy resources.
Acceptance Criteria:
• Display pharmacy icon as endpoint option with text label
• Sound guidance for pharmacy consultation with text subtitle display
• Non-prescriptive visual and textual communication
FR10: Doctor Pathway
Description: Icon-based recommendation for professional medical consultation.
Acceptance Criteria:
• Display urgency level icons (routine/urgent/emergency) with text labels
• Sound guidance for medical consultation with text subtitle display
• Restart or end session options with text labels
FR11: Navigation & Back Functionality
Description: Icon-based navigation throughout workflow.
Acceptance Criteria:
• Icon-based "Back" functionality on all screens except Welcome
• Preserve selections when navigating backward
• Restart option available
Non-Functional Requirements
NFR1: Performance
• Page load < 2 seconds on 4G connection
• Responsive interface with no interaction lag
• Video embedding optimized for quick playback
NFR2: Accessibility
• WCAG 2.1 AA compliance minimum
• Screen reader compatible via backup text
• Keyboard navigation support
• Minimum touch target size: 44x44 pixels
• Contrast ratio: 4.5:1 for text, 3:1 for UI components
• Text labels and subtitles for all audio content (deaf user support)
• Toggle option to show/hide text labels for icon-based navigation
• All video content includes synchronized closed captions
NFR3: Compatibility
• Support modern browsers: Chrome, Firefox, Safari, Edge (last 2 versions)
• Responsive design: mobile, tablet, desktop
• iOS 14+ and Android 10+ support
• Progressive Web App (PWA) capability recommended
NFR4: Security & Privacy
• No collection of personal health information in current version
• No user accounts or authentication required
• Session data stored locally only (localStorage or sessionStorage)
• HTTPS required for all deployments
• GDPR and COPPA compliant (no tracking of minors)
• Future version: Optional health data collection with explicit consent and secure
storage
NFR5: Usability
• Maximum 3-click depth to reach educational content
• Clear visual hierarchy and intuitive navigation
• Consistent UI patterns throughout application
Technical Architecture
System Overview
• Single-page application (SPA) architecture
• Client-side routing for navigation
• Static site generation for optimal performance
• Embedded video content with reliable hosting
Technology Stack (Recommended)
Frontend:
• Framework: React, Vue.js, or Svelte
• Styling: Tailwind CSS or CSS-in-JS
• State Management: Context API or lightweight state library
• QR Code Generation: qrcode.react or similar library
Hosting:
• Static hosting: Vercel, Netlify, or AWS S3/CloudFront
• CDN for global performance
Content Management:
• JSON configuration files for symptom mapping
• Headless CMS optional (Contentful, Strapi)
Data Structure
Symptom Data Model Example:
{
"bodyPart": "head",
"ageGroup": "3-11",
"symptoms": [
{
"id": "fever",
"name": "Fever",
"iconUrl": "/icons/fever.svg",
"videoUrl": "/videos/fever-child.mp4",
"details": [
{"range": "37.5°C", "videoUrl": "/videos/fever-low.mp4"},
{"range": "38-39°C", "videoUrl": "/videos/fever-medium.mp4"},
{"range": "40°C+", "videoUrl": "/videos/fever-high.mp4"}
],
"waitGuidance": "/videos/fever-wait.mp4",
"doctorGuidance": "/videos/fever-doctor.mp4"
}
]
}
User Interface Design
Design Principles
• Icon-based interface with optional text labels for accessibility
• Sound-driven navigation and feedback with text subtitle support
• Friendly and reassuring visual tone
• Clean, uncluttered layouts with focus on graphics
• Large, easy-to-tap interactive icon elements
• Warm, calming color palette
• Universally recognizable iconography that works across cultures and languages
• High-quality graphics and visual design
• Audio narration and sound effects for all interactions
• On-screen text subtitles for deaf and hard-of-hearing users
• Toggle functionality for text display (on by default, can be hidden)
Visual Style Guidelines
Color Palette:
• Primary: Soft blues and greens (calming, healthcare-associated)
• Accent: Warm yellows or oranges (friendly, approachable)
• Alerts: Soft red for doctor pathway (not alarming)
• Background: Light, neutral tones
Typography:
• Font family: 'Helvetica Neue', Helvetica, 'Segoe UI', Arial, sans-serif
• Web font loading: Use system Helvetica Neue or load via @font-face for
consistency
• Clear hierarchy: headings (24-32px), body (16-18px), captions (14px)
• Font weights: Regular (400) for body, Bold (700) for headings
• Adequate line spacing (1.5-1.6)
• CSS implementation: Ensure Helvetica Neue is prioritized with proper fallback
chain
Iconography (Critical - Icon-First Design with Text Support):
• Simple, universally recognizable icons for body parts and symptoms
• Icons paired with optional text labels below for clarity and accessibility
• Text labels can be toggled on/off (on by default)
• Consistent style throughout (line icons or filled icons, not mixed)
• Cultural sensitivity in body representation
• High contrast and clear visual distinction between icon types
• Sound pairing with each icon and synchronized text display
• Testing with diverse user groups to ensure icon and text comprehension
Sound Design:
• Audio feedback for every interaction
• Narration for symptom information and guidance
• Pleasant, non-alarming sound effects
• Adjustable volume controls
• Option to replay audio instructions
Content Requirements
Educational Video Content
• Duration: 2-5 minutes per topic
• Format: MP4, embedded directly in app interface
• Audio narration: Sound-based explanation (language-specific versions available)
• Visual-first content: Strong visual storytelling that works without audio for deaf
users
• Accessibility: Synchronized closed captions/subtitles REQUIRED for all videos
(multilingual)
• Text subtitles displayed prominently on-screen during video playback
• Subtitle styling: High contrast, easy-to-read font, adequate size (minimum 18px)
• Content review: Medical professional validation
• Embedding support: Videos must be optimized for in-app playback
Audio and Visual Content (Icon-First with Text
Support)
• Audio narration in multiple languages for accessibility
• Icon-based navigation with optional text labels for clarity
• On-screen text subtitles for all audio narration (deaf user support)
• Visual graphics and animations to convey information
• Sound effects and audio cues for all interactions with text confirmation
• Regular content updates based on medical guidelines
• Visual disclaimers using icons with text explanations
• Backup text for screen readers and accessibility tools
• Toggle functionality allowing users to show/hide text labels
Quality Assurance
Testing Requirements
Functional Testing:
• Complete user journey testing for all pathways
• QR code functionality verification
• Cross-browser compatibility testing
• Mobile responsiveness testing
Usability Testing:
• User testing with target audience (parents/caregivers)
• Navigation flow validation
• Content clarity assessment
• Accessibility audit
Content Validation:
• Medical professional review of all educational content
• Legal review of disclaimers
• Audio/visual content accuracy verification
Project Phases
Phase 1: Foundation (Week 1)
• Requirements finalization and stakeholder approval
• Technology stack selection
• UI/UX design mockups
• Content structure definition
Deliverable: Design system and technical architecture document
Timeline: March 2-9, 2026
Phase 2: Core Development (Weeks 2-3)
• Frontend application development
• Navigation and routing implementation
• QR code integration
• Symptom data structure implementation
• Icon library integration
Deliverable: Functional application shell with navigation
Timeline: March 9-23, 2026
Phase 3: Content Integration (Weeks 3-4)
• Educational video embedding
• Content population for all body parts and symptoms
• Sound effects and audio narration integration
• Multi-age group content differentiation
Deliverable: Complete application with all content
Timeline: March 23 - April 6, 2026
Phase 4: Testing & Refinement (Week 5)
• QA testing (functional, usability, accessibility)
• User acceptance testing with target audience
• Bug fixes and performance optimization
• Final adjustments based on feedback
Deliverable: Production-ready application
Timeline: April 6-13, 2026
Phase 5: Launch & Monitoring (Week 5+)
• Production deployment
• Analytics setup for usage monitoring
• User feedback collection mechanisms
• Ongoing content updates and maintenance
Deliverable: Live application with monitoring dashboard
Timeline: April 13, 2026 onwards
Success Metrics
Usage Metrics
• Number of completed user journeys
• Most common symptom pathways
• Wait vs. Doctor pathway distribution
• QR code scan rates for app entry
• Video completion rates (embedded content)
• Icon interaction patterns
• Sound playback and replay frequency
• Future version: Health data collection opt-in rates
Performance Metrics
• Average session duration
• Navigation patterns (forward/backward usage)
• Drop-off points in the workflow
• Page load times
• Video buffering times
Outcome Metrics (if data available)
• Reduction in non-urgent clinical visits
• User satisfaction scores
• Content comprehension assessment
Risk Management
Identified Risks
Risk Impact Mitigation
Medical liability concerns High Strong disclaimers, legal review, no diagnosis
Content accuracy High Medical professional validation process
User misinterpretation Medium Icon testing, usability testing
Video hosting reliability Medium Use reliable CDN, fallback options
Technology compatibility Medium Comprehensive browser testing
Tight timeline Medium Clear milestones, regular check-ins
Compliance & Legal
• Medical Disclaimer: Prominent on every screen stating non-diagnostic nature
• Data Privacy: GDPR, COPPA compliance (no personal data collection)
• Accessibility: WCAG 2.1 AA compliance
• Content Licensing: Ensure proper licensing for all educational videos
• Terms of Use: Clear terms regarding appropriate use of application
Client Collaboration
• Provide timely and constructive feedback to help keep the project on schedule
• Share any necessary content, branding materials, or information early to enable
smooth progress
• Work collaboratively with the Developer to clarify requirements and avoid scope
changes that could affect timelines or costs
• Developer will communicate promptly if additional work beyond the agreed scope
might be needed
Confidentiality
Both parties agree to keep proprietary information confidential during and after the
duration of this agreement, except as necessary to execute the project or if otherwise
agreed in writing.
Termination
Either party may terminate the agreement with written notice. In such cases,
compensation will be prorated for the work completed up to the termination date.
Maintenance & Support
Post-Launch Support Terms
• Developer will provide maintenance and support services for a period of 2 weeks
following final delivery, including minor revisions and adjustments to the
application
• Support beyond this period or for requests involving major changes or new
features will be billed at the agreed hourly rate
• Client will submit support requests in writing; Developer will respond within 2
business days
• Maintenance does not include significant redesigns or implementation of new
functionalities without separate agreement
Ongoing Maintenance
• Regular content updates aligned with medical guidelines
• Security patches and dependency updates
• Browser compatibility monitoring
• Performance monitoring and optimization
Support Structure
• FAQ section for common technical issues
• Feedback mechanism for content suggestions
• Contact information for technical support
• Content review schedule (quarterly recommended)
Developer Portfolio Rights
Developer may use the work in portfolio or case studies unless Client requests
confidentiality.
Acceptance
By signing or approving this specification document, both parties agree to the terms and
conditions outlined above.
Appendices
Appendix A: Symptom Coverage Map
Initial Release (v1.0): FEVER ONLY
The initial release focuses exclusively on the fever symptom pathway across all three age
groups (WEE Baby, WEE Child, WEE Teen). This allows for complete development, testing,
and validation of the core application architecture and user experience before expanding
to additional symptoms.
Body Part v1.0 Symptoms Future Symptoms (Planned)
Head Fever Concussion, Headache, Cut, Bump
Arms - Fracture, Sprain, Cut, Rash
Chest - Breathing difficulty, Cough, Chest pain
Abdomen - Stomach ache, Vomiting, Diarrhea
Legs - Fracture, Sprain, Growing pains
Back - Back pain, Posture issues
Skin (general) - Rash, Allergic reaction, Burns
Rationale for Fever-Only Initial Release:
• Fever is one of the most common pediatric symptoms requiring caregiver
guidance
• Allows focused development of temperature-range selection interface (37.5°C, 38-
39°C, 40°C+)
• Enables comprehensive testing of all application features with single symptom
pathway
• Provides clear success metrics before expanding scope
• Facilitates medical content validation with limited scope
• Future versions will add additional symptoms using the established framework
Appendix B: Language Support
Initial languages for launch:
• English
• German
• Additional languages (based on target region requirements)
Appendix C: Icon Design Requirements
All icons must meet the following criteria:
• SVG format for scalability
• Minimum 48x48px touch target
• Clear at small sizes (24px)
• Universally recognizable across cultures
• Consistent stroke weight and style
• High contrast (minimum 3:1 ratio)
• Associated with unique sound identifier
• Paired with optional text label (displayed below icon)
• Text labels use 'Helvetica Neue', Helvetica, 'Segoe UI', Arial, 14-16px, high contrast
• Labels can be toggled on/off by user preference
• Font loading must ensure consistent rendering across all devices
Appendix D: Text Accessibility Requirements
Text Label Implementation:
• All icons paired with text labels below (optional display)
• Text labels use 'Helvetica Neue', Helvetica, 'Segoe UI', Arial font, 14-16px size
• High contrast ratio (4.5:1 minimum) for all text
• Text color: Dark gray (#333333) on light backgrounds
• Text labels concise (1-3 words maximum)
• CSS implementation note: Use web-safe Helvetica Neue with proper fallback
Subtitle/Caption Implementation:
• All audio narration has synchronized on-screen text subtitles
• All videos include embedded closed captions (multilingual)
• Subtitle styling: White text on semi-transparent black background
• Subtitle font size: Minimum 18px, bold for readability
• Subtitle position: Bottom center of screen/video
• Caption delay: Maximum 0.5 seconds from audio start
Toggle Functionality:
• Settings icon accessible from all screens
• "Show Text Labels" toggle (ON by default)
• "Show Subtitles" toggle (ON by default)
• User preferences saved in localStorage
• Clear visual indication of current state (ON/OFF)
Document Control
Version: 7.1
Date: March 05, 2026
Status: Final for Development
Project Kickoff: March 02, 2026
Target Delivery: April 13, 2026
Total Project Fee: €3,500 (€1,000 upfront + €2,500 on completion)
Major Update: Added comprehensive text accessibility support for deaf and hard-of-
hearing users
SIGNATURES.
