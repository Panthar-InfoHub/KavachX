import { test, expect } from '@playwright/test';

// Core app grouping
test.describe('Kavach X - End-to-End Tests', () => {

  // ------------------------------------------------------------------
  // 1. HOME PAGE TESTS
  // ------------------------------------------------------------------
  test.describe('Home Page', () => {

    test.beforeEach(async ({ page }) => {
      await page.goto('/');
    });

    test('should load correctly and have proper SEO metadata', async ({ page }) => {
      await expect(page).toHaveTitle('Kavach X | Smart Personal Safety App & AI Security');

      const schemaScript = page.locator('script[type="application/ld+json"]');
      await expect(schemaScript).toHaveCount(1);
    });

    test('should display the main hero section', async ({ page }) => {
      // Changed to getByRole!
      const heroTitle = page.getByRole('heading', { level: 1, name: /Intelligent Safety/i });
      await expect(heroTitle).toBeVisible();
    });
  });


  // ------------------------------------------------------------------
  // 2. SURAKSHA KAVACH PAGE TESTS
  // ------------------------------------------------------------------
  test.describe('Suraksha Kavach Page', () => {

    test.beforeEach(async ({ page }) => {
      await page.goto('/suraksha-kavach');
    });

    test('should load correctly and have proper SEO metadata', async ({ page }) => {
      await expect(page).toHaveTitle('Suraksha Kavach | Safety App with SOS, Crash & Voice Alerts | Kavach X');

      const schemaScript = page.locator('script[type="application/ld+json"]');
      await expect(schemaScript).toHaveCount(1);
    });

    test('should display the main feature title and CTA', async ({ page }) => {
      // Changed to getByRole!
      const title = page.getByRole('heading', { level: 1, name: /Shielding Your Safety/i });
      await expect(title).toBeVisible();

      // Changed to getByRole!
      const ctaButton = page.getByRole('button', { name: 'Try Kavach for Free' });
      await expect(ctaButton).toBeVisible();
    });
  });


  // ------------------------------------------------------------------
  // 3. AI EDGE BOX PAGE TESTS (NEW!)
  // ------------------------------------------------------------------
  test.describe('AI Edge Box Page', () => {

    test.beforeEach(async ({ page }) => {
      await page.goto('/ai-edge-box');
    });

    test('should load correctly and have proper SEO metadata', async ({ page }) => {
      await expect(page).toHaveTitle('AI Edge Box | Smart CCTV Security Device by Kavach X | Kavach X');

      const schemaScript = page.locator('script[type="application/ld+json"]');
      await expect(schemaScript).toHaveCount(1);
    });

    test('should display the edge box hero section and CTA', async ({ page }) => {
      // Validating using getByRole
      const title = page.getByRole('heading', { level: 1, name: /AI Edge Box/i });
      await expect(title).toBeVisible();

      // Validating using getByRole
      const stayTuneButton = page.getByRole('button', { name: /Stay tune !!/i });
      await expect(stayTuneButton).toBeVisible();
    });
  });


  // ------------------------------------------------------------------
  // 4. CROSS-PAGE NAVIGATION
  // ------------------------------------------------------------------
  test.describe('Navigation', () => {

    test.beforeEach(async ({ page }) => {
      await page.goto('/');
    });

    test('should navigate from Home to Suraksha Kavach via Footer', async ({ page }) => {
      // .first() is used just in case the link exists in both the mobile nav and full screen footer
      const surakshaLink = page.getByRole('link', { name: 'Suraksha Kavach', exact: true }).first();
      await surakshaLink.click();
      await expect(page).toHaveURL('/suraksha-kavach');
    });

    test('should navigate from Home to AI Edge Box via Footer', async ({ page }) => {
      const edgeBoxLink = page.getByRole('link', { name: 'AI Edge Box', exact: true }).first();
      await edgeBoxLink.click();
      await expect(page).toHaveURL('/ai-edge-box');
    });

  });

});
