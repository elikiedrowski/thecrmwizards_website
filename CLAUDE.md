# The CRM Wizards website

Static HTML/CSS/JS site served by GitHub Pages from `main` (custom domain www.thecrmwizards.com). Pushing to `main` deploys to production. Do all work on a branch.

The contact form posts through a Cloudflare Worker (`worker/`) to Salesforce Web-to-Lead. Its dropdown values must exist on the matching Salesforce picklists.

The repo is public. GitHub Pages on the free plan stops serving if the repo is made private.

## Current work

The AI-first website refresh lives on branch `phase1-copy-refresh`. Read `docs/WEBSITE_REFRESH_HANDOFF.md` before changing anything: status, decisions, rules and next steps are there.

## Rules

- American spelling in all copy, docs and drafted messages.
- Never commit client names, client staff names, prices, rates or internal metrics. Client stories are anonymized by industry.
- Never commit credentials, Salesforce org IDs, or the bot-protection notes and scripts.
