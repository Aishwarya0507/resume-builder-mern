import { useState } from 'react'
import DashboardLayout from '../components/DashboardLayout'
import {
  Upload, FileText, Cpu, BarChart3, CheckCircle,
  AlertTriangle, XCircle, TrendingUp, Target, Lightbulb
} from 'lucide-react'

const scoreCategories = [
  { label: 'Keyword Match', score: 88, icon: Target },
  { label: 'Formatting', score: 95, icon: FileText },
  { label: 'Readability', score: 76, icon: BarChart3 },
  { label: 'Completeness', score: 82, icon: CheckCircle },
  { label: 'Impact Statements', score: 64, icon: TrendingUp },
]

const suggestions = [
  { type: 'success', text: 'Strong action verbs used throughout experience section', icon: CheckCircle },
  { type: 'success', text: 'Contact information is complete and well-formatted', icon: CheckCircle },
  { type: 'warning', text: 'Add more quantifiable achievements (only 2 of 6 bullets have metrics)', icon: AlertTriangle },
  { type: 'warning', text: 'Missing keywords: "agile", "CI/CD", "microservices" from job description', icon: AlertTriangle },
  { type: 'error', text: 'Summary section is too generic — personalize for the target role', icon: XCircle },
  { type: 'error', text: 'Skills section lacks proficiency levels', icon: XCircle },
]

const typeStyles = {
  success: 'border-emerald-500/25 bg-emerald-500/8 text-emerald-400',
  warning: 'border-amber-500/25 bg-amber-500/8 text-amber-400',
  error: 'border-rose-500/25 bg-rose-500/8 text-rose-400',
}

const barColor = (score) => {
  if (score >= 80) return 'bg-emerald-500'
  if (score >= 65) return 'bg-amber-500'
  return 'bg-rose-500'
}

export default function AnalyzeResume() {
  const [uploaded, setUploaded] = useState(false)
  const [analyzing, setAnalyzing] = useState(false)
  const [analyzed, setAnalyzed] = useState(false)
  const [dragging, setDragging] = useState(false)

  const handleAnalyze = () => {
    setAnalyzing(true)
    setTimeout(() => { setAnalyzing(false); setAnalyzed(true) }, 2000)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setDragging(false)
    setUploaded(true)
  }

  const overallScore = Math.round(scoreCategories.reduce((acc, c) => acc + c.score, 0) / scoreCategories.length)

  return (
    <DashboardLayout>
      <div className="max-w-5xl mx-auto space-y-6">
        <div>
          <h1 className="font-display font-bold text-2xl text-text">Analyze Resume</h1>
          <p className="text-sm text-muted mt-1 font-body">Get an instant AI-powered ATS score and actionable improvements.</p>
        </div>

        {!analyzed ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Upload */}
            <div className="card p-6 space-y-5">
              <h2 className="font-display font-semibold text-text flex items-center gap-2">
                <Upload size={16} className="text-accent-light" />
                Upload Resume
              </h2>

              <div
                onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
                onDragLeave={() => setDragging(false)}
                onDrop={handleDrop}
                onClick={() => setUploaded(true)}
                className={`border-2 border-dashed rounded-2xl p-10 text-center cursor-pointer transition-all duration-200 ${
                  dragging
                    ? 'border-accent bg-accent/10'
                    : uploaded
                    ? 'border-emerald-500/50 bg-emerald-500/8'
                    : 'border-border/60 hover:border-accent/40 hover:bg-accent/5'
                }`}
              >
                {uploaded ? (
                  <div className="space-y-2">
                    <div className="w-14 h-14 bg-emerald-500/15 rounded-2xl flex items-center justify-center mx-auto border border-emerald-500/25">
                      <FileText size={24} className="text-emerald-400" />
                    </div>
                    <p className="font-display font-semibold text-text">resume_johndoe.pdf</p>
                    <p className="text-xs text-muted">245 KB • PDF</p>
                    <button className="text-xs text-rose-400 hover:text-rose-300 font-display font-medium transition-colors"
                      onClick={(e) => { e.stopPropagation(); setUploaded(false) }}>
                      Remove file
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="w-14 h-14 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto border border-accent/20">
                      <Upload size={22} className="text-accent-light" />
                    </div>
                    <div>
                      <p className="font-display font-semibold text-text">Drop your resume here</p>
                      <p className="text-xs text-muted mt-1">or click to browse</p>
                    </div>
                    <p className="text-[11px] text-muted">PDF, DOCX up to 10MB</p>
                  </div>
                )}
              </div>

              {/* Or from existing */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border/60" />
                </div>
                <div className="relative text-center">
                  <span className="bg-card px-3 text-xs text-muted font-body">or select existing</span>
                </div>
              </div>

              <div className="space-y-2">
                {['Software Engineer', 'Full Stack Resume'].map((name) => (
                  <button
                    key={name}
                    onClick={() => setUploaded(true)}
                    className="w-full flex items-center gap-3 p-3 rounded-xl border border-border/60 hover:border-accent/40 hover:bg-accent/5 transition-all group"
                  >
                    <div className="w-8 h-8 bg-accent/10 rounded-lg flex items-center justify-center">
                      <FileText size={15} className="text-accent-light" />
                    </div>
                    <span className="text-sm font-display font-medium text-text">{name}</span>
                    <span className="ml-auto text-xs text-muted group-hover:text-accent transition-colors">Select →</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Job Description */}
            <div className="card p-6 space-y-5">
              <h2 className="font-display font-semibold text-text flex items-center gap-2">
                <Target size={16} className="text-accent-light" />
                Target Job Description
              </h2>

              <div>
                <label className="block text-xs font-display font-semibold text-text-dim mb-2">Job Title</label>
                <input type="text" placeholder="e.g. Senior Software Engineer" className="input-field" />
              </div>

              <div>
                <label className="block text-xs font-display font-semibold text-text-dim mb-2">Company (optional)</label>
                <input type="text" placeholder="e.g. Google" className="input-field" />
              </div>

              <div>
                <label className="block text-xs font-display font-semibold text-text-dim mb-2">Paste Job Description</label>
                <textarea
                  rows={8}
                  placeholder="Paste the full job description here for the most accurate ATS analysis..."
                  className="input-field resize-none"
                />
              </div>

              <button
                onClick={handleAnalyze}
                disabled={!uploaded || analyzing}
                className="w-full btn-primary flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {analyzing ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Cpu size={16} />
                    Analyze with AI
                  </>
                )}
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Score Overview */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Overall score */}
              <div className="card border-accent/20 bg-accent/5 p-6 flex flex-col items-center justify-center text-center">
                <div className="relative w-28 h-28 mb-4">
                  <svg className="w-28 h-28 -rotate-90" viewBox="0 0 120 120">
                    <circle cx="60" cy="60" r="50" fill="none" stroke="#334155" strokeWidth="10" />
                    <circle
                      cx="60" cy="60" r="50" fill="none"
                      stroke="#6366f1" strokeWidth="10" strokeLinecap="round"
                      strokeDasharray={`${2 * Math.PI * 50}`}
                      strokeDashoffset={`${2 * Math.PI * 50 * (1 - overallScore / 100)}`}
                      className="transition-all duration-1000"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="font-display font-bold text-3xl text-text">{overallScore}</span>
                    <span className="text-[10px] text-muted">/ 100</span>
                  </div>
                </div>
                <p className="font-display font-bold text-text text-lg">Overall ATS Score</p>
                <p className="text-xs text-text-dim mt-1 font-body">Better than 74% of applicants</p>
                <span className="mt-3 badge bg-amber-500/15 border border-amber-500/25 text-amber-400">
                  Good — Can Improve
                </span>
              </div>

              {/* Category scores */}
              <div className="lg:col-span-2 card p-6">
                <h3 className="font-display font-semibold text-text mb-4 flex items-center gap-2">
                  <BarChart3 size={16} className="text-accent-light" />
                  Score Breakdown
                </h3>
                <div className="space-y-4">
                  {scoreCategories.map(({ label, score, icon: Icon }) => (
                    <div key={label}>
                      <div className="flex items-center justify-between mb-1.5">
                        <div className="flex items-center gap-2">
                          <Icon size={13} className="text-muted" />
                          <span className="text-sm font-body text-text-dim">{label}</span>
                        </div>
                        <span className={`text-sm font-display font-bold ${
                          score >= 80 ? 'text-emerald-400' : score >= 65 ? 'text-amber-400' : 'text-rose-400'
                        }`}>{score}%</span>
                      </div>
                      <div className="h-2 bg-border/60 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-700 ${barColor(score)}`}
                          style={{ width: `${score}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Suggestions */}
            <div className="card p-6">
              <h3 className="font-display font-semibold text-text mb-4 flex items-center gap-2">
                <Lightbulb size={16} className="text-accent-light" />
                AI Suggestions
                <span className="badge bg-accent/15 border border-accent/25 text-accent-light text-[10px] ml-2">
                  {suggestions.length} items
                </span>
              </h3>
              <div className="space-y-3">
                {suggestions.map((s, i) => (
                  <div key={i} className={`flex items-start gap-3 p-4 rounded-xl border ${typeStyles[s.type]}`}>
                    <s.icon size={16} className="mt-0.5 shrink-0" />
                    <p className="text-sm font-body flex-1">{s.text}</p>
                    {s.type !== 'success' && (
                      <button className="text-[11px] font-display font-semibold shrink-0 hover:underline transition-colors">
                        Fix →
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-4">
              <button onClick={() => { setAnalyzed(false); setUploaded(false) }} className="btn-secondary">
                Analyze Another
              </button>
              <button className="btn-primary flex items-center gap-2">
                <Cpu size={15} /> Auto-Fix with AI
              </button>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}
