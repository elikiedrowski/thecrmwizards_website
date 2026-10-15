#!/usr/bin/env python3
"""Build a static preview copy of the site for review outside GitHub Pages.

Usage: python3 scripts/build_preview.py <output_dir>

The preview:
- rewrites extensionless links (capabilities -> capabilities.html, / -> index.html)
  so pages work on any static host or as a multi-file artifact
- disables the contact form (empty worker URL, so no leads reach Salesforce)
- adds a "Preview, not live" banner to every page
"""
import re
import shutil
import sys
import pathlib

ROOT = pathlib.Path(__file__).resolve().parent.parent
PAGES = ["index", "about", "capabilities", "contact", "methodology", "our-work", "thank-you"]
INDUSTRIES = ["field-services", "high-growth-tech", "professional-services", "hospitality-wellness", "non-profits"]
WORKER = 'data-worker-url="https://crmwizards-form-proxy.eli-kiedrowski12.workers.dev"'
BANNER = ('<div style="position:sticky;top:0;z-index:10000;background:#FFF4E0;color:#7A4B00;'
          'text-align:center;font:600 14px/1.4 system-ui,sans-serif;padding:8px 16px;">'
          'Preview of the website refresh branch. Not live. The contact form is disabled here.</div>')


def fix(html: str, in_subfolder: bool) -> str:
    names = "|".join(PAGES + ["industries/" + i for i in INDUSTRIES])
    html = re.sub(r'href="(\.\./)?(' + names + r')(#[^"]*)?"',
                  lambda m: f'href="{m.group(1) or ""}{m.group(2)}.html{m.group(3) or ""}"', html)
    if in_subfolder:
        html = re.sub(r'href="(' + "|".join(INDUSTRIES) + r')(#[^"]*)?"',
                      lambda m: f'href="{m.group(1)}.html{m.group(2) or ""}"', html)
        html = html.replace('href="../"', 'href="../index.html"')
    html = html.replace('href="/"', 'href="index.html"')
    html = html.replace(WORKER, 'data-worker-url=""')
    return re.sub(r"(<body[^>]*>)", r"\1" + BANNER, html, count=1)


def main() -> None:
    if len(sys.argv) != 2:
        sys.exit(__doc__)
    out = pathlib.Path(sys.argv[1]).resolve()
    (out / "industries").mkdir(parents=True, exist_ok=True)
    for d in ["css", "js", "assets/images"]:
        shutil.copytree(ROOT / d, out / d, dirs_exist_ok=True)
    for p in PAGES:
        html = fix((ROOT / f"{p}.html").read_text(encoding="utf-8"), False)
        (out / f"{p}.html").write_text(html, encoding="utf-8")
    for i in INDUSTRIES:
        html = fix((ROOT / f"industries/{i}.html").read_text(encoding="utf-8"), True)
        (out / f"industries/{i}.html").write_text(html, encoding="utf-8")
    print(f"Preview written to {out}")


if __name__ == "__main__":
    main()
