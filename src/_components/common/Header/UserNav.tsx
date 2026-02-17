'use client'

import { LogOut, User, LayoutDashboard } from 'lucide-react'
import { useRouter } from 'next/navigation'

import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/_components/ui/dropdown-menu'
import { Button } from '@/_components/ui/button'
import { selectCurrentUser, logout } from '@/redux/slices/authSlice'
import { useReduxDispatch, useReduxSelector } from '@/hooks/redux.hook'
import paths from '@/navigate/paths'
import { removeCookie } from '@/utils/cookie.utils'
import { roles } from '@/utils/constant.utils'

export function UserNav() {
  const user = useReduxSelector(selectCurrentUser)
  const dispatch = useReduxDispatch()
  const router = useRouter()

  const handleLogout = () => {
    dispatch(logout())
    removeCookie('token')
    router.push(paths.signIn())
  }

  if (!user) return null

  // Initials for avatar fallback
  const initials =
    user.name
      ?.split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2) || 'U'

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-10 w-10 rounded-full hover:bg-orange-500/5 p-0 overflow-hidden group">
          {user.image ? (
            <img src={user.image} alt={user.name} className="h-full w-full object-cover transition-transform group-hover:scale-110" />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-orange-500 to-amber-500 text-white font-bold text-sm shadow-md">{initials}</div>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user.name}</p>
            <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {user.role?.name === roles.admin && (
            <DropdownMenuItem onClick={() => router.push(paths.admin.dashboard())} className="cursor-pointer">
              <LayoutDashboard className="mr-2 h-4 w-4" />
              <span>Dashboard</span>
            </DropdownMenuItem>
          )}
          {user.role?.name === roles.staff && (
            <DropdownMenuItem onClick={() => router.push(paths.staffMember.dashboard())} className="cursor-pointer">
              <LayoutDashboard className="mr-2 h-4 w-4" />
              <span>Dashboard</span>
            </DropdownMenuItem>
          )}
          <DropdownMenuItem onClick={() => router.push(paths.customerProfile())} className="cursor-pointer">
            <User className="mr-2 h-4 w-4" />
            <span>Profile</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-red-600 focus:text-red-600 focus:bg-red-50 dark:focus:bg-red-950/20">
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
