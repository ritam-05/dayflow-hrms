'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function updateLeaveStatus(leaveId: string, status: 'Approved' | 'Rejected') {
  const supabase = await createClient()
  
  // Verify admin authorization
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'Unauthorized' }

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single()

  if (profile?.role !== 'HR') {
    return { error: 'Access denied. HR privileges required.' }
  }

  const { error } = await supabase
    .from('leave_requests')
    .update({ 
      status, 
      reviewed_by: user.id,
      reviewed_at: new Date().toISOString()
    })
    .eq('id', leaveId)

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/admin/leave')
  revalidatePath('/admin/dashboard')
}