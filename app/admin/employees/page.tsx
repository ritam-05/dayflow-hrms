import { createClient } from '@/lib/supabase/server'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'

export default async function AdminEmployeesPage() {
  const supabase = await createClient()

  const { data: employees } = await supabase
    .from('profiles')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <div className="space-y-6 max-w-6xl mx-auto mt-4">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Employee Directory</h2>
        <p className="text-zinc-400">Manage and view all personnel registered in Dayflow.</p>
      </div>

      <Card className="bg-zinc-900/50 border-zinc-800">
        <CardHeader>
          <CardTitle>Organization Roster</CardTitle>
          <CardDescription>Total personnel: {employees?.length || 0}</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-zinc-800 hover:bg-transparent">
                <TableHead>Employee ID</TableHead>
                <TableHead>Full Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {employees?.length === 0 || !employees ? (
                <TableRow className="border-zinc-800 hover:bg-transparent">
                  <TableCell colSpan={5} className="text-center text-zinc-500 py-8">
                    No employees found.
                  </TableCell>
                </TableRow>
              ) : (
                employees.map((emp) => (
                  <TableRow key={emp.id} className="border-zinc-800 hover:bg-zinc-900/50 transition-colors">
                    <TableCell className="font-mono text-zinc-400">{emp.employee_id}</TableCell>
                    <TableCell className="font-medium text-zinc-100">{emp.full_name}</TableCell>
                    <TableCell className="text-zinc-400">{emp.email}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className={emp.role === 'HR' ? 'bg-purple-500/10 text-purple-400 border-purple-500/20' : 'bg-zinc-800 text-zinc-300'}>
                        {emp.role}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20">
                        {emp.employment_status || 'Active'}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}