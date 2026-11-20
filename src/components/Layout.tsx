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
    </div>
  </section>
}

export function Footer() {
  return <footer className="shell footer"><Wordmark /><a className="text-link" href="#top">Volver arriba <Arrow direction="up" /></a></footer>
}
