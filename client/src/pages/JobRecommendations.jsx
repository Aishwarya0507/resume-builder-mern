import { useState } from 'react'
import DashboardLayout from '../components/DashboardLayout'
import {
  Briefcase, MapPin, Clock, DollarSign, Star, ExternalLink,
  Filter, Search, Cpu, TrendingUp, Building2, ChevronDown
} from 'lucide-react'

const jobs = [
  {
    title: 'Senior Frontend Engineer',
    company: 'Stripe',
    location: 'San Francisco, CA',
    type: 'Full-time',
    salary: '$180k – $240k',
    match: 96,
    posted: '2 days ago',
    tags: ['React', 'TypeScript', 'Remote-friendly'],
    logo: 'S',
    logoColor: '#635BFF',
    featured: true,
  },
  {
    title: 'Staff Software Engineer',
    company: 'Figma',
    location: 'New York, NY',
    type: 'Full-time',
    salary: '$200k – $260k',
    match: 91,
    posted: '1 day ago',
    tags: ['React', 'Node.js', 'GraphQL'],
    logo: 'F',
    logoColor: '#F24E1E',
    featured: false,
  },
  {
    title: 'Frontend Engineer II',
    company: 'Notion',
    location: 'Remote',
    type: 'Full-time',
    salary: '$160k – $210k',
    match: 88,
    posted: '3 days ago',
    tags: ['React', 'TypeScript', 'Electron'],
    logo: 'N',
    logoColor: '#000000',
    featured: false,
  },
  {
    title: 'React Developer',
    company: 'Linear',
    location: 'Remote',
    type: 'Full-time',
    salary: '$150k – $190k',
    match: 84,
    posted: '5 days ago',
    tags: ['React', 'Apollo', 'Tailwind'],
    logo: 'L',
    logoColor: '#5E6AD2',
    featured: false,
  },
  {
    title: 'UI Engineer',
    company: 'Vercel',
    location: 'Remote',
    type: 'Full-time',
    salary: '$170k – $230k',
    match: 79,
    posted: '1 week ago',
    tags: ['Next.js', 'React', 'CSS'],
    logo: 'V',
    logoColor: '#000000',
    featured: false,
  },
  {
    title: 'Software Engineer, Growth',
    company: 'Loom',
    location: 'San Francisco, CA',
    type: 'Hybrid',
    salary: '$155k – $200k',
    match: 72,
    posted: '1 week ago',
    tags: ['React', 'Ruby on Rails', 'A/B Testing'],
    logo: 'L',
    logoColor: '#625DF5',
    featured: false,
  },
]

const matchColor = (match) => {
  if (match >= 90) return { text: 'text-emerald-400', bg: 'bg-emerald-500/15 border-emerald-500/25' }
  if (match >= 80) return { text: 'text-accent-light', bg: 'bg-accent/15 border-accent/25' }
  return { text: 'text-amber-400', bg: 'bg-amber-500/15 border-amber-500/25' }
}

const typeColor = {
  'Full-time': 'bg-accent/10 text-accent-light border-accent/20',
  'Hybrid': 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  'Contract': 'bg-rose-500/10 text-rose-400 border-rose-500/20',
}

export default function JobRecommendations() {
  const [savedJobs, setSavedJobs] = useState([])
  const [selectedFilter, setSelectedFilter] = useState('All')

  const toggleSave = (title) => {
    setSavedJobs(prev =>
      prev.includes(title) ? prev.filter(j => j !== title) : [...prev, title]
    )
  }

  const filters = ['All', 'Best Match', 'Remote', 'Full-time', 'Saved']

  return (
    <DashboardLayout>
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="font-display font-bold text-2xl text-text">Job Recommendations</h1>
            <p className="text-sm text-muted mt-1 font-body">
              AI-matched jobs based on your resume and preferences.
            </p>
          </div>
          <div className="flex items-center gap-2 px-3 py-2 rounded-xl border border-accent/25 bg-accent/8">
            <Cpu size={14} className="text-accent-light" />
            <span className="text-sm font-display font-semibold text-accent-light">{jobs.length} matches found</span>
          </div>
        </div>

        {/* Search + Filters */}
        <div className="card p-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex items-center gap-2 bg-surface border border-border/60 rounded-xl px-4 py-2.5 flex-1 focus-within:border-accent/50 transition-colors">
              <Search size={15} className="text-muted shrink-0" />
              <input
                type="text"
                placeholder="Search jobs, companies, skills..."
                className="bg-transparent text-sm text-text placeholder-muted focus:outline-none w-full font-body"
              />
            </div>
            <div className="flex items-center gap-2">
              <button className="btn-secondary text-sm py-2.5 flex items-center gap-2">
                <MapPin size={14} /> Location <ChevronDown size={13} />
              </button>
              <button className="btn-secondary text-sm py-2.5 flex items-center gap-2">
                <DollarSign size={14} /> Salary <ChevronDown size={13} />
              </button>
              <button className="btn-secondary text-sm py-2.5 flex items-center gap-2">
                <Filter size={14} /> More
              </button>
            </div>
          </div>

          {/* Filter pills */}
          <div className="flex items-center gap-2 mt-3 flex-wrap">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setSelectedFilter(filter)}
                className={`px-3 py-1.5 rounded-lg text-xs font-display font-semibold transition-all ${
                  selectedFilter === filter
                    ? 'bg-accent text-white shadow-accent-sm'
                    : 'bg-surface border border-border/60 text-text-dim hover:border-accent/40 hover:text-text'
                }`}
              >
                {filter}
                {filter === 'Saved' && savedJobs.length > 0 && (
                  <span className="ml-1.5 bg-white/20 rounded-full px-1.5 py-0.5 text-[10px]">
                    {savedJobs.length}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* AI Match Banner */}
        <div className="card border-accent/20 bg-accent/5 p-4 flex flex-col sm:flex-row items-start sm:items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-accent/20 flex items-center justify-center shrink-0">
            <TrendingUp size={16} className="text-accent-light" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-display font-semibold text-text">Boost your match rate</p>
            <p className="text-xs text-text-dim font-body mt-0.5">
              Adding "CI/CD" and "Docker" to your skills could unlock 12 more high-match jobs.
            </p>
          </div>
          <button className="btn-primary text-xs py-2 px-4 shrink-0">Update Resume</button>
        </div>

        {/* Jobs list */}
        <div className="space-y-3">
          {jobs.map((job) => {
            const mc = matchColor(job.match)
            const isSaved = savedJobs.includes(job.title)

            return (
              <div key={job.title} className={`card-hover p-5 group ${job.featured ? 'border-accent/30' : ''}`}>
                {job.featured && (
                  <div className="flex items-center gap-1.5 mb-3">
                    <Cpu size={11} className="text-accent" />
                    <span className="text-[10px] font-display font-bold text-accent uppercase tracking-wider">
                      Top AI Match
                    </span>
                  </div>
                )}

                <div className="flex items-start gap-4">
                  {/* Company logo */}
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-display font-bold text-lg shrink-0 shadow-card"
                    style={{ backgroundColor: job.logoColor }}
                  >
                    {job.logo}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-start gap-2 mb-1">
                      <h3 className="font-display font-semibold text-text text-base">{job.title}</h3>
                      <span className={`badge border text-[10px] ${typeColor[job.type] || typeColor['Full-time']}`}>
                        {job.type}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 text-sm text-muted mb-3">
                      <span className="flex items-center gap-1"><Building2 size={12} /> {job.company}</span>
                      <span className="flex items-center gap-1"><MapPin size={12} /> {job.location}</span>
                      <span className="flex items-center gap-1"><DollarSign size={12} /> {job.salary}</span>
                      <span className="flex items-center gap-1"><Clock size={12} /> {job.posted}</span>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                      {job.tags.map((tag) => (
                        <span key={tag} className="px-2 py-0.5 rounded-md bg-border/50 text-text-dim text-[11px] font-body border border-border/40">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Right: match + actions */}
                  <div className="flex flex-col items-end gap-3 shrink-0">
                    <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-sm font-display font-bold ${mc.bg} ${mc.text}`}>
                      <Cpu size={12} />
                      {job.match}% match
                    </div>

                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => toggleSave(job.title)}
                        className={`p-2 rounded-lg border transition-all ${
                          isSaved
                            ? 'bg-amber-500/15 border-amber-500/25 text-amber-400'
                            : 'border-border/60 text-muted hover:border-accent/40 hover:text-accent'
                        }`}
                      >
                        <Star size={14} fill={isSaved ? 'currentColor' : 'none'} />
                      </button>
                      <button className="p-2 rounded-lg border border-border/60 text-muted hover:border-accent/40 hover:text-accent transition-all">
                        <ExternalLink size={14} />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Apply bar */}
                <div className="mt-4 pt-4 border-t border-border/40 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-1.5 w-24 bg-border/60 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${mc.text === 'text-emerald-400' ? 'bg-emerald-500' : 'bg-accent'}`}
                        style={{ width: `${job.match}%` }}
                      />
                    </div>
                    <span className="text-[11px] text-muted font-body">Resume fit score</span>
                  </div>
                  <button className="btn-primary text-xs py-2 px-5 flex items-center gap-1.5">
                    Apply Now <ExternalLink size={11} />
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </DashboardLayout>
  )
}
