import { createClient } from '@/lib/supabase/server'
import { submitLeaveRequest } from '@/app/employee/actions'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'

export default async function LeavePage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  // Fetch past leave requests
  const { data: requests } = await supabase
    .from('leave_requests')
    .select('*')
    .eq('employee_id', user?.id)
    .order('created_at', { ascending: false })

  return (
    <div className="space-y-8 max-w-5xl mx-auto mt-4">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Leave Management</h2>
        <p className="text-zinc-400">Apply for time off and view your request history.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Application Form */}
        <Card className="md:col-span-1 bg-zinc-900/50 border-zinc-800 h-fit">
          <CardHeader>
            <CardTitle>New Request</CardTitle>
            <CardDescription>Submit a new leave application.</CardDescription>
          </CardHeader>
          <CardContent>
            <form action={async (formData) => { 'use server'; await submitLeaveRequest(formData); }} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="leave_type">Leave Type</Label>
                <select name="leave_type" id="leave_type" required className="flex h-10 w-full rounded-md border border-zinc-800 bg-zinc-950 px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-600 disabled:cursor-not-allowed disabled:opacity-50">
                  <option value="Paid">Paid Leave</option>
                  <option value="Sick">Sick Leave</option>
                  <option value="Unpaid">Unpaid Leave</option>
                </select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="start_date">Start Date</Label>
                <Input type="date" id="start_date" name="start_date" required className="bg-zinc-950 border-zinc-800 [color-scheme:dark]" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="end_date">End Date</Label>
                <Input type="date" id="end_date" name="end_date" required className="bg-zinc-950 border-zinc-800 [color-scheme:dark]" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="reason">Reason (Optional)</Label>
                <Input id="reason" name="reason" placeholder="Medical appointment" className="bg-zinc-950 border-zinc-800" />
              </div>

              <Button type="submit" className="w-full bg-violet-600 hover:bg-violet-700 text-white mt-2">
                Submit Request
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* History Table */}
        <Card className="md:col-span-2 bg-zinc-900/50 border-zinc-800">
          <CardHeader>
            <CardTitle>Request History</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="border-zinc-800 hover:bg-transparent">
                  <TableHead>Type</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {requests?.length === 0 ? (
                  <TableRow className="border-zinc-800 hover:bg-transparent">
                    <TableCell colSpan={3} className="text-center text-zinc-500 py-8">No leave requests found.</TableCell>
                  </TableRow>
                ) : (
                  requests?.map((req) => (
                    <TableRow key={req.id} className="border-zinc-800 hover:bg-zinc-900/50 transition-colors">
                      <TableCell className="font-medium">{req.leave_type}</TableCell>
                      <TableCell className="text-zinc-400">
                        {new Date(req.start_date).toLocaleDateString()} - {new Date(req.end_date).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className={
                          req.status === 'Approved' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                          req.status === 'Rejected' ? 'bg-red-500/10 text-red-400 border-red-500/20' :
                          'bg-amber-500/10 text-amber-400 border-amber-500/20'
                        }>
                          {req.status}
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
    </div>
  )
}