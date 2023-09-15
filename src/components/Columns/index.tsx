import './style.css'
import { Image } from '../../helpers/images'
import { useRef } from 'react'
import { Link } from 'react-router-dom'

interface ColumnProps {
  images: Image[]
  count?: number
  onScroll?: (event: React.UIEvent<HTMLDivElement, UIEvent>) => void
}

export default ({ images, count = 3, onScroll }: ColumnProps) => {
  const bottom = useRef<HTMLDivElement | null>(null)

  const columns: Image[][] = Array.from({ length: count }, () => [])

  images.forEach(image => {
    const columnHeights = columns.map(column =>
      column.reduce((accumulator, img) => accumulator + img.height, 0)
    )
    const shortestColumnIndex = columnHeights.indexOf(Math.min(...columnHeights))
    columns[shortestColumnIndex].push(image)
  })

  return (
    <div className='collection-columns' onScroll={onScroll!}>
      {columns.map((column, j) => (
        <div key={j} className='collection-column'>
          {column.map((image, i) => (
            <div
              key={image.id}
              className={
                'collection-image-container' + (Math.random() < 0 ? ' video' : '')
              }
              id={image.id}
            >
              <Link to={'/content/My Image?url=' + image.url}>
                <img src={image.url} />
              </Link>
            </div>
          ))}
        </div>
      ))}

      <div ref={bottom} style={{ display: 'none' }} />
    </div>
  )
}
