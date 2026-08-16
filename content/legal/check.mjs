#!/usr/bin/env node
/**
 * Contract check: /privatnost is a real Art. 13 notice, /uvjeti is not a stub,
 * and the form notice is one sentence + /privatnost link (no consent checkbox).
 */
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(fileURLToPath(import.meta.url));
const source = [
  "controller.ts",
  "form-notice.ts",
  "privatnost.ts",
  "uvjeti.ts",
]
  .map((name) => readFileSync(join(root, name), "utf8"))
  .join("\n");

const required = [
  ["controller name", "FINE STAR d.o.o."],
  ["controller street", "Bana Josipa Jelačića 58"],
  ["controller postcode", "22000"],
  ["controller city", "Šibenik"],
  ["controller email", "info@tablio.hr"],
  ["mailto", "mailto:info@tablio.hr"],
  ["privacy path", '"/privatnost"'],
  ["terms path", '"/uvjeti"'],
  ["purpose", "iskaz interesa za Tablio pilot"],
  ["confirmation email", "transakcijske potvrde"],
  ["legal basis 6(1)(b)", "članak 6. stavak 1. točka (b)"],
  ["no newsletter consent", "ne šaljemo marketinške novosti"],
  ["future newsletter 6(1)(a)", "članak 6. stavak 1. točka (a)"],
  ["data categories", "ime, e-mail, interes (općenito ili handheld)"],
  ["timestamps", "vrijeme stvaranja i zadnje izmjene"],
  ["no IP on lead", "ne pohranjujemo IP adresu"],
  ["recipients hosting", "mail.tablio.hr"],
  ["recipients cloudflare", "Cloudflare"],
  ["no marketing platforms", "trećim marketinškim platformama"],
  ["retention", "24 mjeseca"],
  ["rights", "pristup, ispravak, brisanje"],
  ["AZOP", "Agencija za zaštitu osobnih podataka"],
  ["AZOP address", "Ulica Metela Ožegovića 16"],
  ["no automated decisions", "Ne postoji automatizirano donošenje odluka"],
  ["form notice link", "obavijesti o privatnosti"],
  ["no consent checkbox", "consentCheckbox: false"],
  ["terms site use", "Uporaba stranice"],
  ["terms IP", "Intelektualno vlasništvo"],
  ["terms issuer", "Izdavatelj"],
];

const forbidden = [
  ["lorem", /lorem ipsum/i],
  ["TODO copy", /\bTODO\b|\bFIXME\b|placeholder/i],
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

console.log("legal copy contract ok");
