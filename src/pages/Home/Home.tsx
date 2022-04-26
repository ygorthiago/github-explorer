import { FormEvent, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { FiChevronRight } from 'react-icons/fi';

import { IRepository } from "../../types";
import { Loader } from "../../components/Loader";

import { useGithubExplorerContext } from "../../contexts/useGithubExplorerContext";

import {
    ClearList,
    ClearListWrapper,
    HomeContainer,
    HomeTitle,
    Repositories,
    SearchButton,
    SearchError,
    SearchRepoForm
} from "./styles";

export function Home() {
  const timeOut = useRef<undefined | number>();
  const searchInputRef = useRef<HTMLInputElement | null>(null)
  const {
    addToast,
    getRepositoryRequest
  } = useGithubExplorerContext();

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

  async function handleAddRepository(
    event?: FormEvent<HTMLFormElement>
  ): Promise<void> {
    event?.preventDefault()

    if (!searchInputRef.current?.value) {
      setInputError('Enter the author/repository name');
      return;
    }

    function addRepository(repos: IRepository[], responseTime: number) { 
      setRepositories(repos)

      localStorage.setItem(
        '@GithubExplorer:repositories',
        JSON.stringify(repos),
      );

      addToast({
        title: 'Repository was found!',
        description: `It took ${responseTime}ms`
      });

      setInputError('');
      clearTimeout(timeOut.current);

      if (searchInputRef.current?.value) {
        searchInputRef.current.value = ''
      }
    }

    const repositoryName = searchInputRef.current.value

    const repositoryIndex = repositories.findIndex(repo => repo.full_name === repositoryName)

    if (repositoryIndex > -1) {
      let rearrangedRepositories = repositories;

      const repository = rearrangedRepositories.splice(repositoryIndex, 1)[0];
      rearrangedRepositories.splice(0, 0, repository);
      
      const fakeResponseTime = 100;

      addRepository(rearrangedRepositories, fakeResponseTime);
      
      return;
    }

    try {
      setIsLoading(true)
      const response = await getRepositoryRequest(repositoryName);
      const newRepositories = [response.data, ...repositories];
      
      setRepositories(newRepositories);

      const { responseTime } = response;

      addRepository(newRepositories, responseTime);
    } catch (err) {
      if ((err as Error).message.includes('404')) {
        setInputError('Repository not found');
        return
      }

      setInputError('Error searching repository');
    } finally {
      setIsLoading(false)
    }
  }

  function searchRepository() {
    clearTimeout(timeOut.current);

    timeOut.current = window.setTimeout(() => {
      handleAddRepository()
    }, 2000);
  }

  function clearRepositoryList() {
    setRepositories([])
    localStorage.clear();
  }
  
  return (
    <HomeContainer>
      <HomeTitle>Explore GitHub Repositories</HomeTitle>
      <SearchRepoForm hasError={!!inputError} onSubmit={handleAddRepository}>
        <input
          data-testid='search-repository-input'
          onChange={searchRepository}
          ref={searchInputRef}
          placeholder="Repository name"
        />
        <SearchButton
          data-testid='search-repository-button'
          type="submit"
          disabled={isLoading}
          isDisabled={isLoading}
        >
          {isLoading ? <Loader /> :  'Search' }
        </SearchButton>
      </SearchRepoForm>
      {inputError && <SearchError data-testid='search-repository-error'>{inputError}</SearchError>}

      {!!repositories.length && (
        <Repositories data-testid='repository-list'>
          <ClearListWrapper>
            <ClearList
              onClick={clearRepositoryList}
              data-testid="clear-repository-list-button"
            >
              Clear list
            </ClearList>
          </ClearListWrapper>

          {repositories.map(repository => (
            <Link
              key={repository.full_name}
              to={`/repository/${repository.full_name}`}
              data-testid={`repository-${repository.full_name}`}
            >
              <img
                src={repository.owner.avatar_url}
                alt={repository.owner.login}
                loading="lazy"
              />
              <div>
                <strong>{repository.full_name}</strong>
                <p>{repository.description}</p>
              </div>
              <FiChevronRight size={20} />
            </Link>
          ))}
        </Repositories>
      )}
    </HomeContainer>
    
  )
}

