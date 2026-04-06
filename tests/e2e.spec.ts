import { test, expect } from '@playwright/test';

// Core app grouping
test.describe('Kavach X - End-to-End Tests', () => {

  // ------------------------------------------------------------------
  // 1. HOME PAGE TESTS
  test.describe('Home Page', () => {

    // This runs before every test in this block, saving us from writing page.goto every time
    test.beforeEach(async ({ page }) => {
      await page.goto('http://localhost:3000/');
    });

    test('should load correctly and have proper SEO metadata', async ({ page }) => {
      // Check the exact title we set in layout.tsx
      await expect(page).toHaveTitle('Home | Kavach X');

      // Verify schema script was injected by our Server Component
      const schemaScript = page.locator('script[type="application/ld+json"]');
      await expect(schemaScript).toHaveCount(1);
    });

    test('should display the main hero section', async ({ page }) => {
      const heroTitle = page.locator('h1');
      await expect(heroTitle).toContainText('Intelligent Safety');
    });
  });


  // ------------------------------------------------------------------
  // 2. SURAKSHA KAVACH PAGE TESTS
  // ------------------------------------------------------------------
  test.describe('Suraksha Kavach Page', () => {

    test.beforeEach(async ({ page }) => {
      await page.goto('http://localhost:3000/suraksha-kavach');
    });

    test('should load correctly and have proper SEO metadata', async ({ page }) => {
      // Check the title we exported inside app/suraksha-kavach/page.tsx
      await expect(page).toHaveTitle('Suraksha Kavach');

      const schemaScript = page.locator('script[type="application/ld+json"]');
      await expect(schemaScript).toHaveCount(1);
    });

    test('should display the main feature title and CTA', async ({ page }) => {
      const title = page.locator('h1');
      await expect(title).toContainText('Shielding Your Safety');

      // Verify the CTA button exists and is visible
      const ctaButton = page.locator('button', { hasText: 'Try Kavach for Free' });
      await expect(ctaButton).toBeVisible();
    });
  });


  // ------------------------------------------------------------------
  // 3. CROSS-PAGE NAVIGATION
  // ------------------------------------------------------------------
  test.describe('Navigation', () => {
    test('should navigate from Home to Suraksha Kavach via Footer', async ({ page }) => {
      await page.goto('http://localhost:3000/');

      // Using getByRole is the Playwright best practice!
      // This looks for an actual HTML link (`<a>` or `<Link>`) with the text "Suraksha Kavach"
      const surakshaLink = page.getByRole('link', { name: 'Suraksha Kavach', exact: true });

      // Click the link we found in the footer (or nav)
      await surakshaLink.first().click();

      // Verify we landed on the correct page
      await expect(page).toHaveURL('http://localhost:3000/suraksha-kavach');
    });
  });

});
