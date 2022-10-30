## How to get started with github contribution

1. Clone the github repository on which you want to contribute.
2. Checkout to the main branch `git checkout main` and pull latest changes `git pull`.
3. Create your own branch by following the naming convention in the instructions of your github repository like **(gh12-Create-doc-for-the-entire-contribution-process)** by typing the command `git checkout -b <branch-name>`
4. Make changes you want to do in your new branch.
5. Add your changes the staging index by typing the command `git add -A`
6. Commit your changes by typing the command `git commit -m "commit message"`
7. Push your changes from local repository to the remote repository on github by typing the command `git push -u origin <remote-branch-link>`
8. Create a pull request on the github project repository by selecting the reviewers who will review your code.

### Note:

- Before making the pull request you should follow the PR template checklist to make sure everything is according to process.
- Further more if you have already cloned a project you should pull the latest version of the project before working by following command `git pull <remote>` and install all the dependcies of the project by running the command `npm install`
