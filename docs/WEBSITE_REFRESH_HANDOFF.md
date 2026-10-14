# Website Refresh Handoff

Last updated: October 13, 2026

The site is being repositioned from "Salesforce consultancy" to AI automation and CRM architecture across Salesforce, Zoho, AWS and custom platforms. Salesforce stays prominent as our deepest expertise.

## Status

| Item | State |
| --- | --- |
| Branch | `phase1-copy-refresh`, all four phases committed and pushed |
| `main` / live site | Unchanged. GitHub Pages deploys from `main` only |
| Lauren's review | Preview shared. Waiting on her written feedback |
| Salesforce Lead Source values | Added (AI Automation, Zoho / Other CRM, E-commerce / Commerce Cloud) |

## Links

- **Preview of the branch** (public link, contact form disabled): https://claude.ai/artifact/92WKtfnpg319zn5M5S5VJt
- **Original review and plan** (private): https://claude.ai/code/artifact/11f3b2e0-01b6-4786-9a6d-b8cbdf4bb43f
- **Client Work Inventory** (private Claude doc, names real clients, never copy into this repo): https://claude.ai/code/artifact/01cc7521-d274-49dc-92e3-e8e355566a04

## What changed on the branch

1. **Phase 1, copy.** Homepage hero "AI That Actually Does the Work. Built on Your CRM.", a "What We Build" section, platform strip, broader client sector line, exit popup now offers a free AI Readiness Assessment. Footer tagline on every page, page titles and meta descriptions, contact form options, chatbot answers, About mission, and a "Guardrails by Design" callout on Methodology.
2. **Phase 2, Our Work.** New `our-work.html` with eight anonymized client entries plus Wizardwire. "Our Work" in nav and footer on every page. Homepage "Recent Work" teaser.
3. **Phase 3, Capabilities.** Three pillars: AI Automation, CRM Architecture & Integration, Custom Apps & Platforms. Zoho added to the toolkit. Pillars stack on mobile.
4. **Phase 4, industry pages.** A "Recent Work in This Industry" block on each page. Professional Services renamed "Professional & Financial Services" site-wide, with Insurance and Financial & Accounting use cases.

## Decisions (from Eli, September 29, 2026)

- **Every client entry is anonymized** by industry descriptor. Add names later only with each client's permission.
- **Leave off** anything not won or not delivered: unsigned proposals, declined work, prospects, and family businesses.
- **The roofing client's quoting and document-generation replacement program is not signed.** Keep it off the site until it is.
- **The resort client has no AI work.** Credit billing automation and the custom booking experience only.
- **The insurance client's AI receptionist is live.** It was built by Nagy.
- **The SaaS client's staged refund automation is described as live.** It was expected live the week of September 29. Confirm before merging.
- **Retail site builder, TaskRay replacement and the roofing extras** come from Eli's own delivery summary, not the project folders.
- **Published number:** only the nonprofit win-back result, about 1 in 7.
- **Wizardwire:** short description only. Never publish data sources, scoring weights or thresholds.

## Rules for any future edits

- **American spelling everywhere:** center, license, anonymized, color.
- **No client names, staff names, dollar figures, rates or internal metrics** in this repo. It is public.
- **No overclaiming.** Say "being rolled out" for anything not in production.
- **Keep the contact form values in sync with Salesforce.** Project type values must exist on the Lead Source picklist.

## Next steps

1. Apply Lauren's written feedback on the branch.
2. Rebuild and republish the preview (below) so she can confirm.
3. Check whether legacy Lead Source values from the form exist in Salesforce: Salesforce Implementation, Salesforce Optimization, Custom App Development, AI Integration, Field Service Solution, RevOps, General Consultation. Run a Leads report grouped by Lead Source. If they show up as unlisted values or blanks, add them to the picklist.
4. Merge `phase1-copy-refresh` into `main` and push. GitHub Pages redeploys in about a minute.
5. Spot-check the live site, including a real contact form submission.
6. Delete the preview artifact or make it private.
7. Update `SITEMAP.md`, which still describes the January site.

## Rebuilding the preview

```bash
python3 scripts/build_preview.py /path/to/preview-out
```

The output works on any static host or as a multi-file Claude artifact. Links get `.html` extensions, the contact form is disabled, and every page carries a preview banner. The About page loads Nagy's photo from an external host. For an artifact, download that photo into `assets/images/Nagy.webp` in the output folder first, then re-run the script.

## Not in this repo on purpose

Several older files from the January form-protection work are only on Eli's original machine: form-protection setup notes, Salesforce bot-blocking metadata and helper scripts. They describe exactly how the form blocks bots, which is why they stay out of a public repo. Copy them by hand if needed.
