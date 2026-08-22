import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { DashboardLayout } from '@/components/layout/dashboard-layout'
import { LayoutDashboard, User, Clock, CalendarOff, Banknote } from 'lucide-react'

const employeeNavItems = [
  { title: 'Dashboard', href: '/employee/dashboard', icon: LayoutDashboard },
  { title: 'My Profile', href: '/employee/profile', icon: User },
  { title: 'Attendance', href: '/employee/attendance', icon: Clock },
  { title: 'Leave', href: '/employee/leave', icon: CalendarOff },
  { title: 'Payroll', href: '/employee/payroll', icon: Banknote },
]

export default async function EmployeeLayout({ children }: { children: React.ReactNode }) {
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