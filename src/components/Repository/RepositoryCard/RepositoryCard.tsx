import { memo } from 'react';
import { FiChevronRight } from 'react-icons/fi';
import { IRepository } from '../../../types';

import { RepositoryCardContainer } from './styles';

interface IRepositoryCard {
  repository: IRepository;
}

function RepositoryCardComponent({ repository }: IRepositoryCard) {
  return (
    <RepositoryCardContainer
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
    </RepositoryCardContainer>
  );
}

export const RepositoryCard = memo(RepositoryCardComponent);
