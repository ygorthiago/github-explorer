import { FormEvent, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { FiChevronRight } from 'react-icons/fi';
import { BsGithub } from 'react-icons/bs';
import api from "../../services/api";
import { ClearList, HomeContainer, HomeTitle, Repositories, SearchError, SearchRepoForm } from "./styles";

interface Repository {
  full_name: string;
  description: string;
  owner: {
    login: string;
    avatar_url: string;
  };
}

export function Home() {
  const timeOut = useRef<undefined | number>();
  const searchInputRef = useRef<HTMLInputElement | null>(null)

  const [inputError, setInputError] = useState('');
  const [repositories, setRepositories] = useState<Repository[]>(() => {
    const storagedRepositories = localStorage.getItem(
      '@GithubExplorer:repositories',
    );

    if (storagedRepositories) {
      return JSON.parse(storagedRepositories);
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem(
      '@GithubExplorer:repositories',
      JSON.stringify(repositories),
    );
  }, [repositories]);

  async function handleAddRepository(
    event?: FormEvent<HTMLFormElement>
  ): Promise<void> {
    event?.preventDefault()
    const newRepo = searchInputRef.current?.value

    if (!newRepo) {
      setInputError('Enter the author/repository name');
      return;
    }

    const newRepoIndex = repositories.findIndex(repo => repo.full_name === newRepo)

    if (newRepoIndex > -1) {
      const newRepositories = repositories.splice(newRepoIndex, 1);
      
      setRepositories(newRepositories)
    }

    try {
      const response = await api.get<Repository>(`/repos/${newRepo}`);

      const repository = response.data;
      
      setRepositories([repository, ...repositories]);

      if (searchInputRef.current) searchInputRef.current.value = ''
      setInputError('');
      clearTimeout(timeOut.current);
    } catch (err) {
      setInputError('Error searching this repository');
    }
  }

  function searchAgents() {
    clearTimeout(timeOut.current);
    timeOut.current = setTimeout(() => {
      handleAddRepository()
    }, 1200);
  }

  function clearRepositoryList() {
    setRepositories([])
    localStorage.clear();
  }
  
  return (
    <HomeContainer>
      <header>
        <BsGithub /> github_explorer
      </header>

      <HomeTitle>Explore GitHub Repositories</HomeTitle>
      <SearchRepoForm hasError={false} onSubmit={handleAddRepository}>
        <input
          onChange={searchAgents}
          ref={searchInputRef}
          placeholder="Repository name"
        />
        <button type="submit">Search</button>
      </SearchRepoForm>
      {inputError && <SearchError>{inputError}</SearchError>}

      <Repositories>
        {!!repositories.length && <ClearList onClick={clearRepositoryList}>Clear list</ClearList>}
        {repositories.map(repository => (
          <Link
            key={repository.full_name}
            to={`/repository/${repository.full_name}`}
          >
            <img
              src={repository.owner.avatar_url}
              alt={repository.owner.login}
            />
            <div>
              <strong>{repository.full_name}</strong>
              <p>{repository.description}</p>
            </div>
            <FiChevronRight size={20} />
          </Link>
        ))}
      </Repositories>
    </HomeContainer>
    
  )
}

