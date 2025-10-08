import { Link, useLocation } from 'react-router-dom'
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'
import { Button } from '@/components/ui/button'
import { useUserStore } from '@/store/userStore'
import { MessageSquare, Sparkles, BookOpen, Settings, LogOut } from 'lucide-react'

export function Navbar() {
  const location = useLocation()
  const logout = useUserStore(state => state.logout)

  const navItems = [
    {
      path: '/chatbot-design',
      label: 'UI Customizer',
      icon: Sparkles,
    },
    {
      path: '/messages',
      label: 'Messages',
      icon: MessageSquare,
    },
    {
      path: '/knowledge-base',
      label: 'Knowledge Base',
      icon: BookOpen,
    },
    {
      path: '/settings',
      label: 'Settings',
      icon: Settings,
    },
  ]

  const handleLogout = () => {
    logout()
  }

  return (
    <nav className="border-b bg-background">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-6">
          <Link to="/chatbot-design" className="text-xl font-bold">
            AI Chatbot
          </Link>
          <NavigationMenu>
            <NavigationMenuList>
              {navItems.map(item => {
                const Icon = item.icon
                const isActive = location.pathname === item.path
                return (
                  <NavigationMenuItem key={item.path}>
                    <Link to={item.path}>
                      <NavigationMenuLink
                        className={navigationMenuTriggerStyle()}
                        active={isActive}
                      >
                        <Icon className="mr-2 h-4 w-4" />
                        {item.label}
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                )
              })}
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        <Button size="sm" onClick={handleLogout}>
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </Button>
      </div>
    </nav>
  )
}
