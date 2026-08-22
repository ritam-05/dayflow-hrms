import { createClient } from '@/lib/supabase/server'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'

export default async function AdminAttendancePage() {
  const supabase = await createClient()

  // Fetch today's attendance joined with profiles
  const today = new Date().toISOString().split('T')[0]
  const { data: records } = await supabase
    .from('attendance')
    .select(`*, profiles(full_name, employee_id)`)
    .eq('date', today)

  return (
    <div className="space-y-6 max-w-6xl mx-auto mt-4">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Company Attendance</h2>
        <p className="text-zinc-400">View daily and weekly attendance records for all employees.</p>
      </div>

      <Card className="bg-zinc-900/50 border-zinc-800">
        <CardHeader>
          <CardTitle>Today's Log ({today})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-zinc-800">
                <TableHead>Employee</TableHead>
                <TableHead>Check In</TableHead>
                <TableHead>Check Out</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {records?.length === 0 ? (
                <TableRow><TableCell colSpan={4} className="text-center py-4">No records for today.</TableCell></TableRow>
              ) : (
                records?.map((rec: any) => (
                  <TableRow key={rec.id} className="border-zinc-800">
                    <TableCell className="font-medium">{rec.profiles?.full_name}</TableCell>
                    <TableCell>{new Date(rec.check_in).toLocaleTimeString()}</TableCell>
                    <TableCell>{rec.check_out ? new Date(rec.check_out).toLocaleTimeString() : '--'}</TableCell>
                    <TableCell>
                      <Badge className={rec.check_out ? 'bg-zinc-700' : 'bg-emerald-500/20 text-emerald-400'}>
                        {rec.check_out ? 'Half-day / Completed' : 'Present'}
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