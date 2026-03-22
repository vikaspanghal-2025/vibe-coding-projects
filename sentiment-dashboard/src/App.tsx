import { useState } from 'react'
import { dynamodbData, keyspacesData, cassandraGithub } from './data'
import type { ProductData } from './data'
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, RadarChart, Radar, PolarGrid,
  PolarAngleAxis, PolarRadiusAxis, AreaChart, Area, CartesianGrid,
  Treemap
} from 'recharts'

type Product = 'dynamodb' | 'keyspaces'

const products: Record<Product, { label: string; accent: string; gradient: string }> = {
  dynamodb: { label: 'Amazon DynamoDB', accent: '#3b82f6', gradient: 'linear-gradient(135deg, #3b82f6, #06b6d4)' },
  keyspaces: { label: 'Amazon Keyspaces', accent: '#8b5cf6', gradient: 'linear-gradient(135deg, #8b5cf6, #ec4899)' },
}

// Light theme palette
const C = {
  bg: '#f5f0eb',
  surface: '#ffffff',
  border: '#e5e0db',
  text: '#1d1d1f',
  text2: '#6e6e73',
  gridStroke: '#d1cdc8',
}

function App() {
  const [active, setActive] = useState<Product>('dynamodb')
  const data: ProductData = active === 'dynamodb' ? dynamodbData : keyspacesData
  const p = products[active]

  return (
    <div style={{ minHeight: '100vh', background: C.bg }}>
      <header style={{ textAlign: 'center', padding: '80px 24px 40px', position: 'relative' }}>
        <div style={{
          position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
          width: 600, height: 600, background: p.gradient, opacity: 0.08,
          borderRadius: '50%', filter: 'blur(120px)', pointerEvents: 'none'
        }} />
        <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1.1, color: C.text }}>
          Market & Customer<br />Sentiment Dashboard
        </h1>
        <p style={{ color: C.text2, fontSize: '1.15rem', marginTop: 16, maxWidth: 600, margin: '16px auto 0' }}>
          Real-time sentiment analysis from Reddit, StackOverflow, G2, PeerSpot, LinkedIn, X, Discord, and community forums.
        </p>
        <div style={{
          display: 'inline-flex', gap: 4, marginTop: 40, padding: 4,
          background: C.surface, borderRadius: 14, border: `1px solid ${C.border}`, boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
        }}>
          {(Object.keys(products) as Product[]).map(key => (
            <button key={key} onClick={() => setActive(key)} style={{
              padding: '12px 28px', borderRadius: 10, border: 'none', cursor: 'pointer',
              fontSize: '0.95rem', fontWeight: 600, transition: 'all 0.3s',
              background: active === key ? products[key].accent : 'transparent',
              color: active === key ? '#fff' : C.text2,
            }}>
              {products[key].label}
            </button>
          ))}
        </div>
      </header>

      <main style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px 80px' }}>

        {/* Section 1: Use Cases */}
        <Section title="Top Use Cases" subtitle="Distribution of primary use cases discussed across public forums">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32, alignItems: 'center' }}>
            <ResponsiveContainer width="100%" height={380}>
              <PieChart>
                <Pie data={data.useCases} dataKey="value" nameKey="name" cx="50%" cy="50%"
                  outerRadius={150} innerRadius={70} paddingAngle={2} stroke="none">
                  {data.useCases.map((entry, i) => <Cell key={i} fill={entry.fill} />)}
                </Pie>
                <Tooltip contentStyle={tooltipStyle} />
              </PieChart>
            </ResponsiveContainer>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {data.useCases.map((uc, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ width: 10, height: 10, borderRadius: '50%', background: uc.fill, flexShrink: 0 }} />
                  <span style={{ flex: 1, fontSize: '0.9rem', color: C.text }}>{uc.name}</span>
                  <span style={{ color: C.text2, fontSize: '0.85rem' }}>{uc.value.toLocaleString()} mentions</span>
                </div>
              ))}
            </div>
          </div>
        </Section>

        {/* Section 2: Why Customers Choose */}
        <Section title="Why Customers Choose This Product" subtitle="Top categories by total community mentions">
          <ResponsiveContainer width="100%" height={420}>
            <BarChart data={data.whyChoose} layout="vertical" margin={{ left: 200 }}>
              <XAxis type="number" stroke={C.gridStroke} tick={{ fill: C.text2, fontSize: 12 }} />
              <YAxis type="category" dataKey="category" stroke="none" tick={{ fill: C.text, fontSize: 13 }} width={195} />
              <Tooltip contentStyle={tooltipStyle} />
              <Bar dataKey="mentions" radius={[0, 6, 6, 0]} fill={p.accent} />
            </BarChart>
          </ResponsiveContainer>
        </Section>

        {/* Section 3: Top Features */}
        <Section title="Top Features Discussed" subtitle="Feature mentions and sentiment score (0-100)">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32 }}>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={data.topFeatures} layout="vertical" margin={{ left: 160 }}>
                <XAxis type="number" stroke={C.gridStroke} tick={{ fill: C.text2, fontSize: 12 }} />
                <YAxis type="category" dataKey="feature" stroke="none" tick={{ fill: C.text, fontSize: 12 }} width={155} />
                <Tooltip contentStyle={tooltipStyle} />
                <Bar dataKey="mentions" radius={[0, 6, 6, 0]} fill={p.accent} />
              </BarChart>
            </ResponsiveContainer>
            <ResponsiveContainer width="100%" height={400}>
              <RadarChart data={data.topFeatures.slice(0, 8)} cx="50%" cy="50%" outerRadius="70%">
                <PolarGrid stroke={C.border} />
                <PolarAngleAxis dataKey="feature" tick={{ fill: C.text2, fontSize: 10 }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: C.text2, fontSize: 10 }} />
                <Radar name="Sentiment" dataKey="sentiment" stroke={p.accent} fill={p.accent} fillOpacity={0.25} />
                <Tooltip contentStyle={tooltipStyle} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </Section>

        {/* Section 4: Pain Points */}
        <Section title="Top Pain Points" subtitle="Most discussed issues and their severity">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32 }}>
            <ResponsiveContainer width="100%" height={420}>
              <BarChart data={data.painPoints} layout="vertical" margin={{ left: 220 }}>
                <XAxis type="number" stroke={C.gridStroke} tick={{ fill: C.text2, fontSize: 12 }} />
                <YAxis type="category" dataKey="issue" stroke="none" tick={{ fill: C.text, fontSize: 12 }} width={215} />
                <Tooltip contentStyle={tooltipStyle} />
                <Bar dataKey="mentions" radius={[0, 6, 6, 0]}>
                  {data.painPoints.map((pp, i) => (
                    <Cell key={i} fill={pp.severity === 'high' ? '#ef4444' : pp.severity === 'medium' ? '#f59e0b' : '#22c55e'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, justifyContent: 'center' }}>
              {data.painPoints.map((pp, i) => (
                <div key={i} style={{
                  display: 'flex', alignItems: 'center', gap: 12, padding: '10px 16px',
                  background: C.surface, borderRadius: 10, border: `1px solid ${C.border}`, boxShadow: '0 1px 3px rgba(0,0,0,0.04)'
                }}>
                  <SeverityBadge severity={pp.severity} />
                  <span style={{ flex: 1, fontSize: '0.88rem', color: C.text }}>{pp.issue}</span>
                  <span style={{ color: C.text2, fontSize: '0.82rem' }}>{pp.mentions.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>
        </Section>

        {/* Section 5: Feature Requests */}
        <Section title="Most Requested Features" subtitle="Community votes and current status">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 12 }}>
            {data.featureRequests.map((fr, i) => (
              <div key={i} style={{
                display: 'grid', gridTemplateColumns: '40px 1fr 120px 180px', alignItems: 'center',
                gap: 16, padding: '14px 20px', background: C.surface, borderRadius: 12,
                border: `1px solid ${C.border}`, boxShadow: '0 1px 3px rgba(0,0,0,0.04)'
              }}>
                <span style={{ color: C.text2, fontSize: '0.85rem', fontWeight: 600 }}>#{i + 1}</span>
                <span style={{ fontSize: '0.95rem', color: C.text }}>{fr.feature}</span>
                <span style={{ color: p.accent, fontWeight: 600, fontSize: '0.9rem' }}>
                  {fr.votes.toLocaleString()} votes
                </span>
                <StatusBadge status={fr.status} />
              </div>
            ))}
          </div>
        </Section>

        {/* Section 6: Key Takeaways */}
        <Section title="Key Takeaways" subtitle="Summary insights from across all sources">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            {data.keyTakeaways.map((kt, i) => (
              <div key={i} style={{
                padding: '24px', background: C.surface, borderRadius: 16,
                border: `1px solid ${kt.type === 'positive' ? '#22c55e44' : kt.type === 'negative' ? '#ef444444' : C.border}`,
                borderLeft: `3px solid ${kt.type === 'positive' ? '#22c55e' : kt.type === 'negative' ? '#ef4444' : C.text2}`,
                boxShadow: '0 1px 3px rgba(0,0,0,0.04)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                  <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', fontWeight: 600, letterSpacing: '0.05em',
                    color: kt.type === 'positive' ? '#16a34a' : kt.type === 'negative' ? '#dc2626' : C.text2
                  }}>
                    {kt.type === 'positive' ? '▲ Positive' : kt.type === 'negative' ? '▼ Negative' : '● Neutral'}
                  </span>
                </div>
                <h4 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: 8, color: C.text }}>{kt.title}</h4>
                <p style={{ color: C.text2, fontSize: '0.88rem', lineHeight: 1.6 }}>{kt.detail}</p>
              </div>
            ))}
          </div>
        </Section>

        {/* Section 7: Cassandra GitHub (Keyspaces only) */}
        {active === 'keyspaces' && (
          <Section title="Apache Cassandra GitHub Trends" subtitle="Open source project health and commit activity">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 32 }}>
              <StatCard label="Stars" value={cassandraGithub.stars.toLocaleString()} icon="⭐" />
              <StatCard label="Forks" value={cassandraGithub.forks.toLocaleString()} icon="🍴" />
              <StatCard label="Contributors" value={cassandraGithub.contributors.toString()} icon="👥" />
              <StatCard label="Open PRs" value={cassandraGithub.openPRs.toString()} icon="🔀" />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32 }}>
              <div>
                <h4 style={{ fontSize: '0.95rem', fontWeight: 600, marginBottom: 16, color: C.text2 }}>Monthly Commit Activity</h4>
                <ResponsiveContainer width="100%" height={280}>
                  <AreaChart data={cassandraGithub.monthlyCommits}>
                    <CartesianGrid strokeDasharray="3 3" stroke={C.border} />
                    <XAxis dataKey="month" stroke={C.gridStroke} tick={{ fill: C.text2, fontSize: 11 }} />
                    <YAxis stroke={C.gridStroke} tick={{ fill: C.text2, fontSize: 11 }} />
                    <Tooltip contentStyle={tooltipStyle} />
                    <Area type="monotone" dataKey="commits" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.15} strokeWidth={2} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              <div>
                <h4 style={{ fontSize: '0.95rem', fontWeight: 600, marginBottom: 16, color: C.text2 }}>Top Commit Areas (Trailing 12mo)</h4>
                <ResponsiveContainer width="100%" height={280}>
                  <BarChart data={cassandraGithub.topAreas} layout="vertical" margin={{ left: 160 }}>
                    <XAxis type="number" stroke={C.gridStroke} tick={{ fill: C.text2, fontSize: 11 }} />
                    <YAxis type="category" dataKey="area" stroke="none" tick={{ fill: C.text, fontSize: 11 }} width={155} />
                    <Tooltip contentStyle={tooltipStyle} />
                    <Bar dataKey="commits" radius={[0, 6, 6, 0]} fill="#8b5cf6" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
            <h4 style={{ fontSize: '0.95rem', fontWeight: 600, margin: '32px 0 16px', color: C.text2 }}>Recent Releases</h4>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 12 }}>
              {cassandraGithub.releases.map((r, i) => (
                <div key={i} style={{
                  padding: '16px 20px', background: C.surface, borderRadius: 12,
                  border: `1px solid ${C.border}`, boxShadow: '0 1px 3px rgba(0,0,0,0.04)'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                    <span style={{ fontWeight: 700, color: '#8b5cf6' }}>{r.version}</span>
                    <span style={{ color: C.text2, fontSize: '0.82rem' }}>{r.date}</span>
                  </div>
                  <p style={{ color: C.text2, fontSize: '0.85rem', lineHeight: 1.5 }}>{r.highlights}</p>
                </div>
              ))}
            </div>
          </Section>
        )}

        <div style={{ textAlign: 'center', padding: '60px 0 0', color: C.text2, fontSize: '0.82rem' }}>
          Data sourced from Reddit, StackOverflow, G2, PeerSpot, HackerNoon, dev.to, Medium, LinkedIn, X, GitHub, and AWS community forums.
          <br />Last updated: March 2026
        </div>
      </main>
    </div>
  )
}

function Section({ title, subtitle, children }: { title: string; subtitle: string; children: React.ReactNode }) {
  return (
    <section style={{ marginTop: 64 }}>
      <h2 style={{ fontSize: 'clamp(1.4rem, 3vw, 2rem)', fontWeight: 700, letterSpacing: '-0.02em', color: C.text }}>{title}</h2>
      <p style={{ color: C.text2, fontSize: '0.95rem', marginTop: 4, marginBottom: 28 }}>{subtitle}</p>
      {children}
    </section>
  )
}

function SeverityBadge({ severity }: { severity: string }) {
  const colors: Record<string, string> = { high: '#ef4444', medium: '#f59e0b', low: '#22c55e' }
  return (
    <span style={{
      padding: '3px 10px', borderRadius: 6, fontSize: '0.72rem', fontWeight: 700,
      textTransform: 'uppercase', background: `${colors[severity]}18`, color: colors[severity]
    }}>
      {severity}
    </span>
  )
}

function StatusBadge({ status }: { status: string }) {
  const color = status.includes('Progress') ? '#3b82f6' : status.includes('Partial') ? '#f59e0b'
    : status.includes('Roadmap') ? '#22c55e' : status.includes('Cancelled') ? '#ef4444'
    : status.includes('Hold') ? '#f59e0b' : status.includes('Unlikely') ? '#ef4444' : C.text2
  return (
    <span style={{
      padding: '4px 12px', borderRadius: 8, fontSize: '0.78rem', fontWeight: 600,
      background: `${color}14`, color, textAlign: 'center'
    }}>
      {status}
    </span>
  )
}

function StatCard({ label, value, icon }: { label: string; value: string; icon: string }) {
  return (
    <div style={{
      padding: '20px', background: C.surface, borderRadius: 14, border: `1px solid ${C.border}`,
      textAlign: 'center', boxShadow: '0 1px 3px rgba(0,0,0,0.04)'
    }}>
      <div style={{ fontSize: '1.5rem', marginBottom: 4 }}>{icon}</div>
      <div style={{ fontSize: '1.6rem', fontWeight: 700, color: C.text }}>{value}</div>
      <div style={{ color: C.text2, fontSize: '0.85rem', marginTop: 2 }}>{label}</div>
    </div>
  )
}

const tooltipStyle: React.CSSProperties = {
  background: C.surface, border: `1px solid ${C.border}`, borderRadius: 10,
  color: C.text, fontSize: '0.85rem', padding: '8px 14px', boxShadow: '0 4px 12px rgba(0,0,0,0.08)'
}

export default App
