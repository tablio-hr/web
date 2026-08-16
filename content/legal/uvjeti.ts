import {
  CONTROLLER,
  LEGAL_LAST_UPDATED,
  LEGAL_LAST_UPDATED_LABEL,
  LEGAL_PATHS,
} from "./controller";
import type { LegalPage } from "./types";

const mailto = { text: CONTROLLER.email, href: CONTROLLER.mailto };

export const TERMS_PAGE: LegalPage = {
  path: LEGAL_PATHS.terms,
  title: "Uvjeti korištenja",
  description:
    "Uporaba marketinške stranice tablio.hr, intelektualno vlasništvo i izdavatelj FINE STAR d.o.o.",
  lastUpdated: LEGAL_LAST_UPDATED,
  lastUpdatedLabel: LEGAL_LAST_UPDATED_LABEL,
  intro: [
    [
      {
        text: "Ovi uvjeti uređuju uporabu marketinške stranice tablio.hr (i stage.tablio.hr). Nisu ugovor o korištenju Tablio softvera.",
      },
    ],
  ],
  sections: [
    {
      id: "izdavac",
      title: "Izdavatelj",
      paragraphs: [
        [
          {
            text: `Stranicu izdaje ${CONTROLLER.legalName}, ${CONTROLLER.streetAddress}, ${CONTROLLER.postalCode} ${CONTROLLER.addressLocality}. Tablio je proizvod tog društva. Kontakt: `,
          },
          mailto,
          { text: "." },
        ],
      ],
    },
    {
      id: "uporaba",
      title: "Uporaba stranice",
      paragraphs: [
        [
          {
            text: "Stranica informira o planiranoj povezanoj platformi za hrvatsko ugostiteljstvo. Sadržaj smijete pregledavati za vlastito informiranje. Nije ponuda, nije prihvat i ne znači da je proizvod već dostupan.",
          },
        ],
        [
          {
            text: "Ne smijete sadržaj umnožavati radi preprodaje, predstavljati ga kao vlastiti ni koristiti ga na način koji narušava rad stranice.",
          },
        ],
      ],
    },
    {
      id: "prijava",
      title: "Prijava za rani pristup",
      paragraphs: [
        [
          {
            text: "Obrazac na stranici je iskaz interesa za pilot. Prijava ne jamči ulazak. Pilot obuhvaća najviše 20 odabranih objekata; to nisu nužno prvi prijavljeni. Uvjeti pilota navedeni su uz obrazac. Obrada osobnih podataka iz obrasca opisana je u ",
          },
          { text: "obavijesti o privatnosti", href: LEGAL_PATHS.privacy },
          { text: "." },
        ],
      ],
    },
    {
      id: "vlasnistvo",
      title: "Intelektualno vlasništvo",
      paragraphs: [
        [
          {
            text: "Naziv Tablio, znak, tekstovi, slike i ostali sadržaj stranice pripadaju FINE STAR d.o.o. ili davateljima licence, osim ako je drugačije navedeno. Sva prava pridržana.",
          },
        ],
      ],
    },
    {
      id: "odgovornost",
      title: "Odgovornost",
      paragraphs: [
        [
          {
            text: "Trudimo se da informacije budu točne. Stranica se pruža u postojećem stanju. Ne jamčimo neprekidnu dostupnost ni da će svaka opisana funkcija biti dio prvog izdanja.",
          },
        ],
      ],
    },
    {
      id: "pravo",
      title: "Mjerodavno pravo",
      paragraphs: [
        [
          {
            text: "Mjerodavno je pravo Republike Hrvatske. Za sporove su nadležni sudovi u Republici Hrvatskoj, uz pravila o zaštiti potrošača ako se primjenjuju.",
          },
        ],
      ],
    },
  ],
};
