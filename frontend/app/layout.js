'use client'

import './globals.css'
import Link from 'next/link'
import { useAuth } from './hooks/useAuth'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function RootLayout({ children }) {
  const { accessToken, refreshAccessToken, logout } = useAuth()
  const [username, setUsername] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    if (accessToken) {
      fetchUsername()
    } else {
      setIsLoading(false)
    }
  }, [accessToken])

  const fetchUsername = async () => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/auth/user', {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      })
      const data = await response.json()
      if (response.ok && data.username) {
        setUsername(data.username)
      } else {
        if (data.error?.code === 'token_not_valid') {
          const refreshed = await refreshAccessToken()
          if (!refreshed) {
            router.push('/login')
          }
        } else {
          router.push('/login')
        }
      }
    } catch (error) {
      console.error('Error fetching username:', error)
      router.push('/login')
    } finally {
      setIsLoading(false)
    }
  }

  const handleLogout = () => {
    logout()
    setUsername('')
    router.push('/login')
  }

  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen bg-gray-100">
        <header className="bg-white shadow-md">
          <nav className="container mx-auto px-6 py-3">
            <div className="flex justify-between items-center">
              <Link href="/" className="text-2xl font-bold text-gray-800 hover:text-gray-700 transition-colors">
                ProjectPro
              </Link>
              <div className="space-x-4">
                <NavLink href="/">Home</NavLink>
                {isLoading ? (
                  <span className="text-gray-500">Loading...</span>
                ) : accessToken ? (
                  <>
                    <span className="text-gray-600">Welcome, {username || 'User'}!</span>
                    <NavLink href="/dashboard">Dashboard</NavLink>
                    <button onClick={handleLogout} className="text-red-600 hover:text-red-800 transition-colors">
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <NavLink href="/login">Login</NavLink>
                    <NavLink href="/register">Register</NavLink>
                  </>
                )}
              </div>
            </div>
          </nav>
        </header>

        <main className="flex-grow container mx-auto px-6 py-8">
          {children}
        </main>

        <footer className="bg-gray-800 text-white">
          <div className="container mx-auto px-6 py-4">
            <div className="flex justify-between items-center">
              <p>© 2024 ProjectPro. All rights reserved.</p>
              <div className="space-x-4">
                <Link href="/privacy" className="hover:text-gray-300 transition-colors">Privacy Policy</Link>
                <Link href="/terms" className="hover:text-gray-300 transition-colors">Terms of Service</Link>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}

function NavLink({ href, children }) {
  return (
    <Link 
      href={href} 
      className="text-gray-700 hover:text-gray-900 hover:bg-gray-100 px-3 py-2 rounded-md transition-colors"
    >
      {children}
    </Link>
  )
}