import { IRepository, IRepositoryIssue } from "../types"

export const mockedRepository: IRepository = {
  full_name: 'repository/test',
  html_url: 'https://github.com/owner/repository/test',
  description: 'repo description',
  stargazers_count: 10,
  forks_count: 1,
  open_issues_count: 12,
  watchers_count: 90,
  owner: {
    login: 'owner',
    avatar_url: 'https://github.com/owner/image.jpg',
  }
}

export const mockedRepositoryIssues: IRepositoryIssue = {
  id: 1,
  title: 'Repo issue',
  html_url: 'https://github.com/owner/repository/test/issue',
  user: {
    login: 'owner',
  },
}

export const mockedRepositoryIssuesWithPR: IRepositoryIssue = {
  id: 2,
  title: 'Repo issue',
  html_url: 'https://github.com/owner/repository/test/issue',
  pull_request: 'https://github.com/owner/repository/pr',
  user: {
    login: 'owner',
  },
}

export const mockedRepositoryList: IRepository[] = [
  {
    full_name: 'repository/test1',
    html_url: 'https://github.com/owner/repository/test',
    description: 'repo description',
    stargazers_count: 10,
    forks_count: 1,
    open_issues_count: 12,
    watchers_count: 90,
    owner: {
      login: 'owner',
      avatar_url: 'https://github.com/owner/image.jpg',
    }
  },
  {
    full_name: 'repository/test2',
    html_url: 'https://github.com/owner/repository/test',
    description: 'repo description',
    stargazers_count: 10,
    forks_count: 1,
    open_issues_count: 12,
    watchers_count: 90,
    owner: {
      login: 'owner',
      avatar_url: 'https://github.com/owner/image.jpg',
    }
  },
  {
    full_name: 'repository/test3',
    html_url: 'https://github.com/owner/repository/test',
    description: 'repo description',
    stargazers_count: 10,
    forks_count: 1,
    open_issues_count: 12,
    watchers_count: 90,
    owner: {
      login: 'owner',
      avatar_url: 'https://github.com/owner/image.jpg',
    }
  },
  {
    full_name: 'repository/test4',
    html_url: 'https://github.com/owner/repository/test',
    description: 'repo description',
    stargazers_count: 10,
    forks_count: 1,
    open_issues_count: 12,
    watchers_count: 90,
    owner: {
      login: 'owner',
      avatar_url: 'https://github.com/owner/image.jpg',
    }
  },
  {
    full_name: 'repository/test5',
    html_url: 'https://github.com/owner/repository/test',
    description: 'repo description',
    stargazers_count: 10,
    forks_count: 1,
    open_issues_count: 12,
    watchers_count: 90,
    owner: {
      login: 'owner',
      avatar_url: 'https://github.com/owner/image.jpg',
    }
  },
  {
    full_name: 'repository/test6',
    html_url: 'https://github.com/owner/repository/test',
    description: 'repo description',
    stargazers_count: 10,
    forks_count: 1,
    open_issues_count: 12,
    watchers_count: 90,
    owner: {
      login: 'owner',
      avatar_url: 'https://github.com/owner/image.jpg',
    }
  },
]