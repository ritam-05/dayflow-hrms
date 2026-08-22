import { createClient } from '@/lib/supabase/server'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { User, Mail, Hash, Shield, CheckCircle } from 'lucide-react'

export default async function EmployeeProfilePage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user?.id)
    .single()

  return (
    <div className="space-y-6 max-w-3xl mx-auto mt-4">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">My Profile</h2>
        <p className="text-zinc-400">View your personal information and account details.</p>
      </div>

      <Card className="bg-zinc-900/50 border-zinc-800">
        <CardHeader>
          <CardTitle>Employee Information</CardTitle>
          <CardDescription>Your registered details in Dayflow.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1">
              <span className="flex items-center gap-2 text-sm text-zinc-400"><Hash className="w-4 h-4"/> Employee ID</span>
              <p className="font-mono text-lg">{profile?.employee_id}</p>
            </div>
            <div className="space-y-1">
              <span className="flex items-center gap-2 text-sm text-zinc-400"><User className="w-4 h-4"/> Full Name</span>
              <p className="text-lg">{profile?.full_name}</p>
            </div>
            <div className="space-y-1">
              <span className="flex items-center gap-2 text-sm text-zinc-400"><Mail className="w-4 h-4"/> Email Address</span>
              <p className="text-lg">{profile?.email}</p>
            </div>
            <div className="space-y-1">
              <span className="flex items-center gap-2 text-sm text-zinc-400"><Shield className="w-4 h-4"/> System Role</span>
              <p className="text-lg capitalize">{profile?.role}</p>
            </div>
          </div>
          
          <div className="pt-4 border-t border-zinc-800">
            <span className="flex items-center gap-2 text-sm text-zinc-400 mb-2">Account Status</span>
            <div className="flex items-center gap-2 text-emerald-400 bg-emerald-400/10 w-fit px-3 py-1 rounded-full text-sm font-medium border border-emerald-400/20">
              <CheckCircle className="w-4 h-4" /> Active
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}