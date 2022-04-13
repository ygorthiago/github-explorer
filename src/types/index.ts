export interface IRepository {
  full_name: string;
  html_url: string;
  description: string;
  stargazers_count: number;
  forks_count: number;
  open_issues_count: number;
  watchers_count: number
  owner: {
    login: string;
    avatar_url: string;
  };
}

export interface IRepositoryIssue {
  id: number;
  title: string;
  html_url: string;
  pull_request: Object;
  user: {
    login: string;
  };
}