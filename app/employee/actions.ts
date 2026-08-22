'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function checkIn() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'Unauthorized' }

  const today = new Date().toISOString().split('T')[0]

  const { error } = await supabase.from('attendance').insert({
    employee_id: user.id,
    date: today,
    check_in: new Date().toISOString(),
    status: 'Present'
  })

  if (error) return { error: error.message }
  revalidatePath('/employee/attendance')
  revalidatePath('/employee/dashboard')
}

export async function checkOut() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'Unauthorized' }

  const today = new Date().toISOString().split('T')[0]

  const { error } = await supabase.from('attendance')
    .update({ check_out: new Date().toISOString() })
    .eq('employee_id', user.id)
    .eq('date', today)

  if (error) return { error: error.message }
  revalidatePath('/employee/attendance')
  revalidatePath('/employee/dashboard')
}

export async function submitLeaveRequest(formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'Unauthorized' }

  const { error } = await supabase.from('leave_requests').insert({
    employee_id: user.id,
    leave_type: formData.get('leave_type'),
    start_date: formData.get('start_date'),
    end_date: formData.get('end_date'),
    reason: formData.get('reason'),
  })

  if (error) return { error: error.message }
  revalidatePath('/employee/leave')
}