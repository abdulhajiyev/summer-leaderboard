import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'

export const metadata = {
  title: 'Onboarding - Summer Leaderboard',
  description: 'Complete your profile to get started with Summer Leaderboard',
}

export default async function OnboardingLayout({ children }: { children: React.ReactNode }) {
  if ((await auth()).sessionClaims?.metadata.onboardingComplete === true) {
    redirect('/')
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 p-4">
      {children}
    </div>
  )
}