import type { Project } from '../data/projects'
import { readyForPublication } from '../data/projects'
import { Gallery } from '../components/Gallery'
import { Arrow, Contact } from '../components/Layout'

export default function ProjectDetail({ project }: { project: Project }) {
  return <>
    <article className="shell detail">
      <a className="back-link" href="/#proyectos"><Arrow direction="left" /> Proyectos</a>
      <header className="detail-header"><div><p className="micro">{project.title}</p><h1>{project.name}<span className="accent">.</span></h1></div>
        <dl className="facts"><div><dt>Ubicación</dt><dd>{project.location}</dd></div><div><dt>Tipo de obra</dt><dd>{project.category}</dd></div>
          <div><dt>Obra integral</dt><dd>{project.overallPeriod}</dd></div></dl>
      </header>
      {!readyForPublication(project) && <p className="editor-note">Ficha interna en preparación. El alcance de la participación de Bustelo está pendiente de confirmación.</p>}
      <figure className="detail-cover"><img src={project.cover.src} alt={project.cover.alt} width={project.cover.width} height={project.cover.height} fetchPriority="high" /><figcaption>{project.cover.caption}</figcaption></figure>
      <div className="detail-text"><h2>La obra</h2><div><p>{project.description}</p><a className="text-link" href={project.source}>Fuente de la obra integral <Arrow direction="up" /></a></div></div>
      <div className="detail-text"><h2>Participación de Bustelo</h2><p>{project.roleVerified && project.busteloScope ? project.busteloScope : 'Las tareas específicas, el vínculo contractual y las fechas de intervención se incorporarán cuando el cliente apruebe la documentación.'}</p></div>
      <Gallery photos={project.gallery} />
    </article>
    <Contact />
  </>
}
