import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { DashboardLayout } from '@/components/layout/dashboard-layout'
import { LayoutDashboard, Users, Clock, CalendarOff, Banknote, BarChart3 } from 'lucide-react'

const adminNavItems = [
  { title: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
  { title: 'Employees', href: '/admin/employees', icon: Users },
  { title: 'Attendance', href: '/admin/attendance', icon: Clock },
  { title: 'Leave Requests', href: '/admin/leave', icon: CalendarOff },
  { title: 'Payroll', href: '/admin/payroll', icon: Banknote },
  { title: 'Reports', href: '/admin/reports', icon: BarChart3 },
]

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    redirect('/login')
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('full_name, email, role')
    .eq('id', user.id)
    .single()

  // Double check authorization
  if (profile?.role !== 'HR') {
    redirect('/employee/dashboard')
  }

  return (
    <DashboardLayout 
      navItems={adminNavItems} 
      userName={profile?.full_name || 'HR Admin'} 
      userEmail={profile?.email || user.email || ''}
      role={profile?.role || 'HR'}
    >
      {children}
    </DashboardLayout>
  )
}