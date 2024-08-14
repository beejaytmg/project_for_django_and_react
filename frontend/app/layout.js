'use client'

import './globals.css'
import Link from 'next/link'
import { useAuth } from './hooks/useAuth'
import { useState, useEffect } from 'react'

export default function RootLayout({ children }) {
  const { accessToken, logout } = useAuth()
  const [username, setUsername] = useState('')

  useEffect(() => {
    if (accessToken) {
      fetchUsername()
    }
  }, [accessToken])

  const fetchUsername = async () => {
    try {
      console.log('Fetching username with token:', accessToken)
      const response = await fetch('/api/auth/user', {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      })
      const data = await response.json()
      console.log('Response from /api/auth/user:', data)
      if (response.ok && data.username) {
        setUsername(data.username)
      } else {
        console.error('Failed to fetch username:', data.error || 'Unknown error')
      }
    } catch (error) {
      console.error('Error fetching username:', error)
    }
  }
  const handleLogout = () => {
    logout()
    setUsername('')
  }

  console.log('Current username:', username) // Add this

  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        <nav className="bg-gray-800 text-white p-4">
          <div className="container mx-auto flex justify-between items-center">
            <Link href="/" className="text-xl font-bold">ProjectPro</Link>
            <div className="space-x-4">
              <Link href="/" className="hover:text-gray-300">Home</Link>
              {accessToken ? (
                <>
                  <span className="mr-4">Welcome, {username || 'User'}!</span>
                  <button onClick={handleLogout} className="hover:text-gray-300">Logout</button>
                </>
              ) : (
                <>
                  <Link href="/login" className="hover:text-gray-300">Login</Link>
                  <Link href="/register" className="hover:text-gray-300">Register</Link>
                </>
              )}
            </div>
          </div>
        </nav>

        <main className="flex-grow container mx-auto px-4 py-8">
          {children}
        </main>

        <footer className="bg-gray-800 text-white p-4">
          <div className="container mx-auto text-center">
            <p>© 2024 ProjectPro</p>
          </div>
        </footer>
      </body>
    </html>
  )
}