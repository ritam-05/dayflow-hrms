import { createClient } from '@/lib/supabase/server'
import { checkIn, checkOut } from '@/app/employee/actions'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Clock } from 'lucide-react'

export default async function AttendancePage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  const today = new Date().toISOString().split('T')[0]
  
  // Fetch today's attendance record
  const { data: record } = await supabase
    .from('attendance')
    .select('*')
    .eq('employee_id', user?.id)
    .eq('date', today)
    .single()

  const hasCheckedIn = !!record?.check_in
  const hasCheckedOut = !!record?.check_out

  return (
    <div className="space-y-6 max-w-3xl mx-auto mt-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Daily Attendance</h2>
        <p className="text-zinc-400">Log your work hours and track your daily presence.</p>
      </div>

      <Card className="bg-zinc-900/50 border-zinc-800">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-violet-400" />
            Today's Status
          </CardTitle>
          <CardDescription>
            {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center py-8 space-y-6">
          
          <div className="text-center space-y-2">
            {hasCheckedOut ? (
              <h3 className="text-2xl font-bold text-zinc-300">Shift Completed</h3>
            ) : hasCheckedIn ? (
              <h3 className="text-2xl font-bold text-emerald-400">Currently Clocked In</h3>
            ) : (
              <h3 className="text-2xl font-bold text-zinc-400">Not Clocked In</h3>
            )}
            
            {hasCheckedIn && (
              <p className="text-sm text-zinc-500">
                Clocked in at: {new Date(record.check_in).toLocaleTimeString()}
              </p>
            )}
          </div>

          {!hasCheckedIn ? (
            // @ts-ignore
            <form action={checkIn}>
              <Button size="lg" className="bg-violet-600 hover:bg-violet-700 text-white w-48 h-12 text-lg rounded-full">
                Check In
              </Button>
            </form>
          ) : !hasCheckedOut ? (
            // @ts-ignore
            <form action={checkOut}>
              <Button size="lg" variant="destructive" className="w-48 h-12 text-lg rounded-full">
                Check Out
              </Button>
            </form>
          ) : (
            <Button size="lg" disabled className="w-48 h-12 text-lg rounded-full bg-zinc-800 text-zinc-500">
              Done for the day
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  )
}