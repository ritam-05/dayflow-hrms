import { Card, CardContent, CardHeader } from '@/components/ui/card'

export default function LeaveLoading() {
  return (
    <div className="space-y-8 max-w-5xl mx-auto mt-4 animate-pulse">
      <div className="space-y-2">
        <div className="h-8 w-48 bg-zinc-800 rounded-md"></div>
        <div className="h-4 w-72 bg-zinc-900 rounded-md"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <Card className="md:col-span-1 bg-zinc-900/50 border-zinc-800 h-80">
          <CardHeader className="space-y-2">
            <div className="h-5 w-28 bg-zinc-800 rounded"></div>
            <div className="h-3 w-40 bg-zinc-900 rounded"></div>
          </CardHeader>
        </CardCard>
        
        <Card className="md:col-span-2 bg-zinc-900/50 border-zinc-800 h-80">
          <CardHeader>
            <div className="h-5 w-32 bg-zinc-800 rounded"></div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="h-10 w-full bg-zinc-950 rounded"></div>
            <div className="h-10 w-full bg-zinc-950/50 rounded"></div>
            <div className="h-10 w-full bg-zinc-950/30 rounded"></div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}