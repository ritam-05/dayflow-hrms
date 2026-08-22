import { createClient } from '@/lib/supabase/server'
import { updateLeaveStatus } from '@/app/admin/actions'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'

export default async function AdminLeavePage() {
  const supabase = await createClient()

  // 1. Fetch all leave requests
  const { data: requests, error } = await supabase
    .from('leave_requests')
    .select('*')
    .order('created_at', { ascending: false })

  // 2. Fetch all profiles so we can map them manually (bulletproof against missing FK relations)
  const { data: profiles } = await supabase
    .from('profiles')
    .select('id, full_name, employee_id, email')

  const profileMap = new Map(profiles?.map(p => [p.id, p]) || [])

  const formattedRequests = requests?.map(req => ({
    ...req,
    employee: profileMap.get(req.employee_id) || { full_name: 'Unknown', employee_id: 'N/A' }
  }))

  return (
    <div className="space-y-6 max-w-6xl mx-auto mt-4">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Leave Requests Management</h2>
        <p className="text-zinc-400">Review and manage time-off applications across the organization.</p>
      </div>

      <Card className="bg-zinc-900/50 border-zinc-800">
        <CardHeader>
          <CardTitle>All Company Requests</CardTitle>
          <CardDescription>Approve or reject pending leave applications.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-zinc-800 hover:bg-transparent">
                <TableHead>Employee</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Reason</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {formattedRequests?.length === 0 || !formattedRequests ? (
                <TableRow className="border-zinc-800 hover:bg-transparent">
                  <TableCell colSpan={6} className="text-center text-zinc-500 py-8">
                    No leave requests found.
                  </TableCell>
                </TableRow>
              ) : (
                formattedRequests.map((req: any) => (
                  <TableRow key={req.id} className="border-zinc-800 hover:bg-zinc-900/50 transition-colors">
                    <TableCell className="font-medium">
                      <div>{req.employee?.full_name}</div>
                      <div className="text-xs text-zinc-500">{req.employee?.employee_id}</div>
                    </TableCell>
                    <TableCell>{req.leave_type}</TableCell>
                    <TableCell className="text-zinc-400">
                      {new Date(req.start_date).toLocaleDateString()} - {new Date(req.end_date).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-zinc-400 max-w-xs truncate">{req.reason || 'No reason provided'}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className={
                        req.status === 'Approved' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                        req.status === 'Rejected' ? 'bg-red-500/10 text-red-400 border-red-500/20' :
                        'bg-amber-500/10 text-amber-400 border-amber-500/20'
                      }>
                        {req.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right space-x-2">
                      {req.status === 'Pending' ? (
                        <div className="flex justify-end gap-2">
                          {/* @ts-ignore */}
                          <form action={async () => { 'use server'; await updateLeaveStatus(req.id, 'Approved'); }}>
                            <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700 text-white h-8">
                              Approve
                            </Button>
                          </form>
                          {/* @ts-ignore */}
                          <form action={async () => { 'use server'; await updateLeaveStatus(req.id, 'Rejected'); }}>
                            <Button size="sm" variant="destructive" className="h-8">
                              Reject
                            </Button>
                          </form>
                        </div>
                      ) : (
                        <span className="text-xs text-zinc-500 font-medium">Processed</span>
                      )}
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