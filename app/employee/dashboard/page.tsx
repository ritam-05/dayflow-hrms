import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { User, Clock, CalendarOff, LogOut, Bell } from 'lucide-react'
import { logout } from '@/app/auth/actions'

export default function EmployeeDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Welcome back</h2>
        <p className="text-zinc-400">Here is your overview for today.</p>
      </div>
      
      {/* 3.2.1 Quick Access Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Link href="/employee/profile">
          <Card className="bg-zinc-900/50 border-zinc-800 hover:border-violet-500/50 transition-colors cursor-pointer">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">My Profile</CardTitle>
              <User className="h-4 w-4 text-violet-400" />
            </CardHeader>
            <CardContent><p className="text-xs text-zinc-400">View personal details</p></CardContent>
          </Card>
        </Link>
        
        <Link href="/employee/attendance">
          <Card className="bg-zinc-900/50 border-zinc-800 hover:border-violet-500/50 transition-colors cursor-pointer">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Attendance</CardTitle>
              <Clock className="h-4 w-4 text-violet-400" />
            </CardHeader>
            <CardContent><p className="text-xs text-zinc-400">Log your daily hours</p></CardContent>
          </Card>
        </Link>

        <Link href="/employee/leave">
          <Card className="bg-zinc-900/50 border-zinc-800 hover:border-violet-500/50 transition-colors cursor-pointer">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Leave Requests</CardTitle>
              <CalendarOff className="h-4 w-4 text-violet-400" />
            </CardHeader>
            <CardContent><p className="text-xs text-zinc-400">Apply for time off</p></CardContent>
          </Card>
        </Link>

        <form action={logout}>
          <button type="submit" className="w-full text-left">
            <Card className="bg-zinc-900/50 border-zinc-800 hover:border-red-500/50 transition-colors cursor-pointer">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-red-400">Logout</CardTitle>
                <LogOut className="h-4 w-4 text-red-400" />
              </CardHeader>
              <CardContent><p className="text-xs text-zinc-400">Securely sign out</p></CardContent>
            </Card>
          </button>
        </form>
      </div>

      {/* 3.2.1 Recent Activity */}
      <Card className="bg-zinc-900/50 border-zinc-800">
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Bell className="w-4 h-4 text-violet-400"/> Recent Activity & Alerts</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between items-center border-b border-zinc-800 pb-2">
            <p className="text-sm">HR approved your leave request for next Friday.</p>
            <span className="text-xs text-zinc-500">2 hours ago</span>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-sm">Reminder: Submit your quarterly review documents.</p>
            <span className="text-xs text-zinc-500">1 day ago</span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}