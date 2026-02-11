export type CacheEntry<T> = {
    createdAt: number;
    val: T;
}

export class Cache {
    #cache = new Map<string, CacheEntry<any>>();
    #reapIntervalId: NodeJS.Timeout | undefined = undefined;
    #interval: number;

    constructor(num: number) {
        this.#interval = num;
        this.#startReapLoop();
    }

    #reap() {
        for (const [k, entry] of this.#cache.entries()) {
            if (entry.createdAt < Date.now() - this.#interval) this.#cache.delete(k);
        }
    }
    #startReapLoop() {
        this.#reapIntervalId = setInterval(() => this.#reap(), this.#interval);
    }
    add<T>(key: string, val: T) {
        const entry: CacheEntry<T> = { createdAt: Date.now(), val };
        this.#cache.set(key, entry);
    }
    get<T>(key:string): T | undefined {
        const entry = this.#cache.get(key);
        return entry?.val as T | undefined;
    }
    stopReapLoop() {
        if (this.#reapIntervalId) clearInterval(this.#reapIntervalId);
        this.#reapIntervalId = undefined;
    }
}