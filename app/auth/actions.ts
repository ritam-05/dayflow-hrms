'use server'

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

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

  // Fetch role to determine redirect
  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', data.user.id)
    .single()

  if (profile?.role === 'HR') {
    redirect('/admin/dashboard')
  } else {
    redirect('/employee/dashboard')
  }
}

export async function signup(formData: FormData) {
  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const fullName = formData.get('full_name') as string
  const employeeId = formData.get('employee_id') as string
  const role = formData.get('role') as string
  const adminSecret = formData.get('admin_secret') as string

  // Security Check: Enforce HR secret
  if (role === 'HR' && adminSecret !== process.env.ADMIN_SECRET) {
    return { error: 'Invalid Admin Secret Code.' }
  }

  const supabase = await createClient()

  // 1. Sign up the user in Supabase Auth
  const { data, error: authError } = await supabase.auth.signUp({
    email,
    password,
  })

  if (authError) {
    return { error: authError.message }
  }

  if (data.user) {
    // 2. Insert their profile data safely
    const { error: profileError } = await supabase.from('profiles').insert({
      id: data.user.id,
      employee_id: employeeId,
      full_name: fullName,
      email: email,
      role: role === 'HR' ? 'HR' : 'Employee',
    })

    if (profileError) {
      return { error: profileError.message }
    }
  }

  if (role === 'HR') {
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