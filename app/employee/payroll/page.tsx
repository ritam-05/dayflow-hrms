import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Download, Receipt } from 'lucide-react'

export default function PayrollPage() {
  return (
    <div className="space-y-6 max-w-4xl mx-auto mt-4">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Payroll & Salary</h2>
        <p className="text-zinc-400">View your compensation history and download payslips.</p>
      </div>

      <Card className="bg-zinc-900/50 border-zinc-800 bg-gradient-to-br from-zinc-900/50 to-violet-900/10">
        <CardHeader>
          <CardTitle className="text-2xl">Current Salary Overview</CardTitle>
          <CardDescription>Based on your current active contract.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
            <div>
              <p className="text-sm text-zinc-400 mb-1">Net Pay (Monthly)</p>
              <h3 className="text-4xl font-bold text-violet-400">$4,250.00</h3>
            </div>
            <Button className="bg-violet-600 hover:bg-violet-700 text-white flex items-center gap-2">
              <Download className="w-4 h-4" /> Download Latest Payslip
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-zinc-900/50 border-zinc-800">
        <CardHeader>
          <CardTitle>Recent Payslips</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { month: 'March 2026', amount: '$4,250.00', status: 'Paid' },
              { month: 'February 2026', amount: '$4,250.00', status: 'Paid' },
              { month: 'January 2026', amount: '$4,250.00', status: 'Paid' },
            ].map((slip, i) => (
              <div key={i} className="flex items-center justify-between p-4 rounded-lg border border-zinc-800 bg-zinc-950/50 hover:bg-zinc-800/50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-violet-500/10 rounded-md text-violet-400">
                    <Receipt className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-medium">{slip.month}</p>
                    <p className="text-sm text-zinc-400">{slip.status}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium">{slip.amount}</p>
                  <Button variant="ghost" size="sm" className="text-violet-400 hover:text-violet-300 mt-1 h-auto p-0">View PDF</Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}