import { useState, useMemo } from 'react';
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

function PlaceholderTab({ name }: { name: string }) {
  return (
    <div className="text-center py-16">
      <p className="text-gray-400 text-sm">{name} analytics coming soon.</p>
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
          {activeTab === 'lighthouse' && <PlaceholderTab name="Lighthouse" />}
        </div>
      </div>
    </section>
  );
}
