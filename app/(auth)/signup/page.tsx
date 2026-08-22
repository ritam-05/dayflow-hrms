'use client'

import { useState } from 'react'
import { signup } from '@/app/auth/actions'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'
import { toast } from 'sonner'

export default function SignupPage() {
  const [loading, setLoading] = useState(false)
  const [role, setRole] = useState('Employee')

  async function handleSubmit(formData: FormData) {
    setLoading(true)
    formData.append('role', role)
    const result = await signup(formData)
    if (result?.error) {
      toast.error(result.error)
      setLoading(false)
    }
  }

  return (
    <Card className="border-zinc-800 bg-zinc-900/50 backdrop-blur-xl">
      <CardHeader>
        <CardTitle>Sign Up</CardTitle>
        <CardDescription>Create your Dayflow account.</CardDescription>
      </CardHeader>
      <CardContent>
        <form action={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="employee_id">Employee ID</Label>
              <Input id="employee_id" name="employee_id" required placeholder="OIJODO20220001" className="bg-zinc-950 border-zinc-800" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="full_name">Full Name</Label>
              <Input id="full_name" name="full_name" required placeholder="John Doe" className="bg-zinc-950 border-zinc-800" />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" required placeholder="john@company.com" className="bg-zinc-950 border-zinc-800" />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" name="password" type="password" required className="bg-zinc-950 border-zinc-800" />
          </div>

          <div className="space-y-2">
            <Label>Role</Label>
            <div className="flex gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="radio" name="role_select" value="Employee" checked={role === 'Employee'} onChange={() => setRole('Employee')} className="text-violet-600 accent-violet-600" />
                <span className="text-sm">Employee</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="radio" name="role_select" value="HR" checked={role === 'HR'} onChange={() => setRole('HR')} className="text-violet-600 accent-violet-600" />
                <span className="text-sm">HR / Admin</span>
              </label>
            </div>
          </div>

          {role === 'HR' && (
            <div className="space-y-2 p-3 bg-zinc-950/50 border border-zinc-800 rounded-md">
              <Label htmlFor="admin_secret" className="text-violet-400">Admin Secret Code</Label>
              <Input id="admin_secret" name="admin_secret" type="password" required={role === 'HR'} placeholder="Required for HR creation" className="bg-zinc-950 border-zinc-700" />
            </div>
          )}

          <Button type="submit" className="w-full bg-violet-600 hover:bg-violet-700 text-white" disabled={loading}>
            {loading ? 'Creating Account...' : 'Create Account'}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex justify-center">
        <p className="text-sm text-zinc-400">
          Already have an account? <Link href="/login" className="text-violet-400 hover:text-violet-300">Sign In</Link>
        </p>
      </CardFooter>
    </Card>
  )
}