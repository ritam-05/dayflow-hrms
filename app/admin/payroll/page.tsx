import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function AdminPayrollPage() {
  return (
    <div className="space-y-6 max-w-6xl mx-auto mt-4">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Payroll Control</h2>
        <p className="text-zinc-400">Manage employee salary structures and generate organizational payouts.</p>
      </div>

      <Card className="bg-zinc-900/50 border-zinc-800">
        <CardHeader className="flex flex-row justify-between items-center">
          <CardTitle>Employee Salary Structures</CardTitle>
          <Button className="bg-violet-600 hover:bg-violet-700">Run Monthly Payroll</Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-zinc-800">
                <TableHead>Employee ID</TableHead>
                <TableHead>Base Salary</TableHead>
                <TableHead>Allowances</TableHead>
                <TableHead>Net Pay</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow className="border-zinc-800">
                <TableCell className="font-mono">EMP001</TableCell>
                <TableCell><Input defaultValue="4000" className="w-24 h-8 bg-zinc-950 border-zinc-800" /></TableCell>
                <TableCell><Input defaultValue="250" className="w-24 h-8 bg-zinc-950 border-zinc-800" /></TableCell>
                <TableCell className="font-bold text-violet-400">$4,250.00</TableCell>
                <TableCell className="text-right"><Button variant="outline" size="sm">Update</Button></TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}