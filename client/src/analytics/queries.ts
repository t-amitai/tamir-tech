import { gql } from '@apollo/client';

export const GITHUB_REPO_QUERY = gql`
  query GitHubRepoAnalytics($owner: String!, $name: String!) {
    repository(owner: $owner, name: $name) {
      name
      url
      languages(first: 10, orderBy: { field: SIZE, direction: DESC }) {
        edges {
          size
          node {
            name
            color
          }
        }
      }
    }
  }
`;
