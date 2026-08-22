import { Card, CardContent, CardHeader } from '@/components/ui/card'

export default function AdminLeaveLoading() {
  return (
    <div className="space-y-6 max-w-6xl mx-auto mt-4 animate-pulse">
      <div className="space-y-2">
        <div className="h-8 w-64 bg-zinc-800 rounded-md"></div>
        <div className="h-4 w-96 bg-zinc-900 rounded-md"></div>
      </div>

      <Card className="bg-zinc-900/50 border-zinc-800">
        <CardHeader className="space-y-2">
          <div className="h-5 w-40 bg-zinc-800 rounded"></div>
          <div className="h-3 w-60 bg-zinc-900 rounded"></div>
        </CardHeader>
        <CardContent className="space-y-4 py-4">
          <div className="h-12 w-full bg-zinc-950 rounded"></div>
          <div className="h-12 w-full bg-zinc-950/50 rounded"></div>
          <div className="h-12 w-full bg-zinc-950/30 rounded"></div>
        </CardContent>
      </Card>
    </div>
  )
}