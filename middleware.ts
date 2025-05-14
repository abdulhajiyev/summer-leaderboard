import { clerkMiddleware } from '@clerk/nextjs/server'
import { type NextRequest, NextResponse } from 'next/server'

// We now use folder-based route protection
// The middleware now only handles the onboarding redirection for authenticated users

export default clerkMiddleware(async (auth, req: NextRequest) => {
  const { userId, sessionClaims } = await auth()
  
  const isOnboardingRoute = req.nextUrl.pathname === '/onboarding'
  
  // If user is signed in but hasn't completed onboarding, and is not already on the onboarding page
  if (userId && !sessionClaims?.metadata?.onboardingComplete && !isOnboardingRoute) {
    return NextResponse.redirect(new URL('/onboarding', req.url))
  }
  
  // All other routing is handled by the folder-based layouts
  return NextResponse.next()
})

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|signin|signup|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}