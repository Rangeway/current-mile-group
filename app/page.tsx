const sectors = [
  ["01", "Mobility", "How people move and where they stop."],
  ["02", "Energy", "The systems behind the transition."],
  ["03", "Infrastructure", "Physical assets built for long service."],
  ["04", "Software", "The operating layer behind physical systems."],
  ["05", "Hospitality", "The experience surrounding infrastructure."],
] as const;

const portfolio = [
  {
    id: "CM / 01",
    name: "Rangeway",
    description:
      "EV charging destinations designed around how people actually travel.",
    href: "https://rangeway.co",
    image: "/images/rangeway-portfolio.webp",
    imageAlt: "Rangeway charging destination in a mountain landscape",
    imageWidth: 640,
    imageHeight: 360,
    logo: "/brands/rangeway-lockup.svg",
    logoWidth: 240,
    logoHeight: 56,
    featured: true,
  },
  {
    id: "CM / 02",
    name: "ChargeVia",
    description: "Charging infrastructure development for practical deployment.",
    href: "https://chargevia.net",
    image: "/images/chargevia-portfolio.jpg",
    imageAlt: "ChargeVia EV charging infrastructure",
    imageWidth: 1760,
    imageHeight: 982,
    logo: "/brands/chargevia-lockup.svg",
    logoWidth: 320,
    logoHeight: 60,
  },
  {
    id: "CM / 03",
    name: "AmpIQ",
    description:
      "Independent EV charging consulting, project delivery, and ongoing management.",
    href: "https://ampiq.tech",
    image: "/images/ampiq-orchestration.png",
    imageAlt:
      "Project lead and electrical contractor coordinating a commercial EV charging deployment",
    imageWidth: 1672,
    imageHeight: 941,
    logo: "/brands/ampiq-logo.png",
    logoWidth: 861,
    logoHeight: 267,
  },
] as const;

const principles = [
  {
    label: "Build for use",
    title: "Practical beats theoretical.",
    description:
      "Infrastructure matters when it works in the places and routines people actually inhabit.",
  },
  {
    label: "Think in systems",
    title: "The edges are the opportunity.",
    description:
      "The strongest businesses often emerge where one category hands responsibility to another.",
  },
  {
    label: "Stay for the long road",
    title: "Durability is a strategy.",
    description:
      "We favor patient operating judgment over fashionable language and short-lived signals.",
  },
] as const;

const facts = [
  ["Role", "Portfolio parent in development"],
  ["Model", "Quiet house of distinct operating brands"],
  [
    "Range",
    "Mobility, energy, infrastructure, software, and hospitality",
  ],
  ["Horizon", "Long-term company building and selective expansion"],
] as const;

export default function Home() {
  const year = new Date().getFullYear();

  return (
    <main>
      <header className="site-header">
        <a className="wordmark" href="#top" aria-label="Current Mile Group home">
          Current Mile Group
        </a>
        <nav aria-label="Primary navigation">
          <a href="#portfolio">Portfolio</a>
          <a href="#sectors">Sectors</a>
          <a href="#perspective">Perspective</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      <section className="hero" id="top">
        <div className="hero-copy">
          <p className="eyebrow">A portfolio built for the long road</p>
          <h1>The next mile is never just distance.</h1>
          <p className="hero-lede">
            It is energy, software, infrastructure, hospitality, and the choices
            that make movement work.
          </p>
          <span className="hero-rule" aria-hidden="true" />
        </div>
        <div className="hero-index" aria-label="Current Mile Group operating range">
          <span>CurrentMile.com</span>
          <span>Mobility · Energy · Infrastructure · Software · Hospitality</span>
        </div>
      </section>

      <section className="paper portfolio-section" id="portfolio">
        <div className="section-intro">
          <p className="section-number">01 / Portfolio</p>
          <h2>
            Independent companies.
            <br />
            Shared conviction.
          </h2>
          <p>
            Distinct businesses connected by an operator&apos;s view of
            infrastructure, experience, and the systems that move people
            forward.
          </p>
        </div>

        <div className="portfolio-grid">
          {portfolio.map((company) => (
            <article
              className={`company-card${company.featured ? " featured" : ""}`}
              key={company.name}
            >
              <span className="company-id">{company.id}</span>
              <div className="company-image">
                <img
                  src={company.image}
                  alt={company.imageAlt}
                  width={company.imageWidth}
                  height={company.imageHeight}
                  loading="lazy"
                />
              </div>
              <div className="company-body">
                <img
                  className={`company-logo ${company.name.toLowerCase()}`}
                  src={company.logo}
                  alt={`${company.name} wordmark`}
                  width={company.logoWidth}
                  height={company.logoHeight}
                />
                <div>
                  <p>{company.description}</p>
                  <a href={company.href} target="_blank" rel="noreferrer">
                    Visit {company.name} <span aria-hidden="true">↗</span>
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="paper sectors-section" id="sectors">
        <div className="section-intro">
          <p className="section-number">02 / Operating range</p>
          <h2>
            Five fields.
            <br />
            One wider view.
          </h2>
          <p>
            We look across sectors because the most consequential operating
            problems rarely stay inside one category.
          </p>
        </div>
        <div className="sector-grid">
          {sectors.map(([number, name, description]) => (
            <article className="sector" key={name}>
              <span>{number}</span>
              <div>
                <h3>{name}</h3>
                <p>{description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="perspective-section" id="perspective">
        <div className="perspective-heading">
          <p className="eyebrow">03 / Perspective</p>
          <h2>
            The strongest companies connect physical infrastructure with the
            human experience around it.
          </h2>
        </div>
        <div className="principle-grid">
          {principles.map((principle) => (
            <article className="principle" key={principle.label}>
              <p className="principle-label">{principle.label}</p>
              <div>
                <h3>{principle.title}</h3>
                <p>{principle.description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="paper about-section" id="about">
        <div>
          <p className="section-number">04 / About</p>
          <h2>A strategic umbrella for companies built to operate.</h2>
          <p className="about-copy">
            Current Mile Group provides a shared strategic frame for businesses
            working across mobility, energy, infrastructure, software, and
            hospitality. Today, those businesses operate independently. Over
            time, the group is intended to become their common parent and a
            platform for building and acquiring adjacent companies.
          </p>
        </div>
        <dl className="fact-list">
          {facts.map(([term, description]) => (
            <div className="fact" key={term}>
              <dt>{term}</dt>
              <dd>{description}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="contact-section" id="contact">
        <p className="eyebrow">05 / Contact</p>
        <div>
          <h2>Start a conversation.</h2>
          <p>
            For operating partnerships, portfolio inquiries, and conversations
            about the systems shaping how people move.
          </p>
        </div>
        <a className="contact-button" href="mailto:zak@winnick.io">
          Email Current Mile Group <span aria-hidden="true">↗</span>
        </a>
      </section>

      <footer>
        <strong>© {year} Current Mile Group</strong>
      </footer>
    </main>
  );
}
