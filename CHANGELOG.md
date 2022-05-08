# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.5.0] - 2022-08-07
## Added
- useGithubAuth hook: Added a function to verify when the user token is expired. The application will sign out user and provide a feedback on screen.

### Changed
- Code style: Eslint adjustments.

## [0.4.1] - 2022-05-07
### Changed
- Context: Refactoring 'GithubExplorerContext' to be called 'ToastContext', which is responsible to share only Toast's global states.

## [0.4.0] - 2022-05-04
### Added
- Home Page: Added pagination for the repository list.
- Repository issues component: Show pagination only if have more issues than items per page (10).

### Fixed
- Pagination component: Changed pagination info to start by register 1 instead of 0.

## [0.3.0] - 2022-05-04
### Added
- Pagination component.
- Repository issues component: Added pagination for the issues list.

## [0.2.1] - 2022-05-01
### Fixed
- RepositoryReadme component: adjustments on readme max-height and overflow.

## [0.2.0] - 2022-05-01
### Added
- App: Social Github authentication with firebase. Was added a button responsible to handle SignIn and SignOut in application Header.
- Repository page: RepositoryReadme component to visualize the repository readme.
- ErrorRetry component: Added "message" prop, that provides the possibility to show a custom message to improve the error feedback to user.
- Added .env to project.

## [0.1.0] - 2022-04-27
### Changed
- Home page: Adjustment on repositories search that already exists on list. Now, instead of making another request to API, the app will simply move the repository to the top of the list, saving up one request to API.
- Home Page: Increased auto search time to 2 seconds to improve user experience.
- Home Page: Creation of RepositoryCard component and use memo on it to prevent re-renders and improve performance.

- Toast Container: Increased toast time to 5 seconds to improve user experience, giving more time to user to read all the information.

### Fixed
- Home page: Adjustment on "Clear List" button.

### Added
- Changelog and versioning to project.