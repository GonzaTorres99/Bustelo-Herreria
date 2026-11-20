import { Arrow, Contact } from '../components/Layout'
import { ProjectCard } from '../components/ProjectCard'
import { visibleProjects } from '../data/projects'
import { specialties } from '../data/specialties'
import heroSmall from '../assets/estructura-640.webp'
import heroLarge from '../assets/estructura-1280.webp'

export default function Home() {
  return <>
    <section id="inicio" tabIndex={-1} aria-labelledby="hero-title" className="hero">
      <div className="hero-copy">
        <h1 id="hero-title">Herrería<br />para grandes<br />obras<span className="accent">.</span></h1>
        <p>Estructuras metálicas y herrería de obra para constructoras, desarrolladoras y estudios de arquitectura.</p>
        <div className="hero-actions"><a href="#proyectos" className="button">Explorar proyectos <Arrow /></a>
          <a href="#contacto" className="text-link">Contactar <Arrow direction="up" /></a></div>
      </div>
      <figure className="hero-figure">
        <img src={heroLarge} srcSet={heroSmall + ' 640w, ' + heroLarge + ' 1254w'} sizes="(max-width: 720px) 100vw, 51vw"
          width="1254" height="1254" fetchPriority="high" alt="Encuentro de vigas de acero remachadas, visto desde abajo." />
        <figcaption>Detalle estructural · Imagen ilustrativa</figcaption>
      </figure>
    </section>
    <div className="shell"><div className="index-strip micro"><span>La Plata, Buenos Aires</span><span>Herrería de obra <b>/</b> Carpintería metálica</span></div></div>
    <section id="proyectos" tabIndex={-1} aria-labelledby="projects-title" className="shell section projects">
      <h2 id="projects-title">Proyectos destacados</h2>
      {visibleProjects.length ? visibleProjects.map(project => <ProjectCard key={project.slug} project={project} />)
        : <p className="empty-projects">Para conocer antecedentes de obra, <a className="inline-link" href="#contacto">contactá al taller</a>.</p>}
    </section>
    <section id="especialidades" tabIndex={-1} aria-labelledby="specialties-title" className="specialties band">
      <div className="shell">
        <div className="section-head"><h2 id="specialties-title">Especialidades</h2><p>Soluciones en metal para la estructura, los accesos y las terminaciones de obra.</p></div>
        <div className="specialty-grid">{specialties.map(group => <article key={group.image}>
          <img src={group.image} alt={group.alt} loading="lazy" width="720" height="720" />
          {group.items.map(item => <div className="specialty-item" key={item.name}><h3>{item.name}</h3><p>{item.description}</p></div>)}
        </article>)}</div>
        <p className="image-credit">Imágenes ilustrativas de las especialidades.</p>
      </div>
    </section>
    <section id="nosotros" tabIndex={-1} aria-labelledby="about-title" className="shell section about">
      <h2 id="about-title">Nosotros</h2><div><p className="about-lead">Más de treinta años de oficio en La Plata.</p>
        <p>En Bustelo Herrería trabajamos el metal a medida. Desde nuestro taller acompañamos a empresas y particulares con estructuras para techos, carpintería metálica y herrería de obra.</p>
        <a href="#contacto" className="text-link">Hablar con el taller <Arrow direction="up" /></a>
      </div>
    </section>
    <Contact />
  </>
}
