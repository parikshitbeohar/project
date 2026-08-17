# ☀️ Sky Check

A weather lookup app built with React, TypeScript, and Vite. Search by city name or UK postcode and see current conditions plus an upcoming forecast, with a background theme that shifts to match the weather.

**Live demo:** _add your deployed URL here once it's live_

## Features

- Search by city name or UK postcode — the input auto-detects which one you've typed and queries the right API
- Debounced, keyboard-navigable autocomplete (arrow keys, Enter, Escape, click)
- Current conditions (temperature, wind, humidity, condition) plus a multi-day forecast
- Background theme and text colors adapt to the current weather condition and time of day
- Accessible loading and error states: focus moves into the overlay on mount, the rest of the page is marked `inert` while blocked, and focus is restored to wherever it was once the overlay clears
- No API keys or backend required — both data sources are free, public APIs

## Tech stack

- [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/) on [Vite](https://vite.dev/)
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [SWR](https://swr.vercel.app/) for data fetching, caching, and revalidation
- [Vitest](https://vitest.dev/) + [React Testing Library](https://testing-library.com/react) for unit and integration tests
- [Playwright](https://playwright.dev/) for end-to-end tests
- [Open-Meteo](https://open-meteo.com/) for weather and city geocoding, [postcodes.io](https://postcodes.io/) for UK postcode lookup

## Getting started

```bash
npm install
npm run dev
```

The app runs at `http://localhost:5173`. No environment variables are required — Open-Meteo and postcodes.io are both free, keyless APIs.

`VITE_WEATHER_API_KEY` in `.env.example` is an unused seam for later: if the app ever swaps to a paid weather provider that requires a client-safe key, `getWeatherApiKey()` in `src/config/apiConfig.ts` is where it would be read from. It isn't wired up to anything yet.

## Available scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Start the Vite dev server |
| `npm run build` | Type-check and build for production |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint |
| `npm run format` | Format the codebase with Prettier |
| `npm test` | Run unit and integration tests once |
| `npm run test:watch` | Run unit and integration tests in watch mode |
| `npm run test:coverage` | Run tests with a coverage report |
| `npm run test:e2e` | Run the Playwright end-to-end tests (Chromium) |

## Testing

Testing is split across three layers:

**Unit tests** cover pure functions and mappers (`weatherCategory`, `postcodeDetector`, `locationMapper`, `weatherMapper`), individual components, the API layer (with `fetch` mocked), and hooks (with the API layer mocked and an isolated SWR cache per test).

**One integration test**, `src/pages/WeatherPage.test.tsx`, renders the real page with every component and hook wired together as they actually run in the app — only the network boundary (`fetchWeather`, `fetchCitySuggestions`) is mocked. It covers the default-location load, an error-then-retry recovery, and selecting a new location from the search bar and seeing its weather appear.

**End-to-end tests**, under `tests/`, drive a real Chromium browser against the running app with nothing mocked at all — they hit the live Open-Meteo and postcodes.io APIs. Firefox and WebKit are left commented out in `playwright.config.ts`: Firefox in particular uses its own certificate trust store rather than the OS one, which can hang against the live API on networks that do TLS inspection (e.g. some corporate networks/VPNs). That's an environment quirk, not an app or test defect — Chromium and WebKit both pass the identical test against the same live endpoints.

## Project structure

```
src/
  api/            fetch wrappers for each external endpoint
  components/     one folder per UI component, each with its own test file
  config/         API base URLs
  context/        weather-driven theme context
  hooks/          useDebounce, useLocationSearch, useWeather
  mappers/        raw API response -> app-shape data, plus their tests
  pages/          WeatherPage (the integration test lives here too)
  types/          shared TypeScript types
  utils/          postcode detection, weather code -> category mapping
tests/            Playwright end-to-end tests
```

## Design decisions and trade-offs

**Search auto-detection over a manual toggle.** Rather than a city/postcode switch, `isPostcode()` runs a regex against the query on every keystroke and routes to the right API. Simpler UI, and UK postcodes have a distinctive enough shape that false positives/negatives aren't a real concern in practice.

**SWR over a hand-rolled fetch + `useEffect`.** It gives request deduplication, an isolated cache per key, and a `retry`/`mutate` escape hatch almost for free, which is what backs the error state's "Try again" button and the 15-minute background refresh on weather data.

**Plain `Error`, not a custom error hierarchy.** `fetchJson` throws a plain `Error` with a `"Request failed: {status} {statusText}"` message, and `fetchPostcodeLookup` distinguishes a 404 ("no results") from a real failure by matching that message's prefix. It's a string-based contract rather than a typed one — less type-safe than a dedicated `NotFoundError` class, but it keeps the error-handling surface small for an app this size, and both halves of the contract are pinned down by tests (`fetchJson.test.ts`, `fetchPostcodeLookup.test.ts`).

**Keyboard/focus handling gets real code, not just visual styling.** The search combobox follows full ARIA combobox conventions (roving `aria-activedescendant`, arrow keys, `Escape`), and the loading/error overlays use `inert` plus a focus-capture/restore pattern in `WeatherPage` so keyboard and screen-reader users land somewhere sensible when the page blocks, and return to where they were once it unblocks.

**No backend.** Both APIs are free, public, and keyless, so there was nothing for a backend to actually own (no secrets to hide, no rate limits worth proxying around at this scale). `getWeatherApiKey()` is left as a deliberate, unused seam rather than building out infrastructure the app doesn't need yet.

## Known limitations / possible next steps

- No persistence — search history and the selected location reset on refresh
- No offline handling beyond SWR's default retry-on-reconnect being disabled
- The 15-minute background refresh only affects the currently selected location, not any others
- CI isn't wired up yet to run `test`, `test:coverage`, or `test:e2e` automatically on push
