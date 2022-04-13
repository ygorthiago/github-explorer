import { useCallback, useState } from "react";
import api, { AxiosResponseWithResponseTime } from "../services/api";
import { IRepositoryIssue, IRepository } from "../types";

export interface IUseRepositoriesHook {
  repository: IRepository | null
  getRepository: (repositoryName: string) => void
  isGetRepositoryLoading: boolean
  isGetRepositoryError: boolean
  issues: IRepositoryIssue[]
  getRepositoryIssues: (repositoryName: string) => void
  isGetRepositoryIssuesLoading: boolean
  isGetRepositoryIssuesError: boolean
  getRepositoryRequest: (repositoryName: string) => Promise<IGetRepositoryRequest>
}

interface IGetRepositoryRequest {
  data: IRepository
  responseTime: number
}

export function useRepositoriesHook(): IUseRepositoriesHook {
  const [repository, setRepository] = useState<IRepository | null>(null);
  const [isGetRepositoryLoading, setIsGetRepositoryLoading] = useState(false);
  const [isGetRepositoryError, setIsGetRepositoryError] = useState(false);

  const [issues, setIssues] = useState<IRepositoryIssue[]>([]);
  const [isGetRepositoryIssuesLoading, setIsGetRepositoryIssuesLoading] = useState(false);
  const [isGetRepositoryIssuesError, setIsGetRepositoryIssuesError] = useState(false);

  const getRepositoryRequest = useCallback(async (repositoryName: string): 
  Promise<IGetRepositoryRequest> => {
    try {
      const repository = await api.get<IRepository, AxiosResponseWithResponseTime>(`/repos/${repositoryName}`)

      return repository
    } catch (err) {
      throw new Error((err as Error).message)
    }
  }, []);

  const getRepository = useCallback(async (repositoryName: string) => {
    setIsGetRepositoryError(false);
    setIsGetRepositoryLoading(true);

    try {
      const repository = await getRepositoryRequest(repositoryName)

      setRepository(repository.data);
    } catch (err) {
      console.error(err)

      setIsGetRepositoryError(true)
    } finally {
      setIsGetRepositoryLoading(false);
    }
  }, []);

  const getRepositoryIssues = useCallback(async (repositoryName: string) => {
    setIsGetRepositoryIssuesError(false);
    setIsGetRepositoryIssuesLoading(true);

    try {
      const repositoryIssues = await api.get<IRepositoryIssue[]>(`/repos/${repositoryName}/issues`, {
        params: {
          page: 1,
          per_page: 10,
          sort: 'updated-desc'
        }
      })

      setIssues(repositoryIssues.data);
    } catch (err) {
      console.error(err)

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
    isGetRepositoryIssuesError,
    getRepositoryRequest
  }
}