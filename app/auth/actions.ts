'use server'

import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export async function signup(formData: FormData) {
  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const fullName = formData.get('full_name') as string
  const employeeId = formData.get('employee_id') as string
  const role = formData.get('role') as string
  const adminSecret = formData.get('admin_secret') as string

  // 1. Security Check for Admin
  if (role === 'HR') {
    if (adminSecret !== process.env.ADMIN_SECRET) {
      console.error("Invalid Admin Secret provided!")
      return { error: 'Invalid admin secret' }
    }
  }

  const supabase = await createClient()

  // 2. Register the user in Supabase Auth
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  })

  if (error) {
    console.error("Auth Error:", error.message)
    return { error: error.message }
  }

  // 3. Create their profile in the database
  if (data.user) {
    const { error: profileError } = await supabase
      .from('profiles')
      .insert([
        {
          id: data.user.id,
          employee_id: employeeId,
          full_name: fullName,
          email: email,
          role: role,
          employment_status: 'Active'
        }
      ])

    if (profileError) {
      console.error("Profile Insert Error:", profileError.message)
      return { error: profileError.message }
    }
  }

  // 4. Redirect them to the correct dashboard
  if (role === 'HR') {
    redirect('/admin/dashboard')
  } else {
    redirect('/employee/dashboard')
  }
}

export async function login(formData: FormData) {
  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const supabase = await createClient()

  const { error, data } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    return { error: error.message }
  }

  if (!data.user) {
    return { error: 'Authentication failed. Please try again.' }
  }

  // Fetch role to determine redirect
  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', data.user.id)
    .single()

  // Fallback if profile doesn't exist yet for some reason
  if (profileError || !profile) {
    redirect('/employee/dashboard')
  }

  if (profile.role === 'HR') {
    redirect('/admin/dashboard')
  } else {
    redirect('/employee/dashboard')
  }
}

export async function logout() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  redirect('/login')
}