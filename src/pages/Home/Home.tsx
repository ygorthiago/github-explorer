import { FormEvent, useRef, useState } from 'react';

import { IRepository } from '../../types';
import { Loader } from '../../components/Loader';
import { RepositoryCard } from '../../components/Repository/RepositoryCard';
import { Pagination } from '../../components/Pagination';

import { useToastContext } from '../../contexts/useToastContext';
import { useRepositoriesHook } from '../../hooks/useRepositories';

import {
  ClearList,
  ClearListWrapper,
  HomeContainer,
  HomeTitle,
  Repositories,
  SearchButton,
  SearchError,
  SearchRepoForm,
} from './styles';

export function Home() {
  const timeOut = useRef<undefined | number>();
  const searchInputRef = useRef<HTMLInputElement | null>(null);
  const { addToast } = useToastContext();
  const { getRepositoryRequest } = useRepositoriesHook();

  const [inputError, setInputError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [repositories, setRepositories] = useState<IRepository[]>(() => {
    const storagedRepositories = localStorage.getItem(
      '@GithubExplorer:repositories',
    );

    if (storagedRepositories) {
      return JSON.parse(storagedRepositories);
    }

    return [];
  });

  const [page, setPage] = useState(1);

  const registersPerPage = 5;
  const indexOfLastRegister = page * registersPerPage;
  const indexOfFirstRegister = indexOfLastRegister - registersPerPage;
  const currentRepositories = repositories.slice(
    indexOfFirstRegister,
    indexOfLastRegister,
  );

  const handleAddRepository = async (
    event?: FormEvent<HTMLFormElement>,
  ): Promise<void> => {
    event?.preventDefault();

    if (!searchInputRef.current?.value) {
      setInputError('Enter the author/repository name');
      return;
    }

    function addRepository(repos: IRepository[], responseTime: number) {
      setRepositories(repos);

      localStorage.setItem(
        '@GithubExplorer:repositories',
        JSON.stringify(repos),
      );

      addToast({
        title: 'Repository was found!',
        description: `It took ${responseTime}ms`,
      });

      setInputError('');
      clearTimeout(timeOut.current);

      if (searchInputRef.current?.value) {
        searchInputRef.current.value = '';
      }
    }

    const repositoryName = searchInputRef.current.value;

    const repositoryIndex = repositories.findIndex(
      repo => repo.full_name === repositoryName,
    );

    if (repositoryIndex > -1) {
      const rearrangedRepositories = repositories;

      const repository = rearrangedRepositories.splice(repositoryIndex, 1)[0];
      rearrangedRepositories.splice(0, 0, repository);

      const fakeResponseTime = 100;

      addRepository(rearrangedRepositories, fakeResponseTime);

      return;
    }

    try {
      setIsLoading(true);
      const response = await getRepositoryRequest(repositoryName);
      const newRepositories = [response.data, ...repositories];

      setRepositories(newRepositories);

      const { responseTime } = response;

      addRepository(newRepositories, responseTime);
    } catch (err) {
      if ((err as Error).message.includes('404')) {
        setInputError(
          `Repository not found. If it's a private repository, sign in and try again.`,
        );
        return;
      }

      setInputError('Error searching repository');
    } finally {
      setIsLoading(false);
      clearTimeout(timeOut.current);
    }
  };

  function searchRepository() {
    if (searchInputRef.current?.value) {
      clearTimeout(timeOut.current);

      timeOut.current = window.setTimeout(() => {
        handleAddRepository();
        clearTimeout(timeOut.current);
      }, 2000);
    } else {
      clearTimeout(timeOut.current);
    }
  }

  const clearRepositoryList = () => {
    setRepositories([]);
    localStorage.clear();
  };

  return (
    <HomeContainer>
      <HomeTitle>Explore GitHub Repositories</HomeTitle>
      <SearchRepoForm hasError={!!inputError} onSubmit={handleAddRepository}>
        <input
          data-testid="search-repository-input"
          onChange={searchRepository}
          ref={searchInputRef}
          placeholder="Repository name"
        />
        <SearchButton
          data-testid="search-repository-button"
          type="submit"
          disabled={isLoading}
          isDisabled={isLoading}
        >
          {isLoading ? <Loader /> : 'Search'}
        </SearchButton>
      </SearchRepoForm>
      {inputError && (
        <SearchError data-testid="search-repository-error">
          {inputError}
        </SearchError>
      )}

      {!!repositories.length && (
        <Repositories data-testid="repository-list">
          <ClearListWrapper>
            <ClearList
              onClick={clearRepositoryList}
              data-testid="clear-repository-list-button"
            >
              Clear list
            </ClearList>
          </ClearListWrapper>

          {currentRepositories.map(repository => (
            <RepositoryCard
              key={repository.full_name}
              repository={repository}
            />
          ))}

          {repositories.length > registersPerPage && (
            <Pagination
              currentPage={page}
              totalCountOfRegisters={repositories.length}
              registersPerPage={registersPerPage}
              onPageChange={setPage}
            />
          )}
        </Repositories>
      )}
    </HomeContainer>
  );
}
