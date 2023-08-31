import './style.css'
import { useEffect, useRef, useState } from 'react'
import { fetchRandomImages } from '../../api/images'
import { getImageInfo, Image } from '../../helpers/images'
import { Link } from 'react-router-dom'
import { v4 as uuid } from 'uuid'
import Sidebar from '../../components/Sidebar'

export default () => {
  const [images, setImages] = useState<Image[]>([])
  const [columnCount, setColumnCount] = useState(3)
  const [smoothScrolling, setSmoothScrolling] = useState(false)

  const [previousScrollHeight, setPreviousScrollHeight] = useState<number>()
  const [previousColumnCount, setPreviousColumnCount] = useState<number>()

  const [toFocus, setToFocus] = useState<HTMLElement | null>(null)
  const [isBottom, setIsBottom] = useState(false)

  const bottom = useRef(null)

  useEffect(() => {
    loadImages()
  }, [])

  useEffect(() => {
    console.log('firing')
    if (isBottom) {
      loadImages()
    }
  }, [isBottom])

  const loadImages = async () => {
    fetchRandomImages().then(async urls => {
      const newImages = await Promise.all(urls.map(async url => await getImageInfo(url)))
      setImages([...images, ...newImages])
    })
  }

  useEffect(() => {
    if (toFocus) {
      const element = window.document.getElementById(toFocus.id)
      const heightToScroll = window.scrollY + element?.getBoundingClientRect().top! - 14
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
      <Sidebar title='My Collection'>
        <div>An album of random images of nature.</div>
        <div>{images.length} images</div>
        <div style={{ display: 'flex', gap: 5 }}>
          <div>{columnCount} columns</div>
          <input
            type='range'
            min='1'
            max='10'
            value={columnCount}
            onChange={e => setColumnCount(parseInt(e.target.value))}
          />
        </div>
        <div style={{ display: 'flex', gap: 5 }}>
          <div>Smooth scrolling</div>
          <input
            type='button'
            value={!smoothScrolling ? 'Enable' : 'Disable'}
            onClick={() => setSmoothScrolling(!smoothScrolling)}
          />
        </div>
        <Link to='/collections'>Back to collections</Link>
      </Sidebar>

      <div className='columns' ref={bottom}>
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
