# JobFlow

[Open JobFlow](https://jobflow-drab-kappa.vercel.app/)

A small React app for tracking job applications. Add a company and position, keep notes, and update the status as you hear back.

I built this project to practise React and TypeScript, from handling forms and sharing state between components to writing tests and setting up CI.

Built with React, TypeScript, Vite, and Tailwind CSS. Tests use Vitest and React Testing Library.

## Installation

Use Node.js 22.12 or later in the Node 22 release line, and npm.

```bash
git clone https://github.com/Serhiidevel/jobflow.git
cd jobflow
npm ci
npm run dev
```

Open the local address printed in the terminal.

## Usage

Enter a company and position to add an application. Location and notes are optional. Each application has a status: Saved, Applied, Interview, Rejected, or Offer.

You can change the status on its card, filter the list by status, or delete an application.

Applications are stored in your browser using localStorage, so they remain after a refresh. There is no account or server: data does not sync between browsers or devices, and clearing the site's browser data removes it.

## Checks

```bash
npm run lint
npm run test:run
npm run build
```

The tests cover form rendering and submission, status changes, filtering, and saving applications to localStorage. GitHub Actions runs these checks on pushes and pull requests to main.

## Contributing

This is a personal learning project. If you find a bug, you can open an issue with the steps to reproduce it.

## License

No license has been added yet.
