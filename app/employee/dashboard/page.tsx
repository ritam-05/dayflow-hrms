import { logout } from '@/app/auth/actions'
import { Button } from '@/components/ui/button'

export default function EmployeeDashboard() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">Employee Dashboard</h1>
      <form action={logout}><Button type="submit" className="mt-4">Logout</Button></form>
    </div>
  )
}