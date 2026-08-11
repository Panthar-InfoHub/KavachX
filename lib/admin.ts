import "server-only";
import { headers } from "next/headers";
import { getAuth } from "@/lib/auth";

/**
 * Server-only admin authorization utility.
 * Compares an email against the server-configured ADMIN_EMAIL environment variable.
 */
export function isAdmin(email: string | null | undefined): boolean {
  const adminEmail = process.env.ADMIN_EMAIL;

  // Fail closed if ADMIN_EMAIL is missing or email is empty
  if (!adminEmail || !email) {
    return false;
  }

  // Normalized, case-insensitive, trimmed comparison
  return email.trim().toLowerCase() === adminEmail.trim().toLowerCase();
}

export type AuthorizationResult =
  | { authorized: true; user: any; session: any }
  | { authorized: false; status: 401 | 403; error: string };

/**
 * Reusable server-side admin authorization helper for API routes and server actions.
 * 1. Verifies the Better Auth session from server-side headers.
 * 2. Returns 401 Unauthorized if no active session exists.
 * 3. Returns 403 Forbidden if the logged-in user's email is not admin.
 * 4. Returns { authorized: true, user, session } if authenticated as admin.
 */
export async function requireAdmin(): Promise<AuthorizationResult> {
  const auth = await getAuth();
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session || !session.user) {
    return {
      authorized: false,
      status: 401,
      error: "Unauthorized: Active session required",
    };
  }

  if (!isAdmin(session.user.email)) {
    return {
      authorized: false,
      status: 403,
      error: "Forbidden: Admin access required",
    };
  }

  return {
    authorized: true,
    user: session.user,
    session: session.session,
  };
}
