# Vera Onboarding - Midjourney Prompts

Style keywords to append to all prompts:
```
--ar 9:19 --v 6.1 --style raw --stylize 200
```

## Base Style Reference
Use this as a style anchor (generate first, then reference with --sref):
```
Minimal geometric illustration, warm color palette with coral pink, cream white, and forest green accents, soft gradients, clean outlines, modern app UI aesthetic, friendly and approachable, abstract human connection concept --ar 9:19 --v 6.1
```

---

## Screen 1: Welcome
**Concept:** First impression, warmth, invitation

```
Minimal geometric illustration of two abstract human figures reaching toward each other, their hands almost touching creating a spark of connection, coral and cream color palette with forest green accents, soft warm gradient background, clean vector style, modern app onboarding aesthetic, friendly and inviting mood --ar 9:19 --v 6.1 --style raw
```

---

## Screen 2: Daily Task Concept
**Concept:** Simple daily ritual, one task

```
Minimal geometric illustration of a single glowing card or ticket floating in center, subtle geometric patterns radiating outward, suggesting daily ritual and simplicity, coral pink and cream white palette with forest green details, clean outline style, modern app aesthetic, sense of anticipation and possibility --ar 9:19 --v 6.1 --style raw
```

---

## Screen 3: Real Human Connection
**Concept:** Not digital, real people

```
Minimal geometric illustration of two abstract people sitting together at a small table, coffee cups between them, warm intimate atmosphere, geometric shapes forming figures, coral and forest green on cream background, clean modern illustration style, genuine human connection feeling --ar 9:19 --v 6.1 --style raw
```

---

## Screen 4: Share & Complete
**Concept:** Completing together, shared moment

```
Minimal geometric illustration of two overlapping circles or rings completing each other, creating a unified whole, subtle celebration particles, coral pink and forest green gradient, cream background, clean vector aesthetic, sense of accomplishment and togetherness --ar 9:19 --v 6.1 --style raw
```

---

## Screen 5: Get Started
**Concept:** Beginning the journey, optimism

```
Minimal geometric illustration of a sunrise or dawn over abstract landscape, path leading forward, warm coral and golden tones with cream and forest green, clean outline style, modern app onboarding, hopeful and energizing mood, new beginnings --ar 9:19 --v 6.1 --style raw
```

---

## Pro Tips

1. **Consistency:** Generate Screen 1 first, grab a good result's job ID, use `--sref [job_id]` on the rest
2. **Variations:** Use `--chaos 15-30` for more variety, lower for consistency
3. **Upscale:** Use "Upscale (Subtle)" for app-quality resolution
4. **Iterate:** Add `--no text, words, letters, numbers` if text appears
5. **Refine:** Use `/describe` on results you like to learn what works

## Alternative: Illustration Packs
If these feel too "AI art," consider:
- Use Midjourney to establish mood/color, then trace in Figma
- Generate abstract backgrounds only, add geometric icons manually
- Create one hero illustration, use simpler graphics for other screens

---

*Run these in Midjourney, pick your favorites, drop them in `/design` and I can help composite them into the Figma mockup.*
