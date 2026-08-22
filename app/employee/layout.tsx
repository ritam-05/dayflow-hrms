import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { DashboardLayout, NavItem } from '@/components/layout/dashboard-layout'

const employeeNavItems: NavItem[] = [
  { title: 'Dashboard', href: '/employee/dashboard', iconName: 'Dashboard' },
  { title: 'My Profile', href: '/employee/profile', iconName: 'User' },
  { title: 'Attendance', href: '/employee/attendance', iconName: 'Attendance' },
  { title: 'Leave', href: '/employee/leave', iconName: 'Leave' },
  { title: 'Payroll', href: '/employee/payroll', iconName: 'Payroll' },
]

export default async function EmployeeLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) redirect('/login')

  const { data: profile } = await supabase
    .from('profiles')
    .select('full_name, email, role')
    .eq('id', user.id)
    .single()

  return (
    <DashboardLayout 
      navItems={employeeNavItems} 
      userName={profile?.full_name || 'Employee User'} 
      userEmail={profile?.email || user.email || ''}
      role={profile?.role || 'Employee'}
    >
      {children}
    </DashboardLayout>
  )
}