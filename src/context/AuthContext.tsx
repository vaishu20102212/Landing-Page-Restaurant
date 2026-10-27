import { createContext, useContext, useState, type ReactNode } from 'react'

type AuthContextType = {
  isLoggedIn: boolean
  login: (email: string) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

const STORAGE_KEY = 'delizioso_auth'

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
    return localStorage.getItem(STORAGE_KEY) === 'true'
  })

  const login = (_email: string) => {
    localStorage.setItem(STORAGE_KEY, 'true')
    setIsLoggedIn(true)
  }

  const logout = () => {
    localStorage.removeItem(STORAGE_KEY)
    setIsLoggedIn(false)
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
