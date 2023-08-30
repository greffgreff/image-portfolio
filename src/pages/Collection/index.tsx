import './style.css'
import { useEffect, useState } from 'react'
import { fetchRandomImages } from '../../api/images'
import { getImageInfo, Image } from '../../helpers/images'
import { Link } from 'react-router-dom'
import { v4 as uuid } from 'uuid'
import Controls from '../../components/Controls'

export default () => {
  const [images, setImages] = useState<Image[]>([])
  const [columnCount, setColumnCount] = useState(5)
  const [smoothScrolling, setSmoothScrolling] = useState(false)

  const [previousScrollHeight, setPreviousScrollHeight] = useState<number>()
  const [previousColumnCount, setPreviousColumnCount] = useState<number>()

  const [toFocus, setToFocus] = useState<HTMLElement | null>(null)

  useEffect(() => {
    fetchRandomImages().then(async urls => {
      setImages(await Promise.all(urls.map(async url => await getImageInfo(url))))
    })
  }, [])

  useEffect(() => {
    if (toFocus) {
      const element = window.document.getElementById(toFocus.id)
      const heightToScroll = window.scrollY + element?.getBoundingClientRect().top! - 15
      window.scrollTo({
        top: heightToScroll,
        behavior: smoothScrolling ? 'smooth' : 'instant'
      })
    } else if (columnCount && previousColumnCount) {
      window.scrollTo({
        top: previousScrollHeight!,
        behavior: smoothScrolling ? 'smooth' : 'instant'
      })
    }
  }, [toFocus])

  const columns: Image[][] = Array.from({ length: columnCount }, () => [])

  const handleImageClick = (event: React.MouseEvent<HTMLElement>) => {
    if (toFocus) {
      setToFocus(null)
      setColumnCount(previousColumnCount!)
    } else {
      setPreviousScrollHeight(window.scrollY)
      setPreviousColumnCount(columnCount)
      setToFocus(event.currentTarget)
      setColumnCount(1)
    }
  }

  images.forEach(image => {
    const columnHeights = columns.map(column =>
      column.reduce((accumulator, img) => accumulator + img.height, 0)
    )
    const shortestColumnIndex = columnHeights.indexOf(Math.min(...columnHeights))
    columns[shortestColumnIndex].push(image)
  })

  return (
    <main>
      <Controls title='My Collection'>
        <div>An album of random images of nature.</div>
        <div>{images.length} images</div>
        <span>
          <div>{columnCount} columns</div>
          <input
            type='range'
            min='1'
            max='10'
            value={columnCount}
            onChange={e => setColumnCount(parseInt(e.target.value))}
          />
        </span>
        <span>
          <div>Smooth scrolling</div>
          <input
            type='button'
            value={!smoothScrolling ? 'Enable' : 'Disable'}
            onClick={() => setSmoothScrolling(!smoothScrolling)}
          />
        </span>
        <Link to='/collections'>Back to collections</Link>
      </Controls>

      <div className='columns'>
        {columns.map(column => (
          <div key={uuid()} className='column'>
            {column.map(image => (
              <div
                key={image.id}
                className='image'
                id={image.id}
                onClick={handleImageClick}
              >
                <img src={image.url} />
              </div>
            ))}
          </div>
        ))}
      </div>
    </main>
  )
}
