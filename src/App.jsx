import { useEffect, useMemo, useState } from 'react'
import shiftNavLogo from '../assets/brand/shift-logo-navbar-256.png'
import shiftAboutLogo from '../assets/brand/shift-logo-about-1200.png'
import carliProjectLogo from '../assets/brand/projects/carli-and-co-logo-black.png'
import gouveiaProjectLogo from '../assets/brand/projects/gouveia-socials-logo-black.png'

const navigation = [
  { label: 'Work', href: '/work' },
  { label: 'Services', href: '/services' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
]

const socialLinks = {
  whatsapp: 'https://wa.me/message/LZSJURID2QE4F1',
  instagram: 'https://www.instagram.com/getshiftdone.co.za?igsh=Nzd0anZzbmttdmsw&utm_source=qr',
}

const projects = [
  {
    slug: 'gouveia-socials',
    title: 'Gouveia Socials',
    number: '01',
    category: 'Social media studio',
    accent: 'pink',
    tagline: 'Turning a creative service into a confident digital presence.',
    summary:
      'A focused studio website designed to make the offer feel clear, current, and easy to trust from the first scroll.',
    services: ['Web design', 'Responsive build', 'Enquiry journey'],
    challenge:
      'The business needed a home that felt more considered than a social profile while keeping the energy and personality of the work intact.',
    approach:
      'A high-impact opening, confident editorial scale, and a simple path from discovering the service to starting a conversation.',
    outcome:
      'A flexible portfolio foundation that gives the brand room to grow, add proof, and turn attention into enquiries.',
    logo: gouveiaProjectLogo,
    logoAlt: 'Gouveia Socials logo',
  },
  {
    slug: 'carli-and-co',
    title: 'Carli & Co',
    number: '02',
    category: 'Local beauty business',
    accent: 'green',
    tagline: 'A calmer, more useful salon experience—online and off.',
    summary:
      'A complete multi-page website for an organic hair and beauty salon, built around services, trust, and effortless booking.',
    services: ['Website strategy', 'Multi-page design', 'Responsive build'],
    challenge:
      'A detailed service menu and a warm, personal brand needed structure without losing the intimate character of the salon.',
    approach:
      'Natural colours, confident typography, clear service grouping, and prominent booking actions across every device.',
    outcome:
      'A richer digital home that helps new clients understand the salon, browse services, and reach the booking flow without friction.',
    logo: carliProjectLogo,
    logoAlt: 'Carli & Co Organic Hair & Beauty logo',
  },
]

const projectPreviewSettings = {
  'gouveia-socials': {
    previewUrl: '/previews/gouveia-socials/',
    publicUrl: 'https://gouveia-socials.co.za/',
    openLabel: 'Visit live website',
  },
  'carli-and-co': {
    previewUrl: '/previews/carli-and-co/',
    publicUrl: '/previews/carli-and-co/',
    openLabel: 'Open full website',
  },
}

function normalisePath(path) {
  if (!path || path === '/') return '/'
  return path.replace(/\/+$/, '') || '/'
}

function usePathname() {
  const [pathname, setPathname] = useState(normalisePath(window.location.pathname))

  useEffect(() => {
    const handlePopState = () => setPathname(normalisePath(window.location.pathname))
    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  return pathname
}

function SiteLink({ href, children, className = '', onClick, ariaLabel }) {
  const handleClick = (event) => {
    onClick?.(event)
    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    ) {
      return
    }

    event.preventDefault()
    const nextPath = normalisePath(href)
    if (nextPath !== normalisePath(window.location.pathname)) {
      window.history.pushState({}, '', nextPath)
      window.dispatchEvent(new PopStateEvent('popstate'))
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  return (
    <a href={href} className={className} onClick={handleClick} aria-label={ariaLabel}>
      {children}
    </a>
  )
}

function Brand({ compact = false }) {
  return (
    <SiteLink href="/" className={`brand${compact ? ' brand--compact' : ''}`} ariaLabel="Shift home">
      <img className="brand-logo" src={shiftNavLogo} alt="" width="512" height="512" aria-hidden="true" />
      <span className="brand-name">SHIFT</span>
    </SiteLink>
  )
}

function HeroLine({ children, outline = false }) {
  return (
    <span className={`hero-line${outline ? ' hero-line--outline' : ''}`}>
      {[...children].map((character, index) => (
        <i key={`${character}-${index}`}>{character === ' ' ? '\u00a0' : character}</i>
      ))}
    </span>
  )
}

function Arrow({ down = false, direction = 'external' }) {
  const resolvedDirection = down ? 'down' : direction

  return (
    <span className={`icon-arrow icon-arrow--${resolvedDirection}`} aria-hidden="true">
      <svg viewBox="0 0 20 20" fill="none">
        {resolvedDirection === 'external' && <path d="M5 15 15 5M8 5h7v7" />}
        {resolvedDirection === 'down' && <path d="M10 4v12M5.5 11.5 10 16l4.5-4.5" />}
        {resolvedDirection === 'left' && <path d="M16 10H4M8.5 5.5 4 10l4.5 4.5" />}
        {resolvedDirection === 'up' && <path d="M10 16V4M5.5 8.5 10 4l4.5 4.5" />}
      </svg>
    </span>
  )
}

function SocialIcon({ name }) {
  return (
    <span className={`social-icon social-icon--${name}`} aria-hidden="true">
      {name === 'instagram' && (
        <svg viewBox="0 0 24 24" fill="none">
          <rect x="3.25" y="3.25" width="17.5" height="17.5" rx="5" />
          <circle cx="12" cy="12" r="4" />
          <circle className="social-icon__dot" cx="17.5" cy="6.5" r="1" />
        </svg>
      )}
      {name === 'whatsapp' && (
        <svg viewBox="0 0 24 24" fill="none">
          <path d="M20.25 11.5a8.25 8.25 0 0 1-12.1 7.3L3.5 20l1.25-4.45A8.25 8.25 0 1 1 20.25 11.5Z" />
          <path d="M8.1 7.15c.35 3.35 3.1 6.1 6.45 6.45l1.25-1.45 2.05.95v1.85c0 .65-.55 1.2-1.2 1.2A9.8 9.8 0 0 1 6.85 6.35c0-.65.55-1.2 1.2-1.2H9.9l.95 2.05L9.4 8.45" />
        </svg>
      )}
    </span>
  )
}

function ChatIcon() {
  return (
    <span className="chat-icon" aria-hidden="true">
      <svg viewBox="0 0 24 24" fill="none">
        <path d="M20 11.25c0 4.42-3.8 8-8.5 8-1.3 0-2.53-.27-3.63-.76L4 19.75l1.18-3.47A7.7 7.7 0 0 1 3 11.25c0-4.42 3.8-8 8.5-8s8.5 3.58 8.5 8Z" />
        <path d="M7.75 9.5h7.5M7.75 13h5" />
      </svg>
    </span>
  )
}

function Header({ pathname }) {
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => setMenuOpen(false), [pathname])
  useEffect(() => {
    document.body.classList.toggle('menu-open', menuOpen)
    return () => document.body.classList.remove('menu-open')
  }, [menuOpen])

  return (
    <>
      <header className="site-header">
        <Brand />
        <nav className="desktop-nav" aria-label="Primary navigation">
          {navigation.map((item) => (
            <SiteLink
              key={item.href}
              href={item.href}
              className={pathname === item.href ? 'active' : ''}
            >
              {item.label}
            </SiteLink>
          ))}
        </nav>
        <SiteLink href="/contact" className="header-cta">
          Start your shift <Arrow />
        </SiteLink>
        <button
          className="menu-button"
          type="button"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          onClick={() => setMenuOpen((current) => !current)}
        >
          <span className="menu-button__label">{menuOpen ? 'Close' : 'Menu'}</span>
          <span className="menu-button__icon" aria-hidden="true">
            <i />
            <i />
          </span>
        </button>
      </header>
      <div
        className={`mobile-menu${menuOpen ? ' mobile-menu--open' : ''}`}
        id="mobile-menu"
        aria-hidden={!menuOpen}
      >
        <nav aria-label="Mobile navigation">
          {[{ label: 'Home', href: '/' }, ...navigation].map((item, index) => (
            <SiteLink key={item.href} href={item.href} className={pathname === item.href ? 'active' : ''}>
              <span className="mobile-menu__index">{String(index + 1).padStart(2, '0')}</span>
              <span className="mobile-menu__label">{item.label}</span>
              <span className="mobile-menu__state" aria-hidden="true"><i /><i /><i /></span>
            </SiteLink>
          ))}
        </nav>
        <div className="mobile-menu__footer">
          <p>Web design for South African businesses ready to make the shift.</p>
          <div>
            <a href="mailto:hello@getshiftdone.co.za">Email</a>
            <a href={socialLinks.whatsapp} target="_blank" rel="noreferrer">
              <SocialIcon name="whatsapp" />
              WhatsApp
            </a>
            <a href={socialLinks.instagram} target="_blank" rel="noreferrer">
              <SocialIcon name="instagram" />
              Instagram
            </a>
          </div>
        </div>
      </div>
    </>
  )
}

function ProjectMockup({ project }) {
  return (
    <div className="mock-browser">
      <div className="mock-browser__bar">
        <span />
        <span>{project.title}</span>
        <i />
      </div>
      {project.slug === 'gouveia-socials' && (
        <div className="mock-gouveia">
          <div className="mock-gouveia__copy">
            <small>Branding · Social media · Websites</small>
            <strong>Design that makes brands unforgettable.</strong>
            <i />
          </div>
          <div className="mock-gouveia__tiles">
            <span>Gouveia</span>
            <span>Start your project</span>
          </div>
        </div>
      )}
      {project.slug === 'carli-and-co' && (
        <div className="mock-carli">
          <div className="mock-carli__copy">
            <small>Organic hair &amp; beauty</small>
            <strong>Look &amp; feel beautiful.</strong>
            <span className="mock-inline-link">Explore the salon <Arrow /></span>
          </div>
          <div className="mock-carli__portrait">
            <i />
            <b>Carli<br />&amp; Co</b>
          </div>
        </div>
      )}
    </div>
  )
}

function ProjectBrandMark({ project, featured = false }) {
  return (
    <div
      className={`project-brand-mark project-brand-mark--${project.slug}${featured ? ' project-brand-mark--featured' : ''}`}
    >
      <img src={project.logo} alt={project.logoAlt} />
    </div>
  )
}

function StaticProjectPreview({ project, hero = false }) {
  const settings = projectPreviewSettings[project.slug]
  const publicUrl = settings?.publicUrl

  return (
    <div
      className={`project-visual project-visual--${project.accent} project-visual--static${hero ? ' project-visual--hero' : ''}`}
      aria-label={`Preview of the ${project.title} website`}
    >
      <div className="project-preview">
        <div className="project-preview__bar">
          <span className="project-preview__status"><i /> Project preview</span>
          <strong>{project.title}</strong>
          {publicUrl ? (
            <a href={publicUrl} target="_blank" rel="noreferrer">
              {settings.openLabel} <Arrow />
            </a>
          ) : (
            <SiteLink href={`/work/${project.slug}`}>
              {settings.openLabel} <Arrow />
            </SiteLink>
          )}
        </div>
        <div className="project-preview__canvas">
          <ProjectMockup project={project} />
        </div>
      </div>
    </div>
  )
}

function EmbeddedProjectPreview({ project, hero = false }) {
  const [active, setActive] = useState(false)
  const settings = projectPreviewSettings[project.slug]

  return (
    <div
      className={`project-visual project-visual--${project.accent} project-visual--embedded${hero ? ' project-visual--hero' : ''}`}
      aria-label={`Interactive preview of the ${project.title} website`}
    >
      <div className="project-preview project-preview--embedded">
        <div className="project-preview__bar">
          <span className="project-preview__status"><i /> Actual website</span>
          <strong>{project.title}</strong>
          {active ? (
            <button className="project-preview__exit" type="button" onClick={() => setActive(false)}>
              Exit preview
            </button>
          ) : (
            <a href={settings.publicUrl} target="_blank" rel="noreferrer">
              {settings.openLabel} <Arrow />
            </a>
          )}
        </div>
        <div className={`project-preview__site${active ? ' is-active' : ''}`}>
          <iframe
            src={settings.previewUrl}
            title={`${project.title} website preview`}
            loading="lazy"
            sandbox="allow-forms allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts allow-top-navigation-by-user-activation"
          />
          {!active && (
            <button
              className="project-preview__activate"
              type="button"
              onClick={() => setActive(true)}
              aria-label={`Interact with the actual ${project.title} website`}
            >
              <span>Explore the actual website</span>
              <small>Tap to interact with every page</small>
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

function ProjectVisual({ project, hero = false, interactive = false }) {
  if (interactive && projectPreviewSettings[project.slug]) {
    if (projectPreviewSettings[project.slug].previewUrl) {
      return <EmbeddedProjectPreview project={project} hero={hero} />
    }

    return <StaticProjectPreview project={project} hero={hero} />
  }

  return (
    <div
      className={`project-visual project-visual--${project.accent}${hero ? ' project-visual--hero' : ''}`}
      aria-label={`Stylised preview of the ${project.title} website`}
      role="img"
    >
      <ProjectMockup project={project} />
    </div>
  )
}

function ProjectRow({ project, reverse = false }) {
  const hasInteractivePreview = Boolean(projectPreviewSettings[project.slug]?.previewUrl)

  return (
    <article className={`project-row${reverse ? ' project-row--reverse' : ''}`} data-reveal>
      {hasInteractivePreview ? (
        <div className="project-row__visual project-row__visual--interactive">
          <ProjectVisual project={project} interactive />
        </div>
      ) : (
        <SiteLink href={`/work/${project.slug}`} className="project-row__visual project-row__visual-link">
          <ProjectVisual project={project} />
        </SiteLink>
      )}
      <div className="project-row__content">
        <div className="project-row__meta">
          <span>{project.number}</span>
          <p>{project.category}</p>
        </div>
        <ProjectBrandMark project={project} />
        <h3>{project.title}</h3>
        <p>{project.tagline}</p>
        <ul aria-label="Services provided">
          {project.services.map((service) => <li key={service}>{service}</li>)}
        </ul>
        <SiteLink href={`/work/${project.slug}`} className="text-link">
          View project <Arrow />
        </SiteLink>
      </div>
    </article>
  )
}

function SectionHeading({ index, title, action }) {
  return (
    <div className="section-heading" data-reveal>
      <span>{index}</span>
      <h2>{title}</h2>
      {action}
    </div>
  )
}

function HomePage() {
  return (
    <main>
      <section className="home-hero">
        <div className="hero-signal" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
        <div className="hero-status">
          <span>South African web design studio</span>
          <span>Available for selected projects</span>
        </div>
        <h1 aria-label="Make the shift. Get shift done.">
          <HeroLine>Make the</HeroLine>
          <HeroLine outline>shift.</HeroLine>
          <HeroLine>Get shift</HeroLine>
          <HeroLine>done.</HeroLine>
        </h1>
        <div className="hero-bottom">
          <p>
            Shift creates polished, practical websites for local businesses ready to look sharper,
            work smarter, and leave outdated behind.
          </p>
          <div className="hero-actions">
            <SiteLink href="/work" className="button button--light">Explore the work <Arrow /></SiteLink>
            <SiteLink href="/services" className="button button--line">What we do <Arrow /></SiteLink>
          </div>
        </div>
        <div className="hero-project" data-reveal>
          <SiteLink href="/work/gouveia-socials" className="hero-project__label">
            <span>Featured project</span>
            <strong>Gouveia Socials</strong>
            <Arrow />
          </SiteLink>
          <ProjectVisual project={projects[0]} hero interactive />
        </div>
      </section>

      <div className="marquee" aria-label="Shift services">
        <div>
          <span>Web design</span><i />
          <span>Website upgrades</span><i />
          <span>Responsive development</span><i />
          <span>Local business growth</span><i />
          <span aria-hidden="true">Web design</span><i aria-hidden="true" />
          <span aria-hidden="true">Website upgrades</span><i aria-hidden="true" />
        </div>
      </div>

      <section className="work-preview page-shell">
        <SectionHeading
          index="Selected work"
          title="Designed to make the next move obvious."
          action={<SiteLink href="/work" className="text-link">All projects <Arrow /></SiteLink>}
        />
        <div className="project-list">
          {projects.map((project, index) => (
            <ProjectRow key={project.slug} project={project} reverse={index % 2 === 1} />
          ))}
        </div>
      </section>

      <section className="manifesto-section">
        <div className="manifesto-statement" data-reveal>
          <span className="signal-dot" aria-hidden="true" />
          <p>
            Looking established shouldn’t require an agency-sized budget. It requires good thinking,
            strong design, and someone who cares about the details.
          </p>
        </div>
        <div className="manifesto-support page-shell" data-reveal>
          <p>
            Shift works directly with owners and founders to turn an outdated or underperforming
            website into something the business can be proud to send people to.
          </p>
          <SiteLink href="/about" className="button button--dark">Why Shift <Arrow /></SiteLink>
        </div>
      </section>

      <section className="services-preview page-shell">
        <SectionHeading index="What we do" title="Web design, without the theatre." />
        <div className="service-lines">
          <div data-reveal>
            <span>01</span>
            <h3>Launch</h3>
            <p>A focused, professional website for a new business ready to look established.</p>
            <Arrow />
          </div>
          <div data-reveal>
            <span>02</span>
            <h3>Upgrade</h3>
            <p>A thoughtful rebuild for a business that has outgrown its current website.</p>
            <Arrow />
          </div>
          <div data-reveal>
            <span>03</span>
            <h3>Custom</h3>
            <p>A tailored digital experience when the idea needs more than a standard site.</p>
            <Arrow />
          </div>
        </div>
        <SiteLink href="/services" className="button button--light services-preview__button">Explore services <Arrow /></SiteLink>
      </section>

      <ContactBanner />
    </main>
  )
}

function WorkPage() {
  return (
    <main>
      <PageHero
        label="Selected work"
        title="Proof over promises."
        intro="Two different businesses. Two different problems. One standard: make the experience clearer, stronger, and worth remembering."
        accent="pink"
      />
      <section className="work-page page-shell">
        {projects.map((project, index) => (
          <ProjectRow key={project.slug} project={project} reverse={index % 2 === 1} />
        ))}
      </section>
      <section className="work-note page-shell" data-reveal>
        <p>More work is taking shape.</p>
        <h2>Your project could be the next one here.</h2>
        <SiteLink href="/contact" className="button button--light">Start a conversation <Arrow /></SiteLink>
      </section>
      <ContactBanner />
    </main>
  )
}

function ServicesPage() {
  const serviceGroups = [
    {
      number: '01',
      name: 'Launch',
      accent: 'green',
      price: 'R6 500',
      priceLead: '',
      description: 'For a new business that needs a confident digital home from day one.',
      includes: ['Up to 3 essential pages', 'Custom responsive design', 'Contact or enquiry form', 'Search-ready foundations', 'Launch support'],
    },
    {
      number: '02',
      name: 'Upgrade',
      accent: 'pink',
      price: 'R12 500',
      priceLead: '',
      description: 'For an established business whose website no longer matches the quality of the work.',
      includes: ['Up to 7 core pages', 'Current-site review', 'Content and navigation reset', 'Custom responsive rebuild', 'Analytics and performance setup', 'Launch support'],
    },
    {
      number: '03',
      name: 'Custom',
      accent: 'blue',
      price: 'R20 000',
      priceLead: 'From',
      description: 'For a product, service, or idea that needs a more tailored digital experience.',
      includes: ['Tailored project scope', 'Experience and interface design', 'Advanced interactions or booking', 'Third-party integrations', 'Reusable page systems', 'Technical handover'],
    },
  ]

  return (
    <main>
      <PageHero
        label="Services"
        title="One service. Done properly."
        intro="Shift designs and builds websites. The scope changes to fit the business, but the standard does not."
        accent="blue"
      />
      <section className="service-detail page-shell">
        {serviceGroups.map((group) => (
          <article className={`service-detail__item service-detail__item--${group.accent}`} key={group.name} data-reveal>
            <div className="service-detail__title">
              <span className="service-detail__number">{group.number}</span>
              <h2>{group.name}</h2>
              <div className="service-detail__price" aria-label={`${group.priceLead ? `${group.priceLead} ` : ''}${group.price} once-off`}>
                {group.priceLead ? <small>{group.priceLead}</small> : null}
                <strong>{group.price}</strong>
                <span>once-off</span>
              </div>
            </div>
            <div className="service-detail__copy">
              <p>{group.description}</p>
              <p className="service-detail__care">
                <span>Required website care</span>
                <strong>+ R650 / month</strong>
              </p>
            </div>
            <ul>
              {group.includes.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </article>
        ))}
        <p className="service-detail__note" data-reveal>
          Prices are starting points based on the scope shown. Your final quote is agreed before work begins.
          Domains, paid software, copywriting, ecommerce, and third-party services are quoted separately when needed.
        </p>
      </section>

      <section className="care-plan">
        <div className="care-plan__layout page-shell" data-reveal>
          <div className="care-plan__intro">
            <p>Required website care</p>
            <h2>Built once. Looked after every month.</h2>
            <p>
              Every Shift website stays on an active care plan while it is hosted and managed by Shift.
              The plan begins when the website goes live.
            </p>
          </div>
          <div className="care-plan__price" aria-label="Website care costs 650 rand per month">
            <span>Website Care</span>
            <strong>R650</strong>
            <small>/ month</small>
          </div>
          <ul className="care-plan__includes" aria-label="Website care includes">
            <li>Managed hosting and SSL</li>
            <li>Backups and emergency restoration</li>
            <li>Uptime, security, and enquiry-form checks</li>
            <li>Software and dependency updates</li>
            <li>Up to 30 minutes of minor content changes each month</li>
          </ul>
          <div className="care-plan__terms">
            <p>Additional work is quoted before it begins. Unused change time does not roll over.</p>
            <p>
              Care can be cancelled with 30 days' notice. Hosting and maintenance then end, and a website
              transfer can be arranged once the account is up to date. Your domain and content remain yours.
            </p>
          </div>
        </div>
      </section>

      <section className="process-section page-shell">
        <SectionHeading index="The process" title="Clear from first chat to final launch." />
        <div className="process-list">
          {[
            ['01', 'Discover', 'We talk through the business, the audience, what is not working, and what success should feel like.'],
            ['02', 'Direct', 'The structure, message, and visual direction are shaped before unnecessary work begins.'],
            ['03', 'Design & build', 'The website takes shape responsively, with regular opportunities to review the important decisions.'],
            ['04', 'Launch', 'Everything is checked, polished, and prepared so the new website can go live confidently.'],
          ].map(([number, title, copy]) => (
            <article key={number} data-reveal>
              <span>{number}</span>
              <h3>{title}</h3>
              <p>{copy}</p>
            </article>
          ))}
        </div>
      </section>

      <FaqSection />
      <ContactBanner />
    </main>
  )
}

function AboutPage() {
  return (
    <main>
      <PageHero
        label="About Shift"
        title="Built for businesses that refuse to stay behind."
        intro="Shift is an independent South African web design studio for owners who know their business deserves a stronger next chapter."
        accent="green"
      />

      <section className="about-intro page-shell">
        <div className="about-intro__mark">
          <img
            className="about-logo"
            src={shiftAboutLogo}
            alt="Shift gate logo with a blue, pink, and green movement path"
            width="1200"
            height="1200"
          />
        </div>
        <div data-reveal>
          <p>
            Too many good local businesses are judged by websites that are slow, dated, confusing,
            or simply no longer represent them.
          </p>
          <p>
            Shift exists to close that gap. You work directly with the person thinking through,
            designing, and building the site—so the process stays focused and the result stays personal.
          </p>
        </div>
      </section>

      <section className="values-section">
        <div className="page-shell">
          <SectionHeading index="The standard" title="What guides the work." />
          <div className="values-grid">
            <article data-reveal>
              <span className="value-swatch value-swatch--blue" />
              <h3>Clear beats clever.</h3>
              <p>Good design makes the business easier to understand, not harder to access.</p>
            </article>
            <article data-reveal>
              <span className="value-swatch value-swatch--pink" />
              <h3>Details build trust.</h3>
              <p>Spacing, motion, words, and mobile behaviour all shape how professional a business feels.</p>
            </article>
            <article data-reveal>
              <span className="value-swatch value-swatch--green" />
              <h3>Momentum matters.</h3>
              <p>The process should keep moving, with honest decisions and a clear finish line.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="local-focus page-shell" data-reveal>
        <p>Based in South Africa. Built to go anywhere.</p>
        <h2>Local understanding, world-class ambition.</h2>
        <div>
          <p>
            The aim is not to make local businesses look like giant corporations. It is to make them
            look like the strongest, clearest version of themselves.
          </p>
          <SiteLink href="/work" className="button button--light">See the work <Arrow /></SiteLink>
        </div>
      </section>

      <ContactBanner />
    </main>
  )
}

function ContactPage() {
  const [status, setStatus] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    const name = form.get('name')
    const email = form.get('email')
    const business = form.get('business') || 'Not provided'
    const message = form.get('message')
    const subject = `New Shift project enquiry from ${name}`
    const body = [
      `Name: ${name}`,
      `Email: ${email}`,
      `Business: ${business}`,
      '',
      message,
    ].join('\n')

    setStatus('Opening your email app with the message ready to send.')
    window.location.href = `mailto:hello@getshiftdone.co.za?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  }

  return (
    <main className="contact-page">
      <PageHero
        label="Contact"
        title="Tell me where you want to go."
        intro="New business, overdue rebuild, or an idea that needs a proper digital home—start with a simple message."
        accent="pink"
      />
      <section className="contact-layout page-shell">
        <div className="contact-details" data-reveal>
          <p>Contact channels</p>
          <div>
            <span>Email</span>
            <a href="mailto:hello@getshiftdone.co.za">
              <strong>hello@getshiftdone.co.za</strong>
              <Arrow />
            </a>
          </div>
          <div>
            <span className="contact-channel__label"><SocialIcon name="whatsapp" /> WhatsApp Business</span>
            <a href={socialLinks.whatsapp} target="_blank" rel="noreferrer">
              <strong>Message Shift</strong>
              <Arrow />
            </a>
          </div>
          <div>
            <span className="contact-channel__label"><SocialIcon name="instagram" /> Instagram</span>
            <a href={socialLinks.instagram} target="_blank" rel="noreferrer">
              <strong>@getshiftdone.co.za</strong>
              <Arrow />
            </a>
          </div>
          <p className="contact-details__note">
            Email is best for detailed project enquiries. For a quicker conversation, message Shift on WhatsApp or Instagram.
          </p>
        </div>
        <form className="contact-form" onSubmit={handleSubmit} data-reveal>
          <label>
            <span>Your name</span>
            <input name="name" type="text" autoComplete="name" required />
          </label>
          <label>
            <span>Email address</span>
            <input name="email" type="email" autoComplete="email" required />
          </label>
          <label>
            <span>Business name</span>
            <input name="business" type="text" autoComplete="organization" />
          </label>
          <label>
            <span>What needs to change?</span>
            <textarea name="message" rows="6" required />
          </label>
          <button type="submit" className="button button--light">Prepare message <Arrow /></button>
          <p className="form-status" role="status" aria-live="polite">{status}</p>
        </form>
      </section>
    </main>
  )
}

function ProjectPage({ project }) {
  if (!project) return <NotFoundPage />

  return (
    <main className={`case-study case-study--${project.accent}`}>
      <section className="case-hero page-shell">
        <SiteLink href="/work" className="back-link"><Arrow direction="left" /> All work</SiteLink>
        <ProjectBrandMark project={project} featured />
        <div className="case-hero__heading">
          <h1>{project.title}</h1>
          <p>{project.summary}</p>
        </div>
        <ProjectVisual
          project={project}
          hero
          interactive={Boolean(projectPreviewSettings[project.slug])}
        />
        <div className="case-meta">
          <div><span>Client</span><strong>{project.title}</strong></div>
          <div><span>Category</span><strong>{project.category}</strong></div>
          <div><span>Scope</span><strong>{project.services.join(', ')}</strong></div>
        </div>
      </section>

      <section className="case-story page-shell">
        <article data-reveal>
          <span>01</span>
          <h2>The challenge</h2>
          <p>{project.challenge}</p>
        </article>
        <article data-reveal>
          <span>02</span>
          <h2>The approach</h2>
          <p>{project.approach}</p>
        </article>
        <article data-reveal>
          <span>03</span>
          <h2>The outcome</h2>
          <p>{project.outcome}</p>
        </article>
      </section>

      <section className="case-takeaway">
        <div className="page-shell" data-reveal>
          <p>The principle</p>
          <h2>A strong website should make the quality of the business feel obvious.</h2>
        </div>
      </section>

      <section className="next-project page-shell">
        <span>Next project</span>
        {(() => {
          const index = projects.findIndex((item) => item.slug === project.slug)
          const next = projects[(index + 1) % projects.length]
          return (
            <SiteLink href={`/work/${next.slug}`}>
              <strong>{next.title}</strong>
              <Arrow />
            </SiteLink>
          )
        })()}
      </section>
      <ContactBanner />
    </main>
  )
}

function PageHero({ label, title, intro, accent }) {
  return (
    <section className={`page-hero page-hero--${accent}`}>
      <div className="page-shell">
        <div className="page-hero__label">
          <span />
          <p>{label}</p>
        </div>
        <h1>{title}</h1>
        <p className="page-hero__intro">{intro}</p>
        <Arrow down />
      </div>
    </section>
  )
}

function FaqSection() {
  const questions = [
    ['How much does a website cost?', 'Launch projects start at R6 500, Upgrade projects at R12 500, and tailored Custom work from R20 000. Every website also requires Website Care at R650 per month while it is hosted and managed by Shift.'],
    ['Why is the monthly Website Care plan required?', 'A website needs more than a launch day. The plan keeps your site hosted, backed up, monitored, maintained, and supported, while also including up to 30 minutes of minor content changes each month.'],
    ['What happens if I cancel Website Care?', "You can cancel with 30 days' notice. Shift hosting and maintenance end after the notice period, and a transfer can be arranged once the account is up to date. Your domain and content remain yours."],
    ['Can Shift improve an existing website?', 'Yes. An upgrade can keep what is useful, rethink what is holding the business back, and rebuild the experience around the next stage of the company.'],
    ['How long does a website take?', 'Timing depends on the number of pages, content readiness, and custom features. You will receive a clear timeline with the project scope before work begins.'],
    ['Will the website work on phones?', 'Yes. Responsive behaviour is designed from the start, not treated as a smaller copy of the desktop site at the end.'],
  ]

  return (
    <section className="faq-section page-shell">
      <SectionHeading index="FAQ" title="Good questions, answered plainly." />
      <div className="faq-list">
        {questions.map(([question, answer]) => (
          <details key={question} data-reveal>
            <summary>{question}<span aria-hidden="true">+</span></summary>
            <p>{answer}</p>
          </details>
        ))}
      </div>
    </section>
  )
}

function ContactBanner() {
  return (
    <section className="contact-banner">
      <div className="contact-banner__signal" aria-hidden="true"><span /><span /><span /></div>
      <div className="page-shell" data-reveal>
        <p>Have a business worth noticing?</p>
        <h2>Let’s get shift done.</h2>
        <SiteLink href="/contact" className="button button--dark">Start your shift <Arrow /></SiteLink>
      </div>
    </section>
  )
}

function NotFoundPage() {
  return (
    <main className="not-found page-shell">
      <span>404</span>
      <h1>This page took the wrong turn.</h1>
      <SiteLink href="/" className="button button--light">Back home <Arrow /></SiteLink>
    </main>
  )
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer__top page-shell">
        <Brand compact />
        <div className="site-footer__message">
          <span className="site-footer__signal" aria-hidden="true"><i /><i /><i /></span>
          <p className="site-footer__slogan">Get shift done.</p>
          <p className="site-footer__description">Websites and ongoing care for local businesses ready to move.</p>
        </div>
        <div className="site-footer__links">
          <nav aria-label="Footer navigation">
            {navigation.map((item) => <SiteLink key={item.href} href={item.href}>{item.label}</SiteLink>)}
          </nav>
          <div className="site-footer__socials" aria-label="Shift social channels">
            <a href={socialLinks.whatsapp} target="_blank" rel="noreferrer">
              <SocialIcon name="whatsapp" />
              WhatsApp
            </a>
            <a href={socialLinks.instagram} target="_blank" rel="noreferrer">
              <SocialIcon name="instagram" />
              Instagram
            </a>
          </div>
        </div>
      </div>
      <div className="site-footer__word" aria-hidden="true">
        <span className="site-footer__word-green">SH</span>
        <span className="site-footer__word-pink">IF</span>
        <span className="site-footer__word-blue">T</span>
      </div>
      <div className="site-footer__bottom page-shell">
        <p>South Africa</p>
        <p>© {new Date().getFullYear()} Shift</p>
        <p>getshiftdone.co.za</p>
        <a className="site-footer__back" href="#page-content">Back to top <Arrow direction="up" /></a>
      </div>
    </footer>
  )
}

function WhatsAppButton() {
  return (
    <a
      className="whatsapp-button"
      href={socialLinks.whatsapp}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat with Shift on WhatsApp"
    >
      <ChatIcon />
    </a>
  )
}

function RouteView({ pathname }) {
  if (pathname === '/') return <HomePage />
  if (pathname === '/work') return <WorkPage />
  if (pathname === '/services') return <ServicesPage />
  if (pathname === '/about') return <AboutPage />
  if (pathname === '/contact') return <ContactPage />
  if (pathname.startsWith('/work/')) {
    const slug = pathname.split('/')[2]
    return <ProjectPage project={projects.find((item) => item.slug === slug)} />
  }
  return <NotFoundPage />
}

function App() {
  const pathname = usePathname()
  const routeTitle = useMemo(() => {
    if (pathname === '/') return 'Shift — Get shift done'
    const project = pathname.startsWith('/work/') && projects.find((item) => pathname.endsWith(item.slug))
    if (project) return `${project.title} — Shift`
    const name = pathname.slice(1)
    return `${name.charAt(0).toUpperCase()}${name.slice(1)} — Shift`
  }, [pathname])

  useEffect(() => {
    document.title = routeTitle
    window.scrollTo({ top: 0, behavior: 'instant' })
    document.documentElement.classList.add('motion-ready')

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12 },
    )

    const animationFrame = window.requestAnimationFrame(() => {
      document.querySelectorAll('[data-reveal]').forEach((element) => observer.observe(element))
    })

    return () => {
      window.cancelAnimationFrame(animationFrame)
      observer.disconnect()
    }
  }, [pathname, routeTitle])

  return (
    <div className="site-shell">
      <a className="skip-link" href="#page-content">Skip to content</a>
      <Header pathname={pathname} />
      <div id="page-content" key={pathname} className="route-view">
        <RouteView pathname={pathname} />
      </div>
      <Footer />
      <WhatsAppButton />
    </div>
  )
}

export default App
