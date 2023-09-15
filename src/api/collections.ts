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
      name: 'mountains',
      imageCount: 12414,
      thumbnail: (await fetchRandomImages('mountains'))[0],
      createdAt: new Date()
    }
  ]
}
