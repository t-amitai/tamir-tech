export interface Language {
  name: string;
  color: string;
}

export interface LanguageEdge {
  size: number;
  node: Language;
}

export interface GitHubRepoAnalyticsData {
  repository: {
    name: string;
    url: string;
    languages: {
      edges: LanguageEdge[];
    };
  };
}

export interface AggregatedLanguage {
  name: string;
  color: string;
  fill: string;
  size: number;
  percentage: number;
}

export interface LighthouseScores {
  performance: number;
  accessibility: number;
  bestPractices: number;
  seo: number;
}

export interface LighthouseMetrics {
  firstContentfulPaint: number;
  largestContentfulPaint: number;
  totalBlockingTime: number;
  cumulativeLayoutShift: number;
  speedIndex: number;
}

export interface LighthouseData {
  scores: LighthouseScores;
  metrics: LighthouseMetrics;
  fetchedAt: string;
  cached: boolean;
}
