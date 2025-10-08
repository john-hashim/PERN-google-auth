import { Link, useLocation } from 'react-router-dom'
import { useState } from 'react'
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'
import { Button } from '@/components/ui/button'
import { useUserStore } from '@/store/userStore'
import { MessageSquare, Sparkles, BookOpen, Settings, LogOut, Menu, X } from 'lucide-react'

export function Navbar() {
  const location = useLocation()
  const logout = useUserStore(state => state.logout)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

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
    setMobileMenuOpen(false)
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
          {/* Desktop Navigation */}
          <NavigationMenu className="hidden md:flex">
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
                        <Icon
                          className="mr-2 h-4 w-4"
                          style={isActive ? { color: 'var(--primary-blue)' } : {}}
                        />
                        {item.label}
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                )
              })}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Desktop Logout Button */}
        <Button
          size="sm"
          onClick={handleLogout}
          className="hidden md:flex"
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

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2"
          style={{ color: 'var(--text-primary)' }}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div
          className="md:hidden"
          style={{
            borderTop: 'var(--border-common)',
            backgroundColor: 'var(--color-background)'
          }}
        >
          <div className="flex flex-col gap-2 p-4">
            {navItems.map(item => {
              const Icon = item.icon
              const isActive = location.pathname === item.path
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 p-3 rounded-md transition-colors"
                  style={{
                    color: isActive ? 'var(--primary-blue)' : 'var(--text-primary)',
                    backgroundColor: isActive ? 'rgba(37, 99, 235, 0.1)' : 'transparent'
                  }}
                >
                  <Icon
                    size={20}
                    style={{ color: isActive ? 'var(--primary-blue)' : undefined }}
                  />
                  <span className="font-medium">{item.label}</span>
                </Link>
              )
            })}
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 p-3 rounded-md mt-2"
              style={{
                backgroundColor: 'var(--primary-blue)',
                color: 'white',
                borderRadius: 'var(--border-radius)',
                transition: 'all 0.2s ease'
              }}
            >
              <LogOut size={20} />
              <span className="font-medium">Logout</span>
            </button>
          </div>
        </div>
      )}
    </nav>
  )
}
