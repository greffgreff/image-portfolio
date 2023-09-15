import { useEffect, useState } from 'react'
import './style.css'

interface Coordinates {
  x: number
  y: number
}

interface Shape {
  p1: Coordinates
  p2: Coordinates
  p3: Coordinates
  p4: Coordinates
}

export default () => {
  useEffect(() => {
    const container = window.document.getElementById('exhibit-container') as HTMLDivElement
    const boundry = container.getBoundingClientRect()
    const landscape = Math.random() > 0.5

    const margin = 0.2
    const lowerHeight = boundry.height * margin
    const upperHeight = boundry.height * (1 - margin)
    const lowerWidth = boundry.width * margin
    const upperWidth = boundry.width * (1 - margin)

    const getRandomHeight = () => getBetween(lowerHeight, upperHeight)
    const getRandomWidth = () => getBetween(lowerWidth, upperWidth)

    const separation = 20

    const joint1 = {
      x: landscape ? 0 : getRandomHeight(),
      y: landscape ? getRandomWidth() : 0
    }

    const joint2 = {
      x: landscape ? boundry.width : getRandomWidth(),
      y: landscape ? getRandomHeight() : boundry.height
    }

    const shape1: Shape = {
      p1: { x: 0, y: 0 },
      p2: {
        x: joint1.x - (landscape ? 0 : separation / 2),
        y: joint1.y - (landscape ? separation / 2 : 0)
      },
      p3: {
        x: joint2.x - (landscape ? 0 : separation / 2),
        y: joint2.y - (landscape ? separation / 2 : 0)
      },
      p4: { x: landscape ? boundry.width : 0, y: landscape ? 0 : boundry.height }
    }

    const shape2: Shape = {
      p1: { x: boundry.width, y: boundry.height },
      p2: {
        x: joint2.x + (landscape ? 0 : separation / 2),
        y: joint2.y + (landscape ? separation / 2 : 0)
      },
      p3: {
        x: joint1.x + (landscape ? 0 : separation / 2),
        y: joint1.y + (landscape ? separation / 2 : 0)
      },
      p4: { x: landscape ? 0 : boundry.width, y: landscape ? boundry.height : 0 }
    }

    const parsedShape1: Shape = {
      p1: { x: (shape1.p1.x / boundry.width) * 100, y: (shape1.p1.y / boundry.height) * 100 },
      p2: { x: (shape1.p2.x / boundry.width) * 100, y: (shape1.p2.y / boundry.height) * 100 },
      p3: { x: (shape1.p3.x / boundry.width) * 100, y: (shape1.p3.y / boundry.height) * 100 },
      p4: { x: (shape1.p4.x / boundry.width) * 100, y: (shape1.p4.y / boundry.height) * 100 }
    }

    const parsedShape2: Shape = {
      p1: { x: (shape2.p1.x / boundry.width) * 100, y: (shape2.p1.y / boundry.height) * 100 },
      p2: { x: (shape2.p2.x / boundry.width) * 100, y: (shape2.p2.y / boundry.height) * 100 },
      p3: { x: (shape2.p3.x / boundry.width) * 100, y: (shape2.p3.y / boundry.height) * 100 },
      p4: { x: (shape2.p4.x / boundry.width) * 100, y: (shape2.p4.y / boundry.height) * 100 }
    }

    drawShape(parsedShape1)
    drawShape(parsedShape2)
  }, [])

  return <div id='exhibit-container' className='exhibit-container'></div>
}

function getBetween(min: number, max: number) {
  const randomDecimal = Math.random()
  const randomNumber = min + randomDecimal * (max - min)
  return Math.floor(randomNumber)
}

function drawShape(shape: Shape) {
  const div = document.createElement('div')
  div.className = 'exhibit-box'
  const coordinates: string[] = Object.values(shape).map(p => `${p.x}% ${p.y}%`)
  div.style.clipPath = `polygon(${coordinates.join(',')})`
  const container = document.getElementById('exhibit-container') as HTMLDivElement
  container.appendChild(div)
}
