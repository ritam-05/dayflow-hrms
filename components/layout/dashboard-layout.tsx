'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { logout } from '@/app/auth/actions'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Bell, Menu, LayoutDashboard, User, Clock, CalendarOff, Banknote, Users, BarChart3 } from 'lucide-react'

export type NavItem = {
  title: string
  href: string
  iconName: 'Dashboard' | 'User' | 'Attendance' | 'Leave' | 'Payroll' | 'Employees' | 'Reports'
}

interface DashboardLayoutProps {
  children: React.ReactNode
  navItems: NavItem[]
  userName: string
  userEmail: string
  role: 'Employee' | 'HR'
}

const iconMap = {
  Dashboard: LayoutDashboard,
  User: User,
  Attendance: Clock,
  Leave: CalendarOff,
  Payroll: Banknote,
  Employees: Users,
  Reports: BarChart3,
}

export function DashboardLayout({ children, navItems, userName, userEmail, role }: DashboardLayoutProps) {
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()
  }

  const NavLinks = () => (
    <nav className="flex flex-col gap-2 p-4">
      {navItems.map((item) => {
        const IconComponent = iconMap[item.iconName] || LayoutDashboard
        const isActive = pathname === item.href
        return (
          <Link key={item.href} href={item.href} onClick={() => setIsMobileMenuOpen(false)}>
            <span
              className={`flex items-center gap-3 px-3 py-2.5 rounded-md transition-all duration-200 ${
                isActive
                  ? 'bg-violet-600/10 text-violet-400 font-medium border-r-2 border-violet-600'
                  : 'text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900'
              }`}
            >
              <IconComponent className="w-5 h-5" />
              {item.title}
            </span>
          </Link>
        )
      })}
    </nav>
  )

  return (
    <div className="flex min-h-screen bg-zinc-950 text-zinc-50">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-64 border-r border-zinc-800 bg-zinc-950/50">
        <div className="h-16 flex items-center px-6 border-b border-zinc-800">
          <h1 className="text-2xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-violet-600">
            Dayflow
          </h1>
        </div>
        <div className="flex-1 overflow-y-auto py-4">
          <NavLinks />
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <header className="h-16 flex items-center justify-between px-4 md:px-6 border-b border-zinc-800 bg-zinc-950/50 backdrop-blur-xl sticky top-0 z-50">
          <div className="flex items-center gap-4">
            {/* Mobile Menu Trigger */}
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden text-zinc-400 hover:text-zinc-50">
                  <Menu className="w-6 h-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-64 p-0 bg-zinc-950 border-r-zinc-800">
                <div className="h-16 flex items-center px-6 border-b border-zinc-800">
                  <h1 className="text-2xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-violet-600">
                    Dayflow
                  </h1>
                </div>
                <NavLinks />
              </SheetContent>
            </Sheet>
            
            <h2 className="text-lg font-semibold capitalize hidden sm:block">
              {pathname.split('/').pop()?.replace('-', ' ') || 'Dashboard'}
            </h2>
          </div>

          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="text-zinc-400 hover:text-zinc-50 relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-violet-600 rounded-full"></span>
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                  <Avatar className="h-10 w-10 border border-zinc-800">
                    <AvatarImage src="" alt={userName} />
                    <AvatarFallback className="bg-violet-900 text-violet-100">{getInitials(userName)}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 mt-2 bg-zinc-900 border-zinc-800 text-zinc-100" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{userName}</p>
                    <p className="text-xs leading-none text-zinc-400">{userEmail}</p>
                    <p className="text-xs font-semibold text-violet-400 mt-1 uppercase tracking-wider">{role}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-zinc-800" />
                <DropdownMenuItem asChild className="cursor-pointer hover:bg-zinc-800 focus:bg-zinc-800">
                  <Link href={role === 'HR' ? '#' : '/employee/profile'}>
                    <User className="mr-2 h-4 w-4" />
                    <span>My Profile</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer text-red-400 hover:bg-red-950/30 focus:bg-red-950/30 focus:text-red-400" onClick={() => logout()}>
                  <span className="w-full">Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 md:p-6 overflow-auto bg-zinc-950/30">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}