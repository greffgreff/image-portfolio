import './style.css'
import { useEffect } from 'react'

interface Point {
  x: number
  y: number
}

interface Line {
  lineaFrunction: LinearFunction
  pos1: Point
  pos2: Point
}

interface LinearFunction {
  slope: number
  intercept: number
  fx: (x: number) => Point
}

export default () => {
  useEffect(() => {
    const container = window.document.getElementById('exhibit-container') as HTMLDivElement
    const boundary = container.getBoundingClientRect()

    const createFunction = (): LinearFunction => {
      const slope = (Math.random() < 0.5 ? -1 : 1) * Math.random()

      const lowerY = boundary.height * 0.2
      const upperY = boundary.height * 0.8
      const intercept = getBetween(lowerY, upperY)

      const fx = (x: number) => {
        let y = slope * x + intercept
        if (y < 0) {
          y = 0
          x = -intercept / slope
        }
        if (y > boundary.height) {
          y = boundary.height
          x = (boundary.height - intercept) / slope
        }
        return { x, y }
      }
      
      return { slope, intercept, fx }
    }

    const lines: Line[] = []

    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
    svg.setAttribute('width', boundary.width.toString())
    svg.setAttribute('height', boundary.height.toString())

    let iteration = 0
    while (lines.length < 4) {
      if (iteration >= 12) {
        break
      }
      iteration += 1

      const linearFunction = createFunction()
      const pos1 = linearFunction.fx(0)
      const pos2 = linearFunction.fx(boundary.width)

      const hasSimilarSlope = lines.some(line =>
        isWithin(line.lineaFrunction.intercept, linearFunction.intercept, 0.2)
      )
      const hasSimilarIntercept = lines.some(line =>
        isWithin(line.lineaFrunction.slope, linearFunction.slope, 0.1)
      )

      if (!hasSimilarSlope && !hasSimilarIntercept) {
        console.log('pushing new line')
        lines.push({ pos1, pos2, lineaFrunction: linearFunction })

        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line')
        line.setAttribute('x1', pos1.x.toString())
        line.setAttribute('y1', pos1.y.toString())
        line.setAttribute('x2', pos2.x.toString())
        line.setAttribute('y2', pos2.y.toString())
        line.setAttribute('stroke', randomRgb())
        line.setAttribute('stroke-width', '2')
        svg.appendChild(line)
      }
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

function isWithin(toCheck: number, reference: number, tolerance: number) {
  const lowerBound = reference * (1 - tolerance)
  const upperBound = reference * (1 + tolerance)
  return toCheck >= lowerBound && toCheck <= upperBound
}

function getBetween(min: number, max: number) {
  return min + Math.random() * (max - min)
}
