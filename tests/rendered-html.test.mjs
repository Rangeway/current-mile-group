import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("renders the complete Current Mile Group one-page site", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>Current Mile Group<\/title>/i);
  assert.match(html, /The next mile is never just distance\./);
  assert.match(html, /Independent companies\./);
  assert.match(html, /Five fields\./);
  assert.match(html, /The strongest companies connect physical infrastructure/);
  assert.match(html, /A strategic umbrella for companies built to operate\./);
  assert.match(html, /Start a conversation\./);
});

test("keeps the approved portfolio facts and links", async () => {
  const response = await render();
  const html = await response.text();

  assert.match(html, /https:\/\/rangeway\.co/);
  assert.match(html, /https:\/\/chargevia\.net/);
  assert.match(html, /https:\/\/ampiq\.tech/);
  assert.match(
    html,
    /Independent EV charging consulting, project delivery, and ongoing management\./,
  );
  assert.match(html, /Today, those businesses operate independently\./);
  assert.match(html, /Portfolio parent in development/);
});

test("uses anchored navigation and has no contact form or folio rail", async () => {
  const response = await render();
  const html = await response.text();
  const page = await readFile(new URL("../app/page.tsx", import.meta.url), "utf8");

  for (const id of ["portfolio", "sectors", "perspective", "about", "contact"]) {
    assert.match(html, new RegExp(`href=["']#${id}["']`));
    assert.match(html, new RegExp(`id=["']${id}["']`));
  }

  assert.doesNotMatch(html, /<form\b/i);
  assert.doesNotMatch(html, /FIELD ATLAS|37\.7749|122\.4194/i);
  assert.doesNotMatch(html, /codex-preview|Building your site|react-loading-skeleton/i);
  assert.match(html, /Current Mile Group/);
  assert.match(page, /const year = new Date\(\)\.getFullYear\(\)/);
  assert.match(page, /© \{year\} Current Mile Group/);
});

test("uses browser-native images so the local vinext preview has no image-service dependency", async () => {
  const page = await readFile(new URL("../app/page.tsx", import.meta.url), "utf8");

  assert.doesNotMatch(page, /from ["']next\/image["']/);
  assert.doesNotMatch(page, /<Image\b/);
  assert.match(page, /<img\b/);
});

test("implements the supplied Current Mile Group brand system", async () => {
  const [page, layout, css] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
  ]);

  assert.match(page, /cmg-lockup-for-dark\.png/);
  assert.match(page, /cmg-monogram-for-dark\.png/);
  assert.match(page, /className="portfolio-baseline"/);
  assert.match(layout, /Archivo, IBM_Plex_Mono/);
  assert.match(layout, /cmg-favicon-16-divider\.svg/);
  assert.match(layout, /cmg-social-512\.png/);
  assert.match(css, /--ink: #1a1c19/);
  assert.match(css, /--off-white: #f0ece3/);
  assert.match(css, /--oxide: #b0552d/);
  assert.match(css, /--slate: #5b6058/);
  assert.match(css, /--bone: #d8d2c4/);
  assert.doesNotMatch(css, /--moss|--rust|--clay|font-geist/);
});
