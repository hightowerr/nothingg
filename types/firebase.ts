export interface UserProfile {
  uid: string
  email: string
  displayName: string | null
  photoURL: string | null
  username: string | null
  isEmailVerified: boolean
  createdAt: number
  updatedAt: number
}

export interface Subscription {
  uid: string
  plan: 'free' | 'pro'
  status: 'active' | 'canceled' | 'expired'
  startDate: number
  endDate: number
  features: string[]
  autoRenew: boolean
}

export interface Product {
  id: string
  name: string
  description: string
  type: 'free' | 'pro'
  price: number
  features: string[]
  isActive: boolean
}

export interface Username {
  uid: string
  username: string
  createdAt: number
}