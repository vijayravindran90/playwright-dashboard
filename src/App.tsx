import { useState, useEffect } from 'react'
import './App.css'

interface TestResult {
  status: string;
  duration?: number;
  error?: string;
}

interface Test {
  title: string;
  results: TestResult[];
}

interface Spec {
  title: string;
  tests: Test[];
}

interface Suite {
  title: string;
  specs: Spec[];
}

interface PlaywrightReport {
  suites: Suite[];
}

interface Metrics {
  totalTests: number;
  passed: number;
  failed: number;
  stability: number;
  flakiness: number;
}

function calculateMetrics(report: PlaywrightReport): Metrics {
  let totalTests = 0;
  let passed = 0;
  let failed = 0;
  let flaky = 0;

  report.suites.forEach(suite => {
    suite.specs.forEach(spec => {
      spec.tests.forEach(test => {
        totalTests++;
        const statuses = test.results.map(r => r.status);
        const hasPassed = statuses.includes('passed');
        const hasFailed = statuses.includes('failed');
        if (hasPassed && !hasFailed) passed++;
        else if (hasFailed) failed++;
        if (hasPassed && hasFailed) flaky++;
      });
    });
  });

  const stability = totalTests > 0 ? (passed / totalTests) * 100 : 0;
  const flakiness = totalTests > 0 ? (flaky / totalTests) * 100 : 0;

  return { totalTests, passed, failed, stability, flakiness };
}

function App() {
  const [metrics, setMetrics] = useState<Metrics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const reportUrl = urlParams.get('report') || '/playwright-dashboard/results.json';
    fetch(reportUrl)
      .then(response => {
        if (!response.ok) throw new Error('Failed to load report');
        return response.json();
      })
      .then((data: PlaywrightReport) => {
        const calculatedMetrics = calculateMetrics(data);
        setMetrics(calculatedMetrics);
        setLoading(false);
      })
      .catch(err => {
        console.error('Fetch error:', err);
        setError(`Failed to load report from: ${reportUrl}. Error: ${err.message}`);
        setLoading(false);
      });
  }, []);

  if (loading) return <div style={{ padding: '2rem', textAlign: 'center' }}>Loading...</div>;
  if (error) return (
    <div style={{ padding: '2rem', maxWidth: '600px', margin: '0 auto', color: '#d32f2f' }}>
      <h2>Error Loading Report</h2>
      <p>{error}</p>
      <h3>Usage Instructions:</h3>
      <ul style={{ textAlign: 'left' }}>
        <li>Default: Uses embedded sample report at /results.json</li>
        <li>Custom URL: Add ?report=URL parameter with a valid HTTP/HTTPS URL to your results.json</li>
        <li>Example: ?report=https://example.com/playwright-report/results.json</li>
      </ul>
    </div>
  );
  if (!metrics) return <div style={{ padding: '2rem', textAlign: 'center' }}>No data</div>;

  return (
    <div className="dashboard">
      <h1>Playwright Test Dashboard</h1>
      <div className="metrics">
        <div className="metric">
          <h2>Total Tests</h2>
          <p>{metrics.totalTests}</p>
        </div>
        <div className="metric">
          <h2>Passed</h2>
          <p>{metrics.passed}</p>
        </div>
        <div className="metric">
          <h2>Failed</h2>
          <p>{metrics.failed}</p>
        </div>
        <div className="metric">
          <h2>Stability (%)</h2>
          <p>{metrics.stability.toFixed(2)}</p>
        </div>
        <div className="metric">
          <h2>Flakiness (%)</h2>
          <p>{metrics.flakiness.toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
}

export default App
