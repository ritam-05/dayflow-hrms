import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { DashboardLayout, NavItem } from '@/components/layout/dashboard-layout'

const adminNavItems: NavItem[] = [
  { title: 'Dashboard', href: '/admin/dashboard', iconName: 'Dashboard' },
  { title: 'Employees', href: '/admin/employees', iconName: 'Employees' },
  { title: 'Attendance', href: '/admin/attendance', iconName: 'Attendance' },
  { title: 'Leave Requests', href: '/admin/leave', iconName: 'Leave' },
  { title: 'Payroll', href: '/admin/payroll', iconName: 'Payroll' },
  { title: 'Reports', href: '/admin/reports', iconName: 'Reports' },
]

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) redirect('/login')

  const { data: profile } = await supabase
    .from('profiles')
    .select('full_name, email, role')
    .eq('id', user.id)
    .single()

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