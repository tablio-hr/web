import {
  CONTROLLER,
  LEGAL_LAST_UPDATED,
  LEGAL_LAST_UPDATED_LABEL,
  LEGAL_PATHS,
} from "./controller";
import type { LegalPage } from "./types";

const mailto = { text: CONTROLLER.email, href: CONTROLLER.mailto };

export const PRIVACY_PAGE: LegalPage = {
  path: LEGAL_PATHS.privacy,
  title: "Obavijest o privatnosti",
  description:
    "Kako FINE STAR d.o.o. obrađuje ime, e-mail i interes iz prijave za Tablio pilot.",
  lastUpdated: LEGAL_LAST_UPDATED,
  lastUpdatedLabel: LEGAL_LAST_UPDATED_LABEL,
  intro: [
    [
      {
        text: "Ova obavijest opisuje kako FINE STAR d.o.o. obrađuje osobne podatke koje nam date putem obrasca za rani pristup na tablio.hr i stage.tablio.hr. Odnosi se na iskaz interesa za Tablio pilot, uključujući transakcijsku potvrdu prijave. Ne odnosi se na kasniju uporabu proizvoda u ugostiteljskom objektu.",
      },
    ],
    [
      {
        text: "Tekst je napisan prema članku 13. Opće uredbe o zaštiti podataka (GDPR) i smjernicama Agencije za zaštitu osobnih podataka o informiranju ispitanika.",
      },
    ],
  ],
  sections: [
    {
      id: "voditelj",
      title: "Voditelj obrade",
      paragraphs: [
        [
          { text: `${CONTROLLER.legalName} je voditelj obrade. Tablio je proizvod tog društva.` },
        ],
        [
          { text: `${CONTROLLER.streetAddress}` },
          { text: `, ${CONTROLLER.postalCode} ${CONTROLLER.addressLocality}, Hrvatska.` },
        ],
        [{ text: "E-mail: " }, mailto],
        [
          {
            text: "Nismo imenovali službenika za zaštitu podataka. Za pitanja o obradi i ostvarivanje prava pišite na ",
          },
          mailto,
          { text: "." },
        ],
      ],
    },
    {
      id: "svrha",
      title: "Svrha obrade",
      paragraphs: [
        [
          {
            text: "Podatke obrađujemo kako bismo odgovorili na vaš iskaz interesa za Tablio pilot-program.",
          },
        ],
      ],
      bullets: [
        [{ text: "zaprimanje i evidencija prijave" }],
        [{ text: "slanje transakcijske potvrde na vaš e-mail" }],
        [{ text: "kontakt ako vaš objekt bude odabran za pilot" }],
        [
          {
            text: "interna obrada prijave (operater vidi ime, e-mail i interes)",
          },
        ],
      ],
    },
    {
      id: "pravna-osnova",
      title: "Pravna osnova",
      paragraphs: [
        [
          {
            text: "Pravna osnova je članak 6. stavak 1. točka (b) GDPR-a: obrada je potrebna za poduzimanje radnji na vaš zahtjev prije sklapanja ugovora.",
          },
        ],
        [
          {
            text: "Prijava nije ugovor o korištenju Tablio platforme i ne jamči ulazak u pilot. Pilot obuhvaća do 20 odabranih objekata; odabir je ljudska odluka.",
          },
        ],
        [
          {
            text: "U ovoj verziji ne šaljemo marketinške novosti ni newsletter, zato ne tražimo odvojenu privolu. Ako newsletter kasnije uvedemo, privola (članak 6. stavak 1. točka (a) GDPR-a) bit će zasebno, neoznačeno polje.",
          },
        ],
      ],
    },
    {
      id: "podaci",
      title: "Koje podatke obrađujemo",
      paragraphs: [
        [
          {
            text: "Iz obrasca pohranjujemo ime, e-mail, interes (općenito ili handheld) te vrijeme stvaranja i zadnje izmjene zapisa.",
          },
        ],
        [
          {
            text: "E-mail spremamo u normaliziranom obliku (bez viška razmaka, malim slovima). Ako isti e-mail pošaljete ponovno, ažuriramo ime, interes i vrijeme izmjene. Trećima ne otkrivamo je li e-mail nov.",
          },
        ],
        [
          {
            text: "Uz prijavu ne pohranjujemo IP adresu. IP se može kratko koristiti za ograničenje učestalosti zahtjeva i, na produkciji, za provjeru Cloudflare Turnstilea. Ti tehnički podaci nisu dio zapisa prijave.",
          },
        ],
      ],
    },
    {
      id: "obveza",
      title: "Je li davanje podataka obvezno",
      paragraphs: [
        [
          {
            text: "Davanje imena i e-maila nije zakonska obveza. Potrebno je da možemo zaprimiti prijavu i poslati potvrdu. Ako podatke ne date, prijavu ne možemo obraditi.",
          },
        ],
      ],
    },
    {
      id: "primatelji",
      title: "Primatelji",
      paragraphs: [
        [
          {
            text: "Podatke ne predajemo trećim marketinškim platformama. Primatelji u ovoj verziji su:",
          },
        ],
        [
          {
            text: "Operater FINE STAR-a vidi prijave u internom administratorskom sučelju, ne u tenantskom portalu.",
          },
        ],
      ],
      bullets: [
        [
          {
            text: "hosting i elektronička pošta na poslužiteljima u Europskom gospodarskom prostoru (Hetzner, Helsinki; pošta na mail.tablio.hr)",
          },
        ],
        [
          {
            text: "Cloudflare, za rub mreže (CDN) i, na produkciji, zaštitu obrasca (Turnstile)",
          },
        ],
      ],
    },
    {
      id: "prijenos",
      title: "Prijenos izvan Europskog gospodarskog prostora",
      paragraphs: [
        [
          {
            text: "Hosting i pošta nalaze se u EGP-u. Cloudflare, Inc. je društvo sa sjedištem u Sjedinjenim Američkim Državama i može obrađivati podatke o vezi na rubu mreže te, na produkciji, signal zaštite obrasca.",
          },
        ],
        [
          {
            text: "Ako do prijenosa izvan EGP-a dođe, odvija se prema ugovoru o obradi i odgovarajućim jamstvima koja Cloudflare nudi, uključujući standardne ugovorne klauzule i, gdje se primjenjuje, okvir EU–SAD o zaštiti podataka.",
          },
        ],
      ],
    },
    {
      id: "rok",
      title: "Rok čuvanja",
      paragraphs: [
        [
          {
            text: "Prijavu čuvamo 24 mjeseca od zadnje izmjene zapisa, ili kraće ako zatražite brisanje ili ako prestane komunikacija o pilotu.",
          },
        ],
      ],
    },
    {
      id: "prava",
      title: "Vaša prava",
      paragraphs: [
        [
          {
            text: "Imate pravo zatražiti pristup, ispravak, brisanje, ograničenje obrade, prenosivost i uložiti prigovor, u mjeri u kojoj to GDPR dopušta za ovu pravnu osnovu. Zahtjev pošaljite na ",
          },
          mailto,
          { text: "." },
        ],
        [
          {
            text: "Ova obrada ne temelji se na privoli, pa privolu nema što povući. Ako kasnije date privolu za newsletter, moći ćete je povući u bilo kojem trenutku, bez utjecaja na zakonitost obrade prije povlačenja.",
          },
        ],
        [
          {
            text: "Imate pravo podnijeti pritužbu nadzornom tijelu: Agencija za zaštitu osobnih podataka (AZOP), Ulica Metela Ožegovića 16, 10 000 Zagreb, ",
          },
          { text: "azop.hr", href: "https://azop.hr" },
          { text: ", " },
          { text: "azop@azop.hr", href: "mailto:azop@azop.hr" },
          { text: ". Obrazac zahtjeva: " },
          {
            text: "azop.hr/zahtjev-za-utvrdivanje-povrede-prava",
            href: "https://azop.hr/zahtjev-za-utvrdivanje-povrede-prava/",
          },
          { text: "." },
        ],
      ],
    },
    {
      id: "automatizacija",
      title: "Automatizirano odlučivanje",
      paragraphs: [
        [
          {
            text: "Ne postoji automatizirano donošenje odluka niti izrada profila u smislu članka 22. GDPR-a. Odabir objekata za pilot je ljudska odluka. Prijava ne jamči ulazak.",
          },
        ],
      ],
    },
    {
      id: "kolacici",
      title: "Kolačići",
      paragraphs: [
        [
          {
            text: "U ovoj verziji stranice nema analitike ni neobaveznih kolačića, zato ne prikazujemo banner za kolačiće. Cloudflare može postaviti strogo nužan kolačić radi sigurnosti obrasca.",
          },
        ],
      ],
    },
    {
      id: "izvor",
      title: "Izvor podataka",
      paragraphs: [
        [
          {
            text: "Podatke dajete vi, putem obrasca za rani pristup. Ne prikupljamo ih iz drugih izvora.",
          },
        ],
      ],
    },
  ],
};
