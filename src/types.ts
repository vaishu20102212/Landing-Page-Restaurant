export type MenuCategory = 'Dinner' | 'Lunch' | 'Dessert' | 'Drink'
export type MenuType = 'Pasta' | 'Pizza' | 'Rice' | 'Salad' | 'Seafood' | 'Sandwich' | 'Dessert' | 'Coffee' | 'Cold drink'

export interface MenuItem {
  id: string
  name: string
  price: number
  rating: number
  image: string
  category: MenuCategory
  type: MenuType
  description: string
  featured?: boolean
}

export interface Chef {
  id: string
  name: string
  role: string
  image: string
  bg?: string
}

export interface Testimonial {
  id: string
  name: string
  role: string
  quote: string
  avatar: string
}

export interface CartItem {
  item: MenuItem
  qty: number
}
