import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          )
          supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  // IMPORTANT: Avoid writing any logic between createServerClient and
  // supabase.auth.getUser(). A simple mistake could make it very hard to debug
  // issues with users being randomly logged out.

  const {
    data: { user },
  } = await supabase.auth.getUser()

  // Protected admin routes
  const isAdminRoute =
    request.nextUrl.pathname.startsWith('/dashboard') ||
    request.nextUrl.pathname.startsWith('/campaigns') ||
    request.nextUrl.pathname.startsWith('/payouts') ||
    request.nextUrl.pathname.startsWith('/settings')

  // Auth routes (login, signup)
  const isAuthRoute =
    request.nextUrl.pathname.startsWith('/login') ||
    request.nextUrl.pathname.startsWith('/signup') ||
    request.nextUrl.pathname.startsWith('/forgot-password')

  // Respondent routes (public)
  const isRespondentRoute = request.nextUrl.pathname.startsWith('/s/')

  if (isAdminRoute && !user) {
    // Redirect unauthenticated users to login
    const url = request.nextUrl.clone()
    url.pathname = '/login'
    url.searchParams.set('redirect', request.nextUrl.pathname)
    return NextResponse.redirect(url)
  }

  if (isAuthRoute && user) {
    // Redirect authenticated users to dashboard
    const url = request.nextUrl.clone()
    const redirect = url.searchParams.get('redirect') || '/dashboard'
    url.pathname = redirect
    url.searchParams.delete('redirect')
    return NextResponse.redirect(url)
  }

  // For respondent routes, set session_id in request context if available
  if (isRespondentRoute) {
    const campaignId = request.nextUrl.pathname.split('/')[2]
    const sessionCookie = request.cookies.get(`respondent_${campaignId}`)
    if (sessionCookie) {
      // Set the session ID for RLS policies
      supabaseResponse.headers.set('x-respondent-session', sessionCookie.value)
    }
  }

  return supabaseResponse
}
