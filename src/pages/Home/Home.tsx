import { FormEvent, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { FiChevronRight } from 'react-icons/fi';

import { IRepository } from "../../types";
import { Loader } from "../../components/Loader";

import {
    ClearList,
    HomeContainer,
    HomeTitle,
    Repositories,
    SearchButton,
    SearchError,
    SearchRepoForm
} from "./styles";
import { useGithubExplorerContext } from "../../contexts/useGithubExplorerContext";

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

    const newRepo = searchInputRef.current.value

    const newRepoIndex = repositories.findIndex(repo => repo.full_name === newRepo)

    if (newRepoIndex > -1) {
      const newRepositories = repositories.splice(newRepoIndex, 1);
      
      setRepositories(newRepositories)
    }

    try {
      setIsLoading(true)
      const response = await getRepositoryRequest(newRepo);
      const newRepositories = [response.data, ...repositories];
      
      setRepositories(newRepositories);

      const { responseTime } = response

      addToast({
        title: 'Repository was found!',
        description: `It took ${responseTime}ms`
      });

      localStorage.setItem(
        '@GithubExplorer:repositories',
        JSON.stringify(newRepositories),
      );

      setInputError('');
      clearTimeout(timeOut.current);
      searchInputRef.current.value = ''
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
    }, 1200);
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
          <ClearList
            onClick={clearRepositoryList}
            data-testid="clear-repository-list-button"
          >
            Clear list
          </ClearList>

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

