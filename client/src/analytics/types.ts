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
  size: number;
  percentage: number;
}
