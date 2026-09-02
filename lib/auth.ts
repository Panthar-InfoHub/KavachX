import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { MongoClient } from "mongodb";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable inside .env or .env.local");
}

// Cache the MongoClient across Next.js hot-reloads in development
declare global {
  // eslint-disable-next-line no-var
  var _authMongoClient: MongoClient | undefined;
}

const client: MongoClient =
  globalThis._authMongoClient || new MongoClient(MONGODB_URI);

if (!globalThis._authMongoClient) {
  globalThis._authMongoClient = client;
}

const db = client.db();

export const auth = betterAuth({
  database: mongodbAdapter(db, { client }),
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

  // Check if admin user already exists in the database
  const usersCollection = db.collection("user");
  const existing = await usersCollection.findOne({
    email: adminEmail.toLowerCase(),
  });

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

