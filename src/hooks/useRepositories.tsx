import { useCallback, useState } from "react";
import api from "../services/api";

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

interface IUseRepositoriesHook {
  repository: Repository | null
  getRepository: (repositoryName: string) => void
  isGetRepositoryLoading: boolean
  isGetRepositoryError: boolean
  issues: Issue[]
  getRepositoryIssues: (repositoryName: string) => void
  isGetRepositoryIssuesLoading: boolean
  isGetRepositoryIssuesError: boolean
}

export function useRepositoriesHook(): IUseRepositoriesHook {
  const [repository, setRepository] = useState<Repository | null>(null);
  const [isGetRepositoryLoading, setIsGetRepositoryLoading] = useState(false);
  const [isGetRepositoryError, setIsGetRepositoryError] = useState(false);

  const [issues, setIssues] = useState<Issue[]>([]);
  const [isGetRepositoryIssuesLoading, setIsGetRepositoryIssuesLoading] = useState(false);
  const [isGetRepositoryIssuesError, setIsGetRepositoryIssuesError] = useState(false);

  const getRepository = useCallback(async (repositoryName: string) => {
    setIsGetRepositoryError(false);
    setIsGetRepositoryLoading(true);

    try {
      const repository = await api.get<Repository>(`/repos/${repositoryName}`)

      setRepository(repository.data);
    } catch (err) {
      console.log(err)

      setIsGetRepositoryError(true)
    } finally {
      setIsGetRepositoryLoading(false);
    }
  }, []);

  const getRepositoryIssues = useCallback(async (repositoryName: string) => {
    setIsGetRepositoryIssuesError(false);
    setIsGetRepositoryIssuesLoading(true);

    try {
      const repositoryIssues = await api.get(`/repos/${repositoryName}/issues`, {
        params: {
          page: 1,
          per_page: 10,
          sort: 'updated-desc'
        }
      })

      setIssues(repositoryIssues.data);
    } catch (err) {
      console.log(err)

      setIsGetRepositoryIssuesError(true)
    } finally {
      setIsGetRepositoryIssuesLoading(false);
    }
  }, []);

  return{
    repository,
    getRepository,
    isGetRepositoryLoading,
    isGetRepositoryError,
    issues,
    getRepositoryIssues,
    isGetRepositoryIssuesLoading,
    isGetRepositoryIssuesError
  }
}