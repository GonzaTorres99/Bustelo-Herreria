import { useEffect } from 'react'
import { visibleProjects } from './data/projects'
import { Header, Footer, Arrow } from './components/Layout'
import Home from './pages/Home'
import ProjectDetail from './pages/ProjectDetail'

export default function App() {
  const path = window.location.pathname.replace(/\/+$/, '') || '/'
  const home = path === '/'
  const project = visibleProjects.find(item => path === '/proyectos/' + item.slug)
  useEffect(() => {
    document.title = home ? 'Bustelo Herrería | Herrería de obra en La Plata' : (project?.name ?? 'Página no disponible') + ' | Bustelo Herrería'
    if (project) document.querySelector('meta[name="description"]')?.setAttribute('content', project.summary)
    const hash = window.location.hash.slice(1)
    if (hash) document.getElementById(hash)?.scrollIntoView({ behavior: 'instant' })
  }, [home, project])
  return <div id="top">
    <a className="skip-link" href="#contenido">Saltar al contenido</a>
    <Header home={home} />
    <main id="contenido" tabIndex={-1}>
      {home ? <Home /> : project ? <ProjectDetail project={project} /> : <section className="shell missing">
        <h1>Página no disponible<span className="accent">.</span></h1><a className="button" href="/">Volver al inicio <Arrow /></a>
      </section>}
    </main>
    <Footer />
  </div>
}
