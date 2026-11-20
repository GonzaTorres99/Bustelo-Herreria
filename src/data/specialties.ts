import stairs from '../assets/escalera.webp'
import gate from '../assets/porton.webp'
import workshop from '../assets/taller.webp'

export const specialties = [
  {
    image: workshop, alt: 'Detalle ilustrativo de perfiles de acero en un banco de taller.',
    items: [
      { name: 'Estructuras metálicas', description: 'Estructuras para techos, naves y cubiertas.' },
      { name: 'Herrería de obra', description: 'Piezas a medida para integrar al proyecto constructivo.' },
    ],
  },
  {
    image: stairs, alt: 'Estudio visual de una escalera de acero con baranda.',
    items: [
      { name: 'Escaleras', description: 'Escaleras metálicas para circulaciones interiores y exteriores.' },
      { name: 'Barandas y balcones', description: 'Pasamanos y protecciones para desniveles y terrazas.' },
    ],
  },
  {
    image: gate, alt: 'Estudio visual de un portón de perfiles metálicos verticales.',
    items: [
      { name: 'Portones y accesos', description: 'Portones y puertas metálicas para el ingreso a obra y edificios.' },
      { name: 'Rejas y cerramientos', description: 'Cierres perimetrales y protecciones para aberturas.' },
    ],
  },
]
