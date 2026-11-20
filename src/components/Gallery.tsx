import { useRef, useState } from 'react'
import type { ProjectPhoto } from '../data/projects'
import { Arrow } from './Layout'

export function Gallery({ photos }: { photos: ProjectPhoto[] }) {
  const dialog = useRef<HTMLDialogElement>(null)
  const [index, setIndex] = useState(0)
  const photo = photos[index]
  if (!photo) return null
  return <section className="gallery"><h2>Galería fotográfica</h2>
    <div className="gallery-grid">{photos.map((item, number) => <figure key={item.src}>
      <button type="button" aria-label={'Ampliar imagen. ' + item.alt} onClick={() => { setIndex(number); dialog.current?.showModal() }}>
        <img src={item.src} alt={item.alt} width={item.width} height={item.height} loading="lazy" />
        <span>Ampliar imagen <Arrow direction="up" /></span>
      </button>
      <figcaption>{item.caption}</figcaption>
    </figure>)}</div>
    <dialog ref={dialog} aria-label="Fotografía ampliada" onClick={event => { if (event.target === dialog.current) dialog.current.close() }}>
      <div className="lightbox"><button type="button" className="close" onClick={() => dialog.current?.close()}>Cerrar ×</button>
        <img src={photo.src} alt={photo.alt} width={photo.width} height={photo.height} loading="lazy" /><p>{photo.caption}</p>
      </div>
    </dialog>
  </section>
}
