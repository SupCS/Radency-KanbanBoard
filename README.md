Deployed app: https://aspariankanban2.netlify.app

# Kanban board

The Kanban Board is a web application designed for task and project management, enabling users to organize their work to enhance efficiency and productivity. Utilizing the Kanban methodology, the application offers a visual representation of boards, tasks, their due dates, priorities. Features include the creation of various boards and lists to categorize tasks or stages of completion, management of tasks with the ability to add, edit, and move them between lists while setting deadlines and priorities, and an integrated activity history to track changes and actions. The project employs React.js for an interactive user interface, ReduxToolkit for state management, NestJS for server-side processing, API requests, authentication, and database interactions, PostgreSQL for data storage, and Docker for containerization and simplified deployment.

## Storybook Integration

As part of commitment to ensuring a high-quality user interface and experience, i've integrated Storybook into my project. Storybook serves as a sandbox for developing and testing UI components in isolation, making it easier to share and review different states of UI components without running the full application.

After starting the project (locally or with docker), Storybook will start, and you can access it by navigating to http://localhost:6006 in your web browser.

## Start working

Start with docker:

docker-compose up --build

You will get an empty database, so feel free to create your lists and tasks from scratch!

Start locally:

cd backend
npm install
npm run start:dev

cd ../frontend
npm install
npm start

### Run tests

For frontend:

cd frontend
npm test

For backend:

cd backend
npm run test:e2e

### Need to have

Node.js
NPM
PostgreSQL
Docker - optional
