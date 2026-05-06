import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Zap, Menu, X, ChevronRight, Bell, Search } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

export default function Navbar({ sidebarOpen, setSidebarOpen, isDashboard = false }) {
  const location = useLocation()
  const { user } = useAuth()
  const isLanding = location.pathname === '/'

  if (isDashboard) {
    return (
      <header className="h-16 border-b border-border/60 bg-bg/80 backdrop-blur-sm flex items-center justify-between px-6 sticky top-0 z-40">
        {/* Left — mobile toggle + breadcrumb */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-white/5 text-text-dim hover:text-text transition-colors"
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          <div className="hidden sm:flex items-center gap-2 text-sm">
            <span className="text-text-dim font-body">ResumeAI</span>
            <ChevronRight size={14} className="text-muted" />
            <span className="text-text font-display font-medium capitalize">
              {location.pathname.split('/').pop() || 'Dashboard'}
            </span>
          </div>
        </div>

        {/* Center — search */}
        <div className="hidden md:flex items-center gap-2 bg-surface border border-border/60 rounded-xl px-4 py-2 w-64 focus-within:border-accent/50 transition-colors">
          <Search size={15} className="text-muted" />
          <input
            type="text"
            placeholder="Search resumes..."
            className="bg-transparent text-sm text-text placeholder-muted focus:outline-none w-full font-body"
          />
        </div>

        {/* Right — actions */}
        <div className="flex items-center gap-3">
          <button className="relative p-2 rounded-xl hover:bg-white/5 text-text-dim hover:text-text transition-colors">
            <Bell size={18} />
            <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-accent rounded-full"></span>
          </button>
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-accent to-accent-dark flex items-center justify-center text-white text-xs font-display font-bold uppercase">
            {user?.firstName?.[0] || 'U'}{user?.lastName?.[0] || ''}
          </div>
        </div>
      </header>
    )
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 h-16 flex items-center px-6 lg:px-12">
      <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center shadow-accent-sm group-hover:shadow-accent transition-all duration-300">
            <Zap size={16} className="text-white" fill="white" />
          </div>
          <span className="font-display font-bold text-lg text-text tracking-tight">
            Resume<span className="gradient-text">AI</span>
          </span>
        </Link>

        {/* Links */}
        <div className="hidden md:flex items-center gap-1">
          {['Features', 'Templates', 'Pricing', 'Blog'].map((item) => (
            <a key={item} href="#" className="btn-ghost text-sm">
              {item}
            </a>
          ))}
        </div>

        {/* CTA */}
        <div className="flex items-center gap-3">
          {user ? (
            <Link to="/dashboard" className="btn-primary text-sm py-2.5 px-5">
              Go to Dashboard
            </Link>
          ) : (
            <>
              <Link to="/login" className="btn-ghost text-sm hidden sm:inline-flex">
                Sign In
              </Link>
              <Link to="/signup" className="btn-primary text-sm py-2.5 px-5">
                Get Started Free
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}
