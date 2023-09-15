import './style.css'
import { useEffect } from 'react'

export default () => {
  useEffect(() => {
    const container = window.document.getElementById('exhibit-container') as HTMLDivElement
    const boundary = container.getBoundingClientRect()

    const between = (min: number, max: number) => min + Math.random() * (max - min)

    const newFx = () => {
      const a = (Math.random() < 0.5 ? -1 : 1) * Math.random()
      const lowerY = boundary.height * 0.1
      const upperY = boundary.height * 0.9
      const b = between(lowerY, upperY)
      const fx = (x: number) => {
        let y = a * x + b
        if (y < 0) {
          y = 0
          x = -b / a
        }
        if (y > boundary.height) {
          y = boundary.height
          x = (boundary.height - b) / a
        }
        return { x, y }
      }
      return { slope: a, intercept: b, fx }
    }

    console.log(boundary.width, boundary.height)

    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
    svg.setAttribute('width', boundary.width.toString())
    svg.setAttribute('height', boundary.height.toString())

    for (let i = 0; i < 10; i++) {
      const { fx } = newFx()
      const pos1 = fx(0)
      const pos2 = fx(boundary.width)

      const line = document.createElementNS('http://www.w3.org/2000/svg', 'line')
      line.setAttribute('x1', pos1.x.toString())
      line.setAttribute('y1', pos1.y.toString())
      line.setAttribute('x2', pos2.x.toString())
      line.setAttribute('y2', pos2.y.toString())
      line.setAttribute('stroke', randomRgb())
      line.setAttribute('stroke-width', '2')

      svg.appendChild(line)
    }

    container.appendChild(svg)
  }, [])

  return <div id='exhibit-container' className='exhibit-container'></div>
}

function randomRgb() {
  const red = Math.floor(Math.random() * 256)
  const green = Math.floor(Math.random() * 256)
  const blue = Math.floor(Math.random() * 256)
  return `rgb(${red}, ${green}, ${blue})`
}
