import { betterAuth } from "better-auth";
import { memoryAdapter } from "better-auth/adapters/memory";

type MemoryStore = Record<string, any[]>;

declare global {
  // eslint-disable-next-line no-var
  var authDb: MemoryStore | undefined;
}

// Preserve the in-memory data store across Next.js dev server hot-reloads
const db: MemoryStore = globalThis.authDb || {
  user: [],
  session: [],
  account: [],
  verification: [],
};

if (!globalThis.authDb) {
  globalThis.authDb = db;
}

export const auth = betterAuth({
  database: memoryAdapter(db),
  secret:
    process.env.BETTER_AUTH_SECRET ||
    "47a8276cc132f05213112fa5d6d74479bb33226dd1ee16dc84860496304fd4c0",
  baseURL: process.env.BETTER_AUTH_URL || "http://localhost:3000",
  emailAndPassword: {
    enabled: true,
  },
});

export async function seedAdminUser() {
  const adminEmail = process.env.ADMIN_EMAIL || "devranjeetq@gmail.com";
  const adminPassword = process.env.ADMIN_PASSWORD || "Hsejar@420";

  if (!adminEmail || !adminPassword) return;

  const existing = db.user?.find(
    (u: any) => u.email?.toLowerCase() === adminEmail.toLowerCase()
  );

  if (!existing) {
    try {
      await auth.api.signUpEmail({
        body: {
          email: adminEmail,
          password: adminPassword,
          name: "Admin",
        },
      });
    } catch {
      // Ignore if user already exists
    }
  }
}

export async function getAuth() {
  await seedAdminUser();
  return auth;
}
