export interface Slab {
  id: string
  species: string
  speciesLat?: string
  size: string
  length: number   // cm
  width: number    // cm
  thickness: number // cm
  weight?: number  // kg
  price: number    // RUB
  woodClass?: string
  inStock: boolean
  drying?: string
  humidity?: string
  location?: string
  year?: number
  description?: string
}

export interface Breed {
  id: string
  abbr: string
  name: string
  lat: string
  hardness: string
  color: string
  count: number
  desc: string
  woodClass: string
}

export interface Work {
  id: number
  title: string
  species: string
  size: string
  woodClass: string
  category: 'Столы' | 'Столешницы' | 'Барные' | 'Другое'
}

export interface ContactForm {
  name: string
  contact: string
  message?: string
  slabId?: string
}
