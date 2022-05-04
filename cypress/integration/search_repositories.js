describe('Search repositories - success', () => {
  const repository = 'ygorthiago/ygorthiago'

  it('should be able to search repositories', () => {
    cy.visit('/');

    //should input a repository name
    cy.findByTestId('search-repository-input').type(repository);

    //click on search
    cy.findByTestId('search-repository-button').click();

    //see if toast renders
    cy.findByText('Repository was found!').should('exist');

    //see if the repository was added
    cy.findByTestId(`repository-${repository}`).should('exist');
  })

  it('should be able to search repositories without clicking on search (autosearch)', () => {
    cy.visit('/');

    //should input a repository name
    cy.findByTestId('search-repository-input').type(repository);

    //wait for autosearch
    cy.wait(1300);

    //see if toast renders
    cy.findByText('Repository was found!').should('exist');

    //see if the repository was added
    cy.findByTestId(`repository-${repository}`).should('exist');
  })

  it('should be able to show the previous searchs when user leave and return to app', () => {
    cy.visit('/');

    //should input a repository name
    cy.findByTestId('search-repository-input').type(repository);

    //click on search
    cy.findByTestId('search-repository-button').click();

    //see if the repository was added
    cy.findByTestId(`repository-${repository}`).should('exist')

    //refresh page
    cy.reload()

    //see if the repository was added
    cy.findByTestId(`repository-${repository}`).should('exist');
  })

  it('should be able to clear the repository list', () => {
    cy.visit('/');

    //should input a repository name
    cy.findByTestId('search-repository-input').type(repository);

    //click on search
    cy.findByTestId('search-repository-button').click();

    //see if the repository was added
    cy.findByTestId(`repository-${repository}`).should('exist')

    //clear repository list
    cy.findByTestId('clear-repository-list-button').click();

     //see if the list was cleared
     cy.findByTestId(`repository-${repository}`).should('not.exist');
  })

  it('should be able to use the repository issues pagination on Repository page', () => {
    const paginationRepo = 'facebook/react' // to be changed when the test repository with a lot of issues is created

    cy.visit('/');

    //should input a repository name
    cy.findByTestId('search-repository-input').type(paginationRepo);

    //click on search
    cy.findByTestId('search-repository-button').click();

    //see if toast showed up
    cy.findByText('Repository was found!').should('exist');

    //see if the repository was added
    cy.findByTestId(`repository-${paginationRepo}`).should('exist');

    //access the repository informations
    cy.findByTestId(`repository-${paginationRepo}`).click()

    //verify if its the correct url
    cy.url().should('include', `/repository/${paginationRepo}`)

    //verify if its the correct repository
    cy.findByTestId('repository-name').contains(paginationRepo)

    //change the repository issues page
    cy.findByTestId('pagination-item-2').click()

    //verify if the page changed and if the pagination button '2' is disabled
    cy.findByTestId('pagination-item-2').should('be.disabled')
  })

  it('should be able to use the repository list pagination on Home page', () => {
    const repositoryList = [
      repository,
      'ygorthiago/github-explorer',
      'ygorthiago/flip-bookstore',
      'ygorthiago/gobarber-web',
      'ygorthiago/gobarber-api',
      'ygorthiago/dropull-nft'
    ]

    cy.visit('/');

    
    repositoryList.forEach((repo) => {
      //should input a repository name
      cy.findByTestId('search-repository-input').type(repo);

      //click on search
      cy.findByTestId('search-repository-button').click();
  
      //see if the repository was added
      cy.findByTestId(`repository-${repo}`).should('exist');
    })

    //change the repository issues page
    cy.findByTestId('pagination-item-2').click()

    //verify if the page changed and if the pagination button '2' is disabled
    cy.findByTestId('pagination-item-2').should('be.disabled')
  })

  it('should be able to search repository, access the repository informations and go back to home page (complete flow)', () => {
    cy.visit('/');

    //should input a repository name
    cy.findByTestId('search-repository-input').type(repository);

    //click on search
    cy.findByTestId('search-repository-button').click();

    //see if toast showed up
    cy.findByText('Repository was found!').should('exist');

    //see if the repository was added
    cy.findByTestId(`repository-${repository}`).should('exist');

    //access the repository informations
    cy.findByTestId(`repository-${repository}`).click()

    //verify if its the correct url
    cy.url().should('include', `/repository/${repository}`)

    //verify if its the correct repository
    cy.findByTestId('repository-name').contains(repository)

    //click on repository name and access the github repository
    cy.findByTestId('back-button').click({ force: true })

    //verify if the app turn back to home page
    cy.url().should('contain', '/')
  })
})

describe('Search repositories - errors', () => {
  it('should display an error if user try to search without filling the search input', () => {
    cy.visit('/');

    //click on search
    cy.findByTestId('search-repository-button').click();

    //see if the error message exists with correct text
    cy.findByTestId('search-repository-error').contains('Enter the author/repository name');
  })

  it('should display an error if user try to search an repository that do not exists', () => {
    const repositoryThatNotExists = 'ygorthiago/repository-that-not-exists'

    cy.visit('/');

    //should input a repository name
    cy.findByTestId('search-repository-input').type(repositoryThatNotExists);

    //click on search
    cy.findByTestId('search-repository-button').click();

    //see if toast showed up
    cy.findByTestId('search-repository-error').contains('Repository not found');
  })
})