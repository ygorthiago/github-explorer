import { useEffect, useState } from 'react';
import { Link, useMatch } from 'react-router-dom';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { BiGitPullRequest } from 'react-icons/bi';
import { VscIssues } from 'react-icons/vsc';
import api from '../../services/api';

import { Header, RepositoryInfo, Issues } from './styles';

interface Repository {
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

interface Issue {
  id: number;
  title: string;
  html_url: string;
  pull_request: Object;
  user: {
    login: string;
  };
}

export function Repository() {
  const [repository, setRepository] = useState<Repository | null>(null);
  const [issues, setIssues] = useState<Issue[]>([]);

  const match = useMatch('/repository/:repository*');

  const pathName = match?.pathname.replace('/repository/', '')

  useEffect(() => {
    api.get(`/repos/${pathName}`).then(response => {
      setRepository(response.data);
    });

    api.get(`/repos/${pathName}/issues`, {
      params: {
        page: 1,
        per_page: 10,
        sort: 'updated-desc'
      }
    }).then(response => {
      setIssues(response.data);
    });
  }, [pathName]);

  return (
    <>
      <Header>
        <Link to="/">
          <FiChevronLeft size={16} />
          Go back
        </Link>
      </Header>

      {repository && (
        <RepositoryInfo>
          <header>
            <img
              src={repository.owner.avatar_url}
              alt={repository.owner.login}
            />
            <div>
              <a href={repository.html_url} target="_blank">{repository.full_name}</a>
              <p>{repository.description}</p>
            </div>
          </header>
          <ul>
            <li>
              <strong>{repository.stargazers_count}</strong>
              <span>Stars</span>
            </li>
            <li>
              <strong>{repository.forks_count}</strong>
              <span>Forks</span>
            </li>
            <li>
              <strong>{repository.open_issues_count}</strong>
              <span>Issues/PRs open</span>
            </li>
            <li>
              <strong>{repository.watchers_count}</strong>
              <span>Watchers</span>
            </li>
          </ul>
        </RepositoryInfo>
      )}

      {!!issues.length && (
      <Issues>
        <h2>Trending open issues/pull requests</h2>
        {issues.map(issue => (
          <a key={issue.id} href={issue.html_url} target="_blank">
            {issue.pull_request ? <BiGitPullRequest /> : <VscIssues />}
            <div>
              <strong>{issue.title}</strong>
              <p>{issue.user.login}</p>
            </div>
            <FiChevronRight size={20} />
          </a>
        ))}
      </Issues>
      )}
    </>
  );
};