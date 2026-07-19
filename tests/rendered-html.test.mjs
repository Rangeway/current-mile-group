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
