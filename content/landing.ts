import { CONTROLLER } from "./legal/controller";

export const SITE = {
  name: "Tablio",
  tagline: "Povezana platforma za hrvatsko ugostiteljstvo.",
  productLine: "Tablio je proizvod tvrtke FINE STAR d.o.o.",
} as const;

export const NAV = [
  { href: "#platforma", label: "Platforma" },
  { href: "#handheld", label: "Handheld" },
  { href: "#pouzdanost", label: "Pouzdanost" },
  { href: "#pilot", label: "Rani pristup" },
] as const;

export const CTA = {
  earlyAccess: "Prijavite se za rani pristup",
  explore: "Istražite platformu",
  handheld: "Zanima me Tablio handheld",
} as const;

export const HERO = {
  eyebrow: "Razvijeno za hrvatsko ugostiteljstvo",
  title: "Cijelo ugostiteljsko poslovanje. Jedna povezana platforma.",
  lead: "Tablio se razvija kao jedna platforma za prodaju, handheld, kuhinju, zalihe i izvještaje — s planiranom podrškom za hrvatsku fiskalizaciju i rad koji će moći nastaviti i kad internet nestane.",
  note: "Pilot-program planiran je tijekom prosinca 2026. za do 20 odabranih objekata. Prijava ne jamči ulazak.",
} as const;

export const BENEFITS = {
  id: "prednosti",
  items: [
    {
      title: "Modularna platforma",
      body: "Počnite samo s funkcijama koje trebate.",
    },
    {
      title: "Razvijen za nastavak rada bez interneta",
      body: "Podaci će ostati na uređajima i sinkronizirati se nakon povratka veze.",
    },
    {
      title: "Planirani handheld s kartičnom naplatom",
      body: "Narudžba, račun i plaćanje na jednom uređaju.",
    },
    {
      title: "Razvijeno za Hrvatsku",
      body: "Razvija se za fiskalizaciju, porezne zahtjeve i lokalnu podršku.",
    },
  ],
} as const;

export const PLATFORM = {
  id: "platforma",
  title: "Sve što vam treba, povezano u Tabliju",
  lead: "Svaki modul moći ćete koristiti zasebno, a najveću vrijednost dat će kada cijelo poslovanje radi kao jedan sustav. Podatak će se unositi jednom i biti dostupan svugdje gdje je potreban.",
  cards: [
    {
      title: "POS i fiskalizacija",
      body: "Brza prodaja i izdavanje računa. Modul se razvija za hrvatska fiskalna pravila.",
    },
    {
      title: "Stolovi i narudžbe",
      body: "Pregled stolova i statusa narudžbi od konobara do kuhinje i šanka.",
    },
    {
      title: "Proizvodi i normativi",
      body: "Artikli, varijante, recepture, jedinice mjere, porezi i barkodovi.",
    },
    {
      title: "Skladište i nabava",
      body: "Stanje zaliha, zaprimanje robe, utrošak i povezivanje sa stvarnom prodajom.",
    },
    {
      title: "Osoblje i smjene",
      body: "Zaposlenici, radna mjesta, smjene, ovlasti i evidencije.",
    },
    {
      title: "Rezervacije",
      body: "Upravljanje rezervacijama stolova i dolascima gostiju.",
    },
    {
      title: "Izvještaji i analitika",
      body: "Prodaja, promet, troškovi i ključni pokazatelji poslovanja na jednom mjestu.",
    },
    {
      title: "Računovodstvene integracije",
      body: "Planira se sigurna razmjena podataka s računovodstvenim i drugim poslovnim sustavima.",
    },
  ],
} as const;

export const HANDHELD = {
  id: "handheld",
  title: "Od narudžbe do naplate — na jednom uređaju",
  lead: "Na planiranom handheldu konobar će moći primiti narudžbu, poslati je u kuhinju ili šank, izdati račun i prihvatiti kartično plaćanje bez odlaska do zasebne blagajne ili terminala.",
  points: [
    "naručivanje izravno za stolom",
    "slanje u kuhinju i šank",
    "izdavanje računa na uređaju",
    "kartična naplata uz ugovorene naknade",
  ],
  finePrint:
    "POS i handheld uređaji bit će dostupni za kupnju ili najam. Naknade za kartična plaćanja definiraju se ugovorom.",
  photoAlt:
    "Ilustracija ugostiteljske usluge za stolom — planirani Tablio handheld.",
} as const;

export const RELIABILITY = {
  id: "pouzdanost",
  title: "Poslovanje ne staje kada internet nestane",
  lead: "Tablio POS uređaji razvijaju se tako da nastave raditi i kada internetska veza privremeno nije dostupna. Podaci će ostati spremljeni na uređajima. Tablio će automatski sinkronizirati podatke nakon ponovnog povezivanja.",
  steps: [
    {
      title: "Veza se prekine",
      body: "Prodaja i rad na POS uređajima nastavit će se lokalno.",
    },
    {
      title: "Podaci ostaju spremljeni",
      body: "Narudžbe, računi i promjene čuvat će se na uređajima.",
    },
    {
      title: "Veza se vrati",
      body: "Tablio će automatski sinkronizirati podatke među uređajima i platformom.",
    },
  ],
  roamkitTitle: "Dodatna veza uz RoamKit",
  roamkitBody:
    "Opcionalni RoamKit podatkovni paket moći će osigurati mobilnu vezu za Tablio uređaje kada primarna mreža nije dostupna. Podatkovni paket ugovara se i plaća zasebno.",
} as const;

export const FLOW = {
  id: "tok",
  title: "Jedna narudžba. Cijelo poslovanje ažurirano.",
  lead: "Bez višestrukog prepisivanja i odvojenih evidencija. Tablio će povezati događaje iz svakodnevnog rada kako bi svaka ovlaštena osoba imala aktualne i dosljedne podatke.",
  steps: [
    "Konobar unosi narudžbu",
    "Kuhinja ili šank odmah je prima",
    "Prodane količine ulaze u račun i naplatu",
    "Normativi automatski ažuriraju zalihe",
    "Uprava i računovodstvo dobivaju potrebne podatke",
  ],
  openTitle: "Otvoren prema drugim sustavima",
  openBody:
    "Tablio je zamišljen za sigurnu razmjenu podataka s računovodstvenim i drugim poslovnim rješenjima. Vaši poslovni podaci ne ostaju zaključani u zatvorenom sustavu.",
} as const;

export const AUDIENCE = {
  id: "za-koga",
  title: "Jedna platforma za različite vrste ugostiteljstva",
  lead: "Počnite s jednim objektom ili modulom. Tablio je osmišljen tako da se može proširivati kako vaše poslovanje raste.",
  cards: [
    {
      title: "Kafići i barovi",
      body: "Brza prodaja, jednostavno upravljanje artiklima, smjenama, zalihama i kartičnom naplatom.",
      image: "/photos/audience-cafe.jpg",
      alt: "Kafić s šankom i stolovima.",
    },
    {
      title: "Restorani",
      body: "Stolovi, rezervacije, narudžbe, kuhinja, recepture, normativi i naplata povezani u jednom tijeku rada.",
      image: "/photos/audience-restaurant.jpg",
      alt: "Restoranska blagovaonica s postavljenim stolovima.",
    },
    {
      title: "Hoteli i veći objekti",
      body: "Više prodajnih mjesta, različiti timovi, centralni pregled poslovanja i povezivanje s drugim sustavima.",
      image: "/photos/audience-hotel.jpg",
      alt: "Hotelski restoran i bar.",
    },
  ],
} as const;

export const PILOT = {
  id: "pilot",
  title: "Razvijamo Tablio zajedno s ugostiteljima",
  lead: "Vi poznajete svakodnevne izazove ugostiteljstva. Mi gradimo tehnologiju koja ih treba rješavati. Pridružite se prvoj skupini partnera i pomozite nam oblikovati Tablio prema stvarnim potrebama hrvatskih objekata.",
  badge: "Do 20 odabranih mjesta u prvom pilot-programu",
  heading: "Prijava za rani pristup",
  partnersIntro: "Odabrani pilot-partneri dobivaju:",
  partners: [
    "12 mjeseci besplatnog korištenja Tablio softvera, od aktivacije tog objekta",
    "prioritetno uvođenje i podršku",
    "izravan kanal prema razvojnom timu",
    "mogućnost utjecaja na prioritete i funkcionalnosti platforme",
  ],
  terms: [
    "Pilot obuhvaća najviše 20 odabranih objekata. Prijava ne jamči ulazak — odabir je ljudska odluka, ne redoslijed prijava.",
    "12 mjeseci računa se od aktivacije tog objekta.",
    "Besplatno je samo korištenje softvera. Nakon 12 mjeseci vrijedi tada aktualni redovni cjenik.",
    "Hardver, najam, RoamKit podatkovni paketi i kartične naknade nisu uključeni.",
  ],
  note: "Prijava vas ne obvezuje na kupnju. Javit ćemo vam se s informacijama o pilot-programu planiranom tijekom prosinca 2026.",
  fields: {
    name: "Ime",
    email: "E-mail",
    website: "Web stranica",
  },
  submit: "Prijavite se za rani pristup",
  submitting: "Šaljemo prijavu…",
  successTitle: "Prijava je zaprimljena",
  successBody:
    "Hvala. Primili smo vašu prijavu i poslat ćemo potvrdu na uneseni e-mail. Prijava ne jamči ulazak u pilot.",
  errors: {
    name: "Unesite ime.",
    email: "Unesite valjanu e-mail adresu.",
    generic: "Prijava nije spremljena. Provjerite podatke i pokušajte ponovno.",
    network: "Veza s poslužiteljem nije uspjela. Pokušajte ponovno.",
    unavailable: "Prijava trenutačno nije dostupna. Pokušajte kasnije ili pišite na info@tablio.hr.",
    rateLimit: "Previše pokušaja. Pričekajte i pokušajte ponovno.",
  },
} as const;

export const FAQ = {
  id: "pitanja",
  title: "Česta pitanja",
  items: [
    {
      q: "Kada će Tablio biti dostupan?",
      a: "Početak pilot-programa planiran je tijekom prosinca 2026. Prijavljeni korisnici prvi će dobiti informacije o dostupnosti. Ulazak u pilot nije zajamčen.",
    },
    {
      q: "Mogu li koristiti samo pojedine module?",
      a: "Da. Tablio se razvija kao modularna platforma: moći ćete početi s funkcijama koje su vam potrebne i kasnije povezati dodatne dijelove.",
    },
    {
      q: "Hoće li Tablio podržavati hrvatsku fiskalizaciju?",
      a: "Tablio se razvija za hrvatsko tržište. Podrška važećim pravilima fiskalizacije dio je planirane platforme.",
    },
    {
      q: "Radi li Tablio bez interneta?",
      a: "POS uređaji razvijaju se tako da nastave lokalni rad tijekom privremenog prekida veze. Spremljeni podaci sinkronizirat će se nakon ponovnog povezivanja.",
    },
    {
      q: "Što dobivaju pilot-partneri?",
      a: "Do 20 odabranih objekata dobiva 12 mjeseci besplatnog korištenja softvera od aktivacije tog objekta, prioritetno uvođenje i podršku te mogućnost sudjelovanja u razvoju. Prijava ne jamči ulazak; to nisu nužno prvi prijavljeni.",
    },
    {
      q: "Jesu li uređaji uključeni u besplatno razdoblje?",
      a: "Ne. POS i handheld uređaji kupuju se ili unajmljuju zasebno.",
    },
    {
      q: "Plaćaju li se RoamKit podatkovni paketi i kartične transakcije?",
      a: "Da. Podatkovni paketi naplaćivat će se zasebno, a naknade za kartična plaćanja obračunavat će se prema ugovorenim uvjetima.",
    },
    {
      q: "Obvezuje li me prijava za rani pristup?",
      a: "Ne. Prijava služi za iskaz interesa i primanje informacija. Ne stvara obvezu kupnje ili sklapanja ugovora.",
    },
  ],
} as const;

export const CLOSING = {
  title: "Među prvima saznajte kako Tablio može povezati vaš objekt",
  lead: "Pilot-program počinje tijekom prosinca 2026. Prijavite interes i među prvima saznajte kako Tablio može povezati cijelo poslovanje vašeg objekta.",
} as const;

export const FOOTER = {
  tagline: SITE.tagline,
  productLine: SITE.productLine,
  address: `${CONTROLLER.legalName}, ${CONTROLLER.streetAddress}, ${CONTROLLER.postalCode} ${CONTROLLER.addressLocality}`,
  copyright: `© 2026 ${CONTROLLER.legalName}. Sva prava pridržana.`,
  links: [
    { href: "#platforma", label: "Platforma" },
    { href: "#handheld", label: "Handheld" },
    { href: "#pouzdanost", label: "Pouzdanost" },
    { href: "#pilot", label: "Rani pristup" },
    { href: "/privatnost", label: "Privatnost" },
    { href: "/uvjeti", label: "Uvjeti" },
  ],
} as const;
