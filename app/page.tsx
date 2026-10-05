// HERO: The portfolio itself, not an ornamental map, gives the group its identity.

import Navigation from "./navigation";
import Copyright from "./copyright";
import ChargeViaLockup from "./chargevia-lockup";

const portfolio = [
  {
    id: "01", slug: "rangeway", name: "Rangeway",
    role: "Hospitality-Driven EV Charging",
    headline: "The Stop Is the Point.",
    description: "Rangeway is building a hospitality-driven EV charging network, with destinations designed for the people making the journey.",
    detail: "Waystation, Basecamp, and Summit bring different levels of comfort and service to the same hospitality-first approach.",
    scope: ["Waystation", "Basecamp", "Summit"],
    href: "https://rangeway.co", domain: "rangeway.co",
    image: "/images/rangeway-waystation.png",
    imageAlt: "Concept rendering of a Rangeway Waystation at dusk, with a glowing driver's lounge and timber charging canopy",
    imageWidth: 1672, imageHeight: 941,
    caption: "Rangeway Waystation / Concept Rendering",
    logo: "/brands/rangeway-charcoal-amber.svg", logoWidth: 332, logoHeight: 72,
  },
  {
    id: "02", slug: "chargevia", name: "ChargeVia by Rangeway",
    role: "Rangeway’s Retail Charging Format",
    headline: "Charging Where People Already Stop.",
    description: "ChargeVia by Rangeway brings fast charging to existing retail and host properties, with Rangeway developing and managing the charging operation.",
    detail: "The host keeps running its business and provides the useful amenities. Rangeway handles the charging.",
    scope: ["Retail Locations", "Site Hosts", "Rangeway-Operated"],
    href: "https://chargevia.net", domain: "chargevia.net",
    image: "/images/chargevia-retail.webp",
    imageAlt: "Concept rendering of orange ChargeVia chargers outside a cafe and retail property",
    imageWidth: 1672, imageHeight: 941,
    caption: "ChargeVia Retail Host Site / Concept Rendering",
  },
  {
    id: "03", slug: "ampiq", name: "AmpIQ",
    role: "Independent EV Charging Advisory",
    headline: "One Partner for the Whole Project.",
    description: "AmpIQ plans, coordinates, and oversees EV charging projects for property owners, from feasibility and procurement through delivery and ongoing management.",
    detail: "A hardware-agnostic orchestrator connecting equipment, contractors, utilities, incentives, and software around the needs of the property.",
    scope: ["Advisory", "Project Delivery", "Ongoing Management"],
    href: "https://ampiq.tech", domain: "ampiq.tech",
    image: "/images/ampiq-charging.webp",
    imageAlt: "An electric vehicle connected to a charger, an illustrative photograph from AmpIQ's website",
    imageWidth: 1120, imageHeight: 840,
    caption: "AmpIQ / Illustrative Charging Photograph",
    logo: "/brands/ampiq-current-logo.png", logoWidth: 861, logoHeight: 267,
  },
] as const;

export default function Home() {
  const year = new Date().getFullYear();
  return <>
    <a className="skip-link" href="#main">Skip to content</a>
    <header className="site-header" id="top">
      <a className="brand-home" href="#top" aria-label="Current Mile Group home">
        <img src="/brand/cmg-lockup-for-light.png" alt="Current Mile Group" width="1536" height="585" />
      </a>
      <Navigation />
    </header>
    <main id="main">
      <section className="hero" aria-labelledby="hero-title">
        <p className="eyebrow">Current Mile Group</p>
        <h1 id="hero-title">Different Businesses.<br /><span>A Shared Perspective.</span></h1>
        <div className="hero-bottom">
          <p>A strategic umbrella for businesses in mobility, energy, infrastructure, software, and hospitality.</p>
          <a className="text-link" href="#portfolio">Meet the Businesses <span aria-hidden="true">↓</span></a>
        </div>
      </section>
      <section className="portfolio-section" id="portfolio" aria-labelledby="portfolio-title">
        <div className="portfolio-intro">
          <h2 id="portfolio-title">The Portfolio</h2>
          <p>Rangeway. ChargeVia by Rangeway. AmpIQ.</p>
        </div>
        <div className="company-list">
          {portfolio.map((company) => <article className={`company company-${company.slug}`} key={company.slug} aria-labelledby={`${company.slug}-title`}>
            <figure className="company-visual">
              <img src={company.image} alt={company.imageAlt} width={company.imageWidth} height={company.imageHeight} loading={company.id === "01" ? "eager" : "lazy"} fetchPriority={company.id === "01" ? "high" : "auto"} />
              <figcaption>{company.caption}</figcaption>
            </figure>
            <div className="company-copy">
              <div className="company-heading"><span className="company-number" aria-hidden="true">{company.id}</span><span>{company.role}</span></div>
              <a href={company.href} className="company-brand" target="_blank" rel="noreferrer" aria-label={`Visit ${company.name}`}>
                {company.slug === "chargevia" ? <ChargeViaLockup /> : <img className={`company-logo logo-${company.slug}`} src={company.logo} alt={company.name} width={company.logoWidth} height={company.logoHeight} />}
                {company.slug === "chargevia" && <span className="endorsement" aria-hidden="true">by <img src="/brands/rangeway-charcoal-amber.svg" alt="" width="332" height="72" /></span>}
              </a>
              <h3 id={`${company.slug}-title`}>{company.headline}</h3>
              <p className="company-description">{company.description}</p>
              <p className="company-detail">{company.detail}</p>
              <div className="company-bottom">
                <ul aria-label={`${company.name} focus`}>{company.scope.map(item => <li key={item}>{item}</li>)}</ul>
                <a className="text-link" href={company.href} target="_blank" rel="noreferrer">{company.domain} <span aria-hidden="true">↗</span></a>
              </div>
            </div>
          </article>)}
        </div>
      </section>
      <section className="group-section" id="group" aria-labelledby="group-title">
        <div className="group-title">
          <p className="eyebrow">The Group</p>
          <h2 id="group-title">Current Mile Group.</h2>
          <img src="/brand/cmg-monogram-for-dark.png" alt="" aria-hidden="true" width="1024" height="1024" />
        </div>
        <div className="group-copy">
          <p className="group-lede">Current Mile Group is the strategic umbrella for Rangeway and AmpIQ.</p>
          <p>Rangeway and AmpIQ operate separately. ChargeVia by Rangeway is Rangeway’s retail charging format, not a separate operating company.</p>
          <p>The group’s focus spans mobility, energy, infrastructure, software, and hospitality.</p>
          <ul className="sector-list" aria-label="Group sectors">{['Mobility', 'Energy', 'Infrastructure', 'Software', 'Hospitality'].map(sector => <li key={sector}>{sector}</li>)}</ul>
        </div>
      </section>
      <section className="contact-section" id="contact" aria-labelledby="contact-title">
        <div><p className="eyebrow">Contact</p><h2 id="contact-title">Let’s Talk.</h2></div>
        <a className="contact-link" href="mailto:hello@currentmile.com">hello@currentmile.com <span aria-hidden="true">↗</span></a>
      </section>
    </main>
    <footer><Copyright buildYear={year} /></footer>
  </>;
}
