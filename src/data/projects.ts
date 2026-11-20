export interface ProjectPhoto {
  src: string
  alt: string
  caption: string
  width: number
  height: number
  rightsConfirmed: boolean
}

export interface Project {
  slug: string
  name: string
  title: string
  category: string
  location: string
  overallPeriod: string
  summary: string
  description: string
  busteloScope: string | null
  roleVerified: boolean
  published: boolean
  cover: ProjectPhoto
  gallery: ProjectPhoto[]
  source: string
}

const stationPhoto: ProjectPhoto = {
  src: '/images/proyectos/estacion-la-plata/referencia-interior-01.jpg',
  alt: 'Interior de la Estación La Plata con la cubierta metálica sobre los andenes.',
  caption: 'Vista de la nave central. Referencia interna con autoría y permiso de publicación pendientes.',
  width: 887,
  height: 591,
  rightsConfirmed: false,
}

const stationDraft: Project = {
  slug: 'estacion-la-plata',
  name: 'Estación La Plata',
  title: 'Renovación de la cubierta',
  category: 'Infraestructura ferroviaria',
  location: 'La Plata, Buenos Aires',
  overallPeriod: '2021–2022',
  summary: 'Restauración de la cubierta histórica de la nave principal de la línea Roca.',
  description: 'La terminal platense, inaugurada en 1906, recuperó la cubierta de su nave principal en noviembre de 2022. La obra integral incluyó la reparación de la estructura metálica y la renovación de sectores de chapa y vidrio. Los trabajos se organizaron por etapas para mantener el servicio ferroviario.',
  busteloScope: null,
  roleVerified: false,
  published: false,
  cover: stationPhoto,
  gallery: [stationPhoto],
  source: 'https://www.argentina.gob.ar/noticias/por-primera-vez-en-mas-de-100-anos-se-renovaron-los-techos-de-la-estacion-la-plata-de-la',
}

// Incorporar aquí las fichas listas para comercialización, con sus fotos importadas de src/assets.
const editorialProjects: Project[] = []
const projects = import.meta.env.DEV ? [...editorialProjects, stationDraft] : editorialProjects

export function readyForPublication(project: Project) {
  return project.published && project.roleVerified && Boolean(project.busteloScope?.trim())
    && project.cover.rightsConfirmed && project.gallery.every(photo => photo.rightsConfirmed)
}

export const visibleProjects = projects.filter(project => import.meta.env.DEV || readyForPublication(project))
