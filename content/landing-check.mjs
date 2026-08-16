#!/usr/bin/env node
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const source = readFileSync(join(dirname(fileURLToPath(import.meta.url)), "landing.ts"), "utf8");

const required = [
  ["hero eyebrow", "Razvijeno za hrvatsko ugostiteljstvo"],
  ["hero h1", "Cijelo ugostiteljsko poslovanje. Jedna povezana platforma."],
  ["selected badge", "Do 20 odabranih mjesta u prvom pilot-programu"],
  ["no guarantee", "Prijava ne jamči ulazak"],
  ["activation", "od aktivacije tog objekta"],
  ["future offline", "Podaci će ostati na uređajima"],
  ["planned handheld", "Planirani handheld"],
  ["fiscal future", "se razvija za hrvatska fiskalna pravila"],
  ["sync future", "Tablio će automatski sinkronizirati"],
  ["roamkit future", "moći će osigurati"],
  ["privacy notice import path", 'from "./legal/controller"'],
];

const forbidden = [
  ["first-come seats", /samo 20 mjesta/i],
  ["first 20 applicants", /prvih 20 prijavljenih/i],
  ["present offline title", /"Radi i bez interneta"/],
  ["hotel rooms", /hotelsku sobu|smještajnim kapacitet|\bPMS\b/i],
  ["lorem", /lorem ipsum/i],
  ["placeholder", /\bTODO\b|\bFIXME\b|placeholder/i],
];

const missing = required.filter(([, needle]) => !source.includes(needle));
const leaked = forbidden.filter(([, pattern]) => pattern.test(source));

if (missing.length || leaked.length) {
  for (const [label] of missing) {
    console.error(`missing: ${label}`);
  }
  for (const [label] of leaked) {
    console.error(`forbidden: ${label}`);
  }
  process.exit(1);
}

console.log("landing copy contract ok");
