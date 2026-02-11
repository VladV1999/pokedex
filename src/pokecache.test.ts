import { afterEach, expect, test, vi } from "vitest";
import { PokeAPI } from "./pokeapi.js";
import { Cache } from "./pokecache.js";
test.concurrent.each([
  {
    key: "https://example.com",
    val: "testdata",
    interval: 1000, // 1/2 second
  },
  {
    key: "https://example.com/path",
    val: "moretestdata",
    interval: 2000, // 1 second
  },
])("Test Caching $interval ms", async ({ key, val, interval }) => {
  const cache = new Cache(interval);

  cache.add(key, val);
  const cached = cache.get(key);
  expect(cached).toBe(val);

  await new Promise((resolve) => setTimeout(resolve, interval + 100));
  const reaped = cache.get(key);
  expect(reaped).toBe(undefined);

  cache.stopReapLoop();
});

afterEach(() => vi.restoreAllMocks());

test("fetchLocations uses cache on second call", async () => {
  const cache = new Cache(10_000);
  const api = new PokeAPI(cache);

  const payload = { count: 1, next: null, previous: null, results: [] };

  vi.spyOn(globalThis, "fetch").mockResolvedValue({
    ok: true,
    status: 200,
    statusText: "OK",
    json: async () => payload,
  } as any);

  const a = await api.fetchLocations();
  const b = await api.fetchLocations();

  expect(a).toEqual(payload);
  expect(b).toEqual(payload);
  expect(fetch).toHaveBeenCalledTimes(1);

  cache.stopReapLoop();
});