export class PokeAPI {
  private static readonly baseURL = "https://pokeapi.co/api/v2";

  constructor() {}

  async fetchLocations(pageURL?: string | null): Promise<ShallowLocations> {
    const url = pageURL ?? PokeAPI.baseURL + "/location-area/";
    const response = await fetch(url);
    const data = (await response.json()) as ShallowLocations;
    return data;
  }

  async fetchLocation(locationName: string): Promise<Location> {
    const url = PokeAPI.baseURL + "/location-area" + locationName;
    const response = await fetch(url);
    const data = (await response.json()) as Location;
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