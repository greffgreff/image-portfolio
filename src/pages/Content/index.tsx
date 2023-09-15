import './style.css'
import { Link, useLocation, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Image, getImageInfo } from '../../helpers/images'
import Sidebar from '../../components/Sidebar'

export default () => {
  const { id } = useParams()
  const [image, setImage] = useState<Image>()
  const [zoomLevel, setZoomlevel] = useState<number>(25)

  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const origin = queryParams.get('origin')
  const url = queryParams.get('url')

  useEffect(() => {
    getImageInfo(url!).then(setImage)
  }, [])

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (image) {
      const div = event.target as HTMLDivElement
      const boundry = div.getBoundingClientRect()
      const magnification = window.document.getElementById('mouse-follower')!

      // Mouse movements base on rect boundries
      const relativeX = event.clientX - boundry.left
      const relativeY = event.clientY - boundry.top

      // Offsets movements to origin of boundry
      const originXOffset = relativeX - boundry.width / 2
      const originYOffset = relativeY - boundry.height / 2
      
      const scale = 2
      
      const scaleX = boundry.height / image.height
      const scaleY = boundry.width / image.width

      console.log(scaleX)

      const scaleXAdjusted = map(
        originXOffset,
        0,
        boundry.width * 10,
        0,
        image.width
      )
      const scaleYAdjusted = map(
        originYOffset,
        0,
        boundry.height,
        0,
        image.height * scaleX
      )

      console.log(-scaleXAdjusted, relativeX)

      magnification.style.transform = `translate(${-0}px, ${-scaleYAdjusted}px) scale(${scale})`
    }
  }

  const handleWheel = (event: React.WheelEvent<HTMLDivElement>) => {
    if (event.deltaY > 0) {
      setZoomlevel(zoomLevel + 1)
    } else if (zoomLevel > 15) {
      setZoomlevel(zoomLevel - 1)
    }
  }

  const landscape = image?.width! < image?.height!

  const adjustments = {
    width: landscape ? '100%' : 'fit-content',
    height: landscape ? 'fit-content' : '100%'
  }

  return (
    <div className='content-container'>
      <Sidebar title={id}>
        {image ? (
          <div>
            {image?.width} x {image?.height} • {Math.floor(image?.size! * 100) / 100} MB
          </div>
        ) : (
          <div>Loading...</div>
        )}
        <br />
        {origin && <Link to={'/collections/' + origin}>Back to collection</Link>}
      </Sidebar>

      <div
        className='content-image-container'
        onWheel={handleWheel}
        onMouseMove={handleMouseMove}
      >
        <img id='mouse-follower' className='mouse-follower' src={image?.url} />
        <img className='image' style={adjustments} src={image?.url} />
        <img className='background' src={image?.url} />
      </div>
    </div>
  )
}

function map(
  value: number,
  fromMin: number,
  fromMax: number,
  toMin: number,
  toMax: number
) {
  const normalized = (value - fromMin) / (fromMax - fromMin)
  return normalized * (toMax - toMin) + toMin
}
