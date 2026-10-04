# KETA v0.6 Integration Plan

Branch: `keta-v0.6-integration`

## Ground rules

KETA uses the tested OpenCut UXP/backend architecture as the base. Existing OpenCut IDs, backend transport, job control, host write verification, and testable Premiere boundaries are preserved unless a KETA feature requires a deliberate change.

No Premiere mutation is considered working until it has:
1. a preflight,
2. a real host write path,
3. independent read-back verification where Premiere exposes one,
4. a fail-closed path,
5. an automated regression test,
6. a native Premiere validation step.

## Phase 1 — shell + health

- [x] KETA branding over the existing UXP shell.
- [x] Visible TEST SERVER controls restored without replacing the tested backend health handler.
- [x] Preserve OpenCut backend discovery, timeout and retry behavior.
- [ ] Native Premiere screenshot/health validation.

## Phase 2 — KETA audio

- Bass waveform for selected timeline music.
- Kick / Deep Bass / Kick + Bass profiles.
- KETA-owned Bass markers only.
- Marker ownership metadata and safe replacement.
- Song name + waveform + hit count in the panel.

## Phase 3 — footage pool + Smart Cut

- Capture Project-panel or Timeline B-roll.
- Lock the footage pool while the user selects music or moves elsewhere in Premiere.
- Analyze / Preview / Build use the captured pool.
- Use OpenCut write verification for every timeline mutation.

## Phase 4 — Speed Ramp

Target behavior: FAST -> SLOW -> FAST.

- Fast Speed %, Slow Motion %, Ramp In, Hold, Ramp Out.
- 60fps helpers for 30 / 25 / 24 fps.
- AE-style curve presets.
- Marker/playhead/center anchors.
- Time Remapping write is enabled only after the exact Premiere parameter and units are proven on the installed host.
- Auto Nest remains gated until a verified host path exists.

## Phase 5 — motion / finishing

MOGRT, transitions, effects, color and export are enabled one capability at a time, each behind host verification and regression tests.
