import { v4 as uuid } from 'uuid'
import { fetchRandomImages } from './images'

export interface Collection {
  id: string
  name: string
  imageCount: number
  thumbnail: string
  createdAt: Date
  updatedAt?: Date
}

export async function fetchCollections(): Promise<Collection[]> {
  return [
    {
      id: uuid(),
      name: 'Mountains',
      imageCount: 123,
      thumbnail: (await fetchRandomImages('mountain', 1))[0],
      createdAt: new Date()
    },
    {
      id: uuid(),
      name: 'Trees',
      imageCount: 2432,
      thumbnail: (await fetchRandomImages('trees', 1))[0],
      createdAt: new Date()
    },
    {
      id: uuid(),
      name: 'Rivers',
      imageCount: 780,
      thumbnail: (await fetchRandomImages('rivers', 1))[0],
      createdAt: new Date()
    },
    {
      id: uuid(),
      name: 'Mountains',
      imageCount: 41,
      thumbnail: (await fetchRandomImages('mountain', 1))[0],
      createdAt: new Date()
    },
    {
      id: uuid(),
      name: 'Space',
      imageCount: 239,
      thumbnail: (await fetchRandomImages('space', 1))[0],
      createdAt: new Date()
    },
    {
      id: uuid(),
      name: 'Stars',
      imageCount: 2352,
      thumbnail: (await fetchRandomImages('stars', 1))[0],
      createdAt: new Date()
    },
    {
      id: uuid(),
      name: 'Galaxy',
      imageCount: 6877,
      thumbnail: (await fetchRandomImages('galaxy', 1))[0],
      createdAt: new Date()
    }
  ]
}
