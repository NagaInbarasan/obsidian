const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  let errors = [];
  page.on('console', msg => {
    if (msg.type() === 'error') errors.push(`Console Error: ${msg.text()}`);
  });
  page.on('pageerror', err => errors.push(`Page Error: ${err.message}`));
  
  const responses = [];
  page.on('response', resp => {
    responses.push({ url: resp.url(), status: resp.status() });
  });

  try {
    console.log('Navigating to login...');
    await page.goto('http://localhost:5173/login/employee');
    await page.waitForLoadState('networkidle');
    
    console.log('Filling form...');
    await page.fill('input[type="email"]', 'alice@obsidian.test');
    await page.fill('input[type="password"]', 'password123');
    await page.click('button[type="submit"]');
    
    console.log('Waiting for dashboard...');
    await page.waitForURL('**/dashboard');
    await page.waitForLoadState('networkidle');
    
    console.log('Navigating to Employees Directory...');
    await page.goto('http://localhost:5173/employees');
    await page.waitForLoadState('networkidle');
    
    // Check if Alice is on the page
    const content = await page.content();
    if (content.includes('Alice Smith')) {
      console.log('Found Alice Smith in directory');
    } else {
      console.log('Alice not found in directory');
    }

    console.log('Navigating to Role Matches...');
    await page.goto('http://localhost:5173/career/matches');
    await page.waitForLoadState('networkidle');
    const matchesContent = await page.content();
    if (matchesContent.includes('Senior Backend Engineer')) {
      console.log('Match found');
    }

    const failedResponses = responses.filter(r => r.status >= 400 && !r.url.includes('favicon'));
    console.log('FAILED API CALLS:', failedResponses);
    console.log('CONSOLE ERRORS:', errors);

    console.log('TEST COMPLETE');
  } catch (e) {
    console.error('Test failed:', e);
  } finally {
    await browser.close();
  }
})();
