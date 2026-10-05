import assert from "node:assert/strict";
import { readFile, access } from "node:fs/promises";
import { createHash } from "node:crypto";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);
  return worker.fetch(new Request("http://localhost/", { headers: { accept: "text/html" } }), {
    ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) },
  }, { waitUntil() {}, passThroughOnException() {} });
}

test("renders a concise portfolio page without the rejected decorative atlas", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);
  const html = await response.text();
  assert.match(html, /<title>Current Mile Group<\/title>/i);
  assert.match(html, /Different Businesses\./);
  assert.match(html, /A Shared Perspective\./);
  assert.doesNotMatch(html, /Operating atlas|37\.7749|122\.4194|Three operating companies|No artificial boundaries|Practical beats theoretical|route-line/);
});

test("preserves current brand architecture and company positioning", async () => {
  const html = await (await render()).text();
  assert.match(html, /Rangeway is building a hospitality-driven EV charging network/);
  for (const format of ["Waystation", "Basecamp", "Summit"]) assert.match(html, new RegExp(format));
  assert.match(html, /ChargeVia by Rangeway brings fast charging to existing retail and host properties/);
  assert.match(html, /ChargeVia by Rangeway is Rangeway’s retail charging format, not a separate operating company/);
  assert.match(html, /AmpIQ plans, coordinates, and oversees EV charging projects for property owners/);
  assert.match(html, /delivery and ongoing management/);
  assert.match(html, /hardware-agnostic orchestrator/);
  assert.match(html, /Rangeway and AmpIQ operate separately\./);
  assert.match(html, /Current Mile Group is the strategic umbrella for Rangeway and AmpIQ\./);
  assert.doesNotMatch(html, /planned parent|in development|being developed|not yet been formed|scope will include/);
  assert.doesNotMatch(html, /infrastructure development for practical deployment|CMG \/ 0[123] \/ ACTIVE|ChargeVia LLC|Maggie|\$5M|135 kW/);
  for (const domain of ["rangeway.co", "chargevia.net", "ampiq.tech"]) {
    assert.ok(html.includes(`https://${domain}`));
  }
});

test("uses single-page navigation, direct contact, and copyright-only footer", async () => {
  const html = await (await render()).text();
  const page = await readFile(new URL("../app/page.tsx", import.meta.url), "utf8");
  for (const id of ["portfolio", "group", "contact"]) {
    assert.match(html, new RegExp(`href=["']#${id}["']`));
    assert.match(html, new RegExp(`id=["']${id}["']`));
  }
  assert.doesNotMatch(html, /<form\b/i);
  assert.match(html, /mailto:hello@currentmile\.com/);
  assert.doesNotMatch(html, /zak@currentmile\.com/);
  assert.match(html, /<details class="mobile-nav">/);
  assert.match(page, /const year = new Date\(\)\.getFullYear\(\)/);
  const footer = html.match(/<footer>([\s\S]*?)<\/footer>/)?.[1];
  assert.ok(footer);
  assert.match(footer, /Current Mile Group/);
  assert.doesNotMatch(footer, /mailto:|Back to top|Mobility|Energy/);
});

test("uses local, browser-native imagery with honest captions", async () => {
  const page = await readFile(new URL("../app/page.tsx", import.meta.url), "utf8");
  assert.doesNotMatch(page, /from ["']next\/image["']|<Image\b/);
  assert.match(page, /Concept Rendering/);
  assert.match(page, /Illustrative Charging Photograph/);
  for (const path of ["images/rangeway-waystation.png", "images/chargevia-retail.webp", "images/ampiq-charging.webp", "brands/ampiq-current-logo.png"]) {
    await access(new URL(`../public/${path}`, import.meta.url));
  }
});

test("updates the copyright year in the browser and closes mobile navigation on selection", async () => {
  const copyright = await readFile(new URL("../app/copyright.tsx", import.meta.url), "utf8");
  const navigation = await readFile(new URL("../app/navigation.tsx", import.meta.url), "utf8");
  assert.match(copyright, /useSyncExternalStore\(subscribe, \(\) => new Date\(\)\.getFullYear\(\)/);
  assert.match(navigation, /menu\.current\.open = false/);
  assert.match(navigation, /onClick=\{closeMenu\}/);
});

test("keeps the supplied CMG identity and responsive accessibility support", async () => {
  const [page, layout, css] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
  ]);
  assert.match(page, /cmg-lockup-for-light\.png/);
  assert.match(layout, /Archivo, IBM_Plex_Mono/);
  assert.match(layout, /cmg-favicon-16-divider\.svg/);
  assert.match(layout, /cmg-social-512\.png/);
  for (const color of ["#1a1c19", "#f0ece3", "#b0552d", "#5b6058", "#d8d2c4"]) assert.ok(css.includes(color));
  assert.match(css, /prefers-reduced-motion/);
  assert.match(css, /@media \(max-width: 820px\)/);
  assert.match(page, /Skip to content/);
  assert.match(css, /focus-visible/);
});

test("uses the approved Rangeway master and the real ChargeVia lettering", async () => {
  const [rangeway, chargevia, html] = await Promise.all([
    readFile(new URL("../public/brands/rangeway-charcoal-amber.svg", import.meta.url)),
    readFile(new URL("../app/chargevia-lockup.tsx", import.meta.url), "utf8"),
    render().then(response => response.text()),
  ]);
  assert.equal(createHash("sha256").update(rangeway).digest("hex"), "edf3953a3cceb7ddd68a07ba147ff290b4d3a7ebea90fa6867092e007fb4bad1");
  assert.doesNotMatch(rangeway.toString(), /<text|font-family|@import/);
  assert.match(chargevia, /fontFamily: "var\(--font-chargevia\)"/);
  assert.match(chargevia, /fontWeight="700"/);
  assert.match(html, /rangeway-charcoal-amber\.svg/);
  assert.doesNotMatch(html, /\/brands\/rangeway-lockup\.svg|\/brands\/chargevia-lockup\.svg/);
});

test("uses consistent title case and factual parent-company copy", async () => {
  const html = await (await render()).text();
  for (const heading of ["The Portfolio", "The Group", "The Stop Is the Point.", "Charging Where People Already Stop.", "One Partner for the Whole Project.", "Let’s Talk."]) {
    assert.ok(html.includes(heading), `Missing title-cased heading: ${heading}`);
  }
  for (const label of ["Meet the Businesses", "Hospitality-Driven EV Charging", "Rangeway’s Retail Charging Format", "Independent EV Charging Advisory", "Retail Locations", "Site Hosts", "Rangeway-Operated", "Project Delivery", "Ongoing Management", "Concept Rendering", "Illustrative Charging Photograph"]) {
    assert.ok(html.includes(label), `Missing title-cased label: ${label}`);
  }
  assert.match(html, /Current Mile Group is the strategic umbrella for Rangeway and AmpIQ\./);
  assert.doesNotMatch(html, /The planned parent company|>The (?:portfolio|group)</);
  assert.doesNotMatch(html, /A broader view|Room to grow|long-term home for operating businesses|group’s scope extends beyond/);
});
