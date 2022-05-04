<h1 align="center">GitHub Explorer</h1>
<h2 align="center">An application to explore GitHub repositories.</h2>

<br/>

## <a href="https://github-explorer-ygorthiago.vercel.app/" target="_blank">Click here</a> to access the deployed application.

<br/>

## Preview
  <div align="center">
    <img alt="Github Explorer Preview" title="Github Explorer" src="https://i.ibb.co/NKKQV6S/github-explorer.gif" />
  </div>

<br/>

## Features
### Search Repositories page
- [x] Search repositories
  - [x] Auto search when the user is done typing
- [x] Social authentication with Github to search private repositories
  - [x] Sign in
  - [x] Sign out
  - [x] Show user name when signed in
- [x] Save user repositories on the repository list and storage them on localStorage
  - [x] Clear list
  - [ ] Remove items from the list
  - [ ] Pagination
- [x] Toast to give feedbacks to user
  - [x] Display information about the API timing responses
  - [x] Use browsers navigator properties to display relative dates and times
  - [ ] Toast variants for success, error and info.

### Repository page
- [X] Repository details
- [X] Repository README
- [x] Repository issues list
  - [x] Pagination

### App
- [x] Reponsive app
- [ ] Improve app accessibility
- [ ] Internationalization
### Code Quality
- [x] 100% unit and integration test coverage
- [x] Cypress E2E tests

## Running project locally

1. ### Clone this repository:
    ```bash
    git clone https://github.com/ygorthiago/github-explorer.git
    ```
    or 

    ```bash
    git clone git@github.com:ygorthiago/github-explorer.git
    ```

2. ### Access the project folder on CLI and install dependencies:
    ```bash
    npm install
    ```

3.  ### Run the "dev" script:
     ```bash
    npm run dev
     ``` 
     The project will start on port 3000 - access http://localhost:3000

⚠ To use the GitHub social authentication feature, it's necessary to have an application on Firebase and integrate it with Github OAuth.  Then, just have to create a ".env" file in the project root and populate it based on ".env.example" file with your Firebase configuration data.  In case of doubts, you can contact me [here](https://www.linkedin.com/in/ygorthiago/)! 


<br/>

## Running unit/integration tests
1.  ### Run the "test" script:
    ```bash
    npm run test
    ```

<br/>

## Running E2E tests
  1. Install Cypress Test Runner. You can install using this [link](https://docs.cypress.io/guides/getting-started/installing-cypress).

  2. Run the application locally running the "dev" script in the terminal:
     ```bash
      npm run dev
     ```

  3. Run the "cypress:open" script in other terminal:
     ```bash
     npm run cypress:open
     ```
