import { getAccessToken } from '@/lib/spotify'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const token = await getAccessToken()
    return NextResponse.json({ token })
  } catch (error) {
    console.error('Error getting spotify token:', error)
    return NextResponse.json({ error: 'Failed to get token' }, { status: 500 })
  }
}
