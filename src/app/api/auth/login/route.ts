import { NextResponse, NextRequest } from 'next/server';
import { cookies } from 'next/headers'
import config from "@/config/config";

export async function POST(request: NextRequest) {
  try {
    const cookieStore = await cookies()
    const {user_id, password } = await request.json()
    console.log('user_id:', user_id, 'password:', password)
    
    if (!user_id || !password) {
      return NextResponse.json({ ok: false, error: 'Missing user_id or password' }, { status: 400 })
    }
    
    const url = new URL(config.auth_url, config.base_url)
    url.searchParams.append('user_id', user_id)
    url.searchParams.append('password', password)

    const resp = await fetch(url.toString(), {
      method: 'GET',
    }).then((res) => res.json())

    if (!resp.token) {
      return NextResponse.json({ ok: false, error: 'Invalid credentials' }, { status: 401 })
    }
    cookieStore.set('token', resp.token)

    return NextResponse.json({
      ok: true,
      token: resp.token
    })
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json({ ok: false, error: 'Internal server error' }, { status: 500 })
  }
}
