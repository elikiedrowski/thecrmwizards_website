# Website Refresh Handoff

Last updated: October 14, 2026

The site is being repositioned from "Salesforce consultancy" to AI automation and CRM architecture across Salesforce, Zoho, HubSpot and custom platforms. Salesforce stays prominent as our deepest expertise.

## Status

| Item | State |
| --- | --- |
| Branch | `phase1-copy-refresh`, all four phases plus Lauren's feedback round, committed and pushed |
| `main` / live site | `phase1-copy-refresh` merged and deployed October 14, 2026. GitHub Pages deploys from `main` only |
| Lauren's review | Done. Feedback applied October 13-14, 2026 and approved on the preview |
| Salesforce Lead Source values | Added (AI Automation, Zoho / Other CRM, E-commerce / Commerce Cloud) |

## Links

- **Preview of the branch** (public link, contact form disabled): https://claude.ai/artifact/92WKtfnpg319zn5M5S5VJt
- **Original review and plan** (private): https://claude.ai/code/artifact/11f3b2e0-01b6-4786-9a6d-b8cbdf4bb43f
- **Client Work Inventory** (private Claude doc, names real clients, never copy into this repo): https://claude.ai/code/artifact/01cc7521-d274-49dc-92e3-e8e355566a04

## What changed on the branch

1. **Phase 1, copy.** Homepage hero "AI That Actually Does the Work. Built on Your CRM.", a "What We Build" section, platform strip, broader client sector line. The exit-intent popup was removed (Eli, October 13, 2026: too much noise). Footer tagline on every page, page titles and meta descriptions, contact form options, chatbot answers, About mission, and a "Guardrails by Design" callout on Methodology.
2. **Phase 2, Our Work.** New `our-work.html` with eight anonymized client entries plus Wizardwire. "Our Work" in nav and footer on every page. Homepage "Recent Work" teaser.
3. **Phase 3, Capabilities.** Three pillars: AI Automation, CRM Architecture & Integration, Custom Apps & Platforms. Zoho added to the toolkit. Pillars stack on mobile.
4. **Phase 4, industry pages.** A "Recent Work in This Industry" block on each page. Professional Services renamed "Professional & Financial Services" site-wide, with Insurance and Financial & Accounting use cases.

## Lauren's feedback round (October 13-14, 2026)

Applied on the branch after Eli walked through the preview with Lauren:

- About and Contact hero padding fixed so the title no longer clips under the overlapping card; team photos moved to local files.
- Exit-intent popup removed site-wide.
- AWS replaced with HubSpot in every platform list (AWS stays only as an infrastructure tag). HubSpot added to the toolkit. Salesforce toolkit lists Agentforce and Marketing Cloud; Commerce Cloud dropped from the toolkit and the homepage platform strip. Google and Google Cloud added to the AI/ML and DevOps toolkit boxes.
- Our Work: the retail site-builder entry was removed and the SaaS sales productivity engine added as its own entry (also on the homepage teaser and High-Growth Tech). The project management entry was expanded and no longer names the replaced tool. Right-column order set by Eli. Intro line is "A few recent projects, summarized by industry:" on Our Work and the homepage.
- Homepage Recent Work shows four cards (`work-grid-4`: 4 across, 2x2 on tablets, stacked on phones).
- High-Growth Tech is listed before Field Service & Sales everywhere industries are listed: nav, footer, homepage and Capabilities cards, contact form, chatbot. Trust line leads with Technology.
- "What We Build" closing sentence: "Our team has deep expertise in Salesforce as well as experience with Zoho and HubSpot, and we build, and deliver on, custom platforms too."
- Industry pages: hero buttons are "Book a Discovery Call" and "View Solutions"; bottom CTA is "Contact Us". Recent-work line is "A few recent projects in this space, summarized below:" (two cards) or "A recent project in this space, summarized below:" (one card). Hospitality solution heading is "Built on Your CRM"; the Non-Profit Success Pack heading stays Salesforce-specific on purpose.

## Decisions (from Eli, September 29, 2026)

- **Every client entry is anonymized** by industry descriptor. Add names later only with each client's permission.
- **Leave off** anything not won or not delivered: unsigned proposals, declined work, prospects, and family businesses.
- **The roofing client's quoting and document-generation replacement program is not signed.** Keep it off the site until it is.
- **The resort client has no AI work.** Credit billing automation and the custom booking experience only.
- **The insurance client's AI receptionist is live.** It was built by Nagy.
- **The SaaS client's staged refund automation is live.** Confirmed by Eli on October 14, 2026 before the merge.
- **Retail site builder, the project management add-on replacement and the roofing extras** come from Eli's own delivery summary, not the project folders.
- **Never name the third-party tools we replaced** (Eli, October 14, 2026). Say "a paid add-on" or similar.
- **The retail site builder entry was removed** (Eli, October 14, 2026): it does not tie to a core industry. The SaaS sales productivity engine is its own entry instead.
- **Published number:** only the nonprofit win-back result, about 1 in 7.
- **Wizardwire:** short description only. Never publish data sources, scoring weights or thresholds.

## Rules for any future edits

- **American spelling everywhere:** center, license, anonymized, color.
- **No client names, staff names, dollar figures, rates or internal metrics** in this repo. It is public.
- **No overclaiming.** Say "being rolled out" for anything not in production.
- **Keep the contact form values in sync with Salesforce.** Project type values must exist on the Lead Source picklist.
- **No "demo" language.** Solutions are custom, so CTAs invite a conversation: "Contact Us", "Book a Discovery Call".
- **Never name the third-party tools we replaced.**
- **Industry recent-work line matches the card count.** Flip it to the plural wording when a second card is added to Field Services or Hospitality.

## Next steps

1. Check whether legacy Lead Source values from the form exist in Salesforce: Salesforce Implementation, Salesforce Optimization, Custom App Development, AI Integration, Field Service Solution, RevOps, General Consultation. Run a Leads report grouped by Lead Source. If they show up as unlisted values or blanks, add them to the picklist.
2. Spot-check the live site after the merge, including a real contact form submission.
3. Delete the preview artifact or make it private.
4. Update `SITEMAP.md`, which still describes the January site.
5. Decide whether "Salesforce Commerce Cloud" should also come out of the homepage CRM Architecture card and the chatbot platform answers, now that it is out of the toolkit and platform strip.

## Rebuilding the preview

```bash
python3 scripts/build_preview.py /path/to/preview-out
```

The output works on any static host or as a multi-file Claude artifact. Links get `.html` extensions, the contact form is disabled, and every page carries a preview banner. All team photos are local files under `assets/images`, so nothing external is needed.

## Not in this repo on purpose

Several older files from the January form-protection work are only on Eli's original machine: form-protection setup notes, Salesforce bot-blocking metadata and helper scripts. They describe exactly how the form blocks bots, which is why they stay out of a public repo. Copy them by hand if needed.
