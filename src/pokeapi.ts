import { Cache } from "./pokecache.js";
export class PokeAPI {
    private static readonly baseURL = "https://pokeapi.co/api/v2";
    #cache: Cache;
    constructor(cache: Cache) {
      this.#cache = cache;
    }

    async fetchLocations(pageURL?: string | null): Promise<ShallowLocations> {
      const url = pageURL ?? PokeAPI.baseURL + "/location-area";
      const cached = this.#cache.get<ShallowLocations>(url);
      if (cached !== undefined) return cached;
      const response = await fetch(url);
      const data = (await response.json()) as ShallowLocations;
      this.#cache.add<ShallowLocations>(url, data);
      return data;
    }

    async fetchLocation(locationName: string): Promise<Location> {
      const url = PokeAPI.baseURL + "/location-area/" + locationName;
      const cached = this.#cache.get<Location>(url);
      if (cached !== undefined) return cached;
      const response = await fetch(url);
      const data = (await response.json()) as Location;
      this.#cache.add(url, data);
      return data;
    }
}

export type ShallowLocations = {
    count: number;
    next: string | null;
    previous: string | null;
    results: {"name": string, "url":string}[];
};

export type Location = {
    id: number;
    name: string;
};