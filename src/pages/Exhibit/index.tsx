import './style.css'
import { useEffect } from 'react'

interface Point {
  x: number
  y: number
}

interface Line {
  pos1: Point
  pos2: Point
  slope: number
  intercept: number
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
      const slope = getBetween(-1, 1)
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
        return { x: Math.ceil(x), y: Math.ceil(y) }
      }

      return { slope, intercept, fx }
    }

    const lines: Line[] = []

    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
    svg.setAttribute('width', boundary.width.toString())
    svg.setAttribute('height', boundary.height.toString())

    let iteration = 0
    while (lines.length < 4) {
      if (iteration >= 12) break
      iteration += 1

      const { fx, slope, intercept } = createFunction()
      const hasSimilarSlope = lines.some(line => isWithin(line.intercept, intercept, 0.2))
      const hasSimilarIntercept = lines.some(line => isWithin(line.slope, slope, 0.2))

      if (!hasSimilarSlope && !hasSimilarIntercept) {
        const pos1 = fx(0)
        const pos2 = fx(boundary.width)
        lines.push({ pos1, pos2, slope, intercept })

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

    const points: Point[] = []

    for (const line of lines) {
      points.push(line.pos1)
      points.push(line.pos2)

      for (const other of lines) {
        if (other !== line) {
          const midpointX = (other.intercept - line.intercept) / (line.slope - other.slope)
          const midpointY = other.slope * midpointX + other.intercept
          const midpoint = { x: Math.ceil(midpointX), y: Math.ceil(midpointY) }

          if (
            !points.some(p => p.x === midpoint.x && p.y === midpoint.y) &&
            midpointX > 0 &&
            midpointX < boundary.width &&
            midpointY > 0 &&
            midpointY < boundary.height
          ) {
            points.push(midpoint)
          }
        }
      }
    }

    console.log(points)

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
