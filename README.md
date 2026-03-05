# Playwright Test Dashboard

A React TypeScript dashboard for displaying Playwright test metrics, including total tests, passed/failed counts, stability, and flakiness. Deployable to GitHub Pages.

## Features

- Displays key metrics from Playwright test reports
- Calculates stability (percentage of passed tests)
- Identifies flakiness (percentage of tests with mixed pass/fail results)
- Configurable report source via URL parameter
- Static site deployable to GitHub Pages

## Setup

1. Clone this repository
2. Install dependencies: `npm install`
3. Place your Playwright `results.json` in the `public/` directory (or configure via URL param)
4. Build: `npm run build`
5. Serve locally: `npm run dev`

## Deployment to GitHub Pages

This project includes a GitHub Actions workflow that automatically builds and deploys to GitHub Pages on pushes to the main branch.

To enable:
1. Go to your repository settings
2. Navigate to Pages
3. Set source to "GitHub Actions"

## Integration in Other Repos

To integrate this dashboard into another Playwright project:

1. Copy this project into your repo (or fork it)
2. Ensure your Playwright tests generate `results.json` (default location: `playwright-report/results.json`)
3. Copy or symlink the report to `public/results.json` in this project
4. Alternatively, use the `?report=` URL parameter to specify the path: `?report=/path/to/results.json`
5. Commit and push to deploy

## Metrics Calculation

- **Total Tests**: Count of all test cases
- **Passed**: Tests that have only passed results
- **Failed**: Tests that have at least one failed result
- **Stability**: (Passed / Total Tests) * 100
- **Flakiness**: Percentage of tests with both passed and failed results in their runs

## Development

Built with Vite + React + TypeScript.
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
