# Ascend Design System

## Direction

Ascend feels like a precision workshop after dark: near-black architecture, crisp white typography, and vivid blue, pink, and green signals that suggest momentum without becoming a neon spectacle. Boldium informs the confidence, scale, and project-first pacing; Ascend’s local-business focus, energetic palette, and upward visual language make it distinct.

## Colour

The strategy is a controlled full palette. Pure near-black and true white carry most surfaces. The three accents have fixed jobs: blue signals action and navigation, pink introduces human energy and editorial emphasis, and green communicates progress and readiness. All colour tokens are expressed in OKLCH.

## Typography

Display type uses Bahnschrift with condensed fallbacks to create a precise, engineered rhythm. Segoe UI carries longer body copy for clarity. Headlines use large but bounded fluid scales, no tighter than `-0.04em`, balanced wrapping, and strong contrast rather than decorative effects.

## Layout

- Mobile-first and responsive from narrow phones through wide desktops.
- A maximum content width of 1440px with fluid page gutters.
- Oversized single-purpose hero moments balanced by dense, useful project detail.
- Project rows alternate composition rather than repeating identical cards.
- Hairline rules and square markers provide structure; corners stay precise and restrained.

## Components

- Sticky global header with a full-screen mobile navigation panel.
- Temporary Ascend wordmark that can be replaced by the final logo asset.
- Route-aware links for Home, Work, Services, About, Contact, and case studies.
- Project showcases rendered as stylised web canvases until final screenshots are supplied.
- Service rows, process timeline, FAQ disclosure controls, contact form, and local-only status messages.

## Interaction

The first page load uses a deliberate typographic reveal. Route changes crossfade quickly, project previews respond to hover, and content enters according to its role rather than with one repeated animation. All non-essential motion is disabled when `prefers-reduced-motion` is enabled.
