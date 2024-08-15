import { NextResponse } from 'next/server'

export async function GET(request) {
  const authHeader = request.headers.get('authorization')
  console.log('Auth header:', authHeader)

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const token = authHeader.split(' ')[1]
  console.log('Token:', token)

  try {
    const response = await fetch('http://127.0.0.1:8000/api/users/user-profile', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })

    console.log('Backend response status:', response.status)

    if (response.ok) {
      const data = await response.json()
      return NextResponse.json({ username: data.user.username })
    } else {
      const errorData = await response.json()
      console.error('Backend error:', errorData)
      return NextResponse.json({'error': errorData})
    }
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}