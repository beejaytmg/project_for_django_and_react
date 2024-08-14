'use client'

import { useState } from 'react'
import { useAuth } from '../hooks/useAuth'  // Make sure this path is correct
import { useRouter } from 'next/navigation'

export default function Register() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const { register } = useAuth()
  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const success = await register(username, password)
      if (success) {
        alert('Registration successful')
        router.push('/login')  // Redirect to login page after successful registration
      } else {
        alert('Registration failed')
      }
    } catch (error) {
      console.error('Error:', error)
      alert('An error occurred during registration')
    }
  }
  return (
    <>
      <h1 className="text-3xl font-bold mb-6">Register</h1>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto">
        <div className="mb-4">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button 
          type="submit"
          className="w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
        >
          Register
        </button>
      </form>
    </>
  )
}