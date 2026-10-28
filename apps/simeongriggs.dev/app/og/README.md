# Cloudflare OG rendering

`/api/og?id=<published-document-id>&updatedAt=<revision>` returns a 1200×630 PNG. Without an ID it renders a default card. Unknown documents return 404; malformed IDs and drafts return 400. Images are cached for one hour in browsers and one day at Cloudflare's edge. Metadata and the Studio preview point to this website route.

Satori produces SVG, and resvg turns it into PNG. Layout, HarfBuzz, HarfBuzz's callback wrappers, and resvg are imported as compiled Wasm modules through the Cloudflare Vite plugin. The renderer never compiles Wasm bytes in a request. The fonts are bundled static assets, accessed through the ASSETS binding.

Satori is pinned to the current audited release, 0.63.2. Its standalone build still embeds HarfBuzz and dynamically compiles callback modules. `build-tools/satori-cloudflare.ts` replaces these initialization paths and fails the build if the expected upstream code changes. The vendored `harfbuzz.wasm` is extracted unchanged from that package's embedded binary; the tiny callback modules reproduce Emscripten's wrappers for the signatures used by its bundled harfbuzzjs 0.10.0. See HARFBUZZ-LICENSE.txt. Run `node build-tools/generate-harfbuzz.mjs` from the app directory to regenerate the Wasm files after reviewing an upstream change. The normal test command verifies these files against the installed package. Remove the adapter when Satori offers a fully standalone text-shaping initializer.

To test in Workers locally, start the website and run:

```sh
OG_TEST_URL=http://localhost:5173 pnpm --filter simeongriggs-blog test:og
```

Set OG_TEST_DOCUMENT_ID to a published Sanity document with an image to exercise the document-image case. The same tests can target a CF Builds preview. Do not publish the Worker locally.
