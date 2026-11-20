import { useRef, useState, type ReactNode } from 'react'
import type { ProjectPhoto } from '../data/projects'
import { Arrow } from './Layout'

interface GalleryProps {
  cover: ProjectPhoto
  photos: readonly ProjectPhoto[]
  children: ReactNode
}

export function Gallery({ cover, photos, children }: GalleryProps) {
  const dialog = useRef<HTMLDialogElement>(null)
  const trigger = useRef<HTMLButtonElement>(null)
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const images = [cover, ...photos.filter(photo => photo.src !== cover.src)]
  const photo = activeIndex === null ? undefined : images[activeIndex]
  const canNavigate = images.length > 1

  function openImage(index: number, button: HTMLButtonElement) {
    trigger.current = button
    setActiveIndex(index)
    dialog.current?.showModal()
  }

  function move(step: number) {
    setActiveIndex(index => index === null ? null : (index + step + images.length) % images.length)
  }

  return <>
    <figure className="detail-cover">
      <img src={cover.src} alt={cover.alt} width={cover.width} height={cover.height} fetchPriority="high"
        style={{ objectPosition: cover.focalPoint }} />
      <figcaption>
        {cover.caption ? <p>{cover.caption}</p> : null}
        <button type="button" className="detail-photo-trigger" aria-haspopup="dialog"
          onClick={event => openImage(0, event.currentTarget)}>Ampliar imagen <Arrow direction="up" /></button>
      </figcaption>
    </figure>

    {children}

    {canNavigate ? <section className="detail-gallery" aria-labelledby="project-gallery-title">
      <h2 id="project-gallery-title">Galería fotográfica</h2>
      <div className="detail-gallery-grid">{images.slice(1).map((item, index) => <figure key={item.src}>
        <button type="button" className="detail-gallery-thumb" aria-haspopup="dialog" aria-label={'Ampliar imagen. ' + item.alt}
          onClick={event => openImage(index + 1, event.currentTarget)}>
          <img src={item.src} alt={item.alt} width={item.width} height={item.height} loading="lazy"
            style={{ objectPosition: item.focalPoint }} />
          <span aria-hidden="true"><Arrow direction="up" /></span>
        </button>
        {item.caption ? <figcaption>{item.caption}</figcaption> : null}
      </figure>)}</div>
    </section> : null}

    <dialog className="project-viewer" ref={dialog} aria-label="Visor de fotografías"
      onClick={event => { if (event.target === event.currentTarget) event.currentTarget.close() }}
      onClose={() => { setActiveIndex(null); trigger.current?.focus() }}
      onKeyDown={event => {
        if (!canNavigate || (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft')) return
        event.preventDefault()
        move(event.key === 'ArrowRight' ? 1 : -1)
      }}>
      <div className="project-viewer-panel">
        <div className="project-viewer-toolbar">
          <p role="status" className="micro">
            {photo && canNavigate && activeIndex !== null ? `${activeIndex + 1} / ${images.length}` : ''}
            {photo ? <span className="sr-only"> {photo.alt}</span> : null}
          </p>
          <button type="button" className="detail-photo-trigger" autoFocus
            onClick={() => dialog.current?.close()}>Cerrar <span aria-hidden="true">×</span></button>
        </div>
        {photo ? <figure>
          <div className="project-viewer-image">
            <img src={photo.src} alt={photo.alt} width={photo.width} height={photo.height} />
          </div>
          {photo.caption ? <figcaption>{photo.caption}</figcaption> : null}
        </figure> : null}
        {canNavigate ? <div className="project-viewer-controls">
          <button type="button" className="detail-photo-trigger" onClick={() => move(-1)}><Arrow direction="left" /> Anterior</button>
          <button type="button" className="detail-photo-trigger" onClick={() => move(1)}>Siguiente <Arrow /></button>
        </div> : null}
      </div>
    </dialog>
  </>
}
