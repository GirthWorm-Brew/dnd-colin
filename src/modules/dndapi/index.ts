import fs from "node:fs/promises";
import { fetchOpen5eCollectionsAsJson } from "./types";

type Open5eRoot = Record<string, string>;

type Open5eItem = {
  name?: string;
  key?: string;
  id?: string | number;
};

type CategoryPage = {
  next?: string | null;
  results?: Open5eItem[];
};

function safeName(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[\\/:*?"<>|]/g, "-")
    .replace(/\s+/g, "-")
    .replace(/\.+$/g, "");
}

export async function basePullToJson() {
  const OPEN5E_BASE = "https://api.open5e.com";
  const root = (await (await fetch(OPEN5E_BASE)).json()) as Open5eRoot;

  for (const [category, startUrl] of Object.entries(root) as [
    string,
    string,
  ][]) {
    let nextUrl: string | null = startUrl;

    while (nextUrl) {
      const catRes = await fetch(nextUrl);
      const catData = (await catRes.json()) as CategoryPage;
      const items = Array.isArray(catData.results) ? catData.results : [];

      for (const item of items) {
        const id =
          item.key ?? (item.id !== undefined ? String(item.id) : item.name);
        if (!id) continue;

        const filename = `${safeName(String(id))}.json`;
        const outPath = `./data/${category}/${filename}`;
        const payload = JSON.stringify(item, null, 2);

        await fs.mkdir(`./data/${category}`, { recursive: true });
        await fs.writeFile(outPath, payload, "utf8");
      }

      nextUrl = catData.next ?? null;
    }
  }
}

export async function fetchOpen5eWithTypes() {
  const result = await fetchOpen5eCollectionsAsJson();

  return result;
}
