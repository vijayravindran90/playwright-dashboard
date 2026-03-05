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

1. **Option A: Embed in Repository**
   - Copy this project into your repo
   - After tests run, copy `playwright-report/results.json` to `public/results.json`
   - Deploy using the same GitHub Actions workflow

2. **Option B: Use Remote Dashboard with Custom Report**
   - Host your Playwright results file on a web server
   - Link to the dashboard with your report URL:
     ```
     https://vijayravindran90.github.io/playwright-dashboard?report=https://example.com/playwright-report/results.json
     ```
   - The `report` parameter must be a valid HTTP/HTTPS URL (CORS must allow access)

## Report Format

The dashboard expects Playwright's `results.json` file in this format:
```json
{
  "suites": [
    {
      "title": "Suite Name",
      "specs": [
        {
          "title": "spec.ts",
          "tests": [
            {
              "title": "test name",
              "results": [
                {
                  "status": "passed|failed"
                }
              ]
            }
          ]
        }
      ]
    }
  ]
}
```

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
