import { readyForPublication, visibleProjects, type Project } from '../data/projects'
import { Gallery } from '../components/Gallery'
import { Arrow } from '../components/Layout'

export default function ProjectDetail({ project }: { project: Project }) {
  const facts = [
    { label: 'Ubicación', value: project.location },
    { label: 'Obra integral', value: project.overallPeriod },
  ].filter(fact => fact.value.trim())
  const scope = project.roleVerified ? project.busteloScope?.trim() : undefined
  const details = [
    { label: 'Soluciones implementadas', value: project.busteloDetails?.solutions },
    { label: 'Materiales y sistemas', value: project.busteloDetails?.materials },
    { label: 'Características técnicas', value: project.busteloDetails?.technicalNotes },
  ].filter(detail => detail.value?.trim())
  const otherProjects = visibleProjects.filter(item => item.slug !== project.slug).slice(0, 2)

  return <>
    <article className="shell detail">
      <div className="detail-back">
        <a className="back-link" href="/#proyectos"><Arrow direction="left" /> Proyectos</a>
        {!readyForPublication(project) ? <p className="micro">Ficha en revisión</p> : null}
      </div>

      <header className="detail-header">
        <div>
          {project.category ? <p className="micro">{project.category}</p> : null}
          <h1>{project.name}</h1>
          {project.summary ? <p className="detail-intro">{project.summary}</p> : null}
        </div>
        {facts.length > 0 ? <dl className="facts">
          {facts.map(({ label, value }) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}
        </dl> : null}
      </header>

      <Gallery cover={project.cover} photos={project.gallery}>
        <div className="detail-story">
          <section className="detail-text" aria-labelledby="project-overview-title">
            <h2 id="project-overview-title">La obra</h2>
            <div>
              <p>{project.description}</p>
              {project.source ? <a className="text-link" href={project.source}>Fuente de la obra integral <Arrow direction="up" /></a> : null}
            </div>
          </section>

          <section className="detail-text" aria-labelledby="project-scope-title">
            <h2 id="project-scope-title">Participación de Bustelo</h2>
            {scope ? <div>
              <p>{scope}</p>
              {details.length > 0 ? <dl className="detail-technical">
                {details.map(({ label, value }) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}
              </dl> : null}
            </div> : <p className="editor-note">El alcance de los trabajos de Bustelo Herrería está pendiente de validación documental.</p>}
          </section>
        </div>
      </Gallery>

      {otherProjects.length > 0 ? <section className="detail-related" aria-labelledby="related-projects-title">
        <h2 id="related-projects-title">Otros proyectos</h2>
        <ul>{otherProjects.map(item => <li key={item.slug}>
          <a href={'/proyectos/' + item.slug}>{item.name} <Arrow /></a>
        </li>)}</ul>
      </section> : null}
    </article>
    <section id="contacto" tabIndex={-1} aria-labelledby="project-contact-title" className="detail-contact">
      <div className="shell">
        <div>
          <h2 id="project-contact-title">¿Tenés un proyecto de estas características?</h2>
          <p>Contanos qué necesitás para tu obra y en qué etapa está el proyecto.</p>
        </div>
        <a className="button" href="/#contacto">Contactar a Bustelo <Arrow direction="up" /></a>
      </div>
    </section>
  </>
}
