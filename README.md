# Forge Events Hub

BUILD THIS COMPLETE PROJECT IN ONE COHERENT IMPLEMENTATION

You are a senior frontend engineer, product designer, UX engineer, accessibility specialist, and QA engineer.

Build a polished, competition-ready Tech Event Management Portal for the CodeForge WebSprint 2026 assignment.

This is a frontend-only project.

Do not add a backend, database, authentication, payment system, or server-side API.

The assignment is the source of truth.

1. ASSIGNMENT REQUIREMENTS

Theme:
Build a Tech Event Management Portal

Technology:

HTML

CSS

JavaScript

No backend required

Mandatory requirements:

Home Page — 15 marks

Hero section

Event highlights

Attractive CTA button

Event Listing — 20 marks

Display at least 6 events.

Every event MUST contain:

Event name

Date

Category

Description

Register button

Search & Filter — 20 marks

Search events by name

Filter by category

Registration — 15 marks

Form fields:

Name

Email

College

Event Selection

Form validation is required.

Responsive Design — 10 marks

Must work correctly on:

Mobile

Tablet

Laptop/Desktop

Bonus — 20 marks

Dark mode

LocalStorage

Animated UI

Custom feature

Evaluation:

Functionality — 35

UI/UX — 25

Responsiveness — 15

Code Quality — 10

Creativity — 15

Total: 100.

Do not omit or weaken any mandatory requirement.

2. PRIMARY UX

Design the complete user journey as:

LAND
↓
UNDERSTAND
↓
EXPLORE EVENTS
↓
SEARCH / FILTER / SORT
↓
VIEW EVENT
↓
REGISTER
↓
SUCCESS
↓
EXPLORE MORE / SAVE / SHARE

The experience should be frictionless.

Every visible interactive control must actually work.

Do not create decorative buttons that do nothing.

3. VISUAL DIRECTION

Create a premium modern technology-event aesthetic.

Use:

strong typography

generous whitespace

modern card design

subtle borders

tasteful shadows

restrained gradients

polished CTA buttons

clear hierarchy

subtle motion

strong visual contrast

clean spacing

professional student-tech aesthetic

Avoid:

generic admin-dashboard appearance

excessive glassmorphism

excessive gradients

excessive animation

clutter

The final result should look like a real product rather than a basic assignment demo.

4. DESIGN SYSTEM

Create reusable semantic design tokens for:

background

surface

elevated surface

text

muted text

border

primary

primary hover

success

error

warning

Use the same token system for light and dark mode.

Create a consistent system for:

spacing

border radius

shadows

typography

buttons

form fields

cards

Do not scatter arbitrary styles throughout the application.

5. NAVIGATION

Desktop:

Brand
Home
Events
Favorites
Theme toggle
Primary CTA

Mobile:

Brand
Functional hamburger menu

The mobile menu must actually open and close.

Navigation links should smoothly move to relevant sections.

Use a sticky navbar if it improves usability.

Do not allow the navbar to cover content.

6. HERO

Create a visually strong hero section.

Include:

headline

supporting description

primary CTA: "Explore Events"

optional secondary CTA

small supporting statistics

Use concise student-focused copy.

The primary CTA must navigate to the event listing.

7. EVENT HIGHLIGHTS

Create a section immediately after the hero showing selected/upcoming event highlights.

Do not duplicate the entire event catalogue unnecessarily.

Highlights should lead naturally into the full Events section.

8. EVENT DATA

Create a structured event dataset.

Use at least these 6 events:

CodeSprint 2026
Category: Hackathon

AI Nexus
Category: AI / ML

CyberShield
Category: Cybersecurity

WebForge
Category: Web Development

DataQuest
Category: Data Science

CloudNext
Category: Cloud Computing

Every event MUST contain:

id

name

date

category

description

You may add:

duration

location

mode

eligibility

organizer

difficulty

seats

tags

icon/image

but optional information must not overwhelm the required information.

Use realistic descriptions.

Do not use lorem ipsum.

9. EVENT LISTING

Create a responsive event-card grid.

Desktop:
3 columns where appropriate.

Tablet:
2 columns.

Mobile:
1 column.

Every card MUST show:

category

event name

date

description

Register button

Also add:

favorite/save control

optional View Details control

The Register CTA must remain visually prominent.

10. SEARCH

Implement real-time search.

Search must:

match event name

be case-insensitive

update as the user types

handle empty search

work together with category filtering

work together with sorting

Placeholder:

"Search events..."

Do not require a separate Search button.

11. CATEGORY FILTER

Implement:

All Categories

Hackathon

AI / ML

Cybersecurity

Web Development

Data Science

Cloud Computing

Filtering must be functional.

Search + category filtering must work together.

12. SORTING

Implement this enhancement:

Date: Soonest

Date: Latest

Name: A–Z

Name: Z–A

Use this pipeline:

events
→ search
→ category filter
→ sorting
→ render

Do not mutate the original source event array unnecessarily.

Display result count.

Example:

"Showing 4 of 6 events"

13. EMPTY STATE

If no events match:

Show:

"No events found"

"Try another search term or change your filters."

Button:

"Clear Filters"

Clear Filters must reset:

search

category

sorting

Do not leave a blank grid.

14. EVENT DETAILS

If this can be implemented without destabilizing the core application, add a polished event-details modal/drawer.

It should show:

event name

category

date

description

useful metadata

Register

Favorite

Must work on:

desktop

tablet

mobile

Must close correctly.

Must not interfere with registration.

If implementation complexity becomes excessive, prioritize mandatory functionality and favorites over this feature.

15. REGISTRATION

Every Register button must work.

When a user clicks Register on an event:

Open or navigate to the registration form.

Automatically select that event.

Bring the form into view.

Focus the first appropriate field where practical.

Form fields:

Full Name

Email

College / Institution

Event Selection

All are required.

16. VALIDATION

Implement real client-side validation.

Name:

required

reject whitespace-only input

Email:

required

validate basic email format

College:

required

reject whitespace-only input

Event:

required

Show errors inline beside the appropriate fields.

Do not rely only on alert().

Use clear error messages.

Provide focus/error states.

17. SUCCESS STATE

After valid registration:

Show:

"Registration Successful"

and:

"You're registered for [EVENT NAME]."

Add:

"Explore More Events"

Do not claim that registration was sent to a backend.

This is a frontend-only demo.

18. DARK MODE — BONUS

Implement:

light mode

dark mode

accessible theme toggle

smooth transition

LocalStorage persistence

All UI must adapt correctly:

navbar

hero

event cards

search

filters

form

modal

empty state

success state

footer

Do not use an inversion filter.

Use the semantic design-token system.

19. LOCAL STORAGE — BONUS

Use LocalStorage meaningfully.

Persist:

theme preference

favorite events

Optionally persist local registration state if useful.

Handle:

empty storage

missing keys

malformed JSON

gracefully.

The application must continue functioning normally if storage is unavailable or empty.

Do not store unnecessary sensitive information.

20. CUSTOM FEATURE — FAVORITES

Implement Save/Favorite Events.

Every event card gets:

Unsaved:
♡ Save

Saved:
♥ Saved

Behavior:

instant UI update

persist in LocalStorage

survive refresh

allow multiple favorites

allow removing favorites

Add a Favorites navigation/control.

Favorites view should show saved events.

If none:

"No saved events yet."

CTA:

"Explore Events"

Use event IDs rather than duplicating entire event objects.

21. ANIMATED UI — BONUS

Implement tasteful micro-interactions:

hero entrance

section reveal

event-card hover

button hover/active

favorite toggle

filter/result transition

theme transition

modal transition

smooth scrolling

Animations must be:

subtle

performant

non-blocking

professional

Respect prefers-reduced-motion where practical.

Do not make the UI constantly move.

22. OPTIONAL COMMUNITY / LEAD-GENERATION LAYER

Add a subtle section near the bottom:

"Stay in the Tech Loop"

Copy:

"Get updates about upcoming hackathons, workshops and technical events."

Include:

Email field
"Join the Tech Community" button

This is a frontend-only demo.

After valid email:

"You're on the list!"

Do NOT claim that an email was actually sent.

Do NOT add a marketing backend.

Do NOT let this section compete with the event-registration experience.

Also optionally include:

"Free Student Hackathon Checklist"

as a lead-magnet card.

The CTA can reveal/download/display a local static resource or success state.

Do not introduce an external service.

23. REFERRAL / SHARING

After registration or inside event details, add:

"Know someone who'd love this event?"

CTA:

"Share Event"

Use the browser Web Share API where supported.

Fallback:

"Copy Event Link"

After copying:

"Link copied"

Do not implement fake referral tracking.

Do not pretend referrals are being recorded by a backend.

24. RESPONSIVE DESIGN

This is critical.

Use mobile-first responsive design.

Test:

Mobile

navbar

menu

hero

CTA

search

filters

cards

registration

modal

favorites

footer

Tablet

navigation

two-column events

filters

registration

Desktop

three-column event grid

full navigation

polished spacing

There must be:

no horizontal overflow

no clipped text

no overflowing buttons

no broken cards

no modal overflow

comfortable touch targets

readable typography

Do not simply shrink the desktop layout.

Reflow layouts intelligently.

25. ACCESSIBILITY

Use semantic HTML/components.

Use proper labels.

Ensure:

visible keyboard focus

correct form associations

accessible icon buttons

sufficient contrast

meaningful alt text

keyboard-usable modal

accessible navigation

real buttons instead of clickable divs

26. UX STATES

Account for:

DEFAULT
HOVER
FOCUS
ACTIVE
DISABLED
ERROR
SUCCESS
EMPTY

Search:

no query

typing

results

no results

Registration:

untouched

invalid

valid

submitting

success

Favorites:

unsaved

saved

Theme:

light

dark

27. CODE ARCHITECTURE

Keep these concerns logically separated:

EVENT DATA
STATE
FILTERING/SORTING
RENDERING
REGISTRATION
VALIDATION
LOCAL STORAGE
THEME
FAVORITES

Prefer reusable components.

Avoid:

duplicated event markup

duplicated filtering logic

giant functions

unnecessary global state

dead code

unnecessary dependencies

fake APIs

Use the existing Lovable stack naturally rather than forcing an unnecessary architecture.

28. PERFORMANCE

Keep the app lightweight.

Avoid unnecessary:

dependencies

large images

expensive animations

repeated DOM work

duplicated data

Prefer efficient rendering.

29. IMPORTANT PRIORITY ORDER

If implementation complexity appears, prioritize EXACTLY in this order:

Mandatory functionality

Registration validation

Responsive behavior

UI/UX quality

Dark mode

LocalStorage

Favorites

Animated UI

Sorting

Event details

Referral/share

Lead magnet/community extras

Never sacrifice a mandatory feature for an optional feature.

30. DO NOT OVERENGINEER

Do NOT add:

authentication

backend

database

payments

admin panel

real email service

analytics

unnecessary APIs

The assignment explicitly requires no backend.

31. FINAL QA BEFORE FINISHING

Before declaring the build complete, verify:

MANDATORY:

[ ] Hero exists
[ ] Event highlights exist
[ ] CTA works
[ ] 6+ events render
[ ] Event names render
[ ] Dates render
[ ] Categories render
[ ] Descriptions render
[ ] Register buttons work
[ ] Search works
[ ] Category filter works
[ ] Search + filter work together
[ ] Registration form works
[ ] Name validation works
[ ] Email validation works
[ ] College validation works
[ ] Event validation works
[ ] Successful registration works
[ ] Mobile works
[ ] Tablet works
[ ] Desktop works

BONUS:

[ ] Dark mode
[ ] Theme persistence
[ ] LocalStorage
[ ] Favorites
[ ] Favorite persistence
[ ] Animated UI
[ ] Custom feature

UX:

[ ] Empty state
[ ] Clear filters
[ ] Result count
[ ] Auto-selected event
[ ] Mobile navigation
[ ] No horizontal overflow
[ ] Accessible focus
[ ] Accessible icon buttons
[ ] Modal works if implemented
[ ] Share works if supported

32. IMPLEMENTATION STRATEGY

Build this as ONE coherent implementation.

Do not stop after creating only a static landing page.

Do not generate placeholder buttons for later functionality.

Implement the complete core experience in this build.

However, preserve a clean architecture so individual features can be repaired later without rewriting the application.

Before modifying any existing generated component, preserve working functionality.

Do not unnecessarily rewrite unrelated code.

33. FINAL PRODUCT STANDARD

The finished result should feel like a real premium student technology-event platform.

It should communicate:

DISCOVER
→ EXPLORE
→ SAVE
→ REGISTER
→ SHARE

The interface should be visually impressive but functionally reliable.

Functionality is more important than decoration.

Responsive behavior is more important than animation.

Mandatory requirements are more important than optional marketing features.

Do not declare the project complete until the mandatory checklist is actually satisfied.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/493324f1-8090-471f-988b-eaa9b6f34334).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
