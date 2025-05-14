// app/onboarding/_actions.ts
'use server'

import { auth, clerkClient } from '@clerk/nextjs/server'
import { z } from 'zod'
import { supabaseAdmin } from '@/lib/supabaseAdmin'
import { Buffer } from 'node:buffer'

const OnboardSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  companyName: z.string(),
  agent: z.string(),
})

export const completeOnboarding = async (formData: FormData) => {
  const { userId } = await auth()
  if (!userId) return { error: 'Not signed in' }

  // parse & validate
  const payload = OnboardSchema.safeParse(Object.fromEntries(formData))
  if (!payload.success) {
    return { error: 'Invalid data' }
  }

  const client = await clerkClient()

  try {
    const res = await client.users.updateUser(userId, {
      publicMetadata: {
        onboardingComplete: true,
        firstName: payload.data.firstName,
        lastName: payload.data.lastName,
        companyName: payload.data.companyName,
        agent: payload.data.agent,
      },
      firstName: payload.data.firstName,
      lastName: payload.data.lastName,
    })

    // handle profile image upload
    const imageFile = formData.get('image')
    let publicUrl: string | undefined
    if (imageFile instanceof File) {
      const arrayBuffer = await imageFile.arrayBuffer()
      const filePath = `${userId}/${imageFile.name}`
      const { error: storageError } = await supabaseAdmin
        .storage.from('avatars')
        .upload(filePath, Buffer.from(arrayBuffer), { contentType: imageFile.type, upsert: true })
      if (storageError) {
        console.error('Storage upload error:', storageError)
      } else {
        publicUrl = supabaseAdmin.storage.from('avatars').getPublicUrl(filePath).data.publicUrl
        // update Clerk profile image
        await client.users.updateUserProfileImage(userId, { file: imageFile })
      }
    }

    // Save onboarding data to Supabase
    const { error: dbError } = await supabaseAdmin
      .from('profiles')
      .upsert({
        user_id: userId,
        first_name: payload.data.firstName,
        last_name: payload.data.lastName,
        company_name: payload.data.companyName,
        agent: payload.data.agent,
        avatar_url: publicUrl,
      }, { onConflict: 'user_id' })
    if (dbError) console.error('Supabase upsert error:', dbError)

    return { message: res.publicMetadata }
  } catch {
    return { error: 'Could not update metadata' }
  }
}
