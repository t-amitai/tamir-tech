import { useState, useMemo, useCallback } from 'react';
import { useQuery } from '@apollo/client/react';
import {
  PieChart,
  Pie,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { GITHUB_REPO_QUERY } from '../analytics/queries';
import type {
  GitHubRepoAnalyticsData,
  AggregatedLanguage,
  LanguageEdge,
  LighthouseData,
} from '../analytics/types';

const GITHUB_OWNER = 't-amitai';
const GITHUB_REPO = 'tamir-tech';

type Tab = 'github' | 'lighthouse';

const TABS: { key: Tab; label: string }[] = [
  { key: 'github', label: 'GitHub' },
  { key: 'lighthouse', label: 'Lighthouse' },
];

function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center py-16">
      <div className="w-8 h-8 border-2 border-gray-400 border-t-white rounded-full animate-spin" />
    </div>
  );
}

function ErrorMessage({ message }: { message: string }) {
  return (
    <div className="text-red-400 text-center py-8">
      <p className="text-lg mb-2">Something went wrong</p>
      <p className="text-sm">{message}</p>
    </div>
  );
}

function LanguageChart({ edges }: { edges: LanguageEdge[] }) {
  const languages = useMemo<AggregatedLanguage[]>(() => {
    const total = edges.reduce((sum, e) => sum + e.size, 0);
    return edges.map((edge) => ({
      name: edge.node.name,
      color: edge.node.color,
      fill: edge.node.color || '#6b7280',
      size: edge.size,
      percentage: Math.round((edge.size / total) * 1000) / 10,
    }));
  }, [edges]);

  return (
    <div className="flex flex-col sm:flex-row items-center gap-4">
      <ResponsiveContainer width="100%" height={220}>
        <PieChart>
          <Pie
            data={languages}
            dataKey="percentage"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius={50}
            outerRadius={90}
            paddingAngle={2}
            stroke="none"
          />
          <Tooltip
            contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '0.5rem' }}
            itemStyle={{ color: '#d1d5db' }}
            formatter={(value) => `${value}%`}
          />
        </PieChart>
      </ResponsiveContainer>
      <div className="flex flex-wrap gap-x-4 gap-y-1 justify-center">
        {languages.map((lang) => (
          <span key={lang.name} className="flex items-center gap-1 text-xs text-gray-300">
            <span
              className="w-2 h-2 rounded-full inline-block"
              style={{ backgroundColor: lang.color || '#6b7280' }}
            />
            {lang.name} ({lang.percentage}%)
          </span>
        ))}
      </div>
    </div>
  );
}

function GitHubTab() {
  const { data, loading, error } = useQuery<GitHubRepoAnalyticsData>(GITHUB_REPO_QUERY, {
    variables: { owner: GITHUB_OWNER, name: GITHUB_REPO },
  });

  return (
    <div>
      {data && (
        <p className="text-gray-400 text-sm mb-6">
          Language breakdown for{' '}
          <a
            href={data.repository.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:underline"
          >
            {GITHUB_OWNER}/{GITHUB_REPO}
          </a>
          , fetched in real-time via GraphQL.
        </p>
      )}
      {loading && <LoadingSpinner />}
      {error && <ErrorMessage message={error.message} />}
      {data && <LanguageChart edges={data.repository.languages.edges} />}
    </div>
  );
}

function ScoreCircle({ label, score }: { label: string; score: number }) {
  const radius = 36;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;
  const color = score >= 90 ? '#22c55e' : score >= 50 ? '#f59e0b' : '#ef4444';

  return (
    <div className="flex flex-col items-center gap-2">
      <svg width="88" height="88" viewBox="0 0 88 88">
        <circle cx="44" cy="44" r={radius} fill="none" stroke="#374151" strokeWidth="6" />
        <circle
          cx="44"
          cy="44"
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          transform="rotate(-90 44 44)"
        />
        <text x="44" y="44" textAnchor="middle" dominantBaseline="central" fill={color} fontSize="20" fontWeight="bold">
          {score}
        </text>
      </svg>
      <span className="text-xs text-gray-400">{label}</span>
    </div>
  );
}

function MetricCard({ label, value, unit }: { label: string; value: number; unit: string }) {
  return (
    <div className="bg-gray-800/60 rounded-lg p-4">
      <p className="text-gray-400 text-xs mb-1">{label}</p>
      <p className="text-white text-lg font-semibold">
        {value}
        <span className="text-gray-400 text-sm ml-1">{unit}</span>
      </p>
    </div>
  );
}

function LighthouseTab() {
  const [state, setState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [data, setData] = useState<LighthouseData | null>(null);
  const [error, setError] = useState('');

  const runAudit = useCallback(async () => {
    setState('loading');
    setError('');
    try {
      const res = await fetch('/lighthouse');
      if (!res.ok) {
        const body = await res.json().catch(() => null);
        throw new Error(body?.error || `Request failed (${res.status})`);
      }
      setData(await res.json());
      setState('success');
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Unknown error');
      setState('error');
    }
  }, []);

  if (state === 'idle') {
    return (
      <div className="text-center py-16">
        <p className="text-gray-400 text-sm mb-4">
          Run a Lighthouse audit against <span className="text-gray-200">tamir.tech</span> via Google PageSpeed Insights.
        </p>
        <button
          onClick={runAudit}
          className="px-5 py-2.5 bg-white text-gray-900 text-sm font-medium rounded-lg hover:bg-gray-200 transition"
        >
          Run Lighthouse Audit
        </button>
      </div>
    );
  }

  if (state === 'loading') {
    return (
      <div className="flex flex-col items-center py-16 gap-3">
        <LoadingSpinner />
        <p className="text-gray-400 text-sm">Running audit... this may take up to 30 seconds</p>
      </div>
    );
  }

  if (state === 'error') {
    return (
      <div>
        <ErrorMessage message={error} />
        <div className="text-center mt-4">
          <button
            onClick={runAudit}
            className="text-sm text-blue-400 hover:underline"
          >
            Try again
          </button>
        </div>
      </div>
    );
  }

  const { scores, metrics, fetchedAt, cached } = data!;

  return (
    <div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        <ScoreCircle label="Performance" score={scores.performance} />
        <ScoreCircle label="Accessibility" score={scores.accessibility} />
        <ScoreCircle label="Best Practices" score={scores.bestPractices} />
        <ScoreCircle label="SEO" score={scores.seo} />
      </div>

      <div className="grid grid-cols-2 gap-3 mb-6">
        <MetricCard label="First Contentful Paint" value={metrics.firstContentfulPaint} unit="s" />
        <MetricCard label="Largest Contentful Paint" value={metrics.largestContentfulPaint} unit="s" />
        <MetricCard label="Total Blocking Time" value={metrics.totalBlockingTime} unit="ms" />
        <MetricCard label="Cumulative Layout Shift" value={metrics.cumulativeLayoutShift} unit="" />
        <MetricCard label="Speed Index" value={metrics.speedIndex} unit="s" />
      </div>

      <div className="flex items-center justify-between text-xs text-gray-500">
        <span>
          {new Date(fetchedAt).toLocaleString()}
          {cached && <span className="ml-2 text-gray-600">(cached)</span>}
        </span>
        <button onClick={runAudit} className="text-blue-400 hover:underline">
          Re-run audit
        </button>
      </div>
    </div>
  );
}

export default function Analytics() {
  const [activeTab, setActiveTab] = useState<Tab>('github');

  return (
    <section className="max-w-screen-md mx-auto px-4 py-8 sm:py-16 md:py-24">
      <div className="bg-gray-900/90 backdrop-blur-sm rounded-xl border border-gray-800 overflow-hidden">
        <div className="border-b border-gray-800">
          <nav className="flex">
            {TABS.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex-1 py-3 text-sm font-medium transition ${
                  activeTab === tab.key
                    ? 'text-white border-b-2 border-white'
                    : 'text-gray-400 hover:text-gray-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
        <div className="p-6 sm:p-8">
          {activeTab === 'github' && <GitHubTab />}
          {activeTab === 'lighthouse' && <LighthouseTab />}
        </div>
      </div>
    </section>
  );
}
