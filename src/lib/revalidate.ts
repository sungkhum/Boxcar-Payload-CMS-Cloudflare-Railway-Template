/**
 * Helpers used by collection hooks (Posts, Pages) to invalidate Next.js's
 * route cache after a doc changes. Keeps ISR responsive — without these,
 * admin edits would only appear after the natural 60s revalidate window.
 *
 * Caveat: these only work when called from inside the Next.js request
 * context (admin actions, route handlers). Calls from the cron-runner
 * script (`scripts/run-jobs.ts`) throw "Route ... used revalidatePath
 * outside an action or page render" because the cron is a separate
 * process with no work-async-store. We swallow that so the calling hook
 * still succeeds; cron-fired publishes get visible on the natural ISR
 * window (≤60s) instead of instantly.
 */
import { revalidatePath } from 'next/cache'

function safeRevalidate(path: string) {
  try {
    revalidatePath(path)
  } catch {
    // No-op outside a Next.js request context (e.g. cron runner).
  }
}

export function revalidatePostPaths(slug?: string | null) {
  // Listings that show this post.
  safeRevalidate('/')
  safeRevalidate('/posts')
  // The post's own URL (and the sitemap, which Next.js caches separately).
  if (slug) safeRevalidate(`/posts/${slug}`)
  safeRevalidate('/sitemap.xml')
}

export function revalidatePagePaths(slug?: string | null) {
  if (slug) safeRevalidate(`/pages/${slug}`)
  safeRevalidate('/sitemap.xml')
}
