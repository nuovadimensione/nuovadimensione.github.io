
document.addEventListener("DOMContentLoaded", () => {
  "use strict";

  /* =========================================
     1. CONFIGURAZIONE GENERALE
  ========================================= */

  const $ = (selector, parent = document) => parent.querySelector(selector);
  const $$ = (selector, parent = document) => [...parent.querySelectorAll(selector)];

  const currentYear = $("#currentYear");
  if (currentYear) currentYear.textContent = new Date().getFullYear();

  /* =========================================
     2. MENU PRINCIPALE
  ========================================= */

  const menuToggle = $("#menuToggle");
  const mobileNav = $("#mobileNav");

  if (menuToggle && mobileNav) {
    menuToggle.addEventListener("click", () => {
      const isOpen = mobileNav.classList.toggle("is-open");
      menuToggle.classList.toggle("active", isOpen);
      menuToggle.setAttribute("aria-expanded", String(isOpen));
    });

    $$("#mobileNav a").forEach(link => {
      link.addEventListener("click", () => {
        mobileNav.classList.remove("is-open");
        menuToggle.classList.remove("active");
        menuToggle.setAttribute("aria-expanded", "false");
      });
    });

    document.addEventListener("click", event => {
      if (
        mobileNav.classList.contains("is-open") &&
        !mobileNav.contains(event.target) &&
        !menuToggle.contains(event.target)
      ) {
        mobileNav.classList.remove("is-open");
        menuToggle.classList.remove("active");
        menuToggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  window.addEventListener("scroll", () => {
    const header = $(".header");
    if (header) header.classList.toggle("scrolled", window.scrollY > 30);
  });

  /* =========================================
     3. SCROLL ANCHOR
  ========================================= */

  $$('a[href^="#"]').forEach(link => {
    link.addEventListener("click", event => {
      if (link.closest("#websiteDemoContent")) return;

      const target = $(link.getAttribute("href"));
      if (!target) return;

      event.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });

  /* =========================================
     4. ANIMAZIONI REVEAL
  ========================================= */

  const revealElements = $$(
    ".section, .product-card, .pricing-card, .portfolio-card, .process-card, .faq-item, .extra-item"
  );

  if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    const revealObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("revealed");
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    revealElements.forEach(element => {
      element.classList.add("reveal");
      revealObserver.observe(element);
    });
  } else {
    revealElements.forEach(element => element.classList.add("revealed"));
  }

  /* =========================================
     5. DEMO PRODOTTI INTERATTIVE
  ========================================= */

  const demoTabs = $$(".demo-tab");

  demoTabs.forEach(tab => {
    tab.addEventListener("click", () => {
      const demoName = tab.dataset.demo;

      demoTabs.forEach(item => item.classList.remove("active"));
      tab.classList.add("active");

      const standPanel = $("#standDemo");
      const stickerPanel = $("#stickerDemo");

      if (standPanel) standPanel.hidden = demoName !== "stand";
      if (stickerPanel) stickerPanel.hidden = demoName !== "sticker";
    });
  });

  $$(".activate-demo").forEach(button => {
    button.addEventListener("click", () => {
      const panel = button.closest("#standDemo, #stickerDemo");
      if (!panel) return;

      const screen = $(".demo-stand-screen, .demo-sticker-inner", panel);
      if (!screen) return;

      screen.classList.add("show-success");
      button.classList.add("is-active");

      const originalText = button.textContent;
      button.textContent = "Demo attivata!";

      window.setTimeout(() => {
        screen.classList.remove("show-success");
        button.classList.remove("is-active");
        button.textContent = originalText;
      }, 3000);
    });
  });

  /* =========================================
     6. DATI DELLE NOVE DEMO
  ========================================= */

  const projects = {
    restaurant: {
      title: "Ristorante",
      category: "Food",
      brand: "LUMIÈRE",
      eyebrow: "CUCINA CONTEMPORANEA",
      headline: "Il gusto di vivere momenti speciali.",
      description: "Una cucina ricercata, ingredienti selezionati e un'atmosfera pensata per trasformare ogni cena in un'esperienza.",
      cta: "Scopri il menù",
      secondary: "Prenota un tavolo",
      introTitle: "La nostra filosofia",
      intro: "Crediamo nella qualità delle materie prime, nella stagionalità e nella bellezza delle cose fatte con cura.",
      servicesTitle: "Una cucina da scoprire",
      services: [
        ["01", "La cucina", "Piatti contemporanei realizzati con ingredienti freschi e stagionali."],
        ["02", "La cantina", "Una selezione di etichette per accompagnare ogni portata."],
        ["03", "L'esperienza", "Un ambiente elegante per cene, incontri e occasioni speciali."]
      ],
      menuTitle: "Una selezione dal menù",
      menu: [
        ["Carpaccio di manzo", "Con rucola, grana e olio al tartufo", "€16"],
        ["Risotto allo zafferano", "Mantecato con burro e Parmigiano", "€18"],
        ["Filetto alla griglia", "Con verdure di stagione", "€26"],
        ["Tiramisù della casa", "Preparato ogni giorno", "€9"]
      ],
      closing: "La tavola è il posto dove tutto comincia.",
      address: "Via del Centro · La tua città",
      phone: "Contattaci per informazioni"
    },

    bar: {
      title: "Bar & Lounge",
      category: "Food",
      brand: "NOIR",
      eyebrow: "COCKTAIL BAR · CAFÉ",
      headline: "Il tuo momento, fuori dal tempo.",
      description: "Caffè, cocktail ricercati e un'atmosfera speciale. Dal primo espresso all'ultimo brindisi.",
      cta: "Scopri la selezione",
      secondary: "Vieni a trovarci",
      introTitle: "Un luogo da vivere",
      intro: "Un punto d'incontro dove ogni dettaglio contribuisce a creare un'esperienza autentica, rilassata e contemporanea.",
      servicesTitle: "Dal mattino alla sera",
      services: [
        ["01", "Coffee time", "Caffetteria, colazioni e piccole pause di qualità."],
        ["02", "Aperitivo", "Drink selezionati e accompagnamenti sfiziosi."],
        ["03", "After dinner", "Cocktail e serate da condividere."]
      ],
      menuTitle: "La nostra selezione",
      menu: [
        ["Espresso italiano", "Una miscela dal gusto intenso", "€1,50"],
        ["Signature cocktail", "La nostra proposta della casa", "€12"],
        ["Spritz classico", "Aperitivo e tradizione", "€8"],
        ["Tagliere gourmet", "Selezione di prodotti italiani", "€16"]
      ],
      closing: "Le cose belle succedono quando ci si incontra.",
      address: "Centro città · La tua città",
      phone: "Informazioni e disponibilità"
    },

    hair: {
      title: "Parrucchiere",
      category: "Beauty",
      brand: "ATELIER HAIR",
      eyebrow: "HAIR BEAUTY EXPERIENCE",
      headline: "I tuoi capelli. La tua identità.",
      description: "Tagli, colore e trattamenti personalizzati per valorizzare la tua bellezza naturale.",
      cta: "Scopri i servizi",
      secondary: "Prenota un appuntamento",
      introTitle: "La bellezza dei dettagli",
      intro: "Ascoltiamo le tue esigenze e studiamo un percorso personalizzato per trovare lo stile che ti rappresenta.",
      servicesTitle: "I nostri servizi",
      services: [
        ["01", "Hair styling", "Taglio, piega e styling personalizzato."],
        ["02", "Color design", "Colore, balayage e tecniche di schiaritura."],
        ["03", "Hair care", "Trattamenti professionali per la salute dei capelli."]
      ],
      menuTitle: "I nostri trattamenti",
      menu: [
        ["Taglio donna", "Consulenza e taglio personalizzato", "Da €35"],
        ["Piega", "Styling e finish professionale", "Da €25"],
        ["Colore", "Servizio colore personalizzato", "Da €55"],
        ["Trattamento", "Percorso nutriente e ristrutturante", "Da €30"]
      ],
      closing: "Il tuo stile merita attenzione.",
      address: "Via della Bellezza · La tua città",
      phone: "Prenotazioni su appuntamento"
    },

    beauty: {
      title: "Centro estetico",
      category: "Beauty",
      brand: "ÉLÉGANCE",
      eyebrow: "BEAUTY & WELLNESS",
      headline: "Ritagliati il tempo per te.",
      description: "Trattamenti estetici e rituali di benessere in un ambiente dedicato alla cura di sé.",
      cta: "Esplora i trattamenti",
      secondary: "Prenota la tua esperienza",
      introTitle: "Il tuo spazio di benessere",
      intro: "Ogni trattamento è un momento dedicato a te, alla tua bellezza e al tuo equilibrio.",
      servicesTitle: "Prenditi cura di te",
      services: [
        ["01", "Viso", "Trattamenti personalizzati per la cura della pelle."],
        ["02", "Corpo", "Rituali dedicati al benessere e alla bellezza."],
        ["03", "Mani & piedi", "Manicure, pedicure e cura dei dettagli."]
      ],
      menuTitle: "Trattamenti selezionati",
      menu: [
        ["Trattamento viso", "Pulizia e cura personalizzata", "Da €45"],
        ["Manicure", "Cura e bellezza delle mani", "Da €20"],
        ["Pedicure", "Trattamento estetico completo", "Da €30"],
        ["Rituale corpo", "Un momento dedicato al relax", "Da €55"]
      ],
      closing: "La tua bellezza, il tuo momento.",
      address: "Via del Benessere · La tua città",
      phone: "Prenotazioni su appuntamento"
    },

    hotel: {
      title: "Hotel",
      category: "Hospitality",
      brand: "THE GRAND",
      eyebrow: "BOUTIQUE HOTEL",
      headline: "Un soggiorno da ricordare.",
      description: "Ospitalità, comfort e attenzione ai dettagli per vivere una destinazione in modo speciale.",
      cta: "Scopri le camere",
      secondary: "Richiedi disponibilità",
      introTitle: "Benvenuti a casa",
      intro: "Un luogo dove eleganza e accoglienza si incontrano. Ogni spazio è pensato per offrirti un soggiorno piacevole.",
      servicesTitle: "Il piacere di soggiornare",
      services: [
        ["01", "Camere eleganti", "Spazi confortevoli e curati in ogni dettaglio."],
        ["02", "Colazione", "Un risveglio piacevole con una selezione dedicata."],
        ["03", "Accoglienza", "Un servizio attento durante tutto il soggiorno."]
      ],
      menuTitle: "Le nostre sistemazioni",
      menu: [
        ["Classic Room", "Comfort e funzionalità", "Da €110"],
        ["Deluxe Room", "Spazi più ampi e dettagli esclusivi", "Da €150"],
        ["Junior Suite", "Un soggiorno all'insegna del comfort", "Da €190"],
        ["Grand Suite", "La nostra esperienza più esclusiva", "Da €260"]
      ],
      closing: "Il tuo prossimo viaggio comincia qui.",
      address: "Centro città · La tua destinazione",
      phone: "Informazioni e prenotazioni"
    },

    shop: {
      title: "Negozio",
      category: "Retail",
      brand: "OBJECTS",
      eyebrow: "SELECTED DESIGN & LIFESTYLE",
      headline: "Oggetti scelti per ispirare.",
      description: "Una selezione di prodotti, accessori e idee pensate per chi ama distinguersi.",
      cta: "Esplora la collezione",
      secondary: "Scopri il negozio",
      introTitle: "La bellezza della scelta",
      intro: "Selezioniamo prodotti che uniscono estetica, qualità e personalità. Ogni collezione racconta uno stile.",
      servicesTitle: "Esplora il nostro mondo",
      services: [
        ["01", "Nuovi arrivi", "Scopri le ultime novità selezionate per te."],
        ["02", "Collezioni", "Una selezione curata per ogni stile."],
        ["03", "Qualità", "Attenzione ai materiali e ai dettagli."]
      ],
      menuTitle: "Una selezione per te",
      menu: [
        ["Essential Object", "Design essenziale e contemporaneo", "€39"],
        ["Daily Collection", "Un accessorio da vivere ogni giorno", "€49"],
        ["Signature Piece", "Un dettaglio che fa la differenza", "€69"],
        ["Limited Edition", "Una selezione in edizione speciale", "€89"]
      ],
      closing: "Trova qualcosa che parli di te.",
      address: "Online store · La tua città",
      phone: "Assistenza clienti"
    },

    construction: {
      title: "Edilizia",
      category: "Business",
      brand: "FORMA",
      eyebrow: "COSTRUZIONI · RISTRUTTURAZIONI",
      headline: "Costruiamo valore. Realizziamo progetti.",
      description: "Soluzioni per costruzioni, ristrutturazioni e interventi professionali, con attenzione a ogni dettaglio.",
      cta: "Scopri i servizi",
      secondary: "Richiedi un preventivo",
      introTitle: "Competenza al tuo servizio",
      intro: "Seguiamo ogni progetto con metodo, professionalità e attenzione alle esigenze del cliente.",
      servicesTitle: "Cosa possiamo realizzare",
      services: [
        ["01", "Ristrutturazioni", "Interventi completi e personalizzati per ogni ambiente."],
        ["02", "Costruzioni", "Realizzazione di opere e nuovi progetti."],
        ["03", "Manutenzioni", "Interventi e soluzioni per immobili e strutture."]
      ],
      menuTitle: "Il nostro metodo",
      menu: [
        ["01 · Analisi", "Ascolto delle esigenze e valutazione del progetto", ""],
        ["02 · Progettazione", "Studio delle soluzioni più adatte", ""],
        ["03 · Realizzazione", "Organizzazione e gestione degli interventi", ""],
        ["04 · Consegna", "Verifica finale e cura dei dettagli", ""]
      ],
      closing: "Il prossimo progetto potrebbe essere il tuo.",
      address: "Operativi sul territorio",
      phone: "Richiedi informazioni"
    },

    pizzeria: {
      title: "Pizzeria",
      category: "Food",
      brand: "FORNO 21",
      eyebrow: "PIZZA · TRADIZIONE · PASSIONE",
      headline: "La pizza fatta come piace a te.",
      description: "Impasti curati, ingredienti selezionati e passione per una delle tradizioni più amate.",
      cta: "Scopri le pizze",
      secondary: "Ordina la tua pizza",
      introTitle: "La passione è nell'impasto",
      intro: "Dalla scelta delle farine alla selezione degli ingredienti, ogni pizza nasce da attenzione e passione.",
      servicesTitle: "La nostra esperienza",
      services: [
        ["01", "Impasti", "Lavorazioni attente e tempi di maturazione curati."],
        ["02", "Ingredienti", "Materie prime selezionate e abbinamenti equilibrati."],
        ["03", "Tradizione", "Il piacere della pizza, ogni giorno."]
      ],
      menuTitle: "Le pizze più amate",
      menu: [
        ["Margherita", "Pomodoro, mozzarella, basilico", "€7"],
        ["Diavola", "Pomodoro, mozzarella, salame piccante", "€9"],
        ["Quattro formaggi", "Selezione di formaggi", "€10"],
        ["Speciale della casa", "Ingredienti selezionati", "€12"]
      ],
      closing: "Una pizza, mille buoni motivi per tornare.",
      address: "Via del Forno · La tua città",
      phone: "Ordini e informazioni"
    },

    bnb: {
      title: "Bed & Breakfast",
      category: "Hospitality",
      brand: "CASA BELLA",
      eyebrow: "B&B · OSPITALITÀ",
      headline: "Sentirsi a casa, anche lontano da casa.",
      description: "Un'accoglienza autentica, ambienti confortevoli e il piacere di scoprire nuovi luoghi.",
      cta: "Scopri le camere",
      secondary: "Verifica disponibilità",
      introTitle: "Una piccola casa, grandi attenzioni",
      intro: "Vogliamo offrirti un soggiorno sereno, fatto di comfort, semplicità e attenzione personale.",
      servicesTitle: "Tutto ciò che serve",
      services: [
        ["01", "Camere accoglienti", "Ambienti curati per il tuo riposo."],
        ["02", "Colazione", "Inizia la giornata con il piacere di una buona colazione."],
        ["03", "Accoglienza", "Informazioni e consigli per vivere il territorio."]
      ],
      menuTitle: "Le nostre camere",
      menu: [
        ["Camera Matrimoniale", "Comfort e tranquillità", "Da €75"],
        ["Camera Superior", "Spazi più ampi e comfort aggiuntivo", "Da €95"],
        ["Camera Deluxe", "Un'esperienza ancora più speciale", "Da €115"]
      ],
      closing: "La tua prossima pausa comincia qui.",
      address: "Centro storico · La tua destinazione",
      phone: "Informazioni e prenotazioni"
    }
  };

  /* =========================================
     7. GENERATORE DEI SITI DIMOSTRATIVI
  ========================================= */

 
const demoContent = $("#websiteDemoContent");

function createWebsite(project, key) {
  const palettes = {
    restaurant: ["#171713", "#c5a36b", "#f5f0e7"],
    bar: ["#101014", "#c49a63", "#f5eee5"],
    hair: ["#eee7df", "#98735d", "#30251f"],
    beauty: ["#f8eff1", "#b77e89", "#38272d"],
    hotel: ["#18231f", "#c4a77b", "#f4f0e7"],
    shop: ["#f4f1e9", "#9b7953", "#28251f"],
    construction: ["#1c2025", "#d5a443", "#f2f0e9"],
    pizzeria: ["#f5eee3", "#b74632", "#302721"],
    bnb: ["#eee9df", "#a47e5e", "#30271f"]
  };

  const [bg, accent, fg] = palettes[key];

  const escapeHTML = value =>
    String(value ?? "").replace(/[&<>"']/g, char => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;"
    }[char]));

  const services = project.services || [];
  const menu = project.menu || [];

  const button = (text, target = "#demo-contact", extra = "") => `
    <a class="ds-button ${extra}" href="${target}">
      ${escapeHTML(text)}
    </a>
  `;

  const serviceCards = services.map((item, i) => `
    <article class="ds-service-card">
      <span class="ds-index">${escapeHTML(item[0])}</span>
      <h3>${escapeHTML(item[1])}</h3>
      <p>${escapeHTML(item[2])}</p>
    </article>
  `).join("");

  const menuRows = menu.map(item => `
    <article class="ds-menu-row">
      <div>
        <h3>${escapeHTML(item[0])}</h3>
        <p>${escapeHTML(item[1])}</p>
      </div>
      <strong>${escapeHTML(item[2])}</strong>
    </article>
  `).join("");

  const contact = `
    <section class="ds-contact" id="demo-contact">
      <span class="ds-eyebrow">PARLIAMONE</span>
      <h2>${escapeHTML(project.closing)}</h2>
      <p>${escapeHTML(project.address)}</p>
      <button class="ds-button ds-contact-action" type="button">
        ${escapeHTML(project.secondary)}
      </button>
      <small>${escapeHTML(project.phone)}</small>
    </section>
  `;

  const footer = `
    <footer class="ds-footer">
      <strong>${escapeHTML(project.brand)}</strong>
      <span>© ${new Date().getFullYear()} ${escapeHTML(project.brand)}</span>
      <span>Concept demo · Contenuti dimostrativi</span>
    </footer>
  `;

  const intro = `
    <section class="ds-section ds-intro" id="demo-about">
      <span class="ds-eyebrow">LA NOSTRA IDENTITÀ</span>
      <h2>${escapeHTML(project.introTitle)}</h2>
      <p>${escapeHTML(project.intro)}</p>
    </section>
  `;

  const styles = `
    .ds-demo-site {
      width:100%;
      min-width:0;
      min-height:100%;
      overflow:hidden;
      position:relative;
      background:var(--ds-bg);
      color:var(--ds-fg);
      font-family:Arial,Helvetica,sans-serif;
      font-size:14px;
      line-height:1.65;
      container-type:inline-size;
      isolation:isolate;
    }

    .ds-demo-site *,
    .ds-demo-site *::before,
    .ds-demo-site *::after {
      box-sizing:border-box;
    }

    .ds-demo-site a {
      color:inherit;
      text-decoration:none;
    }

    .ds-demo-site button {
      font:inherit;
      cursor:pointer;
    }

    .ds-demo-site h1,
    .ds-demo-site h2,
    .ds-demo-site h3,
    .ds-demo-site p {
      overflow-wrap:break-word;
    }

    .ds-demo-site h1,
    .ds-demo-site h2,
    .ds-demo-site h3,
    .ds-demo-site p {
      margin-top:0;
    }

    .ds-demo-site .ds-eyebrow {
      display:block;
      color:var(--ds-accent);
      font-size:10px;
      font-weight:bold;
      letter-spacing:2.5px;
      text-transform:uppercase;
    }

    .ds-demo-site .ds-button {
      display:inline-flex;
      align-items:center;
      justify-content:center;
      min-height:45px;
      padding:12px 21px;
      border:1px solid var(--ds-accent);
      background:var(--ds-accent);
      color:#171717;
      font-size:10px;
      font-weight:bold;
      letter-spacing:1px;
      text-align:center;
      text-transform:uppercase;
      transition:transform .2s,opacity .2s;
    }

    .ds-demo-site .ds-button:hover {
      transform:translateY(-2px);
      opacity:.88;
    }

    .ds-demo-site .ds-button-outline {
      background:transparent;
      color:var(--ds-fg);
      border-color:currentColor;
    }

    .ds-demo-site .ds-actions {
      display:flex;
      align-items:center;
      flex-wrap:wrap;
      gap:12px;
      margin-top:28px;
    }

    .ds-demo-site .ds-section {
      padding:76px 8%;
    }

    .ds-demo-site .ds-section-heading {
      max-width:650px;
      margin:0 auto 40px;
      text-align:center;
    }

    .ds-demo-site .ds-section-heading h2 {
      margin:12px 0;
      font-family:Georgia,serif;
      font-size:clamp(30px,5cqw,48px);
      font-weight:normal;
      line-height:1.15;
    }

    .ds-demo-site .ds-section-heading p {
      opacity:.7;
    }

    .ds-demo-site .ds-topbar {
      position:relative;
      z-index:10;
      display:flex;
      align-items:center;
      justify-content:space-between;
      gap:20px;
      padding:19px 6%;
      border-bottom:1px solid rgba(128,128,128,.2);
    }

    .ds-demo-site .ds-logo {
      font-family:Georgia,serif;
      font-size:23px;
      font-weight:bold;
      letter-spacing:2px;
      white-space:nowrap;
    }

    .ds-demo-site .ds-nav {
      display:flex;
      align-items:center;
      gap:22px;
      font-size:10px;
      letter-spacing:1px;
      text-transform:uppercase;
    }

    .ds-demo-site .ds-nav a:hover {
      color:var(--ds-accent);
    }

    .ds-demo-site .ds-nav-cta {
      padding:9px 14px;
      border:1px solid var(--ds-accent);
      color:var(--ds-accent);
    }

    .ds-demo-site .ds-menu-toggle {
      display:none;
      padding:8px 12px;
      border:1px solid currentColor;
      background:transparent;
      color:var(--ds-fg);
      font-size:10px;
      letter-spacing:1px;
    }

    .ds-demo-site .ds-intro {
      max-width:850px;
      margin:auto;
      text-align:center;
    }

    .ds-demo-site .ds-intro h2 {
      max-width:680px;
      margin:16px auto;
      font-family:Georgia,serif;
      font-size:clamp(32px,5cqw,53px);
      font-weight:normal;
      line-height:1.12;
    }

    .ds-demo-site .ds-intro p {
      max-width:620px;
      margin:0 auto;
      opacity:.7;
      line-height:1.9;
    }

    .ds-demo-site .ds-services {
      display:grid;
      grid-template-columns:repeat(3,minmax(0,1fr));
      gap:16px;
    }

    .ds-demo-site .ds-service-card {
      min-width:0;
      padding:27px 23px;
      border:1px solid rgba(128,128,128,.25);
    }

    .ds-demo-site .ds-index {
      color:var(--ds-accent);
      font-size:11px;
      letter-spacing:2px;
    }

    .ds-demo-site .ds-service-card h3 {
      margin:20px 0 8px;
      font-family:Georgia,serif;
      font-size:22px;
      font-weight:normal;
    }

    .ds-demo-site .ds-service-card p {
      margin:0;
      font-size:12px;
      opacity:.7;
    }

    .ds-demo-site .ds-contact {
      padding:78px 8%;
      background:rgba(128,128,128,.09);
      text-align:center;
    }

    .ds-demo-site .ds-contact h2 {
      max-width:700px;
      margin:17px auto;
      font-family:Georgia,serif;
      font-size:clamp(30px,5cqw,49px);
      font-weight:normal;
      line-height:1.15;
    }

    .ds-demo-site .ds-contact p,
    .ds-demo-site .ds-contact small {
      opacity:.7;
    }

    .ds-demo-site .ds-contact small {
      display:block;
      margin-top:14px;
    }

    .ds-demo-site .ds-footer {
      display:flex;
      align-items:center;
      justify-content:space-between;
      flex-wrap:wrap;
      gap:15px;
      padding:28px 7%;
      border-top:1px solid rgba(128,128,128,.2);
      font-size:10px;
      opacity:.7;
    }

    .ds-demo-site .ds-toast {
      position:sticky;
      bottom:12px;
      z-index:30;
      width:max-content;
      max-width:90%;
      margin:12px auto;
      padding:12px 18px;
      background:#171717;
      color:white;
      font-size:12px;
      opacity:0;
      transform:translateY(8px);
      transition:.25s;
      pointer-events:none;
    }

    .ds-demo-site .ds-toast.is-visible {
      opacity:1;
      transform:translateY(0);
    }

    /* ELEMENTI VISIVI REALIZZATI SOLO CON DIV */

    .ds-demo-site .ds-visual {
      position:relative;
      display:flex;
      align-items:center;
      justify-content:center;
      min-width:0;
      overflow:hidden;
      isolation:isolate;
    }

    .ds-demo-site .ds-visual::before,
    .ds-demo-site .ds-visual::after {
      content:"";
      position:absolute;
      pointer-events:none;
    }

    .ds-demo-site .ds-visual-label {
      position:relative;
      z-index:2;
      font-family:Georgia,serif;
      text-align:center;
    }

    /* --------------------------------
       1. RISTORANTE
    -------------------------------- */

    .ds-restaurant-hero {
      display:grid;
      grid-template-columns:1fr 1fr;
      align-items:center;
      gap:35px;
      min-height:490px;
      padding:65px 8%;
      background:#171713;
      color:#f5f0e7;
    }

    .ds-restaurant-copy h1 {
      max-width:550px;
      margin:20px 0;
      font-family:Georgia,serif;
      font-size:clamp(43px,6cqw,76px);
      font-weight:normal;
      line-height:1.04;
    }

    .ds-restaurant-copy p {
      max-width:430px;
      opacity:.72;
      line-height:1.9;
    }

    .ds-restaurant-visual {
      min-height:345px;
      background:#29271f;
    }

    .ds-restaurant-visual::before {
      width:75%;
      height:75%;
      border:1px solid rgba(197,163,107,.7);
      transform:rotate(45deg);
    }

    .ds-restaurant-visual::after {
      width:58%;
      height:58%;
      border:1px solid rgba(197,163,107,.45);
      border-radius:50%;
    }

    .ds-restaurant-visual .ds-visual-label {
      color:#c5a36b;
      font-size:70px;
    }

    .ds-restaurant-menu {
      max-width:780px;
      margin:auto;
    }

    .ds-menu-row {
      display:flex;
      justify-content:space-between;
      align-items:center;
      gap:20px;
      padding:19px 0;
      border-bottom:1px solid rgba(128,128,128,.25);
    }

    .ds-menu-row h3 {
      margin:0 0 4px;
      font-family:Georgia,serif;
      font-size:20px;
      font-weight:normal;
    }

    .ds-menu-row p {
      margin:0;
      font-size:11px;
      opacity:.65;
    }

    .ds-menu-row strong {
      color:var(--ds-accent);
      white-space:nowrap;
    }

    .ds-restaurant-feature {
      display:grid;
      grid-template-columns:1fr 1fr;
      gap:35px;
      align-items:center;
      background:#26251e;
      color:#f5f0e7;
    }

    .ds-restaurant-feature-visual {
      min-height:260px;
      background:linear-gradient(135deg,#514432,#25251e);
    }

    .ds-restaurant-feature-visual::before {
      width:190px;
      height:190px;
      border:1px solid #c5a36b;
      border-radius:50%;
      box-shadow:0 0 0 18px rgba(197,163,107,.08),0 0 0 38px rgba(197,163,107,.05);
    }

    .ds-restaurant-feature h2 {
      font-family:Georgia,serif;
      font-size:36px;
      font-weight:normal;
    }

    /* --------------------------------
       2. BAR
    -------------------------------- */

    .ds-bar-hero {
      position:relative;
      display:flex;
      min-height:510px;
      flex-direction:column;
      align-items:center;
      justify-content:center;
      padding:75px 8%;
      overflow:hidden;
      background:#101014;
      color:#f5eee5;
      text-align:center;
    }

    .ds-bar-hero::before {
      content:"";
      position:absolute;
      width:370px;
      height:370px;
      border:1px solid rgba(196,154,99,.35);
      border-radius:50%;
      box-shadow:0 0 0 35px rgba(196,154,99,.04),0 0 0 75px rgba(196,154,99,.035);
    }

    .ds-bar-hero h1 {
      position:relative;
      max-width:850px;
      margin:24px auto;
      font-family:Georgia,serif;
      font-size:clamp(48px,8cqw,94px);
      font-weight:normal;
      line-height:1;
    }

    .ds-bar-hero p {
      position:relative;
      max-width:520px;
      opacity:.75;
    }

    .ds-bar-hero .ds-actions {
      position:relative;
      justify-content:center;
    }

    .ds-bar-strip {
      display:grid;
      grid-template-columns:repeat(3,1fr);
      background:#c49a63;
      color:#171717;
    }

    .ds-bar-strip div {
      padding:25px 12px;
      border-right:1px solid rgba(0,0,0,.2);
      text-align:center;
      font-size:10px;
      font-weight:bold;
      letter-spacing:2px;
    }

    .ds-bar-events {
      display:grid;
      grid-template-columns:1fr 1fr;
      gap:18px;
    }

    .ds-bar-event {
      min-height:210px;
      padding:30px;
      border:1px solid rgba(196,154,99,.4);
      background:linear-gradient(145deg,rgba(196,154,99,.12),transparent);
    }

    .ds-bar-event span {
      color:var(--ds-accent);
      font-size:10px;
      letter-spacing:2px;
    }

    .ds-bar-event h3 {
      margin:18px 0 8px;
      font-family:Georgia,serif;
      font-size:28px;
      font-weight:normal;
    }

    .ds-bar-event p {
      font-size:12px;
      opacity:.7;
    }

    /* --------------------------------
       3. HAIR SALON
    -------------------------------- */

    .ds-hair-hero {
      display:grid;
      grid-template-columns:1fr 1fr;
      gap:35px;
      align-items:center;
      min-height:500px;
      padding:60px 8%;
      background:#e6dcd2;
      color:#30251f;
    }

    .ds-hair-copy h1 {
      margin:20px 0;
      font-family:Georgia,serif;
      font-size:clamp(43px,6cqw,76px);
      font-weight:normal;
      line-height:1.03;
    }

    .ds-hair-copy p {
      max-width:430px;
      opacity:.7;
    }

    .ds-hair-visual {
      min-height:380px;
      background:#b99b86;
    }

    .ds-hair-visual::before {
      top:10%;
      right:12%;
      width:65%;
      height:85%;
      background:linear-gradient(160deg,#d8c4b4,#85624e);
      border-radius:48% 48% 5px 5px;
    }

    .ds-hair-visual::after {
      top:22%;
      left:10%;
      width:48%;
      height:65%;
      border:1px solid rgba(255,255,255,.55);
      border-radius:48% 48% 0 0;
    }

    .ds-hair-visual .ds-visual-label {
      z-index:3;
      color:white;
      font-size:35px;
      letter-spacing:4px;
      text-shadow:0 2px 15px rgba(0,0,0,.2);
    }

    .ds-hair-manifesto {
      display:grid;
      grid-template-columns:.7fr 1.3fr;
      gap:30px;
      align-items:center;
      background:#30251f;
      color:#f4ece4;
    }

    .ds-hair-manifesto strong {
      color:#c5a38c;
      font-family:Georgia,serif;
      font-size:65px;
      font-weight:normal;
    }

    .ds-hair-manifesto h2 {
      font-family:Georgia,serif;
      font-size:34px;
      font-weight:normal;
    }

    .ds-hair-list {
      max-width:760px;
      margin:auto;
    }

    .ds-hair-list .ds-menu-row {
      padding:23px 0;
    }

    /* --------------------------------
       4. CENTRO ESTETICO
    -------------------------------- */

    .ds-beauty-hero {
      position:relative;
      min-height:500px;
      display:flex;
      flex-direction:column;
      align-items:center;
      justify-content:center;
      padding:80px 8%;
      overflow:hidden;
      background:#f8eff1;
      color:#38272d;
      text-align:center;
    }

    .ds-beauty-hero::before {
      content:"";
      position:absolute;
      width:330px;
      height:430px;
      border:1px solid rgba(183,126,137,.4);
      border-radius:50%;
      transform:rotate(35deg);
    }

    .ds-beauty-hero::after {
      content:"";
      position:absolute;
      width:260px;
      height:360px;
      border:1px solid rgba(183,126,137,.3);
      border-radius:50%;
      transform:rotate(-35deg);
    }

    .ds-beauty-hero > * {
      position:relative;
      z-index:2;
    }

    .ds-beauty-hero h1 {
      max-width:850px;
      margin:22px auto;
      font-family:Georgia,serif;
      font-size:clamp(45px,8cqw,85px);
      font-weight:normal;
      line-height:1.04;
    }

    .ds-beauty-hero p {
      max-width:530px;
      opacity:.7;
    }

    .ds-beauty-grid {
      display:grid;
      grid-template-columns:repeat(3,minmax(0,1fr));
      gap:15px;
    }

    .ds-beauty-card {
      min-height:250px;
      padding:28px 23px;
      background:#f4e5e8;
      color:#38272d;
    }

    .ds-beauty-card:nth-child(2) {
      background:#ead5da;
    }

    .ds-beauty-card:nth-child(3) {
      background:#f0e1e3;
    }

    .ds-beauty-card .ds-number {
      display:block;
      color:#b77e89;
      font-family:Georgia,serif;
      font-size:38px;
    }

    .ds-beauty-card h3 {
      margin:25px 0 9px;
      font-family:Georgia,serif;
      font-size:23px;
      font-weight:normal;
    }

    .ds-beauty-card p {
      font-size:12px;
      opacity:.7;
    }

    .ds-beauty-promo {
      display:grid;
      grid-template-columns:1fr 1fr;
      align-items:center;
      gap:25px;
      padding:55px 8%;
      background:#b77e89;
      color:white;
    }

    .ds-beauty-promo strong {
      font-family:Georgia,serif;
      font-size:clamp(32px,5cqw,52px);
      font-weight:normal;
      line-height:1.1;
    }

    .ds-beauty-promo p {
      opacity:.85;
    }

    /* --------------------------------
       5. HOTEL
    -------------------------------- */

    .ds-hotel-hero {
      position:relative;
      display:flex;
      align-items:center;
      min-height:510px;
      padding:75px 9%;
      overflow:hidden;
      background:#18231f;
      color:white;
    }

    .ds-hotel-hero::before {
      content:"";
      position:absolute;
      top:0;
      right:0;
      width:57%;
      height:100%;
      background:linear-gradient(135deg,#566354,#263a31 55%,#17251f);
      clip-path:polygon(20% 0,100% 0,100% 100%,0 100%);
      opacity:.8;
    }

    .ds-hotel-hero::after {
      content:"";
      position:absolute;
      right:10%;
      top:18%;
      width:30%;
      height:65%;
      border:1px solid rgba(196,167,123,.5);
    }

    .ds-hotel-copy {
      position:relative;
      z-index:2;
      max-width:650px;
    }

    .ds-hotel-copy h1 {
      margin:20px 0;
      font-family:Georgia,serif;
      font-size:clamp(45px,7cqw,82px);
      font-weight:normal;
      line-height:1.03;
    }

    .ds-hotel-copy p {
      max-width:440px;
      opacity:.8;
    }

    .ds-hotel-search {
      position:relative;
      z-index:3;
      display:grid;
      grid-template-columns:repeat(3,1fr) auto;
      gap:10px;
      align-items:end;
      margin:-1px 6% 0;
      padding:22px;
      background:#f4f0e7;
      color:#28251f;
      box-shadow:0 12px 35px rgba(0,0,0,.1);
    }

    .ds-hotel-search label {
      display:block;
      margin-bottom:6px;
      font-size:9px;
      font-weight:bold;
      letter-spacing:1px;
      text-transform:uppercase;
    }

    .ds-hotel-search input,
    .ds-hotel-search select {
      width:100%;
      min-width:0;
      height:40px;
      padding:8px;
      border:1px solid #d8d0c4;
      background:white;
      color:#28251f;
      font:inherit;
      font-size:11px;
    }

    .ds-hotel-search button {
      min-height:40px;
      padding:10px 16px;
      border:0;
      background:#c4a77b;
      color:#18231f;
      font-size:10px;
      font-weight:bold;
      text-transform:uppercase;
    }

    .ds-hotel-rooms {
      display:grid;
      grid-template-columns:repeat(3,minmax(0,1fr));
      gap:18px;
    }

    .ds-hotel-room {
      border:1px solid rgba(128,128,128,.25);
    }

    .ds-hotel-room-visual {
      position:relative;
      display:grid;
      min-height:190px;
      place-items:center;
      overflow:hidden;
      background:linear-gradient(145deg,#657266,#293c32);
      color:#e0c89e;
      font-family:Georgia,serif;
      font-size:44px;
    }

    .ds-hotel-room-visual::before {
      content:"";
      position:absolute;
      width:65%;
      height:65%;
      border:1px solid rgba(255,255,255,.35);
    }

    .ds-hotel-room-content {
      padding:22px;
    }

    .ds-hotel-room-content h3 {
      font-family:Georgia,serif;
      font-size:21px;
      font-weight:normal;
    }

    .ds-hotel-room-content p {
      font-size:12px;
      opacity:.7;
    }

    /* --------------------------------
       6. NEGOZIO
    -------------------------------- */

    .ds-shop-hero {
      position:relative;
      min-height:430px;
      display:flex;
      flex-direction:column;
      justify-content:center;
      padding:70px 8%;
      overflow:hidden;
      background:#e8e1d4;
      color:#28251f;
    }

    .ds-shop-hero::before {
      content:"";
      position:absolute;
      top:12%;
      right:10%;
      width:34%;
      height:76%;
      border:1px solid rgba(155,121,83,.45);
      transform:rotate(8deg);
    }

    .ds-shop-hero::after {
      content:"";
      position:absolute;
      top:20%;
      right:17%;
      width:24%;
      height:60%;
      background:linear-gradient(145deg,#bda78d,#8f765d);
      transform:rotate(-8deg);
    }

    .ds-shop-copy {
      position:relative;
      z-index:2;
      max-width:680px;
    }

    .ds-shop-copy h1 {
      margin:20px 0;
      font-family:Georgia,serif;
      font-size:clamp(48px,8cqw,88px);
      font-weight:normal;
      line-height:1;
    }

    .ds-shop-copy p {
      max-width:440px;
      opacity:.7;
    }

    .ds-shop-toolbar {
      display:flex;
      justify-content:space-between;
      align-items:center;
      gap:15px;
      margin-bottom:25px;
      padding-bottom:15px;
      border-bottom:1px solid rgba(128,128,128,.25);
      font-size:10px;
      letter-spacing:1px;
      text-transform:uppercase;
    }

    .ds-shop-grid {
      display:grid;
      grid-template-columns:repeat(4,minmax(0,1fr));
      gap:18px;
    }

    .ds-shop-product {
      min-width:0;
    }

    .ds-shop-visual {
      position:relative;
      display:grid;
      height:220px;
      place-items:center;
      overflow:hidden;
      background:#e9e3d9;
      color:#9b7953;
    }

    .ds-shop-visual::before {
      content:"";
      position:absolute;
      width:45%;
      height:65%;
      border:1px solid currentColor;
      transform:rotate(8deg);
    }

    .ds-shop-visual::after {
      content:"";
      position:absolute;
      width:30%;
      height:50%;
      background:rgba(155,121,83,.2);
      transform:rotate(-8deg);
    }

    .ds-shop-visual span {
      position:relative;
      z-index:2;
      font-family:Georgia,serif;
      font-size:27px;
    }

    .ds-shop-product h3 {
      margin:13px 0 4px;
      font-family:Georgia,serif;
      font-size:17px;
      font-weight:normal;
    }

    .ds-shop-product p {
      margin:0;
      font-size:11px;
      opacity:.65;
    }

    .ds-shop-product strong {
      display:block;
      margin:9px 0;
      color:var(--ds-accent);
    }

    .ds-shop-product .ds-button {
      width:100%;
      min-height:39px;
      padding:9px;
      font-size:9px;
    }

    /* --------------------------------
       7. EDILIZIA
    -------------------------------- */

    .ds-construction-hero {
      position:relative;
      display:flex;
      align-items:center;
      min-height:490px;
      padding:75px 9%;
      overflow:hidden;
      background:#1c2025;
      color:#f2f0e9;
    }

    .ds-construction-hero::before {
      content:"";
      position:absolute;
      top:0;
      right:0;
      width:43%;
      height:100%;
      background:linear-gradient(145deg,#343b40,#1b2025);
      clip-path:polygon(30% 0,100% 0,100% 100%,0 100%);
    }

    .ds-construction-hero::after {
      content:"";
      position:absolute;
      top:15%;
      right:10%;
      width:25%;
      height:70%;
      border:2px solid rgba(213,164,67,.45);
    }

    .ds-construction-copy {
      position:relative;
      z-index:2;
      max-width:730px;
    }

    .ds-construction-copy h1 {
      margin:22px 0;
      font-size:clamp(44px,7cqw,78px);
      font-weight:800;
      letter-spacing:-3px;
      line-height:1.02;
    }

    .ds-construction-copy p {
      max-width:510px;
      opacity:.75;
    }

    .ds-construction-stats {
      display:grid;
      grid-template-columns:repeat(3,1fr);
      background:#d5a443;
      color:#1c2025;
    }

    .ds-construction-stat {
      padding:27px 12px;
      border-right:1px solid rgba(0,0,0,.2);
      text-align:center;
    }

    .ds-construction-stat strong {
      display:block;
      font-size:27px;
    }

    .ds-construction-stat span {
      font-size:9px;
      font-weight:bold;
      letter-spacing:1px;
      text-transform:uppercase;
    }

    .ds-construction-projects {
      display:grid;
      grid-template-columns:1.2fr .8fr;
      gap:18px;
    }

    .ds-construction-project {
      position:relative;
      display:flex;
      min-height:230px;
      flex-direction:column;
      justify-content:flex-end;
      padding:25px;
      overflow:hidden;
      background:#333a40;
      color:white;
    }

    .ds-construction-project:nth-child(2) {
      background:#55564e;
    }

    .ds-construction-project::before {
      content:"";
      position:absolute;
      top:18%;
      right:12%;
      width:55%;
      height:65%;
      border:1px solid rgba(213,164,67,.7);
      transform:skewY(-12deg);
    }

    .ds-construction-project h3,
    .ds-construction-project p {
      position:relative;
      z-index:2;
    }

    .ds-construction-project h3 {
      margin-bottom:5px;
      font-size:19px;
    }

    .ds-construction-project p {
      margin:0;
      font-size:11px;
      opacity:.7;
    }

    .ds-construction-steps {
      max-width:800px;
      margin:auto;
    }

    .ds-construction-step {
      display:grid;
      grid-template-columns:65px 1fr;
      gap:18px;
      padding:22px 0;
      border-bottom:1px solid rgba(128,128,128,.25);
    }

    .ds-construction-step strong {
      color:var(--ds-accent);
      font-size:20px;
    }

    .ds-construction-step h3 {
      margin:0;
      font-size:18px;
    }

    .ds-construction-step p {
      margin:5px 0 0;
      font-size:12px;
      opacity:.65;
    }

    /* --------------------------------
       8. PIZZERIA
    -------------------------------- */

    .ds-pizza-hero {
      display:grid;
      grid-template-columns:1fr .9fr;
      gap:30px;
      align-items:center;
      min-height:490px;
      padding:65px 8%;
      background:#f0e5d5;
      color:#302721;
    }

    .ds-pizza-copy h1 {
      margin:20px 0;
      font-family:Georgia,serif;
      font-size:clamp(43px,7cqw,76px);
      font-weight:normal;
      line-height:1.04;
    }

    .ds-pizza-copy p {
      max-width:430px;
      opacity:.75;
    }

    .ds-pizza-visual {
      min-height:330px;
      background:#c6a17d;
    }

    .ds-pizza-visual::before {
      width:230px;
      height:230px;
      border:14px solid #e4c99e;
      border-radius:50%;
      background:#b74632;
      box-shadow:0 0 0 8px rgba(48,39,33,.12);
    }

    .ds-pizza-visual::after {
      width:170px;
      height:170px;
      border:2px dashed rgba(255,255,255,.65);
      border-radius:50%;
    }

    .ds-pizza-visual .ds-visual-label {
      z-index:3;
      color:white;
      font-family:Arial,sans-serif;
      font-size:10px;
      font-weight:bold;
      letter-spacing:3px;
    }

    .ds-pizza-categories {
      display:grid;
      grid-template-columns:repeat(2,minmax(0,1fr));
      gap:15px;
    }

    .ds-pizza-card {
      padding:23px;
      border:1px solid rgba(128,128,128,.25);
      background:rgba(255,255,255,.3);
    }

    .ds-pizza-card h3 {
      margin-bottom:7px;
      font-family:Georgia,serif;
      font-size:21px;
      font-weight:normal;
    }

    .ds-pizza-card p {
      font-size:12px;
      opacity:.7;
    }

    .ds-pizza-card strong {
      color:var(--ds-accent);
    }

    .ds-pizza-banner {
      padding:50px 8%;
      background:#b74632;
      color:white;
      text-align:center;
    }

    .ds-pizza-banner h2 {
      margin:0;
      font-family:Georgia,serif;
      font-size:clamp(30px,5cqw,48px);
      font-weight:normal;
    }

    /* --------------------------------
       9. BED & BREAKFAST
    -------------------------------- */

    .ds-bnb-hero {
      position:relative;
      display:flex;
      min-height:490px;
      align-items:center;
      justify-content:center;
      padding:75px 8%;
      overflow:hidden;
      background:#e7dfd1;
      color:#30271f;
      text-align:center;
    }

    .ds-bnb-hero::before {
      content:"";
      position:absolute;
      inset:25px;
      border:1px solid rgba(164,126,94,.4);
    }

    .ds-bnb-hero::after {
      content:"";
      position:absolute;
      width:300px;
      height:300px;
      border:1px solid rgba(164,126,94,.3);
      border-radius:50%;
    }

    .ds-bnb-copy {
      position:relative;
      z-index:2;
      max-width:750px;
    }

    .ds-bnb-copy h1 {
      margin:22px auto;
      font-family:Georgia,serif;
      font-size:clamp(45px,7cqw,78px);
      font-weight:normal;
      line-height:1.05;
    }

    .ds-bnb-copy p {
      max-width:530px;
      margin:auto;
      opacity:.7;
    }

    .ds-bnb-copy .ds-actions {
      justify-content:center;
    }

    .ds-bnb-highlights {
      display:grid;
      grid-template-columns:repeat(3,1fr);
      gap:1px;
      background:rgba(164,126,94,.3);
    }

    .ds-bnb-highlight {
      padding:30px 15px;
      background:#eee9df;
      text-align:center;
    }

    .ds-bnb-highlight strong {
      display:block;
      margin-bottom:7px;
      color:#a47e5e;
      font-family:Georgia,serif;
      font-size:23px;
      font-weight:normal;
    }

    .ds-bnb-highlight span {
      font-size:10px;
      letter-spacing:1px;
      text-transform:uppercase;
    }

    .ds-bnb-rooms {
      display:grid;
      grid-template-columns:repeat(3,minmax(0,1fr));
      gap:17px;
    }

    .ds-bnb-room {
      border:1px solid rgba(128,128,128,.25);
      background:rgba(255,255,255,.2);
    }

    .ds-bnb-room-visual {
      position:relative;
      display:grid;
      min-height:160px;
      place-items:center;
      overflow:hidden;
      background:#d8c8b4;
      color:#7e6049;
      font-family:Georgia,serif;
      font-size:35px;
    }

    .ds-bnb-room-visual::before {
      content:"";
      position:absolute;
      width:65%;
      height:60%;
      border:1px solid rgba(126,96,73,.5);
    }

    .ds-bnb-room-content {
      padding:20px;
    }

    .ds-bnb-room-content h3 {
      font-family:Georgia,serif;
      font-size:20px;
      font-weight:normal;
    }

    .ds-bnb-room-content p {
      font-size:12px;
      opacity:.7;
    }

    .ds-bnb-review {
      max-width:650px;
      margin:auto;
      text-align:center;
    }

    .ds-bnb-review blockquote {
      margin:18px 0;
      font-family:Georgia,serif;
      font-size:clamp(24px,4cqw,36px);
      line-height:1.3;
    }

    /* --------------------------------
       RESPONSIVE: TABLET
    -------------------------------- */

    @container (max-width:850px) {
      .ds-demo-site .ds-section {
        padding:58px 6%;
      }

      .ds-demo-site .ds-shop-grid {
        grid-template-columns:repeat(2,minmax(0,1fr));
      }

      .ds-demo-site .ds-hotel-rooms,
      .ds-demo-site .ds-bnb-rooms {
        grid-template-columns:repeat(2,minmax(0,1fr));
      }

      .ds-demo-site .ds-beauty-grid {
        grid-template-columns:repeat(2,minmax(0,1fr));
      }

      .ds-demo-site .ds-restaurant-hero,
      .ds-demo-site .ds-hair-hero,
      .ds-demo-site .ds-pizza-hero {
        gap:22px;
        padding:55px 6%;
      }

      .ds-demo-site .ds-nav {
        gap:12px;
        font-size:9px;
      }
    }

    /* --------------------------------
       RESPONSIVE: MOBILE
    -------------------------------- */

    @container (max-width:600px) {
      .ds-demo-site .ds-topbar {
        padding:15px 5%;
      }

      .ds-demo-site .ds-logo {
        font-size:20px;
      }

      .ds-demo-site .ds-menu-toggle {
        display:block;
      }

      .ds-demo-site .ds-nav {
        display:none;
        position:absolute;
        top:100%;
        left:0;
        right:0;
        padding:20px 6%;
        background:var(--ds-bg);
        color:var(--ds-fg);
        flex-direction:column;
        align-items:stretch;
        gap:5px;
        border-bottom:1px solid rgba(128,128,128,.25);
      }

      .ds-demo-site .ds-nav.is-open {
        display:flex;
      }

      .ds-demo-site .ds-nav a {
        padding:9px 0;
      }

      .ds-demo-site .ds-section {
        padding:48px 6%;
      }

      .ds-demo-site .ds-restaurant-hero,
      .ds-demo-site .ds-hair-hero,
      .ds-demo-site .ds-pizza-hero {
        grid-template-columns:1fr;
        padding:48px 7%;
      }

      .ds-demo-site .ds-restaurant-visual,
      .ds-demo-site .ds-hair-visual,
      .ds-demo-site .ds-pizza-visual {
        min-height:210px;
      }

      .ds-demo-site .ds-restaurant-feature,
      .ds-demo-site .ds-hair-manifesto,
      .ds-demo-site .ds-beauty-promo {
        grid-template-columns:1fr;
      }

      .ds-demo-site .ds-bar-hero,
      .ds-demo-site .ds-beauty-hero,
      .ds-demo-site .ds-bnb-hero {
        min-height:400px;
        padding:60px 7%;
      }

      .ds-demo-site .ds-hotel-hero,
      .ds-demo-site .ds-construction-hero {
        min-height:410px;
        padding:55px 7%;
      }

      .ds-demo-site .ds-hotel-hero::before {
        width:80%;
        opacity:.4;
      }

      .ds-demo-site .ds-hotel-search {
        grid-template-columns:1fr 1fr;
        margin:0;
        padding:16px;
      }

      .ds-demo-site .ds-hotel-search button {
        grid-column:1/-1;
      }

      .ds-demo-site .ds-services,
      .ds-demo-site .ds-beauty-grid,
      .ds-demo-site .ds-bar-events,
      .ds-demo-site .ds-hotel-rooms,
      .ds-demo-site .ds-bnb-rooms {
        grid-template-columns:1fr;
      }

      .ds-demo-site .ds-pizza-categories {
        grid-template-columns:1fr;
      }

      .ds-demo-site .ds-construction-projects {
        grid-template-columns:1fr;
      }

      .ds-demo-site .ds-shop-hero {
        min-height:350px;
        padding:55px 7%;
      }

      .ds-demo-site .ds-shop-hero::before {
        right:5%;
        width:40%;
      }

      .ds-demo-site .ds-shop-hero::after {
        right:12%;
        width:28%;
      }

      .ds-demo-site .ds-shop-grid {
        grid-template-columns:repeat(2,minmax(0,1fr));
        gap:13px;
      }

      .ds-demo-site .ds-shop-visual {
        height:155px;
      }

      .ds-demo-site .ds-menu-row {
        gap:10px;
      }

      .ds-demo-site .ds-menu-row h3 {
        font-size:17px;
      }

      .ds-demo-site .ds-menu-row p {
        max-width:220px;
      }

      .ds-demo-site .ds-bar-strip,
      .ds-demo-site .ds-bnb-highlights {
        grid-template-columns:1fr;
      }

      .ds-demo-site .ds-bar-strip div,
      .ds-demo-site .ds-bnb-highlight {
        border-bottom:1px solid rgba(128,128,128,.2);
      }

      .ds-demo-site .ds-construction-stats {
        grid-template-columns:1fr;
      }

      .ds-demo-site .ds-construction-stat {
        border-right:0;
        border-bottom:1px solid rgba(0,0,0,.15);
      }

      .ds-demo-site .ds-footer {
        flex-direction:column;
        text-align:center;
      }

      .ds-demo-site .ds-contact {
        padding:55px 7%;
      }
    }

    @container (max-width:370px) {
      .ds-demo-site .ds-shop-grid {
        grid-template-columns:1fr;
      }

      .ds-demo-site .ds-shop-visual {
        height:190px;
      }

      .ds-demo-site .ds-actions {
        flex-direction:column;
        align-items:stretch;
      }

      .ds-demo-site .ds-actions .ds-button {
        width:100%;
      }

      .ds-demo-site .ds-hotel-search {
        grid-template-columns:1fr;
      }

      .ds-demo-site .ds-hotel-search button {
        grid-column:auto;
      }
    }
  `;

  const topbar = `
    <header class="ds-topbar">
      <a href="#demo-home" class="ds-logo">${escapeHTML(project.brand)}</a>

      <nav class="ds-nav">
        <a href="#demo-home">Home</a>
        <a href="#demo-about">Chi siamo</a>
        <a href="#demo-services">Servizi</a>
        <a href="#demo-menu">Scopri</a>
        <a href="#demo-contact" class="ds-nav-cta">Contatti</a>
      </nav>

      <button class="ds-menu-toggle" type="button" aria-expanded="false">
        MENU
      </button>
    </header>
  `;

  let content = "";

  switch (key) {
    /* =====================================
       RISTORANTE
    ===================================== */
    case "restaurant":
      content = `
        <section class="ds-restaurant-hero" id="demo-home">
          <div class="ds-restaurant-copy">
            <span class="ds-eyebrow">${escapeHTML(project.eyebrow)}</span>
            <h1>${escapeHTML(project.headline)}</h1>
            <p>${escapeHTML(project.description)}</p>
            <div class="ds-actions">
              ${button(project.cta, "#demo-menu")}
              ${button(project.secondary, "#demo-contact", "ds-button-outline")}
            </div>
          </div>

          <div class="ds-visual ds-restaurant-visual">
            <span class="ds-visual-label">L.</span>
          </div>
        </section>

        ${intro}

        <section class="ds-section" id="demo-services">
          <div class="ds-section-heading">
            <span class="ds-eyebrow">LA NOSTRA ESPERIENZA</span>
            <h2>${escapeHTML(project.servicesTitle)}</h2>
          </div>
          <div class="ds-services">${serviceCards}</div>
        </section>

        <section class="ds-section" id="demo-menu">
          <div class="ds-section-heading">
            <span class="ds-eyebrow">DALLA NOSTRA CUCINA</span>
            <h2>${escapeHTML(project.menuTitle)}</h2>
          </div>
          <div class="ds-restaurant-menu">${menuRows}</div>
        </section>

        <section class="ds-section ds-restaurant-feature">
          <div class="ds-visual ds-restaurant-feature-visual"></div>
          <div>
            <span class="ds-eyebrow">UNA PASSIONE AUTENTICA</span>
            <h2>La qualità si riconosce, in ogni dettaglio.</h2>
            <p>${escapeHTML(project.intro)}</p>
          </div>
        </section>

        ${contact}
      `;
      break;

    /* =====================================
       BAR
    ===================================== */
    case "bar":
      content = `
        <section class="ds-bar-hero" id="demo-home">
          <span class="ds-eyebrow">${escapeHTML(project.eyebrow)}</span>
          <h1>${escapeHTML(project.headline)}</h1>
          <p>${escapeHTML(project.description)}</p>
          <div class="ds-actions">
            ${button(project.cta, "#demo-menu")}
            ${button(project.secondary, "#demo-contact", "ds-button-outline")}
          </div>
        </section>

        <div class="ds-bar-strip">
          <div>COFFEE</div>
          <div>APERITIVO</div>
          <div>COCKTAIL</div>
        </div>

        <section class="ds-section" id="demo-menu">
          <div class="ds-section-heading">
            <span class="ds-eyebrow">DRINKS & MOMENTS</span>
            <h2>${escapeHTML(project.menuTitle)}</h2>
          </div>
          <div class="ds-restaurant-menu">${menuRows}</div>
        </section>

        <section class="ds-section" id="demo-services">
          <div class="ds-section-heading">
            <span class="ds-eyebrow">VIVI NOIR</span>
            <h2>Ogni momento ha il suo spazio.</h2>
          </div>
          <div class="ds-bar-events">
            <article class="ds-bar-event">
              <span>EVERY MORNING</span>
              <h3>Morning Ritual</h3>
              <p>Il piacere di iniziare la giornata con una pausa speciale.</p>
            </article>
            <article class="ds-bar-event">
              <span>EVERY EVENING</span>
              <h3>After Dark</h3>
              <p>Un'atmosfera diversa, cocktail e momenti da condividere.</p>
            </article>
          </div>
        </section>

        ${intro}
        ${contact}
      `;
      break;

    /* =====================================
       PARRUCCHIERE
    ===================================== */
    case "hair":
      content = `
        <section class="ds-hair-hero" id="demo-home">
          <div class="ds-hair-copy">
            <span class="ds-eyebrow">${escapeHTML(project.eyebrow)}</span>
            <h1>${escapeHTML(project.headline)}</h1>
            <p>${escapeHTML(project.description)}</p>
            <div class="ds-actions">
              ${button(project.cta, "#demo-services")}
              ${button(project.secondary, "#demo-contact", "ds-button-outline")}
            </div>
          </div>

          <div class="ds-visual ds-hair-visual">
            <span class="ds-visual-label">HAIR<br>ATELIER</span>
          </div>
        </section>

        <section class="ds-section ds-hair-manifesto" id="demo-about">
          <strong>01.</strong>
          <div>
            <span class="ds-eyebrow">LA FILOSOFIA ATELIER</span>
            <h2>${escapeHTML(project.introTitle)}</h2>
            <p>${escapeHTML(project.intro)}</p>
          </div>
        </section>

        <section class="ds-section" id="demo-services">
          <div class="ds-section-heading">
            <span class="ds-eyebrow">SERVIZI PROFESSIONALI</span>
            <h2>${escapeHTML(project.servicesTitle)}</h2>
          </div>
          <div class="ds-services">${serviceCards}</div>
        </section>

        <section class="ds-section" id="demo-menu">
          <div class="ds-section-heading">
            <span class="ds-eyebrow">IL NOSTRO LISTINO</span>
            <h2>${escapeHTML(project.menuTitle)}</h2>
          </div>
          <div class="ds-hair-list">${menuRows}</div>
        </section>

        ${contact}
      `;
      break;

    /* =====================================
       CENTRO ESTETICO
    ===================================== */
    case "beauty":
      content = `
        <section class="ds-beauty-hero" id="demo-home">
          <span class="ds-eyebrow">${escapeHTML(project.eyebrow)}</span>
          <h1>${escapeHTML(project.headline)}</h1>
          <p>${escapeHTML(project.description)}</p>
          <div class="ds-actions">
            ${button(project.cta, "#demo-services")}
            ${button(project.secondary, "#demo-contact", "ds-button-outline")}
          </div>
        </section>

        ${intro}

        <section class="ds-section" id="demo-services">
          <div class="ds-section-heading">
            <span class="ds-eyebrow">I NOSTRI RITUALI</span>
            <h2>${escapeHTML(project.servicesTitle)}</h2>
          </div>

          <div class="ds-beauty-grid">
            ${services.map((item, i) => `
              <article class="ds-beauty-card">
                <span class="ds-number">0${i + 1}</span>
                <h3>${escapeHTML(item[1])}</h3>
                <p>${escapeHTML(item[2])}</p>
              </article>
            `).join("")}
          </div>
        </section>

        <section class="ds-beauty-promo">
          <strong>Un momento tutto tuo.</strong>
          <div>
            <p>Lasciati accompagnare in un percorso dedicato alla tua bellezza e al tuo benessere.</p>
            ${button("Prenota il tuo trattamento", "#demo-contact", "ds-button-outline")}
          </div>
        </section>

        <section class="ds-section" id="demo-menu">
          <div class="ds-section-heading">
            <span class="ds-eyebrow">BEAUTY MENU</span>
            <h2>${escapeHTML(project.menuTitle)}</h2>
          </div>
          <div class="ds-restaurant-menu">${menuRows}</div>
        </section>

        ${contact}
      `;
      break;

    /* =====================================
       HOTEL
    ===================================== */
    case "hotel":
      content = `
        <section class="ds-hotel-hero" id="demo-home">
          <div class="ds-hotel-copy">
            <span class="ds-eyebrow">${escapeHTML(project.eyebrow)}</span>
            <h1>${escapeHTML(project.headline)}</h1>
            <p>${escapeHTML(project.description)}</p>
            <div class="ds-actions">
              ${button(project.cta, "#demo-rooms")}
              ${button(project.secondary, "#demo-contact", "ds-button-outline")}
            </div>
          </div>
        </section>

        <form class="ds-hotel-search" id="demo-search">
          <div>
            <label for="demo-checkin">Check-in</label>
            <input id="demo-checkin" type="date">
          </div>
          <div>
            <label for="demo-checkout">Check-out</label>
            <input id="demo-checkout" type="date">
          </div>
          <div>
            <label for="demo-guests">Ospiti</label>
            <select id="demo-guests">
              <option>1 ospite</option>
              <option selected>2 ospiti</option>
              <option>3 ospiti</option>
              <option>4 ospiti</option>
            </select>
          </div>
          <button type="submit">Verifica disponibilità</button>
        </form>

        ${intro}

        <section class="ds-section" id="demo-rooms">
          <div class="ds-section-heading">
            <span class="ds-eyebrow">ACCOMMODATION</span>
            <h2>Le nostre camere</h2>
          </div>

          <div class="ds-hotel-rooms">
            ${menu.map((item, i) => `
              <article class="ds-hotel-room">
                <div class="ds-hotel-room-visual">0${i + 1}</div>
                <div class="ds-hotel-room-content">
                  <h3>${escapeHTML(item[0])}</h3>
                  <p>${escapeHTML(item[1])}</p>
                  <strong>${escapeHTML(item[2])}</strong>
                </div>
              </article>
            `).join("")}
          </div>
        </section>

        <section class="ds-section" id="demo-services">
          <div class="ds-section-heading">
            <span class="ds-eyebrow">HOTEL SERVICES</span>
            <h2>${escapeHTML(project.servicesTitle)}</h2>
          </div>
          <div class="ds-services">${serviceCards}</div>
        </section>

        ${contact}
      `;
      break;

    /* =====================================
       NEGOZIO ONLINE
    ===================================== */
    case "shop":
      content = `
        <section class="ds-shop-hero" id="demo-home">
          <div class="ds-shop-copy">
            <span class="ds-eyebrow">${escapeHTML(project.eyebrow)}</span>
            <h1>${escapeHTML(project.headline)}</h1>
            <p>${escapeHTML(project.description)}</p>
            <div class="ds-actions">
              ${button(project.cta, "#demo-menu")}
            </div>
          </div>
        </section>

        <section class="ds-section" id="demo-menu">
          <div class="ds-shop-toolbar">
            <span>THE COLLECTION</span>
            <span>SELEZIONE · 2026</span>
          </div>

          <div class="ds-section-heading">
            <span class="ds-eyebrow">DISCOVER OBJECTS</span>
            <h2>${escapeHTML(project.menuTitle)}</h2>
          </div>

          <div class="ds-shop-grid">
            ${menu.map((item, i) => `
              <article class="ds-shop-product">
                <div class="ds-shop-visual">
                  <span>0${i + 1}</span>
                </div>
                <h3>${escapeHTML(item[0])}</h3>
                <p>${escapeHTML(item[1])}</p>
                <strong>${escapeHTML(item[2])}</strong>
                <button class="ds-button ds-add-cart" type="button">
                  Aggiungi al carrello
                </button>
              </article>
            `).join("")}
          </div>
        </section>

        <section class="ds-section" id="demo-about">
          <div class="ds-section-heading">
            <span class="ds-eyebrow">OUR PHILOSOPHY</span>
            <h2>${escapeHTML(project.introTitle)}</h2>
            <p>${escapeHTML(project.intro)}</p>
          </div>
        </section>

        <section class="ds-section" id="demo-services">
          <div class="ds-section-heading">
            <span class="ds-eyebrow">WHY OBJECTS</span>
            <h2>${escapeHTML(project.servicesTitle)}</h2>
          </div>
          <div class="ds-services">${serviceCards}</div>
        </section>

        ${contact}
      `;
      break;

    /* =====================================
       EDILIZIA
    ===================================== */
    case "construction":
      content = `
        <section class="ds-construction-hero" id="demo-home">
          <div class="ds-construction-copy">
            <span class="ds-eyebrow">${escapeHTML(project.eyebrow)}</span>
            <h1>${escapeHTML(project.headline)}</h1>
            <p>${escapeHTML(project.description)}</p>
            <div class="ds-actions">
              ${button(project.cta, "#demo-services")}
              ${button(project.secondary, "#demo-contact", "ds-button-outline")}
            </div>
          </div>
        </section>

        <div class="ds-construction-stats">
          <div class="ds-construction-stat">
            <strong>01</strong>
            <span>Professionalità</span>
          </div>
          <div class="ds-construction-stat">
            <strong>02</strong>
            <span>Esperienza</span>
          </div>
          <div class="ds-construction-stat">
            <strong>03</strong>
            <span>Affidabilità</span>
          </div>
        </div>

        ${intro}

        <section class="ds-section" id="demo-services">
          <div class="ds-section-heading">
            <span class="ds-eyebrow">COSA FACCIAMO</span>
            <h2>${escapeHTML(project.servicesTitle)}</h2>
          </div>
          <div class="ds-services">${serviceCards}</div>
        </section>

        <section class="ds-section" id="demo-projects">
          <div class="ds-section-heading">
            <span class="ds-eyebrow">PROGETTI E REALIZZAZIONI</span>
            <h2>Il nostro lavoro, la nostra firma.</h2>
          </div>
          <div class="ds-construction-projects">
            <article class="ds-construction-project">
              <h3>Ristrutturazioni</h3>
              <p>Interventi e soluzioni su misura</p>
            </article>
            <article class="ds-construction-project">
              <h3>Nuove costruzioni</h3>
              <p>Progetti seguiti con cura</p>
            </article>
          </div>
        </section>

        <section class="ds-section" id="demo-menu">
          <div class="ds-section-heading">
            <span class="ds-eyebrow">COME LAVORIAMO</span>
            <h2>${escapeHTML(project.menuTitle)}</h2>
          </div>

          <div class="ds-construction-steps">
            ${menu.map(item => `
              <article class="ds-construction-step">
                <strong>${escapeHTML(item[0])}</strong>
                <div>
                  <h3>${escapeHTML(item[1])}</h3>
                  <p>${escapeHTML(item[2])}</p>
                </div>
              </article>
            `).join("")}
          </div>
        </section>

        ${contact}
      `;
      break;

    /* =====================================
       PIZZERIA
    ===================================== */
    case "pizzeria":
      content = `
        <section class="ds-pizza-hero" id="demo-home">
          <div class="ds-pizza-copy">
            <span class="ds-eyebrow">${escapeHTML(project.eyebrow)}</span>
            <h1>${escapeHTML(project.headline)}</h1>
            <p>${escapeHTML(project.description)}</p>
            <div class="ds-actions">
              ${button(project.cta, "#demo-menu")}
              ${button(project.secondary, "#demo-contact", "ds-button-outline")}
            </div>
          </div>

          <div class="ds-visual ds-pizza-visual">
            <span class="ds-visual-label">FORNO 21</span>
          </div>
        </section>

        <div class="ds-pizza-banner">
          <h2>La tradizione incontra il gusto.</h2>
        </div>

        ${intro}

        <section class="ds-section" id="demo-menu">
          <div class="ds-section-heading">
            <span class="ds-eyebrow">DAL NOSTRO FORNO</span>
            <h2>${escapeHTML(project.menuTitle)}</h2>
          </div>

          <div class="ds-pizza-categories">
            ${menu.map(item => `
              <article class="ds-pizza-card">
                <h3>${escapeHTML(item[0])}</h3>
                <p>${escapeHTML(item[1])}</p>
                <strong>${escapeHTML(item[2])}</strong>
              </article>
            `).join("")}
          </div>
        </section>

        <section class="ds-section" id="demo-services">
          <div class="ds-section-heading">
            <span class="ds-eyebrow">LA NOSTRA PASSIONE</span>
            <h2>${escapeHTML(project.servicesTitle)}</h2>
          </div>
          <div class="ds-services">${serviceCards}</div>
        </section>

        ${contact}
      `;
      break;

    /* =====================================
       BED & BREAKFAST
    ===================================== */
    case "bnb":
      content = `
        <section class="ds-bnb-hero" id="demo-home">
          <div class="ds-bnb-copy">
            <span class="ds-eyebrow">${escapeHTML(project.eyebrow)}</span>
            <h1>${escapeHTML(project.headline)}</h1>
            <p>${escapeHTML(project.description)}</p>
            <div class="ds-actions">
              ${button(project.cta, "#demo-rooms")}
              ${button(project.secondary, "#demo-contact", "ds-button-outline")}
            </div>
          </div>
        </section>

        <div class="ds-bnb-highlights">
          <div class="ds-bnb-highlight">
            <strong>Comfort</strong>
            <span>Camere accoglienti</span>
          </div>
          <div class="ds-bnb-highlight">
            <strong>Relax</strong>
            <span>Un soggiorno sereno</span>
          </div>
          <div class="ds-bnb-highlight">
            <strong>Welcome</strong>
            <span>Ospitalità autentica</span>
          </div>
        </div>

        ${intro}

        <section class="ds-section" id="demo-rooms">
          <div class="ds-section-heading">
            <span class="ds-eyebrow">SCEGLI LA TUA CAMERA</span>
            <h2>${escapeHTML(project.menuTitle)}</h2>
          </div>

          <div class="ds-bnb-rooms">
            ${menu.map((item, i) => `
              <article class="ds-bnb-room">
                <div class="ds-bnb-room-visual">0${i + 1}</div>
                <div class="ds-bnb-room-content">
                  <h3>${escapeHTML(item[0])}</h3>
                  <p>${escapeHTML(item[1])}</p>
                  <strong>${escapeHTML(item[2])}</strong>
                </div>
              </article>
            `).join("")}
          </div>
        </section>

        <section class="ds-section" id="demo-services">
          <div class="ds-section-heading">
            <span class="ds-eyebrow">I NOSTRI SERVIZI</span>
            <h2>${escapeHTML(project.servicesTitle)}</h2>
          </div>
          <div class="ds-services">${serviceCards}</div>
        </section>

        <section class="ds-section">
          <div class="ds-bnb-review">
            <span class="ds-eyebrow">L'ESPERIENZA DEGLI OSPITI</span>
            <blockquote>
              “Un luogo speciale dove sentirsi accolti e vivere ogni momento con tranquillità.”
            </blockquote>
            <span class="ds-eyebrow">UN SOGGIORNO DA RICORDARE</span>
          </div>
        </section>

        ${contact}
      `;
      break;

    default:
      content = `
        <section class="ds-section" id="demo-home">
          <h1>${escapeHTML(project.headline)}</h1>
          <p>${escapeHTML(project.description)}</p>
        </section>
        ${contact}
      `;
  }

  return `
    <div class="ds-demo-site" style="
      --ds-bg:${bg};
      --ds-accent:${accent};
      --ds-fg:${fg};
    ">
      <style>${styles}</style>
      ${topbar}
      <main>${content}</main>
      ${footer}
      <div class="ds-toast" role="status" aria-live="polite"></div>
    </div>
  `;
}

  
  /* =========================================
     8. MODAL PORTFOLIO
  ========================================= */

  const modal = $("#websiteDemoModal");
  const modalTitle = $("#modalProjectTitle");
  const modalFrame = $("#websiteDemoFrame");
  const modalKicker = $(".modal-kicker", modal || document);
  const closeModalButton = $("#closeWebsiteDemo");

  let previousFocus = null;

  function showToast(message) {
    const toast = $(".ds-toast", demoContent || document);
    if (!toast) return;

    toast.textContent = message;
    toast.classList.add("is-visible");

    window.clearTimeout(toast.hideTimer);
    toast.hideTimer = window.setTimeout(() => {
      toast.classList.remove("is-visible");
    }, 2600);
  }

  function openWebsiteDemo(key) {
    const project = projects[key];

    if (!project || !modal || !demoContent || !modalFrame) {
      console.error("Demo non trovata o struttura HTML del modal mancante:", key);
      return;
    }

    previousFocus = document.activeElement;

    if (modalTitle) modalTitle.textContent = project.title;
    if (modalKicker) modalKicker.textContent = "PROJECT PREVIEW · " + project.category.toUpperCase();

    // Genera e inserisce il sito dimostrativo.
    demoContent.innerHTML = createWebsite(project, key);

    // Ripristina la modalità desktop iniziale.
    setDevice("desktop");

    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");

    if (closeModalButton) closeModalButton.focus();

    console.log("Demo caricata correttamente:", key);
  }

  function closeWebsiteDemo() {
    if (!modal) return;

    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");

    if (demoContent) demoContent.innerHTML = "";

    if (previousFocus && typeof previousFocus.focus === "function") {
      previousFocus.focus();
    }
  }


function setDevice(device) {
  if (!modalFrame) return;

  const widths = {
    desktop: "1200px",
    tablet: "768px",
    mobile: "390px"
  };

  modalFrame.classList.remove(
    "desktop-mode",
    "tablet-mode",
    "mobile-mode"
  );

  modalFrame.classList.add(device + "-mode");

  modalFrame.style.width = widths[device] || widths.desktop;
  modalFrame.style.maxWidth = "100%";
  modalFrame.style.minWidth = "0";
  modalFrame.style.margin = "0 auto";
  modalFrame.style.transition = "width .3s ease";

  const modalBody = $(".modal-body");

  if (modalBody) {
    modalBody.style.overflowX = "auto";
    modalBody.style.overflowY = "auto";
  }

  $$("[data-device]").forEach(button => {
    const active = button.dataset.device === device;
    button.classList.toggle("active", active);
    button.setAttribute("aria-pressed", String(active));
  });
}


  // Apertura delle nove demo.
  $$(".portfolio-card[data-project]").forEach(card => {
    card.addEventListener("click", event => {
      if (event.target.closest("a")) event.preventDefault();

      const key = card.dataset.project;
      openWebsiteDemo(key);
    });
  });

  // Chiusura modal.
  if (closeModalButton) {
    closeModalButton.addEventListener("click", closeWebsiteDemo);
  }

  $$("[data-close-demo]").forEach(element => {
    element.addEventListener("click", closeWebsiteDemo);
  });

  document.addEventListener("keydown", event => {
    if (event.key === "Escape" && modal?.classList.contains("open")) {
      closeWebsiteDemo();
    }
  });

  // Pulsanti Desktop / Tablet / Mobile.
  $$("[data-device]").forEach(button => {
    button.addEventListener("click", () => {
      setDevice(button.dataset.device);
    });
  });

  /* =========================================
     9. INTERAZIONI INTERNE ALLE DEMO
  ========================================= */


  /* =========================================
     9. INTERAZIONI INTERNE ALLE DEMO
  ========================================= */

  if (demoContent) {

    // Ricerca disponibilità hotel
    demoContent.addEventListener("submit", event => {
      if (event.target.matches("#demo-search")) {
        event.preventDefault();
        showToast("Questa è una demo: la ricerca non viene inviata.");
      }
    });

    // Pulsanti e navigazione interna
    demoContent.addEventListener("click", event => {

      // Aggiunta prodotti al carrello
      const addButton = event.target.closest(".ds-add-cart");

      if (addButton) {
        const product = addButton.closest(".ds-shop-product");
        const name = product
          ? $("h3", product)?.textContent || "Prodotto"
          : "Prodotto";

        addButton.textContent = "Aggiunto ✓";
        showToast(name + " aggiunto al carrello dimostrativo.");

        window.setTimeout(() => {
          addButton.textContent = "Aggiungi al carrello";
        }, 1800);

        return;
      }

      // Pulsanti di contatto
      const contactButton = event.target.closest(".ds-contact-action");

      if (contactButton) {
        showToast("Questa è una demo: la richiesta non viene inviata.");
        return;
      }

      // Menu mobile
      const menuButton = event.target.closest(".ds-menu-toggle");

      if (menuButton) {
        const nav = $(".ds-nav", demoContent);

        if (nav) {
          const isOpen = nav.classList.toggle("is-open");
          menuButton.setAttribute("aria-expanded", String(isOpen));
        }

        return;
      }

      // Navigazione interna delle demo
      const anchor = event.target.closest('a[href^="#demo-"]');

      if (anchor) {
        const target = $(anchor.getAttribute("href"), demoContent);

        if (target) {
          event.preventDefault();

          target.scrollIntoView({
            behavior: "smooth",
            block: "start"
          });

          const nav = $(".ds-nav", demoContent);
          const menu = $(".ds-menu-toggle", demoContent);

          if (nav) nav.classList.remove("is-open");

          if (menu) {
            menu.setAttribute("aria-expanded", "false");
          }
        }
      }

    });

  }


  /* =========================================
     10. FILTRI PORTFOLIO
  ========================================= */

  const filterButtons = $$("[data-filter]");
  const portfolioCards = $$(".portfolio-card[data-category]");

  filterButtons.forEach(button => {
    button.addEventListener("click", () => {
      const filter = button.dataset.filter;

      filterButtons.forEach(item => item.classList.remove("active"));
      button.classList.add("active");

      portfolioCards.forEach(card => {
        const category = card.dataset.category;
        card.hidden = filter !== "all" && category !== filter;
      });
    });
  });

  /* =========================================
     11. FAQ ACCORDION
  ========================================= */

  $$(".faq-item").forEach(item => {
    const question = $(".faq-question", item);
    const answer = $(".faq-answer", item);

    if (!question || !answer) return;

    question.setAttribute(
      "aria-expanded",
      String(!answer.hidden)
    );

    question.addEventListener("click", () => {
      const willOpen = answer.hidden;

      $$(".faq-item").forEach(otherItem => {
        const otherAnswer = $(".faq-answer", otherItem);
        const otherQuestion = $(".faq-question", otherItem);

        if (otherAnswer && otherQuestion) {
          otherAnswer.hidden = true;
          otherQuestion.setAttribute("aria-expanded", "false");
          otherItem.classList.remove("active");
        }
      });

      answer.hidden = !willOpen;
      question.setAttribute("aria-expanded", String(willOpen));
      item.classList.toggle("active", willOpen);
    });
  });

  /* =========================================
     12. LINK WHATSAPP
  ========================================= */

  const whatsappNumber = "393513837027";

  $$(".whatsapp-link").forEach(link => {
    const message = link.dataset.message || "Ciao, vorrei ricevere informazioni sui vostri servizi.";
    link.href = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
  });

  /* =========================================
     13. PRELOADER
  ========================================= */

  const preloader = $(".preloader");

  function hidePreloader() {
    if (!preloader) return;

    preloader.classList.add("loaded");

    window.setTimeout(() => {
      preloader.style.display = "none";
    }, 600);
  }

  window.addEventListener("load", hidePreloader, { once: true });

  // Fallback nel caso in cui il caricamento sia già terminato.
  window.setTimeout(hidePreloader, 1800);

});

