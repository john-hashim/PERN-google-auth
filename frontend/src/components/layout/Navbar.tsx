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
    <nav
      style={{
        borderBottom: 'var(--border-common)',
        boxShadow: 'var(--box-shadow-common)'
      }}
      className="bg-background"
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-6">
        <div className="flex items-center gap-8">
          <Link
            to="/chatbot-design"
            className="text-xl font-bold"
            style={{ color: 'var(--text-primary)' }}
          >
            AI Chatbot
          </Link>
          <NavigationMenu>
            <NavigationMenuList>
              {navItems.map(item => {
                const Icon = item.icon
                const isActive = location.pathname === item.path
                return (
                  <NavigationMenuItem key={item.path}>
                    <NavigationMenuLink
                      asChild
                      active={isActive}
                      style={isActive ? { color: 'var(--primary-blue)' } : {}}
                    >
                      <Link to={item.path} className={navigationMenuTriggerStyle()}>
                        <Icon className="mr-2 h-4 w-4" />
                        {item.label}
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                )
              })}
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        <Button
          size="sm"
          onClick={handleLogout}
          style={{
            backgroundColor: 'var(--primary-blue)',
            color: 'white',
            borderRadius: 'var(--border-radius)',
            padding: '0.5rem 1rem',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#1d4ed8'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'var(--primary-blue)'
          }}
        >
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </Button>
      </div>
    </nav>
  )
}
