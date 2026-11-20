import { readyForPublication, type Project } from '../data/projects'
import { Arrow } from './Layout'

export function ProjectCard({ project }: { project: Project }) {
  const url = '/proyectos/' + project.slug
  return <article className="project-card">
    <a href={url} className="project-photo" aria-label={'Ver ficha de ' + project.name}>
      <img src={project.cover.src} alt={project.cover.alt} width={project.cover.width} height={project.cover.height} loading="lazy" />
    </a>
    <div className="project-copy">
      <p className="micro">{project.category}</p>
      <h3><a href={url}>{project.name}</a></h3>
      <p>{project.title}. {project.summary}</p>
      <dl className="facts">
        <div><dt>Ubicación</dt><dd>{project.location}</dd></div>
        <div><dt>Obra integral</dt><dd>{project.overallPeriod}</dd></div>
      </dl>
      {!readyForPublication(project) && <p className="editor-note">Ficha en preparación. Participación de Bustelo pendiente de validación.</p>}
      <a className="text-link" href={url}>Ver ficha de obra <Arrow /></a>
    </div>
  </article>
}
