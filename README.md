## Getting Started

### Prerequistes

You need to have `nvm`, `docker`, `docker-compose` and `nps` already installed.

- Install `nvm` from [here](https://github.com/nvm-sh/nvm)
- To install `nps`
  - first make sure that you are using version 16 of node `nvm use 16`.
  - run following command `npm i -g nps`
- To install `docker` follow the official instructions for your operating system.
  - [Ubuntu](https://docs.docker.com/engine/install/ubuntu/). Also complete the post installation steps for ubuntu.
  - [Windows](https://docs.docker.com/docker-for-windows/install/)
- To install `docker-compose` follow the official instructions for your operating system.
  - [Ubuntu](https://docs.docker.com/compose/install/)
  - For windows it is already included in docker desktop

### Steps

1. Copy the clone link from the above code button.

2. Open your terminal in Vs-code.

3. In your terminal write `git clone https://github.com/ITfiers/project-management-app.git`

4. Run `cd project-management-app` to move in the directory

5. Run `nvm use` to use the node version supported by the project.

6. Change into backend directory `cd apps/backend/` and run `cp example.env .env`

7. Change into fronted directory `cd apps/frontend/` and run `cp example.env .env`

8. Get Credentials and put them in `.env` files in both `backend` and `frontend`

9. Get `serviceAccount.json` file and put it in `backend` directory

10. Change into root director `cd ../..` Run `nps prepare` to install dependencies.

11. Run `docker-compose up --build -d` to start the app. The app should be running on `localhost`

12. Following are some important commands.
    - `nps storybook`: to start storybook.
    - `nps test.watch.back`: to start running backend tests in watch mode.
    - `nps test.watch.front`: to start running frontend tests in watch mode.
    - `nps format`: to format both the frontend and backend.

Run `nps` to see list of available commands.
