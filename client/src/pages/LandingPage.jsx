import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import {
  Zap, ArrowRight, Star, Shield, Cpu, BarChart3, Target,
  FileText, CheckCircle, Sparkles, ChevronRight, Users
} from 'lucide-react'
import { useAuth } from '../context/AuthContext'

const features = [
  {
    icon: Cpu,
    title: 'AI-Powered Generation',
    desc: 'Our AI understands job descriptions and tailors your resume for maximum relevance and impact.',
    color: 'accent',
  },
  {
    icon: Target,
    title: 'ATS Optimization',
    desc: 'Beat Applicant Tracking Systems with keyword-optimized resumes that pass automated screening.',
    color: 'emerald',
  },
  {
    icon: BarChart3,
    title: 'Resume Analytics',
    desc: 'Track views, downloads, and application success rates in real-time with detailed insights.',
    color: 'amber',
  },
  {
    icon: Shield,
    title: 'Privacy First',
    desc: 'Your data is encrypted and never shared. You own your resume and your career data.',
    color: 'rose',
  },
  {
    icon: FileText,
    title: '50+ Templates',
    desc: 'Professional, recruiter-approved templates for every industry and career level.',
    color: 'accent',
  },
  {
    icon: Sparkles,
    title: 'Smart Suggestions',
    desc: 'Get real-time improvements on your bullet points, skills, and formatting as you type.',
    color: 'emerald',
  },
]

const iconColorMap = {
  accent: 'bg-accent/15 border-accent/25 text-accent-light',
  emerald: 'bg-emerald-500/15 border-emerald-500/25 text-emerald-400',
  amber: 'bg-amber-500/15 border-amber-500/25 text-amber-400',
  rose: 'bg-rose-500/15 border-rose-500/25 text-rose-400',
}

const stats = [
  { value: '2.4M+', label: 'Resumes Created' },
  { value: '94%', label: 'Interview Rate' },
  { value: '50+', label: 'Templates' },
  { value: '4.9★', label: 'User Rating' },
]

export default function LandingPage() {
  const { user } = useAuth()
  const ctaLink = user ? '/dashboard/create' : '/signup'

  return (
    <div className="min-h-screen mesh-bg noise relative">
      <Navbar />

      {/* Hero */}
      <section className="pt-40 pb-24 px-6 lg:px-12 relative">
        {/* Glow orb */}
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-accent/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-5xl mx-auto text-center relative z-10">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-accent/30 bg-accent/10 mb-8 group cursor-default">
            <div className="glow-dot" />
            <span className="text-sm font-display font-medium text-accent-light">
              AI-Powered Resume Builder v2.0
            </span>
            <ChevronRight size={14} className="text-accent" />
          </div>

          {/* Headline */}
          <h1 className="font-display font-bold text-5xl lg:text-7xl text-text leading-[1.05] tracking-tight mb-6">
            Build Resumes That
            <br />
            <span className="gradient-text">Actually Get You Hired</span>
          </h1>

          <p className="text-lg lg:text-xl text-text-dim font-body max-w-2xl mx-auto mb-10 leading-relaxed">
            Stop getting ignored. Our AI crafts ATS-optimized resumes tailored to every job description — in under 60 seconds.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Link to={ctaLink} className="btn-primary text-base px-8 py-4 flex items-center gap-2 group">
              Build My Resume
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link to="/dashboard" className="btn-secondary text-base px-8 py-4 flex items-center gap-2">
              View Templates
            </Link>
          </div>

          {/* Social proof */}
          <div className="flex items-center justify-center gap-3">
            <div className="flex -space-x-2">
              {['#6366f1', '#8b5cf6', '#06b6d4', '#10b981', '#f59e0b'].map((color, i) => (
                <div
                  key={i}
                  className="w-8 h-8 rounded-full border-2 border-bg flex items-center justify-center text-[10px] font-bold text-white"
                  style={{ backgroundColor: color }}
                >
                  {String.fromCharCode(65 + i)}
                </div>
              ))}
            </div>
            <div className="text-left">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={12} className="text-amber-400" fill="currentColor" />
                ))}
              </div>
              <p className="text-xs text-muted font-body">
                <span className="text-text font-semibold">2,400+</span> professionals hired this month
              </p>
            </div>
          </div>
        </div>

        {/* Hero UI mockup */}
        <div className="max-w-4xl mx-auto mt-16 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-bg z-10 pointer-events-none rounded-2xl" />
          <div className="card border-border/80 overflow-hidden shadow-2xl shadow-black/50">
            {/* Fake browser bar */}
            <div className="bg-surface/80 border-b border-border/60 px-4 py-3 flex items-center gap-3">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-rose-500/70" />
                <div className="w-3 h-3 rounded-full bg-amber-500/70" />
                <div className="w-3 h-3 rounded-full bg-emerald-500/70" />
              </div>
              <div className="flex-1 bg-border/40 rounded-md h-5 max-w-xs flex items-center px-3">
                <span className="text-[10px] text-muted font-mono">app.resumeai.com/dashboard</span>
              </div>
            </div>

            {/* Dashboard preview */}
            <div className="bg-bg p-6 flex gap-4 min-h-[280px]">
              {/* Fake sidebar */}
              <div className="w-40 bg-surface/60 rounded-xl p-3 shrink-0 hidden sm:block">
                <div className="space-y-1">
                  {['Dashboard', 'Create Resume', 'Analyze', 'Job Matches'].map((item, i) => (
                    <div
                      key={item}
                      className={`h-7 rounded-lg flex items-center px-3 text-[10px] font-display font-medium ${
                        i === 0 ? 'bg-accent/20 text-accent-light' : 'text-muted hover:text-text'
                      }`}
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              {/* Fake main content */}
              <div className="flex-1 space-y-3">
                <div className="grid grid-cols-3 gap-3">
                  {['4 Resumes', '94% Score', '12 Jobs'].map((s, i) => (
                    <div key={s} className="bg-card/80 rounded-xl p-3 border border-border/40">
                      <div className="h-2 w-12 bg-accent/40 rounded mb-2 shimmer" />
                      <p className="text-xs font-display font-bold text-text">{s}</p>
                    </div>
                  ))}
                </div>
                <div className="bg-card/80 rounded-xl p-4 border border-border/40">
                  <div className="h-2 w-20 bg-border/60 rounded mb-3" />
                  <div className="space-y-2">
                    {[85, 72, 91].map((score, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <div className="h-7 w-7 bg-accent/15 rounded-lg flex-shrink-0" />
                        <div className="flex-1">
                          <div className="h-1.5 bg-border/60 rounded-full">
                            <div className="h-full bg-accent rounded-full" style={{ width: `${score}%` }} />
                          </div>
                        </div>
                        <span className="text-[10px] text-accent font-display font-bold">{score}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 px-6 lg:px-12 border-y border-border/40">
        <div className="max-w-5xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map(({ value, label }) => (
            <div key={label} className="text-center">
              <p className="font-display font-bold text-3xl lg:text-4xl gradient-text mb-1">{value}</p>
              <p className="text-sm text-muted font-body">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="py-24 px-6 lg:px-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border/60 bg-card/50 mb-6">
              <Sparkles size={14} className="text-accent" />
              <span className="text-sm font-display font-medium text-text-dim">Everything You Need</span>
            </div>
            <h2 className="font-display font-bold text-4xl lg:text-5xl text-text mb-4 tracking-tight">
              Built for the Modern
              <br />
              <span className="gradient-text">Job Seeker</span>
            </h2>
            <p className="text-text-dim max-w-xl mx-auto font-body text-lg">
              Every feature designed to give you an unfair advantage in the job market.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map(({ icon: Icon, title, desc, color }) => (
              <div key={title} className="card-hover p-6 group">
                <div className={`w-11 h-11 rounded-xl border flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110 ${iconColorMap[color]}`}>
                  <Icon size={20} />
                </div>
                <h3 className="font-display font-semibold text-text mb-2">{title}</h3>
                <p className="text-sm text-text-dim font-body leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 lg:px-12">
        <div className="max-w-4xl mx-auto">
          <div className="relative card border-accent/20 overflow-hidden p-12 lg:p-16 text-center">
            {/* Background glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-transparent to-accent-dark/5 pointer-events-none" />
            <div className="absolute -top-20 -right-20 w-60 h-60 bg-accent/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-accent/30 bg-accent/10 mb-6">
                <Users size={14} className="text-accent-light" />
                <span className="text-sm font-display font-medium text-accent-light">Join 2.4M+ users</span>
              </div>
              <h2 className="font-display font-bold text-4xl lg:text-5xl text-text mb-4 tracking-tight">
                Your Dream Job Starts
                <br />
                <span className="gradient-text">With a Great Resume</span>
              </h2>
              <p className="text-text-dim text-lg mb-10 font-body max-w-xl mx-auto">
                Free forever. No credit card required. Start building in 60 seconds.
              </p>
              <Link to={ctaLink} className="btn-primary text-base px-10 py-4 inline-flex items-center gap-2 group">
                Build Resume — It's Free
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>

              <div className="mt-8 flex items-center justify-center gap-6">
                {['Free forever', 'No credit card', 'Cancel anytime'].map((item) => (
                  <div key={item} className="flex items-center gap-1.5 text-sm text-text-dim">
                    <CheckCircle size={14} className="text-emerald-400" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/40 py-8 px-6 lg:px-12">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-accent flex items-center justify-center">
              <Zap size={12} className="text-white" fill="white" />
            </div>
            <span className="font-display font-bold text-sm">ResumeAI</span>
          </div>
          <p className="text-xs text-muted font-body">© 2025 ResumeAI. All rights reserved.</p>
          <div className="flex items-center gap-4">
            {['Privacy', 'Terms', 'Contact'].map((item) => (
              <a key={item} href="#" className="text-xs text-muted hover:text-text transition-colors font-body">
                {item}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  )
}
