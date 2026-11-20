import { useEffect, useRef, useState } from 'react'

export function Arrow({ direction = 'right' }: { direction?: 'right' | 'up' | 'down' | 'left' }) {
  return <svg className={'arrow arrow-' + direction} viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M4 12h15m-6.5-6.5L19 12l-6.5 6.5" stroke="currentColor" strokeWidth="1.7" />
  </svg>
}

export function Wordmark() {
  return <a className="wordmark" href="/#inicio" aria-label="Bustelo Herrería, inicio"><strong>BUSTELO</strong><span>HERRERÍA</span></a>
}

const links = [['inicio', 'Inicio'], ['proyectos', 'Proyectos'], ['especialidades', 'Especialidades'], ['nosotros', 'Nosotros'], ['contacto', 'Contacto']]

const workshopDirections = 'https://maps.app.goo.gl/p4iExGNyhQeSrGzR8'
// El mapa del sitio oficial y el enlace del cliente identifican la misma ficha de Google Maps.
const workshopMap = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6541.039907859009!2d-57.91032012056978!3d-34.94357449999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95a2e9d9f227b8d7%3A0xdd9eecf981d699eb!2sHerreria%20Bustelo!5e0!3m2!1ses-419!2sar!4v1758899350717!5m2!1ses-419!2sar'

export function Header({ home }: { home: boolean }) {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState(home ? 'inicio' : 'proyectos')
  const toggle = useRef<HTMLButtonElement>(null)
  useEffect(() => {
    if (!home) return
    const sections = links.map(([id]) => document.getElementById(id)).filter((item): item is HTMLElement => Boolean(item))
    function highlight() {
      const reached = sections.filter(section => section.getBoundingClientRect().top <= 150)
      const atEnd = window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2
      setActive(atEnd ? 'contacto' : reached.at(-1)?.id ?? 'inicio')
    }
    highlight()
    window.addEventListener('scroll', highlight, { passive: true })
    return () => window.removeEventListener('scroll', highlight)
  }, [home])
  return <header className="site-header" onKeyDown={event => {
    if (open && event.key === 'Escape') { setOpen(false); toggle.current?.focus() }
  }} onBlur={event => { if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false) }}>
    <div className="shell header-inner">
      <Wordmark />
      <button type="button" className="menu-toggle" ref={toggle} aria-expanded={open} aria-controls="main-nav" onClick={() => setOpen(!open)}>
        {open ? 'Cerrar' : 'Menú'} <span aria-hidden="true">{open ? '×' : '☰'}</span>
      </button>
      <nav id="main-nav" aria-label="Navegación principal" className={open ? 'nav open' : 'nav'}>
        {links.map(([id, label]) => <a key={id} href={'/#' + id} aria-current={active === id ? 'location' : undefined}
          className={id === 'contacto' ? 'nav-contact' : 'nav-link'} onClick={() => {
            setOpen(false)
            if (home) document.getElementById(id)?.focus({ preventScroll: true })
          }}>{label}{id === 'contacto' && <Arrow direction="up" />}</a>)}
      </nav>
    </div>
  </header>
}

export function Contact() {
  return <section id="contacto" tabIndex={-1} aria-labelledby="contact-title" className="contact band">
    <div className="shell contact-grid">
      <div><h2 id="contact-title">Contacto<span className="accent">.</span></h2>
        <p>¿Tenés un proyecto en obra o en etapa de presupuesto? Compartinos los planos y el alcance de los trabajos.</p>
        <a className="button" href="mailto:busteloherreria@hotmail.com?subject=Consulta%20comercial%20de%20obra">Consultar por una obra <Arrow direction="up" /></a>
      </div>
      <dl className="facts">
        <div><dt>Correo</dt><dd><a href="mailto:busteloherreria@hotmail.com">busteloherreria@hotmail.com</a></dd></div>
        <div><dt>Teléfono</dt><dd><a href="tel:+542214636988">+54 221 463 6988</a></dd></div>
        <div><dt>Taller</dt><dd>Calle 91 N.º 532, entre 5 y 6<br />La Plata, Buenos Aires</dd></div>
      </dl>
      <div className="contact-location">
        <a className="text-link" href={workshopDirections} target="_blank" rel="noopener noreferrer">
          Cómo llegar <Arrow direction="up" />
        </a>
        <iframe src={workshopMap} title="Google Maps: taller de Herrería Bustelo en La Plata"
          loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen />
      </div>
    </div>
  </section>
}

export function Footer() {
  return <footer className="shell footer"><Wordmark /><a className="text-link" href="#top">Volver arriba <Arrow direction="up" /></a></footer>
}
